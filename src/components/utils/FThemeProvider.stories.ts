import type { Meta, StoryFn } from '@storybook/vue';
import FThemeProvider from './FThemeProvider.vue';

export default {
	title: 'Utils/FThemeProvider',
	component: FThemeProvider,
	argTypes: {
		defaultTheme: {
			control: { type: 'select' },
			options: ['light', 'dark', 'auto'],
			description: 'Default theme to use when no preference is stored'
		},
		storageKey: {
			control: { type: 'text' },
			description: 'Key used for localStorage persistence'
		},
		enablePersistence: {
			control: { type: 'boolean' },
			description: 'Enable or disable localStorage persistence'
		}
	}
} as Meta<typeof FThemeProvider>;

const Template: StoryFn<typeof FThemeProvider> = (args, { argTypes }) => ({
	components: { FThemeProvider },
	props: Object.keys(argTypes),
	template: `
<f-theme-provider v-bind="$props" v-slot="{ theme, toggleTheme, setTheme }">
<div class="min-h-screen p-8 transition-colors duration-300" 
     :style="{
       backgroundColor: 'var(--theme-background)',
       color: 'var(--theme-foreground)'
     }">
<div class="max-w-4xl mx-auto space-y-6">
<!-- Theme Controls -->
<div class="flex gap-4 mb-8">
<button 
@click="toggleTheme" 
class="px-4 py-2 rounded-lg font-medium transition-colors"
:style="{
backgroundColor: 'var(--theme-primary)',
color: 'var(--theme-primary-foreground)'
}">
Basculer le Thème
</button>
<button 
@click="setTheme('light')" 
class="px-4 py-2 rounded-lg border transition-colors"
:style="{
borderColor: 'var(--theme-border)',
backgroundColor: theme === 'light' ? 'var(--theme-primary)' : 'var(--theme-card)',
color: theme === 'light' ? 'var(--theme-primary-foreground)' : 'var(--theme-foreground)'
}">
Mode Clair
</button>
<button 
@click="setTheme('dark')" 
class="px-4 py-2 rounded-lg border transition-colors"
:style="{
borderColor: 'var(--theme-border)',
backgroundColor: theme === 'dark' ? 'var(--theme-primary)' : 'var(--theme-card)',
color: theme === 'dark' ? 'var(--theme-primary-foreground)' : 'var(--theme-foreground)'
}">
Mode Sombre
</button>
</div>

<!-- Current Theme Display -->
<div class="p-4 rounded-lg border"
     :style="{
       backgroundColor: 'var(--theme-card)',
       borderColor: 'var(--theme-border)'
     }">
<h3 class="text-lg font-semibold mb-2">
Thème actuel : <strong>{{ theme }}</strong>
</h3>
<p :style="{ color: 'var(--theme-muted-foreground)' }">
Le thème est automatiquement persisté dans localStorage et appliqué à tous les composants.
</p>
</div>

<!-- Color Palette Demo -->
<div class="space-y-4">
<h2 class="text-2xl font-bold">Palette de Couleurs</h2>

<!-- Primary Colors -->
<div>
<h3 class="text-lg font-semibold mb-2">Primaire</h3>
<div class="flex gap-2 flex-wrap">
<div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
     :key="shade"
     class="w-16 h-16 rounded flex items-center justify-center text-xs font-bold"
     :style="{
       backgroundColor: 'var(--color-primary-' + shade + ')',
       color: shade >= 500 ? 'white' : 'black'
     }">
{{ shade }}
</div>
</div>
</div>

<!-- Success Colors -->
<div>
<h3 class="text-lg font-semibold mb-2">Succès</h3>
<div class="flex gap-2 flex-wrap">
<div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
     :key="shade"
     class="w-16 h-16 rounded flex items-center justify-center text-xs font-bold"
     :style="{
       backgroundColor: 'var(--color-success-' + shade + ')',
       color: shade >= 500 ? 'white' : 'black'
     }">
{{ shade }}
</div>
</div>
</div>

<!-- Danger Colors -->
<div>
<h3 class="text-lg font-semibold mb-2">Danger</h3>
<div class="flex gap-2 flex-wrap">
<div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
     :key="shade"
     class="w-16 h-16 rounded flex items-center justify-center text-xs font-bold"
     :style="{
       backgroundColor: 'var(--color-danger-' + shade + ')',
       color: shade >= 500 ? 'white' : 'black'
     }">
{{ shade }}
</div>
</div>
</div>

<!-- Warning Colors -->
<div>
<h3 class="text-lg font-semibold mb-2">Avertissement</h3>
<div class="flex gap-2 flex-wrap">
<div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" 
     :key="shade"
     class="w-16 h-16 rounded flex items-center justify-center text-xs font-bold"
     :style="{
       backgroundColor: 'var(--color-warning-' + shade + ')',
       color: shade >= 500 ? 'white' : 'black'
     }">
{{ shade }}
</div>
</div>
</div>
</div>

<!-- Semantic Theme Variables -->
<div class="space-y-4 mt-8">
<h2 class="text-2xl font-bold">Variables Thématiques Sémantiques</h2>
<div class="grid grid-cols-2 gap-4">
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-background</p>
<div class="w-full h-12 rounded" :style="{ backgroundColor: 'var(--theme-background)', border: '1px solid var(--theme-border)' }"></div>
</div>
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-foreground</p>
<div class="w-full h-12 rounded" :style="{ backgroundColor: 'var(--theme-foreground)' }"></div>
</div>
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-card</p>
<div class="w-full h-12 rounded" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }"></div>
</div>
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-muted</p>
<div class="w-full h-12 rounded" :style="{ backgroundColor: 'var(--theme-muted)' }"></div>
</div>
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-primary</p>
<div class="w-full h-12 rounded" :style="{ backgroundColor: 'var(--theme-primary)' }"></div>
</div>
<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<p class="font-mono text-sm mb-2">--theme-border</p>
<div class="w-full h-12 rounded border-4" :style="{ borderColor: 'var(--theme-border)' }"></div>
</div>
</div>
</div>

<!-- Example Cards -->
<div class="space-y-4 mt-8">
<h2 class="text-2xl font-bold">Exemples de Cartes</h2>
<div class="grid grid-cols-3 gap-4">
<div class="p-6 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<h3 class="text-lg font-semibold mb-2">Carte 1</h3>
<p :style="{ color: 'var(--theme-muted-foreground)' }">
Contenu de la première carte avec un style thématique.
</p>
</div>
<div class="p-6 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<h3 class="text-lg font-semibold mb-2">Carte 2</h3>
<p :style="{ color: 'var(--theme-muted-foreground)' }">
Contenu de la deuxième carte.
</p>
</div>
<div class="p-6 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
<h3 class="text-lg font-semibold mb-2">Carte 3</h3>
<p :style="{ color: 'var(--theme-muted-foreground)' }">
Contenu de la troisième carte.
</p>
</div>
</div>
</div>
</div>
</div>
</f-theme-provider>
`
});

export const Default = Template.bind({});
Default.args = {
	defaultTheme: 'light',
	storageKey: 'fabric-theme',
	enablePersistence: true
};

export const DarkMode = Template.bind({});
DarkMode.args = {
	defaultTheme: 'dark',
	storageKey: 'fabric-theme',
	enablePersistence: true
};

export const AutoMode = Template.bind({});
AutoMode.args = {
	defaultTheme: 'auto',
	storageKey: 'fabric-theme',
	enablePersistence: true
};

export const NoPersistence = Template.bind({});
NoPersistence.args = {
	defaultTheme: 'light',
	enablePersistence: false
};
