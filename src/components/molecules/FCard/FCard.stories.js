import FCard from './FCard.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	title: 'Molecules/FCard',
	component: FCard,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Titre de la carte'
		},
		subtitle: {
			control: 'text',
			description: 'Sous-titre de la carte'
		},
		clickable: {
			control: 'boolean',
			description: 'Carte cliquable'
		},
		bordered: {
			control: 'boolean',
			description: 'Afficher une bordure'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FCard },
	props: Object.keys(argTypes),
	template: `
		<FCard v-bind="$props">
			<p>Contenu de la carte.</p>
		</FCard>
	`
});

export const Default = Template.bind({});
Default.args = {
	title: 'Titre de la carte',
	subtitle: 'Sous-titre optionnel'
};

export const Simple = () => ({
	components: { FCard },
	template: `
		<FCard>
			<p>Une carte simple avec uniquement du contenu.</p>
		</FCard>
	`
});

export const WithActions = () => ({
	components: { FCard, FButton },
	template: `
		<FCard title="Confirmation" subtitle="Action requise">
			<p>Êtes-vous sûr de vouloir continuer ?</p>
			<template #actions>
				<FButton variant="outline">Annuler</FButton>
				<FButton variant="primary">Confirmer</FButton>
			</template>
		</FCard>
	`
});

export const WithMedia = () => ({
	components: { FCard, FButton },
	template: `
		<FCard title="Article de blog" subtitle="Publié le 12 janvier">
			<template #media>
				<img src="https://picsum.photos/400/200" alt="Image de démonstration" />
			</template>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			<template #actions>
				<FButton variant="link">Lire la suite</FButton>
			</template>
		</FCard>
	`
});

export const Clickable = () => ({
	components: { FCard },
	methods: {
		handleClick() {
			alert('Carte cliquée !');
		}
	},
	template: `
		<FCard title="Carte cliquable" clickable @click="handleClick">
			<p>Cliquez sur cette carte pour déclencher une action.</p>
		</FCard>
	`
});

export const NoBorder = () => ({
	components: { FCard },
	template: `
		<div class="bg-neutral-100 p-4">
			<FCard title="Sans bordure" :bordered="false">
				<p>Cette carte n'a pas de bordure visible.</p>
			</FCard>
		</div>
	`
});

export const CustomHeader = () => ({
	components: { FCard, FButton },
	template: `
		<FCard>
			<template #header>
				<div class="flex justify-between items-center">
					<h3 class="font-bold text-lg">En-tête personnalisé</h3>
					<FButton variant="ghost" size="sm">Action</FButton>
				</div>
			</template>
			<p>Contenu de la carte avec un en-tête personnalisé.</p>
		</FCard>
	`
});

export const Grid = () => ({
	components: { FCard },
	template: `
		<div class="grid grid-cols-3 gap-4">
			<FCard title="Carte 1">
				<p>Contenu de la première carte.</p>
			</FCard>
			<FCard title="Carte 2">
				<p>Contenu de la deuxième carte.</p>
			</FCard>
			<FCard title="Carte 3">
				<p>Contenu de la troisième carte.</p>
			</FCard>
		</div>
	`
});
