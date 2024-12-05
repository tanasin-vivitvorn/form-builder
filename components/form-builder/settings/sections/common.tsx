// components/form-builder/settings/sections/common.tsx
'use client';

import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsSectionProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

const CommonSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      {/* Field Name */}
      <div>
        <Label htmlFor="name">Field Name</Label>
        <Input
          id="name"
          value={element.settings.name}
          onChange={(e) => onUpdate(element.id, { name: e.target.value })}
          className="mt-1"
          placeholder="Enter field name"
        />
        <p className="mt-1 text-xs text-gray-500">Used as field identifier</p>
      </div>

      {/* Label */}
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={element.settings.label}
          onChange={(e) => onUpdate(element.id, { label: e.target.value })}
          className="mt-1"
          placeholder="Enter label text"
        />
      </div>

      {/* Label Position */}
      <div>
        <Label htmlFor="labelPosition">Label Position</Label>
        <Select
          value={element.settings.labelPosition}
          onValueChange={(value) => onUpdate(element.id, { labelPosition: value as 'top' | 'left' })}
        >
          <SelectTrigger id="labelPosition" className="mt-1">
            <SelectValue placeholder="Select label position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="left">Left</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid Columns */}
      <div>
        <Label htmlFor="cols">Grid Columns</Label>
        <Select
          value={element.settings.cols.toString()}
          onValueChange={(value) => onUpdate(element.id, { cols: parseInt(value, 10) })}
        >
          <SelectTrigger id="cols" className="mt-1">
            <SelectValue placeholder="Select columns" />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
              <SelectItem key={num} value={num.toString()}>
                {num} column{num !== 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Placeholder */}
      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          value={element.settings.placeholder}
          onChange={(e) => onUpdate(element.id, { placeholder: e.target.value })}
          className="mt-1"
          placeholder="Enter placeholder text"
        />
      </div>

      {/* Help Text */}
      <div>
        <Label htmlFor="helpText">Help Text</Label>
        <Input
          id="helpText"
          value={element.settings.helpText}
          onChange={(e) => onUpdate(element.id, { helpText: e.target.value })}
          className="mt-1"
          placeholder="Enter help text"
        />
      </div>
    </div>
  );
};

export default CommonSettings;