import FIcon from './FIcon.vue';

export default {
	title: 'Atoms/FIcon',
	component: FIcon,
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
			description: "Nom de l'icône"
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: "Taille de l'icône"
		},
		color: {
			control: 'color',
			description: "Couleur de l'icône"
		},
		decorative: {
			control: 'boolean',
			description: "Icône décorative (masquée aux lecteurs d'écran)"
		},
		label: {
			control: 'text',
			description: "Label pour l'accessibilité"
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FIcon },
	props: Object.keys(argTypes),
	template: '<FIcon v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	name: 'check'
};

export const Sizes = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="star" size="xs" />
			<FIcon name="star" size="sm" />
			<FIcon name="star" size="md" />
			<FIcon name="star" size="lg" />
			<FIcon name="star" size="xl" />
		</div>
	`
});

export const Colors = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="heart" size="lg" color="#ef4444" />
			<FIcon name="star" size="lg" color="#f59e0b" />
			<FIcon name="check" size="lg" color="#22c55e" />
			<FIcon name="info" size="lg" color="#3b82f6" />
		</div>
	`
});

export const NavigationIcons = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="chevron-up" size="md" />
			<FIcon name="chevron-down" size="md" />
			<FIcon name="chevron-left" size="md" />
			<FIcon name="chevron-right" size="md" />
			<FIcon name="arrow-up" size="md" />
			<FIcon name="arrow-down" size="md" />
			<FIcon name="arrow-left" size="md" />
			<FIcon name="arrow-right" size="md" />
		</div>
	`
});

export const ActionIcons = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="check" size="md" />
			<FIcon name="x" size="md" />
			<FIcon name="plus" size="md" />
			<FIcon name="minus" size="md" />
			<FIcon name="search" size="md" />
			<FIcon name="edit" size="md" />
			<FIcon name="trash" size="md" />
			<FIcon name="copy" size="md" />
		</div>
	`
});

export const StatusIcons = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="info" size="md" color="#3b82f6" />
			<FIcon name="warning" size="md" color="#f59e0b" />
			<FIcon name="error" size="md" color="#ef4444" />
			<FIcon name="success" size="md" color="#22c55e" />
			<FIcon name="question" size="md" color="#6b7280" />
		</div>
	`
});

export const CommonUIIcons = () => ({
	components: { FIcon },
	template: `
		<div class="flex items-center gap-4">
			<FIcon name="user" size="md" />
			<FIcon name="home" size="md" />
			<FIcon name="cog" size="md" />
			<FIcon name="bell" size="md" />
			<FIcon name="mail" size="md" />
			<FIcon name="calendar" size="md" />
			<FIcon name="clock" size="md" />
			<FIcon name="folder" size="md" />
			<FIcon name="document" size="md" />
		</div>
	`
});

export const AllIcons = () => ({
	components: { FIcon },
	template: `
		<div class="grid grid-cols-8 gap-4">
			<div v-for="icon in icons" :key="icon" class="flex flex-col items-center gap-2 p-2">
				<FIcon :name="icon" size="md" />
				<span class="text-xs text-neutral-500">{{ icon }}</span>
			</div>
		</div>
	`,
	data() {
		return {
			icons: [
				'chevron-up',
				'chevron-down',
				'chevron-left',
				'chevron-right',
				'arrow-up',
				'arrow-down',
				'arrow-left',
				'arrow-right',
				'check',
				'x',
				'plus',
				'minus',
				'search',
				'menu',
				'close',
				'refresh',
				'edit',
				'trash',
				'copy',
				'info',
				'warning',
				'error',
				'success',
				'question',
				'user',
				'home',
				'cog',
				'bell',
				'heart',
				'star',
				'eye',
				'eye-off',
				'lock',
				'unlock',
				'mail',
				'calendar',
				'clock',
				'download',
				'upload',
				'link',
				'external-link',
				'folder',
				'document'
			]
		};
	}
});
