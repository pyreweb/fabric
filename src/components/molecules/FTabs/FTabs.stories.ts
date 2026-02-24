import type { Meta } from '@storybook/vue';
import FTabs from './FTabs.vue';
import FTab from './FTab.vue';

export default {
	title: 'Molecules/FTabs',
	component: FTabs,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'text',
			description: 'Onglet actif (v-model)'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'pills', 'underline'],
			description: 'Variante visuelle des onglets'
		},
		position: {
			control: { type: 'select' },
			options: ['top', 'bottom'],
			description: "Position des boutons d'onglet"
		},
		ariaLabel: {
			control: 'text',
			description: "Label accessible pour la liste d'onglets"
		}
	}
} as Meta<typeof FTabs>;

export const Default = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs>
<FTab name="profile" label="Profil">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Profil utilisateur</h3>
<p class="text-neutral-600">Gérez vos informations personnelles et vos préférences de compte.</p>
</div>
</FTab>
<FTab name="settings" label="Paramètres">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Paramètres</h3>
<p class="text-neutral-600">Configurez les paramètres de votre application.</p>
</div>
</FTab>
<FTab name="notifications" label="Notifications">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Notifications</h3>
<p class="text-neutral-600">Gérez vos préférences de notification.</p>
</div>
</FTab>
</FTabs>
`
});

export const Pills = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs variant="pills">
<FTab name="all" label="Tous">
<div class="p-4">
<p class="text-neutral-600">Affichage de tous les éléments.</p>
</div>
</FTab>
<FTab name="active" label="Actifs">
<div class="p-4">
<p class="text-neutral-600">Affichage des éléments actifs uniquement.</p>
</div>
</FTab>
<FTab name="archived" label="Archivés">
<div class="p-4">
<p class="text-neutral-600">Affichage des éléments archivés.</p>
</div>
</FTab>
</FTabs>
`
});

export const Underline = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs variant="underline">
<FTab name="overview" label="Vue d'ensemble">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Vue d'ensemble</h3>
<p class="text-neutral-600">Tableau de bord général de votre compte.</p>
</div>
</FTab>
<FTab name="analytics" label="Analytiques">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Analytiques</h3>
<p class="text-neutral-600">Statistiques et métriques détaillées.</p>
</div>
</FTab>
<FTab name="reports" label="Rapports">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Rapports</h3>
<p class="text-neutral-600">Générez et consultez vos rapports.</p>
</div>
</FTab>
</FTabs>
`
});

export const WithDisabledTab = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs>
<FTab name="info" label="Informations">
<div class="p-4">
<p class="text-neutral-600">Contenu des informations.</p>
</div>
</FTab>
<FTab name="security" label="Sécurité" disabled>
<div class="p-4">
<p class="text-neutral-600">Cet onglet est désactivé.</p>
</div>
</FTab>
<FTab name="billing" label="Facturation">
<div class="p-4">
<p class="text-neutral-600">Informations de facturation.</p>
</div>
</FTab>
</FTabs>
`
});

export const BottomPosition = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs position="bottom">
<FTab name="tab1" label="Premier">
<div class="p-4">
<p class="text-neutral-600">Contenu du premier onglet.</p>
</div>
</FTab>
<FTab name="tab2" label="Deuxième">
<div class="p-4">
<p class="text-neutral-600">Contenu du deuxième onglet.</p>
</div>
</FTab>
<FTab name="tab3" label="Troisième">
<div class="p-4">
<p class="text-neutral-600">Contenu du troisième onglet.</p>
</div>
</FTab>
</FTabs>
`
});

export const ControlledWithVModel = () => ({
	components: { FTabs, FTab },
	data() {
		return {
			activeTab: 'settings'
		};
	},
	template: `
<div>
<div class="mb-4 p-4 bg-neutral-50 rounded">
<p class="text-sm text-neutral-600">Onglet actif : <strong>{{ activeTab }}</strong></p>
<div class="mt-2 flex gap-2">
<button 
@click="activeTab = 'profile'" 
class="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
>
Aller à Profil
</button>
<button 
@click="activeTab = 'settings'" 
class="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
>
Aller à Paramètres
</button>
<button 
@click="activeTab = 'notifications'" 
class="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
>
Aller à Notifications
</button>
</div>
</div>
<FTabs v-model="activeTab" @change="handleTabChange">
<FTab name="profile" label="Profil">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Profil</h3>
<p class="text-neutral-600">Informations de profil.</p>
</div>
</FTab>
<FTab name="settings" label="Paramètres">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Paramètres</h3>
<p class="text-neutral-600">Paramètres de l'application.</p>
</div>
</FTab>
<FTab name="notifications" label="Notifications">
<div class="p-4">
<h3 class="text-lg font-semibold mb-2">Notifications</h3>
<p class="text-neutral-600">Préférences de notification.</p>
</div>
</FTab>
</FTabs>
</div>
`,
	methods: {
		handleTabChange(tabName: string) {
			console.log('Tab changed to:', tabName);
		}
	}
});

export const RichContent = () => ({
	components: { FTabs, FTab },
	template: `
<FTabs variant="pills">
<FTab name="dashboard" label="Tableau de bord">
<div class="p-4 space-y-4">
<div class="grid grid-cols-3 gap-4">
<div class="p-4 bg-primary-50 rounded-lg">
<p class="text-sm text-neutral-600">Utilisateurs</p>
<p class="text-2xl font-bold text-primary-600">1,234</p>
</div>
<div class="p-4 bg-success-50 rounded-lg">
<p class="text-sm text-neutral-600">Revenus</p>
<p class="text-2xl font-bold text-success-600">45,678 €</p>
</div>
<div class="p-4 bg-warning-50 rounded-lg">
<p class="text-sm text-neutral-600">En attente</p>
<p class="text-2xl font-bold text-warning-600">12</p>
</div>
</div>
</div>
</FTab>
<FTab name="users" label="Utilisateurs">
<div class="p-4">
<table class="w-full">
<thead>
<tr class="border-b">
<th class="text-left p-2">Nom</th>
<th class="text-left p-2">Email</th>
<th class="text-left p-2">Statut</th>
</tr>
</thead>
<tbody>
<tr class="border-b">
<td class="p-2">Jean Dupont</td>
<td class="p-2">jean.dupont@example.com</td>
<td class="p-2"><span class="px-2 py-1 bg-success-100 text-success-700 rounded text-xs">Actif</span></td>
</tr>
<tr class="border-b">
<td class="p-2">Marie Martin</td>
<td class="p-2">marie.martin@example.com</td>
<td class="p-2"><span class="px-2 py-1 bg-success-100 text-success-700 rounded text-xs">Actif</span></td>
</tr>
</tbody>
</table>
</div>
</FTab>
<FTab name="settings" label="Configuration">
<div class="p-4 space-y-4">
<div class="flex items-center justify-between p-3 bg-neutral-50 rounded">
<span class="font-medium">Notifications par email</span>
<input type="checkbox" checked class="h-4 w-4" />
</div>
<div class="flex items-center justify-between p-3 bg-neutral-50 rounded">
<span class="font-medium">Mode sombre</span>
<input type="checkbox" class="h-4 w-4" />
</div>
<div class="flex items-center justify-between p-3 bg-neutral-50 rounded">
<span class="font-medium">Sauvegardes automatiques</span>
<input type="checkbox" checked class="h-4 w-4" />
</div>
</div>
</FTab>
</FTabs>
`
});
