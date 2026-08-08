import React, { useState } from 'react';
import { Package, Plus, Trash2, Search } from 'lucide-react';
import { WorkbookData, Packaging } from '../types';

interface PackagingViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const PackagingView: React.FC<PackagingViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPkg, setNewPkg] = useState<Partial<Packaging>>({
    id: `PKG${String(data.packaging.length + 1).padStart(3, '0')}`,
    name: '',
    unit: 'pcs',
    unitCost: 0.15,
    supplierId: 'SUP006'
  });

  const currency = data.settings.currencySymbol;

  const handleCostChange = (id: string, newCost: number) => {
    const updated = data.packaging.map((pkg) =>
      pkg.id === id ? { ...pkg, unitCost: Math.max(0, newCost) } : pkg
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, packaging: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete packaging item ${id}?`)) {
      const updated = data.packaging.filter((pkg) => pkg.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, packaging: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.name?.trim()) return;

    const pkgToAdd: Packaging = {
      id: newPkg.id || `PKG${Date.now().toString().slice(-4)}`,
      name: newPkg.name.trim(),
      unit: newPkg.unit || 'pcs',
      unitCost: Number(newPkg.unitCost) || 0,
      supplierId: newPkg.supplierId || 'SUP006'
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      packaging: [...data.packaging, pkgToAdd],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
    setNewPkg({
      id: `PKG${String(data.packaging.length + 2).padStart(3, '0')}`,
      name: '',
      unit: 'pcs',
      unitCost: 0.15,
      supplierId: 'SUP006'
    });
  };

  const filtered = data.packaging.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.supplierId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Package className="w-3.5 h-3.5" />
          <span>Sheet 04 — Packaging Master & Takeout Cost Ledger</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Packaging Materials & Box Master Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Packaging materials (pastry boxes, coffee cups, lids, carry bags) are factored into single-product BOM costs. Unit costs are recorded to 3 decimal places for maximum precision.
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
              placeholder="Search packaging or ID..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Packaging</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Packaging ID</th>
                <th className="py-2.5 px-3 table-header-cell">Packaging Name</th>
                <th className="py-2.5 px-3 table-header-cell">Unit</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Unit Cost (3 Decimals)</th>
                <th className="py-2.5 px-3 table-header-cell">Supplier ID</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C]">{pkg.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">{pkg.name}</td>
                  <td className="py-2.5 px-3 text-[#888888] font-mono">{pkg.unit}</td>

                  {/* Editable Unit Cost */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="0.001"
                        min="0"
                        value={pkg.unitCost}
                        onChange={(e) => handleCostChange(pkg.id, parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-24"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{pkg.supplierId}</td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors rounded-md hover:bg-red-50"
                      title="Delete packaging"
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
              Add New Packaging Item
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Packaging ID
                </label>
                <input
                  type="text"
                  required
                  value={newPkg.id}
                  onChange={(e) => setNewPkg({ ...newPkg, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Packaging Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Croissant Bag Medium"
                  value={newPkg.name}
                  onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
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
                    placeholder="pcs / pack"
                    value={newPkg.unit}
                    onChange={(e) => setNewPkg({ ...newPkg, unit: e.target.value })}
                    className="cell-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Unit Cost ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    required
                    value={newPkg.unitCost}
                    onChange={(e) => setNewPkg({ ...newPkg, unitCost: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Supplier ID
                </label>
                <input
                  type="text"
                  value={newPkg.supplierId}
                  onChange={(e) => setNewPkg({ ...newPkg, supplierId: e.target.value })}
                  className="cell-input w-full"
                />
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
                Save Packaging
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
