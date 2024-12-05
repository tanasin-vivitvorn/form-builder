import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface SettingsSectionProps {
    element: FormElementBase;
    onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export const InputMaskSettings: React.FC<SettingsSectionProps> = ({
    element,
    onUpdate
  }) => {
    return (
      <div className="space-y-4">
        {/* Email Settings */}
        {element.type === 'email' && (
          <>
            <div>
              <Label htmlFor="emailDomains">Allowed Domains</Label>
              <Input
                id="emailDomains"
                value={element.settings.allowedDomains?.join(', ') ?? ''}
                onChange={(e) => onUpdate(element.id, { 
                  allowedDomains: e.target.value.split(',').map(d => d.trim()).filter(Boolean)
                })}
                className="mt-1"
                placeholder="example.com, another.com"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to allow all domains. Separate domains with commas.
              </p>
            </div>
          </>
        )}
  
        {/* Phone Settings */}
        {element.type === 'phone' && (
          <>
            <div>
              <Label htmlFor="phoneFormat">Phone Format</Label>
              <Input
                id="phoneFormat"
                value={element.settings.phoneFormat ?? '(###) ###-####'}
                onChange={(e) => onUpdate(element.id, { phoneFormat: e.target.value })}
                className="mt-1"
                placeholder="(###) ###-####"
              />
              <p className="mt-1 text-xs text-gray-500">
                Use # for numbers, e.g., (###) ###-####
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowInternational"
                checked={element.settings.allowInternational}
                onCheckedChange={(checked) => onUpdate(element.id, { allowInternational: checked })}
              />
              <Label htmlFor="allowInternational">Allow International Numbers</Label>
            </div>
          </>
        )}
  
        {/* Currency Settings */}
        {element.type === 'currency' && (
          <>
            <div>
              <Label htmlFor="currencySymbol">Currency Symbol</Label>
              <Input
                id="currencySymbol"
                value={element.settings.currencySymbol ?? '$'}
                onChange={(e) => onUpdate(element.id, { currencySymbol: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="decimals">Decimal Places</Label>
              <Input
                id="decimals"
                type="number"
                value={element.settings.decimals ?? 2}
                onChange={(e) => onUpdate(element.id, { decimals: Number(e.target.value) })}
                className="mt-1"
                min={0}
                max={4}
              />
            </div>
            <div>
              <Label htmlFor="thousandsSeparator">Thousands Separator</Label>
              <Input
                id="thousandsSeparator"
                value={element.settings.thousandsSeparator ?? ','}
                onChange={(e) => onUpdate(element.id, { thousandsSeparator: e.target.value })}
                className="mt-1"
                maxLength={1}
              />
            </div>
          </>
        )}
  
        {/* Password Settings */}
        {element.type === 'password' && (
          <>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showPasswordToggle"
                checked={element.settings.showPasswordToggle}
                onCheckedChange={(checked) => onUpdate(element.id, { showPasswordToggle: checked })}
              />
              <Label htmlFor="showPasswordToggle">Show Password Toggle</Label>
            </div>
            <div>
              <Label htmlFor="passwordStrength">Required Strength</Label>
              <Select
                value={element.settings.passwordStrength ?? 'medium'}
                onValueChange={(value) => onUpdate(element.id, { passwordStrength: value })}
              >
                <SelectTrigger id="passwordStrength" className="mt-1">
                  <SelectValue placeholder="Select password strength" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (any characters)</SelectItem>
                  <SelectItem value="medium">Medium (letters + numbers)</SelectItem>
                  <SelectItem value="high">High (letters + numbers + special)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
  
        {/* Number Settings */}
        {element.type === 'number' && (
          <>
            <div>
              <Label htmlFor="min">Minimum Value</Label>
              <Input
                id="min"
                type="number"
                value={element.settings.min ?? ''}
                onChange={(e) => onUpdate(element.id, { min: Number(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                value={element.settings.max ?? ''}
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
                min={0}
                step="any"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowDecimals"
                checked={element.settings.allowDecimals}
                onCheckedChange={(checked: boolean | 'indeterminate') => 
                  onUpdate(element.id, { allowDecimals: checked === true })
                }
              />
              <Label htmlFor="allowDecimals">Allow Decimals</Label>
            </div>
          </>
        )}
      </div>
    );
  };