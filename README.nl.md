[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Flora Pastry & Coffee Shop Operations Control System

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-brightgreen.svg)
![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-orange.svg)

**Volg omzet, productrentabiliteit, voorraadexposure, arbeidskosten, cashflow en gegevensintegriteit in één licht operationeel werkboek — gratis in de browser, met een Excel-versie voor diepere controle.**

**Geen registratie. Geen installatie. Gratis in je browser.**

Probeer de browserversie gratis. Als je de Excel-versie nodig hebt, kun je die kopen met een 30-dagen geld-terug-garantie zonder vragen.
>
> 🌐 **Openen in browser** → [HTML-livedemo](https://hyvoid.github.io/Flora-Pastry-Coffee-Shop-Operating-Control-System/)
>
> 📥 **Excel downloaden** → [Excel-versie / aankooplink]()


## Wat je hiermee kunt volgen

* **Omzetprestaties** — dagelijkse, wekelijkse, maandelijkse en jaarlijkse inkomsten zonder aparte rapporten opnieuw op te bouwen.
* **Echte productrentabiliteit** — BOM-kosten op productniveau, brutowinst, foodcostpercentage en marge na huidige ingrediënt- en verpakkingsprijzen.
* **Kostenwijzigingen die in beslissingen doordringen** — een gewijzigde ingrediënt- of verpakkingsprijs beïnvloedt direct receptkosten en downstream rentabiliteit.
* **Voorraadexposure** — huidige hoeveelheden, voorraadwaarde, verbruik, verliezen en waarschuwingen voor lage voorraad.
* **Cash en bedrijfsdruk** — geldbewegingen, bedrijfskosten, loonstrook en resulterende nettowinst in dezelfde managementweergave.
* **Problemen met gegevensintegriteit** — ontbrekende recepten, niet-geregistreerde producten of ontbrekende materiaalprijzen worden zichtbaar gemaakt in plaats van stilzwijgend misleidende winstcijfers te produceren.

## Snelstartworkflow

1. **Stel de sleutelparameters in.**
   Open `02_Settings_Control` en stel de bedrijfsaannames vast die werkboekbreed worden gebruikt, zoals valuta, belastingtarief, doelmarge, overuurmultiplicator en voorraadveiligheidsbuffer. Deze parameters worden centraal onderhouden in plaats van ingebed in individuele berekeningen.

2. **Laad de bedrijfsgegevens.**
   Onderhoud ingrediënt- en verpakkingsstamgegevens, productrecepten, verkooptransacties, inkoopregistraties, voorraadbewegingen, werknemersuren en cashflowtransacties in hun aangewezen bladen. Bestaande informatie kan vanuit boekhoudingsexports of andere spreadsheets naar de overeenkomstige invoervelden worden overgezet.

3. **Krijg het bedrijfsbeeld.**
   Open `01_Dashboard`. Omzet, brutowinst, bedrijfskosten, nettowinst, cashpositie, voorraadwaarschuwingen en gegevenskoppelingsuitzonderingen worden berekend uit de onderliggende records.

4. **Vernieuw periodiek.**
   Blijf nieuwe transacties toevoegen en veranderende stamgegevens bijwerken. Globale parameters kunnen centraal worden gewijzigd wanneer bedrijfsaannames veranderen. Het werkboek herberekent zonder de rapportagestructuur opnieuw op te bouwen.

**Stel een paar sleutelparameters in. Gooi de bedrijfsgegevens erin. Krijg de analyse. Vernieuw wanneer nodig.**

## Waarom ik dit heb gebouwd

Een banketbakkerij en koffiezaak kunnen winstgevend lijken terwijl de onderliggende cijfers fout zijn.

Het probleem is niet altijd een slechte zakelijke beslissing. Vaak baseert de beslissing zich op een cijfer dat stil van de bedrijfsvoering is losgeraakt.

Een recept kan bijvoorbeeld een ingrediënt gebruiken waarvan de inkoopprijs is gestegen. Als de receptkosten niet worden vernieuwd, blijft de gerapporteerde productmarge kunstmatig hoog. Hetzelfde probleem treedt op wanneer een product wordt verkocht voordat zijn BOM is geregistreerd: een ontbrekende kostenpost kan een numerieke nul worden, waardoor het product een ongewoon sterke marge lijkt te hebben.

Dat is de mislukking die dit werkboek is ontworpen om te voorkomen.

In plaats van rentabiliteit als een statisch rapport te behandelen, verbindt het model de bedrijfsketen:

**Ingrediënt-/verpakkingskosten → Receptkosten → Verkoop-brutowinst → Voorraadverbruik → Bedrijfskosten → Nettowinst → Cashpositie**

Het scheidt ook **berekeningswaarden** van **diagnosestatus**. Een ontbrekende kostenpost kan veilig `0` retourneren voor downstream rekenwerk, terwijl een apart `Link_Status`-veld de ontbrekende relatie identificeert.

Het praktische verschil is significant.

**Voor:**
Een product met een ontbrekend recept kan nul BOM-kosten lijken te hebben en daardoor een schijnbaar uitstekende brutomarge.

**Na:**
Hetzelfde product wordt gemarkeerd als `🚨 Unregistered Product` of `🚨 Missing Recipe Detail`, waardoor de gerapporteerde rentabiliteit als onvolledig kan worden behandeld in plaats van als bewijs van sterke prestaties.

Dit is niet bedoeld om boekhoudsoftware te vervangen. Het is een herbruikbaar, geproduceerd redeneerkader voor het verbinden van de bedrijfscijfers die alledaagse beslissingen beïnvloeden.

## Veelvoorkomende banketbakkerij- en koffiezaakproblemen die dit oplost

| Probleem                                                    | Zonder deze tool                                                                         | Met deze tool                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Ingrediëntprijzen veranderen                                       | Productmarges worden verouderd tot iemand de kostenberekening handmatig opnieuw opbouwt                      | Huidige ingrediëntkosten stromen in recept-BOM-kosten en productmarges                    |
| Een recept is onvolledig                                           | Ontbrekende kosten kunnen als nul verschijnen en valse rentabiliteit creëren                           | `Link_Status` identificeert ontbrekende receptdetails voordat ze een managementconclusie worden |
| Verkopen worden apart van kostenberekening vastgelegd                 | Omzet is zichtbaar, maar brutowinst op productniveau vereist handmatige afstemming         | Verkooptransacties koppelen automatisch aan huidige BOM-kosten                              |
| Voorraad is losgekoppeld van verkopen                                               | Voorraadniveaus vereisen aparte berekeningen en handmatige verbruiksschattingen               | Verkoopthoeveelheden en receptgebruik drijven materiaalverbruik en voorraadwaarschuwingen                    |
| Arbeid en bedrijfskosten zitten buiten productrapportage | Brutowinst kan gezond lijken terwijl loonstrook en bedrijfskosten het bedrijfsresultaat uithollen | Loonstrook en bedrijfskosten voeden de nettowinstweergave                                    |
| Cash ziet er gezond uit terwijl verplichtingen zich opstapelen            | Geldbewegingen en onbetaalde inkoopverplichtingen zijn operationeel moeilijk af te stemmen  | Cashflowtransacties en inkoop-/AP-registraties bieden een gecombineerde bedrijfsweergave         |

## Voor wie dit is

Deze toolkit is ontworpen voor **kleine banketbakkerijen, bakkerijen, koffiezaken en door eigenaren gerunde voedselbedrijven** die meer operationele controle nodig hebben dan een eenvoudig verkoopspreadsheet biedt, maar geen volledige enterprise-ERP-implementatie nodig hebben.

Het is bijzonder nuttig wanneer ingrediëntprijzen frequent bewegen, recepten de producteconomie bepalen, voorraad actieve monitoring nodig heeft, en de eigenaar één plek nodig heeft om **omzet → kosten → winst → voorraad → loonstrook → cash** te begrijpen.

Het is niet ontworpen om een wettelijk boekhoudsysteem, loonconformiteitsplatform, POS of enterprise-ERP te vervangen.

**Geen spreadsheetexpertise nodig. Open de browserversie en begin direct met volgen.** De Excel-versie is beschikbaar wanneer diepere controle en maatwerk op werkboekniveau vereist zijn.

## Over mij

Ik bouw lichtgewicht operationele trackers en beslissingsondersteunende tools voor situaties waarin er te veel bewegende delen zijn om in je hoofd te houden, maar een volledig enterprisesysteem onnodige complexiteit zou toevoegen.

De centrale vraag is simpel:

> **Welke informatie moet op één plek staan om de volgende beslissing met vertrouwen te nemen?**

Flora is één voorbeeld van die benadering. In plaats van een generiek dashboard te bouwen, verbindt het werkboek de specifieke operationele relaties die bepalen of de gerapporteerde prestaties van een banketbakkerij en koffiezaak werkelijk betrouwbaar kunnen zijn.

### Technische details

<details>
<summary>Voor technische reviewers, Excel-beoefenaars en medewerkers</summary>

### Werkboekarchitectuur

Flora is gestructureerd als een driedelig operationeel werkboek:

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

| Laag        | Blad                     | Primaire verantwoordelijkheid                                                             |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| Presentatie | `01_Dashboard`            | Omzet, brutowinst, nettowinst, cash, voorraadwaarschuwingen en gezondheid van gegevenskoppelingen  |
| Beheer      | `02_Settings_Control`     | Centrale bedrijfsaannames en parameters                                       |
| Stamgegevens  | `03_Ingredient_Master`    | Ingrediënt-ID's, eenheden, huidige kosten, leveranciers, minimumvoorraad                     |
| Stamgegevens  | `04_Packaging_Master`     | Verpakkings-ID's, eenheden, huidige kosten, leveranciers                                     |
| Berekening  | `05_Recipe_Engine`        | BOM-detail, actuele materiaalkosten, productkosten, marge, receptkoppelingsdiagnoses     |
| Transacties | `06_Sales_Transactions`   | Verkoopactiviteit, omzet, BOM-kosten, brutowinst, belasting, productkoppelingsdiagnoses     |
| Voorraad    | `07_Inventory_Movement`   | openingsvoorraad, inkopen, verkoopverbruik, verliezen, huidige hoeveelheid, voorraadwaarde |
| Inkoop   | `08_Suppliers_Purchasing` | Inkooporders, leverancierstransacties, betalingsstatus, AP-saldo                 |
| Arbeid        | `09_Payroll_Employees`    | Reguliere uren, overuur, bonussen, straffen, loonkosten                          |
| Financiën      | `10_Finance_CashFlow`     | Inkomsten, uitgaven, rekeningbeweging, netto cashimpact                                |

De beoogde afhankelijkheidsrichting is:

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

Dit creëert de centrale bedrijfsketen:

**Ingrediënt-/verpakkingskosten → Receptkosten → Verkoop-brutowinst → Voorraadverbruik → Bedrijfskosten → Nettowinst → Cashpositie**

De architectuur onderscheidt ook tussen **berekeningsoutputs** en **diagnose-outputs**. Numerieke berekeningen kunnen `0` gebruiken als veilige downstream waarde wanneer een zoekopdracht mislukt, terwijl `Link_Status` het onderliggende gegevensprobleem aan het management blootlegt.

### Drie valkuilen die zelfs ervaren operators vangen

#### Valkuil 1 — Een ontbrekend recept lijkt op een product met hoge marge

**1. Een beslissing is genomen.**
Een product lijkt een ongewoon hoge brutomarge te hebben, dus het management overweegt de huidige verkoopprijs te behouden en het product te prioriteren.

**2. De beslissing vertrouwde op een fout cijfer.**
Het product heeft geen volledig receptdetail, dus zijn BOM-kosten lossen op tot `0`.

**3. De fout verandert de aanbeveling.**
Een verkoopprijs van `$8.00` met gerapporteerde BOM-kosten van `$0.00` produceert een gerapporteerde brutomarge van `100%`.

**4. Waarom de redenering onjuist is.**
Het cijfer vertegenwoordigt geen echt nulkostenproduct. Het vertegenwoordigt onvolledige kostengegevens.

**5. Gecorrigeerde aanpak.**
Houd de numerieke fallback veilig voor downstream berekeningen, maar diagnosticeer onafhankelijk of een geldig recept bestaat.

**6. Gecorrigeerd besluitresultaat.**
Het product wordt gemarkeerd als `🚨 Missing Recipe Detail` in plaats van behandeld als een product met 100% marge.

**7. Formulelogica:**

<details>
<summary>Diagnose van receptkoppelingsstatus</summary>

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

De belangrijke controle is niet de fallback `0` zelf. Het is de separate diagnosestatus die voorkomt dat de fallback voor bedrijfsrealiteit wordt aangezien.

</details>

---

#### Valkuil 2 — Een kostenwijziging wordt niet weerspiegeld in producteconomie

**1. Een beslissing is genomen.**
Het management beoordeelt productmarges en besluit dat de huidige prijsstelling acceptabel blijft.

**2. De beslissing vertrouwde op een onopgemerkt foute aanname.**
De ingrediëntstam bevat nog een verouderde inkoopkostenpost.

**3. De fout verandert de aanbeveling.**
De gerapporteerde BOM-kosten zijn lager dan de huidige inkooprealiteit, dus de gerapporteerde marge is overdreven.

**4. Waarom de redenering onjuist is.**
In een receptgedreven business zijn actuele materiaalkosten een directe input voor producteconomie. Verouderde kosten produceren een verouderde marge.

**5. Gecorrigeerde aanpak.**
Onderhoud actuele ingrediënt- en verpakkingskosten in de stamtabellen en laat de Recipe Engine die waarden dynamisch ophalen.

**6. Gecorrigeerd besluitresultaat.**
Een gewijzigde ingrediëntkostenpost stroomt in receptregelkosten, totale BOM-kosten, foodcostpercentage en margepercentage zonder elke productberekening handmatig opnieuw op te bouwen.

**7. Formulelogica:**

<details>
<summary>Ophalen van actuele materiaalkosten</summary>

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

Het recept slaat geen losgekoppelde historische materiaalprijs op als primaire kostenbron. Het haalt de actuele stamgegevenskosten op.

</details>

---

#### Valkuil 3 — Omzet is correct maar rentabiliteit niet

**1. Een beslissing is genomen.**
De omzet stijgt, dus het management interpreteert de trend als bewijs dat de business winstgevender wordt.

**2. De beslissing vertrouwde op een onvolledige metric.**
Omzet alleen houdt geen rekening met BOM-kosten, loonstrook, bedrijfskosten of geldbewegingen.

**3. De fout verandert de aanbeveling.**
Een groeiende omzetlijn kan samengaan met dalende brutomarge, stijgende loonkosten of verslechterende cashbeschikbaarheid.

**4. Waarom de redenering onjuist is.**
Topgroei beantwoordt hoeveel is verkocht. Het beantwoordt niet hoeveel waarde overblijft na bedrijfskosten.

**5. Gecorrigeerde aanpak.**
Beoordeel de gekoppelde reeks van omzet, BOM-kosten, brutowinst, bedrijfskosten, loonstrook, nettowinst en cashflow.

**6. Gecorrigeerd besluitresultaat.**
Het management kan omzetgroei onderscheiden van werkelijke bedrijfsverbetering en identificeren of de beperking prijsstelling, materiaalkosten, arbeid, uitgaven of liquiditeit is.

**7. Formulelogica:**

<details>
<summary>Operationele nettowinst</summary>

```excel
=Gross_Profit - Total_Operating_Expenses
```

In de dashboardarchitectuur combineren bedrijfskosten financiële transacties die als `Expense` zijn geclassificeerd met loontotalen.

</details>

### Voorbeeldscenario

Beschouw een gebak geprijsd op **$8.00**.

Zijn recept bevat ingrediënten en verpakking met gecombineerde actuele BOM-kosten van **$2.80**.

De producteconomie is daarom:

| Metric              | Waarde |
| ------------------- | ----: |
| Selling Price       | $8.00 |
| BOM Cost            | $2.80 |
| Gross Profit / Unit | $5.20 |
| Food Cost %         | 35.0% |
| Gross Margin %      | 65.0% |

Als de doelmarge in `02_Settings_Control` **65%** is, bereikt het product het doel exact.

Stel nu dat de huidige ingrediëntstam wordt bijgewerkt en de actuele BOM-kosten van het recept stijgen naar **$3.20**.

Het model verandert de economie naar:

| Metric              |       Vorige |         Bijgewerkt |
| ------------------- | -------------: | --------------: |
| Selling Price       |          $8.00 |           $8.00 |
| BOM Cost            |          $2.80 |           $3.20 |
| Gross Profit / Unit |          $5.20 |           $4.80 |
| Food Cost %         |          35.0% |           40.0% |
| Gross Margin %      |          65.0% |           60.0% |
| Target Status       | ✅ Meets Target | ⚠️ Below Target |

De operationele interpretatie is nuttiger dan simpelweg observeren dat „ingrediëntkosten zijn gestegen".

Het product is verschoven van **65% marge op doel** naar **60% marge onder doel**. Als de prijs niet wordt gewijzigd, levert elke extra verkochte eenheid minder brutowinst op dan eerder werd aangenomen.

De beslissing is daarom niet langer „de omzet is gezond, houd de prijsstelling ongewijzigd". De relevante vraag wordt of de business **de prijs moet verhogen, het recept moet herformuleren, de materiaalkosten moet onderhandelen, de lagere marge moet accepteren, of de rol van het product heroverwegen**.

Hetzelfde model draagt het product dan in verkooptransacties, waar de werkelijk verkochte hoeveelheid totale omzet en totale BOM-consumptie bepaalt. Receptgebruik kan ook voorraadverbruik voeden, terwijl loon- en financiële transacties het bredere bedrijfsresultaat beïnvloeden.

Dit is het beoogde gebruik van het werkboek: niet slechts geïsoleerde cijfers berekenen, maar de cijfers verbinden zodat een wijziging in een operationele aanname kan worden beoordeeld tegen de resulterende zakelijke beslissing.

### Formuliereferentie

<details>
<summary>02_Settings_Control — Centrale parameters</summary>

Globale aannames worden centraal onderhouden in plaats van ingebed als hard-gecodeerde waarden in het hele werkboek.

Voorbeelden zijn:

| Parameter               | Voorbeeld |
| ----------------------- | ------: |
| Currency                |     `$` |
| Tax Rate                |  `5.0%` |
| Target Margin           | `65.0%` |
| Overtime Multiplier     |  `1.50` |
| Inventory Safety Buffer | `20.0%` |

Voorbeeld van parameterreferentie:

```excel
='02_Settings_Control'!$B$4
```

Dit maakt het mogelijk de doelmarge één keer te wijzigen en door de relevante berekeningen te propageren.

</details>

<details>
<summary>05_Recipe_Engine — Productkosten en marge</summary>

**Totale BOM-kosten**

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

Dit aggregeert receptregelkosten per `Product_ID`.

**Brutowinst, foodcostpercentage, margepercentage, doelstatus, koppelingsstatus**

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

De berekeningslaag scheidt bewust numerieke outputs van diagnosestatussen. Dit voorkomt dat een zoekfallback wordt geïnterpreteerd als bewijs van nulkosten.

</details>

<details>
<summary>06_Sales_Transactions — Omzet en transactiewinst</summary>

**BOM-kosten per eenheid**

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

**Outputs op transactieniveau**

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

De transactielaag verbindt daarom de werkelijk verkochte hoeveelheid en werkelijke verkoopprijs aan het huidige productkostenmodel.

</details>

<details>
<summary>07_Inventory_Movement — Verbruik en voorraadpositie</summary>

**Huidige hoeveelheid**

```excel
Current Qty =
Opening Qty + In Qty - Out Qty - Loss Qty
```

**Voorraadstatus**

```excel
=IF(Current_Qty<=Min_Stock,"🚨 Reorder Alert","✅ Normal")
```

**Voorraadwaarde**

```excel
=Current_Qty*Live_Unit_Cost
```

Voorraad wordt daarom behandeld als een operationele exposure in plaats van slechts een hoeveelhedenlijst: huidige voorraad kan worden beoordeeld tegen minimumniveaus en de actuele kostenbasis.

</details>

<details>
<summary>08_Suppliers_Purchasing — Inkoop- en AP-logica</summary>

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

`Total_PO_Amount` wordt berekend uit hoeveelheid en eenheidsprijs. `AP_Balance` bevat de orderwaarde wanneer de betalingsstatus `Unpaid` is.

</details>

<details>
<summary>09_Payroll_Employees — Arbeidskosten</summary>

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

Het model houdt overuuraannames gecentraliseerd en berekent de totale loonstrook uit reguliere uren, overuur, bonussen en straffen.

</details>

<details>
<summary>10_Finance_CashFlow — Cashimpact</summary>

```excel
=LET(
    types,FILTER(D2:D10000,A2:A10000<>""),
    amounts,FILTER(E2:E10000,A2:A10000<>""),
    IF(types="Income",amounts,-amounts)
)
```

Inkomsten worden weergegeven als positieve cashimpact; uitgaven worden weergegeven als negatieve cashimpact.

</details>

<details>
<summary>01_Dashboard — Management-KPI's</summary>

**Totale omzet**

```excel
=SUM('06_Sales_Transactions'!G2:G10000)
```

**Totale brutowinst**

```excel
=SUM('06_Sales_Transactions'!I2:I10000)
```

**Brutomarge**

```excel
=IF(B3>0,D3/B3,0)
```

**Bedrijfskosten**

```excel
=SUMIFS(
    '10_Finance_CashFlow'!E2:E10000,
    '10_Finance_CashFlow'!D2:D10000,
    "Expense"
)
+SUM('09_Payroll_Employees'!I2:I10000)
```

**Nettowinst**

```excel
=Gross_Profit-Operating_Expenses
```

**Cashsaldo**

```excel
=SUM('10_Finance_CashFlow'!G2:G10000)
```

**Aantal voorraadwaarschuwingen**

```excel
=COUNTIF(
    '07_Inventory_Movement'!J2:J10000,
    "🚨 Reorder Alert"
)
```

**Aantal koppelingsfouten**

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

Het dashboard combineert daarom bedrijfsprestaties met gegevenskwaliteitsdiagnoses in plaats van rentabiliteitsmetrics te presenteren zonder te controleren of hun upstream gegevens compleet zijn.

</details>

<!-- Technical Details parent <details> intentionally remains OPEN for Part 3. -->
### Validatieregels

Het werkboek gebruikt validatie op zowel het **berekeningsniveau** als het **bedrijfslogicaniveau**. Een numerieke fallback zoals `0` voorkomt dat downstream formules breken, terwijl een apart diagnoseveld identificeert of de onderliggende relatie werkelijk geldig is.

| Veld / Gebied                   | Regel                                                                                          | Foutgedrag                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Param_Value`                  | Globale parameters moeten waarden bevatten die compatibel zijn met hun beoogde bedrijfsbetekenis         | Downstream berekeningen kunnen onjuist worden als ongeldige waarden worden ingevoerd; parameterreview is vereist |
| `Ingredient_ID`                | Moet een ingrediënt uniek identificeren en overeenkomen met receptverwijzingen                              | Mislukte zoekopdracht retourneert `0` voor berekeningsdoeleinden                                                       |
| `Current_Cost`                 | Moet de huidige inkoopkosten van het ingrediënt bevatten                                  | Ontbrekende kosten produceren `⚠️ Material Cost Not Set` in receptdiagnoses                                   |
| `Packaging_ID`                 | Moet verpakkingsmateriaal uniek identificeren en overeenkomen met receptverwijzingen                         | Mislukte zoekopdracht retourneert `0` voor berekeningsdoeleinden                                                       |
| `Unit_Cost`                    | Moet de huidige verpakkingskosten bevatten                                                     | Ontbrekende kosten kunnen leiden tot onvolledige productkostenberekening                                                    |
| `Product_ID`                   | Verkooptransacties moeten overeenkomen met een geregistreerd product in de Recipe Engine               | `🚨 Unregistered Product`                                                                                |
| Recipe detail                  | Elk product moet minstens één gekoppelde receptregel hebben                                    | `🚨 Missing Recipe Detail`                                                                               |
| Recipe material cost           | Receptartikelen moeten oplossen naar een geldige ingrediënt- of verpakkingskostenpost                             | `⚠️ Material Cost Not Set`                                                                               |
| Selling price                  | Moet groter zijn dan nul voor zinvolle margeberekeningen                                  | Foodcostpercentage en margepercentage retourneren `0` wanneer de prijs niet positief is                                           |
| Target margin                  | Productmarge wordt vergeleken met het gecentraliseerde doel in `02_Settings_Control`            | `⚠️ Below Target` wanneer de marge onder de geconfigureerde drempel ligt                                          |
| Sales quantity                 | Moet de werkelijk verkochte hoeveelheid vertegenwoordigen                                                       | Onjuiste hoeveelheden beïnvloeden direct omzet, kosten, winst en voorraadverbruik                    |
| Inventory opening quantity     | Moet de werkelijke beginvoorraadpositie vertegenwoordigen                                             | Onjuiste beginhoeveelheid propageert in de huidige voorraad                                                 |
| Inventory loss quantity        | Wordt gebruikt voor afval, bederf, vervaldatum en voorraad telverliezen                                  | Onjuiste verlieswaarden vervormen de huidige voorraad                                                          |
| Minimum stock                  | Definieert de nabesteldrempel                                                                 | `🚨 Reorder Alert` wanneer de huidige hoeveelheid op of onder de minimumvoorraad is                                    |
| Purchase quantity / unit price | Beide zijn vereist voor een zinvolle orderwaarde                                                     | Onjuiste waarden vervormen inkoop- en AP-totalen                                                        |
| Payment status                 | `Unpaid` bepaalt of de orderwaarde bijdraagt aan het AP-saldo                                | Een status anders dan `Unpaid` wordt behandeld als niet openstaand                                                        |
| Employee hours / rate          | Reguliere en overuren worden vermenigvuldigd met de relevante tarieven                               | Onjuiste invoer beïnvloedt direct de loonkosten                                                            |
| Finance transaction type       | `Income` is positief; andere geregistreerde uitgaventransacties worden behandeld als negatieve cashimpact | Onjuiste transactieclassificatie verandert de cashflowinterpretatie                                    |
| Dynamic-array output area      | Formule-spillbereiken moeten ongehinderd blijven                                                 | Excel retourneert `#SPILL!`                                                                                  |
| Dashboard link diagnostics     | Verkoop- en receptkoppelingsfouten moeten worden beoordeeld voordat rentabiliteitsmetrics worden vertrouwd                       | Het dashboard rapporteert het aantal koppelingsuitzonderingen                                                          |

### Operationele validatiestroom

Het validatiemodel volgt dezelfde afhankelijkheidsrichting als het bedrijfsmodel:

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

Een kritisch principe is dat **berekeningsgeldigheid en bedrijfsgeldigheid niet hetzelfde zijn**.

Bijvoorbeeld:

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

Dit voorkomt dat een technisch geldige Excel-berekening voor een geldige bedrijfsconclusie wordt aangezien.

### Integriteitscontroles tussen tabellen

Het werkboek bevat verschillende multi-hop afhankelijkheden die expliciete controle vereisen.

#### Sales → Recipe → Material Master

```text
06_Sales_Transactions
        ↓ Product_ID
05_Recipe_Engine
        ↓ Item_ID
03_Ingredient_Master / 04_Packaging_Master
```

Een ontbrekende relatie op elk punt kan de gerapporteerde productkosten beïnvloeden.

#### Sales → Recipe → Inventory

```text
06_Sales_Transactions
        ↓ Product_ID + Qty_Sold
05_Recipe_Engine
        ↓ Item_ID + Usage_Qty
07_Inventory_Movement
```

Deze relatie converteert productverkopen naar materiaalverbruik.

#### Purchasing → Inventory / AP

```text
08_Suppliers_Purchasing
        ├── Purchase Quantity
        ├── Unit Price
        └── Payment Status
                 ↓
        PO Amount / AP Balance
```

De architectuur scheidt daarom operationele hoeveelheden van financiële verplichtingen terwijl hun relatie behouden blijft.

### Onderhoudsvrije bedrijfsregels

Het werkboek is ontworpen rond dynamische-arrayformules en gecentraliseerde parameters.

1. **Kopieer formules niet handmatig naar beneden.**
   Nieuwe records moeten in de aangewezen invoervelden worden ingevoerd.

2. **Overschrijf geen formulegegenereerde cellen niet.**
   Dynamische-array outputbereiken moeten vrij blijven.

3. **Onderhoud stamgegevens vóór transactionele gegevens.**
   Ingrediënt-, verpakkings- en receptrelaties moeten bestaan voordat gerelateerde verkopen voor rentabiliteitsanalyse worden gebruikt.

4. **Wijzig globale aannames centraal.**
   Belastingtarief, doelmarge, overuurmultiplicator en veiligheidsbuffer worden onderhouden via `02_Settings_Control`.

5. **Beoordeel diagnoses voordat je KPI's interpreteert.**
   Een dashboard dat omzet en winst toont betekent niet automatisch dat elke onderliggende berekening compleet is.

### Excel-compatibiliteit

De bronarchitectuur vertrouwt op moderne Excel-functies, waaronder:

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

De implementatie richt zich daarom op **Microsoft 365 en Excel 2021 of later**, met beschikbare dynamische-arrayfunctionaliteit.

De architectuur beveelt aan om individuele tabellen onder ongeveer **100.000 rijen** te houden, voor praktische werkboekprestaties.

### Veelvoorkomende faalmodi

**`#SPILL!`**

Geeft meestal aan dat cellen binnen een dynamische-array spillbereik blokkerende inhoud bevatten.

**Fix:** wis de blokkerende cellen en laat de formule spillen.

---

**Dashboard rapporteert koppelingsfouten**

Geeft meestal een niet-geregistreerd product, ontbrekend receptdetail of ontbrekende materiaalprijs aan.

**Fix:** gebruik het aantal koppelingsfouten van het dashboard om de getroffen transactie of het getroffen product te lokaliseren, repareer dan de upstream relatie.

---

**Ingrediëntprijs verandert maar productkosten lijken ongewijzigd**

De bronarchitectuur identificeert niet-overeenkomende ID's als waarschijnlijke oorzaak.

**Fix:** verifieer dat de `Item_ID` die door de Recipe Engine wordt gebruikt exact overeenkomt met de corresponderende `Ingredient_ID` of `Packaging_ID` in de stamttabel.

### Aanbevolen dagelijkse bedrijfsvolgorde

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

Het bedrijfsprincipe is simpel: **repareer de gegevensketen voordat je op de KPI handelt.**

</details>

## Andere tools in deze serie

Een groeiende collectie van lichtgewicht Excel- en browsergebaseerde beslissingsondersteunende tools voor operationele problemen zoals voorraadafstemming, rentabiliteitsanalyse, kostencontrole, beroepsbevolkingsplanning en bedrijfsrapportage.

Verken de gerelateerde projecten via de repository of de bijbehorende productcollectie.

## Licentie

Dit project wordt gepubliceerd onder de **Apache License 2.0**.

Je mag het project gebruiken, wijzigen, distribueren en aanpassen in overeenstemming met de voorwaarden van de Apache License 2.0.

Zie het licentiebestand in de repository voor de volledige licentietekst.

---

**Einde van README**
