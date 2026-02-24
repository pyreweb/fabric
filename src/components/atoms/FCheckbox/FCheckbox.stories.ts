import type { Meta, StoryFn } from '@storybook/vue';
import FCheckbox from './FCheckbox.vue';

export default {
	title: 'Atoms/FCheckbox',
	component: FCheckbox,
	tags: ['autodocs'],
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'État coché de la checkbox'
		},
		label: {
			control: 'text',
			description: 'Libellé de la checkbox'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		error: {
			control: 'boolean',
			description: "État d'erreur"
		}
	}
} as Meta<typeof FCheckbox>;

const Template: StoryFn<typeof FCheckbox> = (args, { argTypes }) => ({
	components: { FCheckbox },
	props: Object.keys(argTypes),
	data() {
		return { isChecked: (args as Record<string, unknown>).checked || false };
	},
	template: '<FCheckbox v-bind="$props" v-model="isChecked" />'
});

export const Default = Template.bind({});
Default.args = {
	label: "J'accepte les conditions"
};

export const Checked = Template.bind({});
Checked.args = {
	label: 'Option sélectionnée',
	checked: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Option désactivée',
	disabled: true
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
	label: 'Option désactivée et cochée',
	disabled: true,
	checked: true
};

export const WithError = Template.bind({});
WithError.args = {
	label: 'Champ obligatoire',
	error: true
};

export const States = () => ({
	components: { FCheckbox },
	data() {
		return {
			checked1: false,
			checked2: true,
			checked3: false,
			checked4: false
		};
	},
	template: `
<div class="flex flex-col gap-3">
<FCheckbox v-model="checked1" label="Normal" />
<FCheckbox v-model="checked2" label="Coché" />
<FCheckbox v-model="checked3" label="Désactivé" disabled />
<FCheckbox v-model="checked4" label="Erreur" error />
</div>
`
});

export const WithSlot = () => ({
	components: { FCheckbox },
	data() {
		return { checked: false };
	},
	template: `
<FCheckbox v-model="checked">
J'accepte les <a href="#" class="text-primary-600 underline">conditions d'utilisation</a>
</FCheckbox>
`
});
