# FListItem

Composant de ligne standardisé pour l'affichage riche d'entités (utilisateurs, fichiers, tâches). Sert de brique fondamentale pour les listes complexes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre principal de l'élément |
| `subtitle` | `String` | `''` | Sous-titre ou métadonnées |
| `clickable` | `Boolean` | `false` | Rend l'élément cliquable avec effet hover |
| `selected` | `Boolean` | `false` | Affiche l'état sélectionné |
| `disabled` | `Boolean` | `false` | Désactive l'élément |
| `truncate` | `Boolean` | `true` | Tronque le texte si trop long |

## Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si `clickable` est true) |

## Slots

| Slot | Description |
|------|-------------|
| `left` | Zone gauche pour `FAvatar` ou `FCheckbox` |
| `content` | Contenu personnalisé sous le titre/sous-titre |
| `right` | Zone droite pour `FButton` ou `FBadge` |

## Exemple d'utilisation

```vue
<template>
  <!-- Liste d'utilisateurs -->
  <FListItem
    title="Jean Dupont"
    subtitle="Développeur Senior"
    :clickable="true"
    @click="handleUserClick"
  >
    <template #left>
      <FAvatar name="Jean Dupont" size="md" />
    </template>
    <template #right>
      <FBadge variant="success">En ligne</FBadge>
    </template>
  </FListItem>

  <!-- Élément avec checkbox -->
  <FListItem
    title="Document.pdf"
    subtitle="Modifié il y a 2 heures"
  >
    <template #left>
      <FCheckbox v-model="selected" />
    </template>
    <template #right>
      <FButton variant="text" size="small">
        <FIcon name="menu" />
      </FButton>
    </template>
  </FListItem>

  <!-- Élément sélectionné -->
  <FListItem
    title="Tâche importante"
    subtitle="Échéance : demain"
    :selected="true"
    :clickable="true"
  >
    <template #left>
      <FAvatar initials="TI" size="sm" />
    </template>
    <template #right>
      <FBadge variant="warning">Urgent</FBadge>
    </template>
  </FListItem>

  <!-- Élément désactivé -->
  <FListItem
    title="Élément indisponible"
    subtitle="Cette option n'est pas disponible"
    :disabled="true"
  >
    <template #left>
      <FAvatar size="sm" />
    </template>
  </FListItem>
</template>
```
