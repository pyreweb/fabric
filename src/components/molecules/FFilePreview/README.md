# FFilePreview

Composant de prévisualisation d'un fichier sélectionné, en cours de téléversement ou déjà attaché dans un formulaire. Fournit un feedback visuel immédiat lors de la gestion de pièces jointes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `fileName` | `String` | *requis* | Nom du fichier à afficher |
| `fileType` | `String` | `''` | Extension du fichier (ex: `pdf`, `jpg`). Si vide, déduit de `fileName` |
| `loading` | `Boolean` | `false` | Affiche le loader pendant le téléversement |
| `disabled` | `Boolean` | `false` | Désactive le bouton de suppression |
| `loadingLabel` | `String` | `'Téléversement en cours'` | Label pour le loader (accessibilité) |
| `removeLabel` | `String` | `'Supprimer le fichier'` | Label pour le bouton de suppression (accessibilité) |

## Événements

| Événement | Description |
|-----------|-------------|
| `remove` | Émis lors du clic sur le bouton de suppression |

## Types de fichiers supportés

Le composant affiche automatiquement une icône appropriée selon l'extension du fichier :

- **Documents** : pdf, doc, docx, xls, xlsx, ppt, pptx, txt, csv
- **Images** : jpg, jpeg, png, gif, svg, webp, bmp
- **Archives** : zip, rar, 7z, tar, gz

## Exemple d'utilisation

```vue
<template>
  <!-- Fichier chargé (état par défaut) -->
  <FFilePreview
    fileName="rapport-annuel.pdf"
    @remove="handleRemove"
  />

  <!-- Fichier en cours de téléversement -->
  <FFilePreview
    fileName="photo-profil.jpg"
    :loading="true"
  />

  <!-- Fichier avec type explicite -->
  <FFilePreview
    fileName="Document sans extension"
    fileType="pdf"
    @remove="handleRemove"
  />

  <!-- État désactivé -->
  <FFilePreview
    fileName="fichier-verrouillé.docx"
    :disabled="true"
  />

  <!-- Liste de fichiers -->
  <div class="space-y-2">
    <FFilePreview
      v-for="file in files"
      :key="file.id"
      :fileName="file.name"
      :loading="file.uploading"
      @remove="removeFile(file.id)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [
        { id: 1, name: 'document.pdf', uploading: false },
        { id: 2, name: 'image.png', uploading: true },
        { id: 3, name: 'archive.zip', uploading: false }
      ]
    }
  },
  methods: {
    handleRemove() {
      console.log('Fichier supprimé')
    },
    removeFile(id) {
      this.files = this.files.filter(f => f.id !== id)
    }
  }
}
</script>
```
