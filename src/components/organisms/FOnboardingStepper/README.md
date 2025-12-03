# FOnboardingStepper

Composant organisme pour séquencer un processus utilisateur long et complexe (inscription, configuration initiale, flux de paiement) en une série d'étapes claires et gérables. Améliore le taux d'achèvement et l'expérience utilisateur en réduisant la charge cognitive.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `steps` | `Array` | **Requis** | Tableau d'objets définissant les étapes. Chaque objet doit avoir une propriété `title` (string) |
| `value` | `Number` | `0` | Index de l'étape actuelle (0-based). Utilisez v-model pour le two-way binding |
| `canProceed` | `Boolean` | `true` | Indique si l'utilisateur peut passer à l'étape suivante. Si `false`, le bouton Suivant/Terminer est désactivé |
| `previousLabel` | `String` | `'Précédent'` | Libellé du bouton de retour |
| `nextLabel` | `String` | `'Suivant'` | Libellé du bouton de progression |
| `completeLabel` | `String` | `'Terminer'` | Libellé du bouton de finalisation (affiché à la dernière étape) |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la carte de contenu |

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Number` | Émis lors du changement d'étape (pour v-model) |
| `step-change` | `Number` | Émis à chaque changement d'étape avec le nouvel index |
| `previous` | `Number` | Émis lors d'un retour à l'étape précédente |
| `next` | `Number` | Émis lors d'une progression vers l'étape suivante |
| `complete` | - | Émis lors de la finalisation du processus (clic sur Terminer) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu par défaut affiché dans toutes les étapes |
| `step-0` | Contenu spécifique à la première étape (index 0) |
| `step-1` | Contenu spécifique à la deuxième étape (index 1) |
| `step-n` | Contenu spécifique à l'étape n (index n) |

## Fonctionnalités

- **Progression Visuelle** : Indicateur clair de l'étape actuelle, des étapes complétées et des étapes restantes
- **Navigation Contextuelle** : Boutons Précédent/Suivant/Terminer avec icônes directionnelles
- **Contrôle d'Accès** : Désactivation du bouton Suivant/Terminer via la prop `canProceed`
- **v-model** : Support du two-way binding pour l'index de l'étape actuelle
- **Accessibilité (A11Y)** : Navigation par les attributs ARIA appropriés

## Exemple d'utilisation

```vue
<template>
  <FOnboardingStepper
    v-model="currentStep"
    :steps="steps"
    :can-proceed="isCurrentStepValid"
    @complete="handleComplete"
    @step-change="handleStepChange"
  >
    <!-- Étape 1: Informations personnelles -->
    <template #step-0>
      <f-typography variant="h5" class="mb-4">Informations personnelles</f-typography>
      <f-form-field label="Nom" v-model="form.name" />
      <f-form-field label="Email" v-model="form.email" type="email" />
    </template>

    <!-- Étape 2: Préférences -->
    <template #step-1>
      <f-typography variant="h5" class="mb-4">Vos préférences</f-typography>
      <f-checkbox v-model="form.newsletter" label="Recevoir la newsletter" />
      <f-checkbox v-model="form.notifications" label="Activer les notifications" />
    </template>

    <!-- Étape 3: Confirmation -->
    <template #step-2>
      <f-typography variant="h5" class="mb-4">Confirmation</f-typography>
      <f-typography variant="body">
        Merci {{ form.name }} ! Vérifiez vos informations avant de finaliser.
      </f-typography>
    </template>
  </FOnboardingStepper>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      steps: [
        { title: 'Informations' },
        { title: 'Préférences' },
        { title: 'Confirmation' }
      ],
      form: {
        name: '',
        email: '',
        newsletter: false,
        notifications: true
      }
    }
  },
  computed: {
    isCurrentStepValid() {
      // Validation selon l'étape actuelle
      switch (this.currentStep) {
        case 0:
          return this.form.name.length > 0 && this.form.email.includes('@')
        case 1:
          return true // Pas de validation requise
        case 2:
          return true // Prêt à finaliser
        default:
          return false
      }
    }
  },
  methods: {
    handleComplete() {
      // Traitement de finalisation
      console.log('Onboarding terminé!', this.form)
    },
    handleStepChange(newStep) {
      console.log('Étape changée vers:', newStep)
    }
  }
}
</script>
```

## Exemple avec validation dynamique

```vue
<template>
  <FOnboardingStepper
    v-model="step"
    :steps="paymentSteps"
    :can-proceed="canGoNext"
    previous-label="Retour"
    next-label="Continuer"
    complete-label="Payer maintenant"
    @complete="processPayment"
  >
    <template #step-0>
      <p>Sélectionnez votre plan...</p>
    </template>
    
    <template #step-1>
      <p>Entrez vos informations de paiement...</p>
    </template>
    
    <template #step-2>
      <p>Confirmez votre commande...</p>
    </template>
  </FOnboardingStepper>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
      paymentSteps: [
        { title: 'Choix du plan' },
        { title: 'Paiement' },
        { title: 'Confirmation' }
      ],
      selectedPlan: null,
      paymentValid: false
    }
  },
  computed: {
    canGoNext() {
      if (this.step === 0) return !!this.selectedPlan
      if (this.step === 1) return this.paymentValid
      return true
    }
  },
  methods: {
    processPayment() {
      // Traitement du paiement
    }
  }
}
</script>
```
