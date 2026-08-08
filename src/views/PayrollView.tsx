import React, { useState } from 'react';
import { Users, Plus, Trash2, Search, DollarSign } from 'lucide-react';
import { WorkbookData, Employee } from '../types';
import { calculatePayroll } from '../utils/calcEngine';

interface PayrollViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const PayrollView: React.FC<PayrollViewProps> = ({ data, onUpdateData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmp, setNewEmp] = useState<Partial<Employee>>({
    id: `EMP${String(data.employees.length + 1).padStart(3, '0')}`,
    name: '',
    baseHourlyRate: 20.00,
    regularHours: 160,
    overtimeHours: 0,
    bonus: 0,
    penalty: 0
  });

  const currency = data.settings.currencySymbol;
  const calculatedEmployees = calculatePayroll(data);

  const handleEmpFieldChange = (id: string, field: keyof Employee, value: number) => {
    const updated = data.employees.map((emp) =>
      emp.id === id ? { ...emp, [field]: Math.max(0, value) } : emp
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, employees: updated, lastSavedTimestamp: timestamp });
  };

  const handleDelete = (id: string) => {
    if (confirm(`Delete employee record ${id}?`)) {
      const updated = data.employees.filter((emp) => emp.id !== id);
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      onUpdateData({ ...data, employees: updated, lastSavedTimestamp: timestamp });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name?.trim()) return;

    const empToAdd: Employee = {
      id: newEmp.id || `EMP${Date.now().toString().slice(-4)}`,
      name: newEmp.name.trim(),
      baseHourlyRate: Number(newEmp.baseHourlyRate) || 18,
      regularHours: Number(newEmp.regularHours) || 160,
      overtimeHours: Number(newEmp.overtimeHours) || 0,
      bonus: Number(newEmp.bonus) || 0,
      penalty: Number(newEmp.penalty) || 0
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      employees: [...data.employees, empToAdd],
      lastSavedTimestamp: timestamp
    });

    setShowAddModal(false);
  };

  const filtered = calculatedEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayrollCost = calculatedEmployees.reduce((sum, emp) => sum + emp.totalPay, 0);
  const totalRegularHours = calculatedEmployees.reduce((sum, emp) => sum + emp.regularHours, 0);
  const totalOTHours = calculatedEmployees.reduce((sum, emp) => sum + emp.overtimeHours, 0);

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Users className="w-3.5 h-3.5" />
          <span>Sheet 09 — Staff Payroll & Labor Cost Engine</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Employee Hours & Monthly Payroll Ledger
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Overtime pay formula automatically references Sheet 02 Overtime Multiplier (<code className="font-mono text-[#051C2C]">{data.settings.otFactor}x</code>). Total monthly labor cost is fed into the executive P&L statement as an operating expense.
        </p>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Payroll Expenditure</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{formatCurrency(totalPayrollCost)}</div>
          </div>
          <DollarSign className="w-6 h-6 text-[#2251FF]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Total Staff Regular Hours</div>
            <div className="font-heading font-bold text-xl text-[#051C2C] mt-1">{totalRegularHours} hrs</div>
          </div>
          <Users className="w-6 h-6 text-[#888888]" />
        </div>

        <div className="flora-card p-4 border border-[#E8E8E6] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#888888] uppercase">Overtime Hours ({data.settings.otFactor}x)</div>
            <div className="font-heading font-bold text-xl text-[#2251FF] mt-1">{totalOTHours} hrs</div>
          </div>
          <div className="text-[11px] font-bold text-[#2251FF] bg-blue-50 px-2 py-1 rounded-md">
            {data.settings.otFactor}x OT Rate
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
              placeholder="Search staff name or ID..."
              className="cell-input pl-9 w-full text-[12px]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Employee ID</th>
                <th className="py-2.5 px-3 table-header-cell">Staff Name</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Base Hourly Rate</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Regular Hours</th>
                <th className="py-2.5 px-3 table-header-cell text-right">OT Hours ({data.settings.otFactor}x)</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Bonus</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Penalty</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Overtime Pay</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Total Net Pay</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#051C2C] text-[12px]">{emp.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#051C2C]">{emp.name}</td>

                  {/* Editable Base Rate */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className="font-semibold text-[#051C2C]">{currency}</span>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={emp.baseHourlyRate}
                        onChange={(e) => handleEmpFieldChange(emp.id, 'baseHourlyRate', parseFloat(e.target.value) || 0)}
                        className="cell-input font-mono font-bold text-right w-20"
                      />
                    </div>
                  </td>

                  {/* Editable Regular Hours */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      min="0"
                      value={emp.regularHours}
                      onChange={(e) => handleEmpFieldChange(emp.id, 'regularHours', parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono text-right w-20"
                    />
                  </td>

                  {/* Editable OT Hours */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      min="0"
                      value={emp.overtimeHours}
                      onChange={(e) => handleEmpFieldChange(emp.id, 'overtimeHours', parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono font-bold text-[#2251FF] text-right w-16"
                    />
                  </td>

                  {/* Editable Bonus */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      min="0"
                      value={emp.bonus}
                      onChange={(e) => handleEmpFieldChange(emp.id, 'bonus', parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono text-right w-20"
                    />
                  </td>

                  {/* Editable Penalty */}
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      min="0"
                      value={emp.penalty}
                      onChange={(e) => handleEmpFieldChange(emp.id, 'penalty', parseFloat(e.target.value) || 0)}
                      className="cell-input font-mono text-right w-16 text-[#D32F2F]"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(emp.overtimePay)}</td>

                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#051C2C] text-sm">
                    {formatCurrency(emp.totalPay)}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(emp.id)}
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
              Add New Staff Member
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  required
                  value={newEmp.id}
                  onChange={(e) => setNewEmp({ ...newEmp, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="cell-input w-full font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Base Hourly Rate ({currency})
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    required
                    value={newEmp.baseHourlyRate}
                    onChange={(e) => setNewEmp({ ...newEmp, baseHourlyRate: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Regular Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newEmp.regularHours}
                    onChange={(e) => setNewEmp({ ...newEmp, regularHours: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    OT Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newEmp.overtimeHours}
                    onChange={(e) => setNewEmp({ ...newEmp, overtimeHours: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono font-bold text-[#2251FF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Bonus ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newEmp.bonus}
                    onChange={(e) => setNewEmp({ ...newEmp, bonus: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                    Penalty ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newEmp.penalty}
                    onChange={(e) => setNewEmp({ ...newEmp, penalty: parseFloat(e.target.value) || 0 })}
                    className="cell-input w-full font-mono text-[#D32F2F]"
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
                Save Staff Member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
