# FBreadcrumb

Composant de navigation hiérarchique (fil d'Ariane) permettant à l'utilisateur de visualiser sa position dans l'arborescence de l'application et de naviguer vers les niveaux supérieurs.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `Array` | **requis** | Liste des éléments du fil d'Ariane. Chaque élément doit avoir un `label` (String), et peut avoir un `href` (String) et un `icon` (String). |
| `separatorIcon` | `String` | `'chevron-right'` | Nom de l'icône utilisée comme séparateur entre les éléments |
| `ariaLabel` | `String` | `'Fil d\'Ariane'` | Label ARIA pour l'accessibilité |

## Événements

| Événement | Description |
|-----------|-------------|
| `navigate` | Émis lors d'un clic sur un élément parent. Retourne un objet `{ item, index, event }` |

## Exemple d'utilisation

```vue
<template>
  <!-- Fil d'Ariane simple -->
  <FBreadcrumb 
    :items="[
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/produits' },
      { label: 'Détails du produit' }
    ]"
  />

  <!-- Fil d'Ariane avec icônes -->
  <FBreadcrumb 
    :items="[
      { label: 'Accueil', href: '/', icon: 'home' },
      { label: 'Utilisateurs', href: '/utilisateurs', icon: 'user' },
      { label: 'Profil' }
    ]"
  />

  <!-- Fil d'Ariane avec navigation programmatique -->
  <FBreadcrumb 
    :items="breadcrumbItems"
    @navigate="handleNavigate"
  />

  <!-- Fil d'Ariane avec séparateur personnalisé -->
  <FBreadcrumb 
    :items="breadcrumbItems"
    separatorIcon="arrow-right"
    ariaLabel="Navigation"
  />
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [
        { label: 'Tableau de bord', href: '/dashboard' },
        { label: 'Paramètres', href: '/dashboard/settings' },
        { label: 'Compte' }
      ]
    }
  },
  methods: {
    handleNavigate({ item, index, event }) {
      console.log('Navigation vers:', item.label)
      // Navigation programmatique avec vue-router par exemple
      // this.$router.push(item.href)
    }
  }
}
</script>
```
