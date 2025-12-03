# FSearchBar

Barre de recherche avec icône et bouton optionnel.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur du champ de recherche (v-model) |
| `placeholder` | `String` | `'Rechercher...'` | Texte indicatif |
| `size` | `String` | `'medium'` | Taille : `small`, `medium`, `large` |
| `iconPosition` | `String` | `'inside'` | Position de l'icône : `inside`, `outside` |
| `buttonMode` | `Boolean` | `false` | Affiche un bouton de recherche au lieu de l'icône |
| `buttonLabel` | `String` | `'Rechercher'` | Texte du bouton (si `buttonMode` est true) |
| `disabled` | `Boolean` | `false` | Désactive la barre de recherche |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `search` | Émis lors de la soumission (appui sur Entrée ou clic sur le bouton) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Méthodes

| Méthode | Description |
|---------|-------------|
| `focus()` | Met le focus sur le champ de recherche |

## Exemple d'utilisation

```vue
<template>
  <!-- Barre de recherche simple -->
  <FSearchBar 
    v-model="searchQuery"
    placeholder="Rechercher un article..."
    @search="handleSearch"
  />

  <!-- Barre de recherche avec bouton -->
  <FSearchBar 
    v-model="searchQuery"
    :buttonMode="true"
    buttonLabel="Chercher"
    @search="handleSearch"
  />

  <!-- Barre de recherche avec icône externe -->
  <FSearchBar 
    v-model="searchQuery"
    iconPosition="outside"
    size="large"
    @search="handleSearch"
  />

  <!-- Barre de recherche désactivée -->
  <FSearchBar 
    v-model="searchQuery"
    :disabled="true"
  />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch(query) {
      console.log('Recherche:', query)
      // Logique de recherche...
    }
  }
}
</script>
```
