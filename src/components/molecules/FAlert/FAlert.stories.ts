import type { Meta, StoryFn } from '@storybook/vue';
import FAlert from './FAlert.vue';

export default {
	title: 'Molecules/FAlert',
	component: FAlert,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['success', 'error', 'info'],
			description: "Type d'alerte"
		},
		title: {
			control: 'text',
			description: "Titre de l'alerte"
		},
		message: {
			control: 'text',
			description: "Message de l'alerte"
		},
		closable: {
			control: 'boolean',
			description: 'Afficher le bouton de fermeture'
		}
	}
} as Meta<typeof FAlert>;

const Template: StoryFn<typeof FAlert> = (args, { argTypes }) => ({
	components: { FAlert },
	props: Object.keys(argTypes),
	template: '<FAlert v-bind="$props" />'
});

export const Success = Template.bind({});
Success.args = {
	variant: 'success',
	title: 'Succès',
	message: 'Votre action a été effectuée avec succès.'
};

export const Error = Template.bind({});
Error.args = {
	variant: 'error',
	title: 'Erreur',
	message: "Une erreur s'est produite. Veuillez réessayer."
};

export const Info = Template.bind({});
Info.args = {
	variant: 'info',
	title: 'Information',
	message: 'Voici une information importante à prendre en compte.'
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
	variant: 'info',
	message: 'Alerte simple sans titre.'
};

export const NotClosable = Template.bind({});
NotClosable.args = {
	variant: 'info',
	title: 'Notification permanente',
	message: 'Cette alerte ne peut pas être fermée.',
	closable: false
};

export const WithSlotContent = () => ({
	components: { FAlert },
	template: `
<FAlert variant="info" title="Information">
<p>Contenu personnalisé avec <a href="#" class="underline">un lien</a> cliquable.</p>
</FAlert>
`
});

export const AllVariants = () => ({
	components: { FAlert },
	template: `
<div class="flex flex-col gap-4">
<FAlert variant="success" title="Succès" message="Opération réussie." />
<FAlert variant="error" title="Erreur" message="Une erreur s'est produite." />
<FAlert variant="info" title="Information" message="Information importante." />
</div>
`
});
