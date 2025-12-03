# FFilterSidebar

Composant organisme de barre latérale de filtres complexes. Idéal pour les pages d'index et les vues de listes nécessitant des mécanismes de filtrage avancés et catégorisés, permettant aux utilisateurs d'affiner efficacement de grands jeux de données.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `true` | Contrôle la visibilité de la barre latérale (utiliser avec v-model) |
| `title` | `String` | `'Filtres'` | Titre affiché dans l'en-tête de la barre latérale |
| `applyLabel` | `String` | `'Appliquer les filtres'` | Libellé du bouton d'application |
| `resetLabel` | `String` | `'Réinitialiser'` | Libellé du bouton de réinitialisation |
| `closable` | `Boolean` | `true` | Affiche le bouton de fermeture dans l'en-tête |
| `position` | `String` | `'left'` | Position de la barre (`left`, `right`) |
| `width` | `String` | `'280px'` | Largeur de la barre latérale |
| `filterGroups` | `Array` | `[]` | Configuration des groupes de filtres |
| `filters` | `Object` | `{}` | Valeurs initiales des filtres |
| `mobileBreakpoint` | `Number` | `768` | Point de rupture pour le comportement mobile (en pixels) |

### Structure filterGroups

Chaque groupe de filtres doit avoir la structure suivante :

```javascript
{
  id: 'unique-id',           // Identifiant unique (optionnel)
  title: 'Nom du groupe',    // Titre affiché dans l'accordéon
  name: 'groupName',         // Clé utilisée dans l'objet filters
  type: 'checkbox',          // Type: 'checkbox' | 'radio' | 'toggle' | 'text'
  defaultOpen: true,         // Accordéon ouvert par défaut
  options: [
    { value: 'opt1', label: 'Option 1', disabled: false },
    { value: 'opt2', label: 'Option 2' }
  ]
}
```

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Boolean` | Émis lors du changement d'état d'ouverture (pour v-model) |
| `close` | - | Émis lorsque la barre latérale est fermée |
| `apply` | `Object` | Émis lors de l'application des filtres avec toutes les valeurs |
| `submit` | `Object` | Alias pour l'événement `apply` |
| `reset` | - | Émis lors de la réinitialisation des filtres |
| `filter-change` | `Object` | Émis à chaque modification d'un filtre |
| `update:filters` | `Object` | Émis pour synchroniser les filtres avec `.sync` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé des filtres (remplace les groupes automatiques) |

## Fonctionnalités

- **Organisation par Accordéons** : Les filtres sont regroupés par catégorie dans des `FAccordionItem` repliables
- **Types de filtres multiples** : Support des checkboxes, radios, toggles et champs texte
- **v-model** : Support du two-way binding pour l'état d'ouverture
- **Comportement Mobile** : Overlay avec animation slide-in/out sous le point de rupture
- **Blocage du scroll** : Le défilement de la page est bloqué en mode mobile quand la barre est ouverte
- **Actions intégrées** : Boutons "Appliquer" et "Réinitialiser" inclus
- **Accessibilité (A11Y)** : Attributs ARIA appropriés et support clavier

## Exemple d'utilisation

### Configuration avec filterGroups

```vue
<template>
  <div class="flex">
    <!-- Bouton pour mobile -->
    <FButton
      class="lg:hidden"
      @click="showFilters = true"
    >
      Filtres
    </FButton>

    <!-- Barre de filtres -->
    <FFilterSidebar
      v-model="showFilters"
      title="Filtrer les produits"
      :filter-groups="filterGroups"
      :filters="activeFilters"
      @apply="handleApplyFilters"
      @reset="handleResetFilters"
    />

    <!-- Contenu principal -->
    <main class="flex-1 p-4">
      <!-- Liste des produits -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilters: true,
      activeFilters: {
        categories: ['electronics'],
        priceRange: 'medium',
        availability: { inStock: true, preOrder: false }
      },
      filterGroups: [
        {
          id: 'categories',
          title: 'Catégories',
          name: 'categories',
          type: 'checkbox',
          defaultOpen: true,
          options: [
            { value: 'electronics', label: 'Électronique' },
            { value: 'clothing', label: 'Vêtements' },
            { value: 'books', label: 'Livres' },
            { value: 'home', label: 'Maison' }
          ]
        },
        {
          id: 'price',
          title: 'Gamme de prix',
          name: 'priceRange',
          type: 'radio',
          options: [
            { value: 'low', label: 'Moins de 50€' },
            { value: 'medium', label: '50€ - 200€' },
            { value: 'high', label: 'Plus de 200€' }
          ]
        },
        {
          id: 'availability',
          title: 'Disponibilité',
          name: 'availability',
          type: 'toggle',
          options: [
            { value: 'inStock', label: 'En stock' },
            { value: 'preOrder', label: 'Précommande' }
          ]
        }
      ]
    }
  },
  methods: {
    handleApplyFilters(filters) {
      console.log('Filtres appliqués:', filters)
      // Appliquer les filtres à votre liste de données
    },
    handleResetFilters() {
      this.activeFilters = {}
      console.log('Filtres réinitialisés')
    }
  }
}
</script>
```

### Utilisation avec slot personnalisé

```vue
<template>
  <FFilterSidebar
    v-model="showFilters"
    title="Filtres avancés"
    @apply="handleApply"
  >
    <FAccordionItem title="Statut" :default-open="true">
      <div class="space-y-2">
        <FCheckbox v-model="filters.active" label="Actif" />
        <FCheckbox v-model="filters.verified" label="Vérifié" />
      </div>
    </FAccordionItem>

    <FAccordionItem title="Date de création">
      <FFormField
        v-model="filters.dateFrom"
        label="Du"
        type="date"
      />
      <FFormField
        v-model="filters.dateTo"
        label="Au"
        type="date"
      />
    </FAccordionItem>

    <FAccordionItem title="Options">
      <FToggle v-model="filters.premium" label="Premium uniquement" />
      <FRadio
        v-model="filters.sortOrder"
        name="sortOrder"
        value="asc"
        label="Croissant"
      />
      <FRadio
        v-model="filters.sortOrder"
        name="sortOrder"
        value="desc"
        label="Décroissant"
      />
    </FAccordionItem>
  </FFilterSidebar>
</template>
```

### Position à droite avec personnalisation

```vue
<template>
  <FFilterSidebar
    v-model="showFilters"
    title="Affiner la recherche"
    position="right"
    apply-label="Rechercher"
    reset-label="Effacer tout"
    :closable="false"
    :filter-groups="filterGroups"
    @apply="search"
  />
</template>
```
