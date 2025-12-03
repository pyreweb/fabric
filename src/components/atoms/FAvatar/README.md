# FAvatar

Affichage d'avatars utilisateur avec image ou initiales en fallback.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `src` | `String` | `''` | URL de l'image de l'avatar |
| `alt` | `String` | `''` | Texte alternatif pour l'image |
| `initials` | `String` | `''` | Initiales à afficher (prioritaire sur `name`) |
| `name` | `String` | `''` | Nom complet (utilisé pour générer les initiales automatiquement) |
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` |
| `shape` | `String` | `'circle'` | Forme : `circle`, `square` |
| `status` | `String` | `null` | Indicateur de statut : `online`, `busy`, `away`, `offline` |
| `placeholderClass` | `String` | `'bg-gray-400 text-white'` | Classes CSS pour le placeholder (fallback) |

## Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic sur l'avatar |

## Exemple d'utilisation

```vue
<template>
  <!-- Avatar avec image -->
  <FAvatar src="/images/user.jpg" alt="Photo de profil" size="lg" />

  <!-- Avatar avec initiales -->
  <FAvatar initials="JD" size="md" shape="circle" />

  <!-- Avatar généré à partir du nom -->
  <FAvatar name="Jean Dupont" size="sm" />

  <!-- Avatar avec indicateur de statut -->
  <FAvatar name="Jean Dupont" size="md" status="online" />

  <!-- Avatar cliquable -->
  <FAvatar name="Jean Dupont" @click="handleAvatarClick" />
</template>
```
