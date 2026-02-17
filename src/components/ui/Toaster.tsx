import { Toaster as SonnerToaster } from "sonner";
import React from "react";

export const Toaster = () => {
  return (
    <SonnerToaster 
      richColors 
      position="top-right" 
      toastOptions={{
        style: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'inherit'
        },
        className: 'dark:bg-slate-900/80 dark:border-slate-800 dark:text-white'
      }}
    />
  );
};
