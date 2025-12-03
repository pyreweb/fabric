# FInput

Champs de saisie texte.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur du champ (v-model) |
| `type` | `String` | `'text'` | Type HTML (text, email, password, number, etc.) |
| `placeholder` | `String` | `''` | Texte indicatif |
| `size` | `String` | `'medium'` | Taille : `small`, `medium`, `large` |
| `disabled` | `Boolean` | `false` | Désactive le champ |
| `readonly` | `Boolean` | `false` | Rend le champ en lecture seule |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Exemple d'utilisation

```vue
<template>
  <!-- Input texte simple -->
  <FInput v-model="username" placeholder="Nom d'utilisateur" />

  <!-- Input email avec erreur -->
  <FInput v-model="email" type="email" :error="!isValidEmail" size="large" />

  <!-- Input désactivé -->
  <FInput v-model="readonly" :disabled="true" />
</template>
```
