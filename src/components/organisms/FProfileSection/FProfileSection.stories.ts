import type { Meta, StoryFn } from '@storybook/vue';
import FProfileSection from './FProfileSection.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FBadge from '../../atoms/FBadge/FBadge.vue';

export default {
	title: 'Organisms/FProfileSection',
	component: FProfileSection,
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
		role: {
			control: 'text',
			description: 'Rôle/Titre'
		},
		avatarSrc: {
			control: 'text',
			description: "URL de l'avatar"
		},
		avatarSize: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
			description: "Taille de l'avatar"
		},
		layout: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
			description: 'Disposition'
		},
		bordered: {
			control: 'boolean',
			description: 'Afficher une bordure'
		}
	}
} as Meta<typeof FProfileSection>;

const Template: StoryFn<typeof FProfileSection> = (args, { argTypes }) => ({
	components: { FProfileSection },
	props: Object.keys(argTypes),
	template: '<FProfileSection v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	name: 'Jean Dupont',
	email: 'jean.dupont@example.com',
	role: 'Développeur Senior'
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
	name: 'Marie Martin',
	email: 'marie@example.com',
	role: 'Product Manager',
	avatarSrc: 'https://i.pravatar.cc/150?img=5'
};

export const Vertical = Template.bind({});
Vertical.args = {
	name: 'Pierre Durand',
	email: 'pierre@example.com',
	role: 'Designer UX',
	layout: 'vertical'
};

export const WithActions = () => ({
	components: { FProfileSection, FButton },
	template: `
<FProfileSection
name="Sophie Petit"
email="sophie@example.com"
role="Chef de projet"
>
<template #actions>
<FButton variant="outline" size="sm">Message</FButton>
<FButton variant="primary" size="sm">Suivre</FButton>
</template>
</FProfileSection>
`
});

export const WithDetails = () => ({
	components: { FProfileSection, FBadge },
	template: `
<FProfileSection
name="Lucas Bernard"
email="lucas@example.com"
role="Développeur Full Stack"
>
<template #details>
<div class="flex gap-2 mt-2">
<FBadge content="React" variant="primary" size="sm" />
<FBadge content="Vue" variant="primary" size="sm" />
<FBadge content="Node.js" variant="primary" size="sm" />
</div>
</template>
</FProfileSection>
`
});

export const WithStats = () => ({
	components: { FProfileSection, FButton },
	template: `
<FProfileSection
name="Emma Leroy"
email="emma@example.com"
role="Lead Developer"
avatarSize="xl"
>
<template #stats>
<div class="flex gap-6 mt-4 pt-4 border-t border-neutral-100">
<div class="text-center">
<p class="text-2xl font-bold text-neutral-800">142</p>
<p class="text-sm text-neutral-500">Projets</p>
</div>
<div class="text-center">
<p class="text-2xl font-bold text-neutral-800">89</p>
<p class="text-sm text-neutral-500">Followers</p>
</div>
<div class="text-center">
<p class="text-2xl font-bold text-neutral-800">56</p>
<p class="text-sm text-neutral-500">Following</p>
</div>
</div>
</template>
<template #actions>
<FButton variant="primary">Modifier le profil</FButton>
</template>
</FProfileSection>
`
});

export const Bordered = Template.bind({});
Bordered.args = {
	name: 'Thomas Martin',
	email: 'thomas@example.com',
	role: 'DevOps Engineer',
	bordered: true
};

export const Complete = () => ({
	components: { FProfileSection, FButton, FBadge },
	template: `
<FProfileSection
name="Claire Dubois"
email="claire.dubois@example.com"
role="Directrice Technique"
avatarSrc="https://i.pravatar.cc/150?img=1"
avatarSize="xl"
bordered
>
<template #details>
<div class="flex items-center gap-2 mt-1">
<FBadge content="Admin" variant="primary" size="sm" />
<FBadge content="Vérifié" variant="success" size="sm" />
</div>
<p class="text-sm text-neutral-500 mt-2">
Paris, France • Membre depuis janvier 2020
</p>
</template>
<template #stats>
<div class="flex gap-6 mt-4 pt-4 border-t border-neutral-100">
<div class="text-center">
<p class="text-xl font-bold">245</p>
<p class="text-xs text-neutral-500">Projets</p>
</div>
<div class="text-center">
<p class="text-xl font-bold">1.2k</p>
<p class="text-xs text-neutral-500">Contributions</p>
</div>
<div class="text-center">
<p class="text-xl font-bold">98%</p>
<p class="text-xs text-neutral-500">Complétion</p>
</div>
</div>
</template>
<template #actions>
<FButton variant="outline" size="sm">Paramètres</FButton>
<FButton variant="primary" size="sm">Modifier</FButton>
</template>
</FProfileSection>
`
});
