import React from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { WorkbookData } from '../types';
import {
  calculateDashboardKPIs,
  calculateInventoryMovements,
  calculateProductSummaries,
  calculateSalesTransactions
} from '../utils/calcEngine';
import { TabKey } from '../components/Navbar';

interface DashboardViewProps {
  data: WorkbookData;
  setActiveTab: (tab: TabKey) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data, setActiveTab }) => {
  const kpis = calculateDashboardKPIs(data);
  const inventory = calculateInventoryMovements(data);
  const productSummaries = calculateProductSummaries(data);
  const sales = calculateSalesTransactions(data);

  const lowStockItems = inventory.filter((item) => item.stockStatus === '🚨 Reorder Alert');
  const brokenLinkSales = sales.filter((s) => s.linkStatus.startsWith('🚨'));
  const brokenLinkRecipes = productSummaries.filter((p) => p.linkStatus.startsWith('🚨'));

  const currency = data.settings.currencySymbol;

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatPct = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Executive Header Banner / Insight Box */}
      <div className="insight-box flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Control Overview</span>
          </div>
          <h2 className="font-heading font-bold text-xl text-[#051C2C]">
            Flora Pastry & Coffee Shop — Operating Dashboard
          </h2>
          <p className="text-[12px] text-[#888888] mt-0.5">
            Real-time margin calculation engine, automatic inventory deduction, and financial health diagnostics.
          </p>
        </div>

        {/* Link Health Diagnostic Quick Status */}
        {kpis.linkErrorCount > 0 ? (
          <button
            onClick={() => setActiveTab('recipes')}
            className="flex items-center space-x-2 bg-[#D32F2F]/10 border border-[#D32F2F]/20 text-[#D32F2F] px-3.5 py-2 rounded-lg text-[12px] font-semibold hover:bg-[#D32F2F]/20 transition-colors"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>🚨 {kpis.linkErrorCount} Recipe/Sales Link Anomaly Detected</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-lg text-[12px] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
            <span>✅ Data Link Health: 100% Verified (0 Anomalies)</span>
          </div>
        )}
      </div>

      {/* KPI Cards Grid (6 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="flora-card flora-card-hover p-4 border border-[#E8E8E6]">
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#051C2C] tracking-kpi">
            {formatCurrency(kpis.totalRevenue)}
          </div>
          <div className="text-[11px] text-[#888888] mt-1">Total top-line sales</div>
        </div>

        {/* KPI 2: Gross Profit */}
        <div className="flora-card flora-card-hover p-4 border border-[#E8E8E6]">
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Sales Gross Profit</span>
            <TrendingUp className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#051C2C] tracking-kpi">
            {formatCurrency(kpis.totalGrossProfit)}
          </div>
          <div className="text-[11px] font-medium text-[#2251FF] mt-1">
            Margin: {formatPct(kpis.overallMarginPct)}
          </div>
        </div>

        {/* KPI 3: Net Operating Profit */}
        <div className="flora-card flora-card-hover p-4 border border-[#E8E8E6]">
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Net Profit</span>
            <CreditCard className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div
            className={`font-heading font-bold text-2xl tracking-kpi ${
              kpis.netOperatingProfit >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'
            }`}
          >
            {formatCurrency(kpis.netOperatingProfit)}
          </div>
          <div className="text-[11px] text-[#888888] mt-1">After OPEX & Payroll</div>
        </div>

        {/* KPI 4: Ending Cash Balance */}
        <div className="flora-card flora-card-hover p-4 border border-[#E8E8E6]">
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Ending Cash</span>
            <Wallet className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#051C2C] tracking-kpi">
            {formatCurrency(kpis.endingCashBalance)}
          </div>
          <div className="text-[11px] text-[#888888] mt-1">Cash & Bank liquidity</div>
        </div>

        {/* KPI 5: Low Stock Alerts */}
        <div
          onClick={() => setActiveTab('inventory')}
          className={`flora-card flora-card-hover p-4 border cursor-pointer ${
            lowStockItems.length > 0 ? 'border-[#D32F2F]/30 bg-red-50/20' : 'border-[#E8E8E6]'
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Low Stock Items</span>
            <AlertTriangle className={`w-4 h-4 ${lowStockItems.length > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'}`} />
          </div>
          <div className="font-heading font-bold text-2xl text-[#051C2C] tracking-kpi">
            {lowStockItems.length} <span className="text-sm font-normal text-[#888888]">items</span>
          </div>
          <div className="text-[11px] font-medium text-[#2251FF] flex items-center space-x-1 mt-1">
            <span>Click to reorder</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* KPI 6: Link Diagnostic Status */}
        <div
          onClick={() => setActiveTab('recipes')}
          className={`flora-card flora-card-hover p-4 border cursor-pointer ${
            kpis.linkErrorCount > 0 ? 'border-[#D32F2F]/30 bg-red-50/20' : 'border-[#E8E8E6]'
          }`}
        >
          <div className="flex items-center justify-between text-[#888888] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Link Health</span>
            <CheckCircle2 className={`w-4 h-4 ${kpis.linkErrorCount > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'}`} />
          </div>
          <div className="font-heading font-bold text-2xl text-[#051C2C] tracking-kpi">
            {kpis.linkErrorCount === 0 ? '100% OK' : `${kpis.linkErrorCount} Errors`}
          </div>
          <div className="text-[11px] text-[#888888] mt-1">Recipe & Sales link check</div>
        </div>
      </div>

      {/* Main Section: Financial Breakdown & Low Stock Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Statement P&L Summary Card */}
        <div className="lg:col-span-2 flora-card p-6 border border-[#E8E8E6]">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6] mb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#051C2C]">
                P&L Financial Statement Summary
              </h3>
              <p className="text-[12px] text-[#888888]">
                Real-time income, cost of goods sold (COGS), labor, and operating expense breakdown.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('finance')}
              className="text-[12px] font-semibold text-[#2251FF] hover:underline flex items-center space-x-1"
            >
              <span>View Finance Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 font-mono text-[13px]">
            {/* Sales Revenue */}
            <div className="flex items-center justify-between py-2 border-b border-[#E8E8E6]">
              <span className="font-body font-semibold text-[#051C2C]">(+) Total Sales Revenue</span>
              <span className="font-bold text-[#051C2C]">{formatCurrency(kpis.totalRevenue)}</span>
            </div>

            {/* COGS */}
            <div className="flex items-center justify-between py-2 border-b border-[#E8E8E6] text-[#888888]">
              <span className="font-body">(-) Total Product Cost of Goods (COGS BOM)</span>
              <span>{formatCurrency(kpis.totalRevenue - kpis.totalGrossProfit)}</span>
            </div>

            {/* Gross Profit */}
            <div className="flex items-center justify-between py-2.5 bg-[#F5F5F2] px-3 rounded-lg font-semibold text-[#051C2C]">
              <span className="font-body font-bold text-[#051C2C]">(=) Sales Gross Profit</span>
              <div className="flex items-center space-x-3">
                <span className="text-[11px] text-[#2251FF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {formatPct(kpis.overallMarginPct)} Margin
                </span>
                <span className="font-heading font-bold text-base text-[#051C2C]">
                  {formatCurrency(kpis.totalGrossProfit)}
                </span>
              </div>
            </div>

            {/* Operating Expenses Breakdown */}
            <div className="flex items-center justify-between py-2 border-b border-[#E8E8E6] text-[#888888]">
              <span className="font-body">(-) Monthly Operating Expenses (Rent, Utilities, Ads)</span>
              <span>
                {formatCurrency(
                  kpis.totalOperatingExpenses -
                    data.employees.reduce(
                      (sum, emp) =>
                        sum +
                        emp.regularHours * emp.baseHourlyRate +
                        emp.overtimeHours * (emp.baseHourlyRate * data.settings.otFactor) +
                        emp.bonus -
                        emp.penalty,
                      0
                    )
                )}
              </span>
            </div>

            {/* Payroll Cost */}
            <div className="flex items-center justify-between py-2 border-b border-[#E8E8E6] text-[#888888]">
              <span className="font-body">(-) Employee Payroll & Wages</span>
              <span>
                {formatCurrency(
                  data.employees.reduce(
                    (sum, emp) =>
                      sum +
                      emp.regularHours * emp.baseHourlyRate +
                      emp.overtimeHours * (emp.baseHourlyRate * data.settings.otFactor) +
                      emp.bonus -
                      emp.penalty,
                    0
                  )
                )}
              </span>
            </div>

            {/* Net Operating Profit */}
            <div className="flex items-center justify-between py-3 bg-[#051C2C] text-white px-4 rounded-xl font-semibold mt-2 shadow-xs">
              <span className="font-body font-bold text-sm">(=) Net Operating Profit</span>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                {formatCurrency(kpis.netOperatingProfit)}
              </span>
            </div>
          </div>
        </div>

        {/* Low Stock Reorder Warning Panel */}
        <div className="flora-card p-6 border border-[#E8E8E6] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6] mb-4">
              <h3 className="font-heading font-bold text-lg text-[#051C2C]">Low Stock Alerts</h3>
              <button
                onClick={() => setActiveTab('inventory')}
                className="text-[12px] font-semibold text-[#2251FF] hover:underline flex items-center space-x-1"
              >
                <span>Full Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {lowStockItems.length === 0 ? (
              <div className="py-8 text-center text-[#888888]">
                <CheckCircle2 className="w-8 h-8 text-[#00C853] mx-auto mb-2" />
                <p className="text-[13px] font-medium text-[#051C2C]">All stock levels are safe</p>
                <p className="text-[11px] text-[#888888] mt-1">No items have fallen below safety buffer minimums.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-[#051C2C] text-[13px]">{item.itemName}</div>
                      <div className="text-[11px] text-[#888888]">
                        Current: <span className="font-bold text-[#D32F2F]">{item.currentQty.toFixed(2)} {item.unit}</span> (Min: {item.minStock} {item.unit})
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('purchasing')}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-[#D32F2F] text-white hover:bg-red-700 transition-colors"
                    >
                      Reorder PO
                    </button>
                  </div>
                ))}

                {lowStockItems.length > 5 && (
                  <div className="text-center text-[11px] text-[#888888] pt-2">
                    + {lowStockItems.length - 5} more items requiring reorder.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E8E6] text-[11px] text-[#888888]">
            Note: Outflow quantities are dynamically deducted based on sales transaction volume and product recipe BOM usage.
          </div>
        </div>
      </div>

      {/* Product Profitability & Margin Target Status Table */}
      <div className="flora-card p-6 border border-[#E8E8E6]">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6] mb-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#051C2C]">Product BOM Margin & Recipe Health</h3>
            <p className="text-[12px] text-[#888888]">
              Target gross margin baseline: <span className="font-bold text-[#051C2C]">{formatPct(data.settings.targetGrossMargin)}</span>
            </p>
          </div>
          <button
            onClick={() => setActiveTab('recipes')}
            className="text-[12px] font-semibold text-[#2251FF] hover:underline flex items-center space-x-1"
          >
            <span>Open Recipe Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                <th className="py-2.5 px-3 table-header-cell">Product Name</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Selling Price</th>
                <th className="py-2.5 px-3 table-header-cell text-right">BOM Cost</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Gross Profit</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Food Cost %</th>
                <th className="py-2.5 px-3 table-header-cell text-right">Margin %</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Target Status</th>
                <th className="py-2.5 px-3 table-header-cell text-center">Link Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {productSummaries.map((p) => (
                <tr key={p.productId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#051C2C]">{p.productName}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{formatCurrency(p.sellingPrice)}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{formatCurrency(p.totalBOMCost)}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#051C2C]">
                    {formatCurrency(p.grossProfit)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[#888888]">{formatPct(p.foodCostPct)}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#2251FF]">{formatPct(p.marginPct)}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        p.targetStatus === '✅ Met Target'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : p.targetStatus === '⚠️ Below Target'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {p.targetStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      onClick={() => setActiveTab('recipes')}
                      className={`interactive-cell inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        p.linkStatus === '✅ Normal'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {p.linkStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
