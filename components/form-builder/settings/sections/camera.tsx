'use client';

import React from 'react';
import { SettingsSectionProps } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CameraSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cameraType">Camera Type</Label>
        <Select
          value={element.settings.cameraType ?? 'environment'}
          onValueChange={(value) => onUpdate(element.id, { cameraType: value })}
        >
          <SelectTrigger id="cameraType" className="mt-1">
            <SelectValue placeholder="Select camera type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="environment">Back Camera</SelectItem>
            <SelectItem value="user">Front Camera</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="imageFormat">Image Format</Label>
        <Select
          value={element.settings.imageFormat ?? 'jpeg'}
          onValueChange={(value) => onUpdate(element.id, { imageFormat: value })}
        >
          <SelectTrigger id="imageFormat" className="mt-1">
            <SelectValue placeholder="Select image format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="maxSize">Maximum Image Size (MB)</Label>
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
          id="showPreview"
          checked={element.settings.showPreview ?? true}
          onCheckedChange={(checked: boolean | 'indeterminate') => 
            onUpdate(element.id, { showPreview: checked === true })
          }
        />
        <Label htmlFor="showPreview">Show Preview</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="multiple"
          checked={element.settings.multiple ?? false}
          onCheckedChange={(checked: boolean | 'indeterminate') => 
            onUpdate(element.id, { multiple: checked === true })
          }
        />
        <Label htmlFor="multiple">Allow Multiple Photos</Label>
      </div>

      {element.settings.multiple && (
        <div>
          <Label htmlFor="maxFiles">Maximum Number of Photos</Label>
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