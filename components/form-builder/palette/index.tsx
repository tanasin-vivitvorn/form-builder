   'use client';

import React from 'react';
import { 
  Type, 
  AlignLeft, 
  List, 
  Search, 
  CheckSquare, 
  Circle,
  SlidersHorizontal,
  Star,
  Upload,
  Camera,
  Square,
  Calendar,
  Clock,
  Mail,
  Phone,
  DollarSign,
  Lock,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormElementType } from '@/types/form-builder';

export interface PaletteItem {
  type: FormElementType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const paletteItems: PaletteItem[] = [
  {
    type: 'textbox',
    label: 'Text Box',
    icon: <Type className="h-4 w-4" />,
    description: 'Single line text input'
  },
  {
    type: 'multiline',
    label: 'Multiline Text',
    icon: <AlignLeft className="h-4 w-4" />,
    description: 'Multiple line text input'
  },
  {
    type: 'dropdown',
    label: 'Dropdown',
    icon: <List className="h-4 w-4" />,
    description: 'Select from options'
  },
  {
    type: 'searchdropdown',
    label: 'Search Dropdown',
    icon: <Search className="h-4 w-4" />,
    description: 'Searchable dropdown'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: <CheckSquare className="h-4 w-4" />,
    description: 'Multiple choice checkbox'
  },
  {
    type: 'radio',
    label: 'Radio Button',
    icon: <Circle className="h-4 w-4" />,
    description: 'Single choice radio'
  },
  {
    type: 'slider',
    label: 'Slider',
    icon: <SlidersHorizontal className="h-4 w-4" />,
    description: 'Range slider'
  },
  {
    type: 'rating',
    label: 'Rating',
    icon: <Star className="h-4 w-4" />,
    description: 'Star rating input'
  },
  {
    type: 'fileupload',
    label: 'File Upload',
    icon: <Upload className="h-4 w-4" />,
    description: 'File upload input'
  },
  {
    type: 'camera',
    label: 'Camera',
    icon: <Camera className="h-4 w-4" />,
    description: 'Camera/Image upload'
  },
  {
    type: 'button',
    label: 'Button',
    icon: <Square className="h-4 w-4" />,
    description: 'Clickable button'
  },
  {
    type: 'datepicker',
    label: 'Date Picker',
    icon: <Calendar className="h-4 w-4" />,
    description: 'Date selection'
  },
  {
    type: 'timepicker',
    label: 'Time Picker',
    icon: <Clock className="h-4 w-4" />,
    description: 'Time selection'
  },
  {
    type: 'email',
    label: 'Email',
    icon: <Mail className="h-4 w-4" />,
    description: 'Email input'
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: <Phone className="h-4 w-4" />,
    description: 'Phone input'
  },
  {
    type: 'currency',
    label: 'Currency',
    icon: <DollarSign className="h-4 w-4" />,
    description: 'Currency input'
  },
  {
    type: 'password',
    label: 'Password',
    icon: <Lock className="h-4 w-4" />,
    description: 'Password input'
  },
  {
    type: 'number',
    label: 'Number',
    icon: <Hash className="h-4 w-4" />,
    description: 'Numeric input'
  }
];

interface PaletteItemProps {
  item: PaletteItem;
  onDragStart: (event: React.DragEvent, item: PaletteItem) => void;
}

const PaletteItem: React.FC<PaletteItemProps> = ({ item, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      className={cn(
        "flex items-center px-4 py-2 cursor-move",
        "hover:bg-gray-50 active:bg-gray-100",
        "border-b border-gray-100",
        "transition-colors duration-150"
      )}
    >
      <div className="text-gray-400 mr-3 text-xs">::::</div>
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-500">
        {item.icon}
      </div>
      <span className="ml-3 text-sm">{item.label}</span>
    </div>
  );
};

export interface FormPaletteProps {
  onDragStart: (event: React.DragEvent, item: PaletteItem) => void;
}

export const FormPalette: React.FC<FormPaletteProps> = ({ onDragStart }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Form Elements</h2>
        <p className="text-sm text-gray-600 mt-1">
          Drag and drop elements to build your form
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {paletteItems.map((item) => (
          <PaletteItem
            key={item.type}
            item={item}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default FormPalette;