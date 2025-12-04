import FButton from './FButton.vue';
import FIcon from '../FIcon/FIcon.vue';

export default {
	title: 'Atoms/FButton',
	component: FButton,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'danger', 'success', 'outline', 'ghost', 'link'],
			description: 'Style de bouton'
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'small', 'medium', 'large', 'xl'],
			description: 'Taille du bouton'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement'
		},
		loadingText: {
			control: 'text',
			description: 'Texte affiché pendant le chargement'
		},
		block: {
			control: 'boolean',
			description: 'Bouton pleine largeur'
		}
	}
};

// Template de base
const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { FButton },
	template: '<f-button v-bind="$props">{{ $props.label || "Bouton" }}</f-button>'
});

// Story par défaut
export const Default = Template.bind({});
Default.args = {
	variant: 'primary',
	size: 'medium',
	label: 'Bouton'
};

// Variantes
export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
	label: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'Secondary'
};

export const Danger = Template.bind({});
Danger.args = {
	variant: 'danger',
	label: 'Danger'
};

export const Success = Template.bind({});
Success.args = {
	variant: 'success',
	label: 'Success'
};

export const Outline = Template.bind({});
Outline.args = {
	variant: 'outline',
	label: 'Outline'
};

export const Ghost = Template.bind({});
Ghost.args = {
	variant: 'ghost',
	label: 'Ghost'
};

export const Link = Template.bind({});
Link.args = {
	variant: 'link',
	label: 'Lien'
};

// Tailles
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
	size: 'xs',
	label: 'Extra Small'
};

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	label: 'Small'
};

export const Medium = Template.bind({});
Medium.args = {
	size: 'medium',
	label: 'Medium'
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	label: 'Large'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
	size: 'xl',
	label: 'Extra Large'
};

// États
export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
	label: 'Désactivé'
};

export const Loading = Template.bind({});
Loading.args = {
	loading: true,
	label: 'Chargement'
};

export const LoadingWithText = Template.bind({});
LoadingWithText.args = {
	loading: true,
	loadingText: 'En cours...'
};

export const Block = Template.bind({});
Block.args = {
	block: true,
	label: 'Bouton pleine largeur'
};

// Toutes les variantes côte à côte
export const AllVariants = () => ({
	components: { FButton },
	template: `
		<div class="flex flex-wrap gap-4">
			<f-button variant="primary">Primary</f-button>
			<f-button variant="secondary">Secondary</f-button>
			<f-button variant="danger">Danger</f-button>
			<f-button variant="success">Success</f-button>
			<f-button variant="outline">Outline</f-button>
			<f-button variant="ghost">Ghost</f-button>
			<f-button variant="link">Link</f-button>
		</div>
	`
});

// Toutes les tailles côte à côte
export const AllSizes = () => ({
	components: { FButton },
	template: `
		<div class="flex items-center gap-4">
			<f-button size="xs">XS</f-button>
			<f-button size="small">Small</f-button>
			<f-button size="medium">Medium</f-button>
			<f-button size="large">Large</f-button>
			<f-button size="xl">XL</f-button>
		</div>
	`
});

// Avec icônes (utilisation des slots)
export const WithIconLeft = () => ({
	components: { FButton, FIcon },
	template: `
		<f-button variant="primary">
			<template #iconLeft>
				<f-icon name="plus" size="sm" />
			</template>
			Ajouter
		</f-button>
	`
});

export const WithIconRight = () => ({
	components: { FButton, FIcon },
	template: `
		<f-button variant="primary">
			Suivant
			<template #iconRight>
				<f-icon name="chevron-right" size="sm" />
			</template>
		</f-button>
	`
});
