import type { Meta, StoryFn } from '@storybook/vue';
import FDatePicker from './FDatePicker.vue';

export default {
	title: 'Molecules/FDatePicker',
	component: FDatePicker,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'object',
			description:
				'Valeur du sélecteur (Date ou Array de dates pour le mode range)'
		},
		mode: {
			control: { type: 'select' },
			options: ['single', 'range'],
			description: 'Mode de sélection (single ou range)'
		},
		placeholder: {
			control: 'text',
			description: 'Texte de placeholder'
		},
		format: {
			control: 'text',
			description: 'Format de date (DD/MM/YYYY par défaut)'
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
		},
		showTimePicker: {
			control: 'boolean',
			description: "Afficher le sélecteur d'heure"
		},
		minDate: {
			control: 'date',
			description: 'Date minimale autorisée'
		},
		maxDate: {
			control: 'date',
			description: 'Date maximale autorisée'
		},
		disabledDates: {
			control: 'object',
			description: 'Tableau de dates désactivées'
		},
		monthNames: {
			control: 'object',
			description: 'Noms personnalisés des mois'
		},
		dayNames: {
			control: 'object',
			description: 'Noms personnalisés des jours de la semaine'
		},
		firstDayOfWeek: {
			control: { type: 'number', min: 0, max: 6 },
			description: 'Premier jour de la semaine (0 = Dimanche, 1 = Lundi)'
		}
	}
} as Meta<typeof FDatePicker>;

const Template: StoryFn<typeof FDatePicker> = (args, { argTypes }) => ({
	components: { FDatePicker },
	props: Object.keys(argTypes),
	data() {
		return {
			selectedDate: (args as Record<string, unknown>).value || null
		};
	},
	template: `
<div class="p-4">
<FDatePicker v-bind="$props" v-model="selectedDate" />
<div v-if="selectedDate" class="mt-4 p-3 bg-neutral-100 rounded">
<p class="text-sm font-medium text-neutral-700">Date sélectionnée :</p>
<p class="text-sm text-neutral-600">{{ selectedDate }}</p>
</div>
</div>
`
});

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Sélectionner une date'
};

export const WithValue = Template.bind({});
WithValue.args = {
	value: new Date(2024, 11, 15),
	placeholder: 'Sélectionner une date'
};

export const DateRange = Template.bind({});
DateRange.args = {
	mode: 'range',
	placeholder: 'Sélectionner une plage de dates'
};

export const WithTimePicker = Template.bind({});
WithTimePicker.args = {
	showTimePicker: true,
	placeholder: 'Sélectionner une date et heure'
};

export const WithMinMaxDates = Template.bind({});
WithMinMaxDates.args = {
	minDate: new Date(2024, 11, 1),
	maxDate: new Date(2024, 11, 31),
	placeholder: 'Sélectionner une date en décembre 2024'
};

export const WithDisabledDates = Template.bind({});
WithDisabledDates.args = {
	disabledDates: [
		new Date(2024, 11, 10),
		new Date(2024, 11, 15),
		new Date(2024, 11, 20),
		new Date(2024, 11, 25)
	],
	placeholder: 'Certaines dates sont désactivées'
};

export const Sizes = () => ({
	components: { FDatePicker },
	data() {
		return {
			small: null,
			medium: null,
			large: null
		};
	},
	template: `
<div class="flex flex-col gap-4 p-4">
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Petit</label>
<FDatePicker v-model="small" size="small" placeholder="Taille small" />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Moyen</label>
<FDatePicker v-model="medium" size="medium" placeholder="Taille medium" />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Grand</label>
<FDatePicker v-model="large" size="large" placeholder="Taille large" />
</div>
</div>
`
});

export const States = () => ({
	components: { FDatePicker },
	data() {
		return {
			normal: null,
			disabled: new Date(),
			readonly: new Date(),
			error: null
		};
	},
	template: `
<div class="flex flex-col gap-4 p-4">
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Normal</label>
<FDatePicker v-model="normal" placeholder="État normal" />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Désactivé</label>
<FDatePicker v-model="disabled" placeholder="État désactivé" disabled />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Lecture seule</label>
<FDatePicker v-model="readonly" placeholder="Lecture seule" readonly />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Erreur</label>
<FDatePicker v-model="error" placeholder="État d'erreur" error />
</div>
</div>
`
});

export const CustomLocalization = Template.bind({});
CustomLocalization.args = {
	monthNames: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	],
	dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	firstDayOfWeek: 0,
	placeholder: 'Select a date (English)'
};

export const DateRangeWithTime = Template.bind({});
DateRangeWithTime.args = {
	mode: 'range',
	showTimePicker: true,
	placeholder: 'Sélectionner une plage de dates avec heure'
};

export const CustomFormat = () => ({
	components: { FDatePicker },
	data() {
		return {
			date1: null,
			date2: null,
			date3: null
		};
	},
	template: `
<div class="flex flex-col gap-4 p-4">
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Format: DD/MM/YYYY (par défaut)</label>
<FDatePicker v-model="date1" format="DD/MM/YYYY" />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Format: YYYY-MM-DD</label>
<FDatePicker v-model="date2" format="YYYY-MM-DD" />
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">Format: MM/DD/YYYY</label>
<FDatePicker v-model="date3" format="MM/DD/YYYY" />
</div>
</div>
`
});

export const InForm = () => ({
	components: { FDatePicker },
	data() {
		return {
			formData: {
				startDate: null,
				endDate: null,
				appointmentDate: null
			}
		};
	},
	methods: {
		handleSubmit() {
			alert(JSON.stringify(this.formData, null, 2));
		}
	},
	template: `
<div class="max-w-md p-4">
<form @submit.prevent="handleSubmit" class="space-y-4">
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">
Date de début <span class="text-danger-500">*</span>
</label>
<FDatePicker 
v-model="formData.startDate" 
placeholder="Sélectionner la date de début"
/>
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">
Date de fin <span class="text-danger-500">*</span>
</label>
<FDatePicker 
v-model="formData.endDate" 
:minDate="formData.startDate"
placeholder="Sélectionner la date de fin"
/>
</div>
<div>
<label class="block text-sm font-medium text-neutral-700 mb-1">
Rendez-vous
</label>
<FDatePicker 
v-model="formData.appointmentDate" 
showTimePicker
placeholder="Sélectionner date et heure du rendez-vous"
/>
</div>
<button 
type="submit"
class="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
>
Soumettre
</button>
</form>
</div>
`
});
