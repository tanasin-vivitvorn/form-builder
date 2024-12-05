// components/form-builder/layout.tsx
import React from 'react';

interface LayoutProps {
  palette: React.ReactNode;
  canvas: React.ReactNode;
  settings: React.ReactNode;
}

export const FormBuilderLayout: React.FC<LayoutProps> = ({
  palette,
  canvas,
  settings,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Palette */}
      <div className="w-64 border-r bg-white flex flex-col">
        {palette}
      </div>

      {/* Form Building Area */}
      <div className="flex-1 p-4 overflow-auto">
        {canvas}
      </div>

      {/* Settings Panel */}
      <div className="w-80 border-l bg-white">
        {settings}
      </div>
    </div>
  );
};