import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SettingsSectionProps {
    element: FormElementBase;
    onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export const TimePickerSettings: React.FC<SettingsSectionProps> = ({
    element,
    onUpdate
  }) => {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="minTime">Minimum Time</Label>
          <Input
            id="minTime"
            type="time"
            value={element.settings.minTime}
            onChange={(e) => onUpdate(element.id, { minTime: e.target.value })}
            className="mt-1"
          />
        </div>
  
        <div>
          <Label htmlFor="maxTime">Maximum Time</Label>
          <Input
            id="maxTime"
            type="time"
            value={element.settings.maxTime}
            onChange={(e) => onUpdate(element.id, { maxTime: e.target.value })}
            className="mt-1"
          />
        </div>
  
        <div>
          <Label htmlFor="timeInterval">Time Interval (minutes)</Label>
          <Input
            id="timeInterval"
            type="number"
            value={element.settings.timeInterval ?? 15}
            onChange={(e) => onUpdate(element.id, { timeInterval: Number(e.target.value) })}
            className="mt-1"
            min={1}
            max={60}
          />
        </div>
      </div>
    );
  };