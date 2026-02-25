import type { Meta, StoryFn } from '@storybook/vue';
import FBadge from './FBadge.vue';

export default {
	title: 'Atoms/FBadge',
	component: FBadge,
	tags: ['autodocs'],
	argTypes: {
		content: {
			control: 'text',
			description: 'Contenu du badge'
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'error', 'neutral'],
			description: 'Variante de couleur'
		},
		shape: {
			control: { type: 'select' },
			options: ['pill', 'circle', 'rounded'],
			description: 'Forme du badge'
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Taille du badge'
		},
		dot: {
			control: 'boolean',
			description: 'Afficher comme point'
		},
		outlined: {
			control: 'boolean',
			description: 'Style avec bordure'
		}
	}
} as Meta<typeof FBadge>;

const Template: StoryFn<typeof FBadge> = (args, { argTypes }) => ({
	components: { FBadge },
	props: Object.keys(argTypes),
	template: '<FBadge v-bind="$props" />'
});

export const Primary = Template.bind({});
Primary.args = {
	content: 'Badge',
	variant: 'primary'
};

export const Success = Template.bind({});
Success.args = {
	content: 'Succès',
	variant: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
	content: 'Attention',
	variant: 'warning'
};

export const Error = Template.bind({});
Error.args = {
	content: 'Erreur',
	variant: 'error'
};

export const Neutral = Template.bind({});
Neutral.args = {
	content: 'Neutre',
	variant: 'neutral'
};

export const Sizes = () => ({
	components: { FBadge },
	template: `
<div class="flex items-center gap-2">
<FBadge content="Small" size="sm" />
<FBadge content="Medium" size="md" />
<FBadge content="Large" size="lg" />
</div>
`
});

export const Shapes = () => ({
	components: { FBadge },
	template: `
<div class="flex items-center gap-2">
<FBadge content="Pill" shape="pill" />
<FBadge content="8" shape="circle" />
<FBadge content="Rounded" shape="rounded" />
</div>
`
});

export const Outlined = () => ({
	components: { FBadge },
	template: `
<div class="flex items-center gap-2">
<FBadge content="Primary" variant="primary" outlined />
<FBadge content="Success" variant="success" outlined />
<FBadge content="Warning" variant="warning" outlined />
<FBadge content="Error" variant="error" outlined />
</div>
`
});

export const Dots = () => ({
	components: { FBadge },
	template: `
<div class="flex items-center gap-2">
<FBadge dot variant="primary" />
<FBadge dot variant="success" />
<FBadge dot variant="warning" />
<FBadge dot variant="error" />
</div>
`
});

export const Numbers = () => ({
	components: { FBadge },
	template: `
<div class="flex items-center gap-2">
<FBadge :content="1" shape="circle" />
<FBadge :content="42" shape="circle" />
<FBadge :content="99" variant="error" shape="circle" />
</div>
`
});
