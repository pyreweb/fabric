import type { Meta, StoryFn } from '@storybook/vue';
import FDivider from './FDivider.vue';

export default {
	title: 'Atoms/FDivider',
	component: FDivider,
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
			description: 'Orientation du séparateur'
		},
		align: {
			control: { type: 'select' },
			options: ['left', 'center', 'right'],
			description: 'Alignement du texte'
		},
		margin: {
			control: { type: 'select' },
			options: ['none', 'sm', 'md', 'lg'],
			description: 'Marge autour du séparateur'
		},
		thickness: {
			control: { type: 'select' },
			options: ['thin', 'medium', 'thick'],
			description: 'Épaisseur de la ligne'
		}
	}
} as Meta<typeof FDivider>;

const Template: StoryFn<typeof FDivider> = (args, { argTypes }) => ({
	components: { FDivider },
	props: Object.keys(argTypes),
	template: '<FDivider v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {};

export const WithText = () => ({
	components: { FDivider },
	template: '<FDivider>OU</FDivider>'
});

export const Alignments = () => ({
	components: { FDivider },
	template: `
<div class="flex flex-col gap-4">
<FDivider align="left">Gauche</FDivider>
<FDivider align="center">Centre</FDivider>
<FDivider align="right">Droite</FDivider>
</div>
`
});

export const Thickness = () => ({
	components: { FDivider },
	template: `
<div class="flex flex-col gap-4">
<p class="text-sm text-neutral-500">Fin</p>
<FDivider thickness="thin" />
<p class="text-sm text-neutral-500">Moyen</p>
<FDivider thickness="medium" />
<p class="text-sm text-neutral-500">Épais</p>
<FDivider thickness="thick" />
</div>
`
});

export const Margins = () => ({
	components: { FDivider },
	template: `
<div class="flex flex-col">
<p class="text-sm">Contenu au-dessus</p>
<FDivider margin="none">Sans marge</FDivider>
<FDivider margin="sm">Petite marge</FDivider>
<FDivider margin="md">Marge moyenne</FDivider>
<FDivider margin="lg">Grande marge</FDivider>
<p class="text-sm">Contenu en dessous</p>
</div>
`
});

export const Vertical = () => ({
	components: { FDivider },
	template: `
<div class="flex items-center h-20">
<span>Gauche</span>
<FDivider orientation="vertical" margin="md" />
<span>Droite</span>
</div>
`
});

export const VerticalWithText = () => ({
	components: { FDivider },
	template: `
<div class="flex items-center h-32">
<span>Gauche</span>
<FDivider orientation="vertical" margin="md">OU</FDivider>
<span>Droite</span>
</div>
`
});
