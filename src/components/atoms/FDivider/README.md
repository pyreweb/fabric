# FDivider

Séparateurs visuels entre sections de contenu.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `orientation` | `String` | `'horizontal'` | Orientation : `horizontal`, `vertical` |
| `align` | `String` | `'center'` | Alignement du contenu : `left`, `center`, `right` |
| `color` | `String` | `'gray-300'` | Couleur de la ligne (classes Tailwind) |
| `textColor` | `String` | `'gray-500'` | Couleur du texte (classes Tailwind) |
| `textSize` | `String` | `'sm'` | Taille du texte (classes Tailwind) |
| `margin` | `String` | `'md'` | Espacement : `none`, `sm`, `md`, `lg` |
| `thickness` | `String` | `'thin'` | Épaisseur : `thin`, `medium`, `thick` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu à afficher au centre du divider |

## Exemple d'utilisation

```vue
<template>
  <!-- Divider simple -->
  <FDivider />

  <!-- Divider avec texte centré -->
  <FDivider align="center">OU</FDivider>

  <!-- Divider vertical -->
  <FDivider orientation="vertical" margin="md" />

  <!-- Divider coloré et épais -->
  <FDivider color="blue-500" thickness="medium" />

  <!-- Divider avec couleur de texte personnalisée -->
  <FDivider textColor="blue-600" textSize="xs">Section</FDivider>
</template>
```
