import React, { useState, useEffect } from 'react';
import { WorkbookData } from './types';
import { initialWorkbookData } from './data/initialData';
import { calculateDashboardKPIs } from './utils/calcEngine';
import { Navbar, TabKey } from './components/Navbar';
import { ActionControls } from './components/ActionControls';
import { Footer } from './components/Footer';

// Views
import { DashboardView } from './views/DashboardView';
import { SettingsView } from './views/SettingsView';
import { IngredientsView } from './views/IngredientsView';
import { PackagingView } from './views/PackagingView';
import { RecipeEngineView } from './views/RecipeEngineView';
import { SalesLogView } from './views/SalesLogView';
import { InventoryView } from './views/InventoryView';
import { PurchasingView } from './views/PurchasingView';
import { PayrollView } from './views/PayrollView';
import { FinanceView } from './views/FinanceView';

const STORAGE_KEY = 'flora_pastry_workbook_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [workbookData, setWorkbookData] = useState<WorkbookData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.settings && Array.isArray(parsed.ingredients)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse localStorage data:', err);
    }
    return initialWorkbookData;
  });

  // Save to localStorage on any data change
  const handleUpdateData = (newData: WorkbookData) => {
    setWorkbookData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const kpis = calculateDashboardKPIs(workbookData);

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex flex-col justify-between">
      <div>
        {/* Top Sticky Navbar (56px) */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          linkErrorCount={kpis.linkErrorCount}
          lowStockCount={kpis.lowStockCount}
        />

        {/* Main Workspace Area (Max width 1400px, centered, 40px px) */}
        <main className="max-w-[1400px] mx-auto px-[40px] py-6">
          {/* Action Controls Bar (Last Saved, Export, Import, CSV, Reset) */}
          <ActionControls
            data={workbookData}
            onUpdateData={handleUpdateData}
            lastSaved={workbookData.lastSavedTimestamp}
          />

          {/* Active Sheet Tab View */}
          <div className="min-h-[600px]">
            {activeTab === 'dashboard' && (
              <DashboardView data={workbookData} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'settings' && (
              <SettingsView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'ingredients' && (
              <IngredientsView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'packaging' && (
              <PackagingView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'recipes' && (
              <RecipeEngineView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'sales' && (
              <SalesLogView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'inventory' && (
              <InventoryView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'purchasing' && (
              <PurchasingView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'payroll' && (
              <PayrollView data={workbookData} onUpdateData={handleUpdateData} />
            )}
            {activeTab === 'finance' && (
              <FinanceView data={workbookData} onUpdateData={handleUpdateData} />
            )}
          </div>
        </main>
      </div>

      {/* Footer with Privacy Notice */}
      <Footer />
    </div>
  );
}
