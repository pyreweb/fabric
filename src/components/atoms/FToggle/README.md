# FToggle

Interrupteurs à bascule on/off.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `false` | État activé/désactivé (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive le toggle |
| `color` | `String` | `'blue'` | Couleur : `blue`, `green`, `red`, `orange`, `purple` |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement d'état (pour v-model) |
| `change` | Émis lors du changement d'état |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Exemple d'utilisation

```vue
<template>
  <!-- Toggle simple -->
  <FToggle v-model="isEnabled" label="Activer les notifications" />

  <!-- Toggle avec couleur personnalisée -->
  <FToggle v-model="darkMode" label="Mode sombre" color="purple" />

  <!-- Toggle désactivé -->
  <FToggle v-model="locked" label="Option verrouillée" :disabled="true" />
</template>
```
