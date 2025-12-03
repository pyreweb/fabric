# FDataTable

Composant de tableau de données pour l'affichage et la gestion structurée de grandes quantités de données. Ce composant orchestre plusieurs sous-composants : `FSearchBar`, `FButtonGroup`, `FPagination`, `FCheckbox`, et `FEmptyState`.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `Array` | `[]` | Tableau d'objets de données à afficher |
| `columns` | `Array` | **requis** | Définitions des colonnes : `{ key: string, label: string, sortable?: boolean, align?: 'left'\|'center'\|'right' }` |
| `rowKey` | `String` | `'id'` | Propriété unique pour identifier chaque ligne |
| `selectable` | `Boolean` | `false` | Active la sélection de lignes avec des cases à cocher |
| `selected` | `Array` | `[]` | Clés des lignes sélectionnées (v-model:selected) |
| `searchable` | `Boolean` | `false` | Active la fonctionnalité de recherche |
| `searchPlaceholder` | `String` | `'Rechercher...'` | Placeholder du champ de recherche |
| `paginated` | `Boolean` | `true` | Active la pagination |
| `perPage` | `Number` | `10` | Nombre d'éléments par page |
| `page` | `Number` | `1` | Page courante (v-model:page) |
| `totalItems` | `Number` | `null` | Nombre total d'éléments (mode serveur) |
| `serverMode` | `Boolean` | `false` | Mode serveur - le tri/filtrage/pagination sont gérés en externe |
| `loading` | `Boolean` | `false` | État de chargement |
| `defaultSortKey` | `String` | `null` | Clé de tri par défaut |
| `defaultSortDirection` | `String` | `'asc'` | Direction de tri par défaut : `asc`, `desc` |
| `size` | `String` | `'medium'` | Taille du composant : `small`, `medium`, `large` |
| `emptyIcon` | `String` | `'folder'` | Icône de l'état vide |
| `emptyTitle` | `String` | `'Aucune donnée'` | Titre de l'état vide |
| `emptyDescription` | `String` | `'Il n\'y a aucun élément à afficher.'` | Description de l'état vide |
| `emptyActionLabel` | `String` | `''` | Label du bouton d'action de l'état vide |
| `striped` | `Boolean` | `false` | Style de lignes alternées |
| `hoverable` | `Boolean` | `true` | Effet hover sur les lignes |
| `bordered` | `Boolean` | `false` | Bordures autour du tableau |

## Événements

| Événement | Description |
|-----------|-------------|
| `update:page` | Émis lors du changement de page |
| `update:selected` | Émis lors du changement de sélection |
| `sort` | Émis lors du tri avec `{ key, direction }` |
| `search` | Émis lors d'une recherche |
| `page-change` | Émis lors du changement de page |
| `row-click` | Émis lors du clic sur une ligne |
| `select` | Émis lors de la sélection d'une ligne `{ row, selected }` |
| `select-all` | Émis lors de la sélection/désélection de toutes les lignes |
| `empty-action` | Émis lors du clic sur le bouton d'action de l'état vide |

## Slots

| Slot | Description |
|------|-------------|
| `actions` | Actions personnalisées dans la toolbar (reçoit `{ selectedItems }`) |
| `cell-{key}` | Contenu personnalisé pour une cellule (reçoit `{ value, row, column }`) |

## Exemple d'utilisation

```vue
<template>
  <!-- Tableau simple -->
  <FDataTable
    :data="users"
    :columns="columns"
  />

  <!-- Tableau avec recherche et sélection -->
  <FDataTable
    :data="users"
    :columns="columns"
    searchable
    selectable
    :selected.sync="selectedUsers"
    @select="handleSelect"
  >
    <template #actions="{ selectedItems }">
      <FButtonGroup>
        <FButton variant="danger" :disabled="selectedItems.length === 0">
          Supprimer ({{ selectedItems.length }})
        </FButton>
        <FButton variant="outline">Exporter</FButton>
      </FButtonGroup>
    </template>
  </FDataTable>

  <!-- Tableau avec colonnes personnalisées -->
  <FDataTable
    :data="products"
    :columns="productColumns"
    :per-page="5"
    striped
    bordered
  >
    <template #cell-price="{ value }">
      <span class="font-semibold text-green-600">{{ value }} €</span>
    </template>
    <template #cell-status="{ value }">
      <FBadge :variant="value === 'active' ? 'success' : 'warning'">
        {{ value }}
      </FBadge>
    </template>
  </FDataTable>

  <!-- Tableau en mode serveur -->
  <FDataTable
    :data="serverData"
    :columns="columns"
    server-mode
    :total-items="totalCount"
    :loading="isLoading"
    :page.sync="currentPage"
    searchable
    @search="fetchData"
    @sort="fetchData"
    @page-change="fetchData"
  />
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin' },
        { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'Utilisateur' },
        { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', role: 'Éditeur' }
      ],
      columns: [
        { key: 'name', label: 'Nom' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Rôle', sortable: true }
      ],
      selectedUsers: [],
      currentPage: 1,
      totalCount: 100,
      serverData: [],
      isLoading: false
    }
  },
  methods: {
    handleSelect({ row, selected }) {
      console.log('Sélection:', row, selected)
    },
    async fetchData({ key, direction, page, query } = {}) {
      this.isLoading = true
      // Appel API avec les paramètres de tri/pagination/recherche
      // this.serverData = await api.getUsers({ sort: key, order: direction, page, search: query })
      this.isLoading = false
    }
  }
}
</script>
```

## Fonctionnalités

### Tri
Les colonnes sont triables par défaut. Cliquez sur l'en-tête d'une colonne pour trier. L'icône indique la direction du tri (ascendant/descendant).

### Recherche
Activez `searchable` pour afficher une barre de recherche. En mode client, la recherche filtre sur toutes les colonnes. En mode serveur, l'événement `search` est émis.

### Pagination
La pagination est activée par défaut. En mode client, les données sont automatiquement paginées. En mode serveur, utilisez `totalItems` et écoutez `page-change`.

### Sélection
Activez `selectable` pour permettre la sélection de lignes. La case à cocher dans l'en-tête permet de sélectionner/désélectionner toutes les lignes de la page courante.

### État vide
L'état vide est automatiquement affiché lorsqu'il n'y a aucune donnée à afficher. Personnalisez-le avec `emptyIcon`, `emptyTitle`, `emptyDescription` et `emptyActionLabel`.
