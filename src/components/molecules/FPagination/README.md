# FPagination

Composant de navigation permettant le découpage de données volumineuses en pages distinctes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Number` | `1` | Page courante (v-model) |
| `totalPages` | `Number` | **requis** | Nombre total de pages |
| `maxVisiblePages` | `Number` | `5` | Nombre maximum de pages dans la fenêtre centrale (min: 3). Les première et dernière pages sont toujours affichées en plus. |
| `size` | `String` | `'medium'` | Taille des boutons : `small`, `medium`, `large` |
| `variant` | `String` | `'outline'` | Variante des boutons : `outline`, `ghost` |
| `previousLabel` | `String` | `'Précédent'` | Texte du bouton précédent |
| `nextLabel` | `String` | `'Suivant'` | Texte du bouton suivant |
| `showLabels` | `Boolean` | `true` | Affiche les textes des boutons (sinon sr-only) |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement de page (pour v-model) |
| `change` | Émis lors du changement de page avec le numéro de page |

## Exemple d'utilisation

```vue
<template>
  <!-- Pagination simple -->
  <FPagination 
    v-model="currentPage"
    :totalPages="10"
  />

  <!-- Pagination avec style ghost -->
  <FPagination 
    v-model="currentPage"
    :totalPages="20"
    variant="ghost"
    size="small"
  />

  <!-- Pagination avec labels personnalisés -->
  <FPagination 
    v-model="currentPage"
    :totalPages="15"
    previousLabel="Retour"
    nextLabel="Suite"
    @change="handlePageChange"
  />

  <!-- Pagination compacte sans labels -->
  <FPagination 
    v-model="currentPage"
    :totalPages="50"
    :showLabels="false"
    :maxVisiblePages="7"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handlePageChange(page) {
      console.log('Page sélectionnée:', page)
      // Charger les données de la page...
    }
  }
}
</script>
```
