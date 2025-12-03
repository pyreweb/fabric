# Molécules

## Définition

Les **molécules** sont des groupes d'atomes liés ensemble pour former des composants fonctionnels plus élaborés. Elles représentent le deuxième niveau d'abstraction dans la méthodologie Atomic Design.

## Caractéristiques

- **Composition** : Les molécules combinent plusieurs atomes pour créer une unité fonctionnelle cohérente.
- **Fonctionnalité ciblée** : Chaque molécule remplit un objectif précis dans l'interface.
- **Réutilisabilité** : Peuvent être réutilisées dans différents contextes et organismes.
- **Cohérence** : Assurent une expérience utilisateur uniforme à travers l'application.

## Relation avec les atomes

Les molécules sont construites à partir d'atomes. Par exemple :

- **FAlert** utilise `FIcon` pour l'icône et `FButton` pour les actions.
- **FFormField** combine `FInput` avec un label et des messages.
- **FCard** utilise `FTypography` pour le titre et le sous-titre.

---

## Tutoriels par composant

### FAlert

Messages d'alerte avec icône, texte et bouton de fermeture optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'info'` | Type d'alerte : `success`, `error`, `info` |
| `title` | `String` | `''` | Titre de l'alerte |
| `message` | `String` | `''` | Message principal de l'alerte |
| `closable` | `Boolean` | `true` | Affiche le bouton de fermeture |

#### Événements

| Événement | Description |
|-----------|-------------|
| `close` | Émis lors de la fermeture de l'alerte |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé supplémentaire |

#### Exemple d'utilisation

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

---

### FCard

Conteneurs de contenu avec en-tête, corps, zone média et actions.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre de la carte |
| `subtitle` | `String` | `''` | Sous-titre de la carte |
| `clickable` | `Boolean` | `false` | Rend la carte cliquable avec effet hover |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la carte |

#### Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si `clickable` est true) |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal de la carte |
| `header` | En-tête personnalisé (remplace title/subtitle) |
| `media` | Zone média (images, vidéos) |
| `actions` | Zone d'actions (boutons) |

#### Exemple d'utilisation

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

---

### FFormField

Champs de formulaire complets avec label, input, message d'erreur et indication.

#### Props

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

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Exemple d'utilisation

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

---

## Bonnes pratiques

- Privilégiez l'utilisation des molécules existantes plutôt que de recréer des combinaisons d'atomes.
- Si vous créez une nouvelle molécule, assurez-vous qu'elle répond à un besoin récurrent.
- Documentez les props et événements de chaque molécule pour faciliter leur utilisation.
- Utilisez les slots pour personnaliser le contenu tout en conservant la structure et le comportement de la molécule.
