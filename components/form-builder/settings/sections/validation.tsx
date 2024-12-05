'use client';

import React from 'react';
import { SettingsSectionProps, ValidationValue } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const ValidationSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  const updateValidation = (key: string, value: ValidationValue) => {
    onUpdate(element.id, {
      validation: {
        ...element.settings.validation,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Required Field */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          data-testid="required-checkbox" 
          checked={element.settings.validation?.required}
          onCheckedChange={(checked) => updateValidation('required', checked)}
        />
        <Label htmlFor="required">Required Field</Label>
      </div>

      {/* Min Length */}
      {['textbox', 'multiline', 'password', 'email'].includes(element.type) && (
        <div>
          <Label htmlFor="minLength">Minimum Length</Label>
          <Input
            id="minLength"
            type="number"
            value={element.settings.validation?.minLength || ''}
            onChange={(e) => updateValidation('minLength', parseInt(e.target.value) || undefined)}
            className="mt-1"
            min={0}
          />
        </div>
      )}

      {/* Max Length */}
      {['textbox', 'multiline', 'password', 'email'].includes(element.type) && (
        <div>
          <Label htmlFor="maxLength">Maximum Length</Label>
          <Input
            id="maxLength"
            type="number"
            value={element.settings.validation?.maxLength || ''}
            onChange={(e) => updateValidation('maxLength', parseInt(e.target.value) || undefined)}
            className="mt-1"
            min={0}
          />
        </div>
      )}

      {/* Pattern */}
      {['textbox', 'email', 'phone'].includes(element.type) && (
        <div>
          <Label htmlFor="pattern">Pattern (Regex)</Label>
          <Input
            id="pattern"
            value={element.settings.validation?.pattern || ''}
            onChange={(e) => updateValidation('pattern', e.target.value)}
            className="mt-1"
            placeholder="Enter regex pattern"
          />
        </div>
      )}

      {/* Error Message */}
      <div>
        <Label htmlFor="errorMessage">Error Message</Label>
        <Input
          id="errorMessage"
          value={element.settings.validation?.errorMessage || ''}
          onChange={(e) => updateValidation('errorMessage', e.target.value)}
          className="mt-1"
          placeholder="Enter custom error message"
        />
      </div>
    </div>
  );
};

export default ValidationSettings;