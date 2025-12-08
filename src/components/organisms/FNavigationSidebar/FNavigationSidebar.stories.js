import FNavigationSidebar from './FNavigationSidebar.vue';
import FAvatar from '../../atoms/FAvatar/FAvatar.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	title: 'Organisms/FNavigationSidebar',
	component: FNavigationSidebar,
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: 'object',
			description: 'Éléments de navigation'
		},
		collapsed: {
			control: 'boolean',
			description: 'Sidebar réduite'
		}
	}
};

const navItems = [
	{ label: 'Tableau de bord', href: '/dashboard', icon: 'home', active: true },
	{ label: 'Projets', href: '/projects', icon: 'folder' },
	{ label: 'Équipe', href: '/team', icon: 'user' },
	{ label: 'Messages', href: '/messages', icon: 'mail', badge: 5 },
	{ label: 'Documents', href: '/documents', icon: 'document' },
	{ label: 'Rapports', href: '/reports', icon: 'info' }
];

const Template = (args, { argTypes }) => ({
	components: { FNavigationSidebar },
	props: Object.keys(argTypes),
	template: '<FNavigationSidebar v-bind="$props" style="height: 400px" />'
});

export const Default = Template.bind({});
Default.args = {
	items: navItems
};

export const Collapsed = Template.bind({});
Collapsed.args = {
	items: navItems,
	collapsed: true
};

export const WithHeader = () => ({
	components: { FNavigationSidebar },
	data() {
		return { items: navItems };
	},
	template: `
		<FNavigationSidebar :items="items" style="height: 400px">
			<template #header>
				<div class="px-4 py-3 border-b border-neutral-100">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
							<span class="text-white font-bold text-sm">F</span>
						</div>
						<span class="font-bold">Fabric</span>
					</div>
				</div>
			</template>
		</FNavigationSidebar>
	`
});

export const WithFooter = () => ({
	components: { FNavigationSidebar, FAvatar, FButton },
	data() {
		return { items: navItems };
	},
	template: `
		<FNavigationSidebar :items="items" style="height: 400px">
			<template #footer>
				<div class="px-4 py-3 border-t border-neutral-100">
					<div class="flex items-center gap-3">
						<FAvatar name="Jean Dupont" size="sm" />
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium truncate">Jean Dupont</p>
							<p class="text-xs text-neutral-500 truncate">jean@example.com</p>
						</div>
					</div>
				</div>
			</template>
		</FNavigationSidebar>
	`
});

export const WithSections = () => ({
	components: { FNavigationSidebar },
	data() {
		return {
			items: [
				{ type: 'section', label: 'Principal' },
				{
					label: 'Tableau de bord',
					href: '/dashboard',
					icon: 'home',
					active: true
				},
				{ label: 'Projets', href: '/projects', icon: 'folder' },
				{ type: 'section', label: 'Équipe' },
				{ label: 'Membres', href: '/members', icon: 'user' },
				{ label: 'Messages', href: '/messages', icon: 'mail', badge: 3 },
				{ type: 'section', label: 'Paramètres' },
				{ label: 'Configuration', href: '/settings', icon: 'cog' },
				{ label: 'Aide', href: '/help', icon: 'question' }
			]
		};
	},
	template: '<FNavigationSidebar :items="items" style="height: 500px" />'
});

export const WithNestedItems = () => ({
	components: { FNavigationSidebar },
	data() {
		return {
			items: [
				{ label: 'Accueil', href: '/', icon: 'home' },
				{
					label: 'Produits',
					icon: 'folder',
					children: [
						{ label: 'Catalogue', href: '/products/catalog' },
						{ label: 'Inventaire', href: '/products/inventory' },
						{ label: 'Commandes', href: '/products/orders' }
					]
				},
				{
					label: 'Utilisateurs',
					icon: 'user',
					children: [
						{ label: 'Liste', href: '/users/list' },
						{ label: 'Rôles', href: '/users/roles' }
					]
				},
				{ label: 'Paramètres', href: '/settings', icon: 'cog' }
			]
		};
	},
	template: '<FNavigationSidebar :items="items" style="height: 400px" />'
});

export const Interactive = () => ({
	components: { FNavigationSidebar, FButton },
	data() {
		return {
			collapsed: false,
			items: navItems
		};
	},
	methods: {
		handleNavigate(data) {
			this.items = this.items.map((item) => ({
				...item,
				active: item.href === data.item.href
			}));
		}
	},
	template: `
		<div class="flex gap-4">
			<FNavigationSidebar
				:items="items"
				:collapsed="collapsed"
				style="height: 400px"
				@navigate="handleNavigate"
			/>
			<div>
				<FButton @click="collapsed = !collapsed">
					{{ collapsed ? 'Étendre' : 'Réduire' }}
				</FButton>
			</div>
		</div>
	`
});
