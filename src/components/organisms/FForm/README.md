# FForm

Formulaire complet avec gestion de la soumission et structure automatique.

## Props

Aucune prop spécifique. Le composant fournit une structure de formulaire avec espacement automatique.

## Événements

| Événement | Description |
|-----------|-------------|
| `submit` | Émis lors de la soumission du formulaire (avec `preventDefault` automatique) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal du formulaire (champs) |
| `actions` | Zone d'actions (boutons de soumission) |

## Exemple d'utilisation basique

```vue
<template>
  <FForm @submit="handleSubmit">
    <FFormField 
      v-model="form.name"
      label="Nom complet"
      :required="true"
    />
    
    <FFormField 
      v-model="form.email"
      label="Email"
      type="email"
      :required="true"
    />
    
    <template #actions>
      <FButton type="submit" variant="primary">
        Envoyer
      </FButton>
      <FButton type="button" variant="outline" @click="resetForm">
        Réinitialiser
      </FButton>
    </template>
  </FForm>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Formulaire soumis:', this.form)
      // Logique de soumission...
    },
    resetForm() {
      this.form = { name: '', email: '' }
    }
  }
}
</script>
```

## Exemple avec validation

```vue
<template>
  <FForm @submit="handleSubmit">
    <FFormField 
      v-model="form.username"
      label="Nom d'utilisateur"
      :required="true"
      :errorMessage="errors.username"
    />
    
    <FFormField 
      v-model="form.email"
      label="Email"
      type="email"
      :required="true"
      :errorMessage="errors.email"
    />
    
    <FFormField 
      v-model="form.password"
      label="Mot de passe"
      type="password"
      :required="true"
      :errorMessage="errors.password"
      hint="Minimum 8 caractères"
    />
    
    <FFormField 
      v-model="form.confirmPassword"
      label="Confirmer le mot de passe"
      type="password"
      :required="true"
      :errorMessage="errors.confirmPassword"
    />
    
    <template #actions>
      <FButton type="submit" variant="primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Inscription...' : 'S\'inscrire' }}
      </FButton>
    </template>
  </FForm>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      isSubmitting: false
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.errors = { username: '', email: '', password: '', confirmPassword: '' }
      
      if (!this.form.username) {
        this.errors.username = 'Le nom d\'utilisateur est requis'
        isValid = false
      }
      
      if (!this.form.email) {
        this.errors.email = 'L\'email est requis'
        isValid = false
      } else if (!this.form.email.includes('@')) {
        this.errors.email = 'L\'email n\'est pas valide'
        isValid = false
      }
      
      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
        isValid = false
      }
      
      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas'
        isValid = false
      }
      
      return isValid
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.isSubmitting = true
      try {
        // Appel API d'inscription...
        await this.registerUser(this.form)
        this.$emit('success')
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)
      } finally {
        this.isSubmitting = false
      }
    },
    registerUser(formData) {
      // Simulation d'un appel API
      return new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
</script>
```

## Exemple formulaire de contact complet

```vue
<template>
  <FCard title="Contactez-nous">
    <FForm @submit="sendMessage">
      <FFormField 
        v-model="contact.name"
        label="Votre nom"
        placeholder="Jean Dupont"
        :required="true"
        :errorMessage="errors.name"
      />
      
      <FFormField 
        v-model="contact.email"
        label="Votre email"
        type="email"
        placeholder="jean.dupont@exemple.fr"
        :required="true"
        :errorMessage="errors.email"
      />
      
      <FTextarea 
        v-model="contact.message"
        label="Votre message"
        placeholder="Écrivez votre message ici..."
        :rows="5"
        :maxlength="500"
        :showCounter="true"
      />
      
      <FCheckbox 
        v-model="contact.newsletter"
        label="Je souhaite recevoir la newsletter"
      />
      
      <template #actions>
        <FButton type="submit" variant="primary" :disabled="isSending">
          {{ isSending ? 'Envoi...' : 'Envoyer' }}
        </FButton>
      </template>
    </FForm>
    
    <FAlert 
      v-if="showSuccess"
      variant="success"
      title="Message envoyé !"
      message="Nous vous répondrons dans les plus brefs délais."
      @close="showSuccess = false"
    />
  </FCard>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: '',
        email: '',
        message: '',
        newsletter: false
      },
      errors: {
        name: '',
        email: ''
      },
      isSending: false,
      showSuccess: false
    }
  },
  methods: {
    async sendMessage() {
      // Validation et envoi...
      this.isSending = true
      
      setTimeout(() => {
        this.isSending = false
        this.showSuccess = true
        this.contact = { name: '', email: '', message: '', newsletter: false }
      }, 1500)
    }
  }
}
</script>
```
