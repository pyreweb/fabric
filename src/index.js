import './styles/tailwind.css'
import { FAvatar, FBadge, FButton, FCheckbox, FDivider, FIcon, FInput, FLoader, FRadio, FTextarea, FToggle, FTypography } from './components/atoms'
import { FAlert, FBreadcrumb, FButtonGroup, FEmptyState, FFilePreview, FFormField, FCard, FSearchBar, FListItem, FPagination } from './components/molecules'
import { FForm, FDataTable, FFileUpload, FPageHeader, FModal, FUserMenu, FOnboardingStepper } from './components/organisms'

const components = {
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
}

const install = (Vue) => {
  Object.keys(components).forEach((name) => {
    Vue.component(name, components[name])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}

export {
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
}
