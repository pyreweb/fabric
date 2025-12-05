import FPageHeader from './FPageHeader.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FBreadcrumb from '../../molecules/FBreadcrumb/FBreadcrumb.vue';

export default {
	title: 'Organisms/FPageHeader',
	component: FPageHeader,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Titre de la page'
		},
		subtitle: {
			control: 'text',
			description: 'Sous-titre'
		},
		showBack: {
			control: 'boolean',
			description: 'Afficher le bouton retour'
		},
		bordered: {
			control: 'boolean',
			description: 'Bordure en bas'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FPageHeader },
	props: Object.keys(argTypes),
	template: '<FPageHeader v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	title: 'Tableau de bord'
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
	title: 'Utilisateurs',
	subtitle: 'Gérez les comptes utilisateurs'
};

export const WithBackButton = Template.bind({});
WithBackButton.args = {
	title: 'Détail du projet',
	showBack: true
};

export const WithActions = () => ({
	components: { FPageHeader, FButton },
	template: `
		<FPageHeader title="Projets" subtitle="Liste de tous vos projets">
			<template #actions>
				<FButton variant="outline">Exporter</FButton>
				<FButton variant="primary">Nouveau projet</FButton>
			</template>
		</FPageHeader>
	`
});

export const WithBreadcrumb = () => ({
	components: { FPageHeader, FBreadcrumb, FButton },
	data() {
		return {
			breadcrumbItems: [
				{ label: 'Accueil', href: '/' },
				{ label: 'Projets', href: '/projects' },
				{ label: 'Mon projet' }
			]
		};
	},
	template: `
		<FPageHeader title="Mon projet" subtitle="Créé le 12 janvier 2024">
			<template #breadcrumb>
				<FBreadcrumb :items="breadcrumbItems" />
			</template>
			<template #actions>
				<FButton variant="outline">Paramètres</FButton>
				<FButton variant="primary">Modifier</FButton>
			</template>
		</FPageHeader>
	`
});

export const Bordered = Template.bind({});
Bordered.args = {
	title: 'Paramètres',
	subtitle: 'Configurez votre application',
	bordered: true
};

export const Complex = () => ({
	components: { FPageHeader, FBreadcrumb, FButton },
	data() {
		return {
			breadcrumbItems: [
				{ label: 'Dashboard', href: '/' },
				{ label: 'Équipe', href: '/team' },
				{ label: 'Jean Dupont' }
			]
		};
	},
	methods: {
		handleBack() {
			alert('Retour cliqué');
		}
	},
	template: `
		<FPageHeader
			title="Jean Dupont"
			subtitle="Développeur Senior"
			showBack
			bordered
			@back="handleBack"
		>
			<template #breadcrumb>
				<FBreadcrumb :items="breadcrumbItems" />
			</template>
			<template #actions>
				<FButton variant="ghost">Archiver</FButton>
				<FButton variant="outline">Message</FButton>
				<FButton variant="primary">Modifier</FButton>
			</template>
		</FPageHeader>
	`
});

export const MinimalWithSlot = () => ({
	components: { FPageHeader },
	template: `
		<FPageHeader title="Statistiques">
			<div class="flex gap-4 text-sm text-neutral-600">
				<span>Dernière mise à jour: il y a 5 min</span>
				<span>•</span>
				<span>Données en temps réel</span>
			</div>
		</FPageHeader>
	`
});
