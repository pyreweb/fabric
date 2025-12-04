# FActivityFeed

Composant de fil d'activité (journal des événements) pour afficher une chronologie ordonnée des événements récents. Ce composant orchestre plusieurs sous-composants : `FListItem`, `FIcon`, `FBadge`, `FTypography`, `FLoader`, et `FEmptyState`.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `events` | `Array` | `[]` | Tableau d'objets événements. Chaque événement : `{ id, type, title, timestamp, description?, actor?, metadata? }` |
| `eventKey` | `String` | `'id'` | Propriété unique pour identifier chaque événement |
| `eventTypes` | `Object` | voir ci-dessous | Configuration des types d'événements : `{ [type]: { icon, variant, label } }` |
| `loading` | `Boolean` | `false` | État de chargement des événements plus anciens |
| `loadingNew` | `Boolean` | `false` | État de chargement des nouveaux événements (pull-to-refresh) |
| `hasMore` | `Boolean` | `false` | Indique s'il y a plus d'événements à charger |
| `infiniteScroll` | `Boolean` | `false` | Active le scroll infini pour charger plus d'événements |
| `infiniteScrollThreshold` | `Number` | `100` | Distance en pixels du bas pour déclencher le chargement |
| `clickable` | `Boolean` | `false` | Rend les événements cliquables |
| `showTimeline` | `Boolean` | `true` | Affiche l'indicateur de timeline à gauche |
| `truncateContent` | `Boolean` | `false` | Tronque le contenu long |
| `iconSize` | `String` | `'md'` | Taille des icônes : `xs`, `sm`, `md`, `lg` |
| `formatTimestamp` | `Function` | formatage relatif | Fonction pour formater les horodatages |
| `emptyIcon` | `String` | `'bell'` | Icône de l'état vide |
| `emptyTitle` | `String` | `'Aucune activité'` | Titre de l'état vide |
| `emptyDescription` | `String` | `'Il n\'y a aucun événement...'` | Description de l'état vide |
| `emptyActionLabel` | `String` | `''` | Label du bouton d'action de l'état vide |
| `loadMoreLabel` | `String` | `'Charger plus d\'événements'` | Label du bouton charger plus |
| `loadingLabel` | `String` | `'Chargement en cours'` | Label pour l'accessibilité du loader |

### Configuration par défaut des types d'événements

```javascript
{
  comment: { icon: 'mail', variant: 'primary', label: 'Commentaire' },
  status: { icon: 'info', variant: 'warning', label: 'Statut' },
  create: { icon: 'plus', variant: 'success', label: 'Création' },
  update: { icon: 'edit', variant: 'neutral', label: 'Modification' },
  delete: { icon: 'trash', variant: 'error', label: 'Suppression' },
  default: { icon: 'bell', variant: 'neutral', label: 'Événement' }
}
```

## Événements

| Événement | Description |
|-----------|-------------|
| `event-click` | Émis lors du clic sur un événement (reçoit l'objet événement) |
| `load-more` | Émis pour charger plus d'événements anciens |
| `empty-action` | Émis lors du clic sur le bouton d'action de l'état vide |

## Slots

| Slot | Description |
|------|-------------|
| `event-{type}` | Rendu personnalisé pour un type d'événement spécifique (reçoit `{ event, index }`) |
| `event-content` | Contenu personnalisé pour tous les événements (reçoit `{ event }`) |
| `event-actions` | Actions personnalisées à droite de chaque événement (reçoit `{ event }`) |

## Exemple d'utilisation

```vue
<template>
  <!-- Fil d'activité simple -->
  <FActivityFeed
    :events="activities"
    :loading="isLoading"
    :has-more="hasMoreEvents"
    @load-more="loadMoreActivities"
  />

  <!-- Fil d'activité avec scroll infini et événements cliquables -->
  <FActivityFeed
    :events="activities"
    :loading="isLoading"
    :has-more="hasMoreEvents"
    infinite-scroll
    clickable
    @event-click="handleEventClick"
    @load-more="loadMoreActivities"
  />

  <!-- Fil d'activité avec types personnalisés -->
  <FActivityFeed
    :events="activities"
    :event-types="customEventTypes"
    :loading="isLoading"
    :has-more="hasMoreEvents"
    @load-more="loadMoreActivities"
  >
    <!-- Rendu personnalisé pour les événements de type 'comment' -->
    <template #event-comment="{ event }">
      <div class="p-4 bg-blue-50 rounded-lg">
        <p class="font-medium">{{ event.actor }} a commenté :</p>
        <blockquote class="mt-2 pl-4 border-l-4 border-blue-300">
          {{ event.description }}
        </blockquote>
      </div>
    </template>
  </FActivityFeed>

  <!-- Fil d'activité avec actions -->
  <FActivityFeed
    :events="activities"
    :loading="isLoading"
    :has-more="hasMoreEvents"
    @load-more="loadMoreActivities"
  >
    <template #event-actions="{ event }">
      <FButton variant="ghost" size="small" @click="viewDetails(event)">
        Voir
      </FButton>
    </template>
  </FActivityFeed>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          id: 1,
          type: 'comment',
          title: 'Nouveau commentaire sur le projet Alpha',
          description: 'Super travail sur cette fonctionnalité !',
          actor: 'Marie Martin',
          timestamp: new Date(Date.now() - 5 * 60 * 1000) // Il y a 5 minutes
        },
        {
          id: 2,
          type: 'status',
          title: 'Statut du projet modifié',
          description: 'Le projet est passé de "En cours" à "En revue"',
          actor: 'Jean Dupont',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // Il y a 2 heures
        },
        {
          id: 3,
          type: 'create',
          title: 'Nouvelle tâche créée',
          description: 'Implémenter le fil d\'activité',
          actor: 'Pierre Durant',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // Il y a 1 jour
        }
      ],
      customEventTypes: {
        comment: { icon: 'mail', variant: 'primary', label: 'Commentaire' },
        status: { icon: 'refresh', variant: 'warning', label: 'Mise à jour' },
        create: { icon: 'plus', variant: 'success', label: 'Nouveau' }
      },
      isLoading: false,
      hasMoreEvents: true,
      page: 1
    }
  },
  methods: {
    async loadMoreActivities() {
      this.isLoading = true
      try {
        // Appel API pour charger plus d'événements
        // const newEvents = await api.getActivities({ page: ++this.page })
        // this.activities.push(...newEvents)
        // this.hasMoreEvents = newEvents.length > 0
      } finally {
        this.isLoading = false
      }
    },
    handleEventClick(event) {
      console.log('Événement cliqué:', event)
    },
    viewDetails(event) {
      console.log('Voir détails:', event)
    }
  }
}
</script>
```

## Fonctionnalités

### Ordre chronologique
Les événements sont automatiquement triés par ordre chronologique décroissant (du plus récent au plus ancien).

### Types d'événements personnalisables
Chaque type d'événement peut avoir sa propre icône, couleur (variant) et label de badge. Utilisez la prop `eventTypes` pour personnaliser ou ajouter des types.

### Rendu personnalisé par type
Utilisez les slots nommés `event-{type}` pour personnaliser complètement le rendu d'un type d'événement spécifique.

### Pagination / Scroll infini
- **Mode bouton** : Par défaut, un bouton "Charger plus" apparaît si `hasMore` est `true`
- **Mode scroll infini** : Activez `infiniteScroll` pour charger automatiquement quand l'utilisateur atteint le bas de la liste

### Horodatage relatif
Par défaut, les horodatages sont formatés de manière relative ("Il y a 5 min", "Il y a 2h", etc.). Personnalisez avec la prop `formatTimestamp`.

### Timeline visuelle
La prop `showTimeline` (activée par défaut) affiche un indicateur visuel de timeline avec des points colorés et une ligne connectrice.

### État vide
L'état vide est automatiquement affiché lorsqu'il n'y a aucun événement. Personnalisez-le avec `emptyIcon`, `emptyTitle`, `emptyDescription` et `emptyActionLabel`.
