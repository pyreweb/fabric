# FCheckbox

Cases à cocher pour sélections multiples.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `Boolean` | `false` | État coché/non coché (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive la checkbox |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

## Événements

| Événement | Description |
|-----------|-------------|
| `change` | Émis lors du changement d'état (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé du label (remplace `label`) |

## Exemple d'utilisation

```vue
<template>
  <FCheckbox v-model="acceptTerms" label="J'accepte les conditions" />

  <FCheckbox v-model="newsletter" label="Recevoir la newsletter" :disabled="true" />

  <FCheckbox v-model="required" label="Champ obligatoire" :error="hasError" />

  <!-- Avec slot pour contenu personnalisé -->
  <FCheckbox v-model="terms">
    J'accepte les <a href="/terms">conditions d'utilisation</a>
  </FCheckbox>
</template>
```
