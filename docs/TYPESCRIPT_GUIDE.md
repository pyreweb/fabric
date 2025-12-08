# Guide TypeScript - Fabric Design System

Ce guide explique comment utiliser les composants Fabric avec TypeScript pour bénéficier d'une meilleure expérience développeur (DX) grâce à l'autocomplétion, la vérification de types et la documentation interactive.

## 📋 Table des matières

- [Types disponibles](#types-disponibles)
- [Utilisation des événements typés](#utilisation-des-événements-typés)
- [Utilisation des slots typés](#utilisation-des-slots-typés)
- [Exemples pratiques](#exemples-pratiques)
- [Configuration du projet](#configuration-du-projet)

## Types disponibles

Tous les types sont exportés depuis le package principal et sont disponibles via :

```typescript
import { 
  FButtonProps, 
  FButtonVariant, 
  FDataTableColumn,
  FDataTableEvents,
  // ... et tous les autres types
} from '@pyreweb/fabric';
```

### Types de Props

Chaque composant dispose d'une interface dédiée pour ses props :

- `FButtonProps` - Props du composant FButton
- `FInputProps` - Props du composant FInput
- `FSelectProps` - Props du composant FSelect
- `FDataTableProps` - Props du composant FDataTable
- `FModalProps` - Props du composant FModal
- `FTabsProps` - Props du composant FTabs
- ... et bien d'autres

### Types d'Événements

Les événements émis par les composants sont typés via des interfaces dédiées :

- `FInputEvents` - Événements de FInput (input, focus, blur)
- `FSelectEvents` - Événements de FSelect (input, change, open, close, focus, blur)
- `FDataTableEvents` - Événements de FDataTable (row-click, sort, search, etc.)
- `FModalEvents` - Événements de FModal (input, close, open)
- ... et plus encore

### Types de Slots

Les slots scopés disposent d'interfaces de contexte pour un typage précis :

- `FModalSlots` - Slots disponibles pour FModal
- `FCardSlots` - Slots disponibles pour FCard
- `FDataTableSlots` - Slots disponibles pour FDataTable
- `FDataTableCellSlotContext` - Contexte du slot cell d'une table
- ... etc.

## Utilisation des événements typés

### Composants avec v-model

Les composants qui supportent `v-model` émettent un événement `input` typé :

```typescript
import { FInput, FInputEvents } from '@pyreweb/fabric';

// Dans votre composant Vue avec TypeScript
export default {
  methods: {
    handleInput(value: string) {
      // value est typé comme string grâce à FInputEvents
      console.log('Nouvelle valeur:', value);
    }
  }
}
```

### Événements complexes

Pour les composants avec des événements plus complexes comme FDataTable :

```typescript
import { FDataTable, SortEvent, SelectEvent } from '@pyreweb/fabric';

interface User {
  id: number;
  name: string;
  email: string;
}

export default {
  methods: {
    handleSort(event: SortEvent) {
      // event.key et event.direction sont typés
      console.log(`Tri par ${event.key} en ${event.direction}`);
    },
    
    handleSelect(event: SelectEvent<User>) {
      // event.row est typé comme User
      // event.selected est typé comme boolean
      if (event.selected) {
        console.log(`Ligne sélectionnée: ${event.row.name}`);
      }
    }
  }
}
```

## Utilisation des slots typés

### Slots simples

Pour les composants avec slots nommés comme FCard :

```vue
<template>
  <f-card>
    <!-- Slot par défaut -->
    <p>Contenu principal de la carte</p>
    
    <!-- Slot header -->
    <template #header>
      <h2>Titre personnalisé</h2>
    </template>
    
    <!-- Slot actions -->
    <template #actions>
      <f-button>Action</f-button>
    </template>
  </f-card>
</template>
```

### Slots scopés (avec contexte typé)

Pour FDataTable, les slots scopés fournissent un contexte typé :

```vue
<template>
  <f-data-table
    :data="users"
    :columns="columns"
  >
    <!-- Slot pour personnaliser la cellule 'name' -->
    <!-- Le contexte { value, row, column } est typé via FDataTableCellSlotContext -->
    <template #cell-name="{ value, row }">
      <strong>{{ value }}</strong>
      <small>(ID: {{ row.id }})</small>
    </template>
    
    <!-- Slot pour actions avec les éléments sélectionnés -->
    <!-- Le contexte { selectedItems } est typé via FDataTableActionsSlotContext -->
    <template #actions="{ selectedItems }">
      <f-button 
        v-if="selectedItems.length > 0"
        @click="deleteSelected(selectedItems)"
      >
        Supprimer ({{ selectedItems.length }})
      </f-button>
    </template>
  </f-data-table>
</template>

<script lang="ts">
import { FDataTable, FButton, FDataTableColumn } from '@pyreweb/fabric';

interface User {
  id: number;
  name: string;
  email: string;
}

export default {
  components: { FDataTable, FButton },
  data() {
    return {
      users: [] as User[],
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nom' },
        { key: 'email', label: 'Email' }
      ] as FDataTableColumn[]
    };
  },
  methods: {
    deleteSelected(items: User[]) {
      // items est correctement typé comme User[]
      console.log('Suppression de', items.length, 'utilisateurs');
    }
  }
};
</script>
```

## Exemples pratiques

### Exemple 1 : Formulaire avec validation

```vue
<template>
  <div>
    <f-form-field
      label="Nom d'utilisateur"
      :error="errors.username"
      required
    >
      <f-input
        v-model="form.username"
        @input="validateUsername"
        @blur="validateUsername"
        :error="!!errors.username"
      />
    </f-form-field>
    
    <f-form-field
      label="Email"
      :error="errors.email"
      required
    >
      <f-input
        v-model="form.email"
        type="email"
        @input="validateEmail"
        @blur="validateEmail"
        :error="!!errors.email"
      />
    </f-form-field>
  </div>
</template>

<script lang="ts">
import { FFormField, FInput } from '@pyreweb/fabric';

interface FormData {
  username: string;
  email: string;
}

interface FormErrors {
  username?: string;
  email?: string;
}

export default {
  components: { FFormField, FInput },
  data() {
    return {
      form: {
        username: '',
        email: ''
      } as FormData,
      errors: {} as FormErrors
    };
  },
  methods: {
    validateUsername(value: string) {
      if (value.length < 3) {
        this.errors.username = 'Le nom doit contenir au moins 3 caractères';
      } else {
        delete this.errors.username;
      }
    },
    validateEmail(value: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.errors.email = 'Email invalide';
      } else {
        delete this.errors.email;
      }
    }
  }
};
</script>
```

### Exemple 2 : Table avec actions

```vue
<template>
  <f-data-table
    :data="products"
    :columns="columns"
    :selectable="true"
    v-model:selected="selectedIds"
    @row-click="handleRowClick"
    @sort="handleSort"
  >
    <!-- Personnalisation de la colonne prix -->
    <template #cell-price="{ value }">
      <span class="font-bold">{{ formatPrice(value) }}</span>
    </template>
    
    <!-- Personnalisation de la colonne stock -->
    <template #cell-stock="{ value }">
      <f-badge 
        :variant="value > 10 ? 'success' : 'warning'"
      >
        {{ value }} en stock
      </f-badge>
    </template>
    
    <!-- Actions pour les lignes sélectionnées -->
    <template #actions="{ selectedItems }">
      <f-button
        v-if="selectedItems.length > 0"
        variant="danger"
        @click="deleteProducts(selectedItems)"
      >
        Supprimer ({{ selectedItems.length }})
      </f-button>
    </template>
  </f-data-table>
</template>

<script lang="ts">
import { 
  FDataTable, 
  FButton, 
  FBadge,
  FDataTableColumn,
  SortEvent,
  RowKey
} from '@pyreweb/fabric';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default {
  components: { FDataTable, FButton, FBadge },
  data() {
    return {
      products: [] as Product[],
      selectedIds: [] as RowKey[],
      columns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nom', sortable: true },
        { key: 'price', label: 'Prix', sortable: true },
        { key: 'stock', label: 'Stock', sortable: true }
      ] as FDataTableColumn[]
    };
  },
  methods: {
    handleRowClick(row: Product) {
      console.log('Produit cliqué:', row.name);
    },
    handleSort(event: SortEvent) {
      console.log(`Tri par ${event.key} en ${event.direction}`);
      // Implémenter la logique de tri
    },
    formatPrice(value: number): string {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(value);
    },
    deleteProducts(items: Product[]) {
      console.log('Suppression de', items.length, 'produits');
      // Implémenter la logique de suppression
    }
  }
};
</script>
```

### Exemple 3 : Modal avec formulaire

```vue
<template>
  <div>
    <f-button @click="showModal = true">
      Ouvrir le modal
    </f-button>
    
    <f-modal
      v-model="showModal"
      title="Créer un utilisateur"
      size="medium"
      @close="resetForm"
    >
      <!-- Contenu du modal -->
      <f-form-field label="Nom" :error="errors.name">
        <f-input v-model="form.name" :error="!!errors.name" />
      </f-form-field>
      
      <f-form-field label="Email" :error="errors.email">
        <f-input v-model="form.email" type="email" :error="!!errors.email" />
      </f-form-field>
      
      <!-- Footer avec actions -->
      <template #footer>
        <f-button variant="secondary" @click="showModal = false">
          Annuler
        </f-button>
        <f-button variant="primary" @click="submit">
          Créer
        </f-button>
      </template>
    </f-modal>
  </div>
</template>

<script lang="ts">
import { FModal, FButton, FFormField, FInput } from '@pyreweb/fabric';

interface UserForm {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default {
  components: { FModal, FButton, FFormField, FInput },
  data() {
    return {
      showModal: false,
      form: {
        name: '',
        email: ''
      } as UserForm,
      errors: {} as FormErrors
    };
  },
  methods: {
    resetForm() {
      this.form = { name: '', email: '' };
      this.errors = {};
    },
    submit() {
      // Validation et soumission
      if (this.validate()) {
        console.log('Création de l\'utilisateur:', this.form);
        this.showModal = false;
        this.resetForm();
      }
    },
    validate(): boolean {
      this.errors = {};
      let isValid = true;
      
      if (!this.form.name) {
        this.errors.name = 'Le nom est requis';
        isValid = false;
      }
      
      if (!this.form.email) {
        this.errors.email = 'L\'email est requis';
        isValid = false;
      }
      
      return isValid;
    }
  }
};
</script>
```

## Configuration du projet

### Installation

```bash
npm install @pyreweb/fabric
```

### Configuration TypeScript

Assurez-vous que votre `tsconfig.json` inclut les bonnes options :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

### Import des types

```typescript
// Import de composants
import { FButton, FInput, FDataTable } from '@pyreweb/fabric';

// Import de types
import type { 
  FButtonProps, 
  FInputEvents, 
  FDataTableColumn,
  SortEvent 
} from '@pyreweb/fabric';
```

### Support IDE

Avec ces définitions de types, votre IDE (VS Code, WebStorm, etc.) vous fournira :

- ✅ **Autocomplétion** des props, événements et slots
- ✅ **Vérification de types** à la compilation
- ✅ **Documentation inline** via JSDoc
- ✅ **Navigation** vers les définitions de types
- ✅ **Refactoring** sécurisé

## Bénéfices

### Réduction des erreurs

```typescript
// ❌ Erreur détectée à la compilation
<f-button size="invalid">Button</f-button>
// Type '"invalid"' is not assignable to type 'FButtonSize'

// ✅ Correct
<f-button size="large">Button</f-button>
```

### Autocomplétion intelligente

Lorsque vous tapez `<f-data-table @`, votre IDE vous suggérera automatiquement :
- `@row-click`
- `@sort`
- `@search`
- `@page-change`
- `@select`
- `@select-all`
- etc.

### Documentation interactive

Survoler un composant ou une prop affichera sa documentation directement dans l'IDE, grâce aux commentaires JSDoc dans les définitions de types.

## Support et contribution

Pour toute question ou suggestion d'amélioration concernant le support TypeScript, n'hésitez pas à ouvrir une issue sur le repository GitHub.

---

**Note** : Ce guide sera mis à jour au fur et à mesure de l'ajout de nouveaux composants et fonctionnalités au design system Fabric.
