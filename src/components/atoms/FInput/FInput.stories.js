import FInput from './FInput.vue';

export default {
	title: 'Atoms/FInput',
	component: FInput,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'text',
			description: 'Valeur du champ'
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number', 'tel', 'url'],
			description: 'Type du champ'
		},
		placeholder: {
			control: 'text',
			description: 'Texte de placeholder'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille du champ'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		readonly: {
			control: 'boolean',
			description: 'Lecture seule'
		},
		error: {
			control: 'boolean',
			description: "État d'erreur"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FInput },
	props: Object.keys(argTypes),
	data() {
		return { inputValue: args.value || '' };
	},
	template: '<FInput v-bind="$props" v-model="inputValue" />'
});

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Saisissez du texte...'
};

export const WithValue = Template.bind({});
WithValue.args = {
	value: 'Valeur initiale'
};

export const Types = () => ({
	components: { FInput },
	data() {
		return {
			text: '',
			email: '',
			password: '',
			number: ''
		};
	},
	template: `
		<div class="flex flex-col gap-4">
			<FInput v-model="text" type="text" placeholder="Texte" />
			<FInput v-model="email" type="email" placeholder="Email" />
			<FInput v-model="password" type="password" placeholder="Mot de passe" />
			<FInput v-model="number" type="number" placeholder="Nombre" />
		</div>
	`
});

export const Sizes = () => ({
	components: { FInput },
	template: `
		<div class="flex flex-col gap-4">
			<FInput size="small" placeholder="Petit" />
			<FInput size="medium" placeholder="Moyen" />
			<FInput size="large" placeholder="Grand" />
		</div>
	`
});

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
	placeholder: 'Champ désactivé'
};

export const Readonly = Template.bind({});
Readonly.args = {
	readonly: true,
	value: 'Valeur en lecture seule'
};

export const WithError = Template.bind({});
WithError.args = {
	error: true,
	placeholder: 'Champ avec erreur'
};

export const States = () => ({
	components: { FInput },
	template: `
		<div class="flex flex-col gap-4">
			<FInput placeholder="Normal" />
			<FInput placeholder="Désactivé" disabled />
			<FInput value="Lecture seule" readonly />
			<FInput placeholder="Erreur" error />
		</div>
	`
});
