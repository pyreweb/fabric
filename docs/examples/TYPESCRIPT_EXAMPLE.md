# Exemple d'utilisation TypeScript

Cet exemple montre comment utiliser les composants Fabric dans un projet TypeScript.

## Exemple complet

```typescript
import { defineComponent } from 'vue';
import {
  FInput,
  FDataTable,
  FButton,
  FBadge,
  FModal,
  // Import des types
  type FDataTableColumn,
  type SortEvent,
  type RowKey,
} from '@pyreweb/fabric';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export default defineComponent({
  name: 'TypeScriptExample',
  data() {
    return {
      searchQuery: '' as string,
      selectedUserIds: [] as RowKey[],
      users: [] as User[],
      tableColumns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nom', sortable: true },
      ] as FDataTableColumn[],
    };
  },
  methods: {
    handleSearchInput(value: string) {
      console.log('Recherche:', value);
    },
    handleSort(event: SortEvent) {
      console.log(`Tri par ${event.key} en ${event.direction}`);
    },
  },
});
```

Voir le [Guide TypeScript](../TYPESCRIPT_GUIDE.md) pour plus de détails.
