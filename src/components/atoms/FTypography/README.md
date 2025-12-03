# FTypography

Éléments typographiques pour titres et textes.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `String` | `'body'` | Style : `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body`, `caption`, `overline` |
| `tag` | `String` | `null` | Balise HTML personnalisée (surcharge le défaut) |
| `truncate` | `Boolean` | `false` | Tronque le texte avec ellipsis |

## Exemple d'utilisation

```vue
<template>
  <!-- Titres -->
  <FTypography variant="h1">Titre principal</FTypography>
  <FTypography variant="h2">Sous-titre</FTypography>

  <!-- Texte de corps -->
  <FTypography variant="body">
    Paragraphe de texte standard avec un style lisible et agréable.
  </FTypography>

  <!-- Caption et overline -->
  <FTypography variant="caption">Texte secondaire</FTypography>
  <FTypography variant="overline">CATÉGORIE</FTypography>

  <!-- Texte tronqué -->
  <FTypography variant="body" :truncate="true">
    Ce texte très long sera automatiquement tronqué...
  </FTypography>

  <!-- Balise personnalisée -->
  <FTypography variant="h1" tag="div">Titre dans une div</FTypography>
</template>
```
