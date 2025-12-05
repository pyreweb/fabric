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
};

const sampleData = [
	{ id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active' },
	{ id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'User', status: 'active' },
	{ id: 3, name: 'Claire Durand', email: 'claire@example.com', role: 'User', status: 'inactive' },
	{ id: 4, name: 'David Petit', email: 'david@example.com', role: 'Editor', status: 'active' },
	{ id: 5, name: 'Emma Bernard', email: 'emma@example.com', role: 'User', status: 'pending' }
];

const columns = [
	{ key: 'name', label: 'Nom' },
	{ key: 'email', label: 'Email' },
	{ key: 'role', label: 'Rôle' },
	{ key: 'status', label: 'Statut' }
];

const Template = (args, { argTypes }) => ({
	components: { FDataTable },
	props: Object.keys(argTypes),
	template: '<FDataTable v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	data: sampleData,
	columns
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
	template: '<FDataTable :data="data" :columns="columns" paginated :perPage="10" />'
});

export const WithSelection = () => ({
	components: { FDataTable },
	data() {
		return {
			columns,
			data: sampleData,
			selected: []
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
		handleAction(action, item) {
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
			selected: []
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
