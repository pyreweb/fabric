# Atomes

## Définition

Les **atomes** sont les composants les plus fondamentaux et indivisibles de notre système de design. Inspirés de la méthodologie Atomic Design de Brad Frost, ils représentent les briques de base de l'interface utilisateur.

## Caractéristiques

- **Indivisibles** : Les atomes ne peuvent pas être décomposés en éléments plus petits sans perdre leur fonctionnalité.
- **Réutilisables** : Conçus pour être utilisés dans de multiples contextes à travers l'application.
- **Autonomes** : Chaque atome fonctionne de manière indépendante sans dépendance envers d'autres composants.
- **Configurables** : Personnalisables via des props pour s'adapter à différents cas d'usage.

## Conventions de nommage

Tous les composants atomes suivent la convention de nommage `F` + `NomDuComposant` (ex: `FButton`, `FInput`).

---

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| [FAvatar](./FAvatar/README.md) | Affichage d'avatars utilisateur avec image ou initiales en fallback. |
| [FBadge](./FBadge/README.md) | Indicateurs visuels pour statuts, notifications ou compteurs. |
| [FButton](./FButton/README.md) | Boutons d'action avec variantes et tailles multiples. |
| [FCheckbox](./FCheckbox/README.md) | Cases à cocher pour sélections multiples. |
| [FDivider](./FDivider/README.md) | Séparateurs visuels entre sections de contenu. |
| [FIcon](./FIcon/README.md) | Icônes SVG avec support de tailles et couleurs personnalisées. |
| [FInput](./FInput/README.md) | Champs de saisie texte. |
| [FLoader](./FLoader/README.md) | Indicateurs de chargement animés. |
| [FRadio](./FRadio/README.md) | Boutons radio pour sélections uniques au sein d'un groupe. |
| [FTextarea](./FTextarea/README.md) | Zones de texte multi-lignes avec compteur de caractères optionnel. |
| [FToggle](./FToggle/README.md) | Interrupteurs à bascule on/off. |
| [FTypography](./FTypography/README.md) | Éléments typographiques pour titres et textes. |
