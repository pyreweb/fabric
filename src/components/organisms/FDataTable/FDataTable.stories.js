import FDataTable from './FDataTable.vue';

export default {
	title: 'Organisms/FDataTable',
	component: FDataTable,
	tags: ['autodocs'],
	argTypes: {
		data: {
			description: 'Tableau de données à afficher'
		},
		columns: {
			description: 'Définition des colonnes'
		},
		selectable: {
			control: 'boolean',
			description: 'Activer la sélection des lignes'
		},
		searchable: {
			control: 'boolean',
			description: 'Activer la recherche'
		},
		paginated: {
			control: 'boolean',
			description: 'Activer la pagination'
		},
		perPage: {
			control: { type: 'number', min: 1, max: 50 },
			description: 'Nombre d\'éléments par page'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement'
		},
		striped: {
			control: 'boolean',
			description: 'Lignes alternées'
		},
		hoverable: {
			control: 'boolean',
			description: 'Surlignage au survol'
		},
		bordered: {
			control: 'boolean',
			description: 'Bordure extérieure'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille du tableau'
		}
	}
};

// Données de démonstration
const sampleData = [
	{ id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'Administrateur', status: 'Actif' },
	{ id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', role: 'Éditeur', status: 'Actif' },
	{ id: 3, name: 'Pierre Bernard', email: 'pierre.bernard@email.com', role: 'Utilisateur', status: 'Inactif' },
	{ id: 4, name: 'Sophie Petit', email: 'sophie.petit@email.com', role: 'Éditeur', status: 'Actif' },
	{ id: 5, name: 'Lucas Moreau', email: 'lucas.moreau@email.com', role: 'Utilisateur', status: 'Actif' },
	{ id: 6, name: 'Emma Leroy', email: 'emma.leroy@email.com', role: 'Administrateur', status: 'Actif' },
	{ id: 7, name: 'Hugo Roux', email: 'hugo.roux@email.com', role: 'Utilisateur', status: 'Inactif' },
	{ id: 8, name: 'Léa Fournier', email: 'lea.fournier@email.com', role: 'Éditeur', status: 'Actif' },
	{ id: 9, name: 'Arthur Girard', email: 'arthur.girard@email.com', role: 'Utilisateur', status: 'Actif' },
	{ id: 10, name: 'Chloé Bonnet', email: 'chloe.bonnet@email.com', role: 'Utilisateur', status: 'Inactif' },
	{ id: 11, name: 'Louis Dumont', email: 'louis.dumont@email.com', role: 'Éditeur', status: 'Actif' },
	{ id: 12, name: 'Camille Lambert', email: 'camille.lambert@email.com', role: 'Utilisateur', status: 'Actif' }
];

const sampleColumns = [
	{ key: 'name', label: 'Nom', sortable: true },
	{ key: 'email', label: 'Email', sortable: true },
	{ key: 'role', label: 'Rôle', sortable: true },
	{ key: 'status', label: 'Statut', sortable: true, align: 'center' }
];

// Template de base
const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { FDataTable },
	template: '<f-data-table v-bind="$props" />'
});

// Story par défaut
export const Default = Template.bind({});
Default.args = {
	data: sampleData,
	columns: sampleColumns
};

// Avec recherche
export const WithSearch = Template.bind({});
WithSearch.args = {
	data: sampleData,
	columns: sampleColumns,
	searchable: true,
	searchPlaceholder: 'Rechercher un utilisateur...'
};

// Avec sélection
export const WithSelection = Template.bind({});
WithSelection.args = {
	data: sampleData,
	columns: sampleColumns,
	selectable: true
};

// Avec pagination
export const WithPagination = Template.bind({});
WithPagination.args = {
	data: sampleData,
	columns: sampleColumns,
	paginated: true,
	perPage: 5
};

// État de chargement
export const Loading = Template.bind({});
Loading.args = {
	data: [],
	columns: sampleColumns,
	loading: true
};

// État vide
export const Empty = Template.bind({});
Empty.args = {
	data: [],
	columns: sampleColumns,
	emptyTitle: 'Aucun utilisateur',
	emptyDescription: 'Il n\'y a aucun utilisateur à afficher pour le moment.',
	emptyActionLabel: 'Ajouter un utilisateur'
};

// Lignes alternées
export const Striped = Template.bind({});
Striped.args = {
	data: sampleData,
	columns: sampleColumns,
	striped: true
};

// Avec bordure
export const Bordered = Template.bind({});
Bordered.args = {
	data: sampleData,
	columns: sampleColumns,
	bordered: true
};

// Petite taille
export const SmallSize = Template.bind({});
SmallSize.args = {
	data: sampleData.slice(0, 5),
	columns: sampleColumns,
	size: 'small'
};

// Grande taille
export const LargeSize = Template.bind({});
LargeSize.args = {
	data: sampleData.slice(0, 5),
	columns: sampleColumns,
	size: 'large'
};

// Configuration complète
export const FullFeatured = () => ({
	components: { FDataTable },
	data() {
		return {
			data: sampleData,
			columns: sampleColumns,
			selected: []
		};
	},
	template: `
		<f-data-table
			:data="data"
			:columns="columns"
			:selected.sync="selected"
			searchable
			selectable
			paginated
			:per-page="5"
			striped
			bordered
		>
			<template #actions="{ selectedItems }">
				<button
					v-if="selectedItems.length > 0"
					class="px-3 py-2 text-sm text-red-600 hover:text-red-800"
				>
					Supprimer ({{ selectedItems.length }})
				</button>
			</template>
		</f-data-table>
	`
});

// Cellules personnalisées avec slots
export const CustomCells = () => ({
	components: { FDataTable },
	data() {
		return {
			data: sampleData.slice(0, 5),
			columns: [
				{ key: 'name', label: 'Nom', sortable: true },
				{ key: 'email', label: 'Email', sortable: true },
				{ key: 'role', label: 'Rôle', sortable: true },
				{ key: 'status', label: 'Statut', sortable: true, align: 'center' }
			]
		};
	},
	template: `
		<f-data-table :data="data" :columns="columns">
			<template #cell-status="{ value }">
				<span
					:class="[
						'px-2 py-1 text-xs font-medium rounded-full',
						value === 'Actif'
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-600'
					]"
				>
					{{ value }}
				</span>
			</template>
		</f-data-table>
	`
});

// Événements
export const WithEvents = () => ({
	components: { FDataTable },
	data() {
		return {
			data: sampleData.slice(0, 5),
			columns: sampleColumns,
			lastEvent: 'Cliquez sur une ligne pour voir l\'événement'
		};
	},
	methods: {
		handleRowClick(row) {
			this.lastEvent = `Ligne cliquée: ${row.name}`;
		},
		handleSort({ key, direction }) {
			this.lastEvent = `Tri: ${key} (${direction})`;
		}
	},
	template: `
		<div>
			<div class="mb-4 p-3 bg-gray-100 rounded text-sm">{{ lastEvent }}</div>
			<f-data-table
				:data="data"
				:columns="columns"
				@row-click="handleRowClick"
				@sort="handleSort"
			/>
		</div>
	`
});
