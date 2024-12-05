'use client';

import React from 'react';
import { SettingsSectionProps } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const SliderSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="min">Minimum Value</Label>
        <Input
          id="min"
          type="number"
          value={element.settings.min ?? 0}
          onChange={(e) => onUpdate(element.id, { min: Number(e.target.value) })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="max">Maximum Value</Label>
        <Input
          id="max"
          type="number"
          value={element.settings.max ?? 100}
          onChange={(e) => onUpdate(element.id, { max: Number(e.target.value) })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="step">Step</Label>
        <Input
          id="step"
          type="number"
          value={element.settings.step ?? 1}
          onChange={(e) => onUpdate(element.id, { step: Number(e.target.value) })}
          className="mt-1"
          min={1}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showValue"
          checked={element.settings.showValue ?? true}
          onCheckedChange={(checked: boolean | 'indeterminate') => 
            onUpdate(element.id, { showValue: checked === true })
          }
        />
        <Label htmlFor="showValue">Show Value</Label>
      </div>
    </div>
  );
};

export default SliderSettings;