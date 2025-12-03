# Molécules

## Définition

Les **molécules** sont des groupes d'atomes liés ensemble pour former des composants fonctionnels plus élaborés. Elles représentent le deuxième niveau d'abstraction dans la méthodologie Atomic Design.

## Caractéristiques

- **Composition** : Les molécules combinent plusieurs atomes pour créer une unité fonctionnelle cohérente.
- **Fonctionnalité ciblée** : Chaque molécule remplit un objectif précis dans l'interface.
- **Réutilisabilité** : Peuvent être réutilisées dans différents contextes et organismes.
- **Cohérence** : Assurent une expérience utilisateur uniforme à travers l'application.

## Relation avec les atomes

Les molécules sont construites à partir d'atomes. Par exemple :

- **FAlert** utilise `FIcon` pour l'icône et `FButton` pour les actions.
- **FBreadcrumb** utilise `FTypography` pour le texte et `FIcon` pour les séparateurs.
- **FButtonGroup** regroupe plusieurs `FButton` pour créer des barres d'outils ou des sélecteurs.
- **FEmptyState** combine `FIcon`, `FTypography` et `FButton` pour afficher les états vides.
- **FFormField** combine `FInput` avec un label et des messages.
- **FCard** utilise `FTypography` pour le titre et le sous-titre.
- **FSearchBar** combine `FInput`, `FIcon` et `FButton` pour créer une barre de recherche fonctionnelle.
- **FListItem** utilise `FTypography` pour le texte et des slots pour intégrer d'autres atomes.

---

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| [FAlert](./FAlert/README.md) | Messages d'alerte avec icône, texte et bouton de fermeture optionnel. |
| [FBreadcrumb](./FBreadcrumb/README.md) | Composant de navigation hiérarchique (fil d'Ariane). |
| [FButtonGroup](./FButtonGroup/README.md) | Groupe de boutons adjacents pour barres d'outils ou sélecteurs toggle. |
| [FCard](./FCard/README.md) | Conteneurs de contenu avec en-tête, corps, zone média et actions. |
| [FEmptyState](./FEmptyState/README.md) | Composant visuel pour les états vides avec icône, message et action. |
| [FFormField](./FFormField/README.md) | Champs de formulaire complets avec label, input, message d'erreur et indication. |
| [FListItem](./FListItem/README.md) | Composant de ligne standardisé pour l'affichage riche d'entités. |
| [FPagination](./FPagination/README.md) | Composant de navigation permettant le découpage de données en pages. |
| [FSearchBar](./FSearchBar/README.md) | Barre de recherche avec icône et bouton optionnel. |

---

## Bonnes pratiques

- Privilégiez l'utilisation des molécules existantes plutôt que de recréer des combinaisons d'atomes.
- Si vous créez une nouvelle molécule, assurez-vous qu'elle répond à un besoin récurrent.
- Documentez les props et événements de chaque molécule pour faciliter leur utilisation.
- Utilisez les slots pour personnaliser le contenu tout en conservant la structure et le comportement de la molécule.
