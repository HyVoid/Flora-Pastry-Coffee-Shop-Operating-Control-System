import { WorkbookData } from '../types';

export const initialWorkbookData: WorkbookData = {
  settings: {
    currencySymbol: '$',
    taxRate: 0.05, // 5.0%
    targetGrossMargin: 0.65, // 65.0%
    otFactor: 1.5, // 1.5x for Overtime
    safetyBuffer: 0.20 // 20.0%
  },

  ingredients: [
    { id: 'ING001', name: 'Unsalted Butter (AOP French)', unit: 'kg', currentCost: 12.50, supplierId: 'SUP001', minStockQty: 20 },
    { id: 'ING002', name: 'Espresso Coffee Beans (Single Origin)', unit: 'kg', currentCost: 28.00, supplierId: 'SUP002', minStockQty: 15 },
    { id: 'ING003', name: 'Organic T55 Pastry Flour', unit: 'kg', currentCost: 2.20, supplierId: 'SUP001', minStockQty: 50 },
    { id: 'ING004', name: 'Whole Milk (Fresh 3.8%)', unit: 'L', currentCost: 1.80, supplierId: 'SUP003', minStockQty: 40 },
    { id: 'ING005', name: 'Fine Cane Sugar', unit: 'kg', currentCost: 1.50, supplierId: 'SUP001', minStockQty: 30 },
    { id: 'ING006', name: 'Dark Chocolate 70% (Valrhona)', unit: 'kg', currentCost: 24.00, supplierId: 'SUP004', minStockQty: 10 },
    { id: 'ING007', name: 'Pure Vanilla Extract', unit: 'L', currentCost: 85.00, supplierId: 'SUP004', minStockQty: 2 },
    { id: 'ING008', name: 'Fresh Farm Eggs (Large)', unit: 'pcs', currentCost: 0.25, supplierId: 'SUP003', minStockQty: 200 },
    { id: 'ING009', name: 'Matcha Powder (Uji Ceremonial)', unit: 'kg', currentCost: 110.00, supplierId: 'SUP005', minStockQty: 3 },
    { id: 'ING010', name: 'Cream Cheese (Philadelphia)', unit: 'kg', currentCost: 9.80, supplierId: 'SUP003', minStockQty: 15 },
    { id: 'ING011', name: 'Heavy Whipping Cream 35%', unit: 'L', currentCost: 5.40, supplierId: 'SUP003', minStockQty: 25 },
    { id: 'ING012', name: 'Barista Oat Milk (Oatly)', unit: 'L', currentCost: 3.20, supplierId: 'SUP003', minStockQty: 30 }
  ],

  packaging: [
    { id: 'PKG001', name: 'Pastry Box (Single/Double)', unit: 'pcs', unitCost: 0.35, supplierId: 'SUP006' },
    { id: 'PKG002', name: 'Hot Coffee Cup 12oz', unit: 'pcs', unitCost: 0.18, supplierId: 'SUP006' },
    { id: 'PKG003', name: 'Cold Iced Cup 16oz (PLA)', unit: 'pcs', unitCost: 0.22, supplierId: 'SUP006' },
    { id: 'PKG004', name: 'Bio Coffee Lid & Sleeve Set', unit: 'pcs', unitCost: 0.12, supplierId: 'SUP006' },
    { id: 'PKG005', name: 'Kraft Carry Bag (Medium)', unit: 'pcs', unitCost: 0.25, supplierId: 'SUP006' },
    { id: 'PKG006', name: 'Cake Box 6-inch Premium', unit: 'pcs', unitCost: 0.85, supplierId: 'SUP006' }
  ],

  products: [
    { id: 'PRD001', name: 'Flora Signature Butter Croissant', sellingPrice: 4.80 },
    { id: 'PRD002', name: 'Pain au Chocolat (Double Dark)', sellingPrice: 5.50 },
    { id: 'PRD003', name: 'Single Origin Iced Americano 16oz', sellingPrice: 5.00 },
    { id: 'PRD004', name: 'Oat Milk Cafe Latte 12oz', sellingPrice: 6.20 },
    { id: 'PRD005', name: 'Uji Ceremonial Matcha Latte 12oz', sellingPrice: 6.80 },
    { id: 'PRD006', name: 'Basque Burnt Cheesecake (Slice)', sellingPrice: 8.50 },
    { id: 'PRD007', name: 'Matcha Mille Crêpe Cake (Slice)', sellingPrice: 9.20 }
  ],

  recipes: [
    // PRD001: Butter Croissant
    { productId: 'PRD001', itemType: 'Ingredient', itemId: 'ING001', usageQty: 0.055 }, // 55g butter
    { productId: 'PRD001', itemType: 'Ingredient', itemId: 'ING003', usageQty: 0.075 }, // 75g flour
    { productId: 'PRD001', itemType: 'Ingredient', itemId: 'ING005', usageQty: 0.010 }, // 10g sugar
    { productId: 'PRD001', itemType: 'Ingredient', itemId: 'ING008', usageQty: 0.25 },  // 1/4 egg
    { productId: 'PRD001', itemType: 'Packaging',  itemId: 'PKG001', usageQty: 1 },

    // PRD002: Pain au Chocolat
    { productId: 'PRD002', itemType: 'Ingredient', itemId: 'ING001', usageQty: 0.060 },
    { productId: 'PRD002', itemType: 'Ingredient', itemId: 'ING003', usageQty: 0.080 },
    { productId: 'PRD002', itemType: 'Ingredient', itemId: 'ING006', usageQty: 0.025 }, // 25g Valrhona chocolate
    { productId: 'PRD002', itemType: 'Ingredient', itemId: 'ING005', usageQty: 0.012 },
    { productId: 'PRD002', itemType: 'Packaging',  itemId: 'PKG001', usageQty: 1 },

    // PRD003: Iced Americano
    { productId: 'PRD003', itemType: 'Ingredient', itemId: 'ING002', usageQty: 0.020 }, // 20g beans
    { productId: 'PRD003', itemType: 'Packaging',  itemId: 'PKG003', usageQty: 1 },     // 16oz cold cup
    { productId: 'PRD003', itemType: 'Packaging',  itemId: 'PKG004', usageQty: 1 },     // Lid & sleeve

    // PRD004: Oat Milk Latte
    { productId: 'PRD004', itemType: 'Ingredient', itemId: 'ING002', usageQty: 0.020 },
    { productId: 'PRD004', itemType: 'Ingredient', itemId: 'ING012', usageQty: 0.240 }, // 240ml Oatly
    { productId: 'PRD004', itemType: 'Packaging',  itemId: 'PKG002', usageQty: 1 },     // 12oz hot cup
    { productId: 'PRD004', itemType: 'Packaging',  itemId: 'PKG004', usageQty: 1 },

    // PRD005: Matcha Latte
    { productId: 'PRD005', itemType: 'Ingredient', itemId: 'ING009', usageQty: 0.006 }, // 6g Matcha
    { productId: 'PRD005', itemType: 'Ingredient', itemId: 'ING004', usageQty: 0.220 }, // 220ml Milk
    { productId: 'PRD005', itemType: 'Ingredient', itemId: 'ING005', usageQty: 0.008 },
    { productId: 'PRD005', itemType: 'Packaging',  itemId: 'PKG002', usageQty: 1 },
    { productId: 'PRD005', itemType: 'Packaging',  itemId: 'PKG004', usageQty: 1 },

    // PRD006: Basque Burnt Cheesecake
    { productId: 'PRD006', itemType: 'Ingredient', itemId: 'ING010', usageQty: 0.120 }, // 120g Cream Cheese
    { productId: 'PRD006', itemType: 'Ingredient', itemId: 'ING011', usageQty: 0.060 }, // 60ml Heavy Cream
    { productId: 'PRD006', itemType: 'Ingredient', itemId: 'ING008', usageQty: 0.75 },  // 3/4 egg
    { productId: 'PRD006', itemType: 'Ingredient', itemId: 'ING005', usageQty: 0.030 },
    { productId: 'PRD006', itemType: 'Ingredient', itemId: 'ING007', usageQty: 0.002 },
    { productId: 'PRD006', itemType: 'Packaging',  itemId: 'PKG006', usageQty: 1 },

    // PRD007: Matcha Mille Crêpe
    { productId: 'PRD007', itemType: 'Ingredient', itemId: 'ING009', usageQty: 0.008 },
    { productId: 'PRD007', itemType: 'Ingredient', itemId: 'ING003', usageQty: 0.040 },
    { productId: 'PRD007', itemType: 'Ingredient', itemId: 'ING011', usageQty: 0.080 },
    { productId: 'PRD007', itemType: 'Ingredient', itemId: 'ING008', usageQty: 0.50 },
    { productId: 'PRD007', itemType: 'Ingredient', itemId: 'ING001', usageQty: 0.020 },
    { productId: 'PRD007', itemType: 'Packaging',  itemId: 'PKG006', usageQty: 1 }
  ],

  sales: [
    { id: 'TX20260801-01', date: '2026-08-01', productId: 'PRD001', qtySold: 45, actualPrice: 4.80 },
    { id: 'TX20260801-02', date: '2026-08-01', productId: 'PRD003', qtySold: 62, actualPrice: 5.00 },
    { id: 'TX20260801-03', date: '2026-08-01', productId: 'PRD004', qtySold: 38, actualPrice: 6.20 },
    { id: 'TX20260801-04', date: '2026-08-01', productId: 'PRD006', qtySold: 18, actualPrice: 8.50 },

    { id: 'TX20260802-01', date: '2026-08-02', productId: 'PRD001', qtySold: 52, actualPrice: 4.80 },
    { id: 'TX20260802-02', date: '2026-08-02', productId: 'PRD002', qtySold: 30, actualPrice: 5.50 },
    { id: 'TX20260802-03', date: '2026-08-02', productId: 'PRD005', qtySold: 28, actualPrice: 6.80 },
    { id: 'TX20260802-04', date: '2026-08-02', productId: 'PRD007', qtySold: 15, actualPrice: 9.20 },

    { id: 'TX20260803-01', date: '2026-08-03', productId: 'PRD001', qtySold: 48, actualPrice: 4.80 },
    { id: 'TX20260803-02', date: '2026-08-03', productId: 'PRD003', qtySold: 58, actualPrice: 5.00 },
    { id: 'TX20260803-03', date: '2026-08-03', productId: 'PRD004', qtySold: 42, actualPrice: 6.20 },
    { id: 'TX20260803-04', date: '2026-08-03', productId: 'PRD006', qtySold: 22, actualPrice: 8.50 },

    { id: 'TX20260804-01', date: '2026-08-04', productId: 'PRD002', qtySold: 35, actualPrice: 5.50 },
    { id: 'TX20260804-02', date: '2026-08-04', productId: 'PRD004', qtySold: 40, actualPrice: 6.20 },
    { id: 'TX20260804-03', date: '2026-08-04', productId: 'PRD005', qtySold: 25, actualPrice: 6.80 },

    { id: 'TX20260805-01', date: '2026-08-05', productId: 'PRD001', qtySold: 60, actualPrice: 4.80 },
    { id: 'TX20260805-02', date: '2026-08-05', productId: 'PRD003', qtySold: 70, actualPrice: 5.00 },
    { id: 'TX20260805-03', date: '2026-08-05', productId: 'PRD007', qtySold: 20, actualPrice: 9.20 },

    { id: 'TX20260806-01', date: '2026-08-06', productId: 'PRD001', qtySold: 55, actualPrice: 4.80 },
    { id: 'TX20260806-02', date: '2026-08-06', productId: 'PRD002', qtySold: 32, actualPrice: 5.50 },
    { id: 'TX20260806-03', date: '2026-08-06', productId: 'PRD004', qtySold: 45, actualPrice: 6.20 },
    { id: 'TX20260806-04', date: '2026-08-06', productId: 'PRD006', qtySold: 25, actualPrice: 8.50 },

    { id: 'TX20260807-01', date: '2026-08-07', productId: 'PRD001', qtySold: 64, actualPrice: 4.80 },
    { id: 'TX20260807-02', date: '2026-08-07', productId: 'PRD003', qtySold: 75, actualPrice: 5.00 },
    { id: 'TX20260807-03', date: '2026-08-07', productId: 'PRD005', qtySold: 30, actualPrice: 6.80 }
  ],

  inventoryRecords: [
    { itemType: 'Ingredient', itemId: 'ING001', openingQty: 35.0, lossQty: 0.5 },
    { itemType: 'Ingredient', itemId: 'ING002', openingQty: 25.0, lossQty: 0.2 },
    { itemType: 'Ingredient', itemId: 'ING003', openingQty: 80.0, lossQty: 1.0 },
    { itemType: 'Ingredient', itemId: 'ING004', openingQty: 50.0, lossQty: 2.0 },
    { itemType: 'Ingredient', itemId: 'ING005', openingQty: 40.0, lossQty: 0.0 },
    { itemType: 'Ingredient', itemId: 'ING006', openingQty: 15.0, lossQty: 0.1 },
    { itemType: 'Ingredient', itemId: 'ING007', openingQty: 3.0,  lossQty: 0.0 },
    { itemType: 'Ingredient', itemId: 'ING008', openingQty: 350,  lossQty: 12 },
    { itemType: 'Ingredient', itemId: 'ING009', openingQty: 5.0,  lossQty: 0.05 },
    { itemType: 'Ingredient', itemId: 'ING010', openingQty: 20.0, lossQty: 0.4 },
    { itemType: 'Ingredient', itemId: 'ING011', openingQty: 30.0, lossQty: 0.8 },
    { itemType: 'Ingredient', itemId: 'ING012', openingQty: 45.0, lossQty: 1.0 },

    { itemType: 'Packaging', itemId: 'PKG001', openingQty: 400, lossQty: 5 },
    { itemType: 'Packaging', itemId: 'PKG002', openingQty: 500, lossQty: 2 },
    { itemType: 'Packaging', itemId: 'PKG003', openingQty: 600, lossQty: 0 },
    { itemType: 'Packaging', itemId: 'PKG004', openingQty: 1000, lossQty: 10 },
    { itemType: 'Packaging', itemId: 'PKG005', openingQty: 300, lossQty: 0 },
    { itemType: 'Packaging', itemId: 'PKG006', openingQty: 250, lossQty: 2 }
  ],

  purchaseOrders: [
    { id: 'PO20260725-01', poDate: '2026-07-25', supplierId: 'SUP001', itemId: 'ING001', itemType: 'Ingredient', qty: 20, unitPrice: 12.50, paymentStatus: 'Paid' },
    { id: 'PO20260728-01', poDate: '2026-07-28', supplierId: 'SUP002', itemId: 'ING002', itemType: 'Ingredient', qty: 15, unitPrice: 28.00, paymentStatus: 'Paid' },
    { id: 'PO20260801-01', poDate: '2026-08-01', supplierId: 'SUP003', itemId: 'ING004', itemType: 'Ingredient', qty: 30, unitPrice: 1.80, paymentStatus: 'Paid' },
    { id: 'PO20260803-01', poDate: '2026-08-03', supplierId: 'SUP004', itemId: 'ING006', itemType: 'Ingredient', qty: 10, unitPrice: 24.00, paymentStatus: 'Unpaid' },
    { id: 'PO20260805-01', poDate: '2026-08-05', supplierId: 'SUP006', itemId: 'PKG002', itemType: 'Packaging',  qty: 500, unitPrice: 0.18, paymentStatus: 'Unpaid' }
  ],

  employees: [
    { id: 'EMP001', name: 'Sophie Laurent', baseHourlyRate: 22.00, regularHours: 160, overtimeHours: 12, bonus: 200, penalty: 0 },
    { id: 'EMP002', name: 'Lucas Martin', baseHourlyRate: 18.50, regularHours: 150, overtimeHours: 8, bonus: 100, penalty: 0 },
    { id: 'EMP003', name: 'Emma Chen', baseHourlyRate: 17.00, regularHours: 140, overtimeHours: 4, bonus: 80, penalty: 20 },
    { id: 'EMP004', name: 'Antoine Dubois', baseHourlyRate: 25.00, regularHours: 160, overtimeHours: 15, bonus: 350, penalty: 0 }
  ],

  cashFlows: [
    { id: 'CF20260801-01', date: '2026-08-01', category: 'Monthly Store Rent', txType: 'Expense', amount: 4500.00, account: 'Bank' },
    { id: 'CF20260801-02', date: '2026-08-01', category: 'Utilities & Electricity', txType: 'Expense', amount: 680.00, account: 'Bank' },
    { id: 'CF20260802-01', date: '2026-08-02', category: 'POS System & Software Subscription', txType: 'Expense', amount: 120.00, account: 'Bank' },
    { id: 'CF20260804-01', date: '2026-08-04', category: 'Store Maintenance & Cleaning', txType: 'Expense', amount: 250.00, account: 'Cash' },
    { id: 'CF20260805-01', date: '2026-08-05', category: 'Catering Contract Deposit', txType: 'Income', amount: 1500.00, account: 'Bank' },
    { id: 'CF20260807-01', date: '2026-08-07', category: 'Local Marketing & Social Media Ads', txType: 'Expense', amount: 300.00, account: 'Bank' }
  ],

  lastSavedTimestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' })
};
