# FLoader

Indicateurs de chargement animés.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `overlay` | `Boolean` | `false` | Affiche le loader en overlay plein écran |
| `centered` | `Boolean` | `false` | Centre le loader dans son conteneur |
| `label` | `String` | `'Chargement en cours'` | Label d'accessibilité |

## Exemple d'utilisation

```vue
<template>
  <!-- Loader simple -->
  <FLoader size="md" />

  <!-- Loader avec couleur personnalisée -->
  <FLoader size="lg" color="#3498db" />

  <!-- Loader en overlay -->
  <FLoader overlay size="xl" />

  <!-- Loader centré dans un conteneur -->
  <div style="position: relative; height: 200px;">
    <FLoader centered />
  </div>
</template>
```
