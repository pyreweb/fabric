import FButton from './FButton.vue';

export default {
	title: 'Atoms/FButton',
	component: FButton,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link'],
			description: 'Variante visuelle du bouton'
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Taille du bouton'
		},
		type: {
			control: { type: 'select' },
			options: ['button', 'submit', 'reset'],
			description: 'Type HTML du bouton'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé du bouton'
		},
		loading: {
			control: 'boolean',
			description: 'Affiche un indicateur de chargement'
		},
		block: {
			control: 'boolean',
			description: 'Bouton en pleine largeur'
		},
		rounded: {
			control: 'boolean',
			description: 'Bouton arrondi (pill)'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FButton },
	props: Object.keys(argTypes),
	template: '<FButton v-bind="$props">{{ label }}</FButton>',
	data() {
		return { label: args.label || 'Bouton' };
	}
});

export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
	label: 'Bouton primaire'
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'Bouton secondaire'
};

export const Outline = Template.bind({});
Outline.args = {
	variant: 'outline',
	label: 'Bouton outline'
};

export const Ghost = Template.bind({});
Ghost.args = {
	variant: 'ghost',
	label: 'Bouton ghost'
};

export const Danger = Template.bind({});
Danger.args = {
	variant: 'danger',
	label: 'Bouton danger'
};

export const Link = Template.bind({});
Link.args = {
	variant: 'link',
	label: 'Bouton lien'
};

export const Sizes = () => ({
	components: { FButton },
	template: `
		<div class="flex items-center gap-2 flex-wrap">
			<FButton size="xs">Extra petit</FButton>
			<FButton size="sm">Petit</FButton>
			<FButton size="md">Moyen</FButton>
			<FButton size="lg">Grand</FButton>
			<FButton size="xl">Extra grand</FButton>
		</div>
	`
});

export const Loading = Template.bind({});
Loading.args = {
	loading: true,
	label: 'Chargement...'
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
	label: 'Désactivé'
};

export const Block = Template.bind({});
Block.args = {
	block: true,
	label: 'Bouton pleine largeur'
};

export const Rounded = Template.bind({});
Rounded.args = {
	rounded: true,
	label: 'Bouton arrondi'
};
