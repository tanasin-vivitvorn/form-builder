'use client';

import React, { useEffect, useState } from 'react';
import { FormPreview } from './components/form-builder/preview';
import { FormConfig } from '@/types/form-builder';
import { Loader2 } from 'lucide-react';

interface FormLoaderProps {
 formId: string;
 onSubmit?: (data: any) => void;
}

export const FormLoader: React.FC<FormLoaderProps> = ({ formId, onSubmit }) => {
 const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchForm = async () => {
     try {
       setLoading(true);
       const response = await fetch(`/api/forms/${formId}`);
       
       if (!response.ok) {
         throw new Error(`Failed to fetch form: ${response.statusText}`);
       }
       
       const data = await response.json();
       setFormConfig(data);
     } catch (err) {
       setError(err instanceof Error ? err.message : 'Failed to load form');
     } finally {
       setLoading(false);
     }
   };

   fetchForm();
 }, [formId]);

 if (loading) {
   return (
     <div className="flex items-center justify-center min-h-[200px]">
       <Loader2 className="h-8 w-8 animate-spin" />
     </div>
   );
 }

 if (error) {
   return (
     <div className="rounded-lg border border-red-100 bg-red-50 p-4">
       <p className="text-sm text-red-500">{error}</p>
     </div>
   );
 }

 if (!formConfig) {
   return (
     <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
       <p className="text-sm text-gray-500">No form configuration found</p>
     </div>
   );
 }

 return <FormPreview config={formConfig} onSubmit={onSubmit} />;
};

export default FormLoader;