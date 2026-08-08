import React, { useState } from 'react';
import { Boxes, Search, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { WorkbookData, InventoryRecord, RecipeItemType } from '../types';
import { calculateInventoryMovements } from '../utils/calcEngine';

interface InventoryViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Ingredient' | 'Packaging'>('All');

  const currency = data.settings.currencySymbol;
  const inventoryItems = calculateInventoryMovements(data);

  // Maximum stock value for scaling data bars
  const maxStockValue = Math.max(...inventoryItems.map((i) => i.stockValue), 1);

  const handleLossChange = (itemType: RecipeItemType, itemId: string, newLoss: number) => {
    const existingIndex = data.inventoryRecords.findIndex(
      (r) => r.itemType === itemType && r.itemId === itemId
    );

    let updatedRecords: InventoryRecord[];
    if (existingIndex >= 0) {
      updatedRecords = data.inventoryRecords.map((r, idx) =>
        idx === existingIndex ? { ...r, lossQty: Math.max(0, newLoss) } : r
      );
    } else {
      updatedRecords = [
        ...data.inventoryRecords,
        { itemType, itemId, openingQty: 0, lossQty: Math.max(0, newLoss) }
      ];
    }

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, inventoryRecords: updatedRecords, lastSavedTimestamp: timestamp });
  };

  const handleOpeningChange = (itemType: RecipeItemType, itemId: string, newOpening: number) => {
    const existingIndex = data.inventoryRecords.findIndex(
      (r) => r.itemType === itemType && r.itemId === itemId
    );

    let updatedRecords: InventoryRecord[];
    if (existingIndex >= 0) {
      updatedRecords = data.inventoryRecords.map((r, idx) =>
        idx === existingIndex ? { ...r, openingQty: Math.max(0, newOpening) } : r
      );
    } else {
      updatedRecords = [
        ...data.inventoryRecords,
        { itemType, itemId, openingQty: Math.max(0, newOpening), lossQty: 0 }
      ];
    }

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, inventoryRecords: updatedRecords, lastSavedTimestamp: timestamp });
  };

  const filtered = inventoryItems.filter((i) => {
    const matchesType = filterType === 'All' || i.itemType === filterType;
    const matchesSearch =
      i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.itemId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalAssetValue = inventoryItems.reduce((sum, i) => sum + i.stockValue, 0);
  const reorderAlertsCount = inventoryItems.filter((i) => i.stockStatus === '🚨 Reorder Alert').length;

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Boxes className="w-3.5 h-3.5" />
          <span>Sheet 07 — Dynamic Stock & Inventory Movement Ledger</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Dynamic Stock Movement & Inventory Valuation Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Zero-maintenance inventory formula: <code className="font-mono text-[#051C2C]">Current = Opening + PO In - Recipe Sales Out - Loss</code>. Sales outflow is automatically calculated by multiplying logged sales volume by product recipe BOM quantities.
        </p>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Inventory Asset Value</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">
              {formatCurrency(totalAssetValue)}
            </div>
          </div>
          <Boxes className="w-6 h-6 text-[#2251FF]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Reorder Alerts</div>
            <div
              className={`font-heading font-bold text-xl mt-1 ${
                reorderAlertsCount > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'
              }`}
            >
              {reorderAlertsCount} items low
            </div>
          </div>
          {reorderAlertsCount > 0 ? (
            <AlertTriangle className="w-6 h-6 text-[#D32F2F]" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-[#00C853]" />
          )}
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Monitored Items</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">
              {inventoryItems.length} SKUs
            </div>
          </div>
          <div className="text-[11px] font-bold text-[#888888] bg-gray-100 px-2 py-1 rounded-md">
            Auto-linked
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="flora-card p-6 border border-[#E8E8E6]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E8E8E6] mb-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search inventory item or ID..."
                className="cell-input pl-9 w-full text-[12px]"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="cell-input font-semibold text-[#051C2C] text-[12px]"
            >
              <option value="All">All Types</option>
              <option value="Ingredient">Ingredients Only</option>
              <option value="Packaging">Packaging Only</option>
            </select>
          </div>

          <div className="text-[11px] text-[#888888]">
            Outflow calculated dynamically from Sheet 06 Sales Log & Sheet 05 Recipe BOMs
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Item Type</th>
                <th className="py-2.5 px-3 table-header-cell">Item Name</th>
                <th className="py-2.5 px-3 table-header-cell">Unit</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Opening Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">PO In Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Sales Out Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Loss / Waste Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Current Stock</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Stock Status</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Asset Valuation & Data Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((item) => {
                const fillPct = Math.min(100, Math.max(4, (item.stockValue / maxStockValue) * 100));

                return (
                  <tr key={`${item.itemType}-${item.itemId}`} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold ${
                          item.itemType === 'Ingredient'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {item.itemType}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 font-semibold text-[#051C2C]">
                      {item.itemName} <span className="text-[11px] font-normal text-[#888888]">({item.itemId})</span>
                    </td>

                    <td className="py-2.5 px-3 text-[#888888] font-mono">{item.unit}</td>

                    {/* Editable Opening Qty */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={item.openingQty}
                        onChange={(e) =>
                          handleOpeningChange(item.itemType, item.itemId, parseFloat(e.target.value) || 0)
                        }
                        className="cell-input font-mono text-right w-20"
                      />
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-medium">
                      +{item.inQty.toFixed(2)}
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono text-amber-700 font-medium">
                      -{item.outQty.toFixed(2)}
                    </td>

                    {/* Editable Loss Qty */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.lossQty}
                        onChange={(e) =>
                          handleLossChange(item.itemType, item.itemId, parseFloat(e.target.value) || 0)
                        }
                        className="cell-input font-mono text-right w-20 text-[#D32F2F] font-bold"
                      />
                    </td>

                    {/* Calculated Current Qty */}
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#051C2C]">
                      {item.currentQty.toFixed(2)}
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.stockStatus === '🚨 Reorder Alert'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {item.stockStatus}
                      </span>
                    </td>

                    {/* Stock Value with Inline Data Bar */}
                    <td className="py-2.5 px-3 text-right min-w-[180px]">
                      <div className="font-mono font-bold text-[#051C2C] mb-1">
                        {formatCurrency(item.stockValue)}
                      </div>
                      <div className="data-bar-track">
                        <div className="data-bar-fill" style={{ width: `${fillPct}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
