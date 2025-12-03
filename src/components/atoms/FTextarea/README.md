# FTextarea

Zones de texte multi-lignes avec compteur de caractères optionnel.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String` | `''` | Valeur du champ (v-model) |
| `label` | `String` | `''` | Label du champ |
| `placeholder` | `String` | `''` | Texte indicatif |
| `rows` | `Number \| String` | `3` | Nombre de lignes visibles |
| `disabled` | `Boolean` | `false` | Désactive le champ |
| `readonly` | `Boolean` | `false` | Rend le champ en lecture seule |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |
| `errorMessage` | `String` | `''` | Message d'erreur à afficher |
| `maxlength` | `Number \| String` | `null` | Nombre maximum de caractères |
| `showCounter` | `Boolean` | `false` | Affiche le compteur de caractères |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Exemple d'utilisation

```vue
<template>
  <!-- Textarea simple -->
  <FTextarea v-model="description" label="Description" placeholder="Entrez une description..." />

  <!-- Textarea avec compteur -->
  <FTextarea 
    v-model="bio" 
    label="Biographie" 
    :maxlength="280" 
    :showCounter="true"
    :rows="5"
  />

  <!-- Textarea avec erreur -->
  <FTextarea 
    v-model="comment" 
    :error="true" 
    errorMessage="Ce champ est obligatoire" 
  />
</template>
```
