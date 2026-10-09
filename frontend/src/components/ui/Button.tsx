import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(
        "relative px-6 py-3 text-sm md:text-base font-semibold tracking-widest uppercase transition-all duration-150",
        "border-2 border-white text-white bg-transparent rounded-xl",
        "shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
        "hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-white/5",
        "active:translate-y-[3px] active:translate-x-[3px] active:shadow-none active:bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
