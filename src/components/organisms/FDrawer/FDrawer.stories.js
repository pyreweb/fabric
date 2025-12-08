import FDrawer from './FDrawer.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';

export default {
	title: 'Organisms/FDrawer',
	component: FDrawer,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'boolean',
			description: 'État ouvert/fermé'
		},
		title: {
			control: 'text',
			description: 'Titre du tiroir'
		},
		subtitle: {
			control: 'text',
			description: 'Sous-titre'
		},
		position: {
			control: { type: 'select' },
			options: ['left', 'right', 'top', 'bottom'],
			description: 'Position du tiroir'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Taille du tiroir'
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
	components: { FDrawer, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir le tiroir</FButton>
			<FDrawer v-model="isOpen" title="Titre du tiroir">
				<template #body>
					<p>Contenu du tiroir latéral.</p>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="isOpen = false">Confirmer</FButton>
				</template>
			</FDrawer>
		</div>
	`
});

export const WithSubtitle = () => ({
	components: { FDrawer, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir</FButton>
			<FDrawer v-model="isOpen" title="Paramètres" subtitle="Configuration du profil">
				<template #body>
					<p>Modifiez vos paramètres de profil ici.</p>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="isOpen = false">Sauvegarder</FButton>
				</template>
			</FDrawer>
		</div>
	`
});

export const Positions = () => ({
	components: { FDrawer, FButton },
	data() {
		return {
			leftOpen: false,
			rightOpen: false,
			topOpen: false,
			bottomOpen: false
		};
	},
	template: `
		<div class="flex gap-2">
			<FButton @click="leftOpen = true">Gauche</FButton>
			<FButton @click="rightOpen = true">Droite</FButton>
			<FButton @click="topOpen = true">Haut</FButton>
			<FButton @click="bottomOpen = true">Bas</FButton>
			
			<FDrawer v-model="leftOpen" title="Tiroir gauche" position="left">
				<template #body><p>Contenu du tiroir gauche.</p></template>
			</FDrawer>
			<FDrawer v-model="rightOpen" title="Tiroir droit" position="right">
				<template #body><p>Contenu du tiroir droit.</p></template>
			</FDrawer>
			<FDrawer v-model="topOpen" title="Tiroir haut" position="top">
				<template #body><p>Contenu du tiroir haut.</p></template>
			</FDrawer>
			<FDrawer v-model="bottomOpen" title="Tiroir bas" position="bottom">
				<template #body><p>Contenu du tiroir bas.</p></template>
			</FDrawer>
		</div>
	`
});

export const Sizes = () => ({
	components: { FDrawer, FButton },
	data() {
		return {
			smallOpen: false,
			mediumOpen: false,
			largeOpen: false
		};
	},
	template: `
		<div class="flex gap-2">
			<FButton @click="smallOpen = true">Petit</FButton>
			<FButton @click="mediumOpen = true">Moyen</FButton>
			<FButton @click="largeOpen = true">Grand</FButton>
			
			<FDrawer v-model="smallOpen" title="Petit tiroir" size="small">
				<template #body><p>Tiroir de petite taille.</p></template>
			</FDrawer>
			<FDrawer v-model="mediumOpen" title="Tiroir moyen" size="medium">
				<template #body><p>Taille par défaut.</p></template>
			</FDrawer>
			<FDrawer v-model="largeOpen" title="Grand tiroir" size="large">
				<template #body><p>Tiroir de grande taille.</p></template>
			</FDrawer>
		</div>
	`
});

export const NotClosable = () => ({
	components: { FDrawer, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir (non fermable)</FButton>
			<FDrawer
				v-model="isOpen"
				title="Action obligatoire"
				:closable="false"
				:closeOnOverlay="false"
				:closeOnEscape="false"
			>
				<template #body>
					<p>Vous devez confirmer cette action avant de continuer.</p>
				</template>
				<template #actions>
					<FButton variant="primary" @click="isOpen = false">J'ai compris</FButton>
				</template>
			</FDrawer>
		</div>
	`
});

export const WithForm = () => ({
	components: { FDrawer, FButton, FFormField },
	data() {
		return {
			isOpen: false,
			form: {
				name: '',
				email: '',
				phone: ''
			}
		};
	},
	methods: {
		handleSubmit() {
			alert(
				`Nom: ${this.form.name}, Email: ${this.form.email}, Téléphone: ${this.form.phone}`
			);
			this.isOpen = false;
		}
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ajouter un contact</FButton>
			<FDrawer v-model="isOpen" title="Nouveau contact" subtitle="Remplissez les informations">
				<template #body>
					<div class="flex flex-col gap-4">
						<FFormField v-model="form.name" label="Nom complet" required />
						<FFormField v-model="form.email" label="Email" type="email" required />
						<FFormField v-model="form.phone" label="Téléphone" type="tel" />
					</div>
				</template>
				<template #actions>
					<FButton variant="outline" @click="isOpen = false">Annuler</FButton>
					<FButton variant="primary" @click="handleSubmit">Ajouter</FButton>
				</template>
			</FDrawer>
		</div>
	`
});

export const FilterPanel = () => ({
	components: { FDrawer, FButton, FFormField },
	data() {
		return {
			isOpen: false,
			filters: {
				search: '',
				category: '',
				minPrice: '',
				maxPrice: ''
			}
		};
	},
	methods: {
		applyFilters() {
			alert('Filtres appliqués !');
			this.isOpen = false;
		},
		resetFilters() {
			this.filters = {
				search: '',
				category: '',
				minPrice: '',
				maxPrice: ''
			};
		}
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Filtres</FButton>
			<FDrawer v-model="isOpen" title="Filtres" subtitle="Affinez votre recherche" position="left">
				<template #body>
					<div class="flex flex-col gap-4">
						<FFormField v-model="filters.search" label="Recherche" placeholder="Rechercher..." />
						<FFormField v-model="filters.category" label="Catégorie" placeholder="Sélectionner..." />
						<div class="grid grid-cols-2 gap-2">
							<FFormField v-model="filters.minPrice" label="Prix min" type="number" />
							<FFormField v-model="filters.maxPrice" label="Prix max" type="number" />
						</div>
					</div>
				</template>
				<template #actions>
					<FButton variant="ghost" @click="resetFilters">Réinitialiser</FButton>
					<FButton variant="primary" @click="applyFilters">Appliquer</FButton>
				</template>
			</FDrawer>
		</div>
	`
});

export const CustomHeader = () => ({
	components: { FDrawer, FButton },
	data() {
		return { isOpen: false };
	},
	template: `
		<div>
			<FButton @click="isOpen = true">Ouvrir</FButton>
			<FDrawer v-model="isOpen">
				<template #header>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
							<span class="text-primary-600 font-bold text-xl">📋</span>
						</div>
						<div>
							<h3 class="font-semibold">En-tête personnalisé</h3>
							<p class="text-sm text-neutral-500">Avec icône et mise en forme</p>
						</div>
					</div>
				</template>
				<template #body>
					<p>Contenu du tiroir avec un en-tête personnalisé.</p>
				</template>
			</FDrawer>
		</div>
	`
});
