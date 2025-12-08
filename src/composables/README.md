# Composables Fabric

Les composables Fabric exposent la logique métier des composants "organismes" sous forme de fonctions réutilisables basées sur l'API de Composition de Vue.

## Vue d'ensemble

Les composables permettent de:
- **Séparer les préoccupations**: Isoler la logique d'état de la logique de présentation
- **Améliorer la réutilisabilité**: Réutiliser la logique dans des composants personnalisés
- **Faciliter les tests**: Tester la logique métier de manière isolée

## Composables disponibles

### `useDataTableState`

Gère l'état et la logique d'un tableau de données avec recherche, tri, pagination et sélection.

#### Exemple d'utilisation

```typescript
import { useDataTableState } from '@pyreweb/fabric';

export default {
  name: 'MyCustomTable',
  setup(props, { emit }) {
    const tableState = useDataTableState(
      {
        data: props.data,
        columns: props.columns,
        perPage: 10,
        paginated: true,
        defaultSortKey: 'name'
      },
      emit
    );

    return {
      ...tableState
    };
  }
};
```

#### Options

- `data` (Array, required): Tableau de données à afficher
- `columns` (Array, required): Définitions des colonnes
- `rowKey` (String, default: 'id'): Propriété unique dans les objets de données
- `initialPage` (Number, default: 1): Numéro de page initial
- `perPage` (Number, default: 10): Éléments par page
- `paginated` (Boolean, default: true): Activer la pagination
- `virtual` (Boolean, default: false): Activer la virtualisation (désactive la pagination)
- `defaultSortKey` (String, default: null): Clé de tri par défaut
- `defaultSortDirection` (String, default: 'asc'): Direction de tri par défaut ('asc' | 'desc')
- `serverMode` (Boolean, default: false): Mode serveur (récupération externe des données)
- `totalItems` (Number, default: null): Total d'éléments pour la pagination côté serveur
- `selected` (Array, default: []): Clés de lignes initialement sélectionnées

#### Valeurs retournées

**État:**
- `searchQuery`: Query de recherche (Ref<string>)
- `sortKey`: Clé de tri actuelle (Ref<string | null>)
- `sortDirection`: Direction de tri (Ref<'asc' | 'desc'>)
- `internalPage`: Page actuelle (Ref<number>)
- `selectedKeys`: Clés des lignes sélectionnées (Ref<any[]>)
- `selectedItems`: Items sélectionnés (ComputedRef<any[]>)
- `isAllSelected`: Toutes les lignes sont-elles sélectionnées (ComputedRef<boolean>)

**Données traitées:**
- `filteredData`: Données filtrées (ComputedRef<any[]>)
- `sortedData`: Données triées (ComputedRef<any[]>)
- `processedData`: Données traitées (ComputedRef<any[]>)
- `paginatedData`: Données paginées (ComputedRef<any[]>)
- `totalPages`: Nombre total de pages (ComputedRef<number>)
- `paginationInfo`: Texte d'info de pagination (ComputedRef<string>)

**Méthodes:**
- `getCellValue(row, key)`: Obtenir la valeur d'une cellule
- `getRowKey(row, index?)`: Obtenir la clé d'une ligne
- `handleSort(key)`: Gérer le tri
- `isRowSelected(row)`: Vérifier si une ligne est sélectionnée
- `handleRowSelect(row, checked)`: Gérer la sélection d'une ligne
- `handleSelectAll(checked)`: Sélectionner/désélectionner toutes les lignes
- `clearSelection()`: Effacer la sélection

---

### `useSidebarState`

Gère l'état et la logique d'une barre latérale de navigation avec sous-menus.

#### Exemple d'utilisation

```typescript
import { useSidebarState } from '@pyreweb/fabric';

export default {
  name: 'MyCustomSidebar',
  setup(props, { emit }) {
    const sidebarState = useSidebarState(
      {
        items: props.items,
        activeRoute: '/dashboard',
        initialCollapsed: false
      },
      emit
    );

    // Initialiser les sous-menus ouverts basés sur la route active
    sidebarState.initializeOpenSubmenus();

    return {
      ...sidebarState
    };
  }
};
```

#### Options

- `items` (Array, required): Configuration des éléments de navigation
- `initialCollapsed` (Boolean, default: false): État initial réduit
- `activeRoute` (String, default: ''): Chemin de route actif actuel

#### Valeurs retournées

**État:**
- `collapsed`: État réduit de la sidebar (Ref<boolean>)
- `openSubmenus`: Liste des sous-menus ouverts (Ref<string[]>)
- `navigationItems`: Éléments de navigation filtrés (ComputedRef<NavigationItem[]>)

**Méthodes:**
- `toggleCollapsed()`: Basculer l'état réduit
- `isSubmenuOpen(item)`: Vérifier si un sous-menu est ouvert
- `toggleSubmenu(item)`: Basculer l'état d'un sous-menu
- `isItemActive(item)`: Vérifier si un élément est actif
- `hasActiveChild(item)`: Vérifier si un élément a un enfant actif
- `initializeOpenSubmenus()`: Initialiser les sous-menus ouverts basés sur la route active

---

### `useFormValidation`

Gère la validation et la soumission de formulaires avec gestion d'état.

#### Exemple d'utilisation

```typescript
import { useFormValidation } from '@pyreweb/fabric';

export default {
  name: 'MyCustomForm',
  setup(props, { emit }) {
    const formState = useFormValidation(
      {
        initialData: {
          name: '',
          email: ''
        }
      },
      emit
    );

    const onSubmit = async (event) => {
      await formState.handleSubmit(event, async (data) => {
        // Validation personnalisée
        if (!data.email.includes('@')) {
          formState.setFieldError('email', 'Email invalide');
          return;
        }
        
        // Soumettre au serveur
        await api.submitForm(data);
      });
    };

    return {
      ...formState,
      onSubmit
    };
  }
};
```

#### Options

- `initialData` (Object, default: {}): Données initiales du formulaire

#### Valeurs retournées

**État:**
- `formData`: Données du formulaire (Ref<Record<string, any>>)
- `errors`: Erreurs de validation (Ref<Record<string, string>>)
- `isValid`: Le formulaire est-il valide (Ref<boolean>)
- `isSubmitting`: Le formulaire est-il en cours de soumission (Ref<boolean>)

**Méthodes:**
- `handleSubmit(event, callback?)`: Gérer la soumission du formulaire
- `setFieldValue(field, value)`: Définir la valeur d'un champ
- `setFieldError(field, error)`: Définir l'erreur d'un champ
- `clearFieldError(field)`: Effacer l'erreur d'un champ
- `clearErrors()`: Effacer toutes les erreurs
- `reset()`: Réinitialiser le formulaire à l'état initial
- `validate()`: Valider le formulaire (peut être étendu avec une logique personnalisée)

## Compatibilité

Les composables sont compatibles avec:
- Vue 2.7 (avec API de Composition)
- Vue 3.x

## Tests

Tous les composables sont testés de manière exhaustive avec 73 tests unitaires:
- `useDataTableState`: 33 tests
- `useSidebarState`: 23 tests
- `useFormValidation`: 17 tests

Pour exécuter les tests:
```bash
npm test -- src/composables
```

## Notes d'implémentation

Les composables sont des fonctions pures qui:
1. Acceptent des options et une fonction `emit` comme paramètres
2. Retournent un objet contenant l'état réactif et les méthodes
3. Utilisent l'API de Composition de Vue (`ref`, `computed`, `watch`)
4. Sont complètement typés avec TypeScript

Les composants existants de la librairie (FForm, FDataTable, FNavigationSidebar) continuent d'utiliser l'API Options pour la compatibilité avec le build toolchain.
