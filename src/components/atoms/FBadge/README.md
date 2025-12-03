# FBadge

Indicateurs visuels pour statuts, notifications ou compteurs.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `content` | `String \| Number` | `''` | Contenu du badge (texte ou nombre) |
| `variant` | `String` | `'primary'` | Variante : `primary`, `success`, `warning`, `error`, `neutral` |
| `shape` | `String` | `'pill'` | Forme : `pill`, `circle`, `rounded` |
| `size` | `String` | `'md'` | Taille : `sm`, `md`, `lg` |
| `dot` | `Boolean` | `false` | Affiche un simple point indicateur |
| `outlined` | `Boolean` | `false` | Affiche un badge avec bordure et fond transparent |
| `tag` | `String` | `'span'` | Balise HTML à utiliser pour le composant |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé (remplace `content`) |

## Exemple d'utilisation

```vue
<template>
  <!-- Badge avec texte -->
  <FBadge content="Nouveau" variant="success" />

  <!-- Badge numérique -->
  <FBadge content="42" variant="primary" shape="circle" />

  <!-- Badge point (notification) -->
  <FBadge dot variant="error" />

  <!-- Badge outlined -->
  <FBadge content="Beta" variant="primary" :outlined="true" />

  <!-- Badge avec taille personnalisée -->
  <FBadge content="Important" size="lg" variant="warning" />

  <!-- Badge avec slot -->
  <FBadge variant="success">
    <FIcon name="check" size="xs" /> Validé
  </FBadge>
</template>
```
