import './styles/tailwind.css'
import { FAvatar, FBadge, FButton, FCheckbox, FIcon, FInput, FRadio, FTextarea, FToggle, FTypography } from './components/atoms'
import { FFormField, FCard } from './components/molecules'
import { FForm } from './components/organisms'

const components = {
  FAvatar,
  FBadge,
  FButton,
  FCheckbox,
  FIcon,
  FInput,
  FRadio,
  FTextarea,
  FToggle,
  FTypography,
  FFormField,
  FCard,
  FForm
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
  FAvatar,
  FBadge,
  FButton,
  FCheckbox,
  FIcon,
  FInput,
  FRadio,
  FTextarea,
  FToggle,
  FTypography,
  FFormField,
  FCard,
  FForm
}
