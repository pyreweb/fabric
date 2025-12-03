# FFileUpload

Composant organisme pour la sélection, la prévisualisation, la validation et l'envoi de fichiers par l'utilisateur. Fournit une solution complète avec une zone de glisser-déposer, des indicateurs de progression et une gestion des états de fichiers.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Array` | `[]` | Liste des fichiers (pour v-model). Chaque fichier contient : `{ id, name, file, status, progress }` |
| `accept` | `String` | `''` | Types de fichiers acceptés (MIME ou extensions). Ex: `'image/*,.pdf,.doc'` |
| `multiple` | `Boolean` | `false` | Autoriser la sélection de plusieurs fichiers |
| `maxSize` | `Number` | `0` | Taille maximale par fichier en octets (0 = illimité) |
| `maxFiles` | `Number` | `0` | Nombre maximum de fichiers autorisés (0 = illimité) |
| `disabled` | `Boolean` | `false` | Désactive le composant |
| `showButton` | `Boolean` | `true` | Affiche le bouton de sélection dans la zone de dépôt |
| `showProgress` | `Boolean` | `true` | Affiche la barre de progression pendant l'envoi |
| `dropZoneLabel` | `String` | `'Glissez-déposez vos fichiers ici'` | Texte de la zone de dépôt |
| `buttonLabel` | `String` | `'Parcourir'` | Texte du bouton de sélection |
| `hint` | `String` | `''` | Texte d'aide affiché sous le label |
| `loadingLabel` | `String` | `'Téléversement en cours'` | Label du loader (accessibilité) |
| `progressLabel` | `String` | `'Progression'` | Label de la barre de progression |
| `errorSizeMessage` | `String` | `'Le fichier dépasse la taille maximale autorisée'` | Message d'erreur pour la validation de taille |
| `errorTypeMessage` | `String` | `'Ce type de fichier n\'est pas autorisé'` | Message d'erreur pour la validation de type |
| `errorMaxFilesMessage` | `String` | `'Nombre maximum de fichiers atteint'` | Message d'erreur pour le nombre max de fichiers |
| `successMessage` | `String` | `'Fichier(s) téléversé(s) avec succès'` | Message de succès après l'envoi |

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Array` | Émis lors de la modification de la liste des fichiers (v-model) |
| `files-selected` | `Array` | Émis après la sélection de nouveaux fichiers validés |
| `file-removed` | `Object` | Émis lors de la suppression d'un fichier |
| `files-cleared` | - | Émis lors de la suppression de tous les fichiers |
| `upload-start` | `Object` | Émis au début de l'envoi d'un fichier |
| `upload-progress` | `{ file, progress }` | Émis lors de la mise à jour de la progression |
| `upload-success` | `Object` | Émis après l'envoi réussi d'un fichier |
| `upload-error` | `{ file, error }` | Émis en cas d'erreur d'envoi |
| `upload-complete` | `Array` | Émis lorsque tous les fichiers sont envoyés |
| `upload-all` | `Array` | Émis lors du déclenchement de l'envoi de tous les fichiers |

## Slots

| Slot | Description |
|------|-------------|
| `label` | Contenu personnalisé pour le label de la zone de dépôt |

## Méthodes (accessibles via $refs)

| Méthode | Description |
|---------|-------------|
| `startUpload(fileId)` | Démarre l'envoi d'un fichier spécifique |
| `updateProgress(fileId, progress)` | Met à jour la progression d'un fichier (0-100) |
| `markAsSuccess(fileId)` | Marque un fichier comme envoyé avec succès |
| `markAsError(fileId, errorMessage)` | Marque un fichier en erreur |
| `clearFiles()` | Supprime tous les fichiers |
| `getPendingFiles()` | Retourne les fichiers en attente d'envoi |
| `uploadAll()` | Déclenche l'envoi de tous les fichiers en attente |

## États des fichiers

Le composant gère quatre états pour chaque fichier :

| État | Description |
|------|-------------|
| `pending` | Fichier sélectionné, en attente d'envoi |
| `uploading` | Fichier en cours d'envoi |
| `success` | Fichier envoyé avec succès |
| `error` | Erreur lors de l'envoi |

## Fonctionnalités

- **Glisser-déposer** : Zone de dépôt avec feedback visuel lors du survol
- **Sélection par bouton** : Bouton configurable pour déclencher le sélecteur de fichiers natif
- **Validation** : Validation des types de fichiers et de la taille maximale
- **Prévisualisation** : Affichage des fichiers sélectionnés avec l'état de progression
- **Progression** : Barre de progression globale pendant l'envoi
- **Messages** : Alertes de succès et d'erreur intégrées
- **v-model** : Support du two-way binding pour la liste des fichiers
- **Accessibilité** : Labels appropriés et support du clavier

## Exemple d'utilisation

```vue
<template>
  <!-- Upload simple d'un seul fichier -->
  <FFileUpload
    v-model="files"
    accept="image/*"
    :max-size="5242880"
    hint="Formats acceptés : JPG, PNG, GIF (max 5 Mo)"
    @files-selected="handleFilesSelected"
  />

  <!-- Upload multiple avec limite -->
  <FFileUpload
    v-model="documents"
    accept=".pdf,.doc,.docx"
    :multiple="true"
    :max-files="5"
    :max-size="10485760"
    drop-zone-label="Déposez vos documents ici"
    button-label="Sélectionner des fichiers"
    hint="PDF, DOC, DOCX - Max 10 Mo par fichier"
    @files-selected="uploadDocuments"
  />

  <!-- Avec gestion de l'envoi vers une API -->
  <FFileUpload
    ref="uploader"
    v-model="uploadFiles"
    :multiple="true"
    accept="image/*,.pdf"
    @upload-start="onUploadStart"
    @upload-complete="onUploadComplete"
  />
  <FButton @click="startUpload">Envoyer tous les fichiers</FButton>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      documents: [],
      uploadFiles: []
    }
  },
  methods: {
    handleFilesSelected(files) {
      console.log('Fichiers sélectionnés:', files)
      // Déclencher l'upload automatiquement
      files.forEach(file => {
        this.uploadFile(file)
      })
    },
    async uploadFile(fileObj) {
      const uploader = this.$refs.uploader
      uploader.startUpload(fileObj.id)
      
      try {
        // Simulation d'un upload avec progression
        const formData = new FormData()
        formData.append('file', fileObj.file)
        
        // Avec XMLHttpRequest pour le suivi de progression
        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            uploader.updateProgress(fileObj.id, progress)
          }
        })
        
        xhr.onload = () => {
          if (xhr.status === 200) {
            uploader.markAsSuccess(fileObj.id)
          } else {
            uploader.markAsError(fileObj.id, 'Erreur serveur')
          }
        }
        
        xhr.onerror = () => {
          uploader.markAsError(fileObj.id, 'Erreur réseau')
        }
        
        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      } catch (error) {
        uploader.markAsError(fileObj.id, error.message)
      }
    },
    uploadDocuments(files) {
      console.log('Documents à envoyer:', files)
    },
    startUpload() {
      this.$refs.uploader.uploadAll()
    },
    onUploadStart(file) {
      console.log('Début upload:', file.name)
    },
    onUploadComplete(files) {
      console.log('Tous les fichiers envoyés:', files)
    }
  }
}
</script>
```

## Intégration avec FForm

```vue
<template>
  <FForm @submit="handleSubmit">
    <FFormField
      v-model="form.name"
      label="Nom du projet"
      required
    />
    
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-700">
        Pièces jointes
      </label>
      <FFileUpload
        v-model="form.attachments"
        :multiple="true"
        accept=".pdf,.doc,.docx,.jpg,.png"
        :max-size="5242880"
        hint="Documents et images (max 5 Mo)"
      />
    </div>
    
    <template #actions>
      <FButton variant="outline" @click="cancel">Annuler</FButton>
      <FButton variant="primary" type="submit">Enregistrer</FButton>
    </template>
  </FForm>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        attachments: []
      }
    }
  },
  methods: {
    handleSubmit() {
      // Récupérer les fichiers pour l'envoi
      const filesToUpload = this.form.attachments.map(f => f.file)
      console.log('Fichiers à envoyer:', filesToUpload)
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>
```
