// components/form-builder/elements/index.tsx
'use client';

import React from 'react';
import { FormElementBase } from '@/types/form-builder';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Star, 
  Upload, 
  Camera, 
  Eye,
  EyeOff
} from 'lucide-react';
import { GRID_COLUMNS } from '../constants';

interface FormElementProps {
  element: FormElementBase;
  isSelected: boolean;
  onClick: () => void;
}

export const FormElement: React.FC<FormElementProps> = ({
  element,
  isSelected,
  onClick,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const renderInput = () => {
    const {
      type,
      settings: {
        placeholder,
        min,
        max,
        step,
        maxRating,
        starColor,
        currencySymbol,
        phoneFormat,
        showPasswordToggle,
      }
    } = element;

    switch (type) {
      // Text-based inputs
      case 'textbox':
      case 'email':
        return (
          <input
            type={type === 'email' ? 'email' : 'text'}
            placeholder={placeholder}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />
        );

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder || '••••••••'}
              disabled
              className="w-full p-2 border rounded bg-gray-50"
            />
            {showPasswordToggle && (
              <button 
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        );

      case 'phone':
        return (
          <input
            type="tel"
            placeholder={phoneFormat || '(###) ###-####'}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              {currencySymbol || '$'}
            </span>
            <input
              type="text"
              placeholder="0.00"
              disabled
              className="w-full p-2 pl-6 border rounded bg-gray-50"
            />
          </div>
        );

        case 'datepicker': {
          const today = new Date().toISOString().split('T')[0];
          let minDateValue = element.settings.minDate;
          let maxDateValue = element.settings.maxDate;
        
          // Handle disable past dates
          if (element.settings.disablePastDates) {
            minDateValue = today;
          }
        
          // Handle disable future dates
          if (element.settings.disableFutureDates) {
            maxDateValue = today;
          }
        
          return (
            <div className="relative">
              <input
                type="date"
                min={minDateValue}
                max={maxDateValue}
                disabled
                className="w-full p-2 border rounded bg-gray-50"
              />
              {/* Show restrictions if any */}
              {(element.settings.disablePastDates || element.settings.disableFutureDates || minDateValue || maxDateValue) && (
                <div className="mt-1 text-xs text-gray-500">
                  {element.settings.disablePastDates && "Past dates disabled"}
                  {element.settings.disableFutureDates && "Future dates disabled"}
                  {minDateValue && !element.settings.disablePastDates && `Min: ${minDateValue}`}
                  {maxDateValue && !element.settings.disableFutureDates && `Max: ${maxDateValue}`}
                </div>
              )}
            </div>
          );
        }
        
        case 'timepicker': {
          const minTime = element.settings.minTime;
          const maxTime = element.settings.maxTime;
          const interval = element.settings.timeInterval;
        
          return (
            <div className="relative">
              <input
                type="time"
                min={minTime}
                max={maxTime}
                step={interval ? interval * 60 : undefined}
                disabled
                className="w-full p-2 border rounded bg-gray-50"
              />
              {/* Show restrictions if any */}
              {(minTime || maxTime || interval) && (
                <div className="mt-1 text-xs text-gray-500">
                  {minTime && `From: ${minTime}`}
                  {maxTime && ` To: ${maxTime}`}
                  {interval && ` Every ${interval} min`}
                </div>
              )}
            </div>
          );
        }

      // Multi-line input
      case 'multiline':
        return (
          <textarea
            placeholder={placeholder}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
            rows={3}
          />
        );

      // Selection inputs
      case 'dropdown':
        return (
          <select
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          >
            <option>{placeholder || 'Select an option'}</option>
            {element.settings.options?.map((opt, idx) => (
              <option key={idx} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'searchdropdown':
        return (
          <div className="relative">
            <input
              type="text"
              placeholder={element.settings.searchPlaceholder || 'Search...'}
              disabled
              className="w-full p-2 pl-8 border rounded bg-gray-50"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {element.settings.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  disabled={opt.disabled}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="ml-2 text-sm">{opt.label}</span>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {element.settings.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="radio"
                  disabled={opt.disabled}
                  className="h-4 w-4 border-gray-300"
                />
                <span className="ml-2 text-sm">{opt.label}</span>
              </div>
            ))}
          </div>
        );

      // Range inputs
      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              disabled
              className="w-full"
            />
            {element.settings.showValue && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>{min ?? 0}</span>
                <span>{max ?? 100}</span>
              </div>
            )}
          </div>
        );

      case 'rating':
        return (
          <div className="flex space-x-1">
            {Array.from({ length: maxRating || 5 }).map((_, idx) => (
              <Star
                key={idx}
                className="h-5 w-5"
                style={{ color: starColor || '#ffd700' }}
              />
            ))}
          </div>
        );

      // File inputs
      case 'fileupload':
        return (
          <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded bg-gray-50">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {element.settings.multiple ? 'Click or drag files' : 'Click or drag file'}
              </p>
              {element.settings.acceptedTypes && (
                <p className="text-xs text-gray-400 mt-1">
                  Allowed: {element.settings.acceptedTypes}
                </p>
              )}
            </div>
          </div>
        );

      case 'camera':
        return (
          <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded bg-gray-50">
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {element.settings.multiple ? 'Take photos' : 'Take photo'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Using {element.settings.cameraType === 'user' ? 'front' : 'back'} camera
              </p>
            </div>
          </div>
        );

        case 'button':
          return (
            <button
              type="button"
              disabled
              className={cn(
                "px-4 py-2 rounded",
                "bg-gray-100 text-gray-600",
                "border border-gray-300",
                "cursor-not-allowed"
              )}
              style={{
                backgroundColor: element.settings.buttonColor || 'rgb(239, 246, 255)',
                color: element.settings.textColor || 'rgb(37, 99, 235)',
              }}
            >
              {element.settings.label || 'Button'}
            </button>
          );

      default:
        return (
          <input
            type="text"
            placeholder={placeholder}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />
        );
    }
  };

  return (
    <div
      className={cn(
        GRID_COLUMNS[element.settings.cols as keyof typeof GRID_COLUMNS] || GRID_COLUMNS[12],
        "relative"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "p-4 border rounded-md",
        "hover:border-gray-300 transition-colors",
        isSelected && "ring-2 ring-blue-500"
      )}>
        <div className="space-y-2">
          {element.settings.labelPosition === 'top' && element.type !== 'button' && (
            <label className="block text-sm font-medium text-gray-700">
              {element.settings.label}
              {element.settings.validation?.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <div className={cn(
            "flex",
            element.settings.labelPosition === 'left' ? "items-center gap-4" : "flex-col"
          )}>
            {element.settings.labelPosition === 'left' && (
              <label className="block text-sm font-medium text-gray-700 w-1/3">
                {element.settings.label}
                {element.settings.validation?.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            
            <div className={element.settings.labelPosition === 'left' ? 'flex-1' : 'w-full'}>
              {renderInput()}
            </div>
          </div>

          {element.settings.helpText && (
            <p className="text-sm text-gray-500">{element.settings.helpText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormElement;