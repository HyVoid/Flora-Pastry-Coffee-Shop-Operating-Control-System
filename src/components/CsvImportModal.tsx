import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { WorkbookData } from '../types';
import { parseCSV } from '../utils/csvHandler';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

type ImportTarget = 'sales' | 'ingredients' | 'packaging' | 'purchaseOrders' | 'employees' | 'cashFlows';

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData
}) => {
  const [target, setTarget] = useState<ImportTarget>('sales');
  const [csvText, setCsvText] = useState('');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCsvText(content);
        setStatusMessage(null);
      }
    };
    reader.readAsText(file);
  };

  const executeImport = () => {
    setStatusMessage(null);
    if (!csvText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste CSV content or upload a CSV file first.' });
      return;
    }

    try {
      const records = parseCSV(csvText);
      if (records.length === 0) {
        setStatusMessage({ type: 'error', text: 'No valid data rows found in CSV.' });
        return;
      }

      const updatedData: WorkbookData = { ...data };
      const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
      updatedData.lastSavedTimestamp = timestamp;

      let importedCount = 0;

      if (target === 'sales') {
        const newSales = records.map((r, idx) => ({
          id: r.id || r.txid || `TX-IMP-${Date.now()}-${idx + 1}`,
          date: r.date || r.txdate || new Date().toISOString().split('T')[0],
          productId: r.productid || r.product || 'PRD001',
          qtySold: parseFloat(r.qtysold || r.qty || '1') || 1,
          actualPrice: parseFloat(r.actualprice || r.price || '0') || 0
        }));

        importedCount = newSales.length;
        updatedData.sales = mode === 'replace' ? newSales : [...data.sales, ...newSales];
      } else if (target === 'ingredients') {
        const newIngredients = records.map((r, idx) => ({
          id: r.id || r.ingredientid || `ING-IMP-${idx + 1}`,
          name: r.name || r.ingredientname || 'Imported Ingredient',
          unit: r.unit || 'kg',
          currentCost: parseFloat(r.currentcost || r.cost || '0') || 0,
          supplierId: r.supplierid || 'SUP001',
          minStockQty: parseFloat(r.minstockqty || r.minstock || '10') || 10
        }));

        importedCount = newIngredients.length;
        updatedData.ingredients = mode === 'replace' ? newIngredients : [...data.ingredients, ...newIngredients];
      } else if (target === 'packaging') {
        const newPackaging = records.map((r, idx) => ({
          id: r.id || r.packagingid || `PKG-IMP-${idx + 1}`,
          name: r.name || r.packagingname || 'Imported Packaging',
          unit: r.unit || 'pcs',
          unitCost: parseFloat(r.unitcost || r.cost || '0') || 0,
          supplierId: r.supplierid || 'SUP006'
        }));

        importedCount = newPackaging.length;
        updatedData.packaging = mode === 'replace' ? newPackaging : [...data.packaging, ...newPackaging];
      } else if (target === 'purchaseOrders') {
        const newPOs = records.map((r, idx) => ({
          id: r.id || r.poid || `PO-IMP-${Date.now()}-${idx + 1}`,
          poDate: r.podate || r.date || new Date().toISOString().split('T')[0],
          supplierId: r.supplierid || 'SUP001',
          itemId: r.itemid || 'ING001',
          itemType: (r.itemtype === 'Packaging' ? 'Packaging' : 'Ingredient') as 'Packaging' | 'Ingredient',
          qty: parseFloat(r.qty || '0') || 0,
          unitPrice: parseFloat(r.unitprice || r.price || '0') || 0,
          paymentStatus: (r.paymentstatus === 'Paid' ? 'Paid' : 'Unpaid') as 'Paid' | 'Unpaid'
        }));

        importedCount = newPOs.length;
        updatedData.purchaseOrders = mode === 'replace' ? newPOs : [...data.purchaseOrders, ...newPOs];
      } else if (target === 'employees') {
        const newEmps = records.map((r, idx) => ({
          id: r.id || r.employeeid || `EMP-IMP-${idx + 1}`,
          name: r.name || r.employeename || 'New Staff',
          baseHourlyRate: parseFloat(r.basehourlyrate || r.rate || '18') || 18,
          regularHours: parseFloat(r.regularhours || r.reghours || '160') || 160,
          overtimeHours: parseFloat(r.overtimehours || r.othours || '0') || 0,
          bonus: parseFloat(r.bonus || '0') || 0,
          penalty: parseFloat(r.penalty || '0') || 0
        }));

        importedCount = newEmps.length;
        updatedData.employees = mode === 'replace' ? newEmps : [...data.employees, ...newEmps];
      } else if (target === 'cashFlows') {
        const newCashFlows = records.map((r, idx) => ({
          id: r.id || r.txid || `CF-IMP-${Date.now()}-${idx + 1}`,
          date: r.date || new Date().toISOString().split('T')[0],
          category: r.category || 'Imported Transaction',
          txType: (r.txtype === 'Income' ? 'Income' : 'Expense') as 'Income' | 'Expense',
          amount: parseFloat(r.amount || '0') || 0,
          account: (r.account === 'Cash' ? 'Cash' : 'Bank') as 'Cash' | 'Bank'
        }));

        importedCount = newCashFlows.length;
        updatedData.cashFlows = mode === 'replace' ? newCashFlows : [...data.cashFlows, ...newCashFlows];
      }

      onUpdateData(updatedData);
      setStatusMessage({
        type: 'success',
        text: `Successfully imported ${importedCount} records into ${target}. Calculation engine updated!`
      });
      setTimeout(() => {
        onClose();
        setCsvText('');
        setStatusMessage(null);
      }, 1400);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Failed to parse CSV: ${err.message}` });
    }
  };

  const getTemplateCSV = () => {
    switch (target) {
      case 'sales':
        return `id,date,productId,qtySold,actualPrice\nTX20260808-01,2026-08-08,PRD001,50,4.80\nTX20260808-02,2026-08-08,PRD003,60,5.00`;
      case 'ingredients':
        return `id,name,unit,currentCost,supplierId,minStockQty\nING013,Organic Almond Powder,kg,18.50,SUP001,10`;
      case 'packaging':
        return `id,name,unit,unitCost,supplierId\nPKG007,Eco Paper Bag Small,pcs,0.15,SUP006`;
      case 'purchaseOrders':
        return `id,poDate,supplierId,itemId,itemType,qty,unitPrice,paymentStatus\nPO20260808-01,2026-08-08,SUP001,ING001,Ingredient,25,12.50,Unpaid`;
      case 'employees':
        return `id,name,baseHourlyRate,regularHours,overtimeHours,bonus,penalty\nEMP005,Chloe Zhang,20.00,160,5,150,0`;
      case 'cashFlows':
        return `id,date,category,txType,amount,account\nCF20260808-01,2026-08-08,Equipment Repair,Expense,180.00,Bank`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/50 backdrop-blur-xs p-4 animate-fade-up">
      <div className="bg-white rounded-xl shadow-modal max-w-2xl w-full p-6 border border-[#E8E8E6] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6]">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-[#2251FF]" />
            <h3 className="font-heading font-bold text-lg text-[#051C2C]">Bulk CSV Import</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          {/* Target Selector */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider mb-1">
                Target Sheet Table
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as ImportTarget)}
                className="w-full cell-input font-medium"
              >
                <option value="sales">06_Sales_Transactions (Sales Log)</option>
                <option value="ingredients">03_Ingredient_Master (Ingredients)</option>
                <option value="packaging">04_Packaging_Master (Packaging)</option>
                <option value="purchaseOrders">08_Suppliers_Purchasing (Purchase Orders)</option>
                <option value="employees">09_Payroll_Employees (Payroll)</option>
                <option value="cashFlows">10_Finance_CashFlow (Finance Ledger)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider mb-1">
                Import Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as 'append' | 'replace')}
                className="w-full cell-input font-medium"
              >
                <option value="append">Append (Add to existing records)</option>
                <option value="replace">Replace (Overwrite current sheet table)</option>
              </select>
            </div>
          </div>

          {/* File Upload or Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
                CSV Data
              </label>
              <button
                type="button"
                onClick={() => setCsvText(getTemplateCSV())}
                className="text-[11px] text-[#2251FF] hover:underline font-medium"
              >
                Load Sample Template
              </button>
            </div>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste raw CSV content here (with headers)..."
              className="w-full cell-input font-mono text-[12px] p-3"
            />
          </div>

          {/* Upload File Input */}
          <div className="flex items-center justify-between bg-[#F5F5F2] p-3 rounded-lg border border-dashed border-[#E8E8E6]">
            <div className="flex items-center space-x-2 text-[12px] text-[#888888]">
              <FileText className="w-4 h-4 text-[#051C2C]" />
              <span>Or choose a local CSV file:</span>
            </div>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="text-[12px] text-[#051C2C] file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-[#2251FF] file:text-white hover:file:bg-[#2251FF]/90 cursor-pointer"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-md flex items-start space-x-2 text-[12px] ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E8E8E6]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={executeImport}
            className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs"
          >
            Execute Import
          </button>
        </div>
      </div>
    </div>
  );
};
