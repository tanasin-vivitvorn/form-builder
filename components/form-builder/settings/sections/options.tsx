'use client';

import React from 'react';
import { FormElementBase, FormElementOption } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface SettingsSectionProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

const OptionsSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  const options = element.settings.options || [];

  const addOption = () => {
    const newOptions = [
      ...options,
      { label: `Option ${options.length + 1}`, value: `option-${options.length + 1}` }
    ];
    onUpdate(element.id, { options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    onUpdate(element.id, { options: newOptions });
  };

  const updateOption = (index: number, field: keyof FormElementOption, value: string | boolean) => {
    const newOptions = options.map((opt, i) => 
      i === index ? { ...opt, [field]: value } : opt
    );
    onUpdate(element.id, { options: newOptions });
  };

  return (
    <div className="space-y-4">
      {/* Options List */}
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="flex-1 space-y-2">
              <Input
                value={option.label}
                onChange={(e) => updateOption(index, 'label', e.target.value)}
                placeholder="Option label"
              />
              <Input
                value={option.value}
                onChange={(e) => updateOption(index, 'value', e.target.value)}
                placeholder="Option value"
              />
            </div>
            <div className="space-y-2 pt-2">
              <Checkbox
                id={`disabled-${index}`}
                checked={option.disabled}
                onCheckedChange={(checked) => updateOption(index, 'disabled', !!checked)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addOption}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>

      {/* Search Settings for Searchable Dropdown */}
      {element.type === 'searchdropdown' && (
        <div>
          <Label htmlFor="searchPlaceholder">Search Placeholder</Label>
          <Input
            id="searchPlaceholder"
            value={element.settings.searchPlaceholder || ''}
            onChange={(e) => onUpdate(element.id, { searchPlaceholder: e.target.value })}
            className="mt-1"
            placeholder="Enter search placeholder"
          />
        </div>
      )}
    </div>
  );
};

export default OptionsSettings;