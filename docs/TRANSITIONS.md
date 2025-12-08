# Système de Transitions et Micro-interactions

Ce document décrit le système de transitions harmonisées implémenté dans Fabric pour assurer une expérience utilisateur cohérente et professionnelle à travers tous les composants.

## 🎯 Objectif

Standardiser les micro-interactions visuelles et temporelles pour créer un Design System cohérent qui offre un ressenti poli, réactif et professionnel. Les transitions harmonisées améliorent :

- **La cohérence visuelle** : Tous les composants partagent les mêmes durées et courbes d'animation
- **La prévisibilité** : Les utilisateurs peuvent anticiper le comportement des interactions
- **La performance** : Des transitions optimisées pour ne pas nuire à l'expérience
- **La maintenance** : Centralisation des valeurs pour faciliter les ajustements futurs

## 📊 Variables CSS

Le système de transitions est basé sur des variables CSS définies dans `src/styles/tailwind.css` :

### Durées de Transition

```css
--transition-duration-fast: 100ms;   /* Pour les feedbacks instantanés */
--transition-duration-base: 200ms;   /* Pour les interactions standard */
--transition-duration-slow: 300ms;   /* Pour les animations complexes */
```

#### Quand utiliser chaque durée ?

- **`--transition-duration-fast` (100ms)** :
  - Survol de boutons ou de liens
  - Changements de couleur simples
  - Feedbacks immédiats sur des éléments légers
  - Exemple : Survol d'une option dans un menu déroulant

- **`--transition-duration-base` (200ms)** :
  - Interactions standard (hover, focus, états)
  - Transitions de formulaires
  - Changements d'état de composants
  - Exemple : Toggle switch, changement de focus sur un input

- **`--transition-duration-slow` (300ms)** :
  - Ouverture/fermeture de modales
  - Expansion/réduction d'accordéons
  - Animations de navigation (drawer, sidebar)
  - Exemple : Ouverture d'un tiroir latéral

### Courbes d'Animation (Easing)

```css
--transition-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);    /* ease-in-out avec emphase */
--transition-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);    /* ease-out pour mouvements importants */
```

#### Quand utiliser chaque courbe ?

- **`--transition-easing-standard`** :
  - Transitions bidirectionnelles (hover in/out)
  - Changements d'état réversibles
  - Animations symétriques
  - Exemple : Changement de couleur au survol d'un bouton

- **`--transition-easing-emphasized`** :
  - Mouvements unidirectionnels importants
  - Ouverture/fermeture d'éléments
  - Animations avec impact visuel
  - Exemple : Expansion d'un accordéon, ouverture d'une modale

## 🛠️ Utilisation

### Dans les Composants Vue

Pour appliquer les transitions standardisées dans vos composants, utilisez les classes Tailwind avec les variables CSS :

```vue
<template>
  <button
    class="transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]"
  >
    Cliquez-moi
  </button>
</template>
```

### Exemples par Type de Transition

#### Transitions de Couleur

Pour les changements de couleur de fond, texte ou bordure :

```vue
<div class="transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]">
  <!-- Contenu -->
</div>
```

#### Transitions de Transformation

Pour les translations, rotations ou scales :

```vue
<div class="transition-transform duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]">
  <!-- Contenu -->
</div>
```

#### Transitions Multiples

Pour animer plusieurs propriétés simultanément :

```vue
<div class="transition-all duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]">
  <!-- Contenu -->
</div>
```

## 📦 Composants Mis à Jour

Le système de transitions harmonisées a été appliqué aux composants suivants :

### Composants Atomiques

- **FButton** : Hover, focus, états désactivés
- **FToggle** : Changement d'état du switch et du thumb
- **FCheckbox** : Changement d'état
- **FRadio** : Changement d'état et sélection
- **FInput** : Focus, bordures, états d'erreur
- **FTextarea** : Focus, bordures, états d'erreur

### Composants Moléculaires

- **FListItem** : Hover, sélection, focus
- **FAccordionItem** : Expansion/réduction du contenu, rotation de l'icône
- **FCard** : Hover avec élévation (shadow et translation)
- **FSelect** : Trigger, dropdown, options, icône de chevron

### Composants Organismes

- **FModal** : Overlay et conteneur modal
- **FDrawer** : Overlay et panneau tiroir
- **FDataTable** : Hover sur les lignes
- **FNavigationSidebar** : Collapse/expand, items, sous-menus
- **FOnboardingStepper** : Changements d'état des étapes
- **FUserMenu** : Trigger et items
- **FFilterSidebar** : Slide in/out
- **FProfileSection** : Boutons d'édition

## 🎨 Bonnes Pratiques

### 1. Cohérence

Utilisez toujours les variables CSS définies plutôt que des valeurs en dur :

```vue
<!-- ✅ BON -->
<div class="transition-colors duration-[var(--transition-duration-base)]">

<!-- ❌ MAUVAIS -->
<div class="transition-colors duration-200">
```

### 2. Performance

- Préférez animer `transform` et `opacity` plutôt que `width`, `height` ou `top/left`
- Utilisez `transition-all` avec parcimonie (seulement quand nécessaire)
- Évitez les transitions sur des éléments lourds en layout

```vue
<!-- ✅ BON (performant) -->
<div class="transition-transform duration-[var(--transition-duration-base)]">

<!-- ⚠️ À ÉVITER (moins performant) -->
<div class="transition-all duration-[var(--transition-duration-base)]">
```

### 3. Accessibilité

Respectez les préférences utilisateur pour les animations réduites :

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Subtilité

Les transitions doivent améliorer l'expérience sans la dominer :

- Les animations doivent être rapides et fluides
- Évitez les durées supérieures à 300ms pour les interactions standard
- Les transitions ne doivent pas ralentir l'utilisation

## 🔄 Migration

Si vous avez des composants existants avec des transitions personnalisées, voici comment migrer :

### Avant

```vue
<button class="transition-colors duration-150 ease-in-out">
  Cliquez
</button>
```

### Après

```vue
<button class="transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]">
  Cliquez
</button>
```

## 📚 Références

- [MDN - CSS Transitions](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [Material Design - Motion](https://m3.material.io/styles/motion/overview)
- [CSS Easing Functions](https://easings.net/)
- [Web Animation Performance](https://web.dev/animations-guide/)

## 💡 Support

Pour toute question ou suggestion concernant le système de transitions, veuillez consulter :
- La documentation du Design System
- Les exemples dans Storybook
- L'équipe de développement Fabric
