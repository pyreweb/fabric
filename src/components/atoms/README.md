# Atomes

## Définition

Les **atomes** sont les composants les plus fondamentaux et indivisibles de notre système de design. Inspirés de la méthodologie Atomic Design de Brad Frost, ils représentent les briques de base de l'interface utilisateur.

## Caractéristiques

- **Indivisibles** : Les atomes ne peuvent pas être décomposés en éléments plus petits sans perdre leur fonctionnalité.
- **Réutilisables** : Conçus pour être utilisés dans de multiples contextes à travers l'application.
- **Autonomes** : Chaque atome fonctionne de manière indépendante sans dépendance envers d'autres composants.
- **Configurables** : Personnalisables via des props pour s'adapter à différents cas d'usage.

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| `FAvatar` | Affichage d'avatars utilisateur (image ou initiales) |
| `FBadge` | Indicateurs visuels pour statuts ou notifications |
| `FButton` | Boutons d'action avec variantes et tailles multiples |
| `FCheckbox` | Cases à cocher pour sélections multiples |
| `FDivider` | Séparateurs visuels entre sections |
| `FIcon` | Icônes SVG avec support de tailles et couleurs |
| `FInput` | Champs de saisie texte |
| `FLoader` | Indicateurs de chargement animés |
| `FRadio` | Boutons radio pour sélections uniques |
| `FTextarea` | Zones de texte multi-lignes |
| `FToggle` | Interrupteurs à bascule on/off |
| `FTypography` | Éléments typographiques (titres, paragraphes) |

## Conventions de nommage

Tous les composants atomes suivent la convention de nommage `F` + `NomDuComposant` (ex: `FButton`, `FInput`).

## Utilisation

Les atomes sont destinés à être combinés pour former des **molécules** et des **organismes** plus complexes. Ils peuvent également être utilisés directement dans les templates lorsqu'un composant simple suffit.

```vue
<template>
  <FButton variant="primary" size="md">
    Cliquer ici
  </FButton>
</template>
```
