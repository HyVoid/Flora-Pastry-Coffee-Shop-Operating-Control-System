[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Flora Pastry & Coffee Shop Operations Control System

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-brightgreen.svg)
![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-orange.svg)

**Verfolge Umsatz, Produktrentabilität, Lagerrisiko, Arbeitskosten, Cashflow und Datenintegrität in einer einzigen leichten Betriebsarbeitsmappe — kostenlos im Browser, mit einer Excel-Version für tiefere Kontrolle.**

**Keine Registrierung. Keine Installation. Kostenlos in deinem Browser.**

Teste die Browser-Version kostenlos. Wenn du die Excel-Version benötigst, kannst du sie mit einer 30-tägigen Geld-zurück-Garantie ohne Rückfragen erwerben.
>
> 🌐 **Im Browser öffnen** → [HTML-Live-Demo](https://hyvoid.github.io/Flora-Pastry-Coffee-Shop-Operating-Control-System/)
>
> 📥 **Excel herunterladen** → [Excel-Version / Kauf-Link]()


## Was du damit verfolgen kannst

* **Umsatzentwicklung** — tägliche, wöchentliche, monatliche und jährliche Einnahmen ohne Neuerstellung separater Berichte.
* **Wahre Produktrentabilität** — BOM-Kosten auf Produktebene, Bruttogewinn, Food-Cost-Anteil und Marge nach aktuellen Zutaten- und Verpackungspreisen.
* **Kostenänderungen, die in Entscheidungen fließen** — ein geänderter Zutaten- oder Verpackungspreis beeinflusst sofort Rezeptkosten und nachgelagerte Rentabilität.
* **Lagerrisiko** — aktuelle Mengen, Lagerwert, Verbrauch, Verluste und Niedrigbestand-Warnungen.
* **Cash und Betriebsdruck** — Zahlungsbewegungen, Betriebsausgaben, Löhne und resultierender Nettogewinn in derselben Managementansicht.
* **Probleme der Datenintegrität** — fehlende Rezepte, nicht registrierte Produkte oder fehlende Materialpreise werden sichtbar gemacht, statt stillschweigend irreführende Gewinnzahlen zu erzeugen.

## Schnellstart-Workflow

1. **Lege die Schlüsselparameter fest.**
   Öffne `02_Settings_Control` und etabliere die Betriebsannahmen, die werkbuchweit verwendet werden, wie Währung, Steuersatz, Zielmarge, Überstundenmultiplikator und Sicherheitspuffer für das Lager. Diese Parameter werden zentral gepflegt statt in einzelne Berechnungen eingebettet.

2. **Lade die Betriebsdaten.**
   Pflege Zutaten- und Verpackungsstammdaten, Produktrezepte, Verkaufstransaktionen, Einkaufsaufzeichnungen, Lagerbewegungen, Mitarbeiterstunden und Cashflow-Transaktionen in ihren vorgesehenen Blättern. Bestehende Informationen können aus Buchhaltungsexporten oder anderen Tabellen in die entsprechenden Eingabebereiche übertragen werden.

3. **Verschaffe dir das Betriebsbild.**
   Öffne `01_Dashboard`. Umsatz, Bruttogewinn, Betriebsausgaben, Nettogewinn, Zahlungsmittelposition, Lagerwarnungen und Datenverknüpfungs-Ausnahmen werden aus den zugrunde liegenden Datensätzen berechnet.

4. **Aktualisiere regelmäßig.**
   Füge weiterhin neue Transaktionen hinzu und aktualisiere sich ändernde Stammdaten. Globale Parameter können zentral geändert werden, wenn sich Geschäftsannahmen ändern. Die Arbeitsmappe rechnet neu, ohne die Berichtsstruktur neu aufzubauen.

**Lege ein paar Schlüsselparameter fest. Wirf die Betriebsdaten hinein. Hol dir die Analyse. Aktualisiere, wenn du musst.**

## Warum ich das gebaut habe

Eine Konditorei und ein Café können profitabel erscheinen, während die zugrunde liegenden Zahlen falsch sind.

Das Problem ist nicht immer eine schlechte Geschäftsentscheidung. Oft basiert die Entscheidung auf einer Zahl, sich leise vom Betrieb gelöst hat.

Zum Beispiel kann ein Rezept eine Zutat verwenden, deren Einkaufspreis gestiegen ist. Wenn die Rezeptkosten nicht aktualisiert werden, bleibt die ausgewiesene Produktmarge künstlich hoch. Das gleiche Problem tritt auf, wenn ein Produkt verkauft wird, bevor seine BOM registriert wurde: eine fehlende Kostenstelle kann zu einer numerischen Null werden, sodass das Produkt eine ungewöhnlich starke Marge zu haben scheint.

Das ist der Fehler, den diese Arbeitsmappe verhindern soll.

Statt Rentabilität als statischen Bericht zu behandeln, verbindet das Modell die Betriebskette:

**Zutaten-/Verpackungskosten → Rezeptkosten → Verkaufs-Bruttogewinn → Lagerverbrauch → Betriebsausgaben → Nettogewinn → Zahlungsmittelposition**

Es trennt auch **Berechnungswerte** von **Diagnosestatus**. Eine fehlende Kostenstelle kann für nachgelagerte Arithmetik sicher `0` zurückgeben, während ein separates `Link_Status`-Feld die fehlende Beziehung identifiziert.

Der praktische Unterschied ist erheblich.

**Vorher:**
Ein Produkt mit fehlendem Rezept kann scheinbar null BOM-Kosten und damit eine scheinbar hervorragende Bruttomarge haben.

**Nachher:**
Dasselbe Produkt wird als `🚨 Unregistered Product` oder `🚨 Missing Recipe Detail` markiert, sodass die ausgewiesene Rentabilität als unvollständig behandelt werden kann statt als Beleg für starke Leistung.

Dies soll keine Buchhaltungssoftware ersetzen. Es ist ein wiederverwendbares, produktisiertes Denkgerüst zur Verbindung der Betriebszahlen, die alltägliche Entscheidungen beeinflussen.

## Häufige Konditorei- und Café-Probleme, die dies löst

| Problem                                                    | Ohne dieses Tool                                                                         | Mit diesem Tool                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Zutatenpreise ändern sich                                       | Produktmargen werden veraltet, bis jemand die Kalkulation manuell neu aufbaut                      | Aktuelle Zutatenkosten fließen in Rezept-BOM-Kosten und Produktmargen                    |
| Ein Rezept ist unvollständig                                           | Fehlende Kosten können als Null erscheinen und falsche Rentabilität erzeugen                           | `Link_Status` identifiziert fehlende Rezeptdetails, bevor sie zu einer Managementaussage werden |
| Verkäufe werden getrennt von der Kalkulation erfasst                 | Umsatz ist sichtbar, aber Bruttogewinn auf Produktebene erfordert manuelle Abstimmung         | Verkaufstransaktionen verbinden sich automatisch mit aktuellen BOM-Kosten                              |
| Das Lager ist vom Verkauf getrennt                                               | Bestandsniveaus erfordern separate Berechnungen und manuelle Verbrauchsschätzungen               | Verkaufsmengen und Rezeptverbrauch treiben Materialverbrauch und Lagerwarnungen                    |
| Arbeitskosten und Betriebsausgaben liegen außerhalb der Produktberichterstattung | Bruttogewinn kann gesund aussehen, während Löhne und Betriebskosten das Geschäftsergebnis auszehren | Löhne und Betriebsausgaben speisen die Nettogewinnansicht                                    |
| Cash sieht gesund aus, während Verpflichtungen auflaufen            | Zahlungsbewegungen und unbezahlte Einkaufsverpflichtungen sind betrieblich schwer abzustimmen  | Cashflow-Transaktionen und Einkaufs-/AP-Aufzeichnungen bieten eine kombinierte Betriebsansicht         |

## Für wen dies geeignet ist

Diese Tools sind für **kleine Konditoreien, Bäckereien, Cafés und inhabergeführte Lebensmittelbetriebe** konzipiert, die mehr betriebliche Kontrolle brauchen, als eine einfache Verkaufstabelle bietet, aber keine vollständige ERP-Unternehmensimplementierung benötigen.

Besonders nützlich ist es, wenn sich Zutatenpreise häufig bewegen, Rezepte die Produktökonomie bestimmen, das Lager aktive Überwachung benötigt und der Inhaber einen Ort braucht, um **Umsatz → Kosten → Gewinn → Lager → Löhne → Cash** zu verstehen.

Es ist nicht dazu bestimmt, ein gesetzliches Buchhaltungssystem, eine Lohnabrechnungs-Compliance-Plattform, ein POS-System oder ein Unternehmens-ERP zu ersetzen.

**Keine Tabellenkalkulations-Expertise erforderlich. Öffne die Browser-Version und beginne sofort mit der Verfolgung.** Die Excel-Version ist verfügbar, wenn tiefere Kontrolle und Anpassung auf Arbeitsmappenebene erforderlich sind.

## Über mich

Ich baue leichte Betriebstracker und Entscheidungsunterstützungs-Tools für Situationen, in denen es zu viele bewegliche Teile gibt, um sie im Kopf zu behalten, aber ein volles Unternehmenssystem würde unnötige Komplexität hinzufügen.

Die zentrale Frage ist einfach:

> **Welche Informationen müssen an einem Ort sein, um die nächste Entscheidung sicher zu treffen?**

Flora ist ein Beispiel für diesen Ansatz. Statt ein generisches Dashboard zu bauen, verbindet die Arbeitsmappe die spezifischen betrieblichen Beziehungen, die bestimmen, ob die ausgewiesene Leistung einer Konditorei und eines Cafés tatsächlich vertrauenswürdig sein kann.

### Technische Details

<details>
<summary>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</summary>

### Architektur der Arbeitsmappe

Flora ist als dreischichtige Betriebsarbeitsmappe strukturiert:

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

| Schicht        | Blatt                     | Primäre Verantwortung                                                             |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| Präsentation | `01_Dashboard`            | Umsatz, Bruttogewinn, Nettogewinn, Cash, Lagerwarnungen und Gesundheit der Datenverknüpfung  |
| Steuerung      | `02_Settings_Control`     | Zentrale Betriebsannahmen und Parameter                                       |
| Stammdaten  | `03_Ingredient_Master`    | Zutaten-IDs, Einheiten, aktuelle Kosten, Lieferanten, Mindestbestand                     |
| Stammdaten  | `04_Packaging_Master`     | Verpackungs-IDs, Einheiten, aktuelle Kosten, Lieferanten                                     |
| Berechnung  | `05_Recipe_Engine`        | BOM-Details, aktuelle Materialkosten, Produktkosten, Marge, Rezeptverknüpfungs-Diagnosen     |
| Transaktionen | `06_Sales_Transactions`   | Verkaufsaktivität, Umsatz, BOM-Kosten, Bruttogewinn, Steuer, Produktverknüpfungs-Diagnosen     |
| Lager    | `07_Inventory_Movement`   | Anfangsbestand, Käufe, Verkaufsverbrauch, Verluste, aktuelle Menge, Lagerwert |
| Einkauf   | `08_Suppliers_Purchasing` | Bestellungen, Lieferantentransaktionen, Zahlungsstatus, AP-Saldo                 |
| Arbeit        | `09_Payroll_Employees`    | Regelstunden, Überstunden, Boni, Abzüge, Lohnkosten                          |
| Finanzen      | `10_Finance_CashFlow`     | Einnahmen, Ausgaben, Kontobewegung, Netto-Cash-Auswirkung                                |

Die beabsichtigte Abhängigkeitsrichtung ist:

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

Dies schafft die zentrale Betriebskette:

**Zutaten-/Verpackungskosten → Rezeptkosten → Verkaufs-Bruttogewinn → Lagerverbrauch → Betriebsausgaben → Nettogewinn → Zahlungsmittelposition**

Die Architektur unterscheidet auch zwischen **Berechnungsausgaben** und **Diagnoseausgaben**. Numerische Berechnungen können `0` als sicheren nachgelagerten Wert verwenden, wenn eine Suche fehlschlägt, während `Link_Status` das zugrunde liegende Datenproblem der Geschäftsführung offenlegt.

### Drei Fallen, die selbst erfahrene Betreiber zu Fallen bringen

#### Falle 1 — Ein fehlendes Rezept sieht wie ein Produkt mit hoher Marge aus

**1. Eine Entscheidung wurde getroffen.**
Ein Produkt scheint eine ungewöhnlich hohe Bruttomarge zu haben, also erwägt die Geschäftsführung, seinen aktuellen Verkaufspreis beizubehalten und das Produkt zu priorisieren.

**2. Die Entscheidung stützte sich auf eine fehlerhafte Zahl.**
Das Produkt hat keine vollständigen Rezeptdetails, daher lösen sich seine BOM-Kosten zu `0` auf.

**3. Der Fehler ändert die Empfehlung.**
Ein Verkaufspreis von `$8.00` mit ausgewiesenen BOM-Kosten von `$0.00` ergibt eine ausgewiesene Bruttomarge von `100%`.

**4. Warum die Begründung falsch ist.**
Die Zahl stellt kein echtes Nullkosten-Produkt dar. Sie stellt unvollständige Kalkulationsdaten dar.

**5. Korrigierter Ansatz.**
Halte den numerischen Rückfall für nachgelagerte Berechnungen sicher, diagnostiziere aber unabhängig, ob ein gültiges Rezept existiert.

**6. Korrigiertes Entscheidungsergebnis.**
Das Produkt wird als `🚨 Missing Recipe Detail` markiert statt als Produkt mit 100% Marge behandelt.

**7. Formellogik:**

<details>
<summary>Diagnose des Rezeptverknüpfungsstatus</summary>

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

Die wichtige Kontrolle ist nicht der Rückfallwert `0` selbst. Es ist der separate Diagnosestatus, der verhindert, dass der Rückfall mit der geschäftlichen Realität verwechselt wird.

</details>

---

#### Falle 2 — Eine Kostenänderung schlägt sich nicht in der Produktökonomie nieder

**1. Eine Entscheidung wurde getroffen.**
Die Geschäftsführung prüft Produktmargen und entscheidet, dass die aktuelle Preisgestaltung weiterhin akzeptabel bleibt.

**2. Die Entscheidung stützte sich auf eine unbemerkte fehlerhafte Annahme.**
Der Zutatenstamm enthält noch eine veraltete Einkaufskostenangabe.

**3. Der Fehler ändert die Empfehlung.**
Die ausgewiesenen BOM-Kosten sind niedriger als die aktuelle Einkaufsrealität, daher ist die ausgewiesene Marge überhöht.

**4. Warum die Begründung falsch ist.**
In einem rezeptgesteuerten Geschäft sind aktuelle Materialkosten ein direkter Input für die Produktökonomie. Veraltete Kosten erzeugen eine veraltete Marge.

**5. Korrigierter Ansatz.**
Pflege aktuelle Zutaten- und Verpackungskosten in den Stammtabellen und lass die Rezept-Engine diese Werte dynamisch abrufen.

**6. Korrigiertes Entscheidungsergebnis.**
Eine geänderte Zutatenkostenangabe fließt in Rezeptpositionskosten, Gesamt-BOM-Kosten, Food-Cost-Anteil und Margenanteil, ohne jede Produktberechnung manuell neu aufzubauen.

**7. Formellogik:**

<details>
<summary>Abruf aktueller Materialkosten</summary>

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

Das Rezept speichert keinen getrennten historischen Materialpreis als primäre Kalkulationsquelle. Es ruft die aktuellen Stammdatenkosten ab.

</details>

---

#### Falle 3 — Der Umsatz ist korrekt, aber die Rentabilität nicht

**1. Eine Entscheidung wurde getroffen.**
Der Umsatz steigt, also interpretiert die Geschäftsführung den Trend als Beleg dafür, dass das Geschäft profitabler wird.

**2. Die Entscheidung stützte sich auf eine unvollständige Kennzahl.**
Umsatz allein berücksichtigt weder BOM-Kosten, Löhne, Betriebsausgaben noch Zahlungsbewegungen.

**3. Der Fehler ändert die Empfehlung.**
Eine wachsende Umsatzlinie kann mit sinkender Bruttomarge, steigenden Lohnkosten oder sich verschlechternder Liquiditätsverfügbarkeit koexistieren.

**4. Warum die Begründung falsch ist.**
Wachstum an der Spitze beantwortet, wie viel verkauft wurde. Es beantwortet nicht, wie viel Wert nach Betriebskosten verbleibt.

**5. Korrigierter Ansatz.**
Bewerte die verknüpfte Folge aus Umsatz, BOM-Kosten, Bruttogewinn, Betriebsausgaben, Löhnen, Nettogewinn und Cashflow.

**6. Korrigiertes Entscheidungsergebnis.**
Die Geschäftsführung kann Umsatzwachstum von tatsächlicher betrieblicher Verbesserung unterscheiden und identifizieren, ob die Einschränkung Preisgestaltung, Materialkosten, Arbeit, Ausgaben oder Liquidität ist.

**7. Formellogik:**

<details>
<summary>Betrieblicher Nettogewinn</summary>

```excel
=Gross_Profit - Total_Operating_Expenses
```

In der Dashboard-Architektur kombinieren Betriebsausgaben Finanztransaktionen, die als `Expense` klassifiziert sind, mit Lohngesamtsummen.

</details>

### Beispielszenario

Betrachte ein Gebäck zum Preis von **$8.00**.

Sein Rezept enthält Zutaten und Verpackung mit kombinierten aktuellen BOM-Kosten von **$2.80**.

Die Produktökonomie ist daher:

| Kennzahl              | Wert |
| ------------------- | ----: |
| Selling Price       | $8.00 |
| BOM Cost            | $2.80 |
| Gross Profit / Unit | $5.20 |
| Food Cost %         | 35.0% |
| Gross Margin %      | 65.0% |

Wenn die Zielmarge in `02_Settings_Control` **65%** beträgt, erreicht das Produkt das Ziel exakt.

Nimm an, der aktuelle Zutatenstamm wird aktualisiert und die aktuellen BOM-Kosten des Rezepts steigen auf **$3.20**.

Das Modell ändert die Ökonomie zu:

| Kennzahl              |       Vorher |         Aktualisiert |
| ------------------- | -------------: | --------------: |
| Selling Price       |          $8.00 |           $8.00 |
| BOM Cost            |          $2.80 |           $3.20 |
| Gross Profit / Unit |          $5.20 |           $4.80 |
| Food Cost %         |          35.0% |           40.0% |
| Gross Margin %      |          65.0% |           60.0% |
| Target Status       | ✅ Meets Target | ⚠️ Below Target |

Die betriebliche Interpretation ist nützlicher als bloß zu beobachten, dass „die Zutatenkosten gestiegen sind".

Das Produkt hat sich von **65% Marge auf Zielniveau** zu **60% Marge unter dem Ziel** bewegt. Wenn der Preis nicht geändert wird, trägt jede zusätzlich verkaufte Einheit weniger Bruttogewinn bei als bisher angenommen.

Die Entscheidung ist daher nicht mehr „der Umsatz ist gesund, lasse die Preisgestaltung unverändert". Die relevante Frage wird, ob das Geschäft **den Preis erhöhen, das Rezept umformulieren, die Materialkosten verhandeln, die niedrigere Marge akzeptieren oder die Rolle des Produkts überdenken** sollte.

Dasselbe Modell trägt das Produkt dann in Verkaufstransaktionen, wo die tatsächlich verkaufte Menge den Gesamtumsatz und den Gesamt-BOM-Verbrauch bestimmt. Rezeptverbrauch kann auch Lagerverbrauch speisen, während Lohn- und Finanztransaktionen das breitere Betriebsergebnis beeinflussen.

Das ist die beabsichtigte Verwendung der Arbeitsmappe: nicht bloß isolierte Zahlen zu berechnen, sondern die Zahlen zu verbinden, sodass eine Änderung einer betrieblichen Annahme gegen die resultierende Geschäftsentscheidung bewertet werden kann.

### Formelreferenz

<details>
<summary>02_Settings_Control — Zentrale Parameter</summary>

Globale Annahmen werden zentral gepflegt statt als hart kodierte Werte in der gesamten Arbeitsmappe eingebettet.

Beispiele dafür:

| Parameter               | Beispiel |
| ----------------------- | ------: |
| Currency                |     `$` |
| Tax Rate                |  `5.0%` |
| Target Margin           | `65.0%` |
| Overtime Multiplier     |  `1.50` |
| Inventory Safety Buffer | `20.0%` |

Beispiel für eine Parameterreferenz:

```excel
='02_Settings_Control'!$B$4
```

Dies ermöglicht es, die Zielmarge einmal zu ändern und durch die relevanten Berechnungen zu propagieren.

</details>

<details>
<summary>05_Recipe_Engine — Produktkosten und Marge</summary>

**Gesamt-BOM-Kosten**

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

Dies aggregiert Rezeptpositionskosten nach `Product_ID`.

**Bruttogewinn, Food-Cost-Anteil, Margenanteil, Zielstatus, Verknüpfungsstatus**

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

Die Berechnungsschicht trennt bewusst numerische Ausgaben von Diagnosezuständen. Dies verhindert, dass ein Such-Rückfall als Beleg für Nullkosten interpretiert wird.

</details>

<details>
<summary>06_Sales_Transactions — Umsatz und Transaktionsgewinn</summary>

**BOM-Kosten pro Einheit**

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

**Ausgaben auf Transaktionsebene**

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

Die Transaktionsschicht verbindet daher tatsächliche Verkaufsmenge und tatsächlichen Verkaufspreis mit dem aktuellen Produktkostenmodell.

</details>

<details>
<summary>07_Inventory_Movement — Verbrauch und Bestandsposition</summary>

**Aktuelle Menge**

```excel
Current Qty =
Opening Qty + In Qty - Out Qty - Loss Qty
```

**Bestandsstatus**

```excel
=IF(Current_Qty<=Min_Stock,"🚨 Reorder Alert","✅ Normal")
```

**Bestandswert**

```excel
=Current_Qty*Live_Unit_Cost
```

Das Lager wird daher als betriebliches Risiko behandelt und nicht nur als Mengenliste: der aktuelle Bestand kann gegen Mindestniveaus und die aktuelle Kostenbasis bewertet werden.

</details>

<details>
<summary>08_Suppliers_Purchasing — Einkaufs- und AP-Logik</summary>

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

`Total_PO_Amount` wird aus Menge und Stückpreis berechnet. `AP_Balance` enthält den Bestellwert, wenn der Zahlungsstatus `Unpaid` ist.

</details>

<details>
<summary>09_Payroll_Employees — Arbeitskosten</summary>

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

Das Modell hält Überstundenannahmen zentral und berechnet die Gesamtlohnsumme aus Regelstunden, Überstunden, Boni und Abzügen.

</details>

<details>
<summary>10_Finance_CashFlow — Cash-Auswirkung</summary>

```excel
=LET(
    types,FILTER(D2:D10000,A2:A10000<>""),
    amounts,FILTER(E2:E10000,A2:A10000<>""),
    IF(types="Income",amounts,-amounts)
)
```

Einnahmen werden als positive Cash-Auswirkung dargestellt; Ausgaben werden als negative Cash-Auswirkung dargestellt.

</details>

<details>
<summary>01_Dashboard — Management-KPIs</summary>

**Gesamtumsatz**

```excel
=SUM('06_Sales_Transactions'!G2:G10000)
```

**Gesamt-Bruttogewinn**

```excel
=SUM('06_Sales_Transactions'!I2:I10000)
```

**Bruttomarge**

```excel
=IF(B3>0,D3/B3,0)
```

**Betriebsausgaben**

```excel
=SUMIFS(
    '10_Finance_CashFlow'!E2:E10000,
    '10_Finance_CashFlow'!D2:D10000,
    "Expense"
)
+SUM('09_Payroll_Employees'!I2:I10000)
```

**Nettogewinn**

```excel
=Gross_Profit-Operating_Expenses
```

**Kassenbestand**

```excel
=SUM('10_Finance_CashFlow'!G2:G10000)
```

**Anzahl Lagerwarnungen**

```excel
=COUNTIF(
    '07_Inventory_Movement'!J2:J10000,
    "🚨 Reorder Alert"
)
```

**Anzahl Verknüpfungsfehler**

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

Das Dashboard kombiniert daher Geschäftsleistung mit Datenqualitäts-Diagnosen, anstatt Rentabilitätskennzahlen zu präsentieren, ohne zu prüfen, ob ihre vorgelagerten Daten vollständig sind.

</details>

<!-- Technical Details parent <details> intentionally remains OPEN for Part 3. -->
### Validierungsregeln

Die Arbeitsmappe verwendet Validierung sowohl auf der **Berechnungsebene** als auch auf der **Geschäftslogikebene**. Ein numerischer Rückfall wie `0` verhindert, dass nachgelagerte Formeln brechen, während ein separates Diagnosefeld identifiziert, ob die zugrunde liegende Beziehung tatsächlich gültig ist.

| Feld / Bereich                   | Regel                                                                                          | Fehlerverhalten                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Param_Value`                  | Globale Parameter müssen Werte enthalten, die mit ihrer beabsichtigten betrieblichen Bedeutung kompatibel sind         | Nachgelagerte Berechnungen können falsch werden, wenn ungültige Werte eingegeben werden; Parameterprüfung ist erforderlich |
| `Ingredient_ID`                | Muss eine Zutat eindeutig identifizieren und mit Rezeptreferenzen übereinstimmen                              | Fehlgeschlagene Suche gibt `0` für Berechnungszwecke zurück                                                       |
| `Current_Cost`                 | Sollte die aktuellen Einkaufskosten der Zutat enthalten                                  | Fehlende Kosten erzeugen `⚠️ Material Cost Not Set` in den Rezeptdiagnosen                                   |
| `Packaging_ID`                 | Muss Verpackungsmaterial eindeutig identifizieren und mit Rezeptreferenzen übereinstimmen                         | Fehlgeschlagene Suche gibt `0` für Berechnungszwecke zurück                                                       |
| `Unit_Cost`                    | Sollte die aktuellen Verpackungskosten enthalten                                                     | Fehlende Kosten können zu unvollständiger Produktkalkulation führen                                                    |
| `Product_ID`                   | Verkaufstransaktionen müssen einem in der Rezept-Engine registrierten Produkt entsprechen               | `🚨 Unregistered Product`                                                                                |
| Recipe detail                  | Jedes Produkt muss mindestens eine zugehörige Rezeptposition haben                                    | `🚨 Missing Recipe Detail`                                                                               |
| Recipe material cost           | Rezeptpositionen müssen sich zu einer gültigen Zutaten- oder Verpackungskostenangabe auflösen                             | `⚠️ Material Cost Not Set`                                                                               |
| Selling price                  | Muss für sinnvolle Margenberechnungen größer als Null sein                                  | Food-Cost-Anteil und Margenanteil geben `0` zurück, wenn der Preis nicht positiv ist                                           |
| Target margin                  | Die Produktmarge wird mit dem zentralen Ziel in `02_Settings_Control` verglichen            | `⚠️ Below Target`, wenn die Marge unter dem konfigurierten Schwellenwert liegt                                          |
| Sales quantity                 | Muss die tatsächlich verkaufte Menge darstellen                                                       | Falsche Mengen beeinflussen direkt Umsatz, Kosten, Gewinn und Lagerverbrauch                    |
| Inventory opening quantity     | Muss die tatsächliche Anfangsbestandsposition darstellen                                             | Falsche Anfangsmenge pflanzt sich in den aktuellen Bestand fort                                                 |
| Inventory loss quantity        | Wird für Abfall, Verderb, Verfall und Inventurdifferenzen verwendet                                  | Falsche Verlustwerte verzerren den aktuellen Bestand                                                          |
| Minimum stock                  | Definiert die Nachbestellungsschwelle                                                                 | `🚨 Reorder Alert`, wenn die aktuelle Menge am Mindestbestand oder darunter ist                                    |
| Purchase quantity / unit price | Beide sind für einen sinnvollen Bestellwert erforderlich                                                     | Falsche Werte verzerren Einkaufs- und AP-Gesamtsummen                                                        |
| Payment status                 | `Unpaid` bestimmt, ob der Bestellwert zum AP-Saldo beiträgt                                | Ein Status ungleich `Unpaid` wird als nicht ausstehend behandelt                                                        |
| Employee hours / rate          | Regel- und Überstunden werden mit den relevanten Sätzen multipliziert                               | Falsche Eingaben beeinflussen direkt die Lohnkosten                                                            |
| Finance transaction type       | `Income` ist positiv; andere erfasste Ausgabentransaktionen werden als negative Cash-Auswirkung behandelt | Falsche Transaktionsklassifizierung ändert die Cashflow-Interpretation                                    |
| Dynamic-array output area      | Formel-Überlaufbereiche müssen ungehindert bleiben                                                 | Excel gibt `#SPILL!` zurück                                                                                  |
| Dashboard link diagnostics     | Verkaufs- und Rezeptverknüpfungsfehler sollten geprüft werden, bevor Rentabilitätskennzahlen vertraut wird                       | Das Dashboard meldet die Anzahl der Verknüpfungsausnahmen                                                          |

### Betrieblicher Validierungsfluss

Das Validierungsmodell folgt derselben Abhängigkeitsrichtung wie das Geschäftsmodell:

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

Ein kritisches Prinzip ist, dass **Berechnungsgültigkeit und betriebliche Gültigkeit nicht dasselbe sind**.

Zum Beispiel:

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

Dies verhindert, dass eine technisch gültige Excel-Berechnung mit einer gültigen betrieblichen Schlussfolgerung verwechselt wird.

### Integritätsprüfungen zwischen Tabellen

Die Arbeitsmappe enthält mehrere mehrstufige Abhängigkeiten, die explizite Prüfung erfordern.

#### Sales → Recipe → Material Master

```text
06_Sales_Transactions
        ↓ Product_ID
05_Recipe_Engine
        ↓ Item_ID
03_Ingredient_Master / 04_Packaging_Master
```

Eine fehlende Beziehung an jedem Punkt kann die ausgewiesenen Produktkosten beeinflussen.

#### Sales → Recipe → Inventory

```text
06_Sales_Transactions
        ↓ Product_ID + Qty_Sold
05_Recipe_Engine
        ↓ Item_ID + Usage_Qty
07_Inventory_Movement
```

Diese Beziehung wandelt Produktverkäufe in Materialverbrauch um.

#### Purchasing → Inventory / AP

```text
08_Suppliers_Purchasing
        ├── Purchase Quantity
        ├── Unit Price
        └── Payment Status
                 ↓
        PO Amount / AP Balance
```

Die Architektur trennt daher betriebliche Mengen von finanziellen Verpflichtungen und behält gleichzeitig ihre Beziehung.

### Wartungsfreie Betriebsregeln

Die Arbeitsmappe ist um dynamische Array-Formeln und zentrale Parameter herum aufgebaut.

1. **Kopiere Formeln nicht manuell nach unten.**
   Neue Datensätze sollten in die vorgesehenen Eingabebereiche eingegeben werden.

2. **Überschreibe keine formelerzeugten Zellen.**
   Dynamische Array-Ausgabebereiche müssen frei bleiben.

3. **Pflege Stammdaten vor Transaktionsdaten.**
   Zutaten-, Verpackungs- und Rezeptbeziehungen sollten existieren, bevor damit zusammenhängende Verkäufe für die Rentabilitätsanalyse herangezogen werden.

4. **Ändere globale Annahmen zentral.**
   Steuersatz, Zielmarge, Überstundenmultiplikator und Sicherheitspuffer werden über `02_Settings_Control` gepflegt.

5. **Prüfe Diagnosen, bevor du KPIs interpretierst.**
   Ein Dashboard, das Umsatz und Gewinn zeigt, bedeutet nicht automatisch, dass jede zugrunde liegende Berechnung vollständig ist.

### Excel-Kompatibilität

Die Quellarchitektur stützt sich auf moderne Excel-Funktionen, einschließlich:

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

Die Implementierung zielt daher auf **Microsoft 365 und Excel 2021 oder neuer** ab, mit verfügbarer dynamischer Array-Funktionalität.

Die Architektur empfiehlt, einzelne Tabellen unter etwa **100.000 Zeilen** zu halten, für praktische Arbeitsmappenleistung.

### Häufige Fehlermodi

**`#SPILL!`**

Weist meist darauf hin, dass Zellen innerhalb eines dynamischen Array-Überlaufbereichs blockierenden Inhalt enthalten.

**Fix:** Entferne die blockierenden Zellen und lasse der Formel zu überlaufen.

---

**Dashboard meldet Verknüpfungsfehler**

Weist meist auf ein nicht registriertes Produkt, fehlende Rezeptdetails oder einen fehlenden Materialpreis hin.

**Fix:** Verwende die Verknüpfungsfehleranzahl des Dashboards, um die betroffene Transaktion oder das betroffene Produkt zu lokalisieren, und repariere dann die vorgelagerte Beziehung.

---

**Zutatenpreis ändert sich, aber Produktkosten erscheinen unverändert**

Die Quellarchitektur identifiziert nicht übereinstimmende IDs als wahrscheinliche Ursache.

**Fix:** Verifiziere, dass die von der Rezept-Engine verwendete `Item_ID` exakt mit der entsprechenden `Ingredient_ID` oder `Packaging_ID` in der Stammtabelle übereinstimmt.

### Empfohlene tägliche Betriebsabfolge

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

Das Betriebsprinzip ist einfach: **repariere die Datenkette, bevor du auf der Grundlage des KPI handelst.**

</details>

## Weitere Tools in dieser Serie

Eine wachsende Sammlung leichter Excel- und browserbasierter Entscheidungsunterstützungs-Tools für betriebliche Probleme wie Lagerabstimmung, Rentabilitätsanalyse, Kostenkontrolle, Arbeitskräfteplanung und Geschäftsberichterstattung.

Erkunde die verwandten Projekte über das Repository oder die zugehörige Produktsammlung.

## Lizenz

Dieses Projekt wird unter der **Apache License 2.0** veröffentlicht.

Du darfst das Projekt gemäß den Bedingungen der Apache License 2.0 verwenden, modifizieren, verteilen und anpassen.

Siehe die Lizenzdatei im Repository für den vollständigen Lizenztext.

---

**Ende des README**
