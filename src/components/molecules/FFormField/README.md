# FFormField

Champs de formulaire complets avec label, input, message d'erreur et indication.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `String` | `''` | Label du champ |
| `value` | `String \| Number` | `''` | Valeur du champ (v-model), généralement une String |
| `type` | `String` | `'text'` | Type de l'input (text, email, password, etc.) |
| `placeholder` | `String` | `''` | Texte indicatif |
| `size` | `String` | `'medium'` | Taille : `small`, `medium`, `large` |
| `disabled` | `Boolean` | `false` | Désactive le champ |
| `readonly` | `Boolean` | `false` | Rend le champ en lecture seule |
| `required` | `Boolean` | `false` | Marque le champ comme obligatoire (affiche *) |
| `hint` | `String` | `''` | Texte d'aide sous le champ |
| `errorMessage` | `String` | `''` | Message d'erreur (affiche l'état d'erreur) |

## Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

## Exemple d'utilisation

```vue
<template>
  <!-- Champ simple avec label -->
  <FFormField 
    v-model="username"
    label="Nom d'utilisateur"
    placeholder="Entrez votre nom"
  />

  <!-- Champ obligatoire avec indication -->
  <FFormField 
    v-model="email"
    label="Adresse email"
    type="email"
    :required="true"
    hint="Nous ne partagerons jamais votre email"
  />

  <!-- Champ avec erreur de validation -->
  <FFormField 
    v-model="password"
    label="Mot de passe"
    type="password"
    :required="true"
    :errorMessage="passwordError"
  />

  <!-- Champ désactivé -->
  <FFormField 
    v-model="lockedField"
    label="Champ verrouillé"
    :disabled="true"
  />
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      lockedField: 'Valeur non modifiable',
      passwordError: ''
    }
  },
  watch: {
    password(newVal) {
      if (newVal.length < 8) {
        this.passwordError = 'Le mot de passe doit contenir au moins 8 caractères'
      } else {
        this.passwordError = ''
      }
    }
  }
}
</script>
```
