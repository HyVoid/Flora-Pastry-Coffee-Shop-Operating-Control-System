import React from 'react';
import { Sliders, ShieldAlert } from 'lucide-react';
import { WorkbookData, Settings } from '../types';

interface SettingsViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ data, onUpdateData }) => {
  const settings = data.settings;

  const handleChange = (field: keyof Settings, value: any) => {
    const updatedSettings: Settings = {
      ...settings,
      [field]: value
    };

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    onUpdateData({
      ...data,
      settings: updatedSettings,
      lastSavedTimestamp: timestamp
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <Sliders className="w-3.5 h-3.5" />
          <span>Sheet 02 — Parameters & Assumptions Control</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Global Business Assumptions & Calculation Constants
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          All financial calculation formulas dynamically reference these absolute constants. Modifying any parameter here immediately updates product margins, tax liabilities, overtime rates, and safety buffers across all sheets without manual recalculation.
        </p>
      </div>

      {/* Main Parameters Card */}
      <div className="flora-card p-6 border border-[#E8E8E6] max-w-3xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E6] mb-6">
          <h3 className="font-heading font-bold text-lg text-[#051C2C]">
            Master Calculation Parameters
          </h3>
          <span className="text-[11px] text-[#2251FF] bg-blue-50 px-2.5 py-1 rounded-md font-semibold border border-blue-200">
            Sheet 02_Settings_Control
          </span>
        </div>

        <div className="space-y-6">
          {/* Parameter 1: Currency Symbol */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl bg-[#F5F5F2]/50 border border-[#E8E8E6]">
            <div>
              <div className="font-semibold text-[#051C2C] text-[13px]">Default Currency Symbol</div>
              <div className="text-[11px] text-[#888888]">Used in all monetary displays</div>
            </div>
            <div>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => handleChange('currencySymbol', e.target.value)}
                className="cell-input font-bold text-[#051C2C] w-full text-center text-lg"
              />
            </div>
            <div className="text-[11px] text-[#888888] italic">
              Code: <code className="font-mono text-[#051C2C]">CURRENCY</code>
            </div>
          </div>

          {/* Parameter 2: Tax / VAT Rate */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl bg-[#F5F5F2]/50 border border-[#E8E8E6]">
            <div>
              <div className="font-semibold text-[#051C2C] text-[13px]">Tax / VAT Rate</div>
              <div className="text-[11px] text-[#888888]">Applied to sales transactions</div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={(settings.taxRate * 100).toFixed(1)}
                onChange={(e) => handleChange('taxRate', (parseFloat(e.target.value) || 0) / 100)}
                className="cell-input font-bold text-[#051C2C] w-full text-right"
              />
              <span className="font-semibold text-[#051C2C]">%</span>
            </div>
            <div className="text-[11px] text-[#888888] italic">
              Code: <code className="font-mono text-[#051C2C]">TAX_RATE</code>
            </div>
          </div>

          {/* Parameter 3: Target Gross Margin Baseline */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl bg-[#F5F5F2]/50 border border-[#E8E8E6]">
            <div>
              <div className="font-semibold text-[#051C2C] text-[13px]">Target Gross Margin Baseline</div>
              <div className="text-[11px] text-[#888888]">Target profit threshold for recipes</div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={(settings.targetGrossMargin * 100).toFixed(1)}
                onChange={(e) =>
                  handleChange('targetGrossMargin', (parseFloat(e.target.value) || 0) / 100)
                }
                className="cell-input font-bold text-[#051C2C] w-full text-right text-base"
              />
              <span className="font-semibold text-[#051C2C]">%</span>
            </div>
            <div className="text-[11px] text-[#888888] italic">
              Code: <code className="font-mono text-[#051C2C]">TARGET_MARGIN</code>
            </div>
          </div>

          {/* Parameter 4: Overtime Multiplier */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl bg-[#F5F5F2]/50 border border-[#E8E8E6]">
            <div>
              <div className="font-semibold text-[#051C2C] text-[13px]">Overtime Hourly Multiplier</div>
              <div className="text-[11px] text-[#888888]">Rate factor for overtime wages</div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="3.0"
                value={settings.otFactor}
                onChange={(e) => handleChange('otFactor', parseFloat(e.target.value) || 1.0)}
                className="cell-input font-bold text-[#051C2C] w-full text-right"
              />
              <span className="font-semibold text-[#051C2C]">x</span>
            </div>
            <div className="text-[11px] text-[#888888] italic">
              Code: <code className="font-mono text-[#051C2C]">OT_FACTOR</code>
            </div>
          </div>

          {/* Parameter 5: Safety Buffer Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl bg-[#F5F5F2]/50 border border-[#E8E8E6]">
            <div>
              <div className="font-semibold text-[#051C2C] text-[13px]">Low Stock Safety Buffer</div>
              <div className="text-[11px] text-[#888888]">Reorder safety buffer margin</div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={(settings.safetyBuffer * 100).toFixed(0)}
                onChange={(e) => handleChange('safetyBuffer', (parseFloat(e.target.value) || 0) / 100)}
                className="cell-input font-bold text-[#051C2C] w-full text-right"
              />
              <span className="font-semibold text-[#051C2C]">%</span>
            </div>
            <div className="text-[11px] text-[#888888] italic">
              Code: <code className="font-mono text-[#051C2C]">SAFETY_BUFFER</code>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex items-start space-x-3 text-[12px] text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Zero Hardcoding Rule:</span> All formulas across Recipe Engine, Sales Log, Payroll, and Inventory strictly reference these custom properties. Hardcoding numeric constants (such as <code className="bg-amber-100 px-1 rounded">* 0.05</code>) is strictly forbidden in the Excel architecture.
          </div>
        </div>
      </div>
    </div>
  );
};
