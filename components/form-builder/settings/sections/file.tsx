'use client';

import React from 'react';
import { SettingsSectionProps } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const FileSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="acceptedTypes">Accepted File Types</Label>
        <Input
          id="acceptedTypes"
          value={element.settings.acceptedTypes ?? ''}
          onChange={(e) => onUpdate(element.id, { acceptedTypes: e.target.value })}
          className="mt-1"
          placeholder=".pdf,.doc,.docx,.jpg,.png"
        />
        <p className="mt-1 text-xs text-gray-500">
          Enter comma-separated file extensions (e.g., .pdf,.doc)
        </p>
      </div>

      <div>
        <Label htmlFor="maxSize">Maximum File Size (MB)</Label>
        <Input
          id="maxSize"
          type="number"
          value={element.settings.maxSize ?? 5}
          onChange={(e) => onUpdate(element.id, { maxSize: Number(e.target.value) })}
          className="mt-1"
          min={1}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="multiple"
          checked={element.settings.multiple ?? false}
          onCheckedChange={(checked: boolean | 'indeterminate') => 
            onUpdate(element.id, { multiple: checked === true })
          }
          
        />
        <Label htmlFor="multiple">Allow Multiple Files</Label>
      </div>

      {element.settings.multiple && (
        <div>
          <Label htmlFor="maxFiles">Maximum Number of Files</Label>
          <Input
            id="maxFiles"
            type="number"
            value={element.settings.maxFiles ?? 1}
            onChange={(e) => onUpdate(element.id, { maxFiles: Number(e.target.value) })}
            className="mt-1"
            min={1}
          />
        </div>
      )}
    </div>
  );
};

export default FileSettings;