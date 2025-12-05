import FFormField from './FFormField.vue';

export default {
	title: 'Molecules/FFormField',
	component: FFormField,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Libellé du champ'
		},
		value: {
			control: 'text',
			description: 'Valeur du champ'
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number'],
			description: 'Type du champ'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder'
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
		required: {
			control: 'boolean',
			description: 'Champ obligatoire'
		},
		hint: {
			control: 'text',
			description: "Texte d'aide"
		},
		errorMessage: {
			control: 'text',
			description: "Message d'erreur"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FFormField },
	props: Object.keys(argTypes),
	data() {
		return { inputValue: args.value || '' };
	},
	template: '<FFormField v-bind="$props" v-model="inputValue" />'
});

export const Default = Template.bind({});
Default.args = {
	label: 'Adresse email',
	placeholder: 'exemple@email.com'
};

export const WithHint = Template.bind({});
WithHint.args = {
	label: 'Mot de passe',
	type: 'password',
	hint: 'Le mot de passe doit contenir au moins 8 caractères'
};

export const Required = Template.bind({});
Required.args = {
	label: 'Nom complet',
	placeholder: 'Jean Dupont',
	required: true
};

export const WithError = Template.bind({});
WithError.args = {
	label: 'Email',
	value: 'email-invalide',
	errorMessage: 'Veuillez entrer une adresse email valide'
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Champ désactivé',
	value: 'Valeur non modifiable',
	disabled: true
};

export const Readonly = Template.bind({});
Readonly.args = {
	label: 'Référence',
	value: 'REF-2024-001',
	readonly: true
};

export const Sizes = () => ({
	components: { FFormField },
	template: `
		<div class="flex flex-col gap-4">
			<FFormField label="Petit" size="small" placeholder="Petit champ" />
			<FFormField label="Moyen" size="medium" placeholder="Champ moyen" />
			<FFormField label="Grand" size="large" placeholder="Grand champ" />
		</div>
	`
});

export const CompleteForm = () => ({
	components: { FFormField },
	data() {
		return {
			form: {
				name: '',
				email: '',
				password: ''
			}
		};
	},
	template: `
		<div class="flex flex-col gap-4 max-w-md">
			<FFormField
				v-model="form.name"
				label="Nom complet"
				placeholder="Votre nom"
				required
			/>
			<FFormField
				v-model="form.email"
				label="Email"
				type="email"
				placeholder="exemple@email.com"
				required
			/>
			<FFormField
				v-model="form.password"
				label="Mot de passe"
				type="password"
				hint="8 caractères minimum"
				required
			/>
		</div>
	`
});
