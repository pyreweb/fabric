import FUserMenu from './FUserMenu.vue';

export default {
	title: 'Organisms/FUserMenu',
	component: FUserMenu,
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
			description: "Nom de l'utilisateur"
		},
		email: {
			control: 'text',
			description: 'Email'
		},
		avatarSrc: {
			control: 'text',
			description: "URL de l'avatar"
		},
		items: {
			control: 'object',
			description: 'Éléments du menu'
		},
		showLogout: {
			control: 'boolean',
			description: 'Afficher le bouton de déconnexion'
		},
		compact: {
			control: 'boolean',
			description: 'Mode compact'
		}
	}
};

const menuItems = [
	{ label: 'Mon profil', href: '/profile', icon: 'user' },
	{ label: 'Paramètres', href: '/settings', icon: 'cog' },
	{ label: 'Aide', href: '/help', icon: 'question' }
];

const Template = (args, { argTypes }) => ({
	components: { FUserMenu },
	props: Object.keys(argTypes),
	template: '<FUserMenu v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	name: 'Jean Dupont',
	email: 'jean@example.com'
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
	name: 'Marie Martin',
	email: 'marie@example.com',
	avatarSrc: 'https://i.pravatar.cc/150?img=5'
};

export const WithMenuItems = Template.bind({});
WithMenuItems.args = {
	name: 'Pierre Durand',
	email: 'pierre@example.com',
	items: menuItems
};

export const WithLogout = Template.bind({});
WithLogout.args = {
	name: 'Sophie Petit',
	email: 'sophie@example.com',
	items: menuItems,
	showLogout: true
};

export const Compact = Template.bind({});
Compact.args = {
	name: 'Lucas Bernard',
	compact: true
};

export const FullFeatured = () => ({
	components: { FUserMenu },
	data() {
		return {
			items: [
				{ label: 'Mon profil', href: '/profile', icon: 'user' },
				{ label: 'Mes projets', href: '/projects', icon: 'folder' },
				{ label: 'Notifications', href: '/notifications', icon: 'bell', badge: 3 },
				{ type: 'divider' },
				{ label: 'Paramètres', href: '/settings', icon: 'cog' },
				{ label: 'Aide', href: '/help', icon: 'question' }
			]
		};
	},
	methods: {
		handleNavigate(data) {
			alert(`Navigation vers: ${data.item.label}`);
		},
		handleLogout() {
			alert('Déconnexion...');
		}
	},
	template: `
		<FUserMenu
			name="Emma Leroy"
			email="emma.leroy@example.com"
			avatarSrc="https://i.pravatar.cc/150?img=1"
			:items="items"
			showLogout
			@navigate="handleNavigate"
			@logout="handleLogout"
		/>
	`
});

export const WithDividers = Template.bind({});
WithDividers.args = {
	name: 'Thomas Martin',
	email: 'thomas@example.com',
	items: [
		{ label: 'Mon compte', href: '/account', icon: 'user' },
		{ type: 'divider' },
		{ label: 'Tableau de bord', href: '/dashboard', icon: 'home' },
		{ label: 'Mes tâches', href: '/tasks', icon: 'check' },
		{ type: 'divider' },
		{ label: 'Support', href: '/support', icon: 'question' }
	],
	showLogout: true
};

export const InNavbar = () => ({
	components: { FUserMenu },
	data() {
		return {
			items: menuItems
		};
	},
	template: `
		<div class="flex items-center justify-between p-4 bg-white border-b">
			<span class="font-bold">MonApp</span>
			<FUserMenu
				name="Admin"
				email="admin@example.com"
				:items="items"
				showLogout
				compact
			/>
		</div>
	`
});

export const OnlyAvatar = () => ({
	components: { FUserMenu },
	template: `
		<FUserMenu
			name="User"
			avatarSrc="https://i.pravatar.cc/150?img=3"
			compact
			:items="[
				{ label: 'Profil', href: '/profile' },
				{ label: 'Déconnexion', action: 'logout' }
			]"
		/>
	`
});
