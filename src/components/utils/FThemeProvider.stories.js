import FThemeProvider from './FThemeProvider.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FCard from '../../molecules/FCard/FCard.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FAlert from '../../molecules/FAlert/FAlert.vue';

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
};

const Template = (args, { argTypes }) => ({
	components: { FThemeProvider, FButton, FCard, FTypography, FAlert },
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
						<f-button @click="toggleTheme" variant="primary">
							Basculer le Thème
						</f-button>
						<f-button @click="setTheme('light')" variant="secondary">
							Mode Clair
						</f-button>
						<f-button @click="setTheme('dark')" variant="secondary">
							Mode Sombre
						</f-button>
						<f-button @click="setTheme('auto')" variant="secondary">
							Auto (Système)
						</f-button>
					</div>

					<!-- Current Theme Display -->
					<div class="p-4 rounded-lg border"
					     :style="{
					       backgroundColor: 'var(--theme-card)',
					       borderColor: 'var(--theme-border)'
					     }">
						<f-typography variant="h6" class="mb-2">
							Thème actuel : <strong>{{ theme }}</strong>
						</f-typography>
					</div>

					<!-- Color Palette Demo -->
					<div class="space-y-4">
						<f-typography variant="h4">
							Palette de Couleurs
						</f-typography>

						<!-- Primary Colors -->
						<div>
							<f-typography variant="h6" class="mb-2">Primaire</f-typography>
							<div class="flex gap-2">
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
							<f-typography variant="h6" class="mb-2">Succès</f-typography>
							<div class="flex gap-2">
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
							<f-typography variant="h6" class="mb-2">Danger</f-typography>
							<div class="flex gap-2">
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
							<f-typography variant="h6" class="mb-2">Avertissement</f-typography>
							<div class="flex gap-2">
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

					<!-- Component Examples -->
					<div class="space-y-4 mt-8">
						<f-typography variant="h4">
							Exemples de Composants
						</f-typography>

						<!-- Buttons -->
						<div class="space-y-2">
							<f-typography variant="h6">Boutons</f-typography>
							<div class="flex gap-2 flex-wrap">
								<f-button variant="primary">Primaire</f-button>
								<f-button variant="secondary">Secondaire</f-button>
								<f-button variant="outline">Outline</f-button>
								<f-button variant="ghost">Ghost</f-button>
								<f-button variant="danger">Danger</f-button>
							</div>
						</div>

						<!-- Alerts -->
						<div class="space-y-2">
							<f-typography variant="h6">Alertes</f-typography>
							<f-alert variant="success" title="Succès" message="Ceci est un message de succès." />
							<f-alert variant="error" title="Erreur" message="Ceci est un message d'erreur." />
							<f-alert variant="info" title="Information" message="Ceci est un message d'information." />
						</div>

						<!-- Cards -->
						<div class="space-y-2">
							<f-typography variant="h6">Cartes</f-typography>
							<div class="grid grid-cols-3 gap-4">
								<f-card>
									<template #title>Carte 1</template>
									<template #content>
										<p :style="{ color: 'var(--theme-muted-foreground)' }">
											Contenu de la première carte avec un style thématique.
										</p>
									</template>
								</f-card>
								<f-card>
									<template #title>Carte 2</template>
									<template #content>
										<p :style="{ color: 'var(--theme-muted-foreground)' }">
											Contenu de la deuxième carte.
										</p>
									</template>
								</f-card>
								<f-card>
									<template #title>Carte 3</template>
									<template #content>
										<p :style="{ color: 'var(--theme-muted-foreground)' }">
											Contenu de la troisième carte.
										</p>
									</template>
								</f-card>
							</div>
						</div>
					</div>

					<!-- Semantic Theme Variables -->
					<div class="space-y-4 mt-8">
						<f-typography variant="h4">
							Variables Thématiques Sémantiques
						</f-typography>
						<div class="grid grid-cols-2 gap-4">
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-background
								</f-typography>
								<div class="w-full h-12 mt-2 rounded" :style="{ backgroundColor: 'var(--theme-background)' }"></div>
							</div>
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-foreground
								</f-typography>
								<div class="w-full h-12 mt-2 rounded" :style="{ backgroundColor: 'var(--theme-foreground)' }"></div>
							</div>
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-card
								</f-typography>
								<div class="w-full h-12 mt-2 rounded" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }"></div>
							</div>
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-muted
								</f-typography>
								<div class="w-full h-12 mt-2 rounded" :style="{ backgroundColor: 'var(--theme-muted)' }"></div>
							</div>
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-primary
								</f-typography>
								<div class="w-full h-12 mt-2 rounded" :style="{ backgroundColor: 'var(--theme-primary)' }"></div>
							</div>
							<div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--theme-card)', border: '1px solid var(--theme-border)' }">
								<f-typography variant="body" class="font-mono text-sm">
									--theme-border
								</f-typography>
								<div class="w-full h-12 mt-2 rounded border-4" :style="{ borderColor: 'var(--theme-border)' }"></div>
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
