import './styles/tailwind.css';
import { FAvatar, FBadge, FButton, FCheckbox, FDivider, FIcon, FInput, FLoader, FRadio, FTextarea, FToggle, FTypography } from './components/atoms';
import { FAlert, FBreadcrumb, FButtonGroup, FDatePicker, FEmptyState, FFilePreview, FFormField, FCard, FSearchBar, FListItem, FPagination, FSelect, FTabs, FTab, FToast } from './components/molecules';
import { FActivityFeed, FForm, FDataTable, FDrawer, FFileUpload, FPageHeader, FModal, FUserMenu, FOnboardingStepper, FProfileSection, FToastProvider } from './components/organisms';
import { FThemeProvider } from './components/utils';
import type { VueConstructor } from 'vue';
export * from './types';
export * from './components';
declare global {
    interface Window {
        Vue?: VueConstructor;
    }
}
declare const _default: {
    install: (Vue: VueConstructor) => void;
};
export default _default;
export { FActivityFeed, FAlert, FAvatar, FBadge, FBreadcrumb, FButton, FButtonGroup, FCheckbox, FDataTable, FDatePicker, FDivider, FDrawer, FEmptyState, FFilePreview, FFileUpload, FIcon, FInput, FListItem, FLoader, FModal, FOnboardingStepper, FPageHeader, FProfileSection, FRadio, FSelect, FTab, FTabs, FTextarea, FToggle, FTypography, FFormField, FCard, FForm, FSearchBar, FPagination, FUserMenu, FToast, FToastProvider, FThemeProvider };
