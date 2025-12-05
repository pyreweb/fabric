import FLoader from './FLoader.vue';

export default {
	title: 'Atoms/FLoader',
	component: FLoader,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Taille du loader'
		},
		color: {
			control: 'color',
			description: 'Couleur du loader'
		},
		overlay: {
			control: 'boolean',
			description: 'Afficher en overlay plein écran'
		},
		centered: {
			control: 'boolean',
			description: 'Centrer dans le conteneur parent'
		},
		label: {
			control: 'text',
			description: "Label pour l'accessibilité"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FLoader },
	props: Object.keys(argTypes),
	template: '<FLoader v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {};

export const Sizes = () => ({
	components: { FLoader },
	template: `
		<div class="flex items-center gap-6">
			<div class="text-center">
				<FLoader size="xs" />
				<p class="text-xs mt-2">xs</p>
			</div>
			<div class="text-center">
				<FLoader size="sm" />
				<p class="text-xs mt-2">sm</p>
			</div>
			<div class="text-center">
				<FLoader size="md" />
				<p class="text-xs mt-2">md</p>
			</div>
			<div class="text-center">
				<FLoader size="lg" />
				<p class="text-xs mt-2">lg</p>
			</div>
			<div class="text-center">
				<FLoader size="xl" />
				<p class="text-xs mt-2">xl</p>
			</div>
		</div>
	`
});

export const Colors = () => ({
	components: { FLoader },
	template: `
		<div class="flex items-center gap-6">
			<FLoader size="lg" />
			<FLoader size="lg" color="#ef4444" />
			<FLoader size="lg" color="#22c55e" />
			<FLoader size="lg" color="#f59e0b" />
			<FLoader size="lg" color="#8b5cf6" />
		</div>
	`
});

export const Centered = () => ({
	components: { FLoader },
	template: `
		<div class="relative h-40 border border-dashed border-neutral-300 rounded-lg">
			<FLoader size="lg" centered />
		</div>
	`
});

export const WithText = () => ({
	components: { FLoader },
	template: `
		<div class="flex items-center gap-2">
			<FLoader size="sm" />
			<span class="text-sm text-neutral-600">Chargement en cours...</span>
		</div>
	`
});

export const InButton = () => ({
	components: { FLoader },
	template: `
		<button class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md opacity-75 cursor-wait">
			<FLoader size="sm" color="white" />
			<span>Envoi...</span>
		</button>
	`
});
