import FEmptyState from './FEmptyState.vue';

export default {
	title: 'Molecules/FEmptyState',
	component: FEmptyState,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'text',
			description: 'Icône à afficher'
		},
		title: {
			control: 'text',
			description: 'Titre principal'
		},
		description: {
			control: 'text',
			description: 'Description détaillée'
		},
		actionLabel: {
			control: 'text',
			description: "Libellé du bouton d'action"
		},
		actionVariant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
			description: "Variante du bouton d'action"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FEmptyState },
	props: Object.keys(argTypes),
	template: '<FEmptyState v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	title: 'Aucune donnée',
	description: "Il n'y a aucun élément à afficher pour le moment."
};

export const WithAction = Template.bind({});
WithAction.args = {
	title: 'Aucun projet',
	description: "Vous n'avez pas encore créé de projet.",
	actionLabel: 'Créer un projet',
	actionVariant: 'primary'
};

export const NoResults = Template.bind({});
NoResults.args = {
	icon: 'search',
	title: 'Aucun résultat',
	description: 'Aucun élément ne correspond à votre recherche.',
	actionLabel: 'Effacer les filtres'
};

export const NoDocuments = Template.bind({});
NoDocuments.args = {
	icon: 'document',
	title: 'Aucun document',
	description: 'Téléversez un document pour commencer.',
	actionLabel: 'Téléverser un fichier'
};

export const NoNotifications = Template.bind({});
NoNotifications.args = {
	icon: 'bell',
	title: 'Pas de notifications',
	description: 'Vous êtes à jour ! Aucune nouvelle notification.'
};

export const WithSlot = () => ({
	components: { FEmptyState },
	template: `
		<FEmptyState icon="folder" title="Dossier vide">
			<p class="text-sm text-neutral-500 mt-2">
				Faites glisser des fichiers ici ou <a href="#" class="text-primary-600 underline">parcourez</a> votre ordinateur.
			</p>
		</FEmptyState>
	`
});

export const AllIcons = () => ({
	components: { FEmptyState },
	template: `
		<div class="grid grid-cols-3 gap-8">
			<FEmptyState icon="folder" title="Dossier vide" />
			<FEmptyState icon="mail" title="Pas de messages" />
			<FEmptyState icon="user" title="Aucun utilisateur" />
			<FEmptyState icon="calendar" title="Aucun événement" />
			<FEmptyState icon="bell" title="Pas de notifications" />
			<FEmptyState icon="heart" title="Aucun favori" />
		</div>
	`
});
