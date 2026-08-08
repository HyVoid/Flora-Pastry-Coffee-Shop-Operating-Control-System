import React, { useState } from 'react';
import { ShoppingBag, Plus, Trash2, Search, DollarSign, AlertCircle } from 'lucide-react';
import { WorkbookData, SalesTx } from '../types';
import { calculateSalesTransactions } from '../utils/calcEngine';

interface SalesLogViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const SalesLogView: React.FC<SalesLogViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTx, setNewTx] = useState<Partial<SalesTx>>({
    id: `TX${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(data.sales.length + 1).padStart(2, '0')}`,
    date: new Date().toISOString().slice(0, 10),
    productId: data.products[0]?.id || 'PRD001',
    qtySold: 1,
    actualPrice: data.products[0]?.sellingPrice || 4.80
  });

  const currency = data.settings.currencySymbol;
  const calculatedSales = calculateSalesTransactions(data);

  const handleQtyChange = (id: string, newQty: number) => {
    const updated = data.sales.map((tx) =>
      tx.id === id ? { ...tx, qtySold: Math.max(1, newQty) } : tx
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, sales: updated, lastSavedTimestamp: timestamp });
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    const updated = data.sales.map((tx) =>
      tx.id === id ? { ...tx, actualPrice: Math.max(0, newPrice) } : tx
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, sales: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Delete sales transaction ${id}?`)) {
      const updated = data.sales.filter((tx) => tx.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, sales: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.productId) return;

    const txToAdd: SalesTx = {
      id: newTx.id || `TX${Date.now().toString().slice(-6)}`,
      date: newTx.date || new Date().toISOString().slice(0, 10),
      productId: newTx.productId,
      qtySold: Number(newTx.qtySold) || 1,
      actualPrice: Number(newTx.actualPrice) || 0
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      sales: [txToAdd, ...data.sales],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
  };

  const filtered = calculatedSales.filter(
    (s) =>
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.date.includes(searchTerm)
  );

  const totalRev = calculatedSales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalProfit = calculatedSales.reduce((sum, s) => sum + s.grossProfit, 0);
  const totalQty = calculatedSales.reduce((sum, s) => sum + s.qtySold, 0);

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Sheet 06 — Sales Transactions Log & Revenue Ledger</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Daily Sales Transactions & Real-Time Margin Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Every sale logged automatically pulls the latest unit BOM cost from Sheet 05 (Recipe Engine), calculates gross margin, computes tax liabilities, and triggers ingredient inventory deductions in Sheet 07.
        </p>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Sales Revenue</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{formatCurrency(totalRev)}</div>
          </div>
          <DollarSign className="w-6 h-6 text-[#2251FF]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Gross Profit</div>
            <div className="font-heading font-bold text-xl text-[#00C853] mt-1">{formatCurrency(totalProfit)}</div>
          </div>
          <div className="text-[11px] font-bold text-[#2251FF] bg-blue-50 px-2 py-1 rounded-md">
            {totalRev > 0 ? ((totalProfit / totalRev) * 100).toFixed(1) : 0}% Margin
          </div>
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Units Sold</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{totalQty} units</div>
          </div>
          <ShoppingBag className="w-6 h-6 text-[#888888]" />
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
              placeholder="Search sales transaction, product or date..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Record Sales Entry</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Tx ID</th>
                <th className="py-2.5 px-3 table-header-cell">Date</th>
                <th className="py-2.5 px-3 table-header-cell">Product Name</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Qty Sold</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Actual Price</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Unit BOM Cost</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Total Revenue</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Total Cost</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Gross Profit</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Tax (5%)</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Link Health</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C] text-[12px]">{s.id}</td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{s.date}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">
                    {s.productName} <span className="text-[11px] font-normal text-[#888888]">({s.productId})</span>
                  </td>

                  {/* Editable Qty Sold */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      min="1"
                      value={s.qtySold}
                      onChange={(e) => handleQtyChange(s.id, parseInt(e.target.value) || 1)}
                      className="cell-input font-mono font-bold text-right w-16"
                    />
                  </td>

                  {/* Editable Actual Price */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="0.10"
                        min="0"
                        value={s.actualPrice}
                        onChange={(e) => handlePriceChange(s.id, parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-20"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(s.unitBOMCost)}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#051C2C]">
                    {formatCurrency(s.totalRevenue)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(s.totalBOMCost)}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#2251FF]">
                    {formatCurrency(s.grossProfit)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(s.taxAmount)}</td>

                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        s.linkStatus === '✅ Normal'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {s.linkStatus}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(s.id)}
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
              Record Sales Transaction
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  required
                  value={newTx.id}
                  onChange={(e) => setNewTx({ ...newTx, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Transaction Date
                </label>
                <input
                  type="date"
                  required
                  value={newTx.date}
                  onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Select Product
                </label>
                <select
                  value={newTx.productId}
                  onChange={(e) => {
                    const pid = e.target.value;
                    const prod = data.products.find((p) => p.id === pid);
                    setNewTx({
                      ...newTx,
                      productId: pid,
                      actualPrice: prod ? prod.sellingPrice : 5.0
                    });
                  }}
                  className="cell-input w-full font-semibold text-[#051C2C]"
                >
                  {data.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.id}] {p.name} — ({currency}{p.sellingPrice.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Quantity Sold
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTx.qtySold}
                    onChange={(e) => setNewTx({ ...newTx, qtySold: parseInt(e.target.value) || 1 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Actual Unit Price ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    required
                    value={newTx.actualPrice}
                    onChange={(e) => setNewTx({ ...newTx, actualPrice: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
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
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
