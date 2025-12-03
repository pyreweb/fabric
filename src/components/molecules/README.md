# Molécules

## Définition

Les **molécules** sont des groupes d'atomes liés ensemble pour former des composants fonctionnels plus élaborés. Elles représentent le deuxième niveau d'abstraction dans la méthodologie Atomic Design.

## Caractéristiques

- **Composition** : Les molécules combinent plusieurs atomes pour créer une unité fonctionnelle cohérente.
- **Fonctionnalité ciblée** : Chaque molécule remplit un objectif précis dans l'interface.
- **Réutilisabilité** : Peuvent être réutilisées dans différents contextes et organismes.
- **Cohérence** : Assurent une expérience utilisateur uniforme à travers l'application.

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| `FAlert` | Messages d'alerte avec icône, texte et actions (succès, erreur, avertissement, info) |
| `FCard` | Conteneurs de contenu avec en-tête, corps et pied de page optionnels |
| `FFormField` | Champs de formulaire complets avec label, input, message d'erreur et indication |

## Relation avec les atomes

Les molécules sont construites à partir d'atomes. Par exemple :

- **FAlert** utilise `FIcon` pour l'icône et `FButton` pour les actions.
- **FFormField** combine `FInput` (ou autre champ) avec `FTypography` pour le label et les messages.
- **FCard** peut contenir n'importe quel atome dans ses slots.

## Utilisation

Les molécules sont conçues pour être utilisées directement dans les templates ou combinées pour former des organismes plus complexes.

```vue
<template>
  <FFormField
    label="Adresse email"
    hint="Nous ne partagerons jamais votre email"
    :error="emailError"
  >
    <FInput v-model="email" type="email" placeholder="exemple@domaine.fr" />
  </FFormField>
</template>
```

## Bonnes pratiques

- Privilégiez l'utilisation des molécules existantes plutôt que de recréer des combinaisons d'atomes.
- Si vous créez une nouvelle molécule, assurez-vous qu'elle répond à un besoin récurrent.
- Documentez les props et événements de chaque molécule pour faciliter leur utilisation.
