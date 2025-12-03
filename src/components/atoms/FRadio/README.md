# FRadio

Boutons radio pour sélections uniques au sein d'un groupe.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number \| Boolean` | *requis* | Valeur de l'option |
| `modelValue` | `String \| Number \| Boolean` | `null` | Valeur sélectionnée du groupe (v-model) |
| `name` | `String` | *requis* | Nom du groupe radio |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive le bouton radio |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

## Événements

| Événement | Description |
|-----------|-------------|
| `change` | Émis lors de la sélection (pour v-model) |

## Exemple d'utilisation

```vue
<template>
  <div>
    <FRadio v-model="selectedOption" name="options" value="option1" label="Option 1" />
    <FRadio v-model="selectedOption" name="options" value="option2" label="Option 2" />
    <FRadio v-model="selectedOption" name="options" value="option3" label="Option 3" :disabled="true" />
  </div>
</template>
```
