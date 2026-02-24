import type { Meta } from '@storybook/vue';
import FButtonGroup from './FButtonGroup.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	title: 'Molecules/FButtonGroup',
	component: FButtonGroup,
	tags: ['autodocs'],
	argTypes: {
		ariaLabel: {
			control: 'text',
			description: "Label pour l'accessibilité"
		}
	}
} as Meta<typeof FButtonGroup>;

export const Default = () => ({
	components: { FButtonGroup, FButton },
	template: `
<FButtonGroup>
<FButton variant="outline">Gauche</FButton>
<FButton variant="outline">Centre</FButton>
<FButton variant="outline">Droite</FButton>
</FButtonGroup>
`
});

export const Primary = () => ({
	components: { FButtonGroup, FButton },
	template: `
<FButtonGroup>
<FButton variant="primary">Option 1</FButton>
<FButton variant="primary">Option 2</FButton>
<FButton variant="primary">Option 3</FButton>
</FButtonGroup>
`
});

export const Secondary = () => ({
	components: { FButtonGroup, FButton },
	template: `
<FButtonGroup>
<FButton variant="secondary">Jour</FButton>
<FButton variant="secondary">Semaine</FButton>
<FButton variant="secondary">Mois</FButton>
<FButton variant="secondary">Année</FButton>
</FButtonGroup>
`
});

export const WithActive = () => ({
	components: { FButtonGroup, FButton },
	data() {
		return { active: 'jour' };
	},
	template: `
<FButtonGroup>
<FButton :variant="active === 'jour' ? 'primary' : 'outline'" @click="active = 'jour'">Jour</FButton>
<FButton :variant="active === 'semaine' ? 'primary' : 'outline'" @click="active = 'semaine'">Semaine</FButton>
<FButton :variant="active === 'mois' ? 'primary' : 'outline'" @click="active = 'mois'">Mois</FButton>
</FButtonGroup>
`
});

export const Sizes = () => ({
	components: { FButtonGroup, FButton },
	template: `
<div class="flex flex-col gap-4 items-start">
<FButtonGroup>
<FButton variant="outline" size="sm">Petit</FButton>
<FButton variant="outline" size="sm">Petit</FButton>
</FButtonGroup>
<FButtonGroup>
<FButton variant="outline" size="md">Moyen</FButton>
<FButton variant="outline" size="md">Moyen</FButton>
</FButtonGroup>
<FButtonGroup>
<FButton variant="outline" size="lg">Grand</FButton>
<FButton variant="outline" size="lg">Grand</FButton>
</FButtonGroup>
</div>
`
});
