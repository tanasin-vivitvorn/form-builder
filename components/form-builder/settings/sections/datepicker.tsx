'use client';

import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface SettingsSectionProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export const DatePickerSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="minDate">Minimum Date</Label>
        <Input
          id="minDate"
          type="date"
          value={element.settings.minDate}
          onChange={(e) => onUpdate(element.id, { minDate: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="maxDate">Maximum Date</Label>
        <Input
          id="maxDate"
          type="date"
          value={element.settings.maxDate}
          onChange={(e) => onUpdate(element.id, { maxDate: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="disablePastDates"
          checked={element.settings.disablePastDates}
          onCheckedChange={(checked) => onUpdate(element.id, { disablePastDates: checked })}
        />
        <Label htmlFor="disablePastDates">Disable Past Dates</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="disableFutureDates"
          checked={element.settings.disableFutureDates}
          onCheckedChange={(checked) => onUpdate(element.id, { disableFutureDates: checked })}
        />
        <Label htmlFor="disableFutureDates">Disable Future Dates</Label>
      </div>
    </div>
  );
};