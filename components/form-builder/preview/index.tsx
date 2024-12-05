'use client';

import React, { useEffect } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { 
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { UploadPreview } from './upload-preview';

import {
  FormElementBase,
  FormPreviewProps,
  FormValues
} from '@/types/form-builder';

export const FormPreview: React.FC<FormPreviewProps> = ({ config, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    config.elements.forEach(element => {
      if (element.type === 'fileupload' || element.type === 'camera') {
        register(element.settings.name);
      }
    });
  }, [register, config.elements]);

  // Convert your validation type to react-hook-form's RegisterOptions
  const convertValidation = (validation: FormElementBase['settings']['validation']): RegisterOptions<FormValues, string> => {
    if (!validation) return {};
    
    return {
      required: validation.required ? {
        value: true,
        message: validation.errorMessage || 'This field is required'
      } : false,
      minLength: validation.minLength ? {
        value: validation.minLength,
        message: `Minimum length is ${validation.minLength}`
      } : undefined,
      maxLength: validation.maxLength ? {
        value: validation.maxLength,
        message: `Maximum length is ${validation.maxLength}`
      } : undefined,
      pattern: validation.pattern ? {
        value: new RegExp(validation.pattern),
        message: validation.errorMessage || 'Invalid format'
      } : undefined
    };
  };

  const renderFormElement = (element: FormElementBase) => {
    const {
      id,
      type,
      settings: {
        name,
        label,
        labelPosition,
        placeholder,
        cols,
        validation,
        helpText
      }
    } = element;

    const inputClassName = "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    const labelClassName = "block text-sm font-medium text-gray-700";
    const required = validation?.required;
    console.log(element);
    const renderInput = () => {
      switch (type) {
        case 'textbox':
          return (
            <input
              id={id}
              type="text"
              {...register(name, convertValidation(validation))}
              placeholder={placeholder}
              className={inputClassName}
            />
          );

        case 'multiline':
          return (
            <textarea
              id={id}
              {...register(name, convertValidation(validation))}
              placeholder={placeholder}
              className={inputClassName}
              rows={3}
            />
          );

        case 'dropdown':
          return (
            <select
              id={id}
              {...register(name, convertValidation(validation))}
              className={inputClassName}
            >
              <option value="">{placeholder}</option>
              {element.settings.options?.map((opt, idx) => (
                <option key={idx} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </select>
          );

          case 'searchdropdown':
            const dropdownId = element.id;
            const inputName = element.settings.name;
            
            return (
              <div className="relative">
                <div className="relative">
                  <input
                    id={dropdownId}
                    type="text"
                    {...register(inputName, convertValidation(validation))}
                    placeholder={placeholder}
                    className={`${inputClassName} pl-8`}
                    onFocus={(e) => {
                      const dropdown = e.currentTarget.parentElement?.nextElementSibling;
                      console.log(dropdown);
                      if (dropdown) dropdown.classList.remove('hidden');
                    }}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      const dropdown = e.currentTarget.parentElement?.nextElementSibling;
                      if (dropdown) {
                        const items = dropdown.getElementsByTagName('li');
                        Array.from(items).forEach(item => {
                          const text = item.textContent?.toLowerCase() || '';
                          item.style.display = text.includes(value) ? 'block' : 'none';
                        });
                      }
                    }}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <ul className="hidden absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border rounded-md shadow-lg">
                  {(element.settings.options || ['Option 1', 'Option 2', 'Option 3']).map((option) => {
                    const optionValue = typeof option === 'string' ? option : option.value;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    
                    return (
                      <li
                        key={`${dropdownId}-${optionValue}`}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={(e) => {
                          setValue(inputName, optionValue);
                          e.currentTarget.parentElement?.classList.add('hidden');
                        }}
                      >
                        {optionLabel}
                      </li>
                    );
                  })}
                </ul>
                <div 
                  className="fixed inset-0 z-0 hidden" 
                  onClick={(e) => {
                    const dropdowns = document.querySelectorAll('.relative ul');
                    dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
                    e.currentTarget.classList.add('hidden');
                  }}
                />
              </div>
            );

        case 'checkbox':
          return (
            <div className="flex items-center">
              <input
                id={id}
                type="checkbox"
                {...register(name, convertValidation(validation))}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">{placeholder}</span>
            </div>
          );

        case 'radio':
          return (
            <div className="space-y-2">
              {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={id}
                    type="radio"
                    value={option}
                    {...register(name, convertValidation(validation))}
                    className="h-4 w-4 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">{option}</span>
                </div>
              ))}
            </div>
          );

        case 'slider':
          return (
            <input
              id={id}
              type="range"
              {...register(name, convertValidation(validation))}
              className="w-full"
            />
          );

        case 'rating':
          return (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="cursor-pointer">
                  <input
                    id={id}
                    type="radio"
                    value={star}
                    {...register(name, convertValidation(validation))}
                    className="sr-only"
                  />
                  <span className="text-2xl hover:text-yellow-400">★</span>
                </label>
              ))}
            </div>
          );

        case 'fileupload':
          const acceptedTypes = element.settings.acceptedTypes;
          const multiple = element.settings.multiple;
          return (
            <UploadPreview
              key={id}
              value={(watch(name) as FileList)}
              accept={acceptedTypes}
              multiple={multiple}
              onChange={(files) => setValue(name, files)}
              className="w-full"
            />
          );
    
        case 'camera':
          return (
            <UploadPreview
              key={id}
              value={(watch(name) as FileList)}
              onChange={(files) => setValue(name, files)}
              accept="image/*"
              capture={true}
              className="w-full"
            />
          );

        case 'button':
          return (
            <button
              id={id}
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {label}
            </button>
          );

        case 'datepicker':
          const todayDate = new Date().toISOString().slice(0, 10);
          const minDate = (element.settings.disablePastDates)?todayDate:element.settings.minDate;
          const maxDate = (element.settings.disableFutureDates)?todayDate:element.settings.maxDate;
          return (
            <input
              id={id}
              type="date"
              min={minDate}
              max={maxDate}
              {...register(name, convertValidation(validation))}
              className={inputClassName}
            />
          );

        case 'timepicker':
          const minTime = element.settings.minTime;
          const maxTime = element.settings.maxTime;
          const interval = element.settings.timeInterval;
          return (
            <input
              id={id}
              type="time"
              min={minTime}
              max={maxTime}
              step={interval ? interval * 60 : undefined}
              {...register(name, convertValidation(validation))}
              className={inputClassName}
            />
          );

        case 'email':
          return (
            <input
              id={id}
              type="email"
              {...register(name, {
                ...validation,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email'
                }
              })}
              placeholder={placeholder}
              className={inputClassName}
            />
          );

        case 'phone':
          return (
            <input
              id={id}
              type="tel"
              {...register(name, convertValidation(validation))}
              placeholder={placeholder}
              className={inputClassName}
            />
          );

        case 'currency':
          return (
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              <input
                id={id}
                type="number"
                step="0.01"
                {...register(name, convertValidation(validation))}
                placeholder={placeholder}
                className={`${inputClassName} pl-6`}
              />
            </div>
          );

        case 'password':
          const showPasswordToggle = element.settings.showPasswordToggle;
          return (
            <div className="relative">
              <input
                id={id}
                type={showPassword ? 'text' : 'password'}
                {...register(name, convertValidation(validation))}
                placeholder={placeholder}
                className={inputClassName}
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

        case 'number':
          const min = element.settings.min;
          const max = element.settings.max;
          const step = element.settings.step;
          return (
            <input
              id={id}
              type="number"
              min={min}
              max={max}
              step={step}
              {...register(name, convertValidation(validation))}
              placeholder={placeholder}
              className={inputClassName}
            />
          );

        default:
          return (
            <input
              id={id}
              type="text"
              {...register(name, convertValidation(validation))}
              placeholder={placeholder}
              className={inputClassName}
            />
          );
      }
    };

    return (
      <div className={`col-span-${cols} space-y-2`}>
        {labelPosition === 'top' && (
          <label className={labelClassName}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className={cn(
          "flex",
          labelPosition === 'left' ? "items-start gap-4" : "flex-col"
        )}>
          {labelPosition === 'left' && (
            <label className={`${labelClassName} w-1/3`}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <div className={labelPosition === 'left' ? 'flex-1' : 'w-full'}>
            {renderInput()}
          </div>
        </div>

        {helpText && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
        
        {errors[name] && (
          <p className="text-sm text-red-500">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  };

  const onFormSubmit = (data: FormValues) => {
    onSubmit?.(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          {config.elements.map((element) => (
            <React.Fragment key={element.id}>
              {renderFormElement(element)}
            </React.Fragment>
          ))}
        </div>
        {config.elements.length > 0 && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPreview;