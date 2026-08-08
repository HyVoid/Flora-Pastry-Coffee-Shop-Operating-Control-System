import React, { useState } from 'react';
import { ChefHat, Plus, Trash2, AlertCircle, ArrowRight } from 'lucide-react';
import { WorkbookData, RecipeItem, RecipeItemType, Product } from '../types';
import {
  calculateRecipeLines,
  calculateProductSummaries
} from '../utils/calcEngine';

interface RecipeEngineViewProps {
  data: WorkbookData;
  onUpdateData: (newData: WorkbookData) => void;
}

export const RecipeEngineView: React.FC<RecipeEngineViewProps> = ({ data, onUpdateData }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    data.products[0]?.id || 'PRD001'
  );
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddLineModal, setShowAddLineModal] = useState(false);

  // New Product form state
  const [newProd, setNewProd] = useState<Partial<Product>>({
    id: `PRD${String(data.products.length + 1).padStart(3, '0')}`,
    name: '',
    sellingPrice: 5.00
  });

  // New Recipe Line form state
  const [newLine, setNewLine] = useState<Partial<RecipeItem>>({
    itemType: 'Ingredient',
    itemId: data.ingredients[0]?.id || 'ING001',
    usageQty: 0.05
  });

  const currency = data.settings.currencySymbol;
  const recipeLines = calculateRecipeLines(data);
  const productSummaries = calculateProductSummaries(data);

  const selectedProduct = data.products.find((p) => p.id === selectedProductId);
  const selectedRecipeLines = recipeLines.filter((rl) => rl.productId === selectedProductId);
  const selectedSummary = productSummaries.find((ps) => ps.productId === selectedProductId);

  // Update Selling Price
  const handlePriceChange = (productId: string, newPrice: number) => {
    const updatedProducts = data.products.map((p) =>
      p.id === productId ? { ...p, sellingPrice: Math.max(0, newPrice) } : p
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, products: updatedProducts, lastSavedTimestamp: timestamp });
  };

  // Update Recipe Usage Qty
  const handleUsageChange = (productId: string, itemType: RecipeItemType, itemId: string, newQty: number) => {
    const updatedRecipes = data.recipes.map((r) => {
      if (r.productId === productId && r.itemType === itemType && r.itemId === itemId) {
        return { ...r, usageQty: Math.max(0, newQty) };
      }
      return r;
    });
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, recipes: updatedRecipes, lastSavedTimestamp: timestamp });
  };

  // Delete Recipe Line
  const handleDeleteLine = (productId: string, itemType: RecipeItemType, itemId: string) => {
    const updatedRecipes = data.recipes.filter(
      (r) => !(r.productId === productId && r.itemType === itemType && r.itemId === itemId)
    );
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, recipes: updatedRecipes, lastSavedTimestamp: timestamp });
  };

  // Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name?.trim()) return;

    const prodToAdd: Product = {
      id: newProd.id || `PRD${Date.now().toString().slice(-4)}`,
      name: newProd.name.trim(),
      sellingPrice: Number(newProd.sellingPrice) || 0
    };

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({
      ...data,
      products: [...data.products, prodToAdd],
      lastSavedTimestamp: timestamp
    });

    setSelectedProductId(prodToAdd.id);
    setShowAddProductModal(false);
  };

  // Add Recipe Line Submit
  const handleAddLineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine.itemId) return;

    // Check if item already in recipe
    const exists = data.recipes.some(
      (r) => r.productId === selectedProductId && r.itemType === newLine.itemType && r.itemId === newLine.itemId
    );

    let updatedRecipes: RecipeItem[];
    if (exists) {
      updatedRecipes = data.recipes.map((r) => {
        if (r.productId === selectedProductId && r.itemType === newLine.itemType && r.itemId === newLine.itemId) {
          return { ...r, usageQty: r.usageQty + (Number(newLine.usageQty) || 0) };
        }
        return r;
      });
    } else {
      updatedRecipes = [
        ...data.recipes,
        {
          productId: selectedProductId,
          itemType: newLine.itemType as RecipeItemType,
          itemId: newLine.itemId as string,
          usageQty: Number(newLine.usageQty) || 0
        }
      ];
    }

    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
    onUpdateData({ ...data, recipes: updatedRecipes, lastSavedTimestamp: timestamp });
    setShowAddLineModal(false);
  };

  const formatCurrency = (val: number) => `${currency}${val.toFixed(2)}`;
  const formatPct = (val: number) => `${(val * 100).toFixed(1)}%`;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Insight Box */}
      <div className="insight-box">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#2251FF] font-bold mb-1">
          <ChefHat className="w-3.5 h-3.5" />
          <span>Sheet 05 — Recipe BOM & Product Margin Engine</span>
        </div>
        <h2 className="font-heading font-bold text-xl text-[#051C2C]">
          Product Recipe BOM & Margin Calculation Engine
        </h2>
        <p className="text-[12px] text-[#888888] mt-1">
          Dual-layer engine: Left panel maintains detailed BOM ingredient/packaging recipe quantities; right panel aggregates total product cost, gross profit, food cost %, and performs automatic link-health diagnostics.
        </p>
      </div>

      {/* Main Dual-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Recipe Detail BOM Breakdown (7 Cols) */}
        <div className="lg:col-span-7 flora-card p-6 border border-[#E8E8E6] flex flex-col justify-between">
          <div>
            {/* Header with Product Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E8E6] mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#888888] uppercase mb-1">
                  Select Active Product Recipe
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="cell-input font-bold text-[#051C2C] text-sm pr-8"
                >
                  {data.products.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.id}] {p.name} — ({currency}{p.sellingPrice.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setShowAddLineModal(true)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Material Line</span>
                </button>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors border border-[#E8E8E6]"
                >
                  + New Product
                </button>
              </div>
            </div>

            {/* Recipe Lines Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                    <th className="py-2.5 px-3 table-header-cell">Type</th>
                    <th className="py-2.5 px-3 table-header-cell">Material Name</th>
                    <th className="py-2.5 px-3 table-header-cell text-right">Usage Qty</th>
                    <th className="py-2.5 px-3 table-header-cell text-right">Live Unit Cost</th>
                    <th className="py-2.5 px-3 table-header-cell text-right">Line Cost</th>
                    <th className="py-2.5 px-3 table-header-cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
                  {selectedRecipeLines.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#888888]">
                        <AlertCircle className="w-6 h-6 text-[#D32F2F] mx-auto mb-2" />
                        <p className="font-semibold text-[#D32F2F]">🚨 Missing Recipe Detail</p>
                        <p className="text-[11px] mt-1">
                          No ingredients or packaging assigned to this product yet. Click "+ Add Material Line" above.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    selectedRecipeLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-[11px]">
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold ${
                              line.itemType === 'Ingredient'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {line.itemType}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#051C2C]">
                          {line.itemName} <span className="text-[11px] font-normal text-[#888888]">({line.itemId})</span>
                        </td>

                        {/* Editable Usage Qty */}
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <input
                              type="number"
                              step="0.001"
                              min="0"
                              value={line.usageQty}
                              onChange={(e) =>
                                handleUsageChange(
                                  line.productId,
                                  line.itemType,
                                  line.itemId,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="cell-input font-mono font-bold text-right w-20"
                            />
                            <span className="text-[11px] text-[#888888] font-mono">{line.unit}</span>
                          </div>
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono text-[#888888]">
                          {currency}{line.liveUnitCost.toFixed(3)}
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#051C2C]">
                          {formatCurrency(line.lineCost)}
                        </td>

                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleDeleteLine(line.productId, line.itemType, line.itemId)}
                            className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors rounded-md hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E8E6] flex items-center justify-between text-[12px] font-semibold text-[#051C2C]">
            <span>Selected Product Total BOM Cost:</span>
            <span className="font-heading font-bold text-lg text-[#2251FF]">
              {formatCurrency(selectedSummary ? selectedSummary.totalBOMCost : 0)}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Products Summary & Margin Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Product Selected Detail Card */}
          {selectedProduct && selectedSummary && (
            <div className="flora-card p-5 border border-[#2251FF]/30 bg-blue-50/20">
              <div className="flex items-center justify-between pb-3 border-b border-[#2251FF]/10 mb-3">
                <h4 className="font-heading font-bold text-base text-[#051C2C]">
                  {selectedProduct.name} — Margin Card
                </h4>
                <span className="text-[11px] font-mono font-bold text-[#2251FF]">{selectedProduct.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div className="p-3 bg-white rounded-lg border border-[#E8E8E6]">
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Selling Price</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="font-bold text-[#051C2C]">{currency}</span>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      value={selectedProduct.sellingPrice}
                      onChange={(e) => handlePriceChange(selectedProduct.id, parseFloat(e.target.value) || 0)}
                      className="cell-input font-bold text-base text-[#051C2C] w-full"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E8E8E6]">
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Total BOM Cost</div>
                  <div className="font-heading font-bold text-base text-[#051C2C] mt-1">
                    {formatCurrency(selectedSummary.totalBOMCost)}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E8E8E6]">
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Gross Profit</div>
                  <div className="font-heading font-bold text-base text-[#051C2C] mt-1">
                    {formatCurrency(selectedSummary.grossProfit)}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E8E8E6]">
                  <div className="text-[10px] text-[#888888] uppercase font-bold">Gross Margin %</div>
                  <div className="font-heading font-bold text-base text-[#2251FF] mt-1">
                    {formatPct(selectedSummary.marginPct)}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-[#2251FF]/10">
                <span className="text-[#888888]">Target Status ({formatPct(data.settings.targetGrossMargin)}):</span>
                <span className="font-bold">{selectedSummary.targetStatus}</span>
              </div>
            </div>
          )}

          {/* All Products Master Summary Table */}
          <div className="flora-card p-5 border border-[#E8E8E6]">
            <h4 className="font-heading font-bold text-base text-[#051C2C] pb-3 border-b border-[#E8E8E6] mb-3">
              All Products BOM Summary Ledger
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[#E8E8E6]">
                    <th className="py-2 px-2 table-header-cell">Product</th>
                    <th className="py-2 px-2 table-header-cell text-right">Cost</th>
                    <th className="py-2 px-2 table-header-cell text-right">Margin</th>
                    <th className="py-2 px-2 table-header-cell text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                  {productSummaries.map((p) => (
                    <tr
                      key={p.productId}
                      onClick={() => setSelectedProductId(p.productId)}
                      className={`cursor-pointer transition-colors ${
                        selectedProductId === p.productId ? 'bg-blue-50/60 font-semibold' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-2 px-2 text-[#051C2C]">
                        {p.productName}
                      </td>
                      <td className="py-2 px-2 text-right font-mono">{formatCurrency(p.totalBOMCost)}</td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-[#2251FF]">
                        {formatPct(p.marginPct)}
                      </td>
                      <td className="py-2 px-2 text-center text-[10px]">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold ${
                            p.linkStatus === '✅ Normal'
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-red-50 text-red-800'
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
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/50 backdrop-blur-xs p-4 animate-fade-up">
          <form
            onSubmit={handleAddProductSubmit}
            className="bg-white rounded-xl shadow-modal max-w-md w-full p-6 border border-[#E8E8E6] space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-[#051C2C] border-b border-[#E8E8E6] pb-3">
              Add New Menu Product
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Product ID
                </label>
                <input
                  type="text"
                  required
                  value={newProd.id}
                  onChange={(e) => setNewProd({ ...newProd, id: e.target.value })}
                  className="cell-input font-mono w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almond Croissant"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="cell-input w-full font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Selling Price ({currency})
                </label>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  required
                  value={newProd.sellingPrice}
                  onChange={(e) => setNewProd({ ...newProd, sellingPrice: parseFloat(e.target.value) || 0 })}
                  className="cell-input w-full font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E8E8E6]">
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Recipe Line Modal */}
      {showAddLineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/50 backdrop-blur-xs p-4 animate-fade-up">
          <form
            onSubmit={handleAddLineSubmit}
            className="bg-white rounded-xl shadow-modal max-w-md w-full p-6 border border-[#E8E8E6] space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-[#051C2C] border-b border-[#E8E8E6] pb-3">
              Add Material Line to [{selectedProduct?.name}]
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Material Type
                </label>
                <select
                  value={newLine.itemType}
                  onChange={(e) => {
                    const t = e.target.value as RecipeItemType;
                    const defaultId = t === 'Ingredient' ? data.ingredients[0]?.id : data.packaging[0]?.id;
                    setNewLine({ ...newLine, itemType: t, itemId: defaultId });
                  }}
                  className="cell-input w-full font-semibold"
                >
                  <option value="Ingredient">Raw Ingredient (03_Ingredient_Master)</option>
                  <option value="Packaging">Packaging Item (04_Packaging_Master)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Select Item
                </label>
                <select
                  value={newLine.itemId}
                  onChange={(e) => setNewLine({ ...newLine, itemId: e.target.value })}
                  className="cell-input w-full font-medium"
                >
                  {newLine.itemType === 'Ingredient'
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

              <div>
                <label className="block text-[11px] font-semibold text-[#051C2C] uppercase mb-1">
                  Usage Quantity per Single Unit
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  required
                  value={newLine.usageQty}
                  onChange={(e) => setNewLine({ ...newLine, usageQty: parseFloat(e.target.value) || 0 })}
                  className="cell-input w-full font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E8E8E6]">
              <button
                type="button"
                onClick={() => setShowAddLineModal(false)}
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#051C2C] bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#2251FF]/90 transition-colors shadow-xs"
              >
                Add to Recipe
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
