import React, { useState } from 'react';
import { Wallet, Plus, Trash2, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { WorkbookData, CashFlowTx, CashFlowType } from '../types';
import { calculateCashFlows } from '../utils/calcEngine';

interface FinanceViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCf, setNewCf] = useState<Partial<CashFlowTx>>({
    id: `CF${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(data.cashFlows.length + 1).padStart(2, '0')}`,
    date: new Date().toISOString().slice(0, 10),
    category: 'Store Expense',
    txType: 'Expense',
    amount: 150.00,
    account: 'Bank'
  });

  const currency = data.settings.currencySymbol;
  const calculatedCashFlows = calculateCashFlows(data);

  const handleAmountChange = (id: string, newAmount: number) => {
    const updated = data.cashFlows.map((cf) =>
      cf.id === id ? { ...cf, amount: Math.max(0, newAmount) } : cf
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, cashFlows: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Delete cashflow transaction ${id}?`)) {
      const updated = data.cashFlows.filter((cf) => cf.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, cashFlows: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCf.category?.trim()) return;

    const cfToAdd: CashFlowTx = {
      id: newCf.id || `CF${Date.now().toString().slice(-6)}`,
      date: newCf.date || new Date().toISOString().slice(0, 10),
      category: newCf.category.trim(),
      txType: (newCf.txType as CashFlowType) || 'Expense',
      amount: Number(newCf.amount) || 0,
      account: (newCf.account as 'Cash' | 'Bank') || 'Bank'
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      cashFlows: [cfToAdd, ...data.cashFlows],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
  };

  const filtered = calculatedCashFlows.filter(
    (cf) =>
      cf.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cf.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cf.date.includes(searchTerm)
  );

  const totalInflows = calculatedCashFlows
    .filter((cf) => cf.txType === 'Income')
    .reduce((sum, cf) => sum + cf.amount, 0);

  const totalOutflows = calculatedCashFlows
    .filter((cf) => cf.txType === 'Expense')
    .reduce((sum, cf) => sum + cf.amount, 0);

  const netCashBalance = calculatedCashFlows.reduce((sum, cf) => sum + cf.netCashImpact, 0);

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Wallet className="w-3.5 h-3.5" />
          <span>Sheet 10 — Store Financials & Cash Flow Ledger</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Cash Flow & Store Operating Expenses Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Logs store operating overhead (rent, utilities, leases, software) and non-sales deposits. Net cash impact automatically populates the ending cash balance on the Executive Dashboard.
        </p>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Cash Inflows</div>
            <div className="font-heading font-bold text-xl text-[#00C853] mt-1 flex items-center space-x-1">
              <span>{formatCurrency(totalInflows)}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-[#00C853]">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Cash Outflows (OPEX)</div>
            <div className="font-heading font-bold text-xl text-[#D32F2F] mt-1 flex items-center space-x-1">
              <span>{formatCurrency(totalOutflows)}</span>
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-red-50 text-[#D32F2F]">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Net Cash Position</div>
            <div
              className={`font-heading font-bold text-xl mt-1 ${
                netCashBalance >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'
              }`}
            >
              {formatCurrency(netCashBalance)}
            </div>
          </div>
          <div className="text-[11px] font-bold text-[#888888] bg-gray-100 px-2 py-1 rounded-md">
            Liquidity
          </div>
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
              placeholder="Search category, date or ID..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Record Cash Transaction</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Tx ID</th>
                <th className="py-2.5 px-3 table-header-cell">Date</th>
                <th className="py-2.5 px-3 table-header-cell">Category / Description</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Type</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Amount</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Account</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Net Cash Impact</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((cf) => (
                <tr key={cf.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C] text-[12px]">{cf.id}</td>
                  <td className="py-2.5 px-3 font-mono text-[12px] text-[#888888]">{cf.date}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">{cf.category}</td>

                  <td className="py-2.5 px-3 text-center font-mono text-[11px]">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold ${
                        cf.txType === 'Income'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {cf.txType}
                    </span>
                  </td>

                  {/* Editable Amount */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="10"
                        min="0"
                        value={cf.amount}
                        onChange={(e) => handleAmountChange(cf.id, parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-24"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-center font-mono text-[12px] text-[#888888]">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-md font-semibold text-[#051C2C]">
                      {cf.account}
                    </span>
                  </td>

                  <td
                    className={`py-2.5 px-3 text-right font-mono font-bold ${
                      cf.netCashImpact >= 0 ? 'text-[#00C853]' : 'text-[#D32F2F]'
                    }`}
                  >
                    {cf.netCashImpact >= 0 ? `+${formatCurrency(cf.netCashImpact)}` : formatCurrency(cf.netCashImpact)}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(cf.id)}
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
              Record Cash Flow Entry
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  required
                  value={newCf.id}
                  onChange={(e) => setNewCf({ ...newCf, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newCf.date}
                    onChange={(e) => setNewCf({ ...newCf, date: e.target.value })}
                    className="cell-input font-mono w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Flow Type
                  </label>
                  <select
                    value={newCf.txType}
                    onChange={(e) => setNewCf({ ...newCf, txType: e.target.value as CashFlowType })}
                    className="cell-input w-full font-semibold"
                  >
                    <option value="Expense">Expense (Outflow)</option>
                    <option value="Income">Income (Inflow)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Category / Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly Electricity Bill"
                  value={newCf.category}
                  onChange={(e) => setNewCf({ ...newCf, category: e.target.value })}
                  className="cell-input w-full font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Amount ({currency})
                  </label>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    required
                    value={newCf.amount}
                    onChange={(e) => setNewCf({ ...newCf, amount: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Settlement Account
                  </label>
                  <select
                    value={newCf.account}
                    onChange={(e) => setNewCf({ ...newCf, account: e.target.value as 'Cash' | 'Bank' })}
                    className="cell-input w-full font-semibold"
                  >
                    <option value="Bank">Bank Account</option>
                    <option value="Cash">Cash Drawer</option>
                  </select>
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
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
