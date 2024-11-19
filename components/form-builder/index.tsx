'use client';

import React from 'react';
import { FormBuilderProps } from '@/types/form-builder';

export const FormBuilder: React.FC<FormBuilderProps> = ({ 
  initialConfig,
  onSave,
  onPreview,
  onChange 
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Form Elements</h2>
        {/* Palette will go here */}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="min-h-full border-2 border-dashed rounded-lg p-4">
          {/* Form building area will go here */}
        </div>
      </div>

      <div className="w-80 border-l bg-white">
        {/* Settings panel will go here */}
      </div>
    </div>
  );
};

export default FormBuilder;
