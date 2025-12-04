# FProfileSection

Le composant `FProfileSection` est un organisme spécifiquement conçu pour l'affichage et l'édition unifiée d'un sous-ensemble d'informations d'une entité (comme le profil utilisateur, les détails d'un produit, ou un bloc de paramètres). Il gère le basculement entre les modes **lecture** et **édition** dans un conteneur clairement délimité.

## Fonctionnalités

- **Mode lecture** : Affichage des données statiques
- **Mode édition** : Formulaire avec contrôles `FFormField` et `FTextarea`
- **Basculement** : Bouton "Modifier" pour passer en mode édition
- **Avatar** : Intégration de `FAvatar` avec possibilité de modification
- **Actions** : Boutons "Enregistrer" et "Annuler"
- **Validation** : Validation du formulaire avant soumission
- **Messages** : Affichage des messages de succès/erreur via `FAlert`
- **Chargement** : Indicateurs d'état (loading, submitting)

## Utilisation

### Utilisation basique avec slots

```vue
<template>
  <f-profile-section
    v-model="userData"
    title="Informations personnelles"
    subtitle="Gérez vos informations de profil"
    :avatar-src="userData.avatar"
    :avatar-name="userData.fullName"
    :submitting="isSaving"
    @submit="handleSave"
  >
    <template #read-fields="{ data }">
      <div class="space-y-2">
        <p><strong>Nom :</strong> {{ data.lastName }}</p>
        <p><strong>Prénom :</strong> {{ data.firstName }}</p>
        <p><strong>Email :</strong> {{ data.email }}</p>
      </div>
    </template>

    <template #edit-fields="{ formData, errors }">
      <f-form-field
        v-model="formData.lastName"
        label="Nom"
        required
        :error-message="errors.lastName"
      />
      <f-form-field
        v-model="formData.firstName"
        label="Prénom"
        required
        :error-message="errors.firstName"
      />
      <f-form-field
        v-model="formData.email"
        label="Email"
        type="email"
        required
        :error-message="errors.email"
      />
    </template>
  </f-profile-section>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        lastName: 'Dupont',
        firstName: 'Jean',
        email: 'jean.dupont@example.com',
        avatar: '/avatar.jpg',
        fullName: 'Jean Dupont'
      },
      isSaving: false
    }
  },
  methods: {
    handleSave({ data, done, fail }) {
      this.isSaving = true
      
      // Simulation d'un appel API
      setTimeout(() => {
        this.isSaving = false
        // En cas de succès
        done('Profil mis à jour avec succès')
        // En cas d'erreur
        // fail('Erreur lors de la mise à jour')
      }, 1000)
    }
  }
}
</script>
```

### Utilisation avec génération automatique des champs

```vue
<template>
  <f-profile-section
    v-model="userData"
    title="Informations de contact"
    :fields="fields"
    :validate="validateForm"
    :submitting="isSaving"
    @submit="handleSave"
  />
</template>

<script>
export default {
  data() {
    return {
      userData: {
        phone: '0612345678',
        address: '123 Rue Example',
        bio: 'Développeur passionné'
      },
      fields: [
        { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
        { name: 'address', label: 'Adresse', type: 'text' },
        { name: 'bio', label: 'Biographie', type: 'textarea', rows: 4 }
      ],
      isSaving: false
    }
  },
  methods: {
    validateForm(data) {
      const errors = {}
      if (!data.phone) {
        errors.phone = 'Le téléphone est requis'
      } else if (!/^[0-9]{10}$/.test(data.phone)) {
        errors.phone = 'Format de téléphone invalide'
      }
      return errors
    },
    handleSave({ data, done, fail }) {
      this.isSaving = true
      // API call...
    }
  }
}
</script>
```

### Avec avatar éditable

```vue
<template>
  <f-profile-section
    v-model="userData"
    title="Photo de profil"
    :avatar-src="userData.avatar"
    :avatar-name="userData.fullName"
    :avatar-editable="true"
    avatar-size="xl"
    @avatar-edit="openAvatarModal"
  >
    <template #avatar-info>
      <f-typography variant="h6">{{ userData.fullName }}</f-typography>
      <f-typography variant="caption">{{ userData.role }}</f-typography>
    </template>
  </f-profile-section>
</template>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` / `v-model` | `Object` | `{}` | Données du profil/entité |
| `title` | `String` | `''` | Titre de la section |
| `subtitle` | `String` | `''` | Sous-titre de la section |
| `fields` | `Array` | `[]` | Définitions des champs pour génération automatique |
| `editing` | `Boolean` | `false` | Force le mode édition |
| `editable` | `Boolean` | `true` | Affiche le bouton d'édition |
| `loading` | `Boolean` | `false` | État de chargement initial |
| `submitting` | `Boolean` | `false` | État de soumission du formulaire |
| `validate` | `Function` | `null` | Fonction de validation personnalisée |
| `avatarSrc` | `String` | `''` | URL de l'image avatar |
| `avatarAlt` | `String` | `''` | Texte alternatif de l'avatar |
| `avatarInitials` | `String` | `''` | Initiales pour l'avatar |
| `avatarName` | `String` | `''` | Nom pour calculer les initiales |
| `avatarSize` | `String` | `'lg'` | Taille de l'avatar (`xs`, `sm`, `md`, `lg`, `xl`) |
| `avatarShape` | `String` | `'circle'` | Forme de l'avatar (`circle`, `square`) |
| `avatarEditable` | `Boolean` | `false` | Affiche le bouton d'édition de l'avatar |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la carte |
| `loaderSize` | `String` | `'md'` | Taille du loader |
| `loadingLabel` | `String` | `'Chargement en cours'` | Label d'accessibilité du loader |
| `editButtonLabel` | `String` | `'Modifier'` | Label du bouton d'édition |
| `saveButtonLabel` | `String` | `'Enregistrer'` | Label du bouton de sauvegarde |
| `cancelButtonLabel` | `String` | `'Annuler'` | Label du bouton d'annulation |

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Object` | Données mises à jour (v-model) |
| `update:editing` | `Boolean` | Changement d'état d'édition (.sync) |
| `edit-start` | - | Entrée en mode édition |
| `edit-cancel` | - | Annulation de l'édition |
| `submit` | `{ data, done, fail }` | Soumission du formulaire |
| `save-success` | `{ data, message }` | Sauvegarde réussie |
| `save-error` | `{ data, message }` | Erreur de sauvegarde |
| `field-change` | `{ field, value, formData }` | Changement de valeur d'un champ |
| `avatar-edit` | - | Clic sur le bouton d'édition de l'avatar |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `edit-button-content` | - | Contenu du bouton d'édition |
| `avatar-edit` | - | Personnalisation du bouton d'édition de l'avatar |
| `avatar-info` | - | Informations affichées à côté de l'avatar |
| `edit-fields` | `{ formData, errors }` | Champs du formulaire en mode édition |
| `read-fields` | `{ data }` | Affichage des données en mode lecture |

## Structure des champs

Chaque objet dans le tableau `fields` peut contenir :

```js
{
  name: 'fieldName',      // Clé dans l'objet de données
  label: 'Label',         // Label affiché
  type: 'text',           // Type de champ (text, email, tel, password, textarea, etc.)
  placeholder: '',        // Placeholder du champ
  required: false,        // Champ requis
  disabled: false,        // Champ désactivé
  rows: 3                 // Nombre de lignes (pour textarea)
}
```
