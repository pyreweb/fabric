import FSelect from './FSelect.vue';

export default {
	title: 'Molecules/FSelect',
	component: FSelect,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'object',
			description: 'Valeur sélectionnée (v-model)'
		},
		options: {
			control: 'object',
			description: 'Liste des options'
		},
		optionKey: {
			control: 'text',
			description: 'Clé pour identifier une option (si options sont des objets)'
		},
		optionLabel: {
			control: 'text',
			description: "Clé pour le label d'une option (si options sont des objets)"
		},
		optionDisabled: {
			control: 'text',
			description: 'Clé pour désactiver une option (si options sont des objets)'
		},
		placeholder: {
			control: 'text',
			description: "Texte affiché quand aucune valeur n'est sélectionnée"
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille du composant'
		},
		multiple: {
			control: 'boolean',
			description: 'Activer la sélection multiple'
		},
		searchable: {
			control: 'boolean',
			description: 'Activer le champ de recherche'
		},
		searchPlaceholder: {
			control: 'text',
			description: 'Placeholder du champ de recherche'
		},
		emptyText: {
			control: 'text',
			description:
				'Texte affiché quand aucune option ne correspond à la recherche'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement (pour options asynchrones)'
		},
		loadingText: {
			control: 'text',
			description: 'Texte affiché pendant le chargement'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		error: {
			control: 'boolean',
			description: "État d'erreur"
		},
		labelId: {
			control: 'text',
			description: 'ID du label associé (pour accessibilité)'
		}
	}
};

const simpleOptions = [
	'Option 1',
	'Option 2',
	'Option 3',
	'Option 4',
	'Option 5'
];

const objectOptions = [
	{ value: 1, label: 'Paris' },
	{ value: 2, label: 'Lyon' },
	{ value: 3, label: 'Marseille' },
	{ value: 4, label: 'Toulouse' },
	{ value: 5, label: 'Nice' }
];

const Template = (args, { argTypes }) => ({
	components: { FSelect },
	props: Object.keys(argTypes),
	data() {
		return {
			selectedValue: args.value || null
		};
	},
	template: '<FSelect v-bind="$props" v-model="selectedValue" />'
});

export const Default = Template.bind({});
Default.args = {
	options: simpleOptions,
	placeholder: 'Sélectionner une option...'
};

export const WithValue = Template.bind({});
WithValue.args = {
	options: simpleOptions,
	value: 'Option 2'
};

export const ObjectOptions = Template.bind({});
ObjectOptions.args = {
	options: objectOptions,
	placeholder: 'Choisir une ville...'
};

export const Searchable = Template.bind({});
Searchable.args = {
	options: objectOptions,
	searchable: true,
	placeholder: 'Rechercher une ville...'
};

export const Multiple = Template.bind({});
Multiple.args = {
	options: objectOptions,
	multiple: true,
	value: [],
	placeholder: 'Sélectionner plusieurs villes...'
};

export const SearchableMultiple = Template.bind({});
SearchableMultiple.args = {
	options: objectOptions,
	multiple: true,
	searchable: true,
	value: [],
	placeholder: 'Rechercher et sélectionner...'
};

export const Sizes = () => ({
	components: { FSelect },
	data() {
		return {
			options: simpleOptions,
			small: null,
			medium: null,
			large: null
		};
	},
	template: `
		<div class="flex flex-col gap-4">
			<FSelect v-model="small" :options="options" size="small" placeholder="Petit" />
			<FSelect v-model="medium" :options="options" size="medium" placeholder="Moyen" />
			<FSelect v-model="large" :options="options" size="large" placeholder="Grand" />
		</div>
	`
});

export const Disabled = Template.bind({});
Disabled.args = {
	options: simpleOptions,
	disabled: true,
	placeholder: 'Sélection désactivée'
};

export const WithError = Template.bind({});
WithError.args = {
	options: simpleOptions,
	error: true,
	placeholder: 'Champ avec erreur'
};

export const Loading = Template.bind({});
Loading.args = {
	options: [],
	loading: true,
	loadingText: 'Chargement des options...'
};

export const AsyncOptions = () => ({
	components: { FSelect },
	data() {
		return {
			selectedValue: null,
			options: [],
			loading: false
		};
	},
	mounted() {
		this.loadOptions();
	},
	methods: {
		loadOptions() {
			this.loading = true;
			// Simuler un appel API
			setTimeout(() => {
				this.options = [
					{ value: 1, label: 'Option asynchrone 1' },
					{ value: 2, label: 'Option asynchrone 2' },
					{ value: 3, label: 'Option asynchrone 3' },
					{ value: 4, label: 'Option asynchrone 4' },
					{ value: 5, label: 'Option asynchrone 5' }
				];
				this.loading = false;
			}, 2000);
		}
	},
	template: `
		<FSelect
			v-model="selectedValue"
			:options="options"
			:loading="loading"
			searchable
			placeholder="Options chargées depuis une API..."
			loading-text="Chargement des options..."
		/>
	`
});

export const DisabledOptions = () => ({
	components: { FSelect },
	data() {
		return {
			selectedValue: null,
			options: [
				{ value: 1, label: 'Option active 1', disabled: false },
				{ value: 2, label: 'Option désactivée', disabled: true },
				{ value: 3, label: 'Option active 2', disabled: false },
				{ value: 4, label: 'Option désactivée 2', disabled: true },
				{ value: 5, label: 'Option active 3', disabled: false }
			]
		};
	},
	template: `
		<FSelect
			v-model="selectedValue"
			:options="options"
			placeholder="Certaines options sont désactivées..."
		/>
	`
});

export const LargeList = () => ({
	components: { FSelect },
	data() {
		return {
			selectedValue: null,
			options: Array.from({ length: 100 }, (_, i) => ({
				value: i + 1,
				label: `Option ${i + 1}`
			}))
		};
	},
	template: `
		<FSelect
			v-model="selectedValue"
			:options="options"
			searchable
			placeholder="Liste avec 100 options..."
		/>
	`
});

export const CustomFilter = () => ({
	components: { FSelect },
	data() {
		return {
			selectedValue: null,
			options: [
				{ value: 1, label: 'JavaScript', category: 'Frontend' },
				{ value: 2, label: 'Python', category: 'Backend' },
				{ value: 3, label: 'Vue.js', category: 'Frontend' },
				{ value: 4, label: 'Node.js', category: 'Backend' },
				{ value: 5, label: 'React', category: 'Frontend' }
			]
		};
	},
	methods: {
		customFilter(query, options) {
			const lowerQuery = query.toLowerCase();
			return options.filter((option) => {
				const labelMatch = option.label.toLowerCase().includes(lowerQuery);
				const categoryMatch = option.category
					.toLowerCase()
					.includes(lowerQuery);
				return labelMatch || categoryMatch;
			});
		}
	},
	template: `
		<FSelect
			v-model="selectedValue"
			:options="options"
			:filter-method="customFilter"
			searchable
			placeholder="Rechercher par nom ou catégorie..."
		/>
	`
});

export const States = () => ({
	components: { FSelect },
	data() {
		return {
			options: simpleOptions,
			normal: null,
			disabled: null,
			error: null
		};
	},
	template: `
		<div class="flex flex-col gap-4">
			<div>
				<label class="block text-sm font-medium mb-1">Normal</label>
				<FSelect v-model="normal" :options="options" placeholder="État normal" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1">Désactivé</label>
				<FSelect v-model="disabled" :options="options" disabled placeholder="État désactivé" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1">Erreur</label>
				<FSelect v-model="error" :options="options" error placeholder="État erreur" />
			</div>
		</div>
	`
});
