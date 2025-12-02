# Fabric

A VueJS 2 component library inspired by Atomic Design System. Simple to use and quickly usable on external projects.

## Installation

```bash
npm install @fabric/components
```

## Usage

### Global Registration

```javascript
import Vue from 'vue'
import Fabric from '@fabric/components'

Vue.use(Fabric)
```

### Individual Import

```javascript
import { FButton, FInput, FCard } from '@fabric/components'

export default {
  components: {
    FButton,
    FInput,
    FCard
  }
}
```

## Components

### Atoms (Base Components)

#### FButton

A customizable button component.

```vue
<f-button variant="primary" size="medium" @click="handleClick">
  Click me
</f-button>
```

**Props:**
- `variant`: `'primary'` | `'secondary'` | `'outline'` | `'text'` (default: `'primary'`)
- `size`: `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `type`: `'button'` | `'submit'` | `'reset'` (default: `'button'`)
- `disabled`: Boolean (default: `false`)

#### FInput

A text input component.

```vue
<f-input v-model="text" placeholder="Enter text..." />
```

**Props:**
- `value`: String | Number
- `type`: String (default: `'text'`)
- `placeholder`: String
- `size`: `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `disabled`: Boolean (default: `false`)
- `readonly`: Boolean (default: `false`)
- `error`: Boolean (default: `false`)

#### FTypography

A typography component for consistent text styling.

```vue
<f-typography variant="h1">Title</f-typography>
<f-typography variant="body">Paragraph text</f-typography>
```

**Props:**
- `variant`: `'h1'` | `'h2'` | `'h3'` | `'h4'` | `'h5'` | `'h6'` | `'body'` | `'caption'` | `'overline'` (default: `'body'`)
- `tag`: String (custom HTML tag)
- `truncate`: Boolean (default: `false`)

### Molecules (Composite Components)

#### FFormField

A form field combining label and input with error handling.

```vue
<f-form-field
  v-model="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
  :error-message="emailError"
/>
```

**Props:**
- `label`: String
- `value`: String | Number
- `type`: String (default: `'text'`)
- `placeholder`: String
- `size`: `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `disabled`: Boolean (default: `false`)
- `readonly`: Boolean (default: `false`)
- `required`: Boolean (default: `false`)
- `hint`: String
- `errorMessage`: String

#### FCard

A card component for content presentation.

```vue
<f-card title="Card Title" subtitle="Subtitle">
  <p>Card content goes here</p>
  <template #actions>
    <f-button variant="primary">Action</f-button>
  </template>
</f-card>
```

**Props:**
- `title`: String
- `subtitle`: String
- `clickable`: Boolean (default: `false`)
- `bordered`: Boolean (default: `true`)

**Slots:**
- `default`: Main content
- `header`: Custom header
- `media`: Media content (images, etc.)
- `actions`: Action buttons

### Organisms (Complex Components)

#### FForm

A form wrapper component.

```vue
<f-form @submit="handleSubmit">
  <f-form-field v-model="name" label="Name" required />
  <f-form-field v-model="email" label="Email" type="email" required />
  <template #actions>
    <f-button type="submit" variant="primary">Submit</f-button>
    <f-button type="reset" variant="outline">Reset</f-button>
  </template>
</f-form>
```

## Atomic Design Structure

This library follows the Atomic Design methodology:

- **Atoms**: Basic building blocks (Button, Input, Typography)
- **Molecules**: Simple combinations of atoms (FormField, Card)
- **Organisms**: Complex components composed of molecules and atoms (Form)

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes
npm run dev
```

## License

MIT