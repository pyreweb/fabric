import type { Meta, StoryFn } from '@storybook/vue';
import FAvatar from './FAvatar.vue';

export default {
	title: 'Atoms/FAvatar',
	component: FAvatar,
	tags: ['autodocs'],
	argTypes: {
		src: {
			control: 'text',
			description: "URL de l'image de l'avatar"
		},
		alt: {
			control: 'text',
			description: "Texte alternatif de l'image"
		},
		initials: {
			control: 'text',
			description: 'Initiales à afficher'
		},
		name: {
			control: 'text',
			description: 'Nom complet pour générer les initiales automatiquement'
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: "Taille de l'avatar"
		},
		shape: {
			control: { type: 'select' },
			options: ['circle', 'square'],
			description: "Forme de l'avatar"
		},
		status: {
			control: { type: 'select' },
			options: [null, 'online', 'busy', 'away', 'offline'],
			description: 'Indicateur de statut'
		}
	}
} as Meta<typeof FAvatar>;

const Template: StoryFn<typeof FAvatar> = (args, { argTypes }) => ({
	components: { FAvatar },
	props: Object.keys(argTypes),
	template: '<FAvatar v-bind="$props" />'
});

export const WithImage = Template.bind({});
WithImage.args = {
	src: 'https://i.pravatar.cc/150?img=1',
	alt: 'Avatar utilisateur'
};

export const WithInitials = Template.bind({});
WithInitials.args = {
	initials: 'JD'
};

export const WithName = Template.bind({});
WithName.args = {
	name: 'Jean Dupont'
};

export const Sizes = () => ({
	components: { FAvatar },
	template: `
<div class="flex items-center gap-4">
<FAvatar size="xs" initials="XS" />
<FAvatar size="sm" initials="SM" />
<FAvatar size="md" initials="MD" />
<FAvatar size="lg" initials="LG" />
<FAvatar size="xl" initials="XL" />
</div>
`
});

export const Shapes = () => ({
	components: { FAvatar },
	template: `
<div class="flex items-center gap-4">
<FAvatar shape="circle" initials="JD" />
<FAvatar shape="square" initials="JD" />
</div>
`
});

export const WithStatus = () => ({
	components: { FAvatar },
	template: `
<div class="flex items-center gap-4">
<FAvatar status="online" initials="ON" />
<FAvatar status="busy" initials="BU" />
<FAvatar status="away" initials="AW" />
<FAvatar status="offline" initials="OF" />
</div>
`
});

export const Placeholder = Template.bind({});
Placeholder.args = {};
