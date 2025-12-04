# FNavigationSidebar

Composant organisme de barre latérale de navigation principale. Ce composant est le squelette structurel de l'application, fournissant une barre latérale persistante et hiérarchique pour la navigation globale.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `collapsed` | `Boolean` | `false` | Contrôle l'état réduit de la barre latérale |
| `title` | `String` | `''` | Titre affiché à côté du logo quand la barre est développée |
| `width` | `String` | `'256px'` | Largeur de la barre latérale développée |
| `collapsedWidth` | `String` | `'64px'` | Largeur de la barre latérale réduite |
| `collapsible` | `Boolean` | `true` | Permet de réduire/développer la barre |
| `items` | `Array` | `[]` | Configuration des éléments de navigation |
| `activeRoute` | `String` | `''` | Chemin de la route active pour déterminer l'état actif |
| `showThemeToggle` | `Boolean` | `false` | Affiche le toggle de thème dans le pied de page |
| `isDarkMode` | `Boolean` | `false` | État actuel du mode sombre |
| `themeToggleLabel` | `String` | `'Mode sombre'` | Libellé du toggle de thème |
| `position` | `String` | `'left'` | Position de la barre (`left`, `right`) |

### Structure des items

Chaque élément de navigation peut avoir la structure suivante :

```javascript
{
  id: 'unique-id',           // Identifiant unique (optionnel)
  label: 'Dashboard',        // Libellé affiché
  icon: 'home',              // Nom de l'icône (optionnel)
  href: '/dashboard',        // Lien URL standard (optionnel)
  to: '/dashboard',          // Route Vue Router (optionnel)
  badge: '5',                // Badge à afficher (optionnel)
  badgeVariant: 'primary',   // Variante du badge (optionnel)
  disabled: false,           // Désactive l'élément (optionnel)
  type: 'link',              // Type: 'link' | 'group' | 'divider'
  children: []               // Sous-éléments pour les menus dépliants (optionnel)
}
```

### Types d'éléments

- **`link`** (défaut) : Élément de navigation cliquable
- **`group`** : Label de groupe pour organiser visuellement les liens
- **`divider`** : Séparateur visuel horizontal

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:collapsed` | `Boolean` | Émis lors du changement d'état de réduction |
| `toggle` | `Boolean` | Émis lors du basculement de l'état réduit/développé |
| `submenu-toggle` | `{ item, open }` | Émis lors de l'ouverture/fermeture d'un sous-menu |
| `navigate` | `Object` | Émis lors du clic sur un élément de navigation |
| `item-click` | `Object` | Émis pour les éléments sans href/to (actions personnalisées) |
| `update:isDarkMode` | `Boolean` | Émis lors du changement du mode sombre |
| `theme-change` | `Boolean` | Émis lors du basculement du thème |

## Slots

| Slot | Description |
|------|-------------|
| `branding` | Contenu personnalisé pour la zone de branding (remplace le logo et titre par défaut) |
| `logo` | Slot pour le logo uniquement (utilisé par défaut dans branding) |
| `navigation` | Contenu de navigation personnalisé supplémentaire |
| `footer` | Contenu personnalisé pour le pied de page |

## Fonctionnalités

- **Navigation Hiérarchique** : Support des sous-menus dépliables pour organiser les liens complexes
- **État Actif Automatique** : Détection automatique de l'élément actif basée sur la route courante
- **Mode Compact** : Possibilité de réduire la barre en mode icônes uniquement
- **Groupes Visuels** : Organisation des liens par groupes avec labels et séparateurs
- **Branding Personnalisable** : Zone dédiée pour le logo et le titre de l'application
- **Actions Rapides** : Support du toggle de thème et autres actions dans le pied de page
- **Accessibilité (A11Y)** : Attributs ARIA appropriés et support clavier complet
- **Badges** : Support des badges pour indiquer des compteurs ou statuts

## Exemple d'utilisation

### Navigation basique

```vue
<template>
  <div class="flex h-screen">
    <f-navigation-sidebar
      :collapsed.sync="isCollapsed"
      :items="navigationItems"
      :active-route="currentRoute"
      title="Mon Application"
    >
      <template #logo>
        <img src="/logo.svg" alt="Logo" class="w-8 h-8" />
      </template>
    </f-navigation-sidebar>

    <main class="flex-1 overflow-auto">
      <!-- Contenu de la page -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      currentRoute: '/dashboard',
      navigationItems: [
        {
          id: 'dashboard',
          label: 'Tableau de bord',
          icon: 'home',
          to: '/dashboard'
        },
        {
          type: 'group',
          label: 'Gestion'
        },
        {
          id: 'users',
          label: 'Utilisateurs',
          icon: 'user',
          to: '/users',
          badge: '12'
        },
        {
          id: 'settings',
          label: 'Paramètres',
          icon: 'cog',
          children: [
            { label: 'Général', to: '/settings/general' },
            { label: 'Sécurité', to: '/settings/security' },
            { label: 'Notifications', to: '/settings/notifications' }
          ]
        }
      ]
    }
  }
}
</script>
```

### Avec toggle de thème

```vue
<template>
  <f-navigation-sidebar
    :collapsed.sync="isCollapsed"
    :items="navigationItems"
    :active-route="currentRoute"
    :show-theme-toggle="true"
    :is-dark-mode.sync="isDarkMode"
    theme-toggle-label="Thème sombre"
    title="Admin Panel"
  >
    <template #logo>
      <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold">A</span>
      </div>
    </template>
  </f-navigation-sidebar>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      isDarkMode: false,
      currentRoute: '/dashboard',
      navigationItems: [
        { label: 'Accueil', icon: 'home', to: '/' },
        { label: 'Projets', icon: 'folder', to: '/projects' },
        { type: 'divider' },
        { label: 'Aide', icon: 'question', href: '/help' }
      ]
    }
  }
}
</script>
```

### Avec pied de page personnalisé

```vue
<template>
  <f-navigation-sidebar
    :collapsed.sync="isCollapsed"
    :items="navigationItems"
    :active-route="$route.path"
  >
    <template #branding>
      <div class="flex items-center gap-2">
        <img src="/logo.svg" class="w-10 h-10" />
        <div v-if="!isCollapsed">
          <f-typography variant="h6">Fabric</f-typography>
          <f-typography variant="caption">v1.0.0</f-typography>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="space-y-2">
        <f-list-item
          title="Déconnexion"
          clickable
          @click="logout"
        >
          <template #left>
            <f-icon name="external-link" size="md" />
          </template>
        </f-list-item>
      </div>
    </template>
  </f-navigation-sidebar>
</template>
```

### Navigation avec groupes

```vue
<template>
  <f-navigation-sidebar
    :items="navigationItems"
    :active-route="$route.path"
  />
</template>

<script>
export default {
  data() {
    return {
      navigationItems: [
        { label: 'Tableau de bord', icon: 'home', to: '/' },
        
        { type: 'group', label: 'Commerce' },
        { label: 'Produits', icon: 'folder', to: '/products' },
        { label: 'Commandes', icon: 'document', to: '/orders', badge: '3' },
        { label: 'Clients', icon: 'user', to: '/customers' },
        
        { type: 'group', label: 'Marketing' },
        { label: 'Campagnes', icon: 'mail', to: '/campaigns' },
        { label: 'Promotions', icon: 'star', to: '/promotions' },
        
        { type: 'divider' },
        
        { label: 'Paramètres', icon: 'cog', to: '/settings' }
      ]
    }
  }
}
</script>
```
