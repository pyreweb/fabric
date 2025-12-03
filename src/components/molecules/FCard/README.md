# FCard

Conteneurs de contenu avec en-tête, corps, zone média et actions.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre de la carte |
| `subtitle` | `String` | `''` | Sous-titre de la carte |
| `clickable` | `Boolean` | `false` | Rend la carte cliquable avec effet hover |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la carte |

## Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si `clickable` est true) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal de la carte |
| `header` | En-tête personnalisé (remplace title/subtitle) |
| `media` | Zone média (images, vidéos) |
| `actions` | Zone d'actions (boutons) |

## Exemple d'utilisation

```vue
<template>
  <!-- Carte simple avec titre -->
  <FCard title="Titre de la carte" subtitle="Sous-titre optionnel">
    <p>Contenu de la carte avec du texte descriptif.</p>
  </FCard>

  <!-- Carte cliquable -->
  <FCard 
    title="Article" 
    :clickable="true"
    @click="navigateToArticle"
  >
    <p>Cliquez pour voir plus de détails...</p>
  </FCard>

  <!-- Carte avec image et actions -->
  <FCard title="Produit">
    <template #media>
      <img src="/images/produit.jpg" alt="Photo du produit" />
    </template>
    
    <p>Description du produit disponible à l'achat.</p>
    
    <template #actions>
      <FButton variant="primary" size="small">Acheter</FButton>
      <FButton variant="outline" size="small">Détails</FButton>
    </template>
  </FCard>

  <!-- Carte sans bordure avec en-tête personnalisé (nécessite l'import de FAvatar et FTypography) -->
  <FCard :bordered="false">
    <template #header>
      <div class="flex items-center gap-2">
        <FAvatar name="Jean Dupont" size="sm" />
        <span class="font-medium">Jean Dupont</span>
      </div>
    </template>
    
    <p>Message de l'utilisateur...</p>
  </FCard>
</template>
```
