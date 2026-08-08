import React, { useState } from 'react';
import { Wheat, Plus, Trash2, Search, ArrowUpDown } from 'lucide-react';
import { WorkbookData, Ingredient } from '../types';

interface IngredientsViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const IngredientsView: React.FC<IngredientsViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newIng, setNewIng] = useState<Partial<Ingredient>>({
    id: `ING${String(data.ingredients.length + 1).padStart(3, '0')}`,
    name: '',
    unit: 'kg',
    currentCost: 0,
    supplierId: 'SUP001',
    minStockQty: 10
  });

  const currency = data.settings.currencySymbol;

  const handleCostChange = (id: string, newCost: number) => {
    const updated = data.ingredients.map((ing) =>
      ing.id === id ? { ...ing, currentCost: Math.max(0, newCost) } : ing
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, ingredients: updated, lastSavedTimestamp: timestamp });
  };

  const handleMinStockChange = (id: string, newMin: number) => {
    const updated = data.ingredients.map((ing) =>
      ing.id === id ? { ...ing, minStockQty: Math.max(0, newMin) } : ing
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, ingredients: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete ingredient ${id}?`)) {
      const updated = data.ingredients.filter((ing) => ing.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, ingredients: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIng.name?.trim()) return;

    const ingToAdd: Ingredient = {
      id: newIng.id || `ING${Date.now().toString().slice(-4)}`,
      name: newIng.name.trim(),
      unit: newIng.unit || 'kg',
      currentCost: Number(newIng.currentCost) || 0,
      supplierId: newIng.supplierId || 'SUP001',
      minStockQty: Number(newIng.minStockQty) || 0
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      ingredients: [...data.ingredients, ingToAdd],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
    setNewIng({
      id: `ING${String(data.ingredients.length + 2).padStart(3, '0')}`,
      name: '',
      unit: 'kg',
      currentCost: 0,
      supplierId: 'SUP001',
      minStockQty: 10
    });
  };

  const filtered = data.ingredients.filter(
    (ing) =>
      ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ing.supplierId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Wheat className="w-3.5 h-3.5" />
          <span>Sheet 03 — Ingredient Master & Cost Engine Origin</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Raw Ingredients Master Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Modifying <span className="font-bold text-[#051C2C]">Current Cost</span> in the yellow editable cells immediately triggers the calculation engine to recalculate single-product BOM costs, sales margins, and inventory asset valuations across the workbook.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="flora-card p-6 border border-[#E8E8E6]">
        {/* Table Controls Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E8E8E6] mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ingredient or ID..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Ingredient</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Ingredient ID</th>
                <th className="py-2.5 px-3 table-header-cell">Ingredient Name</th>
                <th className="py-2.5 px-3 table-header-cell">Unit</th>
                <th className="py-2.5 px-3 table-header-cell text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span>Current Unit Cost</span>
                    <ArrowUpDown className="w-3 h-3 text-[#2251FF]" />
                  </div>
                </th>
                <th className="py-2.5 px-3 table-header-cell">Supplier ID</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Min Stock Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Safety Buffer (Auto)</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((ing) => (
                <tr key={ing.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C]">{ing.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">{ing.name}</td>
                  <td className="py-2.5 px-3 text-[#888888] font-mono">{ing.unit}</td>

                  {/* Editable Unit Cost */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={ing.currentCost}
                        onChange={(e) => handleCostChange(ing.id, parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-24"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{ing.supplierId}</td>

                  {/* Editable Min Stock Qty */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={ing.minStockQty}
                      onChange={(e) => handleMinStockChange(ing.id, parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono w-20 text-right"
                    />
                  </td>

                  {/* Auto Safety Buffer Ratio */}
                  <td className="py-2.5 px-3 text-right font-mono text-[#888888]">
                    {(data.settings.safetyBuffer * 100).toFixed(0)}%
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(ing.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors rounded-md hover:bg-red-50"
                      title="Delete ingredient"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/50 backdrop-blur-xs p-4 animate-fade-up">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white rounded-xl shadow-modal max-w-md w-full p-6 border border-[#E8E8E6] space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-[#051C2C] border-b border-[#E8E8E6] pb-3">
              Add New Raw Ingredient
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Ingredient ID
                </label>
                <input
                  type="text"
                  required
                  value={newIng.id}
                  onChange={(e) => setNewIng({ ...newIng, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Cane Sugar"
                  value={newIng.name}
                  onChange={(e) => setNewIng({ ...newIng, name: e.target.value })}
                  className="cell-input w-full font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="kg / L / pcs"
                    value={newIng.unit}
                    onChange={(e) => setNewIng({ ...newIng, unit: e.target.value })}
                    className="cell-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Unit Cost ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newIng.currentCost}
                    onChange={(e) => setNewIng({ ...newIng, currentCost: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Supplier ID
                  </label>
                  <input
                    type="text"
                    value={newIng.supplierId}
                    onChange={(e) => setNewIng({ ...newIng, supplierId: e.target.value })}
                    className="cell-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Min Stock Safety
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newIng.minStockQty}
                    onChange={(e) => setNewIng({ ...newIng, minStockQty: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E8E8E6]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs"
              >
                Save Ingredient
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
