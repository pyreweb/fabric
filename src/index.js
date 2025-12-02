import { FButton, FInput, FTypography } from './components/atoms'
import { FFormField, FCard } from './components/molecules'
import { FForm } from './components/organisms'

const components = {
  FButton,
  FInput,
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
  FButton,
  FInput,
  FTypography,
  FFormField,
  FCard,
  FForm
}
