[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Flora Pastry & Coffee Shop Operations Control System

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-brightgreen.svg)
![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-orange.svg)

**Suivez les ventes, la rentabilité des produits, l'exposition au stock, les coûts de main-d'œuvre, les flux de trésorerie et l'intégrité des données dans un seul classeur d'exploitation léger — gratuit dans le navigateur, avec une version Excel pour un contrôle plus poussé.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie satisfait ou remboursé de 30 jours, sans question.
>
> 🌐 **Ouvrir dans le navigateur** → [démo HTML en direct](https://hyvoid.github.io/Flora-Pastry-Coffee-Shop-Operating-Control-System/)
>
> 📥 **Télécharger Excel** → [version Excel / lien d'achat]()


## Ce que cela vous aide à suivre

* **La performance des ventes** — les revenus quotidiens, hebdomadaires, mensuels et annuels sans reconstruire des rapports séparés.
* **La vraie rentabilité des produits** — le coût BOM au niveau produit, le bénéfice brut, le pourcentage de coût alimentaire et la marge après les prix actuels des ingrédients et des emballages.
* **Les changements de coûts qui alimentent les décisions** — un prix d'ingrédient ou d'emballage modifié affecte immédiatement le coût de la recette et la rentabilité en aval.
* **L'exposition au stock** — les quantités actuelles, la valeur du stock, la consommation, les pertes et les alertes de stock bas.
* **La trésorerie et la pression d'exploitation** — les mouvements de trésorerie, les charges d'exploitation, les salaires et le bénéfice net résultant dans la même vue de direction.
* **Les problèmes d'intégrité des données** — les recettes manquantes, les produits non enregistrés ou les prix de matières manquants sont mis en évidence au lieu de produire silencieusement des chiffres de profit trompeurs.

## Flux de travail de démarrage rapide

1. **Définissez les paramètres clés.**
   Ouvrez `02_Settings_Control` et établissez les hypothèses d'exploitation utilisées dans l'ensemble du classeur, telles que la devise, le taux de taxe, la marge cible, le multiplicateur d'heures supplémentaires et le tampon de sécurité du stock. Ces paramètres sont maintenus de manière centralisée plutôt qu'intégrés dans chaque calcul individuel.

2. **Chargez les données d'exploitation.**
   Conservez les données maîtresses des ingrédients et des emballages, les recettes de produits, les transactions de vente, les enregistrements d'achat, les mouvements de stock, les heures des employés et les transactions de flux de trésorerie dans leurs feuilles désignées. Les informations existantes peuvent être transférées depuis des exports comptables ou d'autres tableurs vers les zones de saisie correspondantes.

3. **Obtenez le tableau d'exploitation.**
   Ouvrez `01_Dashboard`. Les ventes, le bénéfice brut, les charges d'exploitation, le bénéfice net, la position de trésorerie, les alertes de stock et les exceptions de liaison de données sont calculés à partir des enregistrements sous-jacents.

4. **Actualisez périodiquement.**
   Continuez à ajouter de nouvelles transactions et à mettre à jour les données maîtresses changeantes. Les paramètres globaux peuvent être modifiés de manière centralisée lorsque les hypothèses commerciales changent. Le classeur recalcule sans reconstruire la structure de reporting.

**Définissez quelques paramètres clés. Insérez les données d'exploitation. Obtenez l'analyse. Actualisez quand vous en avez besoin.**

## Pourquoi j'ai conçu ceci

Une pâtisserie et un café peuvent sembler rentables alors que les chiffres sous-jacents sont faux.

Le problème n'est pas toujours une mauvaise décision commerciale. Souvent, la décision repose sur un chiffre qui s'est silencieusement déconnecté de l'exploitation.

Par exemple, une recette peut utiliser un ingrédient dont le prix d'achat a augmenté. Si le coût de la recette n'est pas actualisé, la marge produit rapportée reste artificiellement élevée. Le même problème apparaît lorsqu'un produit est vendu avant que sa BOM n'ait été enregistrée : un coût manquant peut devenir un zéro numérique, donnant l'impression que le produit a une marge inhabituellement forte.

C'est l'échec que ce classeur est conçu pour prévenir.

Au lieu de traiter la rentabilité comme un rapport statique, le modèle connecte la chaîne d'exploitation :

**Coût ingrédient / emballage → Coût de recette → Bénéfice brut des ventes → Consommation de stock → Charges d'exploitation → Bénéfice net → Position de trésorerie**

Il sépare également les **valeurs de calcul** du **statut de diagnostic**. Un coût manquant peut renvoyer `0` en toute sécurité pour l'arithmétique en aval tandis qu'un champ `Link_Status` distinct identifie la relation manquante.

La différence pratique est significative.

**Avant :**
Un produit avec une recette manquante peut sembler avoir un coût BOM nul et donc une marge brute apparemment excellente.

**Après :**
Le même produit est signalé comme `🚨 Unregistered Product` ou `🚨 Missing Recipe Detail`, permettant de traiter la rentabilité rapportée comme incomplète plutôt que comme une preuve de forte performance.

Ce n'est pas destiné à remplacer un logiciel de comptabilité. C'est un cadre de raisonnement réutilisable et produit pour connecter les chiffres d'exploitation qui influencent les décisions quotidiennes.

## Problèmes courants de pâtisserie et de café que cela résout

| Problème                                                    | Sans cet outil                                                                         | Avec cet outil                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Les prix des ingrédients changent                                       | Les marges produit deviennent obsolètes jusqu'à ce que quelqu'un reconstruise manuellement le calcul des coûts                      | Les coûts actuels des ingrédients alimentent les coûts BOM des recettes et les marges produit                    |
| Une recette est incomplète                                           | Les coûts manquants peuvent apparaître comme zéro et créer une fausse rentabilité                           | `Link_Status` identifie les détails de recette manquants avant qu'ils ne deviennent une conclusion de direction |
| Les ventes sont enregistrées séparément du calcul des coûts                 | Les revenus sont visibles, mais le bénéfice brut au niveau produit nécessite un rapprochement manuel         | Les transactions de vente se connectent automatiquement aux coûts BOM actuels                              |
| Le stock est déconnecté des ventes                                               | Les niveaux de stock nécessitent des calculs séparés et des estimations de consommation manuelles               | Les quantités vendues et l'utilisation des recettes pilotent la consommation de matières et les alertes de stock                    |
| La main-d'œuvre et les charges d'exploitation sont en dehors du reporting produit | Le bénéfice brut peut sembler sain tandis que les salaires et les charges d'exploitation rongent le résultat de l'entreprise | Les salaires et les charges d'exploitation alimentent la vue de bénéfice net                                    |
| La trésorerie semble saine tandis que les obligations s'accumulent            | Les mouvements de trésorerie et les obligations d'achat impayées sont difficiles à rapprocher opérationnellement  | Les transactions de flux de trésorerie et les enregistrements d'achat/AP fournissent une vue d'exploitation combinée         |

## À qui cela s'adresse

Cette boîte à outils est conçue pour les **petites pâtisseries, boulangeries, cafés et entreprises alimentaires gérées par leur propriétaire** qui ont besoin de plus de contrôle opérationnel qu'un simple tableur de ventes, mais qui n'ont pas besoin d'une implémentation ERP d'entreprise complète.

Elle est particulièrement utile lorsque les prix des ingrédients évoluent fréquemment, que les recettes déterminent l'économie des produits, que le stock nécessite une surveillance active et que le propriétaire a besoin d'un seul endroit pour comprendre **ventes → coûts → profit → stock → salaires → trésorerie**.

Elle n'est pas conçue pour remplacer un système comptable statutaire, une plateforme de conformité des salaires, un POS ou un ERP d'entreprise.

**Aucune expertise en tableur nécessaire. Ouvrez la version navigateur et commencez à suivre immédiatement.** La version Excel est disponible lorsqu'un contrôle et une personnalisation au niveau du classeur sont requis.

## À propos

Je conçois des trackers opérationnels légers et des outils d'aide à la décision pour les situations où il y a trop de pièces mobiles à garder en tête, mais où un système d'entreprise complet ajouterait une complexité inutile.

La question centrale est simple :

> **Quelles informations doivent être réunies en un seul endroit pour prendre la prochaine décision avec confiance ?**

Flora est un exemple de cette approche. Plutôt que de construire un tableau de bord générique, le classeur connecte les relations opérationnelles spécifiques qui déterminent si la performance rapportée d'une pâtisserie et d'un café peut réellement être digne de confiance.

### Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</summary>

### Architecture du classeur

Flora est structuré comme un classeur d'exploitation à trois couches :

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

| Couche        | Feuille                     | Responsabilité principale                                                             |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| Présentation | `01_Dashboard`            | Revenus, bénéfice brut, bénéfice net, trésorerie, alertes de stock et santé des liaisons de données  |
| Contrôle      | `02_Settings_Control`     | Hypothèses et paramètres d'exploitation centraux                                       |
| Données maîtresses  | `03_Ingredient_Master`    | Identifiants d'ingrédients, unités, coûts actuels, fournisseurs, stock minimum                     |
| Données maîtresses  | `04_Packaging_Master`     | Identifiants d'emballage, unités, coûts actuels, fournisseurs                                     |
| Calcul  | `05_Recipe_Engine`        | Détail BOM, coûts des matières courants, coût produit, marge, diagnostics de liaison de recette     |
| Transactions | `06_Sales_Transactions`   | Activité de vente, revenus, coût BOM, bénéfice brut, taxe, diagnostics de liaison produit     |
| Stock    | `07_Inventory_Movement`   | Stock d'ouverture, achats, consommation des ventes, pertes, quantité actuelle, valeur du stock |
| Achats   | `08_Suppliers_Purchasing` | Bons de commande, transactions fournisseurs, statut de paiement, solde AP                 |
| Main-d'œuvre        | `09_Payroll_Employees`    | Heures régulières, heures supplémentaires, primes, pénalités, coût de la paie                          |
| Finances      | `10_Finance_CashFlow`     | Revenus, charges, mouvement de compte, impact net sur la trésorerie                                |

Le sens de dépendance envisagé est :

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

Cela crée la chaîne d'exploitation centrale :

**Coût ingrédient / emballage → Coût de recette → Bénéfice brut des ventes → Consommation de stock → Charges d'exploitation → Bénéfice net → Position de trésorerie**

L'architecture distingue également les **sorties de calcul** des **sorties de diagnostic**. Les calculs numériques peuvent utiliser `0` comme valeur de repli sûre en aval lorsqu'une recherche échoue, tandis que `Link_Status` expose le problème de données sous-jacent à la direction.

### Trois pièges qui surprennent même les exploitants expérimentés

#### Piège 1 — Une recette manquante ressemble à un produit à marge élevée

**1. Une décision a été prise.**
Un produit semble avoir une marge brute inhabituellement élevée, donc la direction envisage de conserver son prix de vente actuel et de prioriser le produit.

**2. La décision s'appuyait sur un chiffre défectueux.**
Le produit n'a pas de détail de recette complet, donc son coût BOM se résout à `0`.

**3. Le défaut change la recommandation.**
Un prix de vente de `$8.00` avec un coût BOM rapporté de `$0.00` produit une marge brute rapportée de `100%`.

**4. Pourquoi le raisonnement est incorrect.**
Le chiffre ne représente pas un produit réel à coût nul. Il représente des données de calcul des coûts incomplètes.

**5. Approche corrigée.**
Gardez la valeur de repli numérique sûre pour les calculs en aval, mais diagnostiquez indépendamment si une recette valide existe.

**6. Résultat décisionnel corrigé.**
Le produit est signalé comme `🚨 Missing Recipe Detail` plutôt que traité comme un produit à marge de 100 %.

**7. Logique de formule :**

<details>
<summary>Diagnostic du statut de liaison de recette</summary>

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

Le contrôle important n'est pas la valeur de repli `0` elle-même. C'est le statut de diagnostic séparé qui empêche que la valeur de repli soit prise pour la réalité commerciale.

</details>

---

#### Piège 2 — Un changement de coût ne se reflète pas dans l'économie des produits

**1. Une décision a été prise.**
La direction examine les marges produit et décide que la tarification actuelle reste acceptable.

**2. La décision s'appuyait sur une hypothèse défectueuse passée inaperçue.**
Le registre des ingrédients contient encore un coût d'achat obsolète.

**3. Le défaut change la recommandation.**
Le coût BOM rapporté est inférieur à la réalité d'achat actuelle, donc la marge rapportée est surestimée.

**4. Pourquoi le raisonnement est incorrect.**
Dans une activité pilotée par les recettes, le coût actuel des matières est une entrée directe de l'économie des produits. Un coût obsolète produit une marge obsolète.

**5. Approche corrigée.**
Conservez les coûts actuels des ingrédients et des emballages dans les tables maîtresses et laissez le Recipe Engine récupérer ces valeurs dynamiquement.

**6. Résultat décisionnel corrigé.**
Un coût d'ingrédient modifié se propage au coût de ligne de recette, au coût BOM total, au pourcentage de coût alimentaire et au pourcentage de marge sans reconstruire manuellement chaque calcul de produit.

**7. Logique de formule :**

<details>
<summary>Récupération du coût des matières courant</summary>

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

La recette ne stocke pas un prix historique de matière déconnecté comme source principale de calcul des coûts. Elle récupère le coût actuel des données maîtresses.

</details>

---

#### Piège 3 — Les revenus sont corrects mais la rentabilité ne l'est pas

**1. Une décision a été prise.**
Les revenus des ventes augmentent, donc la direction interprète la tendance comme une preuve que l'entreprise devient plus rentable.

**2. La décision s'appuyait sur une métrique incomplète.**
Les revenus seuls ne tiennent compte ni du coût BOM, ni des salaires, ni des charges d'exploitation, ni des mouvements de trésorerie.

**3. Le défaut change la recommandation.**
Une ligne de ventes en croissance peut coexister avec une marge brute en déclin, des charges de personnel en augmentation ou une disponibilité de trésorerie qui se détériore.

**4. Pourquoi le raisonnement est incorrect.**
La croissance du chiffre d'affaires répond à combien a été vendu. Elle ne répond pas à combien de valeur reste après les coûts d'exploitation.

**5. Approche corrigée.**
Évaluez la séquence liée des revenus, du coût BOM, du bénéfice brut, des charges d'exploitation, des salaires, du bénéfice net et des flux de trésorerie.

**6. Résultat décisionnel corrigé.**
La direction peut distinguer la croissance des ventes de l'amélioration opérationnelle réelle et identifier si la contrainte est la tarification, le coût des matières, la main-d'œuvre, les charges ou la liquidité.

**7. Logique de formule :**

<details>
<summary>Bénéfice net d'exploitation</summary>

```excel
=Gross_Profit - Total_Operating_Expenses
```

Dans l'architecture du tableau de bord, les charges d'exploitation combinent les transactions Finance classées comme `Expense` avec les totaux de paie.

</details>

### Scénario d'exemple

Considérons une pâtisserie au prix de **$8.00**.

Sa recette contient des ingrédients et des emballages avec un coût BOM actuel combiné de **$2.80**.

L'économie du produit est donc :

| Métrique              | Valeur |
| ------------------- | ----: |
| Selling Price       | $8.00 |
| BOM Cost            | $2.80 |
| Gross Profit / Unit | $5.20 |
| Food Cost %         | 35.0% |
| Gross Margin %      | 65.0% |

Si la marge cible dans `02_Settings_Control` est de **65%**, le produit atteint exactement la cible.

Supposons maintenant que le registre des ingrédients actuel est mis à jour et que le coût BOM courant de la recette monte à **$3.20**.

Le modèle change l'économie en :

| Métrique              |       Précédent |         Actualisé |
| ------------------- | -------------: | --------------: |
| Selling Price       |          $8.00 |           $8.00 |
| BOM Cost            |          $2.80 |           $3.20 |
| Gross Profit / Unit |          $5.20 |           $4.80 |
| Food Cost %         |          35.0% |           40.0% |
| Gross Margin %      |          65.0% |           60.0% |
| Target Status       | ✅ Meets Target | ⚠️ Below Target |

L'interprétation opérationnelle est plus utile que simplement observer que « les coûts des ingrédients ont augmenté ».

Le produit est passé d'une **marge de 65 % à la cible** à une **marge de 60 % sous la cible**. Si le prix n'est pas modifié, chaque unité supplémentaire vendue contribue moins de bénéfice brut qu'on ne le supposait auparavant.

La décision n'est donc plus « les ventes sont saines, garder la tarification inchangée ». La question pertinente devient de savoir si l'entreprise devrait **augmenter le prix, reformuler la recette, négocier le coût des matières, accepter la marge inférieure, ou reconsidérer le rôle du produit**.

Le même modèle porte ensuite le produit dans les transactions de vente, où la quantité réellement vendue détermine le revenu total et la consommation BOM totale. L'utilisation des recettes peut aussi alimenter la consommation de stock, tandis que les transactions de paie et de finances affectent le résultat d'exploitation plus large.

C'est l'usage envisagé du classeur : non pas seulement calculer des chiffres isolés, mais connecter les chiffres pour qu'un changement dans une hypothèse opérationnelle puisse être évalué face à la décision commerciale qui en résulte.

### Référence des formules

<details>
<summary>02_Settings_Control — Paramètres centraux</summary>

Les hypothèses globales sont maintenues de manière centralisée plutôt qu'intégrées comme valeurs codées en dur dans l'ensemble du classeur.

Exemples :

| Paramètre               | Exemple |
| ----------------------- | ------: |
| Currency                |     `$` |
| Tax Rate                |  `5.0%` |
| Target Margin           | `65.0%` |
| Overtime Multiplier     |  `1.50` |
| Inventory Safety Buffer | `20.0%` |

Exemple de référence de paramètre :

```excel
='02_Settings_Control'!$B$4
```

Cela permet de changer la marge cible une seule fois et de la propager à travers les calculs pertinents.

</details>

<details>
<summary>05_Recipe_Engine — Coût et marge du produit</summary>

**Coût BOM total**

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

Cela agrège les coûts des lignes de recette par `Product_ID`.

**Bénéfice brut, pourcentage de coût alimentaire, pourcentage de marge, statut cible, statut de liaison**

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

La couche de calcul sépare délibérément les sorties numériques des états de diagnostic. Cela empêche qu'une valeur de repli de recherche soit interprétée comme une preuve de coût nul.

</details>

<details>
<summary>06_Sales_Transactions — Revenus et profit par transaction</summary>

**Coût BOM unitaire**

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

**Sorties au niveau transaction**

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

La couche transaction connecte donc la quantité vendue réelle et le prix de vente réel au modèle de calcul des coûts produit actuel.

</details>

<details>
<summary>07_Inventory_Movement — Consommation et position de stock</summary>

**Quantité actuelle**

```excel
Current Qty =
Opening Qty + In Qty - Out Qty - Loss Qty
```

**Statut du stock**

```excel
=IF(Current_Qty<=Min_Stock,"🚨 Reorder Alert","✅ Normal")
```

**Valeur du stock**

```excel
=Current_Qty*Live_Unit_Cost
```

Le stock est donc traité comme une exposition d'exploitation plutôt que comme une simple liste de quantités : le stock actuel peut être évalué par rapport aux niveaux minimums et à la base de coût actuelle.

</details>

<details>
<summary>08_Suppliers_Purchasing — Logique d'achat et d'AP</summary>

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

`Total_PO_Amount` est calculé à partir de la quantité et du prix unitaire. `AP_Balance` inclut la valeur de la commande lorsque le statut de paiement est `Unpaid`.

</details>

<details>
<summary>09_Payroll_Employees — Coût de la main-d'œuvre</summary>

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

Le modèle garde les hypothèses d'heures supplémentaires centralisées et calcule la paie totale à partir des heures régulières, des heures supplémentaires, des primes et des pénalités.

</details>

<details>
<summary>10_Finance_CashFlow — Impact sur la trésorerie</summary>

```excel
=LET(
    types,FILTER(D2:D10000,A2:A10000<>""),
    amounts,FILTER(E2:E10000,A2:A10000<>""),
    IF(types="Income",amounts,-amounts)
)
```

Les revenus sont représentés comme un impact de trésorerie positif ; les charges sont représentées comme un impact de trésorerie négatif.

</details>

<details>
<summary>01_Dashboard — KPI de direction</summary>

**Revenu total des ventes**

```excel
=SUM('06_Sales_Transactions'!G2:G10000)
```

**Bénéfice brut total**

```excel
=SUM('06_Sales_Transactions'!I2:I10000)
```

**Marge brute**

```excel
=IF(B3>0,D3/B3,0)
```

**Charges d'exploitation**

```excel
=SUMIFS(
    '10_Finance_CashFlow'!E2:E10000,
    '10_Finance_CashFlow'!D2:D10000,
    "Expense"
)
+SUM('09_Payroll_Employees'!I2:I10000)
```

**Bénéfice net**

```excel
=Gross_Profit-Operating_Expenses
```

**Solde de trésorerie**

```excel
=SUM('10_Finance_CashFlow'!G2:G10000)
```

**Nombre d'alertes de stock**

```excel
=COUNTIF(
    '07_Inventory_Movement'!J2:J10000,
    "🚨 Reorder Alert"
)
```

**Nombre d'erreurs de liaison**

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

Le tableau de bord combine donc la performance commerciale avec des diagnostics de qualité des données plutôt que de présenter des métriques de rentabilité sans vérifier si leurs données en amont sont complètes.

</details>

<!-- Technical Details parent <details> intentionally remains OPEN for Part 3. -->
### Règles de validation

Le classeur utilise la validation à la fois au niveau du **calcul** et au niveau de la **logique métier**. Une valeur de repli numérique telle que `0` empêche les formules en aval de casser, tandis qu'un champ de diagnostic distinct identifie si la relation sous-jacente est réellement valide.

| Champ / Zone                   | Règle                                                                                          | Comportement en cas d'erreur                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Param_Value`                  | Les paramètres globaux doivent contenir des valeurs compatibles avec leur signification commerciale envisagée         | Les calculs en aval peuvent devenir incorrects si des valeurs invalides sont saisies ; une revue des paramètres est requise |
| `Ingredient_ID`                | Doit identifier un ingrédient de manière unique et correspondre aux références de recette                              | La recherche échouée renvoie `0` à des fins de calcul                                                       |
| `Current_Cost`                 | Devrait contenir le coût d'achat actuel de l'ingrédient                                  | Un coût manquant produit `⚠️ Material Cost Not Set` dans les diagnostics de recette                                   |
| `Packaging_ID`                 | Doit identifier le matériau d'emballage de manière unique et correspondre aux références de recette                         | La recherche échouée renvoie `0` à des fins de calcul                                                       |
| `Unit_Cost`                    | Devrait contenir le coût actuel de l'emballage                                                     | Un coût manquant peut entraîner un calcul de coût produit incomplet                                                    |
| `Product_ID`                   | Les transactions de vente doivent correspondre à un produit enregistré dans le Recipe Engine               | `🚨 Unregistered Product`                                                                                |
| Recipe detail                  | Chaque produit doit avoir au moins une ligne de recette associée                                    | `🚨 Missing Recipe Detail`                                                                               |
| Recipe material cost           | Les articles de recette doivent résoudre à un coût d'ingrédient ou d'emballage valide                             | `⚠️ Material Cost Not Set`                                                                               |
| Selling price                  | Doit être supérieur à zéro pour des calculs de marge significatifs                                  | Le pourcentage de coût alimentaire et le pourcentage de marge renvoient `0` lorsque le prix n'est pas positif                                           |
| Target margin                  | La marge produit est comparée à la cible centralisée dans `02_Settings_Control`            | `⚠️ Below Target` lorsque la marge est inférieure au seuil configuré                                          |
| Sales quantity                 | Doit représenter la quantité réellement vendue                                                       | Des quantités incorrectes affectent directement les revenus, les coûts, le profit et la consommation de stock                    |
| Inventory opening quantity     | Doit représenter la position de stock de départ réelle                                             | Une quantité d'ouverture incorrecte se propage dans le stock actuel                                                 |
| Inventory loss quantity        | Utilisée pour les déchets, la détérioration, l'expiration et les pertes d'inventaire                                  | Des valeurs de perte incorrectes faussent le stock actuel                                                          |
| Minimum stock                  | Définit le seuil de réapprovisionnement                                                                 | `🚨 Reorder Alert` lorsque la quantité actuelle est au niveau du stock minimum ou en dessous                                    |
| Purchase quantity / unit price | Les deux sont requis pour une valeur de commande significative                                                     | Des valeurs incorrectes faussent les totaux d'achat et d'AP                                                        |
| Payment status                 | `Unpaid` détermine si la valeur de la commande contribue au solde AP                                | Un statut autre que `Unpaid` est traité comme non exigible                                                        |
| Employee hours / rate          | Les heures régulières et les heures supplémentaires sont multipliées par les taux pertinents                               | Des entrées incorrectes affectent directement le coût de la paie                                                            |
| Finance transaction type       | `Income` est positif ; les autres transactions de charge enregistrées sont traitées comme un impact de trésorerie négatif | Une classification de transaction incorrecte change l'interprétation des flux de trésorerie                                    |
| Dynamic-array output area      | Les plages de déversement des formules doivent rester dégagées                                                 | Excel renvoie `#SPILL!`                                                                                  |
| Dashboard link diagnostics     | Les erreurs de liaison des ventes et des recettes devraient être examinées avant de se fier aux métriques de rentabilité                       | Le tableau de bord rapporte le nombre d'exceptions de liaison                                                          |

### Flux de validation opérationnelle

Le modèle de validation suit le même sens de dépendance que le modèle métier :

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

Un principe essentiel est que **la validité du calcul et la validité métier ne sont pas la même chose**.

Par exemple :

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

Cela empêche qu'un calcul Excel techniquement valide soit pris pour une conclusion métier valide.

### Contrôles d'intégrité inter-tables

Le classeur contient plusieurs dépendances multi-sauts qui nécessitent un contrôle explicite.

#### Sales → Recipe → Material Master

```text
06_Sales_Transactions
        ↓ Product_ID
05_Recipe_Engine
        ↓ Item_ID
03_Ingredient_Master / 04_Packaging_Master
```

Une relation manquante à n'importe quel point peut affecter le coût produit rapporté.

#### Sales → Recipe → Inventory

```text
06_Sales_Transactions
        ↓ Product_ID + Qty_Sold
05_Recipe_Engine
        ↓ Item_ID + Usage_Qty
07_Inventory_Movement
```

Cette relation convertit les ventes de produits en consommation de matières.

#### Purchasing → Inventory / AP

```text
08_Suppliers_Purchasing
        ├── Purchase Quantity
        ├── Unit Price
        └── Payment Status
                 ↓
        PO Amount / AP Balance
```

L'architecture sépare donc les quantités opérationnelles des obligations financières tout en conservant leur relation.

### Règles d'exploitation sans maintenance

Le classeur est conçu autour de formules à tableau dynamique et de paramètres centralisés.

1. **Ne copiez pas manuellement les formules vers le bas.**
   Les nouveaux enregistrements devraient être saisis dans les zones de saisie désignées.

2. **N'écrasez pas les cellules générées par formule.**
   Les plages de sortie à tableau dynamique doivent rester dégagées.

3. **Conservez les données maîtresses avant les données transactionnelles.**
   Les relations d'ingrédients, d'emballages et de recettes devraient exister avant que les ventes liées ne soient utilisées pour l'analyse de rentabilité.

4. **Changez les hypothèses globales de manière centralisée.**
   Le taux de taxe, la marge cible, le multiplicateur d'heures supplémentaires et le tampon de sécurité sont maintenus via `02_Settings_Control`.

5. **Examinez les diagnostics avant d'interpréter les KPI.**
   Un tableau de bord affichant des revenus et des bénéfices ne signifie pas automatiquement que chaque calcul sous-jacent est complet.

### Compatibilité Excel

L'architecture source s'appuie sur des fonctions Excel modernes, notamment :

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

L'implémentation cible donc **Microsoft 365 et Excel 2021 ou version ultérieure**, avec la fonctionnalité de tableau dynamique disponible.

L'architecture recommande de garder les tables individuelles en dessous d'environ **100 000 lignes** pour des performances pratiques du classeur.

### Modes de défaillance courants

**`#SPILL!`**

Indique généralement que des cellules dans une plage de déversement de tableau dynamique contiennent du contenu bloquant.

**Correctif :** supprimez les cellules obstructives et laissez la formule se déverser.

---

**Le tableau de bord rapporte des erreurs de liaison**

Indique généralement un produit non enregistré, un détail de recette manquant ou un prix de matière manquant.

**Correctif :** utilisez le nombre d'erreurs de liaison du tableau de bord pour localiser la transaction ou le produit affecté, puis réparez la relation en amont.

---

**Le prix d'un ingrédient change mais le coût du produit semble inchangé**

L'architecture source identifie des identifiants non appariés comme cause probable.

**Correctif :** vérifiez que l'`Item_ID` utilisé par le Recipe Engine correspond exactement à l'`Ingredient_ID` ou au `Packaging_ID` correspondant dans la table maîtresse.

### Séquence d'exploitation quotidienne recommandée

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

Le principe d'exploitation est simple : **réparez la chaîne de données avant d'agir sur le KPI.**

</details>

## Autres outils de cette série

Une collection croissante d'outils Excel légers et d'outils d'aide à la décision basés sur le navigateur pour des problèmes opérationnels tels que la réconciliation des stocks, l'analyse de rentabilité, le contrôle des coûts, la planification de la main-d'œuvre et le reporting d'entreprise.

Explorez les projets associés via le dépôt ou la collection de produits associée.

## Licence

Ce projet est publié sous la **Apache License 2.0**.

Vous pouvez utiliser, modifier, distribuer et adapter le projet conformément aux termes de la Apache License 2.0.

Voir le fichier de licence du dépôt pour le texte complet de la licence.

---

**Fin du README**
