import React from 'react';
import { FormElementBase, FormValues } from '@/types/form-builder';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface RenderElementProps {
  element: FormElementBase;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors;
  key: string;
}

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

const baseInputClasses = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const renderFormElement = ({ element, register, errors }: RenderElementProps) => {
  const {
    id,
    type,
    settings: {
      name,
      label,
      labelPosition,
      placeholder,
      required,
      // disabled,
      helpText,
      cols,
      validation,
      className
    }
  } = element;

  const renderInput = () => {
    switch (type) {
      case 'textbox':
        return (
          <input
            type="text"
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            {...register(name, convertValidation(validation))}
          />
        );
      case 'multiline':
        return (
          <textarea
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            rows={3}
            {...register(name, convertValidation(validation))}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            {...register(name, convertValidation(validation))}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            {...register(name, {
              ...validation,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })}
          />
        );
      case 'password':
        return (
          <input
            type="password"
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            {...register(name, convertValidation(validation))}
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            {...register(name, convertValidation(validation))}
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {['Option 1', 'Option 2', 'Option 3'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  className="h-4 w-4"
                  {...register(name, convertValidation(validation))}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type="text"
            className={cn(baseInputClasses, className)}
            placeholder={placeholder}
            {...register(name, convertValidation(validation))}
          />
        );
    }
  };

  return (
    <div
      key={id}
      className={cn(
        `col-span-${cols}`,
        'relative'
      )}
    >
      <div className="w-full">
        {labelPosition === 'top' && label && (
          <label className="mb-2 block text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className={cn(
          "flex",
          labelPosition === 'left' ? "items-center gap-4" : "flex-col"
        )}>
          {labelPosition === 'left' && label && (
            <label className="text-sm font-medium w-1/3">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className={labelPosition === 'left' ? 'flex-1' : 'w-full'}>
            {renderInput()}
          </div>
        </div>
        {helpText && (
          <p className="mt-1 text-xs text-gray-500">{helpText}</p>
        )}
        {errors[name] && (
          <p className="mt-1 text-xs text-red-500">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};