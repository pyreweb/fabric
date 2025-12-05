import './styles/tailwind.css';
import { FAvatar, FBadge, FButton, FCheckbox, FDivider, FIcon, FInput, FLoader, FRadio, FTextarea, FToggle, FTypography } from './components/atoms';
import { FAlert, FBreadcrumb, FButtonGroup, FEmptyState, FFilePreview, FFormField, FCard, FSearchBar, FListItem, FPagination } from './components/molecules';
import { FActivityFeed, FForm, FDataTable, FFileUpload, FPageHeader, FModal, FUserMenu, FOnboardingStepper, FProfileSection } from './components/organisms';
import type { VueConstructor } from 'vue';
export * from './types';
declare global {
    interface Window {
        Vue?: VueConstructor;
    }
}
declare const _default: {
    install: (Vue: VueConstructor) => void;
};
export default _default;
export { FActivityFeed, FAlert, FAvatar, FBadge, FBreadcrumb, FButton, FButtonGroup, FCheckbox, FDataTable, FDivider, FEmptyState, FFilePreview, FFileUpload, FIcon, FInput, FListItem, FLoader, FModal, FOnboardingStepper, FPageHeader, FProfileSection, FRadio, FTextarea, FToggle, FTypography, FFormField, FCard, FForm, FSearchBar, FPagination, FUserMenu };
