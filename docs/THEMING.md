# Guide de Thématisation - Fabric Design System

Ce guide explique comment utiliser le système de thématisation de Fabric, incluant le support du mode sombre (Dark Mode) et la personnalisation des couleurs.

## Table des Matières

- [Introduction](#introduction)
- [Utilisation Rapide](#utilisation-rapide)
- [Variables CSS Disponibles](#variables-css-disponibles)
- [Composant FThemeProvider](#composant-fthemeprovider)
- [Personnalisation Avancée](#personnalisation-avancée)
- [Exemples](#exemples)

## Introduction

Le système de thématisation de Fabric utilise des **variables CSS (Custom Properties)** pour permettre :

1. **Basculement dynamique entre mode clair et mode sombre**
2. **Personnalisation facile** des couleurs par les utilisateurs de la librairie
3. **Cohérence visuelle** à travers tous les composants

## Utilisation Rapide

### 1. Utiliser le composant FThemeProvider

La manière la plus simple d'activer le thème est d'utiliser le composant `FThemeProvider` :

```vue
<template>
  <f-theme-provider v-slot="{ theme, toggleTheme }">
    <div>
      <button @click="toggleTheme">
        Basculer en mode {{ theme === 'light' ? 'sombre' : 'clair' }}
      </button>
      
      <!-- Votre application ici -->
      <f-button variant="primary">Mon Bouton</f-button>
    </div>
  </f-theme-provider>
</template>

<script>
import { FThemeProvider, FButton } from '@pyreweb/fabric';

export default {
  components: {
    FThemeProvider,
    FButton
  }
};
</script>
```

### 2. Utilisation avec l'attribut data-theme (Sans composant)

Vous pouvez aussi gérer le thème manuellement en ajoutant l'attribut `data-theme` :

```html
<!-- Mode clair -->
<html data-theme="light">
  ...
</html>

<!-- Mode sombre -->
<html data-theme="dark">
  ...
</html>
```

```javascript
// Basculer le thème avec JavaScript
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

## Variables CSS Disponibles

### Variables de Couleurs de Base

Fabric fournit des palettes complètes pour chaque couleur :

```css
/* Couleurs Primaires (Bleu par défaut) */
--color-primary-50   /* Plus clair */
--color-primary-100
--color-primary-200
--color-primary-300
--color-primary-400
--color-primary-500  /* Couleur de base */
--color-primary-600
--color-primary-700
--color-primary-800
--color-primary-900
--color-primary-950  /* Plus foncé */

/* Couleurs de Succès (Vert) */
--color-success-50 → --color-success-950

/* Couleurs de Danger (Rouge) */
--color-danger-50 → --color-danger-950

/* Couleurs d'Avertissement (Jaune/Orange) */
--color-warning-50 → --color-warning-950

/* Couleurs Neutres (Gris) */
--color-neutral-50 → --color-neutral-950
```

### Variables Thématiques Sémantiques

Ces variables s'adaptent automatiquement au thème actif :

```css
/* Arrière-plans */
--theme-background          /* Couleur de fond principale */
--theme-foreground          /* Couleur du texte principal */
--theme-card                /* Couleur de fond des cartes */
--theme-card-foreground     /* Couleur du texte des cartes */
--theme-muted               /* Arrière-plan atténué */
--theme-muted-foreground    /* Texte atténué */

/* Bordures */
--theme-border              /* Couleur des bordures */

/* Champs de saisie */
--theme-input-background    /* Fond des inputs */
--theme-input-border        /* Bordure des inputs */
--theme-input-foreground    /* Texte des inputs */
--theme-input-placeholder   /* Placeholder des inputs */

/* Couleurs d'accent (adaptées au thème) */
--theme-primary
--theme-primary-foreground
--theme-success
--theme-success-foreground
--theme-danger
--theme-danger-foreground
--theme-warning
--theme-warning-foreground
```

## Composant FThemeProvider

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `defaultTheme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Thème par défaut à utiliser |
| `storageKey` | `String` | `'fabric-theme'` | Clé pour la persistance localStorage |
| `enablePersistence` | `Boolean` | `true` | Activer/désactiver la persistance |

### Scoped Slot Props

Le composant expose les propriétés suivantes via le scoped slot :

```vue
<f-theme-provider v-slot="{ theme, toggleTheme, setTheme }">
  <!-- theme: 'light' | 'dark' (thème actuel résolu) -->
  <!-- toggleTheme: Function - Bascule entre light et dark -->
  <!-- setTheme: Function - Définit un thème spécifique -->
</f-theme-provider>
```

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `theme-change` | `'light' \| 'dark'` | Émis quand le thème change |

### Exemples d'Utilisation

#### Thème Automatique (Basé sur les Préférences Système)

```vue
<f-theme-provider default-theme="auto">
  <my-app />
</f-theme-provider>
```

#### Désactiver la Persistance

```vue
<f-theme-provider :enable-persistence="false">
  <my-app />
</f-theme-provider>
```

#### Écouter les Changements de Thème

```vue
<f-theme-provider @theme-change="handleThemeChange">
  <my-app />
</f-theme-provider>
```

```javascript
methods: {
  handleThemeChange(newTheme) {
    console.log('Nouveau thème:', newTheme);
    // Logique personnalisée
  }
}
```

## Personnalisation Avancée

### Surcharger les Couleurs Primaires

Créez votre propre fichier CSS pour personnaliser les couleurs :

```css
/* custom-theme.css */
:root {
  /* Remplacer la couleur primaire par du violet */
  --color-primary-50: oklch(0.97 0.02 300);
  --color-primary-100: oklch(0.93 0.05 300);
  --color-primary-200: oklch(0.87 0.10 300);
  --color-primary-300: oklch(0.76 0.15 300);
  --color-primary-400: oklch(0.63 0.20 300);
  --color-primary-500: oklch(0.55 0.22 300);
  --color-primary-600: oklch(0.49 0.22 300);
  --color-primary-700: oklch(0.42 0.19 300);
  --color-primary-800: oklch(0.35 0.15 300);
  --color-primary-900: oklch(0.28 0.12 300);
  --color-primary-950: oklch(0.21 0.08 300);
}
```

Importez ce fichier **après** le CSS de Fabric :

```javascript
import '@pyreweb/fabric/dist/fabric.css';
import './custom-theme.css';
```

### Créer un Thème Personnalisé

Vous pouvez créer des thèmes personnalisés en utilisant l'attribut `data-theme` :

```css
/* Thème "Ocean" personnalisé */
[data-theme="ocean"] {
  --theme-background: oklch(0.95 0.02 220);
  --theme-foreground: oklch(0.20 0.05 220);
  --theme-card: oklch(0.98 0.01 220);
  --theme-primary: oklch(0.50 0.20 220);
  /* ... autres variables ... */
}
```

```javascript
// Activer le thème Ocean
document.documentElement.setAttribute('data-theme', 'ocean');
```

### Utiliser les Variables dans vos Composants

```vue
<template>
  <div class="my-component">
    <h1>Mon Composant</h1>
    <p>Texte avec couleur thématique</p>
  </div>
</template>

<style scoped>
.my-component {
  background-color: var(--theme-card);
  color: var(--theme-card-foreground);
  border: 1px solid var(--theme-border);
  padding: 1rem;
}

.my-component h1 {
  color: var(--theme-primary);
}

.my-component p {
  color: var(--theme-muted-foreground);
}
</style>
```

## Exemples

### Exemple Complet : Application avec Sélecteur de Thème

```vue
<template>
  <f-theme-provider 
    default-theme="auto" 
    v-slot="{ theme, setTheme }"
    @theme-change="onThemeChange"
  >
    <div class="app">
      <!-- Header avec sélecteur de thème -->
      <header class="header">
        <h1>Mon Application</h1>
        <div class="theme-selector">
          <f-button 
            @click="setTheme('light')" 
            :variant="theme === 'light' ? 'primary' : 'outline'"
            size="sm"
          >
            ☀️ Clair
          </f-button>
          <f-button 
            @click="setTheme('dark')" 
            :variant="theme === 'dark' ? 'primary' : 'outline'"
            size="sm"
          >
            🌙 Sombre
          </f-button>
          <f-button 
            @click="setTheme('auto')" 
            variant="outline"
            size="sm"
          >
            🔄 Auto
          </f-button>
        </div>
      </header>

      <!-- Contenu -->
      <main class="content">
        <f-card>
          <template #title>Bienvenue</template>
          <template #content>
            Thème actuel : <strong>{{ theme }}</strong>
          </template>
        </f-card>
      </main>
    </div>
  </f-theme-provider>
</template>

<script>
import { FThemeProvider, FButton, FCard } from '@pyreweb/fabric';

export default {
  components: {
    FThemeProvider,
    FButton,
    FCard
  },
  methods: {
    onThemeChange(newTheme) {
      console.log('Thème changé vers:', newTheme);
    }
  }
};
</script>

<style>
.app {
  min-height: 100vh;
  background-color: var(--theme-background);
  color: var(--theme-foreground);
  transition: background-color 0.3s, color 0.3s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--theme-border);
  background-color: var(--theme-card);
}

.theme-selector {
  display: flex;
  gap: 0.5rem;
}

.content {
  padding: 2rem;
}
</style>
```

### Exemple : Détection Automatique et Synchronisation

```vue
<template>
  <f-theme-provider 
    default-theme="auto"
    @theme-change="syncThemeWithServer"
  >
    <my-app />
  </f-theme-provider>
</template>

<script>
export default {
  methods: {
    async syncThemeWithServer(theme) {
      // Sauvegarder la préférence utilisateur sur le serveur
      try {
        await this.$http.post('/api/user/preferences', {
          theme: theme
        });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du thème:', error);
      }
    }
  }
};
</script>
```

## Bonnes Pratiques

1. **Utilisez toujours les variables thématiques** (`--theme-*`) plutôt que les couleurs fixes dans vos composants personnalisés
2. **Testez votre UI dans les deux modes** (clair et sombre) pour garantir une bonne lisibilité
3. **Ajoutez des transitions CSS** pour rendre le changement de thème plus fluide
4. **Respectez les préférences système** en utilisant le mode `auto` par défaut
5. **Documentez les personnalisations** si vous surchargez les variables

## Support des Navigateurs

Le système de thématisation utilise les CSS Custom Properties (variables CSS) qui sont supportées par tous les navigateurs modernes :

- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- Opera 36+

Pour un support des anciens navigateurs, vous pouvez utiliser un polyfill CSS Custom Properties.

## Ressources

- [Storybook - Exemples de Thématisation](https://fabric.pyreweb.com)
- [Guide TypeScript](./TYPESCRIPT_GUIDE.md)
- [Documentation des Composants](https://fabric.pyreweb.com)
