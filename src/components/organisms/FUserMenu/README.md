# FUserMenu

Composant organisme de menu utilisateur conçu pour s'intégrer dans une barre de navigation (navbar) ou un en-tête d'application. Il regroupe de manière cohérente les informations de l'utilisateur connecté et les actions relatives à son compte.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isLoggedIn` | `Boolean` | `true` | Contrôle l'affichage du composant (basé sur l'état de connexion) |
| `value` | `Boolean` | `false` | Contrôle l'état d'ouverture du menu (utiliser avec v-model) |
| `userName` | `String` | `''` | Nom d'affichage de l'utilisateur |
| `userEmail` | `String` | `''` | Adresse email de l'utilisateur |
| `avatarSrc` | `String` | `''` | URL de l'image de l'avatar |
| `avatarAlt` | `String` | `''` | Texte alternatif de l'avatar |
| `avatarInitials` | `String` | `''` | Initiales de l'avatar (si pas d'image) |
| `avatarName` | `String` | `''` | Nom pour calculer les initiales (utilise userName si non fourni) |
| `avatarSize` | `String` | `'md'` | Taille de l'avatar : `xs`, `sm`, `md`, `lg`, `xl` |
| `avatarStatus` | `String` | `null` | Indicateur de statut : `online`, `busy`, `away`, `offline` |
| `showUserName` | `Boolean` | `false` | Affiche le nom à côté de l'avatar dans le déclencheur |
| `showChevron` | `Boolean` | `true` | Affiche l'icône chevron dans le déclencheur |
| `showUserInfo` | `Boolean` | `true` | Affiche les informations utilisateur dans l'en-tête du dropdown |
| `menuItems` | `Array` | `[]` | Éléments du menu : `{ key?, label, icon?, disabled?, divider?, danger?, keepOpen? }` |
| `showLogout` | `Boolean` | `true` | Affiche le bouton de déconnexion |
| `logoutLabel` | `String` | `'Déconnexion'` | Libellé du bouton de déconnexion |
| `dropdownAlign` | `String` | `'right'` | Alignement du dropdown : `left`, `right` |
| `dropdownWidth` | `String` | `'w-56'` | Largeur du dropdown (classe Tailwind) |
| `menuAriaLabel` | `String` | `'Menu utilisateur'` | Label ARIA du menu |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement d'état (pour v-model) |
| `toggle` | Émis lors de l'ouverture/fermeture du menu. Retourne `boolean` |
| `close` | Émis lorsque le menu est fermé |
| `item-click` | Émis lors d'un clic sur un élément. Retourne `{ item, event }` |
| `navigate` | Émis lors d'un clic sur un élément de navigation. Retourne `{ item, event }` |
| `logout` | Émis lors d'un clic sur le bouton de déconnexion |

## Slots

| Slot | Description |
|------|-------------|
| `menu-items` | Contenu personnalisé pour les éléments du menu (remplace menuItems) |

## Fonctionnalités

- **Affichage conditionnel** : Masqué automatiquement si `isLoggedIn` est `false`
- **Avatar intégré** : Utilise `FAvatar` pour afficher l'image ou les initiales de l'utilisateur
- **Menu déroulant** : Déclenché par interaction avec l'avatar/nom
- **Éléments de navigation** : Utilise `FListItem` pour les liens du menu
- **Séparateurs** : Support des `FDivider` pour organiser les sections
- **Accessibilité (A11Y)** : Fermeture par touche Échap, attributs ARIA appropriés
- **Fermeture automatique** : Le menu se ferme au clic en dehors
- **v-model** : Support du two-way binding pour l'état d'ouverture

## Exemple d'utilisation

```vue
<template>
  <!-- Menu utilisateur simple -->
  <FUserMenu
    user-name="Jean Dupont"
    user-email="jean.dupont@exemple.fr"
    avatar-src="/images/user.jpg"
    avatar-status="online"
    :menu-items="menuItems"
    @logout="handleLogout"
    @navigate="handleNavigate"
  />

  <!-- Menu avec nom affiché et alignement à gauche -->
  <FUserMenu
    v-model="isMenuOpen"
    user-name="Marie Martin"
    avatar-initials="MM"
    show-user-name
    dropdown-align="left"
    :menu-items="menuItems"
    @logout="handleLogout"
  />

  <!-- Menu personnalisé avec slot -->
  <FUserMenu
    user-name="Admin"
    avatar-name="Admin User"
    :show-logout="false"
  >
    <template #menu-items>
      <FListItem title="Tableau de bord" clickable @click="goToDashboard">
        <template #left>
          <FIcon name="home" size="sm" />
        </template>
      </FListItem>
      <FDivider margin="sm" />
      <FListItem title="Paramètres" clickable @click="goToSettings">
        <template #left>
          <FIcon name="cog" size="sm" />
        </template>
      </FListItem>
      <FDivider margin="sm" />
      <FListItem title="Déconnexion" clickable @click="handleLogout">
        <template #left>
          <FIcon name="arrow-right" size="sm" class="text-red-500" />
        </template>
      </FListItem>
    </template>
  </FUserMenu>

  <!-- Masqué si non connecté -->
  <FUserMenu
    :is-logged-in="isAuthenticated"
    user-name="Utilisateur"
    :menu-items="menuItems"
    @logout="handleLogout"
  />
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isAuthenticated: true,
      menuItems: [
        { key: 'profile', label: 'Mon profil', icon: 'user' },
        { key: 'settings', label: 'Paramètres', icon: 'cog' },
        { divider: true },
        { key: 'help', label: 'Aide', icon: 'question' }
      ]
    }
  },
  methods: {
    handleLogout() {
      console.log('Déconnexion...')
      // Logique de déconnexion
    },
    handleNavigate({ item }) {
      console.log('Navigation vers:', item.key)
      // Navigation programmatique avec vue-router
      // this.$router.push(`/${item.key}`)
    },
    goToDashboard() {
      this.$router.push('/dashboard')
    },
    goToSettings() {
      this.$router.push('/settings')
    }
  }
}
</script>
```

## Structure du menu

Les éléments du menu (`menuItems`) peuvent avoir les propriétés suivantes :

| Propriété | Type | Description |
|-----------|------|-------------|
| `key` | `String` | Identifiant unique de l'élément |
| `label` | `String` | Texte affiché |
| `icon` | `String` | Nom de l'icône (voir FIcon) |
| `disabled` | `Boolean` | Désactive l'élément |
| `divider` | `Boolean` | Affiche un séparateur au lieu d'un élément |
| `danger` | `Boolean` | Style l'élément en rouge (action dangereuse) |
| `keepOpen` | `Boolean` | Garde le menu ouvert après le clic |
