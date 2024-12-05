// types/form-builder.ts

export type FormElementType =
  | 'textbox'
  | 'multiline'
  | 'dropdown'
  | 'searchdropdown'
  | 'checkbox'
  | 'radio'
  | 'slider'
  | 'rating'
  | 'fileupload'
  | 'camera'
  | 'button'
  | 'datepicker'
  | 'timepicker'
  | 'email'
  | 'phone'
  | 'currency'
  | 'password'
  | 'number';

export interface FormElementValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  errorMessage?: string;
}

export interface FormElementOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormElementBase {
  id: string;
  type: FormElementType;
  settings: {
    // Common settings
    name: string;
    label: string;
    labelPosition: 'top' | 'left';
    placeholder?: string;
    helpText?: string;
    cols: number;
    className?: string;
    disabled?: boolean;
    validation?: FormElementValidation;

    // Select/Radio/Checkbox settings
    options?: FormElementOption[];
    searchPlaceholder?: string;

    // Slider settings
    min?: number;
    max?: number;
    step?: number;
    showValue?: boolean;

    // Rating settings
    maxRating?: number;
    allowHalf?: boolean;
    starColor?: string;

    // File upload settings
    acceptedTypes?: string;
    maxSize?: number;
    multiple?: boolean;
    maxFiles?: number;

    // Camera settings
    cameraType?: 'environment' | 'user';
    imageFormat?: 'jpeg' | 'png';
    showPreview?: boolean;
  };
}

export interface FormConfig {
  id: string;
  name: string;
  description?: string;
  elements: FormElementBase[];
  settings: {
    labelPosition: 'top' | 'left';
    submitButton?: {
      text: string;
      position: 'left' | 'center' | 'right';
    };
    validationMode: 'onChange' | 'onBlur' | 'onSubmit';
    gridGap?: number;
    showBorder?: boolean;
    backgroundColor?: string;
  };
}

export interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave?: (config: FormConfig) => void;
  onPreview?: (config: FormConfig) => void;
  onChange?: (config: FormConfig) => void;
}
