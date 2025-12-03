# Organismes

## Définition

Les **organismes** sont des composants complexes formés par l'assemblage d'atomes et de molécules. Ils constituent le troisième niveau d'abstraction dans la méthodologie Atomic Design et représentent des sections distinctes de l'interface utilisateur.

## Caractéristiques

- **Complexité** : Les organismes combinent plusieurs molécules et/ou atomes pour créer des sections d'interface complètes.
- **Autonomie fonctionnelle** : Chaque organisme gère une fonctionnalité métier spécifique.
- **Contexte d'utilisation** : Ils sont souvent liés à un contexte métier particulier.
- **Réutilisabilité** : Bien que plus spécifiques, ils restent réutilisables dans des contextes similaires.

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| `FForm` | Formulaire complet avec gestion de la validation, soumission et affichage des erreurs |

## Relation avec les autres niveaux

Les organismes s'appuient sur les molécules et les atomes :

- **FForm** utilise `FFormField` (molécule) pour chaque champ du formulaire.
- Les organismes orchestrent le comportement et la logique métier des composants qu'ils contiennent.

## Utilisation

Les organismes sont généralement utilisés directement dans les pages ou templates de l'application pour représenter des sections fonctionnelles complètes.

L'exemple ci-dessous illustre l'utilisation de `FForm` (organisme) avec des composants des autres niveaux : `FFormField` (molécule) et `FInput`, `FButton` (atomes).

```vue
<template>
  <FForm @submit="handleSubmit" :loading="isSubmitting">
    <FFormField label="Nom" :error="errors.name">
      <FInput v-model="form.name" />
    </FFormField>
    
    <FFormField label="Email" :error="errors.email">
      <FInput v-model="form.email" type="email" />
    </FFormField>
    
    <FButton type="submit" variant="primary">
      Envoyer
    </FButton>
  </FForm>
</template>
```

## Bonnes pratiques

- Les organismes doivent encapsuler une logique métier cohérente et complète.
- Évitez de créer des organismes trop génériques ; ils doivent répondre à un besoin fonctionnel précis.
- Documentez clairement les props, événements et slots disponibles.
- Testez les organismes de manière intégrée pour valider le bon fonctionnement de l'ensemble.

## Évolution

Lorsqu'une combinaison de molécules et d'atomes est utilisée de manière récurrente dans l'application, envisagez de la transformer en organisme pour favoriser la réutilisabilité et la maintenabilité du code.
