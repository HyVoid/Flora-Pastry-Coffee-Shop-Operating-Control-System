[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Sistema de Control de Operaciones para Pastelerías y Cafeterías Flora

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-brightgreen.svg)
![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-orange.svg)

**Registra ventas, rentabilidad por producto, exposición de inventario, costo de mano de obra, flujo de caja e integridad de datos en un único libro de trabajo operativo ligero — gratis en el navegador, con una versión Excel para un control más profundo.**

**Sin registro. Sin instalación. Gratis en tu navegador.**

Prueba la versión de navegador gratis. Si necesitas la versión Excel, puedes comprarla con una garantía de devolución de 30 días sin preguntas.
>
> 🌐 **Abrir en el navegador** → [demostración HTML en vivo](https://hyvoid.github.io/Flora-Pastry-Coffee-Shop-Operating-Control-System/)
>
> 📥 **Descargar Excel** → [versión Excel / enlace de compra]()


## Lo Que Te Ayuda a Registrar

* **Rendimiento de ventas** — ingresos diarios, semanales, mensuales y anuales sin tener que reconstruir informes separados.
* **Rentabilidad real por producto** — costo BOM a nivel de producto, beneficio bruto, porcentaje de costo de alimento y margen según los precios actuales de ingredientes y envases.
* **Cambios de costos que fluyen hacia las decisiones** — un cambio en el precio de un ingrediente o envase afecta inmediatamente el costo de la receta y la rentabilidad posterior.
* **Exposición de inventario** — cantidades actuales, valor del stock, consumo, pérdidas y advertencias de stock bajo.
* **Caja y presión operativa** — movimiento de caja, gastos operativos, nómina y beneficio neto resultante en la misma vista de gestión.
* **Problemas de integridad de datos** — las recetas faltantes, productos no registrados o precios de material ausentes se muestran en superficie en lugar de producir silenciosamente cifras de beneficio engañosas.

## Flujo de Trabajo de Inicio Rápido

1. **Define los parámetros clave.**
   Abre `02_Settings_Control` y establece los supuestos operativos utilizados en todo el libro de trabajo, como la moneda, la tasa impositiva, el margen objetivo, el multiplicador de horas extra y el colchón de seguridad de inventario. Estos parámetros se mantienen de forma centralizada en lugar de estar incrustados en cada cálculo individual.

2. **Carga los datos operativos.**
   Mantén los datos maestros de ingredientes y envases, las recetas de productos, las transacciones de ventas, los registros de compras, los movimientos de inventario, las horas de los empleados y las transacciones de flujo de caja en sus hojas designadas. La información existente puede transferirse desde exportaciones contables u otras hojas de cálculo a las áreas de entrada correspondientes.

3. **Obtén el panorama operativo.**
   Abre `01_Dashboard`. Las ventas, el beneficio bruto, los gastos operativos, el beneficio neto, la posición de caja, las advertencias de inventario y las excepciones de enlace de datos se calculan a partir de los registros subyacentes.

4. **Actualiza periódicamente.**
   Continúa añadiendo nuevas transacciones y actualizando los datos maestros que cambian. Los parámetros globales pueden modificarse de forma centralizada cuando cambian los supuestos del negocio. El libro de trabajo se recalcula sin necesidad de reconstruir la estructura de informes.

**Define unos pocos parámetros clave. Introduce los datos operativos. Obtén el análisis. Actualiza cuando lo necesites.**

## Por Qué Lo Construí

Una pastelería y cafetería puede parecer rentable mientras los números subyacentes son incorrectos.

El problema no siempre es una mala decisión de negocio. A menudo, la decisión se basa en un número que se ha desconectado silenciosamente de la operación.

Por ejemplo, una receta puede usar un ingrediente cuyo precio de compra ha aumentado. Si el costo de la receta no se actualiza, el margen reportado del producto sigue siendo artificialmente alto. El mismo problema aparece cuando un producto se vende antes de que su BOM haya sido registrado: un costo faltante puede convertirse en un cero numérico, haciendo que el producto parezca tener un margen inusualmente fuerte.

Ese es el fallo que este libro de trabajo está diseñado para prevenir.

En lugar de tratar la rentabilidad como un informe estático, el modelo conecta la cadena operativa:

**Costo de Ingrediente / Envase → Costo de Receta → Beneficio Bruto de Ventas → Consumo de Inventario → Gastos Operativos → Beneficio Neto → Posición de Caja**

También separa los **valores de cálculo** del **estado de diagnóstico**. Un costo faltante puede devolver `0` de forma segura para la aritmética posterior, mientras que un campo `Link_Status` independiente identifica la relación ausente.

La diferencia práctica es significativa.

**Antes:**
Un producto con una receta faltante puede parecer que tiene un costo BOM de cero y, por tanto, un margen bruto aparentemente excelente.

**Después:**
El mismo producto se marca como `🚨 Unregistered Product` o `🚨 Missing Recipe Detail`, permitiendo que la rentabilidad reportada se trate como incompleta en lugar de como evidencia de un rendimiento fuerte.

Esto no pretende reemplazar el software de contabilidad. Es un marco de razonamiento reutilizable y productizado para conectar los números operativos que influyen en las decisiones cotidianas.

## Problemas Comunes de Pastelerías y Cafeterías Que Esto Resuelve

| Problema                                                    | Sin Esta Herramienta                                                                         | Con Esta Herramienta                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Los precios de los ingredientes cambian                    | Los márgenes de producto quedan obsoletos hasta que alguien reconstruye manualmente el costeo | Los costos actuales de ingredientes fluyen hacia los costos BOM de receta y los márgenes de producto |
| Una receta está incompleta                                 | Los costos faltantes pueden aparecer como cero y crear una rentabilidad falsa              | `Link_Status` identifica los detalles de receta faltantes antes de que se conviertan en una conclusión de gestión |
| Las ventas se registran separadas del costeo               | Los ingresos son visibles, pero el beneficio bruto por producto requiere conciliación manual | Las transacciones de ventas se conectan automáticamente a los costos BOM actuales |
| El inventario está desconectado de las ventas              | Los niveles de stock requieren cálculos separados y estimaciones manuales de consumo       | Las cantidades vendidas y el uso de recetas impulsan el consumo de material y las advertencias de stock |
| La mano de obra y los gastos operativos quedan fuera del informe de producto | El beneficio bruto puede parecer saludable mientras la nómina y los costos operativos erosionan el resultado del negocio | La nómina y los gastos operativos alimentan la vista de beneficio neto |
| La caja parece saludable mientras las obligaciones se acumulan | El movimiento de caja y las obligaciones de compra impagadas son difíciles de conciliar operativamente | Las transacciones de flujo de caja y los registros de compras/cuentas por pagar proporcionan una vista operativa combinada |

## Para Quién Es

Este conjunto de herramientas está diseñado para **pequeñas pastelerías, panaderías, cafeterías y negocios de alimentos gestionados por sus dueños** que necesitan más control operativo del que proporciona una hoja de cálculo de ventas básica, pero que no necesitan una implementación ERP empresarial completa.

Es particularmente útil cuando los precios de los ingredientes cambian con frecuencia, las recetas determinan la economía del producto, el inventario necesita monitoreo activo y el dueño necesita un solo lugar para entender **ventas → costo → beneficio → inventario → nómina → caja**.

No está diseñado para reemplazar un sistema contable legal, una plataforma de cumplimiento de nómina, un POS o un ERP empresarial.

**No se necesita experiencia en hojas de cálculo. Abre la versión de navegador y empieza a registrar inmediatamente.** La versión Excel está disponible cuando se requiere un control y una personalización más profundos a nivel de libro de trabajo.

## Acerca de

Construyo rastreadores operativos ligeros y herramientas de apoyo a la decisión para situaciones en las que hay demasiadas piezas en movimiento para tenerlas en la cabeza, pero un sistema empresarial completo añadiría una complejidad innecesaria.

La pregunta central es simple:

> **¿Qué información necesita estar en un solo lugar para tomar la próxima decisión con confianza?**

Flora es un ejemplo de ese enfoque. En lugar de construir un panel genérico, el libro de trabajo conecta las relaciones operativas específicas que determinan si el rendimiento reportado de una pastelería y cafetería puede realmente ser confiable.

### Detalles Técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

### Arquitectura del Libro de Trabajo

Flora está estructurado como un libro de trabajo operativo de tres capas:

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

| Capa          | Hoja                     | Responsabilidad Principal                                                             |
| ------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| Presentación  | `01_Dashboard`            | Ingresos, beneficio bruto, beneficio neto, caja, advertencias de inventario y salud de enlaces de datos |
| Control       | `02_Settings_Control`     | Supuestos y parámetros operativos centrales                                       |
| Datos Maestros| `03_Ingredient_Master`    | IDs de ingrediente, unidades, costos actuales, proveedores, stock mínimo           |
| Datos Maestros| `04_Packaging_Master`     | IDs de envase, unidades, costos actuales, proveedores                             |
| Cálculo       | `05_Recipe_Engine`        | Detalle BOM, costos de material en vivo, costo de producto, margen, diagnósticos de enlace de receta |
| Transacciones | `06_Sales_Transactions`   | Actividad de ventas, ingresos, costo BOM, beneficio bruto, impuestos, diagnósticos de enlace de producto |
| Inventario    | `07_Inventory_Movement`   | Stock inicial, compras, consumo por ventas, pérdidas, cantidad actual, valor de stock |
| Compras       | `08_Suppliers_Purchasing` | Órdenes de compra, transacciones con proveedores, estado de pago, saldo de cuentas por pagar |
| Mano de obra  | `09_Payroll_Employees`    | Horas regulares, horas extra, bonificaciones, penalizaciones, costo de nómina      |
| Finanzas      | `10_Finance_CashFlow`     | Ingresos, gastos, movimiento de cuentas, impacto neto en caja                     |

La dirección de dependencia prevista es:

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

Esto crea la cadena operativa central:

**Costo de Ingrediente / Envase → Costo de Receta → Beneficio Bruto de Ventas → Consumo de Inventario → Gastos Operativos → Beneficio Neto → Posición de Caja**

La arquitectura también distingue entre **salidas de cálculo** y **salidas de diagnóstico**. Los cálculos numéricos pueden usar `0` como valor posterior seguro cuando una búsqueda falla, mientras que `Link_Status` expone el problema de datos subyacente a la gestión.

### Tres Trampas que Atrapan Incluso a Operadores Experimentados

#### Trampa 1 — Una Receta Faltante Parece un Producto de Margen Alto

**1. Se tomó una decisión.**
Un producto parece tener un margen bruto inusualmente alto, por lo que la gestión considera mantener su precio de venta actual y priorizar el producto.

**2. La decisión se basó en un número defectuoso.**
El producto no tiene un detalle de receta completo, por lo que su costo BOM se resuelve como `0`.

**3. El defecto cambia la recomendación.**
Un precio de venta de `$8.00` con un costo BOM reportado de `$0.00` produce un margen bruto reportado de `100%`.

**4. Por qué el razonamiento es incorrecto.**
El número no representa un producto real de costo cero. Representa datos de costeo incompletos.

**5. Enfoque corregido.**
Mantén el valor numérico de reserva seguro para los cálculos posteriores, pero diagnostica de forma independiente si existe una receta válida.

**6. Resultado de la decisión corregida.**
El producto se marca como `🚨 Missing Recipe Detail` en lugar de tratarse como un producto de margen del 100%.

**7. Lógica de la fórmula:**

<details>
<summary>Diagnóstico de estado de enlace de receta</summary>

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

El control importante no es el valor de reserva `0` en sí mismo. Es el estado de diagnóstico independiente que evita que el valor de reserva se confunda con la realidad del negocio.

</details>

---

#### Trampa 2 — Un Cambio de Costo No Se Refleja en la Economía del Producto

**1. Se tomó una decisión.**
La gestión revisa los márgenes de producto y decide que los precios actuales siguen siendo aceptables.

**2. La decisión se basó en un supuesto defectuoso inadvertido.**
El maestro de ingredientes todavía contiene un costo de compra obsoleto.

**3. El defecto cambia la recomendación.**
El costo BOM reportado es menor que la realidad de compra actual, por lo que el margen reportado está sobrestimado.

**4. Por qué el razonamiento es incorrecto.**
Para un negocio impulsado por recetas, el costo actual del material es una entrada directa a la economía del producto. Un costo obsoleto produce un margen obsoleto.

**5. Enfoque corregido.**
Mantén los costos actuales de ingredientes y envases en las tablas maestras y deja que el Recipe Engine recupere esos valores dinámicamente.

**6. Resultado de la decisión corregida.**
Un costo de ingrediente modificado fluye hacia el costo de línea de receta, el costo BOM total, el porcentaje de costo de alimento y el porcentaje de margen sin reconstruir manualmente el cálculo de cada producto.

**7. Lógica de la fórmula:**

<details>
<summary>Recuperación de costo de material en vivo</summary>

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

La receta no almacena un precio de material histórico desconectado como su fuente principal de costeo. Recupera el costo actual de los datos maestros.

</details>

---

#### Trampa 3 — Los Ingresos Son Correctos pero la Rentabilidad No

**1. Se tomó una decisión.**
Los ingresos por ventas están aumentando, por lo que la gestión interpreta la tendencia como evidencia de que el negocio se está volviendo más rentable.

**2. La decisión se basó en una métrica incompleta.**
Los ingresos por sí solos no tienen en cuenta el costo BOM, la nómina, los gastos operativos ni el movimiento de caja.

**3. El defecto cambia la recomendación.**
Una línea de ventas creciente puede coexistir con un margen bruto en declive, un gasto de nómina creciente o una disponibilidad de caja deteriorada.

**4. Por qué el razonamiento es incorrecto.**
El crecimiento de la línea superior responde cuánto se vendió. No responde cuánto valor queda después de los costos operativos.

**5. Enfoque corregido.**
Evalúa la secuencia enlazada de ingresos, costo BOM, beneficio bruto, gastos operativos, nómina, beneficio neto y flujo de caja.

**6. Resultado de la decisión corregida.**
La gestión puede distinguir el crecimiento de ventas de la mejora operativa real e identificar si la restricción está en el precio, el costo del material, la mano de obra, los gastos o la liquidez.

**7. Lógica de la fórmula:**

<details>
<summary>Beneficio neto operativo</summary>

```excel
=Gross_Profit - Total_Operating_Expenses
```

En la arquitectura del Dashboard, los gastos operativos combinan las transacciones de Finanzas clasificadas como `Expense` con los totales de nómina.

</details>

### Escenario de Ejemplo

Considera un pastel con un precio de **$8.00**.

Su receta contiene ingredientes y envases con un costo BOM actual combinado de **$2.80**.

La economía del producto es por tanto:

| Métrica               | Valor |
| --------------------- | ----: |
| Precio de Venta       | $8.00 |
| Costo BOM             | $2.80 |
| Beneficio Bruto / Unidad | $5.20 |
| Costo de Alimento %   | 35.0% |
| Margen Bruto %        | 65.0% |

Si el margen objetivo en `02_Settings_Control` es **65%**, el producto alcanza exactamente el objetivo.

Ahora supongamos que el maestro de ingredientes actual se actualiza y el costo BOM en vivo de la receta sube a **$3.20**.

El modelo cambia la economía a:

| Métrica               |      Anterior |        Actualizado |
| --------------------- | -------------: | --------------: |
| Precio de Venta       |          $8.00 |           $8.00 |
| Costo BOM             |          $2.80 |           $3.20 |
| Beneficio Bruto / Unidad |          $5.20 |           $4.80 |
| Costo de Alimento %   |          35.0% |           40.0% |
| Margen Bruto %        |          65.0% |           60.0% |
| Estado del Objetivo   | ✅ Cumple el Objetivo | ⚠️ Por Debajo del Objetivo |

La interpretación operativa es más útil que simplemente observar que "los costos de los ingredientes aumentaron".

El producto ha pasado de un **margen del 65% en el objetivo** a un **margen del 60% por debajo del objetivo**. Si el precio no cambia, cada unidad adicional vendida contribuye con menos beneficio bruto del que se suponía anteriormente.

La decisión por tanto ya no es "las ventas son saludables, mantén los precios sin cambios". La pregunta relevante pasa a ser si el negocio debería **subir el precio, reformular la receta, negociar el costo del material, aceptar el margen más bajo o reconsiderar el rol del producto**.

El mismo modelo luego lleva el producto a las transacciones de ventas, donde la cantidad realmente vendida determina los ingresos totales y el consumo BOM total. El uso de la receta también puede alimentar el consumo de inventario, mientras que las transacciones de nómina y finanzas afectan el resultado operativo más amplio.

Este es el uso previsto del libro de trabajo: no meramente calcular números aislados, sino conectar los números para que un cambio en un supuesto operativo pueda evaluarse frente a la decisión de negocio resultante.

### Referencia de Fórmulas

<details>
<summary>02_Settings_Control — Parámetros Centrales</summary>

Los supuestos globales se mantienen de forma centralizada en lugar de estar incrustados como valores codificados en todo el libro de trabajo.

Algunos ejemplos incluyen:

| Parámetro                | Ejemplo |
| ------------------------ | ------: |
| Moneda                   |     `$` |
| Tasa Impositiva          |  `5.0%` |
| Margen Objetivo          | `65.0%` |
| Multiplicador de Horas Extra |  `1.50` |
| Colchón de Seguridad de Inventario | `20.0%` |

Referencia de parámetro de ejemplo:

```excel
='02_Settings_Control'!$B$4
```

Esto permite que el margen objetivo cambie una vez y se propague por los cálculos relevantes.

</details>

<details>
<summary>05_Recipe_Engine — Costo y Margen del Producto</summary>

**Costo BOM Total**

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

Esto agrega los costos de línea de receta por `Product_ID`.

**Beneficio Bruto, Costo de Alimento %, Margen %, Estado del Objetivo, Estado de Enlace**

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

La capa de cálculo separa deliberadamente las salidas numéricas de los estados de diagnóstico. Esto evita que un valor de reserva de búsqueda se interprete como prueba de costo cero.

</details>

<details>
<summary>06_Sales_Transactions — Ingresos y Beneficio por Transacción</summary>

**Costo BOM Unitario**

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

**Salidas a nivel de transacción**

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

La capa de transacción conecta por tanto la cantidad de venta real y el precio de venta real con el modelo de costeo de producto actual.

</details>

<details>
<summary>07_Inventory_Movement — Consumo y Posición de Stock</summary>

**Cantidad Actual**

```excel
Current Qty =
Opening Qty + In Qty - Out Qty - Loss Qty
```

**Estado del Stock**

```excel
=IF(Current_Qty<=Min_Stock,"🚨 Reorder Alert","✅ Normal")
```

**Valor del Stock**

```excel
=Current_Qty*Live_Unit_Cost
```

El inventario se trata por tanto como una exposición operativa en lugar de solo una lista de cantidades: el stock actual puede evaluarse frente a los niveles mínimos y la base de costo actual.

</details>

<details>
<summary>08_Suppliers_Purchasing — Lógica de Compra y Cuentas por Pagar</summary>

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

`Total_PO_Amount` se calcula a partir de la cantidad y el precio unitario. `AP_Balance` incluye el valor de la orden cuando el estado de pago es `Unpaid`.

</details>

<details>
<summary>09_Payroll_Employees — Costo de Mano de Obra</summary>

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

El modelo mantiene los supuestos de horas extra centralizados y calcula la nómina total a partir de las horas regulares, las horas extra, las bonificaciones y las penalizaciones.

</details>

<details>
<summary>10_Finance_CashFlow — Impacto en Caja</summary>

```excel
=LET(
    types,FILTER(D2:D10000,A2:A10000<>""),
    amounts,FILTER(E2:E10000,A2:A10000<>""),
    IF(types="Income",amounts,-amounts)
)
```

Los ingresos se representan como impacto positivo en caja; los gastos se representan como impacto negativo en caja.

</details>

<details>
<summary>01_Dashboard — KPIs de Gestión</summary>

**Ingresos Totales por Ventas**

```excel
=SUM('06_Sales_Transactions'!G2:G10000)
```

**Beneficio Bruto Total**

```excel
=SUM('06_Sales_Transactions'!I2:I10000)
```

**Margen Bruto**

```excel
=IF(B3>0,D3/B3,0)
```

**Gastos Operativos**

```excel
=SUMIFS(
    '10_Finance_CashFlow'!E2:E10000,
    '10_Finance_CashFlow'!D2:D10000,
    "Expense"
)
+SUM('09_Payroll_Employees'!I2:I10000)
```

**Beneficio Neto**

```excel
=Gross_Profit-Operating_Expenses
```

**Saldo de Caja**

```excel
=SUM('10_Finance_CashFlow'!G2:G10000)
```

**Cantidad de Advertencias de Inventario**

```excel
=COUNTIF(
    '07_Inventory_Movement'!J2:J10000,
    "🚨 Reorder Alert"
)
```

**Cantidad de Errores de Enlace**

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

El Dashboard combina por tanto el rendimiento del negocio con diagnósticos de calidad de datos en lugar de presentar métricas de rentabilidad sin verificar si sus datos ascendentes están completos.

</details>

<!-- Technical Details parent <details> intentionally remains OPEN for Part 3. -->
### Reglas de Validación

El libro de trabajo utiliza validación tanto a nivel de **cálculo** como a nivel de **lógica de negocio**. Un valor de reserva numérico como `0` evita que las fórmulas posteriores se rompan, mientras que un campo de diagnóstico independiente identifica si la relación subyacente es realmente válida.

| Campo / Área                   | Regla                                                                                          | Comportamiento ante Errores                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Param_Value`                  | Los parámetros globales deben contener valores compatibles con su significado de negocio previsto | Los cálculos posteriores pueden volverse incorrectos si se introducen valores no válidos; se requiere revisión de parámetros |
| `Ingredient_ID`                | Debe identificar de forma única un ingrediente y coincidir con las referencias de receta       | Una búsqueda fallida devuelve `0` para fines de cálculo                                                       |
| `Current_Cost`                 | Debe contener el costo de compra actual del ingrediente                                       | Un costo faltante produce `⚠️ Material Cost Not Set` en los diagnósticos de receta                            |
| `Packaging_ID`                 | Debe identificar de forma única el material de envase y coincidir con las referencias de receta | Una búsqueda fallida devuelve `0` para fines de cálculo                                                       |
| `Unit_Cost`                    | Debe contener el costo actual del envase                                                       | Un costo faltante puede resultar en un costeo de producto incompleto                                          |
| `Product_ID`                   | Las transacciones de ventas deben corresponder a un producto registrado en el Recipe Engine    | `🚨 Unregistered Product`                                                                                |
| Detalle de receta              | Cada producto debe tener al menos una línea de receta asociada                                 | `🚨 Missing Recipe Detail`                                                                               |
| Costo de material de receta    | Los artículos de receta deben resolverse a un costo válido de ingrediente o envase             | `⚠️ Material Cost Not Set`                                                                                 |
| Precio de venta                | Debe ser mayor que cero para cálculos de margen significativos                                 | El Costo de Alimento % y el Margen % devuelven `0` cuando el precio no es positivo                           |
| Margen objetivo                | El margen del producto se compara con el objetivo centralizado en `02_Settings_Control`        | `⚠️ Below Target` cuando el margen está por debajo del umbral configurado                                     |
| Cantidad de ventas             | Debe representar la cantidad realmente vendida                                                 | Las cantidades incorrectas afectan directamente los ingresos, el costo, el beneficio y el consumo de inventario |
| Cantidad inicial de inventario | Debe representar la posición de stock inicial real                                            | Una cantidad inicial incorrecta se propaga al stock actual                                                    |
| Cantidad de pérdidas de inventario | Se usa para desperdicio, deterioro, vencimiento y pérdidas por conteo de stock             | Los valores de pérdida incorrectos distorsionan el inventario actual                                          |
| Stock mínimo                   | Define el umbral de reorden                                                                    | `🚨 Reorder Alert` cuando la cantidad actual está en o por debajo del stock mínimo                            |
| Cantidad de compra / precio unitario | Ambos son necesarios para un valor de OC significativo                                    | Los valores incorrectos distorsionan los totales de compras y cuentas por pagar                               |
| Estado de pago                 | `Unpaid` determina si el valor de la OC contribuye al saldo de cuentas por pagar               | Un estado distinto de `Unpaid` se trata como no pendiente                                                     |
| Horas / tarifa del empleado    | Las horas regulares y las horas extra se multiplican por las tarifas relevantes                 | Las entradas incorrectas afectan directamente el costo de nómina                                              |
| Tipo de transacción financiera | `Income` es positivo; otras transacciones de gasto registradas se tratan como impacto negativo en caja | Una clasificación incorrecta de transacciones cambia la interpretación del flujo de caja              |
| Área de salida de matriz dinámica | Los rangos de desbordamiento de fórmulas deben permanecer libres de obstrucciones          | Excel devuelve `#SPILL!`                                                                                  |
| Diagnósticos de enlace del Dashboard | Los errores de enlace de ventas y recetas deben revisarse antes de confiar en las métricas de rentabilidad | El Dashboard informa la cantidad de excepciones de enlace                                                  |

### Flujo de Validación Operativa

El modelo de validación sigue la misma dirección de dependencia que el modelo de negocio:

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

Un principio crítico es que **la validez de cálculo y la validez de negocio no son lo mismo**.

Por ejemplo:

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

Esto evita que un cálculo de Excel técnicamente válido se confunda con una conclusión de negocio válida.

### Verificaciones de Integridad entre Tablas

El libro de trabajo contiene varias dependencias de múltiples saltos que requieren verificación explícita.

#### Ventas → Receta → Maestro de Materiales

```text
06_Sales_Transactions
        ↓ Product_ID
05_Recipe_Engine
        ↓ Item_ID
03_Ingredient_Master / 04_Packaging_Master
```

Una relación faltante en cualquier punto puede afectar el costo de producto reportado.

#### Ventas → Receta → Inventario

```text
06_Sales_Transactions
        ↓ Product_ID + Qty_Sold
05_Recipe_Engine
        ↓ Item_ID + Usage_Qty
07_Inventory_Movement
```

Esta relación convierte las ventas de producto en consumo de material.

#### Compras → Inventario / Cuentas por Pagar

```text
08_Suppliers_Purchasing
        ├── Purchase Quantity
        ├── Unit Price
        └── Payment Status
                 ↓
        PO Amount / AP Balance
```

La arquitectura separa por tanto las cantidades operativas de las obligaciones financieras manteniendo su relación.

### Reglas Operativas de Mantenimiento Cero

El libro de trabajo está diseñado en torno a fórmulas de matriz dinámica y parámetros centralizados.

1. **No copies fórmulas manualmente hacia abajo.**
   Los nuevos registros deben introducirse en las áreas de entrada designadas.

2. **No sobrescribas las celdas generadas por fórmulas.**
   Los rangos de salida de matriz dinámica deben permanecer libres.

3. **Mantén los datos maestros antes que los datos transaccionales.**
   Las relaciones de ingredientes, envases y recetas deben existir antes de que las ventas relacionadas se utilicen para el análisis de rentabilidad.

4. **Cambia los supuestos globales de forma centralizada.**
   La tasa impositiva, el margen objetivo, el multiplicador de horas extra y el colchón de seguridad se mantienen a través de `02_Settings_Control`.

5. **Revisa los diagnósticos antes de interpretar los KPIs.**
   Un dashboard que muestra ingresos y beneficio no significa automáticamente que todos los cálculos subyacentes estén completos.

### Compatibilidad con Excel

La arquitectura de origen se basa en funciones modernas de Excel, incluyendo:

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

La implementación apunta por tanto a **Microsoft 365 y Excel 2021 o posterior**, con funcionalidad de matrices dinámicas disponible.

La arquitectura recomienda mantener las tablas individuales por debajo de aproximadamente **100.000 filas** para un rendimiento práctico del libro de trabajo.

### Modos de Fallo Comunes

**`#SPILL!`**

Normalmente indica que las celdas dentro de un rango de desbordamiento de matriz dinámica contienen contenido obstructivo.

**Solución:** limpia las celdas obstructivas y permite que la fórmula se desborde.

---

**El Dashboard informa errores de enlace**

Normalmente indica un producto no registrado, un detalle de receta faltante o un precio de material ausente.

**Solución:** usa la cantidad de errores de enlace del Dashboard para localizar la transacción o el producto afectado, y luego repara la relación ascendente.

---

**El precio del ingrediente cambia pero el costo del producto parece sin cambios**

La arquitectura de origen identifica los IDs no coincidentes como una causa probable.

**Solución:** verifica que el `Item_ID` utilizado por el Recipe Engine coincida exactamente con el `Ingredient_ID` o `Packaging_ID` correspondiente en la tabla maestra.

### Secuencia Operativa Diaria Recomendada

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

El principio operativo es simple: **corrige la cadena de datos antes de actuar sobre el KPI.**

</details>

## Otras Herramientas de Esta Serie

Una colección creciente de herramientas ligeras de apoyo a la decisión basadas en Excel y navegador para problemas operativos como conciliación de inventario, análisis de rentabilidad, control de costos, planificación de plantilla e informes de negocio.

Explora los proyectos relacionados a través del repositorio o la colección de productos asociada.

## Licencia

Este proyecto se publica bajo la **Apache License 2.0**.

Puedes usar, modificar, distribuir y adaptar el proyecto de acuerdo con los términos de la Apache License 2.0.

Consulta el archivo de licencia del repositorio para el texto completo de la licencia.

---

**Fin del README**
