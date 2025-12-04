import './styles/tailwind.css';
import {
	FAvatar,
	FBadge,
	FButton,
	FCheckbox,
	FDivider,
	FIcon,
	FInput,
	FLoader,
	FRadio,
	FTextarea,
	FToggle,
	FTypography
} from './components/atoms';
import {
	FAlert,
	FBreadcrumb,
	FButtonGroup,
	FEmptyState,
	FFilePreview,
	FFormField,
	FCard,
	FSearchBar,
	FListItem,
	FPagination
} from './components/molecules';
import {
	FActivityFeed,
	FForm,
	FDataTable,
	FFileUpload,
	FPageHeader,
	FModal,
	FUserMenu,
	FOnboardingStepper,
	FProfileSection
} from './components/organisms';
import type { VueConstructor, Component } from 'vue';

// Export all types
export * from './types';

// Type for components record
type ComponentsRecord = Record<string, Component>;

const components: ComponentsRecord = {
	FActivityFeed,
	FAlert,
	FAvatar,
	FBadge,
	FBreadcrumb,
	FButton,
	FButtonGroup,
	FCheckbox,
	FDataTable,
	FDivider,
	FEmptyState,
	FFilePreview,
	FFileUpload,
	FIcon,
	FInput,
	FListItem,
	FLoader,
	FModal,
	FOnboardingStepper,
	FPageHeader,
	FProfileSection,
	FRadio,
	FTextarea,
	FToggle,
	FTypography,
	FFormField,
	FCard,
	FForm,
	FSearchBar,
	FPagination,
	FUserMenu
};

const install = (Vue: VueConstructor): void => {
	Object.keys(components).forEach((name) => {
		// Type assertion is necessary because Vue 2's component registration
		// doesn't have perfect TypeScript support for dynamic component maps
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Vue.component(name, components[name] as any);
	});
};

// Auto-install when Vue is found (browser global)
declare global {
	interface Window {
		Vue?: VueConstructor;
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install
};

export {
	FActivityFeed,
	FAlert,
	FAvatar,
	FBadge,
	FBreadcrumb,
	FButton,
	FButtonGroup,
	FCheckbox,
	FDataTable,
	FDivider,
	FEmptyState,
	FFilePreview,
	FFileUpload,
	FIcon,
	FInput,
	FListItem,
	FLoader,
	FModal,
	FOnboardingStepper,
	FPageHeader,
	FProfileSection,
	FRadio,
	FTextarea,
	FToggle,
	FTypography,
	FFormField,
	FCard,
	FForm,
	FSearchBar,
	FPagination,
	FUserMenu
};
