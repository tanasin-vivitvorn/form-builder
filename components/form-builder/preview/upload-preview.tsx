// components/form-builder/preview/upload-preview.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, className = '' }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  if (!file) return null;

  return (
    <div className={className}>
      {file.type.startsWith('image/') ? (
        <div className="relative w-full h-32">
          {preview && (
            <img
              src={preview}
              alt={file.name}
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
      ) : (
        <div className="flex items-center p-2 bg-gray-50 rounded-md">
          <div className="flex-1 truncate">{file.name}</div>
          <div className="text-sm text-gray-500 ml-2">
            {(file.size / 1024).toFixed(1)}KB
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

interface UploadPreviewProps {
  value?: FileList | null;
  onChange: (files: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  capture?: boolean;
  className?: string;
}

export const UploadPreview: React.FC<UploadPreviewProps> = ({
  value = null,
  onChange,
  multiple = false,
  accept,
  capture = false,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const files = value ? Array.from(value) : [];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.length) {
      onChange(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onChange(e.target.files);
    }
  };

  const handleRemove = (index: number) => {
    if (!value?.length) return;
    
    const dt = new DataTransfer();
    Array.from(value).forEach((file, i) => {
      if (i !== index) dt.items.add(file);
    });
    onChange(dt.files.length ? dt.files : null);
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "transition-colors duration-200"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          capture={capture ? 'environment' : undefined}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="text-center">
          {capture ? (
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-blue-500 hover:text-blue-600"
            >
              {capture ? 'Take a photo' : 'Upload a file'}
            </button>
            {!capture && (
              <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
            )}
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <FilePreview
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPreview;