# FModal

Composant modale de dialogue pour les interactions utilisateur nécessitant un focus temporaire et bloquant. Idéal pour les confirmations, formulaires d'édition rapides ou affichage de notifications importantes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `false` | Contrôle la visibilité de la modale (utiliser avec v-model) |
| `title` | `String` | `''` | Titre de la modale affiché dans l'en-tête |
| `subtitle` | `String` | `''` | Sous-titre optionnel affiché sous le titre |
| `closable` | `Boolean` | `true` | Affiche le bouton de fermeture dans l'en-tête |
| `closeOnOverlay` | `Boolean` | `true` | Ferme la modale au clic sur l'overlay |
| `closeOnEscape` | `Boolean` | `true` | Ferme la modale à l'appui sur la touche Échap |
| `size` | `String` | `'medium'` | Taille de la modale (`small`, `medium`, `large`, `full`) |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la modale |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement d'état (pour v-model) |
| `close` | Émis lorsque la modale est fermée |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal de la modale (alias pour `body`) |
| `header` | En-tête personnalisé (remplace title/subtitle) |
| `body` | Corps de la modale |
| `actions` | Zone d'actions (boutons) alignée à droite |

## Fonctionnalités

- **Accessibilité (A11Y)** : Fermeture par touche Échap, attributs ARIA appropriés
- **Blocage du scroll** : Le défilement de la page est bloqué quand la modale est ouverte
- **Overlay** : Fond semi-transparent avec fermeture au clic (configurable)
- **v-model** : Support du two-way binding pour l'état d'ouverture

## Exemple d'utilisation

```vue
<template>
  <!-- Modale simple avec titre -->
  <FModal
    v-model="isOpen"
    title="Confirmation"
    subtitle="Cette action est irréversible"
  >
    <p>Êtes-vous sûr de vouloir continuer ?</p>
    
    <template #actions>
      <FButton variant="outline" @click="isOpen = false">Annuler</FButton>
      <FButton variant="danger" @click="confirm">Confirmer</FButton>
    </template>
  </FModal>

  <!-- Modale avec en-tête personnalisé -->
  <FModal v-model="isFormOpen" size="large">
    <template #header>
      <div class="flex items-center gap-2">
        <FIcon name="edit" />
        <span class="font-semibold">Modifier le profil</span>
      </div>
    </template>
    
    <template #body>
      <FForm @submit="handleSubmit">
        <FFormField label="Nom" v-model="form.name" />
        <FFormField label="Email" v-model="form.email" type="email" />
      </FForm>
    </template>
    
    <template #actions>
      <FButtonGroup>
        <FButton variant="outline" @click="isFormOpen = false">Annuler</FButton>
        <FButton variant="primary" type="submit">Enregistrer</FButton>
      </FButtonGroup>
    </template>
  </FModal>

  <!-- Modale non fermable par overlay -->
  <FModal
    v-model="isAlertOpen"
    title="Attention"
    :close-on-overlay="false"
    size="small"
  >
    <p>Cette action nécessite votre attention.</p>
    
    <template #actions>
      <FButton variant="primary" @click="isAlertOpen = false">Compris</FButton>
    </template>
  </FModal>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isFormOpen: false,
      isAlertOpen: false,
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    confirm() {
      // Action de confirmation
      this.isOpen = false
    },
    handleSubmit() {
      // Traitement du formulaire
      this.isFormOpen = false
    }
  }
}
</script>
```
