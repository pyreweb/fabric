import './styles/tailwind.css.js';
import FAvatar from './components/atoms/FAvatar/FAvatar.vue.js';
import FBadge from './components/atoms/FBadge/FBadge.vue.js';
import FButton from './components/atoms/FButton/FButton.vue.js';
import FCheckbox from './components/atoms/FCheckbox/FCheckbox.vue.js';
import FDivider from './components/atoms/FDivider/FDivider.vue.js';
import FIcon from './components/atoms/FIcon/FIcon.vue.js';
import FInput from './components/atoms/FInput/FInput.vue.js';
import FLoader from './components/atoms/FLoader/FLoader.vue.js';
import FRadio from './components/atoms/FRadio/FRadio.vue.js';
import FTextarea from './components/atoms/FTextarea/FTextarea.vue.js';
import FToggle from './components/atoms/FToggle/FToggle.vue.js';
import FTypography from './components/atoms/FTypography/FTypography.vue.js';
import FAccordionItem from './components/molecules/FAccordionItem/FAccordionItem.vue.js';
import FAlert from './components/molecules/FAlert/FAlert.vue.js';
import FBreadcrumb from './components/molecules/FBreadcrumb/FBreadcrumb.vue.js';
import FButtonGroup from './components/molecules/FButtonGroup/FButtonGroup.vue.js';
import FDatePicker from './components/molecules/FDatePicker/FDatePicker.vue.js';
import FEmptyState from './components/molecules/FEmptyState/FEmptyState.vue.js';
import FFilePreview from './components/molecules/FFilePreview/FFilePreview.vue.js';
import FFormField from './components/molecules/FFormField/FFormField.vue.js';
import FCard from './components/molecules/FCard/FCard.vue.js';
import FSearchBar from './components/molecules/FSearchBar/FSearchBar.vue.js';
import FListItem from './components/molecules/FListItem/FListItem.vue.js';
import FPagination from './components/molecules/FPagination/FPagination.vue.js';
import FSelect from './components/molecules/FSelect/FSelect.vue.js';
import FTabs from './components/molecules/FTabs/FTabs.vue.js';
import FTab from './components/molecules/FTabs/FTab.vue.js';
import FToast from './components/molecules/FToast/FToast.vue.js';
import FActivityFeed from './components/organisms/FActivityFeed/FActivityFeed.vue.js';
import FForm from './components/organisms/FForm/FForm.vue.js';
import FDataTable from './components/organisms/FDataTable/FDataTable.vue.js';
import FDrawer from './components/organisms/FDrawer/FDrawer.vue.js';
import FFileUpload from './components/organisms/FFileUpload/FFileUpload.vue.js';
import FPageHeader from './components/organisms/FPageHeader/FPageHeader.vue.js';
import FModal from './components/organisms/FModal/FModal.vue.js';
import FUserMenu from './components/organisms/FUserMenu/FUserMenu.vue.js';
import FOnboardingStepper from './components/organisms/FOnboardingStepper/FOnboardingStepper.vue.js';
import FProfileSection from './components/organisms/FProfileSection/FProfileSection.vue.js';
import FToastProvider from './components/organisms/FToastProvider/FToastProvider.vue.js';
import FThemeProvider from './components/utils/FThemeProvider.vue.js';
export { useDataTableState } from './composables/useDataTableState.js';
export { useSidebarState } from './composables/useSidebarState.js';
export { useFormValidation } from './composables/useFormValidation.js';

const components = {
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
const install = (Vue) => {
    Object.keys(components).forEach((name) => {
        // Type assertion is necessary because Vue 2's component registration
        // doesn't have perfect TypeScript support for dynamic component maps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Vue.component(name, components[name]);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
var index = {
    install
};

export { FAccordionItem, FActivityFeed, FAlert, FAvatar, FBadge, FBreadcrumb, FButton, FButtonGroup, FCard, FCheckbox, FDataTable, FDatePicker, FDivider, FDrawer, FEmptyState, FFilePreview, FFileUpload, FForm, FFormField, FIcon, FInput, FListItem, FLoader, FModal, FOnboardingStepper, FPageHeader, FPagination, FProfileSection, FRadio, FSearchBar, FSelect, FTab, FTabs, FTextarea, FThemeProvider, FToast, FToastProvider, FToggle, FTypography, FUserMenu, index as default };
