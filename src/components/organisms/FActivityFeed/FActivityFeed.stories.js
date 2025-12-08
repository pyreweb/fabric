import FActivityFeed from './FActivityFeed.vue';

export default {
	title: 'Organisms/FActivityFeed',
	component: FActivityFeed,
	tags: ['autodocs'],
	argTypes: {
		events: {
			control: 'object',
			description: 'Liste des événements'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement'
		},
		loadingNew: {
			control: 'boolean',
			description: 'Chargement de nouveaux événements'
		},
		hasMore: {
			control: 'boolean',
			description: "Plus d'événements disponibles"
		},
		clickable: {
			control: 'boolean',
			description: 'Événements cliquables'
		},
		showTimeline: {
			control: 'boolean',
			description: 'Afficher la timeline'
		},
		truncateContent: {
			control: 'boolean',
			description: 'Tronquer le contenu'
		}
	}
};

const sampleEvents = [
	{
		id: 1,
		type: 'create',
		title: 'Nouveau projet créé',
		description: 'Le projet "Application Mobile" a été créé.',
		actor: 'Jean Dupont',
		timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
	},
	{
		id: 2,
		type: 'comment',
		title: 'Nouveau commentaire',
		description: 'Un commentaire a été ajouté sur la tâche #42.',
		actor: 'Marie Martin',
		timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
	},
	{
		id: 3,
		type: 'update',
		title: 'Document mis à jour',
		description: 'Le fichier "Spécifications.pdf" a été modifié.',
		actor: 'Pierre Durand',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
	},
	{
		id: 4,
		type: 'status',
		title: 'Statut changé',
		description: 'La tâche "Design homepage" est passée à "En cours".',
		actor: 'Sophie Petit',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
	},
	{
		id: 5,
		type: 'delete',
		title: 'Élément supprimé',
		description: 'Le fichier temporaire a été supprimé.',
		actor: 'Admin',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
	}
];

const Template = (args, { argTypes }) => ({
	components: { FActivityFeed },
	props: Object.keys(argTypes),
	template: '<FActivityFeed v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	events: sampleEvents
};

export const WithTimeline = Template.bind({});
WithTimeline.args = {
	events: sampleEvents,
	showTimeline: true
};

export const Clickable = Template.bind({});
Clickable.args = {
	events: sampleEvents,
	clickable: true
};

export const Loading = Template.bind({});
Loading.args = {
	events: sampleEvents,
	loading: true
};

export const LoadingNew = Template.bind({});
LoadingNew.args = {
	events: sampleEvents,
	loadingNew: true
};

export const WithLoadMore = Template.bind({});
WithLoadMore.args = {
	events: sampleEvents,
	hasMore: true
};

export const Empty = Template.bind({});
Empty.args = {
	events: []
};

export const CustomEmptyState = Template.bind({});
CustomEmptyState.args = {
	events: [],
	emptyTitle: 'Aucune activité récente',
	emptyDescription: "Il n'y a eu aucune activité dans les dernières 24 heures.",
	emptyActionLabel: 'Rafraîchir'
};

export const Interactive = () => ({
	components: { FActivityFeed },
	data() {
		return {
			events: sampleEvents,
			loading: false
		};
	},
	methods: {
		handleEventClick(event) {
			alert(`Événement cliqué: ${event.title}`);
		},
		handleLoadMore() {
			this.loading = true;
			setTimeout(() => {
				this.events = [
					...this.events,
					{
						id: Date.now(),
						type: 'create',
						title: 'Nouvel événement chargé',
						description: "Cet événement vient d'être chargé.",
						actor: 'Système',
						timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
					}
				];
				this.loading = false;
			}, 1000);
		}
	},
	template: `
		<FActivityFeed
			:events="events"
			:loading="loading"
			:hasMore="true"
			clickable
			showTimeline
			@event-click="handleEventClick"
			@load-more="handleLoadMore"
		/>
	`
});

export const VirtualizedLargeDataset = () => ({
	components: { FActivityFeed },
	data() {
		return {
			events: Array.from({ length: 5000 }, (_, i) => ({
				id: i + 1,
				type: ['create', 'comment', 'update', 'status', 'delete'][i % 5],
				title: `Événement ${i + 1}`,
				description: `Description de l'événement numéro ${
					i + 1
				}. Ceci est un événement de test généré automatiquement.`,
				actor: `Utilisateur ${(i % 10) + 1}`,
				timestamp: new Date(Date.now() - i * 60 * 1000).toISOString()
			}))
		};
	},
	template: `
		<div>
			<p class="text-sm text-neutral-600 mb-4">
				Ce fil d'activité utilise la virtualisation pour afficher 5 000 événements de manière fluide.
				Seuls les éléments visibles sont rendus dans le DOM, ce qui améliore drastiquement les performances.
			</p>
			<FActivityFeed
				:events="events"
				virtual
				showTimeline
				clickable
			/>
		</div>
	`
});
VirtualizedLargeDataset.parameters = {
	docs: {
		description: {
			story:
				"La virtualisation permet d'afficher des milliers d'événements sans ralentissement. Le fil d'activité ne rend que les événements visibles à l'écran, ce qui réduit la charge du DOM et améliore les performances de défilement."
		}
	}
};
