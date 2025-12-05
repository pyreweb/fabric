import FRadio from './FRadio.vue';

export default {
	title: 'Atoms/FRadio',
	component: FRadio,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Libellé du bouton radio'
		},
		value: {
			control: 'text',
			description: 'Valeur du bouton radio'
		},
		name: {
			control: 'text',
			description: 'Nom du groupe de boutons radio'
		},
		modelValue: {
			control: 'text',
			description: 'Valeur sélectionnée (v-model)'
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
};

const Template = (args, { argTypes }) => ({
	components: { FRadio },
	props: Object.keys(argTypes),
	data() {
		return { selected: args.modelValue || '' };
	},
	template: '<FRadio v-bind="$props" v-model="selected" />'
});

export const Default = Template.bind({});
Default.args = {
	label: 'Option 1',
	value: 'option1',
	name: 'default-group'
};

export const RadioGroup = () => ({
	components: { FRadio },
	data() {
		return { selected: 'option1' };
	},
	template: `
		<div class="flex flex-col gap-3">
			<FRadio v-model="selected" name="example" value="option1" label="Option 1" />
			<FRadio v-model="selected" name="example" value="option2" label="Option 2" />
			<FRadio v-model="selected" name="example" value="option3" label="Option 3" />
			<p class="text-sm text-neutral-600 mt-2">Sélectionné: {{ selected }}</p>
		</div>
	`
});

export const Disabled = () => ({
	components: { FRadio },
	data() {
		return { selected: 'option1' };
	},
	template: `
		<div class="flex flex-col gap-3">
			<FRadio v-model="selected" name="disabled-group" value="option1" label="Option sélectionnée désactivée" disabled />
			<FRadio v-model="selected" name="disabled-group" value="option2" label="Option non sélectionnée désactivée" disabled />
		</div>
	`
});

export const WithError = () => ({
	components: { FRadio },
	data() {
		return { selected: '' };
	},
	template: `
		<div class="flex flex-col gap-3">
			<FRadio v-model="selected" name="error-group" value="option1" label="Sélectionnez une option" error />
			<FRadio v-model="selected" name="error-group" value="option2" label="Ou cette option" error />
			<p class="text-xs text-danger-500 mt-1">Veuillez sélectionner une option</p>
		</div>
	`
});

export const Horizontal = () => ({
	components: { FRadio },
	data() {
		return { selected: 'oui' };
	},
	template: `
		<div class="flex gap-6">
			<FRadio v-model="selected" name="horizontal" value="oui" label="Oui" />
			<FRadio v-model="selected" name="horizontal" value="non" label="Non" />
			<FRadio v-model="selected" name="horizontal" value="peut-etre" label="Peut-être" />
		</div>
	`
});
