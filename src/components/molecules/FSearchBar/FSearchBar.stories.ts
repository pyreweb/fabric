import type { Meta, StoryFn } from '@storybook/vue';
import FSearchBar from './FSearchBar.vue';

export default {
	title: 'Molecules/FSearchBar',
	component: FSearchBar,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'text',
			description: 'Valeur de recherche'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille de la barre'
		},
		iconPosition: {
			control: { type: 'select' },
			options: ['inside', 'outside'],
			description: "Position de l'icône"
		},
		buttonMode: {
			control: 'boolean',
			description: 'Afficher un bouton de recherche'
		},
		buttonLabel: {
			control: 'text',
			description: 'Libellé du bouton'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		}
	}
} as Meta<typeof FSearchBar>;

const Template: StoryFn<typeof FSearchBar> = (args, { argTypes }) => ({
	components: { FSearchBar },
	props: Object.keys(argTypes),
	data() {
		return { searchValue: (args as Record<string, unknown>).value || '' };
	},
	template: '<FSearchBar v-bind="$props" v-model="searchValue" />'
});

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Rechercher...'
};

export const WithValue = Template.bind({});
WithValue.args = {
	value: 'Terme de recherche'
};

export const IconOutside = Template.bind({});
IconOutside.args = {
	placeholder: 'Rechercher...',
	iconPosition: 'outside'
};

export const WithButton = Template.bind({});
WithButton.args = {
	placeholder: 'Rechercher...',
	buttonMode: true,
	buttonLabel: 'Rechercher'
};

export const Disabled = Template.bind({});
Disabled.args = {
	placeholder: 'Recherche désactivée',
	disabled: true
};

export const Sizes = () => ({
	components: { FSearchBar },
	template: `
<div class="flex flex-col gap-4">
<FSearchBar size="small" placeholder="Petit" />
<FSearchBar size="medium" placeholder="Moyen" />
<FSearchBar size="large" placeholder="Grand" />
</div>
`
});

export const Interactive = () => ({
	components: { FSearchBar },
	data() {
		return {
			query: '',
			results: [] as string[]
		};
	},
	methods: {
		handleSearch(q: string) {
			this.results = [
				`Résultat 1 pour "${q}"`,
				`Résultat 2 pour "${q}"`,
				`Résultat 3 pour "${q}"`
			];
		}
	},
	template: `
<div class="flex flex-col gap-4">
<FSearchBar
v-model="query"
placeholder="Tapez et appuyez sur Entrée..."
@search="handleSearch"
/>
<div v-if="results.length" class="text-sm text-neutral-600">
<p v-for="result in results" :key="result">{{ result }}</p>
</div>
</div>
`
});

export const InHeader = () => ({
	components: { FSearchBar },
	template: `
<div class="bg-neutral-100 p-4 rounded-lg flex items-center justify-between gap-4">
<span class="font-semibold">Mon Application</span>
<FSearchBar placeholder="Rechercher..." size="small" class="w-64" />
</div>
`
});
