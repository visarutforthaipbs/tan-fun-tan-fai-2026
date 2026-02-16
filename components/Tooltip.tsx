import React, { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  explanation: string;
  active: boolean;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, explanation, active, children }) => {
  if (!active) return <>{children}</>;

  return (
    <span className="group relative inline-block cursor-help border-b-2 border-dotted border-brand-orange">
      {children}
      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-brand-black text-white text-xs rounded-lg shadow-xl z-50">
        <p className="font-bold mb-1 text-brand-orange">{text}</p>
        {explanation}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-black"></div>
      </div>
    </span>
  );
};