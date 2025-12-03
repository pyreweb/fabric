# FStatCard

Cartes compactes pour l'affichage d'indicateurs clés de performance (KPI) et de statistiques simples.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `icon` | `String` | `'info'` | Nom de l'icône à afficher |
| `label` | `String` | **requis** | Label de la métrique (ex: "Utilisateurs") |
| `value` | `String \| Number` | **requis** | Valeur numérique à afficher (ex: "1,234") |
| `variant` | `String` | `'primary'` | Couleur sémantique : `primary`, `success`, `danger`, `info` |
| `layout` | `String` | `'horizontal'` | Disposition : `horizontal` (icône à gauche), `vertical` (icône au-dessus) |
| `bordered` | `Boolean` | `true` | Affiche une bordure autour de la carte |

## Exemple d'utilisation

```vue
<template>
  <!-- Statistique simple avec icône utilisateur -->
  <FStatCard 
    icon="user" 
    label="Utilisateurs" 
    value="1,234"
  />

  <!-- Statistique avec couleur de succès -->
  <FStatCard 
    icon="success" 
    label="Revenus" 
    value="45,678 €"
    variant="success"
  />

  <!-- Statistique avec couleur de danger -->
  <FStatCard 
    icon="warning" 
    label="Alertes" 
    value="12"
    variant="danger"
  />

  <!-- Statistique avec couleur info -->
  <FStatCard 
    icon="mail" 
    label="Messages" 
    value="89"
    variant="info"
  />

  <!-- Statistique avec layout vertical -->
  <FStatCard 
    icon="heart" 
    label="Favoris" 
    value="567"
    layout="vertical"
  />

  <!-- Statistique sans bordure -->
  <FStatCard 
    icon="eye" 
    label="Vues" 
    value="10,543"
    :bordered="false"
  />

  <!-- Dashboard avec plusieurs statistiques -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <FStatCard icon="user" label="Utilisateurs" value="1,234" variant="primary" />
    <FStatCard icon="success" label="Commandes" value="567" variant="success" />
    <FStatCard icon="warning" label="En attente" value="23" variant="danger" />
    <FStatCard icon="mail" label="Messages" value="89" variant="info" />
  </div>
</template>
```
