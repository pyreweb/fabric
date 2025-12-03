# FAccordionItem

Panneau interactif pliable/dépliable permettant d'afficher ou de masquer son contenu à la demande.

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `String` | *requis* | Titre affiché dans l'en-tête de l'accordéon |
| `defaultOpen` | `Boolean` | `false` | État initial de l'accordéon (ouvert/fermé) |

## Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `toggle` | `Boolean` | Émis lors du basculement, contient le nouvel état (ouvert/fermé) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu masquable de l'accordéon |

## Accessibilité

Le composant implémente les attributs ARIA suivants :
- `aria-expanded` : Indique si le contenu est actuellement visible
- `aria-controls` : Lie l'en-tête au contenu contrôlé
- `aria-labelledby` : Lie le contenu à l'en-tête
- `role="region"` : Identifie le contenu comme une région

## Exemple d'utilisation

```vue
<template>
  <!-- Accordéon simple -->
  <FAccordionItem title="Section 1">
    <p>Contenu de la section 1.</p>
  </FAccordionItem>

  <!-- Accordéon ouvert par défaut -->
  <FAccordionItem 
    title="Section 2" 
    :default-open="true"
  >
    <p>Contenu visible par défaut.</p>
  </FAccordionItem>

  <!-- Accordéon avec événement de toggle -->
  <FAccordionItem 
    title="Section 3"
    @toggle="handleToggle"
  >
    <p>Contenu avec événement de basculement.</p>
  </FAccordionItem>

  <!-- FAQ exemple -->
  <div class="space-y-2">
    <FAccordionItem title="Comment puis-je créer un compte ?">
      <p>Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite.</p>
    </FAccordionItem>
    <FAccordionItem title="Comment modifier mon mot de passe ?">
      <p>Accédez aux paramètres de votre compte et cliquez sur "Modifier le mot de passe".</p>
    </FAccordionItem>
  </div>
</template>

<script>
export default {
  methods: {
    handleToggle(isOpen) {
      console.log('Accordéon est maintenant:', isOpen ? 'ouvert' : 'fermé')
    }
  }
}
</script>
```
