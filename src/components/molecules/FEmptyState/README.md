# FEmptyState

Composant visuel dédié à l'affichage des états "vides" (absence de données). Il guide l'utilisateur lorsqu'aucun contenu n'est disponible.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `icon` | `String` | `'folder'` | Nom de l'icône à afficher (utilise FIcon) |
| `title` | `String` | **requis** | Titre de l'état vide (ex: "Aucun résultat") |
| `description` | `String` | `''` | Description optionnelle expliquant l'état vide |
| `actionLabel` | `String` | `''` | Label du bouton d'action (CTA). Si vide, le bouton n'est pas affiché |
| `actionVariant` | `String` | `'primary'` | Variante du bouton : `primary`, `secondary`, `outline`, `ghost` |

## Événements

| Événement | Description |
|-----------|-------------|
| `action` | Émis lors du clic sur le bouton d'action |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé supplémentaire affiché entre la description et le bouton |

## Exemple d'utilisation

```vue
<template>
  <!-- État vide simple -->
  <FEmptyState
    icon="search"
    title="Aucun résultat"
    description="Aucun élément ne correspond à votre recherche."
  />

  <!-- État vide avec action -->
  <FEmptyState
    icon="folder"
    title="Dossier vide"
    description="Ce dossier ne contient aucun fichier."
    actionLabel="Créer un fichier"
    @action="createFile"
  />

  <!-- État vide avec bouton de réinitialisation -->
  <FEmptyState
    icon="search"
    title="Aucun résultat trouvé"
    description="Essayez de modifier vos critères de recherche."
    actionLabel="Réinitialiser les filtres"
    actionVariant="outline"
    @action="resetFilters"
  />

  <!-- État vide avec contenu personnalisé -->
  <FEmptyState
    icon="document"
    title="Pas encore de documents"
    description="Commencez par ajouter votre premier document."
  >
    <div class="flex gap-2 mt-4">
      <FButton variant="primary">Importer</FButton>
      <FButton variant="outline">Créer</FButton>
    </div>
  </FEmptyState>
</template>

<script>
export default {
  methods: {
    createFile() {
      console.log('Création d\'un fichier')
    },
    resetFilters() {
      console.log('Réinitialisation des filtres')
    }
  }
}
</script>
```
