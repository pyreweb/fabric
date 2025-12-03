# FButton

Boutons d'action avec variantes et tailles multiples. Supporte les liens et le routage.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'primary'` | Style : `primary`, `secondary`, `danger`, `success`, `outline`, `ghost`, `link` |
| `size` | `String` | `'medium'` | Taille : `xs`, `small`, `medium`, `large`, `xl` |
| `type` | `String` | `'button'` | Type HTML : `button`, `submit`, `reset` |
| `disabled` | `Boolean` | `false` | Désactive le bouton |
| `loading` | `Boolean` | `false` | Affiche un indicateur de chargement |
| `loadingText` | `String` | `''` | Texte à afficher pendant le chargement |
| `block` | `Boolean` | `false` | Affiche le bouton en largeur complète |
| `to` | `String \| Object` | `null` | Route pour `router-link` (Vue Router) |
| `href` | `String` | `null` | URL pour lien externe (rendu en `<a>`) |
| `target` | `String` | `null` | Attribut target pour les liens (ex: `_blank`) |

## Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si non désactivé et non en chargement) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du bouton |
| `iconLeft` | Icône à gauche du texte |
| `iconRight` | Icône à droite du texte |

## Exemple d'utilisation

```vue
<template>
  <!-- Bouton primaire -->
  <FButton variant="primary" size="medium" @click="handleClick">
    Valider
  </FButton>

  <!-- Bouton outline -->
  <FButton variant="outline" size="small">
    Annuler
  </FButton>

  <!-- Bouton de soumission de formulaire -->
  <FButton type="submit" variant="primary" :disabled="isLoading">
    Envoyer
  </FButton>

  <!-- Bouton avec indicateur de chargement -->
  <FButton variant="primary" :loading="isSubmitting" loadingText="Envoi...">
    Envoyer
  </FButton>

  <!-- Bouton pleine largeur -->
  <FButton variant="primary" :block="true">
    Action principale
  </FButton>

  <!-- Bouton avec icônes -->
  <FButton variant="primary">
    <template #iconLeft>
      <FIcon name="plus" size="sm" />
    </template>
    Ajouter
  </FButton>

  <!-- Bouton comme lien externe -->
  <FButton variant="link" href="https://example.com" target="_blank">
    Voir plus
  </FButton>

  <!-- Bouton avec Vue Router -->
  <FButton variant="primary" :to="{ name: 'profile' }">
    Mon profil
  </FButton>
</template>
```
