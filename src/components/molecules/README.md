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
- **FBreadcrumb** utilise `FTypography` pour le texte et `FIcon` pour les séparateurs.
- **FFormField** combine `FInput` avec un label et des messages.
- **FCard** utilise `FTypography` pour le titre et le sous-titre.
- **FSearchBar** combine `FInput`, `FIcon` et `FButton` pour créer une barre de recherche fonctionnelle.
- **FListItem** utilise `FTypography` pour le texte et des slots pour intégrer d'autres atomes.

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

### FBreadcrumb

Composant de navigation hiérarchique (fil d'Ariane) permettant à l'utilisateur de visualiser sa position dans l'arborescence de l'application et de naviguer vers les niveaux supérieurs.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `Array` | **requis** | Liste des éléments du fil d'Ariane. Chaque élément doit avoir un `label` (String), et peut avoir un `href` (String) et un `icon` (String). |
| `separatorIcon` | `String` | `'chevron-right'` | Nom de l'icône utilisée comme séparateur entre les éléments |
| `ariaLabel` | `String` | `'Fil d\'Ariane'` | Label ARIA pour l'accessibilité |

#### Événements

| Événement | Description |
|-----------|-------------|
| `navigate` | Émis lors d'un clic sur un élément parent. Retourne un objet `{ item, index, event }` |

#### Exemple d'utilisation

```vue
<template>
  <!-- Fil d'Ariane simple -->
  <FBreadcrumb 
    :items="[
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/produits' },
      { label: 'Détails du produit' }
    ]"
  />

  <!-- Fil d'Ariane avec icônes -->
  <FBreadcrumb 
    :items="[
      { label: 'Accueil', href: '/', icon: 'home' },
      { label: 'Utilisateurs', href: '/utilisateurs', icon: 'user' },
      { label: 'Profil' }
    ]"
  />

  <!-- Fil d'Ariane avec navigation programmatique -->
  <FBreadcrumb 
    :items="breadcrumbItems"
    @navigate="handleNavigate"
  />

  <!-- Fil d'Ariane avec séparateur personnalisé -->
  <FBreadcrumb 
    :items="breadcrumbItems"
    separatorIcon="chevron-right"
    ariaLabel="Navigation"
  />
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [
        { label: 'Tableau de bord', href: '/dashboard' },
        { label: 'Paramètres', href: '/dashboard/settings' },
        { label: 'Compte' }
      ]
    }
  },
  methods: {
    handleNavigate({ item, index, event }) {
      console.log('Navigation vers:', item.label)
      // Navigation programmatique avec vue-router par exemple
      // this.$router.push(item.href)
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

### FListItem

Composant de ligne standardisé pour l'affichage riche d'entités (utilisateurs, fichiers, tâches). Sert de brique fondamentale pour les listes complexes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre principal de l'élément |
| `subtitle` | `String` | `''` | Sous-titre ou métadonnées |
| `clickable` | `Boolean` | `false` | Rend l'élément cliquable avec effet hover |
| `selected` | `Boolean` | `false` | Affiche l'état sélectionné |
| `disabled` | `Boolean` | `false` | Désactive l'élément |
| `truncate` | `Boolean` | `true` | Tronque le texte si trop long |

#### Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si `clickable` est true) |

#### Slots

| Slot | Description |
|------|-------------|
| `left` | Zone gauche pour `FAvatar` ou `FCheckbox` |
| `content` | Contenu personnalisé sous le titre/sous-titre |
| `right` | Zone droite pour `FButton` ou `FBadge` |

#### Exemple d'utilisation

```vue
<template>
  <!-- Liste d'utilisateurs -->
  <FListItem
    title="Jean Dupont"
    subtitle="Développeur Senior"
    :clickable="true"
    @click="handleUserClick"
  >
    <template #left>
      <FAvatar name="Jean Dupont" size="md" />
    </template>
    <template #right>
      <FBadge variant="success">En ligne</FBadge>
    </template>
  </FListItem>

  <!-- Élément avec checkbox -->
  <FListItem
    title="Document.pdf"
    subtitle="Modifié il y a 2 heures"
  >
    <template #left>
      <FCheckbox v-model="selected" />
    </template>
    <template #right>
      <FButton variant="text" size="small">
        <FIcon name="menu" />
      </FButton>
    </template>
  </FListItem>

  <!-- Élément sélectionné -->
  <FListItem
    title="Tâche importante"
    subtitle="Échéance : demain"
    :selected="true"
    :clickable="true"
  >
    <template #left>
      <FAvatar initials="TI" size="sm" />
    </template>
    <template #right>
      <FBadge variant="warning">Urgent</FBadge>
    </template>
  </FListItem>

  <!-- Élément désactivé -->
  <FListItem
    title="Élément indisponible"
    subtitle="Cette option n'est pas disponible"
    :disabled="true"
  >
    <template #left>
      <FAvatar size="sm" />
    </template>
  </FListItem>
</template>
```

---

### FSearchBar

Barre de recherche avec icône et bouton optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur du champ de recherche (v-model) |
| `placeholder` | `String` | `'Rechercher...'` | Texte indicatif |
| `size` | `String` | `'medium'` | Taille : `small`, `medium`, `large` |
| `iconPosition` | `String` | `'inside'` | Position de l'icône : `inside`, `outside` |
| `buttonMode` | `Boolean` | `false` | Affiche un bouton de recherche au lieu de l'icône |
| `buttonLabel` | `String` | `'Rechercher'` | Texte du bouton (si `buttonMode` est true) |
| `disabled` | `Boolean` | `false` | Désactive la barre de recherche |

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `search` | Émis lors de la soumission (appui sur Entrée ou clic sur le bouton) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Méthodes

| Méthode | Description |
|---------|-------------|
| `focus()` | Met le focus sur le champ de recherche |

#### Exemple d'utilisation

```vue
<template>
  <!-- Barre de recherche simple -->
  <FSearchBar 
    v-model="searchQuery"
    placeholder="Rechercher un article..."
    @search="handleSearch"
  />

  <!-- Barre de recherche avec bouton -->
  <FSearchBar 
    v-model="searchQuery"
    :buttonMode="true"
    buttonLabel="Chercher"
    @search="handleSearch"
  />

  <!-- Barre de recherche avec icône externe -->
  <FSearchBar 
    v-model="searchQuery"
    iconPosition="outside"
    size="large"
    @search="handleSearch"
  />

  <!-- Barre de recherche désactivée -->
  <FSearchBar 
    v-model="searchQuery"
    :disabled="true"
  />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch(query) {
      console.log('Recherche:', query)
      // Logique de recherche...
    }
  }
}
</script>
```

---

### FPagination

Composant de navigation permettant le découpage de données volumineuses en pages distinctes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Number` | `1` | Page courante (v-model) |
| `totalPages` | `Number` | **requis** | Nombre total de pages |
| `maxVisiblePages` | `Number` | `5` | Nombre maximum de pages dans la fenêtre centrale (min: 3). Les première et dernière pages sont toujours affichées en plus. |
| `size` | `String` | `'medium'` | Taille des boutons : `small`, `medium`, `large` |
| `variant` | `String` | `'outline'` | Variante des boutons : `outline`, `ghost` |
| `previousLabel` | `String` | `'Précédent'` | Texte du bouton précédent |
| `nextLabel` | `String` | `'Suivant'` | Texte du bouton suivant |
| `showLabels` | `Boolean` | `true` | Affiche les textes des boutons (sinon sr-only) |

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement de page (pour v-model) |
| `change` | Émis lors du changement de page avec le numéro de page |

#### Exemple d'utilisation

```vue
<template>
  <!-- Pagination simple -->
  <FPagination 
    v-model="currentPage"
    :totalPages="10"
  />

  <!-- Pagination avec style ghost -->
  <FPagination 
    v-model="currentPage"
    :totalPages="20"
    variant="ghost"
    size="small"
  />

  <!-- Pagination avec labels personnalisés -->
  <FPagination 
    v-model="currentPage"
    :totalPages="15"
    previousLabel="Retour"
    nextLabel="Suite"
    @change="handlePageChange"
  />

  <!-- Pagination compacte sans labels -->
  <FPagination 
    v-model="currentPage"
    :totalPages="50"
    :showLabels="false"
    :maxVisiblePages="7"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handlePageChange(page) {
      console.log('Page sélectionnée:', page)
      // Charger les données de la page...
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
