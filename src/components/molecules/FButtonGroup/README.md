# FButtonGroup

Composant molécule permettant de regrouper visuellement des boutons adjacents en une seule entité cohérente.

## Fonctionnalités

- **Composition** : Regroupe une série de composants `FButton` adjacents.
- **Style visuel** : Les boutons sont collés (pas de marge entre eux), avec gestion automatique des bordures arrondies et des doubles bordures.
- **Mode toggle** : Support de la sélection unique ou multiple via la gestion d'état dans le composant parent.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `ariaLabel` | `String` | `'Groupe de boutons'` | Label d'accessibilité pour le groupe |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du groupe (boutons FButton) |

## Styles automatiques

Le composant applique automatiquement les styles CSS suivants aux boutons enfants :
- Suppression des bordures arrondies sur tous les boutons
- Bordures arrondies à gauche uniquement sur le premier bouton
- Bordures arrondies à droite uniquement sur le dernier bouton
- Décalage négatif pour éviter les doubles bordures
- Z-index supérieur au focus pour garder la bordure visible

## Exemple d'utilisation

### Groupe de boutons simple

```vue
<template>
  <f-button-group>
    <f-button variant="outline">Gauche</f-button>
    <f-button variant="outline">Centre</f-button>
    <f-button variant="outline">Droite</f-button>
  </f-button-group>
</template>
```

### Groupe avec sélection unique (toggle)

```vue
<template>
  <f-button-group aria-label="Sélecteur de vue">
    <f-button 
      :variant="selectedView === 'list' ? 'primary' : 'outline'"
      @click="selectedView = 'list'"
    >
      <template #iconLeft>
        <f-icon name="list" size="sm" />
      </template>
      Liste
    </f-button>
    <f-button 
      :variant="selectedView === 'grid' ? 'primary' : 'outline'"
      @click="selectedView = 'grid'"
    >
      <template #iconLeft>
        <f-icon name="grid" size="sm" />
      </template>
      Grille
    </f-button>
  </f-button-group>
</template>

<script>
export default {
  data() {
    return {
      selectedView: 'list'
    }
  }
}
</script>
```

### Groupe avec sélection multiple

```vue
<template>
  <f-button-group aria-label="Filtres">
    <f-button 
      v-for="filter in filters"
      :key="filter.value"
      :variant="selectedFilters.includes(filter.value) ? 'primary' : 'outline'"
      @click="toggleFilter(filter.value)"
    >
      {{ filter.label }}
    </f-button>
  </f-button-group>
</template>

<script>
export default {
  data() {
    return {
      filters: [
        { value: 'new', label: 'Nouveau' },
        { value: 'popular', label: 'Populaire' },
        { value: 'trending', label: 'Tendance' }
      ],
      selectedFilters: []
    }
  },
  methods: {
    toggleFilter(value) {
      const index = this.selectedFilters.indexOf(value)
      if (index > -1) {
        this.selectedFilters.splice(index, 1)
      } else {
        this.selectedFilters.push(value)
      }
    }
  }
}
</script>
```

### Barre d'outils avec actions groupées

```vue
<template>
  <FButtonGroup aria-label="Options de formatage">
    <FButton variant="outline" size="small">
      <template #iconLeft>
        <FIcon name="bold" size="sm" />
      </template>
    </FButton>
    <FButton variant="outline" size="small">
      <template #iconLeft>
        <FIcon name="italic" size="sm" />
      </template>
    </FButton>
    <FButton variant="outline" size="small">
      <template #iconLeft>
        <FIcon name="underline" size="sm" />
      </template>
    </FButton>
  </FButtonGroup>
</template>
```

## Cas d'usage

- Sélecteurs de vue (Liste/Grille)
- Filtres de tri
- Barres d'outils avec actions connexes
- Groupes d'options de formatage
- Navigation segmentée
