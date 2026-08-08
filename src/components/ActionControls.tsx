import React, { useRef, useState } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { WorkbookData } from '../types';
import { initialWorkbookData } from '../data/initialData';
import { CsvImportModal } from './CsvImportModal';

interface ActionControlsProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
  lastSaved: string;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  data,
  onUpdateData,
  lastSaved
}) => {
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Export Backup JSON
  const handleExportBackup = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Flora_Pastry_Workbook_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast('Workbook backup JSON exported successfully.');
  };

  // Import Backup JSON
  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (
          parsed &&
          parsed.settings &&
          Array.isArray(parsed.ingredients) &&
          Array.isArray(parsed.products)
        ) {
          const timestamp = new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium'
          });
          const newWorkbook: WorkbookData = {
            ...parsed,
            lastSavedTimestamp: timestamp
          };
          onUpdateData(newWorkbook);
          triggerToast('Backup restored successfully! All calculations updated.');
        } else {
          alert('Invalid JSON structure. Please ensure this is a valid Flora Pastry backup file.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Reset Data to Initial
  const handleConfirmReset = () => {
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });
    const resetData: WorkbookData = {
      ...initialWorkbookData,
      lastSavedTimestamp: timestamp
    };
    onUpdateData(resetData);
    setShowResetConfirm(false);
    triggerToast('All data has been reset to default initial state.');
  };

  return (
    <div className="bg-white rounded-xl shadow-xs p-4 mb-6 border border-[#E8E8E6] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Last Saved Display */}
      <div className="flex items-center space-x-2 text-[12px] text-[#051C2C]">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <Clock className="w-4 h-4 text-[#888888]" />
        <span className="font-medium text-[#888888]">Last saved:</span>
        <span className="font-semibold text-[#051C2C] bg-[#F5F5F2] px-2.5 py-1 rounded-md border border-[#E8E8E6]">
          {lastSaved || 'Just now'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Export Backup */}
        <button
          onClick={handleExportBackup}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors border border-[#E8E8E6]"
          title="Download complete workbook JSON backup"
        >
          <Download className="w-3.5 h-3.5 text-[#051C2C]" />
          <span>Export Backup</span>
        </button>

        {/* Import Backup */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors border border-[#E8E8E6]"
          title="Restore workbook from JSON backup"
        >
          <Upload className="w-3.5 h-3.5 text-[#051C2C]" />
          <span>Import Backup</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImportBackupFile}
          className="hidden"
        />

        {/* Bulk CSV Import */}
        <button
          onClick={() => setIsCsvModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs"
          title="Import CSV records into any table"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Bulk CSV Import</span>
        </button>

        {/* Reset Data */}
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#D32F2F] bg-red-50 hover:bg-red-100 transition-colors border border-red-200"
          title="Reset workbook to initial demo dataset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Data</span>
        </button>
      </div>

      {/* CSV Import Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        data={data}
        onUpdateData={onUpdateData}
      />

      {/* Confirmation Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-modal max-w-md w-full p-6 border border-[#E8E8E6]">
            <div className="flex items-center space-x-3 text-[#D32F2F] mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-heading font-bold text-lg text-[#051C2C]">Reset All Data?</h3>
            </div>
            <p className="text-[13px] text-[#888888] mb-6">
              This action will reset all parameters, ingredient master costs, recipe BOMs, sales logs, and financial records to the default seed dataset. Any unsaved custom entries will be permanently lost.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#D32F2F] hover:bg-red-700 transition-colors"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#051C2C] text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 text-[12px] animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
