<br />

<div align="center">

<a href="https://github.com/agencepyreweb/fabric">
	<img src="./.github/logos/7.png" alt="Logo" height="160" loading="lazy">
</a>

<h3 align="center">Fabric</h3>

<p align="center">
	Système de design et bibliothèque de composants VueJS de la société Pyréweb.
	<br />
	<br />
	<a href="https://fabric.pyreweb.com"><strong>Explorer la documentation »</strong></a>
	<br />
	<br />
	<a href="https://github.com/agencepyreweb/fabric/issues">Reporter une anomalie ou demander une nouveauté</a>
</p>

</div>

<br />

## 🚀 Fonctionnalités

- ✅ **Composants Vue 2.7** - Bibliothèque complète de composants réutilisables
- ✅ **TypeScript** - Support TypeScript complet avec types stricts pour les événements et les slots
- ✅ **Design System** - Architecture Atomic Design (Atoms, Molecules, Organisms)
- ✅ **Thématisation** - Système de thèmes avec support Dark/Light Mode intégré
- ✅ **Transitions harmonisées** - Micro-interactions cohérentes avec durées et courbes standardisées
- ✅ **Documentation** - Storybook interactif avec exemples
- ✅ **Accessibilité** - Composants conformes aux standards WCAG
- ✅ **Tailwind CSS** - Styling moderne et personnalisable

## 📖 Documentation TypeScript

Fabric offre un **support TypeScript complet** avec :

- **Types stricts** pour tous les props et événements
- **Slots scopés typés** avec autocomplétion du contexte
- **Documentation inline** via JSDoc dans votre IDE
- **Vérification de types** à la compilation

📚 Consultez le [Guide TypeScript](./docs/TYPESCRIPT_GUIDE.md) pour plus de détails et des exemples pratiques.

## 🎨 Thématisation et Mode Sombre

Fabric intègre un **système de thématisation complet** avec :

- **Support natif du Dark/Light Mode** avec basculement dynamique
- **Variables CSS personnalisables** pour adapter les couleurs à votre marque
- **Composant FThemeProvider** pour une gestion simplifiée du thème
- **Persistance automatique** des préférences utilisateur
- **Mode auto** qui suit les préférences système

```vue
<f-theme-provider v-slot="{ theme, toggleTheme }">
  <button @click="toggleTheme">
    Mode {{ theme === 'light' ? 'sombre' : 'clair' }}
  </button>
</f-theme-provider>
```

📚 Consultez le [Guide de Thématisation](./docs/THEMING.md) pour plus de détails.

## ✨ Système de Transitions et Micro-interactions

Fabric implémente un **système de transitions harmonisées** pour une expérience utilisateur cohérente :

- **Durées standardisées** (fast: 100ms, base: 200ms, slow: 300ms)
- **Courbes d'animation** optimisées pour différents types d'interactions
- **Variables CSS** centralisées pour une personnalisation facile
- **Performance optimisée** avec des transitions GPU-accelerated

```vue
<button class="transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]">
  Cliquez-moi
</button>
```

📚 Consultez le [Guide des Transitions](./docs/TRANSITIONS.md) pour plus de détails.

## Développement

### Storybook

Pour lancer Storybook en mode développement :

```bash
npm run storybook
```

### Prévisualiser le build statique de Storybook

Pour construire et prévisualiser le Storybook statique localement :

```bash
npm run build-storybook
npm run preview-storybook
```

Le serveur sera accessible à l'adresse `http://localhost:6006`.

> ⚠️ **Note importante** : N'ouvrez pas le fichier `storybook-static/index.html` directement via le protocole `file://`. Les navigateurs modernes bloquent le chargement des modules JavaScript depuis le protocole `file://` pour des raisons de sécurité (erreurs CORS). Utilisez toujours `npm run preview-storybook` pour lancer un serveur HTTP local.

## Composants de la bibliothèque

### Atomes

Les composants de type "atoms" sont disponible dans la page [src/components/atoms](https://github.com/agencepyreweb/fabric/tree/main/src/components/atoms).

### Molécules

Les composants de type "molecules" sont disponible [src/components/molecules](https://github.com/agencepyreweb/fabric/tree/main/src/components/molecules).

### Organismes

Les composants de type "organisms" sont disponible [src/components/organisms](https://github.com/agencepyreweb/fabric/tree/main/src/components/organisms).