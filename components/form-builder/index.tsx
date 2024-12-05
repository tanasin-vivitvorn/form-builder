'use client';

import React, { useState, useCallback } from 'react';
import { FormBuilderProps, FormElementBase } from '@/types/form-builder';
import { FormPalette, PaletteItem } from './palette';
import { SettingsPanel } from './settings';
import { nanoid } from 'nanoid';
import { cn } from '@/lib/utils';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FormPreview } from './preview';
import { 
  LayoutGrid, 
  Eye,
  Save,
  Undo,
  Redo,
  Copy,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createForm, updateForm } from '@/store/slices/formSlice';
import { FormElement } from './elements';
import { FormInfoModal } from './modals/form-info-modal';
import LoadingOverlay from '../ui/loading-overlay';

const gridColumns = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
} as const;

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialConfig,
  // onSave,
  onPreview,
  onChange
}) => {
  // State
  const dispatch = useAppDispatch();
  const [elements, setElements] = useState<FormElementBase[]>(initialConfig?.elements || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [draggedElement, setDraggedElement] = useState<FormElementBase | null>(null);
  const [history, setHistory] = useState<FormElementBase[][]>([[...elements]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copiedElement, setCopiedElement] = useState<FormElementBase | null>(null);
  const [showFormInfoModal, setShowFormInfoModal] = useState(!initialConfig?.id);
  
  const { currentForm, loading, error } = useAppSelector(state => state.form);
  const selectedElement = elements.find(el => el.id === selectedId);

  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // History management
  const addToHistory = useCallback((newElements: FormElementBase[]) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), [...newElements]];
      if (newHistory.length > 50) newHistory.shift(); // Keep last 50 states
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setElements([...history[historyIndex - 1]]);
      notifyChange([...history[historyIndex - 1]]);
    }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setElements([...history[historyIndex + 1]]);
      notifyChange([...history[historyIndex + 1]]);
    }
  }, [historyIndex, history]);

  const handlePaletteDragStart = (event: React.DragEvent, item: PaletteItem) => {
    event.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  // Element management
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedItem = elements.find(el => el.id === active.id);
    setDraggedElement(draggedItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setElements(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newElements = arrayMove(items, oldIndex, newIndex);
        addToHistory(newElements);
        return newElements;
      });
    }
    setDraggedElement(null);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    
    const newElement: FormElementBase = {
      id: nanoid(),
      type: data.type,
      settings: {
        name: `${data.type}_${elements.length + 1}`,
        label: data.label,
        labelPosition: 'top',
        placeholder: `Enter ${data.label}`,
        cols: 6,
        validation: {
          required: false
        }
      }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    setSelectedId(newElement.id);
    addToHistory(newElements);
    notifyChange(newElements);
  };

  const handleCopyElement = (element: FormElementBase) => {
    setCopiedElement(element);
    toast({
      title: "Element Copied",
      description: `${element.settings.label} has been copied to clipboard`,
    });
  };

  const handlePasteElement = () => {
    if (copiedElement) {
      const newElement: FormElementBase = {
        ...copiedElement,
        id: nanoid(),
        settings: {
          ...copiedElement.settings,
          name: `${copiedElement.settings.name}_copy`,
          label: `${copiedElement.settings.label} (Copy)`
        }
      };

      const newElements = [...elements, newElement];
      setElements(newElements);
      setSelectedId(newElement.id);
      addToHistory(newElements);
      notifyChange(newElements);
    }
  };

  const handleDeleteElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    setSelectedId(null);
    addToHistory(newElements);
    notifyChange(newElements);
  };

  const handleSettingsUpdate = (id: string, newSettings: Partial<FormElementBase['settings']>) => {
    const newElements = elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          settings: {
            ...element.settings,
            ...newSettings
          }
        };
      }
      return element;
    });

    setElements(newElements);
    addToHistory(newElements);
    notifyChange(newElements);
  };

  const notifyChange = (newElements: FormElementBase[]) => {
    onChange?.({
      id: initialConfig?.id || 'default',
      name: initialConfig?.name || 'New Form',
      elements: newElements,
      settings: initialConfig?.settings || {
        labelPosition: 'top',
        validationMode: 'onChange'
      }
    });
  };

  // const handleSave = async () => {
  //   try {
  //     const formData = {
  //       name: initialConfig?.name || 'New Form',
  //       elements,
  //       settings: initialConfig?.settings || {
  //         labelPosition: 'top',
  //         validationMode: 'onChange'
  //       }
  //     };

  //     if (!currentForm?.id) {
  //       // Create new form
  //       await dispatch(createForm(formData)).unwrap();
  //       toast({
  //         title: 'Success',
  //         description: 'Form created successfully'
  //       });
  //     } else {
  //       // Update existing form
  //       await dispatch(updateForm({
  //         formId: currentForm.id,
  //         formData
  //       })).unwrap();
  //       toast({
  //         title: 'Success',
  //         description: 'Form updated successfully'
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: error as string,
  //       variant: 'destructive'
  //     });
  //   }
  // };

  const handleFormInfoSubmit = async (formInfo: { name: string; description: string }) => {
    try {
      const formData = {
        name: formInfo.name,
        description: formInfo.description,
        elements,
        settings: initialConfig?.settings || {
          labelPosition: 'top',
          validationMode: 'onChange'
        }
      };

      if (!currentForm?.id) {
        await dispatch(createForm(formData)).unwrap();
        toast({
          title: 'Success',
          description: 'Form created successfully'
        });
      } else {
        await dispatch(updateForm({
          formId: currentForm.id,
          formData
        })).unwrap();
        toast({
          title: 'Success',
          description: 'Form updated successfully'
        });
      }
      setShowFormInfoModal(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive'
      });
    }
  };

  const handleSave = () => {
    setShowFormInfoModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {loading  && !error && <LoadingOverlay />}
      <FormInfoModal
        isOpen={showFormInfoModal}
        onClose={() => setShowFormInfoModal(false)}
        onSubmit={handleFormInfoSubmit}
        initialData={currentForm ? {
          name: currentForm.name,
          description: currentForm.description || ''
        } : undefined}
      />
       {/* Toolbar */}
       <div className="flex items-center h-14 px-4 border-b bg-white justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex === 0}
          >
            <Undo className="h-4 w-4 mr-1" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex === history.length - 1}
          >
            <Redo className="h-4 w-4 mr-1" />
            Redo
          </Button>
          {copiedElement && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePasteElement}
            >
              <Copy className="h-4 w-4 mr-1" />
              Paste
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'editor' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('editor')}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Editor
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>

        <Button size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />
          Save Form
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'editor' ? (
          <>
            {/* Palette */}
            <div className="w-64 border-r bg-white">
              <FormPalette onDragStart={handlePaletteDragStart} />
            </div>

            {/* Form Building Area */}
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="flex-1 p-4 overflow-auto">
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="min-h-[calc(100vh-8rem)] bg-white border-2 border-dashed rounded-lg p-8"
                >
                  <SortableContext items={elements} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-12 gap-6">
                      {elements.map((element) => (
                        <div
                          key={element.id}
                          className={cn(
                            gridColumns[element.settings.cols as keyof typeof gridColumns] || 'col-span-6',
                            'relative group'
                          )}
                        >
                          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyElement(element)}
                              className="h-8 w-8"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteElement(element.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormElement
                            element={element}
                            isSelected={selectedId === element.id}
                            onClick={() => setSelectedId(element.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                  {elements.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-sm">Drag and drop elements here to build your form</p>
                    </div>
                  )}
                </div>
              </div>

              <DragOverlay>
                {draggedElement ? (
                  <div className="opacity-50">
                    <FormElement
                      element={draggedElement}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            {/* Settings Panel */}
            {selectedElement && (
              <div className="w-80 border-l bg-white">
                <SettingsPanel 
                  element={selectedElement}
                  onUpdate={handleSettingsUpdate}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 p-4 overflow-auto">
            <FormPreview 
              config={{
                id: initialConfig?.id || 'default',
                name: initialConfig?.name || 'New Form',
                elements,
                settings: initialConfig?.settings || {
                  labelPosition: 'top',
                  validationMode: 'onChange'
                }
              }}
              onSubmit={onPreview}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;