# FPageHeader

Composant d'en-tête de page complet permettant d'uniformiser et de structurer la partie supérieure de chaque vue ou page de l'application. Il sert de point d'entrée contextuel pour l'utilisateur en combinant fil d'Ariane, titre, avatar et actions.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre principal de la page |
| `subtitle` | `String` | `''` | Sous-titre ou description optionnelle |
| `titleVariant` | `String` | `'h1'` | Variante typographique du titre : `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `truncateTitle` | `Boolean` | `false` | Tronquer le titre s'il dépasse |
| `breadcrumbItems` | `Array` | `[]` | Éléments du fil d'Ariane : `{ label: string, href?: string, icon?: string }` |
| `breadcrumbSeparatorIcon` | `String` | `'chevron-right'` | Icône de séparation du fil d'Ariane |
| `breadcrumbAriaLabel` | `String` | `'Fil d\'Ariane'` | Label ARIA du fil d'Ariane |
| `avatarSrc` | `String` | `''` | URL de l'image de l'avatar |
| `avatarAlt` | `String` | `''` | Texte alternatif de l'avatar |
| `avatarInitials` | `String` | `''` | Initiales de l'avatar (si pas d'image) |
| `avatarName` | `String` | `''` | Nom pour calculer les initiales |
| `avatarSize` | `String` | `'lg'` | Taille de l'avatar : `xs`, `sm`, `md`, `lg`, `xl` |
| `avatarShape` | `String` | `'circle'` | Forme de l'avatar : `circle`, `square` |
| `avatarStatus` | `String` | `null` | Indicateur de statut : `online`, `busy`, `away`, `offline` |
| `separator` | `Boolean` | `false` | Affiche un séparateur visuel sous l'en-tête |

## Événements

| Événement | Description |
|-----------|-------------|
| `breadcrumb-navigate` | Émis lors d'un clic sur un élément du fil d'Ariane. Retourne `{ item, index, event }` |

## Slots

| Slot | Description |
|------|-------------|
| `title` | Contenu personnalisé pour le titre |
| `subtitle` | Contenu personnalisé pour le sous-titre |
| `actions` | Actions à afficher sur la droite (ex: `FButtonGroup`, `FButton`) |

## Exemple d'utilisation

```vue
<template>
  <!-- En-tête simple avec titre -->
  <FPageHeader title="Tableau de bord" />

  <!-- En-tête avec fil d'Ariane -->
  <FPageHeader
    title="Détails du produit"
    :breadcrumb-items="[
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/produits' },
      { label: 'Détails du produit' }
    ]"
    @breadcrumb-navigate="handleNavigate"
  />

  <!-- En-tête avec avatar (page de profil) -->
  <FPageHeader
    title="Jean Dupont"
    subtitle="Administrateur - Actif depuis le 15 janvier 2024"
    avatar-src="/images/user.jpg"
    avatar-name="Jean Dupont"
    avatar-status="online"
    :breadcrumb-items="[
      { label: 'Utilisateurs', href: '/utilisateurs' },
      { label: 'Jean Dupont' }
    ]"
    separator
  />

  <!-- En-tête avec actions -->
  <FPageHeader
    title="Gestion des utilisateurs"
    subtitle="Liste complète des utilisateurs du système"
    :breadcrumb-items="breadcrumbItems"
    separator
  >
    <template #actions>
      <FButtonGroup>
        <FButton variant="outline">Exporter</FButton>
        <FButton variant="primary">Ajouter un utilisateur</FButton>
      </FButtonGroup>
    </template>
  </FPageHeader>

  <!-- En-tête complet avec slot personnalisé -->
  <FPageHeader
    :breadcrumb-items="breadcrumbItems"
    avatar-name="Entreprise XYZ"
    avatar-shape="square"
  >
    <template #title>
      <span class="flex items-center gap-2">
        Entreprise XYZ
        <FBadge variant="success">Vérifié</FBadge>
      </span>
    </template>
    <template #subtitle>
      Client Premium depuis 2020
    </template>
    <template #actions>
      <FButton variant="primary">Modifier</FButton>
    </template>
  </FPageHeader>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [
        { label: 'Tableau de bord', href: '/dashboard' },
        { label: 'Paramètres', href: '/dashboard/settings' },
        { label: 'Utilisateurs' }
      ]
    }
  },
  methods: {
    handleNavigate({ item, index, event }) {
      console.log('Navigation vers:', item.label)
      // Navigation programmatique avec vue-router
      // this.$router.push(item.href)
    }
  }
}
</script>
```

## Fonctionnalités

### Fil d'Ariane
Le composant intègre `FBreadcrumb` pour afficher le contexte de navigation. Les éléments sont passés via la prop `breadcrumbItems`. L'événement `breadcrumb-navigate` est émis lors d'un clic pour permettre la navigation programmatique.

### Avatar
L'avatar est optionnel et s'affiche automatiquement si l'une des props `avatarSrc`, `avatarInitials` ou `avatarName` est définie. Idéal pour les pages de détail d'entités (profil utilisateur, fiche client, etc.).

### Actions
Le slot `actions` permet d'intégrer des boutons d'action contextuels à la page. Utilisez `FButtonGroup` ou `FButton` selon vos besoins.

### Layout responsif
- **Mobile** : Le titre et les actions sont empilés verticalement
- **Desktop** : Le titre et les actions sont alignés horizontalement avec le titre à gauche et les actions à droite
