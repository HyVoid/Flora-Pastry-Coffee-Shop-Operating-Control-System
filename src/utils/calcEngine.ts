import {
  WorkbookData,
  RecipeItemType,
  CalculatedRecipeLine,
  CalculatedProductSummary,
  CalculatedSalesTx,
  CalculatedInventoryItem,
  CalculatedPO,
  CalculatedEmployee,
  CalculatedCashFlow,
  DashboardKPIs
} from '../types';

/**
 * Live unit cost lookup from Ingredient or Packaging master
 */
export function getLiveUnitCost(
  itemType: RecipeItemType,
  itemId: string,
  ingredients: WorkbookData['ingredients'],
  packaging: WorkbookData['packaging']
): number {
  if (itemType === 'Ingredient') {
    const found = ingredients.find((i) => i.id === itemId);
    return found ? found.currentCost : 0;
  } else if (itemType === 'Packaging') {
    const found = packaging.find((p) => p.id === itemId);
    return found ? found.unitCost : 0;
  }
  return 0;
}

/**
 * getItemName helper
 */
export function getItemName(
  itemType: RecipeItemType,
  itemId: string,
  ingredients: WorkbookData['ingredients'],
  packaging: WorkbookData['packaging']
): string {
  if (itemType === 'Ingredient') {
    const found = ingredients.find((i) => i.id === itemId);
    return found ? found.name : itemId;
  } else if (itemType === 'Packaging') {
    const found = packaging.find((p) => p.id === itemId);
    return found ? found.name : itemId;
  }
  return itemId;
}

/**
 * getItemUnit helper
 */
export function getItemUnit(
  itemType: RecipeItemType,
  itemId: string,
  ingredients: WorkbookData['ingredients'],
  packaging: WorkbookData['packaging']
): string {
  if (itemType === 'Ingredient') {
    const found = ingredients.find((i) => i.id === itemId);
    return found ? found.unit : 'unit';
  } else if (itemType === 'Packaging') {
    const found = packaging.find((p) => p.id === itemId);
    return found ? found.unit : 'pcs';
  }
  return 'unit';
}

/**
 * Calculates expanded recipe lines
 */
export function calculateRecipeLines(data: WorkbookData): CalculatedRecipeLine[] {
  return data.recipes.map((r) => {
    const liveUnitCost = getLiveUnitCost(r.itemType, r.itemId, data.ingredients, data.packaging);
    const itemName = getItemName(r.itemType, r.itemId, data.ingredients, data.packaging);
    const unit = getItemUnit(r.itemType, r.itemId, data.ingredients, data.packaging);
    const lineCost = r.usageQty * liveUnitCost;

    return {
      productId: r.productId,
      itemType: r.itemType,
      itemId: r.itemId,
      itemName,
      usageQty: r.usageQty,
      unit,
      liveUnitCost,
      lineCost
    };
  });
}

/**
 * Calculates product BOM cost & gross margin summaries
 */
export function calculateProductSummaries(data: WorkbookData): CalculatedProductSummary[] {
  const recipeLines = calculateRecipeLines(data);
  const targetMargin = data.settings.targetGrossMargin;

  return data.products.map((p) => {
    const pLines = recipeLines.filter((rl) => rl.productId === p.id);
    const totalBOMCost = pLines.reduce((sum, line) => sum + line.lineCost, 0);
    const grossProfit = p.sellingPrice - totalBOMCost;
    const foodCostPct = p.sellingPrice > 0 ? totalBOMCost / p.sellingPrice : 0;
    const marginPct = p.sellingPrice > 0 ? grossProfit / p.sellingPrice : 0;

    let linkStatus: CalculatedProductSummary['linkStatus'] = '✅ Normal';
    if (pLines.length === 0) {
      linkStatus = '🚨 Missing Recipe';
    } else if (totalBOMCost === 0) {
      linkStatus = '⚠️ Zero Material Cost';
    }

    let targetStatus: CalculatedProductSummary['targetStatus'] = '✅ Met Target';
    if (linkStatus.startsWith('🚨')) {
      targetStatus = '❌ Link Error';
    } else if (marginPct >= targetMargin) {
      targetStatus = '✅ Met Target';
    } else {
      targetStatus = '⚠️ Below Target';
    }

    return {
      productId: p.id,
      productName: p.name,
      sellingPrice: p.sellingPrice,
      totalBOMCost,
      grossProfit,
      foodCostPct,
      marginPct,
      targetStatus,
      linkStatus
    };
  });
}

/**
 * Calculates sales transactions with BOM cost propagation
 */
export function calculateSalesTransactions(data: WorkbookData): CalculatedSalesTx[] {
  const productSummaries = calculateProductSummaries(data);
  const taxRate = data.settings.taxRate;

  return data.sales.map((tx) => {
    const prodSummary = productSummaries.find((ps) => ps.productId === tx.productId);
    const productName = prodSummary ? prodSummary.productName : tx.productId;
    const unitBOMCost = prodSummary ? prodSummary.totalBOMCost : 0;
    const totalRevenue = tx.qtySold * tx.actualPrice;
    const totalBOMCost = tx.qtySold * unitBOMCost;
    const grossProfit = totalRevenue - totalBOMCost;
    const taxAmount = totalRevenue * taxRate;
    const linkStatus = prodSummary ? prodSummary.linkStatus : '🚨 Unregistered Product';

    return {
      id: tx.id,
      date: tx.date,
      productId: tx.productId,
      productName,
      qtySold: tx.qtySold,
      actualPrice: tx.actualPrice,
      unitBOMCost,
      totalRevenue,
      totalBOMCost,
      grossProfit,
      taxAmount,
      linkStatus
    };
  });
}

/**
 * Calculates inventory movements and dynamic stock deduction
 */
export function calculateInventoryMovements(data: WorkbookData): CalculatedInventoryItem[] {
  // Combine all ingredients and packaging items into a master list of items to monitor
  const ingredientItems = data.ingredients.map((ing) => ({
    itemType: 'Ingredient' as RecipeItemType,
    itemId: ing.id,
    itemName: ing.name,
    unit: ing.unit,
    minStock: ing.minStockQty
  }));

  const packagingItems = data.packaging.map((pkg) => ({
    itemType: 'Packaging' as RecipeItemType,
    itemId: pkg.id,
    itemName: pkg.name,
    unit: pkg.unit,
    minStock: 0
  }));

  const allItems = [...ingredientItems, ...packagingItems];

  return allItems.map((item) => {
    // 1. Opening & Loss qty from inventoryRecords
    const record = data.inventoryRecords.find(
      (r) => r.itemType === item.itemType && r.itemId === item.itemId
    );
    const openingQty = record ? record.openingQty : 0;
    const lossQty = record ? record.lossQty : 0;

    // 2. In_Qty from Purchase Orders
    const inQty = data.purchaseOrders
      .filter((po) => po.itemType === item.itemType && po.itemId === item.itemId)
      .reduce((sum, po) => sum + po.qty, 0);

    // 3. Out_Qty from Sales Transactions multiplied by Recipe Usage Qty
    let outQty = 0;
    data.sales.forEach((s) => {
      // find recipe usage for this item in this product
      const recipeMatch = data.recipes.find(
        (r) => r.productId === s.productId && r.itemType === item.itemType && r.itemId === item.itemId
      );
      if (recipeMatch) {
        outQty += s.qtySold * recipeMatch.usageQty;
      }
    });

    const currentQty = openingQty + inQty - outQty - lossQty;
    const liveUnitCost = getLiveUnitCost(item.itemType, item.itemId, data.ingredients, data.packaging);
    const stockValue = currentQty * liveUnitCost;
    const stockStatus = currentQty <= item.minStock ? '🚨 Reorder Alert' : '✅ Normal';

    return {
      itemType: item.itemType,
      itemId: item.itemId,
      itemName: item.itemName,
      unit: item.unit,
      openingQty,
      inQty,
      outQty,
      lossQty,
      currentQty,
      minStock: item.minStock,
      stockStatus,
      stockValue,
      liveUnitCost
    };
  });
}

/**
 * Calculates Purchase Orders & AP Balance
 */
export function calculatePurchaseOrders(data: WorkbookData): CalculatedPO[] {
  return data.purchaseOrders.map((po) => {
    const itemName = getItemName(po.itemType, po.itemId, data.ingredients, data.packaging);
    const totalAmount = po.qty * po.unitPrice;
    const apBalance = po.paymentStatus === 'Unpaid' ? totalAmount : 0;

    return {
      id: po.id,
      poDate: po.poDate,
      supplierId: po.supplierId,
      itemId: po.itemId,
      itemName,
      itemType: po.itemType,
      qty: po.qty,
      unitPrice: po.unitPrice,
      totalAmount,
      paymentStatus: po.paymentStatus,
      apBalance
    };
  });
}

/**
 * Calculates Payroll
 */
export function calculatePayroll(data: WorkbookData): CalculatedEmployee[] {
  const otFactor = data.settings.otFactor;

  return data.employees.map((emp) => {
    const overtimePay = emp.overtimeHours * (emp.baseHourlyRate * otFactor);
    const totalPay = emp.regularHours * emp.baseHourlyRate + overtimePay + emp.bonus - emp.penalty;

    return {
      id: emp.id,
      name: emp.name,
      baseHourlyRate: emp.baseHourlyRate,
      regularHours: emp.regularHours,
      overtimeHours: emp.overtimeHours,
      bonus: emp.bonus,
      penalty: emp.penalty,
      overtimePay,
      totalPay
    };
  });
}

/**
 * Calculates CashFlow Ledger
 */
export function calculateCashFlows(data: WorkbookData): CalculatedCashFlow[] {
  return data.cashFlows.map((cf) => {
    const netCashImpact = cf.txType === 'Income' ? cf.amount : -cf.amount;

    return {
      id: cf.id,
      date: cf.date,
      category: cf.category,
      txType: cf.txType,
      amount: cf.amount,
      account: cf.account,
      netCashImpact
    };
  });
}

/**
 * Calculates Executive Dashboard KPIs
 */
export function calculateDashboardKPIs(data: WorkbookData): DashboardKPIs {
  const calculatedSales = calculateSalesTransactions(data);
  const calculatedInventory = calculateInventoryMovements(data);
  const calculatedProductSummaries = calculateProductSummaries(data);
  const calculatedPayrollList = calculatePayroll(data);
  const calculatedCashFlowList = calculateCashFlows(data);

  const totalRevenue = calculatedSales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalGrossProfit = calculatedSales.reduce((sum, s) => sum + s.grossProfit, 0);
  const overallMarginPct = totalRevenue > 0 ? totalGrossProfit / totalRevenue : 0;

  // Operating Expenses = CashFlow Expenses + Total Payroll
  const cashFlowExpenses = calculatedCashFlowList
    .filter((cf) => cf.txType === 'Expense')
    .reduce((sum, cf) => sum + cf.amount, 0);

  const totalPayrollCost = calculatedPayrollList.reduce((sum, emp) => sum + emp.totalPay, 0);
  const totalOperatingExpenses = cashFlowExpenses + totalPayrollCost;

  const netOperatingProfit = totalGrossProfit - totalOperatingExpenses;

  const endingCashBalance = calculatedCashFlowList.reduce((sum, cf) => sum + cf.netCashImpact, 0);

  const lowStockCount = calculatedInventory.filter((inv) => inv.stockStatus === '🚨 Reorder Alert').length;

  const recipeErrors = calculatedProductSummaries.filter((p) => p.linkStatus.startsWith('🚨')).length;
  const salesErrors = calculatedSales.filter((s) => s.linkStatus.startsWith('🚨')).length;
  const linkErrorCount = recipeErrors + salesErrors;

  return {
    totalRevenue,
    totalGrossProfit,
    overallMarginPct,
    totalOperatingExpenses,
    netOperatingProfit,
    endingCashBalance,
    lowStockCount,
    linkErrorCount
  };
}
