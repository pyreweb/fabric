import FOnboardingStepper from './FOnboardingStepper.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';

export default {
	title: 'Organisms/FOnboardingStepper',
	component: FOnboardingStepper,
	tags: ['autodocs'],
	argTypes: {
		steps: {
			control: 'object',
			description: 'Configuration des étapes'
		},
		value: {
			control: 'number',
			description: 'Étape actuelle'
		},
		showStepNumbers: {
			control: 'boolean',
			description: 'Afficher les numéros des étapes'
		},
		linear: {
			control: 'boolean',
			description: 'Navigation linéaire uniquement'
		}
	}
};

const sampleSteps = [
	{
		title: 'Informations personnelles',
		description: 'Vos informations de base'
	},
	{
		title: 'Préférences',
		description: 'Personnalisez votre expérience'
	},
	{
		title: 'Confirmation',
		description: 'Vérifiez vos informations'
	}
];

const Template = (args, { argTypes }) => ({
	components: { FOnboardingStepper },
	props: Object.keys(argTypes),
	data() {
		return { currentStep: args.value || 0 };
	},
	template: '<FOnboardingStepper v-bind="$props" v-model="currentStep" />'
});

export const Default = Template.bind({});
Default.args = {
	steps: sampleSteps
};

export const SecondStep = Template.bind({});
SecondStep.args = {
	steps: sampleSteps,
	value: 1
};

export const LastStep = Template.bind({});
LastStep.args = {
	steps: sampleSteps,
	value: 2
};

export const WithStepNumbers = Template.bind({});
WithStepNumbers.args = {
	steps: sampleSteps,
	showStepNumbers: true
};

export const WithContent = () => ({
	components: { FOnboardingStepper, FFormField },
	data() {
		return {
			currentStep: 0,
			steps: sampleSteps,
			form: {
				name: '',
				email: '',
				theme: 'light',
				notifications: true
			}
		};
	},
	methods: {
		handleComplete() {
			alert('Onboarding terminé !\n' + JSON.stringify(this.form, null, 2));
		}
	},
	template: `
		<FOnboardingStepper
			v-model="currentStep"
			:steps="steps"
			@complete="handleComplete"
		>
			<template #step-0>
				<div class="flex flex-col gap-4">
					<FFormField v-model="form.name" label="Nom complet" required />
					<FFormField v-model="form.email" label="Email" type="email" required />
				</div>
			</template>
			<template #step-1>
				<div class="flex flex-col gap-4">
					<div>
						<label class="block text-sm font-medium mb-2">Thème</label>
						<select v-model="form.theme" class="w-full border rounded p-2">
							<option value="light">Clair</option>
							<option value="dark">Sombre</option>
							<option value="system">Système</option>
						</select>
					</div>
					<div class="flex items-center gap-2">
						<input type="checkbox" v-model="form.notifications" id="notif" />
						<label for="notif" class="text-sm">Recevoir les notifications</label>
					</div>
				</div>
			</template>
			<template #step-2>
				<div class="bg-neutral-50 p-4 rounded-lg">
					<h4 class="font-medium mb-3">Récapitulatif</h4>
					<dl class="space-y-2 text-sm">
						<div class="flex justify-between">
							<dt class="text-neutral-500">Nom:</dt>
							<dd>{{ form.name || '-' }}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-neutral-500">Email:</dt>
							<dd>{{ form.email || '-' }}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-neutral-500">Thème:</dt>
							<dd>{{ form.theme }}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-neutral-500">Notifications:</dt>
							<dd>{{ form.notifications ? 'Oui' : 'Non' }}</dd>
						</div>
					</dl>
				</div>
			</template>
		</FOnboardingStepper>
	`
});

export const ManySteps = Template.bind({});
ManySteps.args = {
	steps: [
		{ title: 'Étape 1', description: 'Première étape' },
		{ title: 'Étape 2', description: 'Deuxième étape' },
		{ title: 'Étape 3', description: 'Troisième étape' },
		{ title: 'Étape 4', description: 'Quatrième étape' },
		{ title: 'Étape 5', description: 'Cinquième étape' }
	],
	showStepNumbers: true
};

export const Interactive = () => ({
	components: { FOnboardingStepper },
	data() {
		return {
			currentStep: 0,
			steps: sampleSteps
		};
	},
	template: `
		<div class="max-w-2xl mx-auto">
			<FOnboardingStepper
				v-model="currentStep"
				:steps="steps"
				showStepNumbers
			>
				<template #step-0>
					<div class="text-center py-8">
						<h3 class="text-xl font-semibold mb-2">Bienvenue !</h3>
						<p class="text-neutral-600">Commençons par configurer votre profil.</p>
					</div>
				</template>
				<template #step-1>
					<div class="text-center py-8">
						<h3 class="text-xl font-semibold mb-2">Personnalisation</h3>
						<p class="text-neutral-600">Ajustez les paramètres selon vos préférences.</p>
					</div>
				</template>
				<template #step-2>
					<div class="text-center py-8">
						<h3 class="text-xl font-semibold mb-2">Prêt !</h3>
						<p class="text-neutral-600">Tout est configuré. Cliquez sur Terminer.</p>
					</div>
				</template>
			</FOnboardingStepper>
		</div>
	`
});
