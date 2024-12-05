import { FormConfig } from '@/components/form-builder/elements/types';

export const DEFAULT_FORM_CONFIG: FormConfig = {
  id: 'default',
  name: 'New Form',
  elements: [],
  settings: {
    labelPosition: 'top',
    validationMode: 'onChange',
    submitButton: {
      text: 'Submit',
      position: 'right'
    }
  }
};

export const INITIAL_ELEMENT_SETTINGS = {
  labelPosition: 'top',
  cols: 12,
  disabled: false
};

export const GRID_COLUMNS = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
} as const;