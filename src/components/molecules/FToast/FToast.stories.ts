import type { Meta, StoryFn } from '@storybook/vue';
import FToast from './FToast.vue';

export default {
	title: 'Molecules/FToast',
	component: FToast,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['success', 'error', 'info', 'warning'],
			description: 'Type de notification'
		},
		title: {
			control: 'text',
			description: 'Titre de la notification'
		},
		message: {
			control: 'text',
			description: 'Message de la notification'
		},
		closable: {
			control: 'boolean',
			description: 'Afficher le bouton de fermeture'
		},
		duration: {
			control: 'number',
			description: "Durée d'affichage en millisecondes (0 = permanent)"
		},
		position: {
			control: { type: 'select' },
			options: [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right'
			],
			description: 'Position du toast'
		}
	}
} as Meta<typeof FToast>;

const Template: StoryFn<typeof FToast> = (args, { argTypes }) => ({
	components: { FToast },
	props: Object.keys(argTypes),
	template: '<FToast v-bind="$props" @close="onClose" />',
	methods: {
		onClose() {
			console.log('Toast fermé');
		}
	}
});

export const Success = Template.bind({});
Success.args = {
	variant: 'success',
	title: 'Succès',
	message: 'Votre action a été effectuée avec succès.',
	duration: 0
};

export const Error = Template.bind({});
Error.args = {
	variant: 'error',
	title: 'Erreur',
	message: "Une erreur s'est produite. Veuillez réessayer.",
	duration: 0
};

export const Info = Template.bind({});
Info.args = {
	variant: 'info',
	title: 'Information',
	message: 'Voici une information importante à prendre en compte.',
	duration: 0
};

export const Warning = Template.bind({});
Warning.args = {
	variant: 'warning',
	title: 'Avertissement',
	message: 'Veuillez vérifier vos informations avant de continuer.',
	duration: 0
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
	variant: 'info',
	message: 'Notification simple sans titre.',
	duration: 0
};

export const NotClosable = Template.bind({});
NotClosable.args = {
	variant: 'info',
	title: 'Notification permanente',
	message: 'Cette notification ne peut pas être fermée.',
	closable: false,
	duration: 0
};

export const WithSlotContent = () => ({
	components: { FToast },
	template: `
<FToast variant="info" title="Information" :duration="0">
<p>Contenu personnalisé avec <a href="#" class="underline">un lien</a> cliquable.</p>
</FToast>
`
});

export const AllVariants = () => ({
	components: { FToast },
	template: `
<div class="flex flex-col gap-4 p-4">
<FToast variant="success" title="Succès" message="Opération réussie." :duration="0" />
<FToast variant="error" title="Erreur" message="Une erreur s'est produite." :duration="0" />
<FToast variant="info" title="Information" message="Information importante." :duration="0" />
<FToast variant="warning" title="Avertissement" message="Veuillez vérifier." :duration="0" />
</div>
`
});

export const WithAutoClose = () => ({
	components: { FToast },
	data() {
		return {
			showToast: true
		};
	},
	template: `
<div class="p-4">
<FToast 
v-if="showToast"
variant="success" 
title="Auto-fermeture" 
message="Ce toast se fermera automatiquement dans 5 secondes." 
:duration="5000"
@close="showToast = false"
/>
<button 
v-if="!showToast"
@click="showToast = true"
class="px-4 py-2 bg-primary-500 text-white rounded"
>
Afficher à nouveau
</button>
</div>
`
});
