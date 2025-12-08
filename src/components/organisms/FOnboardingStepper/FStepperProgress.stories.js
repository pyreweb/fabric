import FStepperProgress from './FStepperProgress.vue';

export default {
	title: 'Organisms/FStepperProgress',
	component: FStepperProgress,
	tags: ['autodocs'],
	argTypes: {
		steps: {
			control: 'object',
			description: 'Liste des titres des étapes'
		},
		currentStep: {
			control: { type: 'number', min: 0 },
			description: "Index de l'étape actuelle (base 0)"
		}
	}
};

const defaultSteps = ['Informations', 'Préférences', 'Confirmation'];

const Template = (args, { argTypes }) => ({
	components: { FStepperProgress },
	props: Object.keys(argTypes),
	template: '<FStepperProgress v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	steps: defaultSteps,
	currentStep: 0
};

export const SecondStep = Template.bind({});
SecondStep.args = {
	steps: defaultSteps,
	currentStep: 1
};

export const LastStep = Template.bind({});
LastStep.args = {
	steps: defaultSteps,
	currentStep: 2
};

export const AllCompleted = Template.bind({});
AllCompleted.args = {
	steps: defaultSteps,
	currentStep: 3
};

export const ManySteps = Template.bind({});
ManySteps.args = {
	steps: ['Étape 1', 'Étape 2', 'Étape 3', 'Étape 4', 'Étape 5'],
	currentStep: 2
};

export const TwoSteps = Template.bind({});
TwoSteps.args = {
	steps: ['Début', 'Fin'],
	currentStep: 0
};

export const SingleStep = Template.bind({});
SingleStep.args = {
	steps: ['Unique'],
	currentStep: 0
};

export const Interactive = () => ({
	components: { FStepperProgress },
	data() {
		return {
			currentStep: 0,
			steps: ['Informations personnelles', 'Configuration', 'Validation']
		};
	},
	methods: {
		next() {
			if (this.currentStep < this.steps.length - 1) {
				this.currentStep++;
			}
		},
		prev() {
			if (this.currentStep > 0) {
				this.currentStep--;
			}
		},
		reset() {
			this.currentStep = 0;
		}
	},
	template: `
		<div class="space-y-6">
			<FStepperProgress :steps="steps" :currentStep="currentStep" />
			<div class="flex gap-2 justify-center">
				<button 
					@click="prev" 
					:disabled="currentStep === 0"
					class="px-4 py-2 border rounded disabled:opacity-50"
				>
					Précédent
				</button>
				<button 
					@click="next" 
					:disabled="currentStep >= steps.length - 1"
					class="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
				>
					Suivant
				</button>
				<button 
					@click="reset"
					class="px-4 py-2 border rounded"
				>
					Réinitialiser
				</button>
			</div>
			<p class="text-center text-sm text-neutral-500">
				Étape actuelle: {{ currentStep + 1 }} / {{ steps.length }}
			</p>
		</div>
	`
});
