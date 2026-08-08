import React from 'react';
import {
  BarChart3,
  Sliders,
  Wheat,
  Package,
  ChefHat,
  ShoppingBag,
  Boxes,
  Truck,
  Users,
  Wallet
} from 'lucide-react';

export type TabKey =
  | 'dashboard'
  | 'settings'
  | 'ingredients'
  | 'packaging'
  | 'recipes'
  | 'sales'
  | 'inventory'
  | 'purchasing'
  | 'payroll'
  | 'finance';

interface NavbarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  linkErrorCount?: number;
  lowStockCount?: number;
}

interface TabConfig {
  key: TabKey;
  sheetCode: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  linkErrorCount = 0,
  lowStockCount = 0
}) => {
  const tabs: TabConfig[] = [
    { key: 'dashboard', sheetCode: '01', label: 'Dashboard', icon: BarChart3, badgeCount: linkErrorCount > 0 ? linkErrorCount : undefined },
    { key: 'settings', sheetCode: '02', label: 'Parameters', icon: Sliders },
    { key: 'ingredients', sheetCode: '03', label: 'Ingredients', icon: Wheat },
    { key: 'packaging', sheetCode: '04', label: 'Packaging', icon: Package },
    { key: 'recipes', sheetCode: '05', label: 'Recipe Engine', icon: ChefHat },
    { key: 'sales', sheetCode: '06', label: 'Sales Log', icon: ShoppingBag },
    { key: 'inventory', sheetCode: '07', label: 'Inventory', icon: Boxes, badgeCount: lowStockCount > 0 ? lowStockCount : undefined },
    { key: 'purchasing', sheetCode: '08', label: 'Purchasing', icon: Truck },
    { key: 'payroll', sheetCode: '09', label: 'Payroll', icon: Users },
    { key: 'finance', sheetCode: '10', label: 'Finance', icon: Wallet }
  ];

  return (
    <header className="sticky top-0 z-40 h-[56px] bg-white border-b border-[#E8E8E6] shadow-xs select-none">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#051C2C] flex items-center justify-center text-white font-heading font-bold text-lg">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-[15px] text-[#051C2C] leading-tight tracking-tight">
              Flora Pastry & Coffee
            </span>
            <span className="text-[10px] text-[#888888] font-medium tracking-wider uppercase">
              Operating Control System
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar h-full pl-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative h-full px-3 text-[12px] font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#051C2C] font-semibold'
                    : 'text-[#051C2C]/60 hover:text-[#051C2C]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2251FF]' : 'text-[#888888]'}`} />
                <span>{tab.label}</span>

                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#D32F2F] text-white leading-none">
                    {tab.badgeCount}
                  </span>
                )}

                {/* Active Tab Underline */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2251FF] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
