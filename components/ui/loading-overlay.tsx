import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Saving form...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;