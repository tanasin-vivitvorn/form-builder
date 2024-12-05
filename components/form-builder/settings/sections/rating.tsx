'use client';

import React from 'react';
import { SettingsSectionProps } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RatingSettings: React.FC<SettingsSectionProps> = ({
  element,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="maxRating">Maximum Stars</Label>
        <Select
          value={(element.settings.maxRating ?? 5).toString()}
          onValueChange={(value) => onUpdate(element.id, { maxRating: Number(value) })}
        >
          <SelectTrigger id="maxRating" className="mt-1">
            <SelectValue placeholder="Select maximum stars" />
          </SelectTrigger>
          <SelectContent>
            {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <SelectItem key={num} value={num.toString()}>
                {num} stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="allowHalf"
          checked={element.settings.allowHalf ?? false}
          onCheckedChange={(checked: boolean | 'indeterminate') => 
            onUpdate(element.id, { allowHalf: checked === true })
          }
        />
        <Label htmlFor="allowHalf">Allow Half Stars</Label>
      </div>

      <div>
        <Label htmlFor="starColor">Star Color</Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input
            id="starColor"
            type="color"
            value={element.settings.starColor ?? '#ffd700'}
            onChange={(e) => onUpdate(element.id, { starColor: e.target.value })}
            className="w-16 h-8 p-1"
          />
          <Input
            type="text"
            value={element.settings.starColor ?? '#ffd700'}
            onChange={(e) => onUpdate(element.id, { starColor: e.target.value })}
            className="flex-1"
            placeholder="#ffd700"
          />
        </div>
      </div>
    </div>
  );
};

export default RatingSettings;