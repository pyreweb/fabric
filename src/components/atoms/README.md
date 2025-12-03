# Atomes

## Définition

Les **atomes** sont les composants les plus fondamentaux et indivisibles de notre système de design. Inspirés de la méthodologie Atomic Design de Brad Frost, ils représentent les briques de base de l'interface utilisateur.

## Caractéristiques

- **Indivisibles** : Les atomes ne peuvent pas être décomposés en éléments plus petits sans perdre leur fonctionnalité.
- **Réutilisables** : Conçus pour être utilisés dans de multiples contextes à travers l'application.
- **Autonomes** : Chaque atome fonctionne de manière indépendante sans dépendance envers d'autres composants.
- **Configurables** : Personnalisables via des props pour s'adapter à différents cas d'usage.

## Conventions de nommage

Tous les composants atomes suivent la convention de nommage `F` + `NomDuComposant` (ex: `FButton`, `FInput`).

---

## Tutoriels par composant

### FAvatar

Affichage d'avatars utilisateur avec image ou initiales en fallback.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `src` | `String` | `''` | URL de l'image de l'avatar |
| `alt` | `String` | `''` | Texte alternatif pour l'image |
| `initials` | `String` | `''` | Initiales à afficher (prioritaire sur `name`) |
| `name` | `String` | `''` | Nom complet (utilisé pour générer les initiales automatiquement) |
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` |
| `shape` | `String` | `'circle'` | Forme : `circle`, `square` |
| `status` | `String` | `null` | Indicateur de statut : `online`, `busy`, `away`, `offline` |
| `placeholderClass` | `String` | `'bg-gray-400 text-white'` | Classes CSS pour le placeholder (fallback) |

#### Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic sur l'avatar |

#### Exemple d'utilisation

```vue
<template>
  <!-- Avatar avec image -->
  <FAvatar src="/images/user.jpg" alt="Photo de profil" size="lg" />

  <!-- Avatar avec initiales -->
  <FAvatar initials="JD" size="md" shape="circle" />

  <!-- Avatar généré à partir du nom -->
  <FAvatar name="Jean Dupont" size="sm" />

  <!-- Avatar avec indicateur de statut -->
  <FAvatar name="Jean Dupont" size="md" status="online" />

  <!-- Avatar cliquable -->
  <FAvatar name="Jean Dupont" @click="handleAvatarClick" />
</template>
```

---

### FBadge

Indicateurs visuels pour statuts, notifications ou compteurs.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `content` | `String \| Number` | `''` | Contenu du badge (texte ou nombre) |
| `variant` | `String` | `'primary'` | Variante : `primary`, `success`, `warning`, `error`, `neutral` |
| `shape` | `String` | `'pill'` | Forme : `pill`, `circle`, `rounded` |
| `size` | `String` | `'md'` | Taille : `sm`, `md`, `lg` |
| `dot` | `Boolean` | `false` | Affiche un simple point indicateur |
| `outlined` | `Boolean` | `false` | Affiche un badge avec bordure et fond transparent |
| `tag` | `String` | `'span'` | Balise HTML à utiliser pour le composant |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé (remplace `content`) |

#### Exemple d'utilisation

```vue
<template>
  <!-- Badge avec texte -->
  <FBadge content="Nouveau" variant="success" />

  <!-- Badge numérique -->
  <FBadge content="42" variant="primary" shape="circle" />

  <!-- Badge point (notification) -->
  <FBadge dot variant="error" />

  <!-- Badge outlined -->
  <FBadge content="Beta" variant="primary" :outlined="true" />

  <!-- Badge avec taille personnalisée -->
  <FBadge content="Important" size="lg" variant="warning" />

  <!-- Badge avec slot -->
  <FBadge variant="success">
    <FIcon name="check" size="xs" /> Validé
  </FBadge>
</template>
```

---

### FButton

Boutons d'action avec variantes et tailles multiples. Supporte les liens et le routage.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'primary'` | Style : `primary`, `secondary`, `danger`, `success`, `outline`, `ghost`, `link` |
| `size` | `String` | `'medium'` | Taille : `xs`, `small`, `medium`, `large`, `xl` |
| `type` | `String` | `'button'` | Type HTML : `button`, `submit`, `reset` |
| `disabled` | `Boolean` | `false` | Désactive le bouton |
| `loading` | `Boolean` | `false` | Affiche un indicateur de chargement |
| `loadingText` | `String` | `''` | Texte à afficher pendant le chargement |
| `block` | `Boolean` | `false` | Affiche le bouton en largeur complète |
| `to` | `String \| Object` | `null` | Route pour `router-link` (Vue Router) |
| `href` | `String` | `null` | URL pour lien externe (rendu en `<a>`) |
| `target` | `String` | `null` | Attribut target pour les liens (ex: `_blank`) |

#### Événements

| Événement | Description |
|-----------|-------------|
| `click` | Émis lors d'un clic (si non désactivé et non en chargement) |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du bouton |
| `iconLeft` | Icône à gauche du texte |
| `iconRight` | Icône à droite du texte |

#### Exemple d'utilisation

```vue
<template>
  <!-- Bouton primaire -->
  <FButton variant="primary" size="medium" @click="handleClick">
    Valider
  </FButton>

  <!-- Bouton outline -->
  <FButton variant="outline" size="small">
    Annuler
  </FButton>

  <!-- Bouton de soumission de formulaire -->
  <FButton type="submit" variant="primary" :disabled="isLoading">
    Envoyer
  </FButton>

  <!-- Bouton avec indicateur de chargement -->
  <FButton variant="primary" :loading="isSubmitting" loadingText="Envoi...">
    Envoyer
  </FButton>

  <!-- Bouton pleine largeur -->
  <FButton variant="primary" :block="true">
    Action principale
  </FButton>

  <!-- Bouton avec icônes -->
  <FButton variant="primary">
    <template #iconLeft>
      <FIcon name="plus" size="sm" />
    </template>
    Ajouter
  </FButton>

  <!-- Bouton comme lien externe -->
  <FButton variant="link" href="https://example.com" target="_blank">
    Voir plus
  </FButton>

  <!-- Bouton avec Vue Router -->
  <FButton variant="primary" :to="{ name: 'profile' }">
    Mon profil
  </FButton>
</template>
```

---

### FCheckbox

Cases à cocher pour sélections multiples.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `Boolean` | `false` | État coché/non coché (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive la checkbox |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

#### Événements

| Événement | Description |
|-----------|-------------|
| `change` | Émis lors du changement d'état (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé du label (remplace `label`) |

#### Exemple d'utilisation

```vue
<template>
  <FCheckbox v-model="acceptTerms" label="J'accepte les conditions" />

  <FCheckbox v-model="newsletter" label="Recevoir la newsletter" :disabled="true" />

  <FCheckbox v-model="required" label="Champ obligatoire" :error="hasError" />

  <!-- Avec slot pour contenu personnalisé -->
  <FCheckbox v-model="terms">
    J'accepte les <a href="/terms">conditions d'utilisation</a>
  </FCheckbox>
</template>
```

---

### FDivider

Séparateurs visuels entre sections de contenu.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `orientation` | `String` | `'horizontal'` | Orientation : `horizontal`, `vertical` |
| `align` | `String` | `'center'` | Alignement du contenu : `left`, `center`, `right` |
| `color` | `String` | `'gray-300'` | Couleur de la ligne (classes Tailwind) |
| `textColor` | `String` | `'gray-500'` | Couleur du texte (classes Tailwind) |
| `textSize` | `String` | `'sm'` | Taille du texte (classes Tailwind) |
| `margin` | `String` | `'md'` | Espacement : `none`, `sm`, `md`, `lg` |
| `thickness` | `String` | `'thin'` | Épaisseur : `thin`, `medium`, `thick` |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu à afficher au centre du divider |

#### Exemple d'utilisation

```vue
<template>
  <!-- Divider simple -->
  <FDivider />

  <!-- Divider avec texte centré -->
  <FDivider align="center">OU</FDivider>

  <!-- Divider vertical -->
  <FDivider orientation="vertical" margin="md" />

  <!-- Divider coloré et épais -->
  <FDivider color="blue-500" thickness="medium" />

  <!-- Divider avec couleur de texte personnalisée -->
  <FDivider textColor="blue-600" textSize="xs">Section</FDivider>
</template>
```

---

### FIcon

Icônes SVG avec support de tailles et couleurs personnalisées.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `name` | `String` | `''` | Nom de l'icône (voir liste ci-dessous) |
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` ou valeur personnalisée (ex: `24px`) |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `decorative` | `Boolean` | `true` | Indique si l'icône est décorative (aria-hidden) |
| `label` | `String` | `''` | Label d'accessibilité (si non décoratif) |

#### Icônes disponibles

**Navigation** : `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`

**Actions** : `check`, `x`, `plus`, `minus`, `search`, `menu`, `close`, `refresh`, `edit`, `trash`, `copy`

**Statuts** : `info`, `warning`, `error`, `success`, `question`

**UI Commun** : `user`, `home`, `cog`, `bell`, `heart`, `star`, `eye`, `eye-off`, `lock`, `unlock`, `mail`, `calendar`, `clock`, `download`, `upload`, `link`, `external-link`, `folder`, `document`

#### Exemple d'utilisation

```vue
<template>
  <!-- Icône simple -->
  <FIcon name="check" size="md" />

  <!-- Icône avec couleur personnalisée -->
  <FIcon name="heart" size="lg" color="#e74c3c" />

  <!-- Icône accessible (non décorative) -->
  <FIcon name="warning" :decorative="false" label="Attention" />
</template>
```

---

### FInput

Champs de saisie texte.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur du champ (v-model) |
| `type` | `String` | `'text'` | Type HTML (text, email, password, number, etc.) |
| `placeholder` | `String` | `''` | Texte indicatif |
| `size` | `String` | `'medium'` | Taille : `small`, `medium`, `large` |
| `disabled` | `Boolean` | `false` | Désactive le champ |
| `readonly` | `Boolean` | `false` | Rend le champ en lecture seule |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Exemple d'utilisation

```vue
<template>
  <!-- Input texte simple -->
  <FInput v-model="username" placeholder="Nom d'utilisateur" />

  <!-- Input email avec erreur -->
  <FInput v-model="email" type="email" :error="!isValidEmail" size="large" />

  <!-- Input désactivé -->
  <FInput v-model="readonly" :disabled="true" />
</template>
```

---

### FLoader

Indicateurs de chargement animés.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `size` | `String` | `'md'` | Taille : `xs`, `sm`, `md`, `lg`, `xl` |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `overlay` | `Boolean` | `false` | Affiche le loader en overlay plein écran |
| `centered` | `Boolean` | `false` | Centre le loader dans son conteneur |
| `label` | `String` | `'Chargement en cours'` | Label d'accessibilité |

#### Exemple d'utilisation

```vue
<template>
  <!-- Loader simple -->
  <FLoader size="md" />

  <!-- Loader avec couleur personnalisée -->
  <FLoader size="lg" color="#3498db" />

  <!-- Loader en overlay -->
  <FLoader overlay size="xl" />

  <!-- Loader centré dans un conteneur -->
  <div style="position: relative; height: 200px;">
    <FLoader centered />
  </div>
</template>
```

---

### FRadio

Boutons radio pour sélections uniques au sein d'un groupe.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number \| Boolean` | *requis* | Valeur de l'option |
| `modelValue` | `String \| Number \| Boolean` | `null` | Valeur sélectionnée du groupe (v-model) |
| `name` | `String` | *requis* | Nom du groupe radio |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive le bouton radio |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |

#### Événements

| Événement | Description |
|-----------|-------------|
| `change` | Émis lors de la sélection (pour v-model) |

#### Exemple d'utilisation

```vue
<template>
  <div>
    <FRadio v-model="selectedOption" name="options" value="option1" label="Option 1" />
    <FRadio v-model="selectedOption" name="options" value="option2" label="Option 2" />
    <FRadio v-model="selectedOption" name="options" value="option3" label="Option 3" :disabled="true" />
  </div>
</template>
```

---

### FTextarea

Zones de texte multi-lignes avec compteur de caractères optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String` | `''` | Valeur du champ (v-model) |
| `label` | `String` | `''` | Label du champ |
| `placeholder` | `String` | `''` | Texte indicatif |
| `rows` | `Number \| String` | `3` | Nombre de lignes visibles |
| `disabled` | `Boolean` | `false` | Désactive le champ |
| `readonly` | `Boolean` | `false` | Rend le champ en lecture seule |
| `error` | `Boolean` | `false` | Affiche un état d'erreur |
| `errorMessage` | `String` | `''` | Message d'erreur à afficher |
| `maxlength` | `Number \| String` | `null` | Nombre maximum de caractères |
| `showCounter` | `Boolean` | `false` | Affiche le compteur de caractères |

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors de la saisie (pour v-model) |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Exemple d'utilisation

```vue
<template>
  <!-- Textarea simple -->
  <FTextarea v-model="description" label="Description" placeholder="Entrez une description..." />

  <!-- Textarea avec compteur -->
  <FTextarea 
    v-model="bio" 
    label="Biographie" 
    :maxlength="280" 
    :showCounter="true"
    :rows="5"
  />

  <!-- Textarea avec erreur -->
  <FTextarea 
    v-model="comment" 
    :error="true" 
    errorMessage="Ce champ est obligatoire" 
  />
</template>
```

---

### FToggle

Interrupteurs à bascule on/off.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `false` | État activé/désactivé (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | Désactive le toggle |
| `color` | `String` | `'blue'` | Couleur : `blue`, `green`, `red`, `orange`, `purple` |

#### Événements

| Événement | Description |
|-----------|-------------|
| `input` | Émis lors du changement d'état (pour v-model) |
| `change` | Émis lors du changement d'état |
| `focus` | Émis lors du focus |
| `blur` | Émis lors de la perte du focus |

#### Exemple d'utilisation

```vue
<template>
  <!-- Toggle simple -->
  <FToggle v-model="isEnabled" label="Activer les notifications" />

  <!-- Toggle avec couleur personnalisée -->
  <FToggle v-model="darkMode" label="Mode sombre" color="purple" />

  <!-- Toggle désactivé -->
  <FToggle v-model="locked" label="Option verrouillée" :disabled="true" />
</template>
```

---

### FTypography

Éléments typographiques pour titres et textes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'body'` | Style : `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body`, `caption`, `overline` |
| `tag` | `String` | `null` | Balise HTML personnalisée (surcharge le défaut) |
| `truncate` | `Boolean` | `false` | Tronque le texte avec ellipsis |

#### Exemple d'utilisation

```vue
<template>
  <!-- Titres -->
  <FTypography variant="h1">Titre principal</FTypography>
  <FTypography variant="h2">Sous-titre</FTypography>

  <!-- Texte de corps -->
  <FTypography variant="body">
    Paragraphe de texte standard avec un style lisible et agréable.
  </FTypography>

  <!-- Caption et overline -->
  <FTypography variant="caption">Texte secondaire</FTypography>
  <FTypography variant="overline">CATÉGORIE</FTypography>

  <!-- Texte tronqué -->
  <FTypography variant="body" :truncate="true">
    Ce texte très long sera automatiquement tronqué...
  </FTypography>

  <!-- Balise personnalisée -->
  <FTypography variant="h1" tag="div">Titre dans une div</FTypography>
</template>
```
