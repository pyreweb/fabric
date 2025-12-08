import FListItem from './FListItem.vue';
import FAvatar from '../../atoms/FAvatar/FAvatar.vue';
import FBadge from '../../atoms/FBadge/FBadge.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';

export default {
	title: 'Molecules/FListItem',
	component: FListItem,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Titre principal'
		},
		subtitle: {
			control: 'text',
			description: 'Sous-titre'
		},
		clickable: {
			control: 'boolean',
			description: 'Élément cliquable'
		},
		selected: {
			control: 'boolean',
			description: 'Élément sélectionné'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		truncate: {
			control: 'boolean',
			description: 'Tronquer le texte'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FListItem },
	props: Object.keys(argTypes),
	template: '<FListItem v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	title: "Titre de l'élément",
	subtitle: 'Description secondaire'
};

export const Clickable = Template.bind({});
Clickable.args = {
	title: 'Élément cliquable',
	subtitle: 'Cliquez pour interagir',
	clickable: true
};

export const Selected = Template.bind({});
Selected.args = {
	title: 'Élément sélectionné',
	subtitle: 'Cet élément est actif',
	selected: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	title: 'Élément désactivé',
	subtitle: 'Non interactif',
	disabled: true
};

export const WithAvatar = () => ({
	components: { FListItem, FAvatar },
	template: `
		<FListItem title="Jean Dupont" subtitle="Développeur" clickable>
			<template #left>
				<FAvatar name="Jean Dupont" />
			</template>
		</FListItem>
	`
});

export const WithIcon = () => ({
	components: { FListItem, FIcon },
	template: `
		<FListItem title="Paramètres" subtitle="Gérer vos préférences" clickable>
			<template #left>
				<FIcon name="cog" size="md" class="text-neutral-500" />
			</template>
			<template #right>
				<FIcon name="chevron-right" size="sm" class="text-neutral-400" />
			</template>
		</FListItem>
	`
});

export const WithBadge = () => ({
	components: { FListItem, FIcon, FBadge },
	template: `
		<FListItem title="Messages" subtitle="Consultez vos messages" clickable>
			<template #left>
				<FIcon name="mail" size="md" class="text-neutral-500" />
			</template>
			<template #right>
				<FBadge content="3" variant="error" shape="circle" />
			</template>
		</FListItem>
	`
});

export const List = () => ({
	components: { FListItem, FAvatar },
	data() {
		return {
			selectedId: 2,
			users: [
				{ id: 1, name: 'Alice Martin', role: 'Designer' },
				{ id: 2, name: 'Bob Dupont', role: 'Développeur' },
				{ id: 3, name: 'Claire Durand', role: 'Product Manager' },
				{ id: 4, name: 'David Petit', role: 'DevOps' }
			]
		};
	},
	methods: {
		selectUser(id) {
			this.selectedId = id;
		}
	},
	template: `
		<div class="divide-y divide-neutral-100">
			<FListItem
				v-for="user in users"
				:key="user.id"
				:title="user.name"
				:subtitle="user.role"
				:selected="selectedId === user.id"
				clickable
				@click="selectUser(user.id)"
			>
				<template #left>
					<FAvatar :name="user.name" size="sm" />
				</template>
			</FListItem>
		</div>
	`
});

export const LongContent = () => ({
	components: { FListItem },
	template: `
		<div class="w-64">
			<FListItem
				title="Un titre très long qui devrait être tronqué"
				subtitle="Une description également très longue qui sera tronquée"
				truncate
			/>
		</div>
	`
});
