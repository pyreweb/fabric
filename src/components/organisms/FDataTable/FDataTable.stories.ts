import type { Meta, StoryFn } from '@storybook/vue';
import type { FDataTableColumn } from '../../../types';
import FDataTable from './FDataTable.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FBadge from '../../atoms/FBadge/FBadge.vue';

export default {
	title: 'Organisms/FDataTable',
	component: FDataTable,
	tags: ['autodocs'],
	argTypes: {
		data: {
			control: 'object',
			description: 'Données à afficher'
		},
		columns: {
			control: 'object',
			description: 'Définition des colonnes'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement'
		},
		searchable: {
			control: 'boolean',
			description: 'Activer la recherche'
		},
		paginated: {
			control: 'boolean',
			description: 'Activer la pagination'
		},
		selectable: {
			control: 'boolean',
			description: 'Activer la sélection'
		},
		striped: {
			control: 'boolean',
			description: 'Lignes alternées'
		},
		hoverable: {
			control: 'boolean',
			description: 'Effet au survol'
		},
		bordered: {
			control: 'boolean',
			description: 'Bordure'
		}
	}
} as Meta<typeof FDataTable>;

const sampleData = [
	{
		id: 1,
		name: 'Alice Martin',
		email: 'alice@example.com',
		role: 'Admin',
		status: 'active'
	},
	{
		id: 2,
		name: 'Bob Dupont',
		email: 'bob@example.com',
		role: 'User',
		status: 'active'
	},
	{
		id: 3,
		name: 'Claire Durand',
		email: 'claire@example.com',
		role: 'User',
		status: 'inactive'
	},
	{
		id: 4,
		name: 'David Petit',
		email: 'david@example.com',
		role: 'Editor',
		status: 'active'
	},
	{
		id: 5,
		name: 'Emma Bernard',
		email: 'emma@example.com',
		role: 'User',
		status: 'pending'
	}
];

const columns: FDataTableColumn[] = [
	{ key: 'name', label: 'Nom' },
	{ key: 'email', label: 'Email' },
	{ key: 'role', label: 'Rôle' },
	{ key: 'status', label: 'Statut' }
];

const Template: StoryFn<typeof FDataTable> = (args, { argTypes }) => ({
	components: { FDataTable },
	props: Object.keys(argTypes),
	template: '<FDataTable v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	data: sampleData,
	columns
};
Default.parameters = {
	docs: {
		source: {
			code: `<script setup lang="ts">
import { ref } from 'vue';
import { FDataTable } from '@pyreweb/fabric';
import type { FDataTableProps, FDataTableColumn } from '@pyreweb/fabric';

const columns: FDataTableColumn[] = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  { key: 'status', label: 'Statut' }
];

const data = ref<Record<string, unknown>[]>([
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active' }
]);

const tableProps: FDataTableProps = {
  data: data.value,
  columns,
  searchable: true,
  paginated: true
};
</script>

<template>
  <FDataTable v-bind="tableProps" />
</template>`
		}
	}
};

export const WithSearch = Template.bind({});
WithSearch.args = {
	data: sampleData,
	columns,
	searchable: true
};

export const WithPagination = () => ({
	components: { FDataTable },
	data() {
		return {
			columns,
			data: Array.from({ length: 50 }, (_, i) => ({
				id: i + 1,
				name: `Utilisateur ${i + 1}`,
				email: `user${i + 1}@example.com`,
				role: ['Admin', 'User', 'Editor'][i % 3],
				status: ['active', 'inactive', 'pending'][i % 3]
			}))
		};
	},
	template:
		'<FDataTable :data="data" :columns="columns" paginated :perPage="10" />'
});

export const WithSelection = () => ({
	components: { FDataTable },
	data() {
		return {
			columns,
			data: sampleData,
			selected: [] as number[]
		};
	},
	template: `
<div>
<FDataTable
:data="data"
:columns="columns"
selectable
:selected.sync="selected"
/>
<p class="mt-4 text-sm text-neutral-600">
Sélectionnés: {{ selected.join(', ') || 'Aucun' }}
</p>
</div>
`
});

export const Loading = Template.bind({});
Loading.args = {
	data: sampleData,
	columns,
	loading: true
};

export const Empty = Template.bind({});
Empty.args = {
	data: [],
	columns
};

export const Striped = Template.bind({});
Striped.args = {
	data: sampleData,
	columns,
	striped: true
};

export const Bordered = Template.bind({});
Bordered.args = {
	data: sampleData,
	columns,
	bordered: true
};

export const CustomCells = () => ({
	components: { FDataTable, FBadge },
	data() {
		return {
			columns: [
				{ key: 'name', label: 'Nom' },
				{ key: 'email', label: 'Email' },
				{ key: 'status', label: 'Statut' }
			],
			data: sampleData
		};
	},
	template: `
<FDataTable :data="data" :columns="columns">
<template #cell-status="{ value }">
<FBadge
:content="value"
:variant="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral'"
/>
</template>
</FDataTable>
`
});

export const WithActions = () => ({
	components: { FDataTable, FButton },
	data() {
		return {
			columns,
			data: sampleData
		};
	},
	methods: {
		handleAction(action: string, item: { name: string }) {
			alert(`${action}: ${item.name}`);
		}
	},
	template: `
<FDataTable :data="data" :columns="columns" selectable searchable>
<template #actions="{ selectedItems }">
<FButton
v-if="selectedItems.length > 0"
variant="danger"
size="small"
@click="handleAction('delete', selectedItems[0])"
>
Supprimer ({{ selectedItems.length }})
</FButton>
</template>
</FDataTable>
`
});

export const FullFeatures = () => ({
	components: { FDataTable, FButton, FBadge },
	data() {
		return {
			columns: [
				{ key: 'name', label: 'Nom' },
				{ key: 'email', label: 'Email' },
				{ key: 'role', label: 'Rôle' },
				{ key: 'status', label: 'Statut' }
			],
			data: Array.from({ length: 30 }, (_, i) => ({
				id: i + 1,
				name: `Utilisateur ${i + 1}`,
				email: `user${i + 1}@example.com`,
				role: ['Admin', 'User', 'Editor'][i % 3],
				status: ['active', 'inactive', 'pending'][i % 3]
			})),
			selected: [] as number[]
		};
	},
	template: `
<FDataTable
:data="data"
:columns="columns"
:selected.sync="selected"
selectable
searchable
paginated
striped
:perPage="10"
>
<template #cell-status="{ value }">
<FBadge
:content="value"
:variant="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral'"
/>
</template>
<template #actions="{ selectedItems }">
<FButton v-if="selectedItems.length > 0" variant="outline" size="small">
Exporter ({{ selectedItems.length }})
</FButton>
</template>
</FDataTable>
`
});

export const MobileCardView = () => ({
	components: { FDataTable, FBadge },
	data() {
		return {
			columns: [
				{ key: 'name', label: 'Nom' },
				{ key: 'email', label: 'Email' },
				{ key: 'role', label: 'Rôle' },
				{ key: 'status', label: 'Statut' }
			],
			data: sampleData
		};
	},
	template: `
<div style="max-width: 400px; margin: 0 auto;">
<p class="text-sm text-neutral-500 mb-4">
Ce tableau utilise le mode "Card View" sur mobile (écrans &lt; 640px).
Redimensionnez la fenêtre ou utilisez les outils de développement pour voir le mode mobile.
</p>
<FDataTable :data="data" :columns="columns">
<template #cell-status="{ value }">
<FBadge
:content="value"
:variant="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral'"
/>
</template>
</FDataTable>
</div>
`
});
MobileCardView.parameters = {
	docs: {
		description: {
			story:
				'Sur les écrans mobiles (< 640px), le tableau se transforme automatiquement en mode "Card View" où chaque ligne devient une carte avec les labels de colonnes affichés comme étiquettes.'
		}
	}
};

export const VirtualizedLargeDataset = () => ({
	components: { FDataTable, FBadge },
	data() {
		return {
			columns: [
				{ key: 'id', label: 'ID' },
				{ key: 'name', label: 'Nom' },
				{ key: 'email', label: 'Email' },
				{ key: 'role', label: 'Rôle' },
				{ key: 'status', label: 'Statut' }
			],
			data: Array.from({ length: 10000 }, (_, i) => ({
				id: i + 1,
				name: `Utilisateur ${i + 1}`,
				email: `user${i + 1}@example.com`,
				role: ['Admin', 'User', 'Editor', 'Viewer'][i % 4],
				status: ['active', 'inactive', 'pending'][i % 3]
			}))
		};
	},
	template: `
<div>
<p class="text-sm text-neutral-600 mb-4">
Ce tableau utilise la virtualisation pour afficher 10 000 lignes de manière fluide.
Seuls les éléments visibles sont rendus dans le DOM, ce qui améliore drastiquement les performances.
</p>
<FDataTable
:data="data"
:columns="columns"
virtual
searchable
selectable
>
<template #cell-status="{ value }">
<FBadge
:content="value"
:variant="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral'"
/>
</template>
</FDataTable>
</div>
`
});
VirtualizedLargeDataset.parameters = {
	docs: {
		description: {
			story:
				"La virtualisation permet d'afficher des milliers d'enregistrements sans ralentissement. Le tableau ne rend que les lignes visibles à l'écran, ce qui réduit la charge du DOM et améliore les performances de défilement."
		}
	}
};
