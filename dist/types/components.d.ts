/**
 * Déclarations de types TypeScript pour les composants Vue Fabric
 * Ce fichier fournit des définitions de types précises pour améliorer l'expérience développeur (DX)
 */

import { DefineComponent, Plugin } from 'vue';
import * as Types from './types';

// =============================================================================
// Atoms - Composants de base
// =============================================================================

/**
 * FInput - Composant de champ de saisie
 * @emits input - Émis lorsque la valeur change avec la nouvelle valeur
 * @emits focus - Émis lorsque le champ reçoit le focus
 * @emits blur - Émis lorsque le champ perd le focus
 */
export declare const FInput: DefineComponent<
	Types.FInputProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FInputEvents
>;

/**
 * FTextarea - Composant de zone de texte
 * @emits input - Émis lorsque la valeur change avec la nouvelle valeur
 * @emits focus - Émis lorsque le champ reçoit le focus
 * @emits blur - Émis lorsque le champ perd le focus
 */
export declare const FTextarea: DefineComponent<
	Types.FTextareaProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FTextareaEvents
>;

/**
 * FButton - Composant de bouton
 */
export declare const FButton: DefineComponent<Types.FButtonProps>;

/**
 * FCheckbox - Composant de case à cocher
 * @emits input - Émis lorsque l'état change (v-model)
 * @emits change - Émis lorsque l'état change
 */
export declare const FCheckbox: DefineComponent<
	Types.FCheckboxProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FCheckboxEvents
>;

/**
 * FRadio - Composant de bouton radio
 * @emits input - Émis lorsque l'état change (v-model)
 * @emits change - Émis lorsque l'état change
 */
export declare const FRadio: DefineComponent<
	Types.FRadioProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FRadioEvents
>;

/**
 * FToggle - Composant de switch/toggle
 * @emits input - Émis lorsque l'état change (v-model)
 * @emits change - Émis lorsque l'état change
 */
export declare const FToggle: DefineComponent<
	Types.FToggleProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FToggleEvents
>;

/**
 * FAvatar - Composant d'avatar
 */
export declare const FAvatar: DefineComponent<Types.FAvatarProps>;

/**
 * FBadge - Composant de badge
 */
export declare const FBadge: DefineComponent<Types.FBadgeProps>;

/**
 * FIcon - Composant d'icône
 */
export declare const FIcon: DefineComponent<Types.FIconProps>;

/**
 * FLoader - Composant de chargement
 */
export declare const FLoader: DefineComponent<Types.FLoaderProps>;

/**
 * FDivider - Composant de séparateur
 */
export declare const FDivider: DefineComponent<{
	vertical?: boolean;
	dashed?: boolean;
}>;

/**
 * FTypography - Composant de typographie
 */
export declare const FTypography: DefineComponent<{
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'overline';
	color?: string;
	align?: 'left' | 'center' | 'right' | 'justify';
}>;

// =============================================================================
// Molecules - Composants composés
// =============================================================================

/**
 * FSelect - Composant de sélection
 * @emits input - Émis lorsque la sélection change (v-model)
 * @emits change - Émis lorsque la sélection change
 * @emits open - Émis lorsque le menu s'ouvre
 * @emits close - Émis lorsque le menu se ferme
 * @emits focus - Émis lorsque le composant reçoit le focus
 * @emits blur - Émis lorsque le composant perd le focus
 */
export declare const FSelect: DefineComponent<
	Types.FSelectProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FSelectEvents
>;

/**
 * FDatePicker - Composant de sélection de date
 * @emits input - Émis lorsque la date change (v-model)
 * @emits change - Émis lorsque la date change
 * @emits focus - Émis lorsque le composant reçoit le focus
 * @emits blur - Émis lorsque le composant perd le focus
 */
export declare const FDatePicker: DefineComponent<
	Types.FDatePickerProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FDatePickerEvents
>;

/**
 * FTabs - Composant d'onglets
 * @emits input - Émis lorsque l'onglet actif change (v-model)
 * @emits change - Émis lorsque l'onglet actif change
 * @slots default - Slot pour les composants FTab
 */
export declare const FTabs: DefineComponent<
	Types.FTabsProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FTabsEvents,
	string,
	{
		default: void;
	}
>;

/**
 * FTab - Composant d'onglet individuel
 * @slots default - Contenu de l'onglet
 */
export declare const FTab: DefineComponent<
	Types.FTabProps,
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	string,
	{
		default: void;
	}
>;

/**
 * FCard - Composant de carte
 * @emits click - Émis lorsque la carte cliquable est cliquée
 * @slots default - Contenu principal de la carte
 * @slots header - Header personnalisé
 * @slots media - Médias (images, vidéos)
 * @slots actions - Actions en bas de la carte
 */
export declare const FCard: DefineComponent<
	Types.FCardProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FCardEvents,
	string,
	Types.FCardSlots
>;

/**
 * FAlert - Composant d'alerte
 * @emits close - Émis lorsque l'alerte est fermée
 * @slots default - Message de l'alerte
 * @slots title - Titre personnalisé
 * @slots icon - Icône personnalisée
 */
export declare const FAlert: DefineComponent<
	Types.FAlertProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FAlertEvents,
	string,
	Types.FAlertSlots
>;

/**
 * FToast - Composant de notification toast
 * @emits close - Émis lorsque le toast est fermé
 */
export declare const FToast: DefineComponent<
	Types.FToastProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FToastEvents
>;

/**
 * FPagination - Composant de pagination
 * @emits page-change - Émis lorsque la page change
 * @emits update:currentPage - Émis pour le support v-model de currentPage
 */
export declare const FPagination: DefineComponent<
	Types.FPaginationProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FPaginationEvents
>;

/**
 * FSearchBar - Barre de recherche
 * @emits input - Émis lorsque la valeur change (v-model)
 * @emits search - Émis lorsque la recherche est soumise
 * @emits clear - Émis lorsque le champ est vidé
 */
export declare const FSearchBar: DefineComponent<
	Types.FSearchBarProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FSearchBarEvents
>;

/**
 * FBreadcrumb - Fil d'Ariane
 * @emits click - Émis lorsqu'un item est cliqué
 */
export declare const FBreadcrumb: DefineComponent<
	Types.FBreadcrumbProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FBreadcrumbEvents
>;

/**
 * FEmptyState - État vide
 * @emits action - Émis lorsque l'action est cliquée
 * @slots default - Contenu par défaut
 * @slots icon - Icône personnalisée
 * @slots actions - Actions personnalisées
 */
export declare const FEmptyState: DefineComponent<
	Types.FEmptyStateProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FEmptyStateEvents,
	string,
	Types.FEmptyStateSlots
>;

/**
 * FFormField - Champ de formulaire avec label et erreur
 * @slots default - Le champ de formulaire
 * @slots label - Label personnalisé
 * @slots hint - Indication
 * @slots error - Message d'erreur personnalisé
 */
export declare const FFormField: DefineComponent<
	Types.FFormFieldProps,
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	string,
	Types.FFormFieldSlots
>;

/**
 * FListItem - Item de liste
 */
export declare const FListItem: DefineComponent<{
	title?: string;
	subtitle?: string;
	clickable?: boolean;
}>;

/**
 * FButtonGroup - Groupe de boutons
 */
export declare const FButtonGroup: DefineComponent<{
	vertical?: boolean;
	attached?: boolean;
}>;

/**
 * FFilePreview - Prévisualisation de fichier
 */
export declare const FFilePreview: DefineComponent<{
	file?: File | null;
	src?: string;
	name?: string;
	type?: string;
	size?: number;
	removable?: boolean;
}>;

/**
 * FAccordionItem - Item d'accordéon
 */
export declare const FAccordionItem: DefineComponent<{
	title?: string;
	open?: boolean;
	disabled?: boolean;
}>;

/**
 * FStatCard - Carte de statistique
 */
export declare const FStatCard: DefineComponent<{
	title?: string;
	value?: string | number;
	trend?: 'up' | 'down' | 'neutral';
	trendValue?: string;
	icon?: string;
}>;

// =============================================================================
// Organisms - Composants complexes
// =============================================================================

/**
 * FModal - Composant de modal
 * @emits input - Émis pour le support v-model de l'état ouvert/fermé
 * @emits close - Émis lorsque le modal se ferme
 * @emits open - Émis lorsque le modal s'ouvre
 * @slots default - Contenu du modal
 * @slots header - Header personnalisé
 * @slots footer - Footer avec actions
 */
export declare const FModal: DefineComponent<
	Types.FModalProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FModalEvents,
	string,
	Types.FModalSlots
>;

/**
 * FDrawer - Composant de tiroir latéral
 * @emits input - Émis pour le support v-model de l'état ouvert/fermé
 * @emits close - Émis lorsque le drawer se ferme
 * @emits open - Émis lorsque le drawer s'ouvre
 * @slots default - Contenu du drawer
 * @slots header - Header personnalisé
 * @slots footer - Footer avec actions
 */
export declare const FDrawer: DefineComponent<
	Types.FDrawerProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FDrawerEvents,
	string,
	Types.FDrawerSlots
>;

/**
 * FDataTable - Table de données
 * @emits row-click - Émis lorsqu'une ligne est cliquée
 * @emits sort - Émis lorsque le tri change
 * @emits search - Émis lorsque la recherche change
 * @emits page-change - Émis lorsque la page change
 * @emits select - Émis lorsqu'une ligne est sélectionnée/désélectionnée
 * @emits select-all - Émis lorsque toutes les lignes sont sélectionnées/désélectionnées
 * @emits empty-action - Émis lorsque l'action de l'état vide est cliquée
 * @emits update:page - Émis pour le support v-model de la page
 * @emits update:selected - Émis pour le support v-model de la sélection
 * @slots cell-{columnKey} - Slot pour personnaliser une cellule (slot scopé avec value, row, column)
 * @slots actions - Slot pour les actions personnalisées (slot scopé avec selectedItems)
 */
export declare const FDataTable: DefineComponent<
	Types.FDataTableProps,
	{},
	{},
	{},
	{},
	{},
	{},
	Types.FDataTableEvents,
	string,
	Types.FDataTableSlots
>;

/**
 * FToastProvider - Fournisseur de toasts (système de notifications)
 */
export declare const FToastProvider: DefineComponent<{
	position?: Types.FToastPosition;
	maxToasts?: number;
}>;

/**
 * FFileUpload - Upload de fichiers
 */
export declare const FFileUpload: DefineComponent<{
	multiple?: boolean;
	accept?: string;
	maxSize?: number;
	maxFiles?: number;
}>;

/**
 * FForm - Formulaire
 */
export declare const FForm: DefineComponent<{
	schema?: Record<string, unknown>;
	initialValues?: Record<string, unknown>;
}>;

/**
 * FActivityFeed - Fil d'activité
 */
export declare const FActivityFeed: DefineComponent<{
	items?: Array<Record<string, unknown>>;
	loading?: boolean;
	virtual?: boolean;
}>;

/**
 * FPageHeader - En-tête de page
 */
export declare const FPageHeader: DefineComponent<{
	title?: string;
	subtitle?: string;
	backButton?: boolean;
}>;

/**
 * FUserMenu - Menu utilisateur
 */
export declare const FUserMenu: DefineComponent<{
	user?: {
		name?: string;
		email?: string;
		avatar?: string;
	};
	menuItems?: Array<{ label: string; action: string }>;
}>;

/**
 * FOnboardingStepper - Stepper d'onboarding
 */
export declare const FOnboardingStepper: DefineComponent<{
	steps?: Array<{ title: string; description?: string }>;
	currentStep?: number;
}>;

/**
 * FProfileSection - Section de profil
 */
export declare const FProfileSection: DefineComponent<{
	user?: {
		name?: string;
		email?: string;
		avatar?: string;
		bio?: string;
	};
}>;

/**
 * FNavigationSidebar - Barre de navigation latérale
 */
export declare const FNavigationSidebar: DefineComponent<{
	items?: Array<{
		label: string;
		icon?: string;
		to?: string;
		children?: Array<{ label: string; to?: string }>;
	}>;
	collapsed?: boolean;
}>;

/**
 * FFilterSidebar - Barre latérale de filtres
 */
export declare const FFilterSidebar: DefineComponent<{
	filters?: Array<Record<string, unknown>>;
}>;

// =============================================================================
// Plugin d'installation
// =============================================================================

/**
 * Plugin Fabric - Installe tous les composants globalement
 */
declare const FabricPlugin: Plugin;

export default FabricPlugin;
