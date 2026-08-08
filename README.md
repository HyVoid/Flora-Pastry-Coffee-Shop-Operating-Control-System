[English](README.md) · [中文说明](README_CN.md)

# Flora Pastry & Coffee Shop Operations Control System

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-brightgreen.svg)
![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-orange.svg)

**Track sales, product profitability, inventory exposure, labor cost, cash flow, and data integrity in one lightweight operating workbook — free in the browser, with an Excel version for deeper control.**

> **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → `HTML live demo`
>
> 📥 **Download Excel** → `Excel version / release link`

## Screenshots

<!-- screenshot: browser version -->

**Browser version** — A lightweight operating view for monitoring sales, profitability, inventory warnings, cash position, and operational exceptions without installing software.

<!-- screenshot: Excel version -->

**Excel version** — The full workbook connects product recipes, ingredient and packaging costs, sales, inventory, purchasing, payroll, and finance into one operating model.

## What It Helps You Track

* **Sales performance** — daily, weekly, monthly, and yearly revenue without rebuilding separate reports.
* **True product profitability** — product-level BOM cost, gross profit, Food Cost %, and margin after current ingredient and packaging prices.
* **Cost changes flowing into decisions** — a changed ingredient or packaging price immediately affects recipe cost and downstream profitability.
* **Inventory exposure** — current quantities, stock value, consumption, losses, and low-stock warnings.
* **Cash and operating pressure** — cash movement, operating expenses, payroll, and resulting net profit in the same management view.
* **Data integrity problems** — missing recipes, unregistered products, or missing material prices are surfaced instead of silently producing misleading profit numbers.

## Quick Start Workflow

1. **Set key parameters.**
   Open `02_Settings_Control` and establish the operating assumptions used across the workbook, such as currency, tax rate, target margin, overtime multiplier, and inventory safety buffer. These parameters are maintained centrally rather than embedded throughout individual calculations.

2. **Load operating data.**
   Maintain ingredient and packaging master data, product recipes, sales transactions, purchasing records, inventory movements, employee hours, and cash-flow transactions in their designated sheets. Existing information can be transferred from accounting exports or other spreadsheets into the corresponding input areas.

3. **Get the operating picture.**
   Open `01_Dashboard`. Sales, gross profit, operating expenses, net profit, cash position, inventory warnings, and data-link exceptions are calculated from the underlying records.

4. **Refresh periodically.**
   Continue adding new transactions and updating changing master data. Global parameters can be changed centrally when business assumptions change. The workbook recalculates without rebuilding the reporting structure.

**Set a few key parameters. Drop in the operating data. Get the analysis. Refresh when you need to.**

## Why I Built This

A pastry and coffee shop can appear profitable while the underlying numbers are wrong.

The problem is not always a bad business decision. Often, the decision is based on a number that has quietly become disconnected from the operation.

For example, a recipe may use an ingredient whose purchase price has increased. If the recipe cost is not refreshed, the reported product margin remains artificially high. The same problem appears when a product is sold before its BOM has been registered: a missing cost can become a numerical zero, making the product appear to have an unusually strong margin.

That is the failure this workbook is designed to prevent.

Instead of treating profitability as a static report, the model connects the operating chain:

**Ingredient / Packaging Cost → Recipe Cost → Sales Gross Profit → Inventory Consumption → Operating Expenses → Net Profit → Cash Position**

It also separates **calculation values** from **diagnostic status**. A missing cost can safely return `0` for downstream arithmetic while a separate `Link_Status` field identifies the missing relationship.

The practical difference is significant.

**Before:**
A product with a missing recipe can appear to have zero BOM cost and therefore an apparently excellent gross margin.

**After:**
The same product is flagged as `🚨 Unregistered Product` or `🚨 Missing Recipe Detail`, allowing the reported profitability to be treated as incomplete rather than as evidence of strong performance.

This is not intended to replace accounting software. It is a reusable, productized reasoning framework for connecting the operational numbers that influence everyday decisions.

## Common Pastry & Coffee Shop Problems This Solves

| Problem                                                    | Without This Tool                                                                         | With This Tool                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Ingredient prices change                                   | Product margins become stale until someone manually rebuilds costing                      | Current ingredient costs flow into recipe BOM costs and product margins                    |
| A recipe is incomplete                                     | Missing costs can appear as zero and create false profitability                           | `Link_Status` identifies missing recipe details before they become a management conclusion |
| Sales are recorded separately from costing                 | Revenue is visible, but product-level gross profit requires manual reconciliation         | Sales transactions automatically connect to current BOM costs                              |
| Inventory is disconnected from sales                       | Stock levels require separate calculations and manual consumption estimates               | Sales quantities and recipe usage drive material consumption and stock warnings            |
| Labor and operating expenses sit outside product reporting | Gross profit may look healthy while payroll and operating costs erode the business result | Payroll and operating expenses feed the net-profit view                                    |
| Cash looks healthy while obligations accumulate            | Cash movement and unpaid purchasing obligations are difficult to reconcile operationally  | Cash-flow transactions and purchasing/AP records provide a combined operating view         |

## Who This Is For

This toolkit is designed for **small pastry shops, bakeries, coffee shops, and owner-operated food businesses** that need more operational control than a basic sales spreadsheet provides, but do not need a full enterprise ERP implementation.

It is particularly useful when ingredient prices move frequently, recipes determine product economics, inventory needs active monitoring, and the owner needs one place to understand **sales → cost → profit → inventory → payroll → cash**.

It is not designed to replace a statutory accounting system, payroll compliance platform, POS, or enterprise ERP.

**No spreadsheet expertise needed. Open the browser version and start tracking immediately.** The Excel version is available when deeper workbook-level control and customization are required.

## About

I build lightweight operational trackers and decision-support tools for situations where there are too many moving parts to hold in your head, but a full enterprise system would add unnecessary complexity.

The central question is simple:

> **What information needs to be in one place to make the next decision confidently?**

Flora is one example of that approach. Rather than building a generic dashboard, the workbook connects the specific operational relationships that determine whether a pastry and coffee shop's reported performance can actually be trusted.

### Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

Flora is structured as a three-layer operating workbook:

```text
┌──────────────────────────────┐
│ 01_Dashboard                 │
│ Management Presentation      │
│ KPIs · Profit · Cash · Alerts│
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ Calculation & Transaction     │
│ 05_Recipe_Engine             │
│ 06_Sales_Transactions        │
│ 07_Inventory_Movement        │
│ 08_Suppliers_Purchasing      │
│ 09_Payroll_Employees         │
│ 10_Finance_CashFlow          │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ Master & Control Data         │
│ 02_Settings_Control           │
│ 03_Ingredient_Master          │
│ 04_Packaging_Master           │
└──────────────────────────────┘
```

| Layer        | Sheet                     | Primary Responsibility                                                             |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| Presentation | `01_Dashboard`            | Revenue, gross profit, net profit, cash, inventory warnings, and data-link health  |
| Control      | `02_Settings_Control`     | Central operating assumptions and parameters                                       |
| Master Data  | `03_Ingredient_Master`    | Ingredient IDs, units, current costs, suppliers, minimum stock                     |
| Master Data  | `04_Packaging_Master`     | Packaging IDs, units, current costs, suppliers                                     |
| Calculation  | `05_Recipe_Engine`        | BOM detail, live material costs, product cost, margin, recipe-link diagnostics     |
| Transactions | `06_Sales_Transactions`   | Sales activity, revenue, BOM cost, gross profit, tax, product-link diagnostics     |
| Inventory    | `07_Inventory_Movement`   | Opening stock, purchases, sales consumption, losses, current quantity, stock value |
| Purchasing   | `08_Suppliers_Purchasing` | Purchase orders, supplier transactions, payment status, AP balance                 |
| Labor        | `09_Payroll_Employees`    | Regular hours, overtime, bonuses, penalties, payroll cost                          |
| Finance      | `10_Finance_CashFlow`     | Income, expenses, account movement, net cash impact                                |

The intended dependency direction is:

```text
Settings
   │
   ├──────────────┐
   ▼              ▼
Ingredient     Packaging
   │              │
   └──────┬───────┘
          ▼
   Recipe Engine
      │       │
      │       └──────────────┐
      ▼                      ▼
Sales Transactions     Inventory Movement
      │                      │
      └──────────┬───────────┘
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
    Payroll   Purchasing  Finance
       │         │          │
       └─────────┼──────────┘
                 ▼
             Dashboard
```

This creates the core operating chain:

**Ingredient / Packaging Cost → Recipe Cost → Sales Gross Profit → Inventory Consumption → Operating Expenses → Net Profit → Cash Position**

The architecture also distinguishes between **calculation outputs** and **diagnostic outputs**. Numeric calculations can use `0` as a safe downstream value when a lookup fails, while `Link_Status` exposes the underlying data problem to management.

### Three Traps That Catch Even Experienced Operators

#### Trap 1 — A Missing Recipe Looks Like a High-Margin Product

**1. A decision was made.**
A product appears to have an unusually high gross margin, so management considers keeping its current selling price and prioritizing the product.

**2. The decision relied on a faulty number.**
The product has no complete recipe detail, so its BOM cost resolves to `0`.

**3. The flaw changes the recommendation.**
A selling price of `$8.00` with a reported BOM cost of `$0.00` produces a reported gross margin of `100%`.

**4. Why the reasoning is incorrect.**
The number does not represent a real zero-cost product. It represents incomplete costing data.

**5. Corrected approach.**
Keep the numerical fallback safe for downstream calculations, but independently diagnose whether a valid recipe exists.

**6. Corrected decision outcome.**
The product is flagged as `🚨 Missing Recipe Detail` rather than being treated as a 100% margin product.

**7. Formula logic:**

<details>
<summary>Recipe link-status diagnostic</summary>

```excel
=LET(
    prod_ids,FILTER(I2:I10000,I2:I10000<>""),
    costs,L2#,
    link_statuses,
    MAP(prod_ids,costs,LAMBDA(p,c,
        LET(
            item_cnt,COUNTIF(A2:A10000,p),
            IF(item_cnt=0,
                "🚨 Missing Recipe Detail",
                IF(c=0,
                    "⚠️ Material Cost Not Set",
                    "✅ Normal"
                )
            )
        )
    )),
    link_statuses
)
```

The important control is not the fallback `0` itself. It is the separate diagnostic status that prevents the fallback from being mistaken for business reality.

</details>

---

#### Trap 2 — A Cost Change Is Not Reflected in Product Economics

**1. A decision was made.**
Management reviews product margins and decides that current pricing remains acceptable.

**2. The decision relied on an unnoticed faulty assumption.**
The ingredient master still contains an outdated purchase cost.

**3. The flaw changes the recommendation.**
The reported BOM cost is lower than the current purchasing reality, so the reported margin is overstated.

**4. Why the reasoning is incorrect.**
For a recipe-driven business, current material cost is a direct input to product economics. A stale cost produces a stale margin.

**5. Corrected approach.**
Maintain current ingredient and packaging costs in the master tables and let the Recipe Engine retrieve those values dynamically.

**6. Corrected decision outcome.**
A changed ingredient cost flows into recipe line cost, total BOM cost, Food Cost %, and Margin % without manually rebuilding each product calculation.

**7. Formula logic:**

<details>
<summary>Live material cost retrieval</summary>

```excel
=LET(
    item_types,FILTER(B2:B10000,A2:A10000<>""),
    item_ids,FILTER(C2:C10000,A2:A10000<>""),
    MAP(
        item_types,
        item_ids,
        LAMBDA(t,id,
            IF(
                t="Ingredient",
                XLOOKUP(
                    id,
                    '03_Ingredient_Master'!A2:A10000,
                    '03_Ingredient_Master'!D2:D10000,
                    0
                ),
                IF(
                    t="Packaging",
                    XLOOKUP(
                        id,
                        '04_Packaging_Master'!A2:A10000,
                        '04_Packaging_Master'!D2:D10000,
                        0
                    ),
                    0
                )
            )
        )
    )
)
```

The recipe does not store a disconnected historical material price as its primary costing source. It retrieves the current master-data cost.

</details>

---

#### Trap 3 — Revenue Is Correct but Profitability Is Not

**1. A decision was made.**
Sales revenue is increasing, so management interprets the trend as evidence that the business is becoming more profitable.

**2. The decision relied on an incomplete metric.**
Revenue alone does not account for BOM cost, payroll, operating expenses, or cash movement.

**3. The flaw changes the recommendation.**
A growing sales line can coexist with declining gross margin, increasing payroll expense, or deteriorating cash availability.

**4. Why the reasoning is incorrect.**
Top-line growth answers how much was sold. It does not answer how much value remains after operating costs.

**5. Corrected approach.**
Evaluate the linked sequence of revenue, BOM cost, gross profit, operating expenses, payroll, net profit, and cash flow.

**6. Corrected decision outcome.**
Management can distinguish sales growth from actual operating improvement and identify whether the constraint is pricing, material cost, labor, expenses, or liquidity.

**7. Formula logic:**

<details>
<summary>Operating net profit</summary>

```excel
=Gross_Profit - Total_Operating_Expenses
```

In the Dashboard architecture, operating expenses combine Finance transactions classified as `Expense` with payroll totals.

</details>

### Example Scenario

Consider a pastry priced at **$8.00**.

Its recipe contains ingredients and packaging with a combined current BOM cost of **$2.80**.

The product economics are therefore:

| Metric              | Value |
| ------------------- | ----: |
| Selling Price       | $8.00 |
| BOM Cost            | $2.80 |
| Gross Profit / Unit | $5.20 |
| Food Cost %         | 35.0% |
| Gross Margin %      | 65.0% |

If the target margin in `02_Settings_Control` is **65%**, the product reaches the target exactly.

Now suppose the current ingredient master is updated and the recipe's live BOM cost rises to **$3.20**.

The model changes the economics to:

| Metric              |       Previous |         Updated |
| ------------------- | -------------: | --------------: |
| Selling Price       |          $8.00 |           $8.00 |
| BOM Cost            |          $2.80 |           $3.20 |
| Gross Profit / Unit |          $5.20 |           $4.80 |
| Food Cost %         |          35.0% |           40.0% |
| Gross Margin %      |          65.0% |           60.0% |
| Target Status       | ✅ Meets Target | ⚠️ Below Target |

The operational interpretation is more useful than simply observing that “ingredient costs increased.”

The product has moved from a **65% margin at target** to a **60% margin below target**. If the price is not changed, every additional unit sold contributes less gross profit than previously assumed.

The decision is therefore no longer “sales are healthy, keep pricing unchanged.” The relevant question becomes whether the business should **raise price, reformulate the recipe, negotiate the material cost, accept the lower margin, or reconsider the product's role**.

The same model then carries the product into sales transactions, where actual quantity sold determines total revenue and total BOM consumption. Recipe usage can also feed inventory consumption, while payroll and finance transactions affect the broader operating result.

This is the intended use of the workbook: not merely calculating isolated numbers, but connecting the numbers so that a change in one operational assumption can be evaluated against the resulting business decision.

### Formula Reference

<details>
<summary>02_Settings_Control — Central Parameters</summary>

Global assumptions are maintained centrally rather than embedded as hard-coded values throughout the workbook.

Examples include:

| Parameter               | Example |
| ----------------------- | ------: |
| Currency                |     `$` |
| Tax Rate                |  `5.0%` |
| Target Margin           | `65.0%` |
| Overtime Multiplier     |  `1.50` |
| Inventory Safety Buffer | `20.0%` |

Example parameter reference:

```excel
='02_Settings_Control'!$B$4
```

This allows the target margin to change once and propagate through the relevant calculations.

</details>

<details>
<summary>05_Recipe_Engine — Product Cost and Margin</summary>

**Total BOM Cost**

```excel
=LET(
    prod_ids,FILTER(I2:I10000,I2:I10000<>""),
    MAP(
        prod_ids,
        LAMBDA(p,
            SUMIFS(F2:F10000,A2:A10000,p)
        )
    )
)
```

This aggregates recipe line costs by `Product_ID`.

**Gross Profit, Food Cost %, Margin %, Target Status, Link Status**

```excel
=LET(
    prod_ids,FILTER(I2:I10000,I2:I10000<>""),
    prices,FILTER(K2:K10000,I2:I10000<>""),
    costs,L2#,
    target_margin,'02_Settings_Control'!$B$4,
    gross_profits,prices-costs,
    food_cost_pct,IF(prices>0,costs/prices,0),
    margin_pct,IF(prices>0,gross_profits/prices,0),
    link_statuses,
    MAP(
        prod_ids,
        costs,
        LAMBDA(p,c,
            LET(
                item_cnt,COUNTIF(A2:A10000,p),
                IF(
                    item_cnt=0,
                    "🚨 Missing Recipe Detail",
                    IF(c=0,
                        "⚠️ Material Cost Not Set",
                        "✅ Normal"
                    )
                )
            )
        )
    ),
    target_statuses,
    MAP(
        margin_pct,
        link_statuses,
        LAMBDA(m,ls,
            IF(
                LEFT(ls,1)="🚨",
                "❌ Broken Link",
                IF(m>=target_margin,
                    "✅ Meets Target",
                    "⚠️ Below Target"
                )
            )
        )
    ),
    HSTACK(
        gross_profits,
        food_cost_pct,
        margin_pct,
        target_statuses,
        link_statuses
    )
)
```

The calculation layer deliberately separates numeric outputs from diagnostic states. This prevents a lookup fallback from being interpreted as proof of zero cost.

</details>

<details>
<summary>06_Sales_Transactions — Revenue and Transaction Profit</summary>

**Unit BOM Cost**

```excel
=LET(
    prod_ids,FILTER(C2:C10000,A2:A10000<>""),
    MAP(
        prod_ids,
        LAMBDA(p,
            XLOOKUP(
                p,
                '05_Recipe_Engine'!I2:I10000,
                '05_Recipe_Engine'!L2:L10000,
                0
            )
        )
    )
)
```

**Transaction-level outputs**

```excel
=LET(
    prod_ids,FILTER(C2:C10000,A2:A10000<>""),
    qtys,FILTER(D2:D10000,A2:A10000<>""),
    prices,FILTER(E2:E10000,A2:A10000<>""),
    unit_costs,F2#,
    tax_rate,'02_Settings_Control'!$B$3,
    revenues,qtys*prices,
    costs,qtys*unit_costs,
    profits,revenues-costs,
    taxes,revenues*tax_rate,
    statuses,
    MAP(
        prod_ids,
        LAMBDA(p,
            XLOOKUP(
                p,
                '05_Recipe_Engine'!I2:I10000,
                '05_Recipe_Engine'!Q2:Q10000,
                "🚨 Unregistered Product"
            )
        )
    ),
    HSTACK(
        revenues,
        costs,
        profits,
        taxes,
        statuses
    )
)
```

The transaction layer therefore connects actual sales quantity and actual selling price to the current product costing model.

</details>

<details>
<summary>07_Inventory_Movement — Consumption and Stock Position</summary>

**Current Quantity**

```excel
Current Qty =
Opening Qty + In Qty - Out Qty - Loss Qty
```

**Stock Status**

```excel
=IF(Current_Qty<=Min_Stock,"🚨 Reorder Alert","✅ Normal")
```

**Stock Value**

```excel
=Current_Qty*Live_Unit_Cost
```

Inventory is therefore treated as an operating exposure rather than only a quantity list: current stock can be evaluated against minimum levels and the current cost basis.

</details>

<details>
<summary>08_Suppliers_Purchasing — Purchase and AP Logic</summary>

```excel
=LET(
    qtys,FILTER(E2:E10000,A2:A10000<>""),
    prices,FILTER(F2:F10000,A2:A10000<>""),
    statuses,FILTER(H2:H10000,A2:A10000<>""),
    totals,qtys*prices,
    aps,IF(statuses="Unpaid",totals,0),
    HSTACK(totals,aps)
)
```

`Total_PO_Amount` is calculated from quantity and unit price. `AP_Balance` includes the order value when the payment status is `Unpaid`.

</details>

<details>
<summary>09_Payroll_Employees — Labor Cost</summary>

```excel
=LET(
    bases,FILTER(C2:C10000,A2:A10000<>""),
    regs,FILTER(D2:D10000,A2:A10000<>""),
    ots,FILTER(E2:E10000,A2:A10000<>""),
    bonuses,FILTER(F2:F10000,A2:A10000<>""),
    penalties,FILTER(G2:G10000,A2:A10000<>""),
    ot_mult,'02_Settings_Control'!$B$5,
    ot_pays,ots*(bases*ot_mult),
    totals,(regs*bases)+ot_pays+bonuses-penalties,
    HSTACK(ot_pays,totals)
)
```

The model keeps overtime assumptions centralized and calculates total payroll from regular hours, overtime, bonuses, and penalties.

</details>

<details>
<summary>10_Finance_CashFlow — Cash Impact</summary>

```excel
=LET(
    types,FILTER(D2:D10000,A2:A10000<>""),
    amounts,FILTER(E2:E10000,A2:A10000<>""),
    IF(types="Income",amounts,-amounts)
)
```

Income is represented as positive cash impact; expenses are represented as negative cash impact.

</details>

<details>
<summary>01_Dashboard — Management KPIs</summary>

**Total Sales Revenue**

```excel
=SUM('06_Sales_Transactions'!G2:G10000)
```

**Total Gross Profit**

```excel
=SUM('06_Sales_Transactions'!I2:I10000)
```

**Gross Margin**

```excel
=IF(B3>0,D3/B3,0)
```

**Operating Expenses**

```excel
=SUMIFS(
    '10_Finance_CashFlow'!E2:E10000,
    '10_Finance_CashFlow'!D2:D10000,
    "Expense"
)
+SUM('09_Payroll_Employees'!I2:I10000)
```

**Net Profit**

```excel
=Gross_Profit-Operating_Expenses
```

**Cash Balance**

```excel
=SUM('10_Finance_CashFlow'!G2:G10000)
```

**Inventory Warning Count**

```excel
=COUNTIF(
    '07_Inventory_Movement'!J2:J10000,
    "🚨 Reorder Alert"
)
```

**Link Error Count**

```excel
=COUNTIF(
    '06_Sales_Transactions'!K2:K10000,
    "🚨*"
)
+
COUNTIF(
    '05_Recipe_Engine'!Q2:Q10000,
    "🚨*"
)
```

The Dashboard therefore combines business performance with data-quality diagnostics rather than presenting profitability metrics without checking whether their upstream data is complete.

</details>

<!-- Technical Details parent <details> intentionally remains OPEN for Part 3. -->
### Validation Rules

The workbook uses validation at both the **calculation level** and the **business-logic level**. A numeric fallback such as `0` prevents downstream formulas from breaking, while a separate diagnostic field identifies whether the underlying relationship is actually valid.

| Field / Area                   | Rule                                                                                          | Error Behavior                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Param_Value`                  | Global parameters must contain values compatible with their intended business meaning         | Downstream calculations may become incorrect if invalid values are entered; parameter review is required |
| `Ingredient_ID`                | Must uniquely identify an ingredient and match recipe references                              | Failed lookup returns `0` for calculation purposes                                                       |
| `Current_Cost`                 | Should contain the current purchasing cost of the ingredient                                  | Missing cost produces `⚠️ Material Cost Not Set` in recipe diagnostics                                   |
| `Packaging_ID`                 | Must uniquely identify packaging material and match recipe references                         | Failed lookup returns `0` for calculation purposes                                                       |
| `Unit_Cost`                    | Should contain the current packaging cost                                                     | Missing cost can result in incomplete product costing                                                    |
| `Product_ID`                   | Sales transactions must correspond to a registered product in the Recipe Engine               | `🚨 Unregistered Product`                                                                                |
| Recipe detail                  | Each product must have at least one associated recipe line                                    | `🚨 Missing Recipe Detail`                                                                               |
| Recipe material cost           | Recipe items must resolve to a valid ingredient or packaging cost                             | `⚠️ Material Cost Not Set`                                                                               |
| Selling price                  | Must be greater than zero for meaningful margin calculations                                  | Food Cost % and Margin % return `0` when price is not positive                                           |
| Target margin                  | Product margin is compared against the centralized target in `02_Settings_Control`            | `⚠️ Below Target` when margin is below the configured threshold                                          |
| Sales quantity                 | Must represent the actual quantity sold                                                       | Incorrect quantities directly affect revenue, cost, profit, and inventory consumption                    |
| Inventory opening quantity     | Must represent the actual starting stock position                                             | Incorrect opening quantity propagates into current stock                                                 |
| Inventory loss quantity        | Used for waste, spoilage, expiration, and stock-count losses                                  | Incorrect loss values distort current inventory                                                          |
| Minimum stock                  | Defines the reorder threshold                                                                 | `🚨 Reorder Alert` when current quantity is at or below minimum stock                                    |
| Purchase quantity / unit price | Both are required for meaningful PO value                                                     | Incorrect values distort purchasing and AP totals                                                        |
| Payment status                 | `Unpaid` determines whether PO value contributes to AP balance                                | Non-`Unpaid` status is treated as not outstanding                                                        |
| Employee hours / rate          | Regular and overtime hours are multiplied by the relevant rates                               | Incorrect inputs directly affect payroll cost                                                            |
| Finance transaction type       | `Income` is positive; other recorded expense transactions are treated as negative cash impact | Incorrect transaction classification changes cash-flow interpretation                                    |
| Dynamic-array output area      | Formula spill ranges must remain unobstructed                                                 | Excel returns `#SPILL!`                                                                                  |
| Dashboard link diagnostics     | Sales and recipe link errors should be reviewed before relying on profitability metrics       | Dashboard reports the number of link exceptions                                                          |

### Operational Validation Flow

The validation model follows the same dependency direction as the business model:

```text
Master Data
    ↓
Recipe Integrity
    ↓
Product Cost Integrity
    ↓
Sales Link Integrity
    ↓
Inventory Consumption
    ↓
Profitability
    ↓
Cash / Operating Result
    ↓
Dashboard Diagnostic Status
```

A critical principle is that **calculation validity and business validity are not the same thing**.

For example:

```text
Missing Recipe
      ↓
BOM Cost lookup → 0
      ↓
Gross Profit calculation still works
      ↓
Margin calculation may appear extremely high
      ↓
Link_Status → 🚨 Missing Recipe Detail
      ↓
Dashboard → Link Error Count increases
```

This prevents a technically valid Excel calculation from being mistaken for a valid business conclusion.

### Cross-Table Integrity Checks

The workbook contains several multi-hop dependencies that require explicit checking.

#### Sales → Recipe → Material Master

```text
06_Sales_Transactions
        ↓ Product_ID
05_Recipe_Engine
        ↓ Item_ID
03_Ingredient_Master / 04_Packaging_Master
```

A missing relationship at any point can affect reported product cost.

#### Sales → Recipe → Inventory

```text
06_Sales_Transactions
        ↓ Product_ID + Qty_Sold
05_Recipe_Engine
        ↓ Item_ID + Usage_Qty
07_Inventory_Movement
```

This relationship converts product sales into material consumption.

#### Purchasing → Inventory / AP

```text
08_Suppliers_Purchasing
        ├── Purchase Quantity
        ├── Unit Price
        └── Payment Status
                 ↓
        PO Amount / AP Balance
```

The architecture therefore separates operational quantities from financial obligations while retaining their relationship.

### Zero-Maintenance Operating Rules

The workbook is designed around dynamic-array formulas and centralized parameters.

1. **Do not manually copy formulas down.**
   New records should be entered into the designated input areas.

2. **Do not overwrite formula-generated cells.**
   Dynamic-array output ranges must remain clear.

3. **Maintain master data before transactional data.**
   Ingredient, packaging, and recipe relationships should exist before related sales are relied upon for profitability analysis.

4. **Change global assumptions centrally.**
   Tax rate, target margin, overtime multiplier, and safety buffer are maintained through `02_Settings_Control`.

5. **Review diagnostics before interpreting KPIs.**
   A dashboard showing revenue and profit does not automatically mean every underlying calculation is complete.

### Excel Compatibility

The source architecture relies on modern Excel functions including:

```text
LET
FILTER
XLOOKUP
MAP
LAMBDA
HSTACK
SEQUENCE
SUMIFS
SUMPRODUCT
COUNTIF
```

The implementation therefore targets **Microsoft 365 and Excel 2021 or later**, with dynamic-array functionality available.

The architecture recommends keeping individual tables below approximately **100,000 rows** for practical workbook performance.

### Common Failure Modes

**`#SPILL!`**

Usually indicates that cells within a dynamic-array spill range contain blocking content.

**Fix:** clear the obstructing cells and allow the formula to spill.

---

**Dashboard reports link errors**

Usually indicates an unregistered product, missing recipe detail, or missing material price.

**Fix:** use the Dashboard link-error count to locate the affected transaction or product, then repair the upstream relationship.

---

**Ingredient price changes but product cost appears unchanged**

The source architecture identifies mismatched IDs as a likely cause.

**Fix:** verify that the `Item_ID` used by the Recipe Engine exactly matches the corresponding `Ingredient_ID` or `Packaging_ID` in the master table.

### Recommended Daily Operating Sequence

```text
1. Maintain master data
        ↓
2. Record sales / purchasing / losses / payroll / finance
        ↓
3. Review Dashboard
        ↓
4. Check Link Error Count
        ↓
5. Resolve broken upstream relationships
        ↓
6. Review profitability, inventory, cash and KPIs
```

The operating principle is simple: **fix the data chain before acting on the KPI.**

</details>

## Other Tools in This Series

A growing collection of lightweight Excel and browser-based decision-support tools for operational problems such as inventory reconciliation, profitability analysis, cost control, workforce planning, and business reporting.

Explore the related projects through the repository or the associated product collection.

## License

This project is released under the **Apache License 2.0**.

You may use, modify, distribute, and adapt the project in accordance with the terms of the Apache License 2.0.

See the repository license file for the complete license text.

---

**End of README**
