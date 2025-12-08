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
	FAccordionItem,
	FAlert,
	FBreadcrumb,
	FButtonGroup,
	FDatePicker,
	FEmptyState,
	FFilePreview,
	FFormField,
	FCard,
	FSearchBar,
	FListItem,
	FPagination,
	FSelect,
	FTabs,
	FTab,
	FToast
} from './components/molecules';
import {
	FActivityFeed,
	FForm,
	FDataTable,
	FDrawer,
	FFileUpload,
	FPageHeader,
	FModal,
	FUserMenu,
	FOnboardingStepper,
	FProfileSection,
	FToastProvider
} from './components/organisms';
import { FThemeProvider } from './components/utils';
import type { VueConstructor, Component } from 'vue';

// Export all types
export * from './types';

// Export composables
export * from './composables';

// Type for components record
type ComponentsRecord = Record<string, Component>;

const components: ComponentsRecord = {
	FAccordionItem,
	FActivityFeed,
	FAlert,
	FAvatar,
	FBadge,
	FBreadcrumb,
	FButton,
	FButtonGroup,
	FCheckbox,
	FDataTable,
	FDatePicker,
	FDivider,
	FDrawer,
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
	FSelect,
	FTab,
	FTabs,
	FTextarea,
	FToggle,
	FTypography,
	FFormField,
	FCard,
	FForm,
	FSearchBar,
	FPagination,
	FUserMenu,
	FToast,
	FToastProvider,
	FThemeProvider
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
	FAccordionItem,
	FActivityFeed,
	FAlert,
	FAvatar,
	FBadge,
	FBreadcrumb,
	FButton,
	FButtonGroup,
	FCheckbox,
	FDataTable,
	FDatePicker,
	FDivider,
	FDrawer,
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
	FSelect,
	FTab,
	FTabs,
	FTextarea,
	FToggle,
	FTypography,
	FFormField,
	FCard,
	FForm,
	FSearchBar,
	FPagination,
	FUserMenu,
	FToast,
	FToastProvider,
	FThemeProvider
};
