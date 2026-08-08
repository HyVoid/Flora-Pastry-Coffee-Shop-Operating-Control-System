export interface Settings {
  currencySymbol: string;
  taxRate: number; // e.g. 0.05 for 5%
  targetGrossMargin: number; // e.g. 0.65 for 65%
  otFactor: number; // e.g. 1.5
  safetyBuffer: number; // e.g. 0.20 for 20%
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentCost: number;
  supplierId: string;
  minStockQty: number;
}

export interface Packaging {
  id: string;
  name: string;
  unit: string;
  unitCost: number;
  supplierId: string;
}

export type RecipeItemType = 'Ingredient' | 'Packaging';

export interface RecipeItem {
  productId: string;
  itemType: RecipeItemType;
  itemId: string;
  usageQty: number;
}

export interface Product {
  id: string;
  name: string;
  sellingPrice: number;
}

export interface SalesTx {
  id: string;
  date: string;
  productId: string;
  qtySold: number;
  actualPrice: number;
}

export interface InventoryRecord {
  itemType: RecipeItemType;
  itemId: string;
  openingQty: number;
  lossQty: number;
}

export type PaymentStatus = 'Paid' | 'Unpaid';

export interface PurchaseOrder {
  id: string;
  poDate: string;
  supplierId: string;
  itemId: string;
  itemType: RecipeItemType;
  qty: number;
  unitPrice: number;
  paymentStatus: PaymentStatus;
}

export interface Employee {
  id: string;
  name: string;
  baseHourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  bonus: number;
  penalty: number;
}

export type CashFlowType = 'Income' | 'Expense';

export interface CashFlowTx {
  id: string;
  date: string;
  category: string;
  txType: CashFlowType;
  amount: number;
  account: 'Cash' | 'Bank';
}

export interface WorkbookData {
  settings: Settings;
  ingredients: Ingredient[];
  packaging: Packaging[];
  products: Product[];
  recipes: RecipeItem[];
  sales: SalesTx[];
  inventoryRecords: InventoryRecord[];
  purchaseOrders: PurchaseOrder[];
  employees: Employee[];
  cashFlows: CashFlowTx[];
  lastSavedTimestamp: string;
}

// Calculated output types
export interface CalculatedRecipeLine {
  productId: string;
  itemType: RecipeItemType;
  itemId: string;
  itemName: string;
  usageQty: number;
  unit: string;
  liveUnitCost: number;
  lineCost: number;
}

export interface CalculatedProductSummary {
  productId: string;
  productName: string;
  sellingPrice: number;
  totalBOMCost: number;
  grossProfit: number;
  foodCostPct: number;
  marginPct: number;
  targetStatus: '✅ Met Target' | '⚠️ Below Target' | '❌ Link Error';
  linkStatus: '🚨 Missing Recipe' | '⚠️ Zero Material Cost' | '✅ Normal';
}

export interface CalculatedSalesTx {
  id: string;
  date: string;
  productId: string;
  productName: string;
  qtySold: number;
  actualPrice: number;
  unitBOMCost: number;
  totalRevenue: number;
  totalBOMCost: number;
  grossProfit: number;
  taxAmount: number;
  linkStatus: string;
}

export interface CalculatedInventoryItem {
  itemType: RecipeItemType;
  itemId: string;
  itemName: string;
  unit: string;
  openingQty: number;
  inQty: number;
  outQty: number;
  lossQty: number;
  currentQty: number;
  minStock: number;
  stockStatus: '🚨 Reorder Alert' | '✅ Normal';
  stockValue: number;
  liveUnitCost: number;
}

export interface CalculatedPO {
  id: string;
  poDate: string;
  supplierId: string;
  itemId: string;
  itemName: string;
  itemType: RecipeItemType;
  qty: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  apBalance: number;
}

export interface CalculatedEmployee {
  id: string;
  name: string;
  baseHourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  bonus: number;
  penalty: number;
  overtimePay: number;
  totalPay: number;
}

export interface CalculatedCashFlow {
  id: string;
  date: string;
  category: string;
  txType: CashFlowType;
  amount: number;
  account: 'Cash' | 'Bank';
  netCashImpact: number;
}

export interface DashboardKPIs {
  totalRevenue: number;
  totalGrossProfit: number;
  overallMarginPct: number;
  totalOperatingExpenses: number;
  netOperatingProfit: number;
  endingCashBalance: number;
  lowStockCount: number;
  linkErrorCount: number;
}
