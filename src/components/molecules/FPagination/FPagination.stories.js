import FPagination from './FPagination.vue';

export default {
	title: 'Molecules/FPagination',
	component: FPagination,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'number', min: 1 },
			description: 'Page actuelle'
		},
		totalPages: {
			control: { type: 'number', min: 1 },
			description: 'Nombre total de pages'
		},
		maxVisiblePages: {
			control: { type: 'number', min: 3 },
			description: 'Nombre maximum de pages visibles'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille des boutons'
		},
		variant: {
			control: { type: 'select' },
			options: ['outline', 'ghost'],
			description: 'Variante des boutons'
		},
		showLabels: {
			control: 'boolean',
			description: 'Afficher les labels précédent/suivant'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FPagination },
	props: Object.keys(argTypes),
	data() {
		return { currentPage: args.value || 1 };
	},
	template: '<FPagination v-bind="$props" v-model="currentPage" />'
});

export const Default = Template.bind({});
Default.args = {
	totalPages: 10,
	value: 1
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
	totalPages: 20,
	value: 10
};

export const FewPages = Template.bind({});
FewPages.args = {
	totalPages: 3,
	value: 1
};

export const ManyPages = Template.bind({});
ManyPages.args = {
	totalPages: 50,
	value: 25
};

export const NoLabels = Template.bind({});
NoLabels.args = {
	totalPages: 10,
	value: 5,
	showLabels: false
};

export const Sizes = () => ({
	components: { FPagination },
	data() {
		return { page1: 1, page2: 1, page3: 1 };
	},
	template: `
		<div class="flex flex-col gap-6">
			<div>
				<p class="text-sm text-neutral-500 mb-2">Petit</p>
				<FPagination v-model="page1" :totalPages="10" size="small" />
			</div>
			<div>
				<p class="text-sm text-neutral-500 mb-2">Moyen</p>
				<FPagination v-model="page2" :totalPages="10" size="medium" />
			</div>
			<div>
				<p class="text-sm text-neutral-500 mb-2">Grand</p>
				<FPagination v-model="page3" :totalPages="10" size="large" />
			</div>
		</div>
	`
});

export const Variants = () => ({
	components: { FPagination },
	data() {
		return { page1: 3, page2: 3 };
	},
	template: `
		<div class="flex flex-col gap-6">
			<div>
				<p class="text-sm text-neutral-500 mb-2">Outline</p>
				<FPagination v-model="page1" :totalPages="10" variant="outline" />
			</div>
			<div>
				<p class="text-sm text-neutral-500 mb-2">Ghost</p>
				<FPagination v-model="page2" :totalPages="10" variant="ghost" />
			</div>
		</div>
	`
});

export const Interactive = () => ({
	components: { FPagination },
	data() {
		return { currentPage: 1, totalPages: 20 };
	},
	template: `
		<div class="flex flex-col gap-4">
			<FPagination v-model="currentPage" :totalPages="totalPages" />
			<p class="text-sm text-neutral-600">
				Page {{ currentPage }} sur {{ totalPages }}
			</p>
		</div>
	`
});
