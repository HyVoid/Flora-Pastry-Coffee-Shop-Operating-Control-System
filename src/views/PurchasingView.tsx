import React, { useState } from 'react';
import { Truck, Plus, Trash2, Search, DollarSign } from 'lucide-react';
import { WorkbookData, PurchaseOrder, PaymentStatus, RecipeItemType } from '../types';
import { calculatePurchaseOrders } from '../utils/calcEngine';

interface PurchasingViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const PurchasingView: React.FC<PurchasingViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPO, setNewPO] = useState<Partial<PurchaseOrder>>({
    id: `PO${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(data.purchaseOrders.length + 1).padStart(2, '0')}`,
    poDate: new Date().toISOString().slice(0, 10),
    supplierId: 'SUP001',
    itemType: 'Ingredient',
    itemId: data.ingredients[0]?.id || 'ING001',
    qty: 10,
    unitPrice: data.ingredients[0]?.currentCost || 12.50,
    paymentStatus: 'Unpaid'
  });

  const currency = data.settings.currencySymbol;
  const calculatedPOs = calculatePurchaseOrders(data);

  const handleQtyChange = (id: string, newQty: number) => {
    const updated = data.purchaseOrders.map((po) =>
      po.id === id ? { ...po, qty: Math.max(0, newQty) } : po
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, purchaseOrders: updated, lastSavedTimestamp: timestamp });
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    const updated = data.purchaseOrders.map((po) =>
      po.id === id ? { ...po, unitPrice: Math.max(0, newPrice) } : po
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, purchaseOrders: updated, lastSavedTimestamp: timestamp });
  };

  const handleTogglePaymentStatus = (id: string) => {
    const updated = data.purchaseOrders.map((po) => {
      if (po.id === id) {
        const nextStatus: PaymentStatus = po.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
        return { ...po, paymentStatus: nextStatus };
      }
      return po;
    });
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, purchaseOrders: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Delete Purchase Order ${id}?`)) {
      const updated = data.purchaseOrders.filter((po) => po.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, purchaseOrders: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPO.itemId) return;

    const poToAdd: PurchaseOrder = {
      id: newPO.id || `PO${Date.now().toString().slice(-6)}`,
      poDate: newPO.poDate || new Date().toISOString().slice(0, 10),
      supplierId: newPO.supplierId || 'SUP001',
      itemId: newPO.itemId,
      itemType: (newPO.itemType as RecipeItemType) || 'Ingredient',
      qty: Number(newPO.qty) || 0,
      unitPrice: Number(newPO.unitPrice) || 0,
      paymentStatus: (newPO.paymentStatus as PaymentStatus) || 'Unpaid'
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      purchaseOrders: [poToAdd, ...data.purchaseOrders],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
  };

  const filtered = calculatedPOs.filter(
    (po) =>
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPOAmount = calculatedPOs.reduce((sum, po) => sum + po.totalAmount, 0);
  const totalAPBalance = calculatedPOs.reduce((sum, po) => sum + po.apBalance, 0);

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Truck className="w-3.5 h-3.5" />
          <span>Sheet 08 — Supplier POs & Accounts Payable (AP)</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Purchase Orders & Accounts Payable (AP) Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Every Purchase Order (PO) logged immediately feeds stock inflows into Sheet 07 (Inventory). Unpaid POs automatically populate the Accounts Payable (AP) balance.
        </p>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Purchase Orders Volume</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{formatCurrency(totalPOAmount)}</div>
          </div>
          <Truck className="w-6 h-6 text-[#2251FF]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Outstanding AP Balance (Unpaid)</div>
            <div className={`font-heading font-bold text-xl mt-1 ${totalAPBalance > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'}`}>
              {formatCurrency(totalAPBalance)}
            </div>
          </div>
          <DollarSign className="w-6 h-6 text-[#D32F2F]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Logged POs</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{calculatedPOs.length} POs</div>
          </div>
          <div className="text-[11px] font-bold text-[#888888] bg-gray-100 px-2 py-1 rounded-md">Supplier Direct</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="flora-card p-6 border border-[#E8E8E6]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E8E8E6] mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PO, supplier, or item..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Purchase Order</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">PO ID</th>
                <th className="py-2.5 px-3 table-header-cell">PO Date</th>
                <th className="py-2.5 px-3 table-header-cell">Supplier ID</th>
                <th className="py-2.5 px-3 table-header-cell">Item Name</th>
                <th className="py-2.5 px-3 table-header-cell text-right">PO Qty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Unit Price</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Total Amount</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Payment Status</th>
                <th className="py-2.5 px-3 table-header-cell text-right">AP Balance</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C] text-[12px]">{po.id}</td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{po.poDate}</td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{po.supplierId}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">
                    {po.itemName} <span className="text-[11px] font-normal text-[#888888]">({po.itemId})</span>
                  </td>

                  {/* Editable Qty */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={po.qty}
                      onChange={(e) => handleQtyChange(po.id, parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono font-bold text-right w-20"
                    />
                  </td>

                  {/* Editable Unit Price */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={po.unitPrice}
                        onChange={(e) => handlePriceChange(po.id, parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-20"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#051C2C]">
                    {formatCurrency(po.totalAmount)}
                  </td>

                  {/* Interactive Payment Status Toggle */}
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleTogglePaymentStatus(po.id)}
                      className={`interactive-cell px-3 py-1 rounded-full text-[11px] font-semibold ${
                        po.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {po.paymentStatus === 'Paid' ? '✅ Paid' : '🚨 Unpaid'}
                    </button>
                  </td>

                  <td
                    className={`py-2.5 px-3 text-right font-mono font-bold ${
                      po.apBalance > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'
                    }`}
                  >
                    {formatCurrency(po.apBalance)}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(po.id)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors rounded-md hover:bg-red-50"
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
              Create Supplier Purchase Order (PO)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  PO ID
                </label>
                <input
                  type="text"
                  required
                  value={newPO.id}
                  onChange={(e) => setNewPO({ ...newPO, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    PO Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newPO.poDate}
                    onChange={(e) => setNewPO({ ...newPO, poDate: e.target.value })}
                    className="cell-input font-mono w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Supplier ID
                  </label>
                  <input
                    type="text"
                    required
                    value={newPO.supplierId}
                    onChange={(e) => setNewPO({ ...newPO, supplierId: e.target.value })}
                    className="cell-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Item Type
                </label>
                <select
                  value={newPO.itemType}
                  onChange={(e) => {
                    const t = e.target.value as RecipeItemType;
                    const defaultId = t === 'Ingredient' ? data.ingredients[0]?.id : data.packaging[0]?.id;
                    const defaultCost =
                      t === 'Ingredient'
                        ? data.ingredients[0]?.currentCost || 12.5
                        : data.packaging[0]?.unitCost || 0.2;
                    setNewPO({ ...newPO, itemType: t, itemId: defaultId, unitPrice: defaultCost });
                  }}
                  className="cell-input w-full font-semibold"
                >
                  <option value="Ingredient">Raw Ingredient (03_Ingredient_Master)</option>
                  <option value="Packaging">Packaging Material (04_Packaging_Master)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Select Item
                </label>
                <select
                  value={newPO.itemId}
                  onChange={(e) => {
                    const iid = e.target.value;
                    let price = 0;
                    if (newPO.itemType === 'Ingredient') {
                      price = data.ingredients.find((i) => i.id === iid)?.currentCost || 0;
                    } else {
                      price = data.packaging.find((p) => p.id === iid)?.unitCost || 0;
                    }
                    setNewPO({ ...newPO, itemId: iid, unitPrice: price });
                  }}
                  className="cell-input w-full font-medium"
                >
                  {newPO.itemType === 'Ingredient'
                    ? data.ingredients.map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          [{ing.id}] {ing.name} ({currency}{ing.currentCost}/{ing.unit})
                        </option>
                      ))
                    : data.packaging.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          [{pkg.id}] {pkg.name} ({currency}{pkg.unitCost}/{pkg.unit})
                        </option>
                      ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    PO Quantity
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={newPO.qty}
                    onChange={(e) => setNewPO({ ...newPO, qty: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Unit Price ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newPO.unitPrice}
                    onChange={(e) => setNewPO({ ...newPO, unitPrice: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Initial Payment Status
                </label>
                <select
                  value={newPO.paymentStatus}
                  onChange={(e) => setNewPO({ ...newPO, paymentStatus: e.target.value as PaymentStatus })}
                  className="cell-input w-full font-semibold"
                >
                  <option value="Unpaid">Unpaid (Accounts Payable AP)</option>
                  <option value="Paid">Paid Immediately</option>
                </select>
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
                Save Purchase Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
