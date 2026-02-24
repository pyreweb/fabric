import type { Meta, StoryFn } from '@storybook/vue';
import FFilterSidebar from './FFilterSidebar.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	title: 'Organisms/FFilterSidebar',
	component: FFilterSidebar,
	tags: ['autodocs'],
	argTypes: {
		filters: {
			control: 'object',
			description: 'Configuration des filtres'
		},
		value: {
			control: 'object',
			description: 'Valeurs des filtres sélectionnés'
		},
		title: {
			control: 'text',
			description: 'Titre de la sidebar'
		},
		showClear: {
			control: 'boolean',
			description: 'Afficher le bouton de réinitialisation'
		},
		collapsible: {
			control: 'boolean',
			description: 'Groupes pliables'
		}
	}
} as Meta<typeof FFilterSidebar>;

const sampleFilters = [
	{
		key: 'status',
		label: 'Statut',
		type: 'checkbox',
		options: [
			{ label: 'Actif', value: 'active' },
			{ label: 'Inactif', value: 'inactive' },
			{ label: 'En attente', value: 'pending' }
		]
	},
	{
		key: 'category',
		label: 'Catégorie',
		type: 'checkbox',
		options: [
			{ label: 'Technologie', value: 'tech' },
			{ label: 'Design', value: 'design' },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Ventes', value: 'sales' }
		]
	},
	{
		key: 'priority',
		label: 'Priorité',
		type: 'radio',
		options: [
			{ label: 'Haute', value: 'high' },
			{ label: 'Moyenne', value: 'medium' },
			{ label: 'Basse', value: 'low' }
		]
	}
];

const Template: StoryFn<typeof FFilterSidebar> = (args, { argTypes }) => ({
	components: { FFilterSidebar },
	props: Object.keys(argTypes),
	data() {
		return { filterValues: (args as Record<string, unknown>).value || {} };
	},
	template: '<FFilterSidebar v-bind="$props" v-model="filterValues" />'
});

export const Default = Template.bind({});
Default.args = {
	filters: sampleFilters,
	title: 'Filtres'
};

export const WithClear = Template.bind({});
WithClear.args = {
	filters: sampleFilters,
	title: 'Filtres',
	showClear: true
};

export const Collapsible = Template.bind({});
Collapsible.args = {
	filters: sampleFilters,
	title: 'Filtres',
	collapsible: true
};

export const PreselectedValues = Template.bind({});
PreselectedValues.args = {
	filters: sampleFilters,
	title: 'Filtres',
	value: {
		status: ['active'],
		category: ['tech', 'design'],
		priority: 'high'
	}
};

export const Interactive = () => ({
	components: { FFilterSidebar, FButton },
	data() {
		return {
			filters: sampleFilters,
			values: {} as Record<string, unknown>
		};
	},
	methods: {
		handleClear() {
			this.values = {};
		}
	},
	template: `
<div class="flex gap-8">
<div class="w-64">
<FFilterSidebar
v-model="values"
:filters="filters"
title="Filtres"
showClear
collapsible
@clear="handleClear"
/>
</div>
<div class="flex-1">
<h3 class="font-semibold mb-4">Filtres actifs:</h3>
<pre class="bg-neutral-100 p-4 rounded text-sm">{{ JSON.stringify(values, null, 2) }}</pre>
</div>
</div>
`
});

export const SingleFilter = Template.bind({});
SingleFilter.args = {
	filters: [sampleFilters[0]],
	title: 'Filtrer par statut'
};

export const RadioOnly = Template.bind({});
RadioOnly.args = {
	filters: [
		{
			key: 'sort',
			label: 'Trier par',
			type: 'radio',
			options: [
				{ label: 'Date (récent)', value: 'date_desc' },
				{ label: 'Date (ancien)', value: 'date_asc' },
				{ label: 'Nom (A-Z)', value: 'name_asc' },
				{ label: 'Nom (Z-A)', value: 'name_desc' }
			]
		}
	],
	title: 'Tri'
};
