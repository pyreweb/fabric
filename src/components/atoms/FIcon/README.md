# FIcon

Icônes SVG avec support de tailles et couleurs personnalisées.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `name` | `String` | `''` | Nom de l'icône (voir liste ci-dessous) |
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` ou valeur personnalisée (ex: `24px`) |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `decorative` | `Boolean` | `true` | Indique si l'icône est décorative (aria-hidden) |
| `label` | `String` | `''` | Label d'accessibilité (si non décoratif) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu SVG personnalisé (remplace l'icône par défaut) |

## Icônes disponibles

**Navigation** : `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`

**Actions** : `check`, `x`, `plus`, `minus`, `search`, `menu`, `close`, `refresh`, `edit`, `trash`, `copy`

**Statuts** : `info`, `warning`, `error`, `success`, `question`

**UI Commun** : `user`, `home`, `cog`, `bell`, `heart`, `star`, `eye`, `eye-off`, `lock`, `unlock`, `mail`, `calendar`, `clock`, `download`, `upload`, `link`, `external-link`, `folder`, `document`

## Exemple d'utilisation

```vue
<template>
  <!-- Icône simple -->
  <FIcon name="check" size="md" />

  <!-- Icône avec couleur personnalisée -->
  <FIcon name="heart" size="lg" color="#e74c3c" />

  <!-- Icône accessible (non décorative) -->
  <FIcon name="warning" :decorative="false" label="Attention" />
</template>
```
