import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E8E8E6] bg-white mt-12 py-6">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#888888] space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#2251FF]" />
          <span>
            All storage features of this tool run locally in localStorage. The page itself does not retain or transmit any user data.
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Flora Pastry & Coffee Shop &copy; {new Date().getFullYear()}</span>
          <span>•</span>
          <span>Excel Workbook SaaS v1.0</span>
        </div>
      </div>
    </footer>
  );
};
