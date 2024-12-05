'use client';

import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import CommonSettings from './sections/common';
import ValidationSettings from './sections/validation';
import OptionsSettings from './sections/options';
import SliderSettings from './sections/slider';
import RatingSettings from './sections/rating';
import FileSettings from './sections/file';
import { CameraSettings } from './sections/camera';
import { DatePickerSettings } from './sections/datepicker';
import { TimePickerSettings } from './sections/timepicker';
import { InputMaskSettings } from './sections/input-mask';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsPanelProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Element Settings</h2>
        <p className="text-sm text-gray-600 mt-1">{element.type}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="common" className="w-full">
          <TabsList className="w-full px-4 pt-2">
            <TabsTrigger value="common" className="flex-1">Common</TabsTrigger>
            <TabsTrigger value="validation" className="flex-1">Validation</TabsTrigger>
            {/* Show specific tabs based on element type */}
            {['dropdown', 'searchdropdown', 'radio', 'checkbox'].includes(element.type) && (
              <TabsTrigger value="options" className="flex-1">Options</TabsTrigger>
            )}
            {element.type === 'slider' && (
              <TabsTrigger value="slider" className="flex-1">Slider</TabsTrigger>
            )}
            {element.type === 'rating' && (
              <TabsTrigger value="rating" className="flex-1">Rating</TabsTrigger>
            )}
            {element.type === 'fileupload' && (
              <TabsTrigger value="file" className="flex-1">File</TabsTrigger>
            )}
            {element.type === 'camera' && (
              <TabsTrigger value="camera" className="flex-1">Camera</TabsTrigger>
            )}
            {element.type === 'datepicker' && (
              <TabsTrigger value="date" className="flex-1">Date</TabsTrigger>
            )}
            {element.type === 'timepicker' && (
              <TabsTrigger value="time" className="flex-1">Time</TabsTrigger>
            )}
            {['email', 'phone', 'currency', 'password', 'number'].includes(element.type) && (
              <TabsTrigger value="format" className="flex-1">Format</TabsTrigger>
            )}
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="common">
              <CommonSettings element={element} onUpdate={onUpdate} />
            </TabsContent>
            
            <TabsContent value="validation">
              <ValidationSettings element={element} onUpdate={onUpdate} />
            </TabsContent>
            
            {['dropdown', 'searchdropdown', 'radio', 'checkbox'].includes(element.type) && (
              <TabsContent value="options">
                <OptionsSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}
            
            {element.type === 'slider' && (
              <TabsContent value="slider">
                <SliderSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}
            
            {element.type === 'rating' && (
              <TabsContent value="rating">
                <RatingSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}
            
            {element.type === 'fileupload' && (
              <TabsContent value="file">
                <FileSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}
            
            {element.type === 'camera' && (
              <TabsContent value="camera">
                <CameraSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}

            {element.type === 'datepicker' && (
              <TabsContent value="date">
                <DatePickerSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}

            {element.type === 'timepicker' && (
              <TabsContent value="time">
                <TimePickerSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}

            {['email', 'phone', 'currency', 'password', 'number'].includes(element.type) && (
              <TabsContent value="format">
                <InputMaskSettings element={element} onUpdate={onUpdate} />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPanel;