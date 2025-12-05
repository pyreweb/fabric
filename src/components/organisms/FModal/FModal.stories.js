import FModal from './FModal.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';

export default {
	title: 'Organisms/FModal',
	component: FModal,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'boolean',
			description: 'État ouvert/fermé'
		},
		title: {
			control: 'text',
			description: 'Titre de la modale'
		},
		subtitle: {
			control: 'text',
			description: 'Sous-titre'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large', 'full'],
			description: 'Taille de la modale'
		},
		closable: {
			control: 'boolean',
			description: 'Afficher le bouton de fermeture'
		},
		closeOnOverlay: {
			control: 'boolean',
			description: "Fermer au clic sur l'overlay"
		},
		closeOnEscape: {
			control: 'boolean',
			description: 'Fermer avec la touche Échap'
		},
		bordered: {
			control: 'boolean',
			description: 'Afficher une bordure'
		}
	}
};

export const Default = () => ({
	components: { FModal, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir la modale</FButton>
			<FModal v-model="isOpen" title="Titre de la modale">
				<template #body>
					<p>Contenu de la modale.</p>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="isOpen = false">Confirmer</FButton>
				</template>
			</FModal>
		</div>
	`
});

export const WithSubtitle = () => ({
	components: { FModal, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir</FButton>
			<FModal v-model="isOpen" title="Confirmation" subtitle="Action requise">
				<template #body>
					<p>Êtes-vous sûr de vouloir continuer cette action ?</p>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="isOpen = false">Confirmer</FButton>
				</template>
			</FModal>
		</div>
	`
});

export const Sizes = () => ({
	components: { FModal, FButton },
	data() {
		return {
			smallOpen: false,
			mediumOpen: false,
			largeOpen: false,
			fullOpen: false
		};
	},
	template: `
		<div class="flex gap-2">
			<FButton @click="smallOpen = true">Petite</FButton>
			<FButton @click="mediumOpen = true">Moyenne</FButton>
			<FButton @click="largeOpen = true">Grande</FButton>
			<FButton @click="fullOpen = true">Plein écran</FButton>
			
			<FModal v-model="smallOpen" title="Petite modale" size="small">
				<template #body><p>Contenu compact.</p></template>
			</FModal>
			<FModal v-model="mediumOpen" title="Modale moyenne" size="medium">
				<template #body><p>Taille par défaut.</p></template>
			</FModal>
			<FModal v-model="largeOpen" title="Grande modale" size="large">
				<template #body><p>Plus d'espace pour le contenu.</p></template>
			</FModal>
			<FModal v-model="fullOpen" title="Modale plein écran" size="full">
				<template #body><p>Contenu en pleine largeur.</p></template>
			</FModal>
		</div>
	`
});

export const NotClosable = () => ({
	components: { FModal, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir (non fermable)</FButton>
			<FModal
				v-model="isOpen"
				title="Action obligatoire"
				:closable="false"
				:closeOnOverlay="false"
				:closeOnEscape="false"
			>
				<template #body>
					<p>Vous devez confirmer cette action.</p>
				</template>
				<template #actions>
					<FButton variant="primary" @click="isOpen = false">J'ai compris</FButton>
				</template>
			</FModal>
		</div>
	`
});

export const Danger = () => ({
	components: { FModal, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton variant="danger" @click="isOpen = true">Supprimer</FButton>
			<FModal v-model="isOpen" title="Confirmer la suppression">
				<template #body>
					<p>Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?</p>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="danger" @click="isOpen = false">Supprimer</FButton>
				</template>
			</FModal>
		</div>
	`
});

export const WithForm = () => ({
	components: { FModal, FButton, FFormField },
	data() {
		return {
			isOpen: false,
			form: { name: '', email: '' }
		};
	},
	methods: {
		handleSubmit() {
			alert(`Nom: ${this.form.name}, Email: ${this.form.email}`);
			this.isOpen = false;
		}
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ajouter un contact</FButton>
			<FModal v-model="isOpen" title="Nouveau contact" subtitle="Remplissez les informations">
				<template #body>
					<div class="flex flex-col gap-4">
						<FFormField v-model="form.name" label="Nom" required />
						<FFormField v-model="form.email" label="Email" type="email" required />
					</div>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="handleSubmit">Ajouter</FButton>
				</template>
			</FModal>
		</div>
	`
});

export const CustomHeader = () => ({
	components: { FModal, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir</FButton>
			<FModal v-model="isOpen">
				<template #header>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
							<span class="text-primary-600 font-bold">!</span>
						</div>
						<div>
							<h3 class="font-semibold">En-tête personnalisé</h3>
							<p class="text-sm text-neutral-500">Avec icône et mise en forme</p>
						</div>
					</div>
				</template>
				<template #body>
					<p>Contenu de la modale avec un en-tête personnalisé.</p>
				</template>
			</FModal>
		</div>
	`
});
