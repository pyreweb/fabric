# FAlert

Messages d'alerte avec icône, texte et bouton de fermeture optionnel.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'info'` | Type d'alerte : `success`, `error`, `info` |
| `title` | `String` | `''` | Titre de l'alerte |
| `message` | `String` | `''` | Message principal de l'alerte |
| `closable` | `Boolean` | `true` | Affiche le bouton de fermeture |

## Événements

| Événement | Description |
|-----------|-------------|
| `close` | Émis lors de la fermeture de l'alerte |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé supplémentaire |

## Exemple d'utilisation

```vue
<template>
  <!-- Alerte de succès -->
  <FAlert 
    variant="success" 
    title="Opération réussie" 
    message="Vos modifications ont été enregistrées."
    @close="handleClose"
  />

  <!-- Alerte d'erreur -->
  <FAlert 
    variant="error" 
    title="Erreur" 
    message="Une erreur est survenue lors de la sauvegarde."
  />

  <!-- Alerte informative non fermable -->
  <FAlert 
    variant="info" 
    title="Information" 
    message="Cette fonctionnalité sera bientôt disponible."
    :closable="false"
  />

  <!-- Alerte avec contenu personnalisé -->
  <FAlert variant="info" title="Astuce">
    <p>Vous pouvez utiliser le raccourci <kbd>Ctrl+S</kbd> pour sauvegarder.</p>
  </FAlert>
</template>

<script>
export default {
  methods: {
    handleClose() {
      console.log('Alerte fermée')
    }
  }
}
</script>
```
