import FBreadcrumb from './FBreadcrumb.vue';

export default {
	title: 'Molecules/FBreadcrumb',
	component: FBreadcrumb,
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: 'object',
			description: "Liste des éléments du fil d'Ariane"
		},
		separatorIcon: {
			control: 'text',
			description: 'Icône de séparation'
		},
		ariaLabel: {
			control: 'text',
			description: "Label pour l'accessibilité"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FBreadcrumb },
	props: Object.keys(argTypes),
	template: '<FBreadcrumb v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	items: [
		{ label: 'Accueil', href: '/' },
		{ label: 'Produits', href: '/products' },
		{ label: 'Détail du produit' }
	]
};

export const WithLinks = Template.bind({});
WithLinks.args = {
	items: [
		{ label: 'Accueil', href: '/' },
		{ label: 'Catégorie', href: '/category' },
		{ label: 'Sous-catégorie', href: '/category/sub' },
		{ label: 'Article' }
	]
};

export const WithIcons = Template.bind({});
WithIcons.args = {
	items: [
		{ label: 'Accueil', href: '/', icon: 'home' },
		{ label: 'Documents', href: '/docs', icon: 'folder' },
		{ label: 'Fichier', icon: 'document' }
	]
};

export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
	items: [
		{ label: 'Accueil', href: '/' },
		{ label: 'Section', href: '/section' },
		{ label: 'Page actuelle' }
	],
	separatorIcon: 'arrow-right'
};

export const TwoLevels = Template.bind({});
TwoLevels.args = {
	items: [
		{ label: 'Tableau de bord', href: '/' },
		{ label: 'Paramètres' }
	]
};

export const Interactive = () => ({
	components: { FBreadcrumb },
	data() {
		return {
			items: [
				{ label: 'Accueil', href: '/' },
				{ label: 'Produits', href: '/products' },
				{ label: 'Électronique', href: '/products/electronics' },
				{ label: 'Smartphone' }
			]
		};
	},
	methods: {
		handleNavigate(data) {
			alert(`Navigation vers: ${data.item.label}`);
		}
	},
	template: '<FBreadcrumb :items="items" @navigate="handleNavigate" />'
});
