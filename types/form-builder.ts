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

export interface FormElementOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormElementBase {
  id: string;
  type: FormElementType;
  settings: {
    name: string;
    label: string;
    labelPosition: 'top' | 'left';
    placeholder?: string;
    helpText?: string;
    cols: number;
    className?: string;
    disabled?: boolean;
    hidden?: boolean;
    defaultValue?: any;
    options?: FormElementOption[];
    validation?: FormElementValidation;
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

export interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave?: (config: FormConfig) => void;
  onPreview?: (config: FormConfig) => void;
  onChange?: (config: FormConfig) => void;
}

export interface FormPreviewProps {
  config: FormConfig;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}
