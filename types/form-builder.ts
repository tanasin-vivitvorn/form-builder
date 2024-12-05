import { CheckedState } from "@radix-ui/react-checkbox";

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
  | 'number'
  | 'date'
  | 'time'
  | 'email'
  | 'phone'
  | 'currency'
  | 'datepicker'
  | 'timepicker'
  | 'password';

export interface FormElementValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  customValidator?: string;
  errorMessage?: string;
}

export interface SettingsSectionProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export type ValidationValue = boolean | number | string | RegExp | undefined;

export interface FormElementOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface FormElementBase {
  id: string;
  type: FormElementType;
  settings: {
    textColor?: string;
    buttonColor?: string;
    name: string;
    label: string;
    labelPosition: 'top' | 'left';
    cols: number;
    validation?: FormElementValidation;
    placeholder?: string;
    required?: boolean;
    helpText?: string;
    className?: string;
    disabled?: boolean;
    hidden?: boolean;
    defaultValue?: any;
    options?: FormElementOption[];
    searchPlaceholder?: string;
    starColor?: string;
    allowHalf?: boolean;
    maxRating?: number;
    cameraType?: string;
    imageFormat?: string;
    showPreview?: boolean;
    passwordStrength?: string;
    showPasswordToggle?: any;
    thousandsSeparator?: string;
    decimals?: number;
    currencySymbol?: string;
    allowInternational?: any;
    phoneFormat?: string;
    allowedDomains?: any;
    timeInterval?: number;
    maxTime?: string | number | undefined;
    minTime?: string | number | undefined;
    maxDate?: string | number | undefined;
    minDate?: string | number | undefined;
    disablePastDates?: CheckedState | undefined;
    disableFutureDates?: CheckedState | undefined;
    maxFiles?: number;
    multiple?: boolean;
    maxSize?: number;
    acceptedTypes?: string;
    min?: number;
    max?: number;
    step?: number;
    showValue?: boolean;
    allowDecimals?: CheckedState | undefined;
    eventHandlers?: {
      onChange?: string;
      onBlur?: string;
      onFocus?: string;
      onClick?: string;
    };
    style?: {
      width?: string;
      labelWidth?: string;
      inputWidth?: string;
    };
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

interface FormData {
  [key: string]: {
    value: string | number | boolean | string[];
    validation?: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: string | RegExp;
      errorMessage?: string;
    };
  }
}

export interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave?: (config: FormConfig) => void;
  onPreview?: (config: FormData) => void;
  onChange?: (config: FormConfig) => void;
}

export interface FormPreviewProps {
  config: FormConfig;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export interface SettingsSectionProps {
  element: FormElementBase;
  onUpdate: (id: string, settings: Partial<FormElementBase['settings']>) => void;
}

export interface FormValues {
  [key: string]: string | number | boolean | string[];
}
