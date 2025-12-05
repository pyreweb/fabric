FButton est un composant de bouton flexible et accessible qui prend en charge plusieurs variantes, tailles et états.

## Import

```typescript
import { FButton } from '@pyreweb/fabric';
```

## Utilisation

```vue
<FButton variant="primary" @click="doSomething">
  Cliquez-moi
</FButton>
```

## Props

| Nom      | Type                                                                     | Défaut      | Description                                          |
| :------- | :----------------------------------------------------------------------- | :---------- | :--------------------------------------------------- |
| variant  | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'link'` | `'primary'` | Le style visuel du bouton.                           |
| size     | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`      | La taille du bouton.                                 |
| type     | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  | Le type HTML du bouton.                              |
| disabled | `boolean`                                                                | `false`     | Si vrai, le bouton est désactivé et non cliquable.   |
| loading  | `boolean`                                                                | `false`     | Si vrai, affiche un loader et désactive le clic.     |
| block    | `boolean`                                                                | `false`     | Si vrai, le bouton prend toute la largeur disponible.|
| rounded  | `boolean`                                                                | `false`     | Si vrai, applique des bords entièrement arrondis.    |

## Slots

| Nom     | Description                                     |
| :------ | :---------------------------------------------- |
| default | Le contenu principal du bouton (texte).         |
| prefix  | Contenu placé avant le texte (ex: icône).       |
| suffix  | Contenu placé après le texte (ex: icône).       |

## Events

| Nom   | Arguments    | Description                                       |
| :---- | :----------- | :------------------------------------------------ |
| click | `MouseEvent` | Émis lorsque le bouton est cliqué (si non désactivé). |
"""