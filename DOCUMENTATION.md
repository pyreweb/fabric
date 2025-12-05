# Documentation Fabric

Ce document recense l'ensemble des composants de la bibliothèque Fabric, leurs options (props), les événements émis et les slots disponibles.

## Table des matières

- [Atomes](#atomes)
  - [FAvatar](#favatar)
  - [FBadge](#fbadge)
  - [FButton](#fbutton)
  - [FCheckbox](#fcheckbox)
  - [FDivider](#fdivider)
  - [FIcon](#ficon)
  - [FInput](#finput)
  - [FLoader](#floader)
  - [FRadio](#fradio)
  - [FTextarea](#ftextarea)
  - [FToggle](#ftoggle)
  - [FTypography](#ftypography)
- [Molécules](#molécules)
  - [FAccordionItem](#faccordionitem)
  - [FAlert](#falert)
  - [FBreadcrumb](#fbreadcrumb)
  - [FButtonGroup](#fbuttongroup)
  - [FCard](#fcard)
  - [FEmptyState](#femptystate)
  - [FFilePreview](#ffilepreview)
  - [FFormField](#fformfield)
  - [FListItem](#flistitem)
  - [FPagination](#fpagination)
  - [FSearchBar](#fsearchbar)
  - [FStatCard](#fstatcard)
- [Organismes](#organismes)
  - [FActivityFeed](#factivityfeed)
  - [FDataTable](#fdatatable)
  - [FFileUpload](#ffileupload)
  - [FFilterSidebar](#ffiltersidebar)
  - [FForm](#fform)
  - [FModal](#fmodal)
  - [FNavigationSidebar](#fnavigationsidebar)
  - [FOnboardingStepper](#fonboardingstepper)
  - [FPageHeader](#fpageheader)
  - [FProfileSection](#fprofilesection)
  - [FUserMenu](#fusermenu)

---

## Atomes

Les atomes sont les composants de base de la bibliothèque, représentant les éléments les plus simples de l'interface utilisateur.

---

### FAvatar

Composant d'affichage d'avatar avec support d'images, d'initiales et d'indicateurs de statut.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `src` | `String` | `''` | URL de l'image de l'avatar |
| `alt` | `String` | `''` | Texte alternatif de l'image |
| `initials` | `String` | `''` | Initiales à afficher (2 caractères max) |
| `name` | `String` | `''` | Nom complet (utilisé pour calculer les initiales) |
| `size` | `String` | `'md'` | Taille de l'avatar (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`) |
| `shape` | `String` | `'circle'` | Forme de l'avatar (`'circle'`, `'square'`) |
| `status` | `String` | `null` | Indicateur de statut (`null`, `'online'`, `'busy'`, `'away'`, `'offline'`) |
| `placeholderClass` | `String` | `'bg-neutral-400 text-white'` | Classes CSS pour le placeholder |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `click` | `Event` | Émis lors du clic sur l'avatar |

---

### FBadge

Composant de badge pour afficher des statuts, compteurs ou labels.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `content` | `String \| Number` | `''` | Contenu du badge |
| `variant` | `String` | `'primary'` | Variante de couleur (`'primary'`, `'success'`, `'warning'`, `'error'`, `'neutral'`) |
| `shape` | `String` | `'pill'` | Forme du badge (`'pill'`, `'circle'`, `'rounded'`) |
| `size` | `String` | `'md'` | Taille (`'sm'`, `'md'`, `'lg'`) |
| `dot` | `Boolean` | `false` | Affiche un point au lieu du contenu |
| `outlined` | `Boolean` | `false` | Style avec bordure uniquement |
| `tag` | `String` | `'span'` | Élément HTML à utiliser |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé du badge |

---

### FButton

Bouton polyvalent avec support des variantes, tailles, états de chargement et navigation.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'primary'` | Style du bouton (`'primary'`, `'secondary'`, `'danger'`, `'success'`, `'outline'`, `'ghost'`, `'link'`) |
| `size` | `String` | `'medium'` | Taille (`'xs'`, `'small'`, `'medium'`, `'large'`, `'xl'`) |
| `type` | `String` | `'button'` | Type de bouton HTML (`'button'`, `'submit'`, `'reset'`) |
| `disabled` | `Boolean` | `false` | État désactivé |
| `loading` | `Boolean` | `false` | État de chargement |
| `loadingText` | `String` | `''` | Texte affiché pendant le chargement |
| `block` | `Boolean` | `false` | Bouton pleine largeur |
| `to` | `String \| Object` | `null` | Route pour `router-link` |
| `href` | `String` | `null` | URL pour lien standard |
| `target` | `String` | `null` | Cible du lien (`'_blank'`, etc.) |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `click` | `Event` | Émis lors du clic |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du bouton |
| `iconLeft` | Icône à gauche du texte |
| `iconRight` | Icône à droite du texte |

---

### FCheckbox

Case à cocher avec support de label et d'état d'erreur.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `Boolean` | `false` | État coché (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | État désactivé |
| `error` | `Boolean` | `false` | État d'erreur |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `change` | `Boolean` | Émis lors du changement d'état |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé du label |

---

### FDivider

Séparateur visuel horizontal ou vertical avec support de contenu.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `orientation` | `String` | `'horizontal'` | Orientation (`'horizontal'`, `'vertical'`) |
| `align` | `String` | `'center'` | Alignement du contenu (`'left'`, `'center'`, `'right'`) |
| `color` | `String` | `'gray-300'` | Couleur de la ligne |
| `textColor` | `String` | `'gray-500'` | Couleur du texte |
| `textSize` | `String` | `'sm'` | Taille du texte |
| `margin` | `String` | `'md'` | Marge (`'none'`, `'sm'`, `'md'`, `'lg'`) |
| `thickness` | `String` | `'thin'` | Épaisseur (`'thin'`, `'medium'`, `'thick'`) |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu affiché au milieu du séparateur |

---

### FIcon

Composant d'icône avec bibliothèque d'icônes intégrée.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `name` | `String` | `''` | Nom de l'icône (voir liste ci-dessous) |
| `size` | `String` | `'md'` | Taille (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` ou valeur personnalisée) |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `decorative` | `Boolean` | `true` | Marque l'icône comme décorative (aria-hidden) |
| `label` | `String` | `''` | Label accessible pour les icônes non-décoratives |

#### Icônes disponibles

**Navigation:** `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`

**Actions:** `check`, `x`, `plus`, `minus`, `search`, `menu`, `close`, `refresh`, `edit`, `trash`, `copy`

**Statuts:** `info`, `warning`, `error`, `success`, `question`

**UI commune:** `user`, `home`, `cog`, `bell`, `heart`, `star`, `eye`, `eye-off`, `lock`, `unlock`, `mail`, `calendar`, `clock`, `download`, `upload`, `link`, `external-link`, `folder`, `document`

#### Slots

| Slot | Description |
|------|-------------|
| `default` | SVG personnalisé à afficher |

---

### FInput

Champ de saisie texte simple.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur du champ (v-model) |
| `type` | `String` | `'text'` | Type de champ HTML |
| `placeholder` | `String` | `''` | Texte placeholder |
| `size` | `String` | `'medium'` | Taille (`'small'`, `'medium'`, `'large'`) |
| `disabled` | `Boolean` | `false` | État désactivé |
| `readonly` | `Boolean` | `false` | État lecture seule |
| `error` | `Boolean` | `false` | État d'erreur |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `String` | Émis lors de la saisie |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

---

### FLoader

Indicateur de chargement animé.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `size` | `String` | `'md'` | Taille (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`) |
| `color` | `String` | `''` | Couleur CSS personnalisée |
| `overlay` | `Boolean` | `false` | Affiche en superposition avec fond semi-transparent |
| `centered` | `Boolean` | `false` | Centre le loader dans son conteneur |
| `label` | `String` | `'Chargement en cours'` | Label accessible |

---

### FRadio

Bouton radio avec support de groupes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `label` | `String` | `''` | Texte du label |
| `value` | `String \| Number \| Boolean` | **requis** | Valeur de ce bouton radio |
| `modelValue` | `String \| Number \| Boolean` | `null` | Valeur sélectionnée du groupe (v-model) |
| `name` | `String` | **requis** | Nom du groupe radio |
| `disabled` | `Boolean` | `false` | État désactivé |
| `error` | `Boolean` | `false` | État d'erreur |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `change` | `any` | Émis lors de la sélection |

---

### FTextarea

Zone de texte multiligne avec compteur de caractères.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String` | `''` | Valeur du champ (v-model) |
| `label` | `String` | `''` | Label du champ |
| `placeholder` | `String` | `''` | Texte placeholder |
| `rows` | `Number \| String` | `3` | Nombre de lignes |
| `disabled` | `Boolean` | `false` | État désactivé |
| `readonly` | `Boolean` | `false` | État lecture seule |
| `error` | `Boolean` | `false` | État d'erreur |
| `errorMessage` | `String` | `''` | Message d'erreur |
| `maxlength` | `Number \| String` | `null` | Longueur maximale |
| `showCounter` | `Boolean` | `false` | Affiche le compteur de caractères |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `String` | Émis lors de la saisie |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

---

### FToggle

Interrupteur à bascule.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `false` | État activé/désactivé (v-model) |
| `label` | `String` | `''` | Texte du label |
| `disabled` | `Boolean` | `false` | État désactivé |
| `color` | `String` | `'blue'` | Couleur (`'blue'`, `'green'`, `'red'`, `'orange'`, `'purple'`) |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Boolean` | Émis lors du changement |
| `change` | `Boolean` | Émis lors du changement |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

---

### FTypography

Composant de typographie pour les titres et textes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'body'` | Type de typographie (`'h1'`, `'h2'`, `'h3'`, `'h4'`, `'h5'`, `'h6'`, `'body'`, `'caption'`, `'overline'`) |
| `tag` | `String` | `null` | Élément HTML personnalisé (sinon déduit de la variante) |
| `truncate` | `Boolean` | `false` | Tronque le texte avec ellipsis |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu textuel |

---

## Molécules

Les molécules sont des composants construits à partir d'atomes, représentant des éléments d'interface plus complexes.

---

### FAccordionItem

Élément d'accordéon pliable/dépliable.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | **requis** | Titre de l'accordéon |
| `defaultOpen` | `Boolean` | `false` | État ouvert par défaut |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `toggle` | `Boolean` | Émis lors de l'ouverture/fermeture |
| `input` | `Boolean` | Émis lors de l'ouverture/fermeture |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu de l'accordéon |

---

### FAlert

Composant d'alerte pour les messages de notification.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'info'` | Type d'alerte (`'success'`, `'error'`, `'info'`) |
| `title` | `String` | `''` | Titre de l'alerte |
| `message` | `String` | `''` | Message de l'alerte |
| `closable` | `Boolean` | `true` | Affiche le bouton de fermeture |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `close` | - | Émis lors de la fermeture |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé |

---

### FBreadcrumb

Fil d'Ariane pour la navigation.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `Array` | **requis** | Liste des éléments `{ label: String, href?: String, icon?: String }` |
| `separatorIcon` | `String` | `'chevron-right'` | Icône de séparation |
| `ariaLabel` | `String` | `"Fil d'Ariane"` | Label accessible |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `navigate` | `{ item, index, event }` | Émis lors de la navigation |

---

### FButtonGroup

Groupe de boutons adjacents.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `ariaLabel` | `String` | `'Groupe de boutons'` | Label accessible |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Boutons FButton à grouper |

---

### FCard

Carte conteneur avec header, media et actions.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre de la carte |
| `subtitle` | `String` | `''` | Sous-titre |
| `clickable` | `Boolean` | `false` | Carte cliquable |
| `bordered` | `Boolean` | `true` | Affiche une bordure |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `click` | `Event` | Émis lors du clic (si clickable) |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal |
| `header` | En-tête personnalisé |
| `media` | Zone média (images, vidéos) |
| `actions` | Boutons d'action |

---

### FEmptyState

État vide avec icône, message et action.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `icon` | `String` | `'folder'` | Nom de l'icône |
| `title` | `String` | **requis** | Titre principal |
| `description` | `String` | `''` | Description |
| `actionLabel` | `String` | `''` | Label du bouton d'action |
| `actionVariant` | `String` | `'primary'` | Variante du bouton |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `action` | `Event` | Émis lors du clic sur l'action |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu additionnel |

---

### FFilePreview

Prévisualisation de fichier avec suppression.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `fileName` | `String` | **requis** | Nom du fichier |
| `fileType` | `String` | `''` | Type/extension du fichier |
| `loading` | `Boolean` | `false` | État de chargement |
| `disabled` | `Boolean` | `false` | État désactivé |
| `loadingLabel` | `String` | `'Téléversement en cours'` | Label de chargement |
| `removeLabel` | `String` | `'Supprimer le fichier'` | Label du bouton supprimer |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `remove` | - | Émis lors de la suppression |

---

### FFormField

Champ de formulaire avec label, validation et aide.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `id` | `String` | `''` | ID du champ (auto-généré si vide) |
| `label` | `String` | `''` | Label du champ |
| `value` | `String \| Number` | `''` | Valeur (v-model) |
| `type` | `String` | `'text'` | Type de champ |
| `placeholder` | `String` | `''` | Texte placeholder |
| `size` | `String` | `'medium'` | Taille du champ |
| `disabled` | `Boolean` | `false` | État désactivé |
| `readonly` | `Boolean` | `false` | État lecture seule |
| `required` | `Boolean` | `false` | Champ requis |
| `hint` | `String` | `''` | Texte d'aide |
| `errorMessage` | `String` | `''` | Message d'erreur |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `String` | Émis lors de la saisie |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

---

### FListItem

Élément de liste avec support de titre, sous-titre et actions.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre principal |
| `subtitle` | `String` | `''` | Sous-titre |
| `clickable` | `Boolean` | `false` | Élément cliquable |
| `selected` | `Boolean` | `false` | État sélectionné |
| `disabled` | `Boolean` | `false` | État désactivé |
| `truncate` | `Boolean` | `true` | Tronque le texte |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `click` | `Event` | Émis lors du clic |

#### Slots

| Slot | Description |
|------|-------------|
| `left` | Contenu à gauche (icône, avatar) |
| `content` | Contenu personnalisé au centre |
| `right` | Contenu à droite (badge, action) |

---

### FPagination

Composant de pagination.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Number` | `1` | Page courante (v-model) |
| `totalPages` | `Number` | **requis** | Nombre total de pages |
| `maxVisiblePages` | `Number` | `5` | Nombre max de pages visibles |
| `size` | `String` | `'medium'` | Taille (`'small'`, `'medium'`, `'large'`) |
| `variant` | `String` | `'outline'` | Style des boutons (`'outline'`, `'ghost'`) |
| `previousLabel` | `String` | `'Précédent'` | Label bouton précédent |
| `nextLabel` | `String` | `'Suivant'` | Label bouton suivant |
| `showLabels` | `Boolean` | `true` | Affiche les labels texte |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Number` | Émis lors du changement de page |
| `change` | `Number` | Émis lors du changement de page |

---

### FSearchBar

Barre de recherche avec icône et bouton optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `String \| Number` | `''` | Valeur de recherche (v-model) |
| `placeholder` | `String` | `'Rechercher...'` | Texte placeholder |
| `size` | `String` | `'medium'` | Taille (`'small'`, `'medium'`, `'large'`) |
| `iconPosition` | `String` | `'inside'` | Position de l'icône (`'inside'`, `'outside'`) |
| `buttonMode` | `Boolean` | `false` | Affiche un bouton au lieu d'une icône |
| `buttonLabel` | `String` | `'Rechercher'` | Label du bouton |
| `disabled` | `Boolean` | `false` | État désactivé |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `String` | Émis lors de la saisie |
| `search` | `String` | Émis lors de la soumission |
| `focus` | `Event` | Émis lors du focus |
| `blur` | `Event` | Émis lors de la perte de focus |

---

### FStatCard

Carte de statistique avec icône et valeur.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `icon` | `String` | `'info'` | Nom de l'icône |
| `label` | `String` | **requis** | Label de la statistique |
| `value` | `String \| Number` | **requis** | Valeur à afficher |
| `variant` | `String` | `'primary'` | Couleur (`'primary'`, `'success'`, `'danger'`, `'info'`) |
| `layout` | `String` | `'horizontal'` | Disposition (`'horizontal'`, `'vertical'`) |
| `bordered` | `Boolean` | `true` | Affiche une bordure |

---

## Organismes

Les organismes sont des composants complexes composés d'atomes et de molécules, représentant des sections complètes de l'interface.

---

### FActivityFeed

Fil d'activité avec timeline et événements.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `events` | `Array` | `[]` | Liste des événements `{ id, type, title, timestamp, description?, actor?, metadata? }` |
| `eventKey` | `String` | `'id'` | Clé unique des événements |
| `eventTypes` | `Object` | voir ci-dessous | Configuration des types d'événements |
| `loading` | `Boolean` | `false` | État de chargement |
| `loadingNew` | `Boolean` | `false` | Chargement de nouveaux événements |
| `hasMore` | `Boolean` | `false` | Indique s'il y a plus de données |
| `infiniteScroll` | `Boolean` | `false` | Active le scroll infini |
| `infiniteScrollThreshold` | `Number` | `100` | Seuil en pixels pour déclencher le chargement |
| `clickable` | `Boolean` | `false` | Événements cliquables |
| `showTimeline` | `Boolean` | `true` | Affiche la timeline |
| `truncateContent` | `Boolean` | `false` | Tronque le contenu |
| `iconSize` | `String` | `'md'` | Taille des icônes |
| `formatTimestamp` | `Function` | fonction par défaut | Fonction de formatage des dates |
| `emptyIcon` | `String` | `'bell'` | Icône de l'état vide |
| `emptyTitle` | `String` | `'Aucune activité'` | Titre de l'état vide |
| `emptyDescription` | `String` | `"Il n'y a aucun événement..."` | Description de l'état vide |
| `emptyActionLabel` | `String` | `''` | Label de l'action état vide |
| `loadMoreLabel` | `String` | `"Charger plus d'événements"` | Label du bouton charger plus |
| `loadingLabel` | `String` | `'Chargement en cours'` | Label de chargement |

**eventTypes par défaut:**
```javascript
{
  comment: { icon: 'mail', variant: 'primary', label: 'Commentaire' },
  status: { icon: 'info', variant: 'warning', label: 'Statut' },
  create: { icon: 'plus', variant: 'success', label: 'Création' },
  update: { icon: 'edit', variant: 'neutral', label: 'Modification' },
  delete: { icon: 'trash', variant: 'error', label: 'Suppression' },
  default: { icon: 'bell', variant: 'neutral', label: 'Événement' }
}
```

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `event-click` | `event` | Émis lors du clic sur un événement |
| `load-more` | - | Émis pour charger plus d'événements |
| `empty-action` | - | Émis lors du clic sur l'action état vide |

#### Slots

| Slot | Description |
|------|-------------|
| `event-{type}` | Rendu personnalisé pour un type d'événement |
| `event-content` | Contenu personnalisé d'un événement |
| `event-actions` | Actions personnalisées d'un événement |

---

### FDataTable

Tableau de données avec tri, recherche, pagination et sélection.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `Array` | `[]` | Données à afficher |
| `columns` | `Array` | **requis** | Définition des colonnes `{ key, label, sortable?, align? }` |
| `rowKey` | `String` | `'id'` | Clé unique des lignes |
| `selectable` | `Boolean` | `false` | Active la sélection |
| `selected` | `Array` | `[]` | Lignes sélectionnées (v-model:selected) |
| `searchable` | `Boolean` | `false` | Active la recherche |
| `searchPlaceholder` | `String` | `'Rechercher...'` | Placeholder de recherche |
| `paginated` | `Boolean` | `true` | Active la pagination |
| `perPage` | `Number` | `10` | Éléments par page |
| `page` | `Number` | `1` | Page courante (v-model:page) |
| `totalItems` | `Number` | `null` | Total pour pagination serveur |
| `serverMode` | `Boolean` | `false` | Mode serveur (données externes) |
| `loading` | `Boolean` | `false` | État de chargement |
| `defaultSortKey` | `String` | `null` | Colonne de tri par défaut |
| `defaultSortDirection` | `String` | `'asc'` | Direction de tri (`'asc'`, `'desc'`) |
| `size` | `String` | `'medium'` | Taille (`'small'`, `'medium'`, `'large'`) |
| `emptyIcon` | `String` | `'folder'` | Icône état vide |
| `emptyTitle` | `String` | `'Aucune donnée'` | Titre état vide |
| `emptyDescription` | `String` | `"Il n'y a aucun élément..."` | Description état vide |
| `emptyActionLabel` | `String` | `''` | Label action état vide |
| `striped` | `Boolean` | `false` | Lignes alternées |
| `hoverable` | `Boolean` | `true` | Survol des lignes |
| `bordered` | `Boolean` | `false` | Tableau avec bordures |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `row-click` | `row` | Émis lors du clic sur une ligne |
| `sort` | `{ key, direction }` | Émis lors du tri |
| `search` | `query` | Émis lors de la recherche |
| `page-change` | `page` | Émis lors du changement de page |
| `select` | `{ row, selected }` | Émis lors de la sélection d'une ligne |
| `select-all` | `Boolean` | Émis lors de la sélection globale |
| `empty-action` | - | Émis lors du clic sur l'action état vide |
| `update:page` | `Number` | Mise à jour de la page |
| `update:selected` | `Array` | Mise à jour de la sélection |

#### Slots

| Slot | Description |
|------|-------------|
| `actions` | Actions du toolbar avec `{ selectedItems }` |
| `cell-{columnKey}` | Rendu personnalisé d'une cellule avec `{ value, row, column }` |

---

### FFileUpload

Zone de téléversement de fichiers avec drag & drop.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Array` | `[]` | Fichiers (v-model) |
| `accept` | `String` | `''` | Types acceptés (ex: `'image/*,.pdf'`) |
| `multiple` | `Boolean` | `false` | Sélection multiple |
| `maxSize` | `Number` | `0` | Taille max en bytes (0 = illimité) |
| `maxFiles` | `Number` | `0` | Nombre max de fichiers |
| `disabled` | `Boolean` | `false` | État désactivé |
| `showButton` | `Boolean` | `true` | Affiche le bouton de sélection |
| `showProgress` | `Boolean` | `true` | Affiche la barre de progression |
| `dropZoneLabel` | `String` | `'Glissez-déposez vos fichiers ici'` | Label de la zone de dépôt |
| `buttonLabel` | `String` | `'Parcourir'` | Label du bouton |
| `hint` | `String` | `''` | Texte d'aide |
| `loadingLabel` | `String` | `'Téléversement en cours'` | Label de chargement |
| `progressLabel` | `String` | `'Progression'` | Label de progression |
| `errorSizeMessage` | `String` | `'Le fichier dépasse la taille...'` | Message erreur taille |
| `errorTypeMessage` | `String` | `"Ce type de fichier n'est pas..."` | Message erreur type |
| `errorMaxFilesMessage` | `String` | `'Nombre maximum de fichiers...'` | Message erreur nombre |
| `successMessage` | `String` | `'Fichier(s) téléversé(s)...'` | Message de succès |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Array` | Mise à jour des fichiers |
| `files-selected` | `Array` | Fichiers sélectionnés |
| `file-removed` | `file` | Fichier supprimé |
| `upload-start` | `file` | Début du téléversement |
| `upload-progress` | `{ file, progress }` | Progression |
| `upload-success` | `file` | Téléversement réussi |
| `upload-error` | `{ file, error }` | Erreur de téléversement |
| `upload-complete` | `Array` | Tous les fichiers téléversés |
| `upload-all` | `Array` | Démarrage de tous les téléversements |
| `files-cleared` | - | Fichiers effacés |

#### Slots

| Slot | Description |
|------|-------------|
| `label` | Label personnalisé de la zone de dépôt |

#### Méthodes exposées

- `startUpload(fileId)` - Démarre le téléversement d'un fichier
- `updateProgress(fileId, progress)` - Met à jour la progression
- `markAsSuccess(fileId)` - Marque comme téléversé
- `markAsError(fileId, errorMessage)` - Marque comme en erreur
- `clearFiles()` - Efface tous les fichiers
- `getPendingFiles()` - Retourne les fichiers en attente
- `uploadAll()` - Démarre tous les téléversements

---

### FFilterSidebar

Barre latérale de filtres.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `true` | Visibilité (v-model) |
| `title` | `String` | `'Filtres'` | Titre |
| `applyLabel` | `String` | `'Appliquer les filtres'` | Label bouton appliquer |
| `resetLabel` | `String` | `'Réinitialiser'` | Label bouton reset |
| `closable` | `Boolean` | `true` | Bouton de fermeture |
| `position` | `String` | `'left'` | Position (`'left'`, `'right'`) |
| `width` | `String` | `'280px'` | Largeur |
| `filterGroups` | `Array` | `[]` | Configuration des filtres |
| `filters` | `Object` | `{}` | Valeurs des filtres |
| `mobileBreakpoint` | `Number` | `768` | Point de rupture mobile |

**Format filterGroups:**
```javascript
[{
  id: 'category',
  title: 'Catégorie',
  name: 'category',
  type: 'checkbox', // 'checkbox', 'radio', 'toggle', 'text'
  defaultOpen: true,
  options: [
    { value: 'option1', label: 'Option 1', disabled: false }
  ]
}]
```

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Boolean` | Changement de visibilité |
| `close` | - | Fermeture |
| `filter-change` | `{ group, value }` | Changement d'un filtre |
| `apply` | `Object` | Application des filtres |
| `submit` | `Object` | Soumission du formulaire |
| `reset` | - | Réinitialisation |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu personnalisé des filtres |

---

### FForm

Conteneur de formulaire simple.

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `submit` | `Event` | Soumission du formulaire |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Champs du formulaire |
| `actions` | Boutons d'action |

---

### FModal

Fenêtre modale.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Boolean` | `false` | Visibilité (v-model) |
| `title` | `String` | `''` | Titre |
| `subtitle` | `String` | `''` | Sous-titre |
| `closable` | `Boolean` | `true` | Bouton de fermeture |
| `closeOnOverlay` | `Boolean` | `true` | Ferme au clic sur l'overlay |
| `closeOnEscape` | `Boolean` | `true` | Ferme avec Échap |
| `size` | `String` | `'medium'` | Taille (`'small'`, `'medium'`, `'large'`, `'full'`) |
| `bordered` | `Boolean` | `true` | Affiche une bordure |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Boolean` | Changement de visibilité |
| `close` | - | Fermeture |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu principal |
| `header` | En-tête personnalisé |
| `body` | Corps de la modale |
| `actions` | Boutons d'action |

---

### FNavigationSidebar

Barre de navigation latérale.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `collapsed` | `Boolean` | `false` | État replié (v-model:collapsed) |
| `title` | `String` | `''` | Titre de l'application |
| `width` | `String` | `'256px'` | Largeur déplié |
| `collapsedWidth` | `String` | `'64px'` | Largeur replié |
| `collapsible` | `Boolean` | `true` | Peut être replié |
| `items` | `Array` | `[]` | Éléments de navigation |
| `activeRoute` | `String` | `''` | Route active |
| `showThemeToggle` | `Boolean` | `false` | Toggle de thème |
| `isDarkMode` | `Boolean` | `false` | Mode sombre actif |
| `themeToggleLabel` | `String` | `'Mode sombre'` | Label du toggle |
| `position` | `String` | `'left'` | Position (`'left'`, `'right'`) |

**Format items:**
```javascript
[
  { type: 'group', label: 'Section' },
  { type: 'divider' },
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: 'home',
    to: '/dashboard', // ou href
    badge: '5',
    badgeVariant: 'primary',
    disabled: false,
    children: [/* sous-éléments */]
  }
]
```

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:collapsed` | `Boolean` | Changement d'état replié |
| `toggle` | `Boolean` | Toggle replié |
| `submenu-toggle` | `{ item, open }` | Toggle sous-menu |
| `navigate` | `item` | Navigation vers un élément |
| `item-click` | `item` | Clic sur un élément |
| `update:isDarkMode` | `Boolean` | Changement de thème |
| `theme-change` | `Boolean` | Changement de thème |

#### Slots

| Slot | Description |
|------|-------------|
| `branding` | Zone de marque personnalisée |
| `logo` | Logo |
| `navigation` | Navigation personnalisée |
| `footer` | Pied de la sidebar |

---

### FOnboardingStepper

Stepper d'onboarding multi-étapes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `steps` | `Array` | **requis** | Étapes `{ title: String, valid?: Boolean }` |
| `value` | `Number` | `0` | Étape courante (v-model) |
| `canProceed` | `Boolean` | `true` | Peut avancer |
| `previousLabel` | `String` | `'Précédent'` | Label bouton précédent |
| `nextLabel` | `String` | `'Suivant'` | Label bouton suivant |
| `completeLabel` | `String` | `'Terminer'` | Label bouton terminer |
| `bordered` | `Boolean` | `true` | Carte avec bordure |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Number` | Changement d'étape |
| `previous` | `Number` | Retour à l'étape précédente |
| `next` | `Number` | Passage à l'étape suivante |
| `step-change` | `Number` | Changement d'étape |
| `complete` | - | Fin du stepper |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu de l'étape courante |
| `step-{index}` | Contenu d'une étape spécifique |

#### Méthodes exposées

- `goToStep(index)` - Aller à une étape spécifique

---

### FPageHeader

En-tête de page avec breadcrumb, titre et actions.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre de la page |
| `subtitle` | `String` | `''` | Sous-titre |
| `titleVariant` | `String` | `'h1'` | Variante du titre |
| `truncateTitle` | `Boolean` | `false` | Tronque le titre |
| `breadcrumbItems` | `Array` | `[]` | Éléments du breadcrumb |
| `breadcrumbSeparatorIcon` | `String` | `'chevron-right'` | Icône séparateur |
| `breadcrumbAriaLabel` | `String` | `"Fil d'Ariane"` | Label accessible |
| `avatarSrc` | `String` | `''` | URL avatar |
| `avatarAlt` | `String` | `''` | Alt avatar |
| `avatarInitials` | `String` | `''` | Initiales avatar |
| `avatarName` | `String` | `''` | Nom pour initiales |
| `avatarSize` | `String` | `'lg'` | Taille avatar |
| `avatarShape` | `String` | `'circle'` | Forme avatar |
| `avatarStatus` | `String` | `null` | Statut avatar |
| `separator` | `Boolean` | `false` | Ligne de séparation |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `breadcrumb-navigate` | `{ item, index, event }` | Navigation breadcrumb |

#### Slots

| Slot | Description |
|------|-------------|
| `title` | Titre personnalisé |
| `subtitle` | Sous-titre personnalisé |
| `actions` | Boutons d'action |

---

### FProfileSection

Section de profil éditable.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | `''` | Titre de la section |
| `subtitle` | `String` | `''` | Sous-titre |
| `value` | `Object` | `{}` | Données (v-model) |
| `fields` | `Array` | `[]` | Définition des champs |
| `editing` | `Boolean` | `false` | Mode édition |
| `editable` | `Boolean` | `true` | Peut être édité |
| `loading` | `Boolean` | `false` | État de chargement |
| `submitting` | `Boolean` | `false` | En cours de soumission |
| `validate` | `Function` | `null` | Fonction de validation |
| `avatarSrc` | `String` | `''` | URL avatar |
| `avatarAlt` | `String` | `''` | Alt avatar |
| `avatarInitials` | `String` | `''` | Initiales |
| `avatarName` | `String` | `''` | Nom |
| `avatarSize` | `String` | `'lg'` | Taille |
| `avatarShape` | `String` | `'circle'` | Forme |
| `avatarEditable` | `Boolean` | `false` | Avatar éditable |
| `bordered` | `Boolean` | `true` | Carte avec bordure |
| `loaderSize` | `String` | `'md'` | Taille du loader |
| `loadingLabel` | `String` | `'Chargement en cours'` | Label chargement |
| `editButtonLabel` | `String` | `'Modifier'` | Label bouton éditer |
| `saveButtonLabel` | `String` | `'Enregistrer'` | Label bouton sauver |
| `cancelButtonLabel` | `String` | `'Annuler'` | Label bouton annuler |

**Format fields:**
```javascript
[{
  name: 'email',
  label: 'Email',
  type: 'email', // ou 'text', 'textarea'
  placeholder: 'votre@email.com',
  required: true,
  disabled: false,
  rows: 3 // pour textarea
}]
```

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Object` | Mise à jour des données |
| `update:editing` | `Boolean` | Changement mode édition |
| `edit-start` | - | Début édition |
| `edit-cancel` | - | Annulation |
| `field-change` | `{ field, value, formData }` | Changement de champ |
| `submit` | `{ data, done, fail }` | Soumission |
| `save-success` | `{ data, message }` | Sauvegarde réussie |
| `save-error` | `{ data, message }` | Erreur de sauvegarde |
| `avatar-edit` | - | Édition de l'avatar |

#### Slots

| Slot | Description |
|------|-------------|
| `edit-button-content` | Contenu du bouton éditer |
| `avatar-edit` | Bouton d'édition avatar |
| `avatar-info` | Info à côté de l'avatar |
| `edit-fields` | Champs en mode édition `{ formData, errors }` |
| `read-fields` | Affichage en mode lecture `{ data }` |

---

### FUserMenu

Menu utilisateur déroulant.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isLoggedIn` | `Boolean` | `true` | Utilisateur connecté |
| `value` | `Boolean` | `false` | Menu ouvert (v-model) |
| `userName` | `String` | `''` | Nom de l'utilisateur |
| `userEmail` | `String` | `''` | Email |
| `avatarSrc` | `String` | `''` | URL avatar |
| `avatarAlt` | `String` | `''` | Alt avatar |
| `avatarInitials` | `String` | `''` | Initiales |
| `avatarName` | `String` | `''` | Nom pour initiales |
| `avatarSize` | `String` | `'md'` | Taille avatar |
| `avatarStatus` | `String` | `null` | Statut |
| `showUserName` | `Boolean` | `false` | Affiche le nom dans le trigger |
| `showChevron` | `Boolean` | `true` | Affiche la flèche |
| `showUserInfo` | `Boolean` | `true` | Affiche les infos dans le menu |
| `menuItems` | `Array` | `[]` | Éléments du menu |
| `showLogout` | `Boolean` | `true` | Affiche déconnexion |
| `logoutLabel` | `String` | `'Déconnexion'` | Label déconnexion |
| `dropdownAlign` | `String` | `'right'` | Alignement (`'left'`, `'right'`) |
| `dropdownWidth` | `String` | `'w-56'` | Largeur CSS |
| `menuAriaLabel` | `String` | `'Menu utilisateur'` | Label accessible |

**Format menuItems:**
```javascript
[
  { key: 'profile', label: 'Mon profil', icon: 'user' },
  { divider: true },
  { key: 'settings', label: 'Paramètres', icon: 'cog', disabled: false }
]
```

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `input` | `Boolean` | Changement d'état ouvert |
| `toggle` | `Boolean` | Toggle du menu |
| `close` | - | Fermeture |
| `item-click` | `{ item, event }` | Clic sur un élément |
| `navigate` | `{ item, event }` | Navigation |
| `logout` | - | Déconnexion |

#### Slots

| Slot | Description |
|------|-------------|
| `menu-items` | Éléments de menu personnalisés |

---

## Système de thème

Fabric utilise des tokens de couleur sémantiques définis via des propriétés CSS personnalisées. Les principales palettes sont :

- **primary** : Couleur principale de l'application
- **success** : Succès, validation
- **danger** : Erreurs, suppressions
- **warning** : Avertissements
- **neutral** : Gris, éléments neutres
- **surface** : Surfaces et arrière-plans

Chaque palette comprend des variantes (50, 100, 200, ..., 900) pour différents niveaux de contraste.

---

## Installation et utilisation

### Installation

```bash
npm install @pyreweb/fabric
```

### Importation globale

```javascript
import Vue from 'vue';
import Fabric from '@pyreweb/fabric';
import '@pyreweb/fabric/dist/fabric.css';

Vue.use(Fabric);
```

### Importation à la demande

```javascript
import { FButton, FInput, FDataTable } from '@pyreweb/fabric';
import '@pyreweb/fabric/dist/fabric.css';

export default {
  components: {
    FButton,
    FInput,
    FDataTable
  }
};
```

---

## Ressources additionnelles

- [Documentation Storybook](https://fabric.pyreweb.com) - Documentation interactive avec exemples
- [Code source](https://github.com/agencepyreweb/fabric) - Repository GitHub
- [Signaler un bug](https://github.com/agencepyreweb/fabric/issues) - Tracker d'issues

---

*Documentation générée pour Fabric v25.12.0-beta.2*
