import FTextarea from './FTextarea.vue';

export default {
	title: 'Atoms/FTextarea',
	component: FTextarea,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'text',
			description: 'Valeur du champ'
		},
		label: {
			control: 'text',
			description: 'Libellé du champ'
		},
		placeholder: {
			control: 'text',
			description: 'Texte de placeholder'
		},
		rows: {
			control: { type: 'number', min: 1, max: 20 },
			description: 'Nombre de lignes'
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
		},
		errorMessage: {
			control: 'text',
			description: "Message d'erreur"
		},
		maxlength: {
			control: 'number',
			description: 'Longueur maximale'
		},
		showCounter: {
			control: 'boolean',
			description: 'Afficher le compteur de caractères'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FTextarea },
	props: Object.keys(argTypes),
	data() {
		return { content: args.value || '' };
	},
	template: '<FTextarea v-bind="$props" v-model="content" />'
});

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Saisissez votre texte...'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	label: 'Description',
	placeholder: 'Décrivez votre projet...'
};

export const WithValue = Template.bind({});
WithValue.args = {
	label: 'Commentaire',
	value: 'Ceci est un exemple de texte saisi dans le champ textarea.'
};

export const CustomRows = Template.bind({});
CustomRows.args = {
	label: 'Long texte',
	rows: 6,
	placeholder: 'Saisissez un texte plus long...'
};

export const WithCounter = Template.bind({});
WithCounter.args = {
	label: 'Bio',
	placeholder: 'Présentez-vous...',
	maxlength: 200,
	showCounter: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Champ désactivé',
	disabled: true,
	value: 'Ce champ est désactivé'
};

export const Readonly = Template.bind({});
Readonly.args = {
	label: 'Lecture seule',
	readonly: true,
	value: 'Ce texte ne peut pas être modifié'
};

export const WithError = Template.bind({});
WithError.args = {
	label: 'Description',
	error: true,
	errorMessage: 'Ce champ est obligatoire'
};

export const States = () => ({
	components: { FTextarea },
	data() {
		return { val1: '', val2: '', val3: '', val4: '' };
	},
	template: `
		<div class="flex flex-col gap-4">
			<FTextarea v-model="val1" label="Normal" placeholder="Saisissez du texte..." />
			<FTextarea v-model="val2" label="Désactivé" placeholder="Désactivé" disabled />
			<FTextarea v-model="val3" label="Lecture seule" value="En lecture seule" readonly />
			<FTextarea v-model="val4" label="Avec erreur" placeholder="Champ avec erreur" error errorMessage="Ce champ est invalide" />
		</div>
	`
});
