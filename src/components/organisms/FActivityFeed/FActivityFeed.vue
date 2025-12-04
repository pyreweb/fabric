<template>
	<div :class="containerClasses" role="feed" aria-label="Fil d'activité">
		<!-- Loading state at the top for new events -->
		<div v-if="loadingNew" :class="loadingNewClasses">
			<f-loader size="sm" label="Chargement des nouveaux événements" />
		</div>

		<!-- Events list -->
		<div v-if="sortedEvents.length > 0" :class="listClasses">
			<div
				v-for="(event, index) in sortedEvents"
				:key="getEventKey(event, index)"
				:class="eventContainerClasses"
			>
				<!-- Timeline indicator -->
				<div v-if="showTimeline" :class="timelineClasses">
					<div :class="timelineDotClasses(event)">
						<f-icon
							v-if="getEventIcon(event)"
							:name="getEventIcon(event)"
							size="xs"
							:class="timelineIconClasses"
						/>
					</div>
					<div
						v-if="index < sortedEvents.length - 1"
						:class="timelineLineClasses"
					/>
				</div>

				<!-- Event content -->
				<div :class="eventContentClasses">
					<!-- Custom render slot for the event type -->
					<slot :name="'event-' + event.type" :event="event" :index="index">
						<!-- Default event rendering using FListItem -->
						<f-list-item
							:title="getEventTitle(event)"
							:subtitle="getEventSubtitle(event)"
							:clickable="clickable"
							:truncate="truncateContent"
							@click="handleEventClick(event)"
						>
							<template #left>
								<div :class="eventIconContainerClasses(event)">
									<f-icon :name="getEventIcon(event)" :size="iconSize" />
								</div>
							</template>

							<template #content>
								<slot name="event-content" :event="event">
									<div :class="eventBodyClasses">
										<!-- Event description -->
										<f-typography
											v-if="event.description"
											variant="body"
											:class="descriptionClasses"
										>
											{{ event.description }}
										</f-typography>

										<!-- Event metadata: badge and timestamp -->
										<div :class="metadataClasses">
											<f-badge
												v-if="getEventBadge(event)"
												:variant="getEventBadge(event).variant || 'neutral'"
												:content="getEventBadge(event).label"
												size="sm"
											/>
											<f-typography variant="caption" :class="timestampClasses">
												<f-icon name="clock" size="xs" class="mr-1" />
												{{ formatTimestamp(event.timestamp) }}
											</f-typography>
										</div>
									</div>
								</slot>
							</template>

							<template #right>
								<slot name="event-actions" :event="event" />
							</template>
						</f-list-item>
					</slot>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<f-empty-state
			v-else-if="!loading"
			:icon="emptyIcon"
			:title="emptyTitle"
			:description="emptyDescription"
			:action-label="emptyActionLabel"
			@action="$emit('empty-action')"
		/>

		<!-- Load more button / infinite scroll trigger -->
		<div
			v-if="sortedEvents.length > 0 && hasMore"
			ref="loadMoreTrigger"
			:class="loadMoreClasses"
		>
			<f-loader v-if="loading" size="md" :label="loadingLabel" />
			<button
				v-else-if="!infiniteScroll"
				type="button"
				:class="loadMoreButtonClasses"
				@click="handleLoadMore"
			>
				{{ loadMoreLabel }}
			</button>
		</div>
	</div>
</template>

<script>
import FListItem from '../../molecules/FListItem/FListItem.vue';
import FEmptyState from '../../molecules/FEmptyState/FEmptyState.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FBadge from '../../atoms/FBadge/FBadge.vue';
import FLoader from '../../atoms/FLoader/FLoader.vue';

export default {
	name: 'FActivityFeed',
	components: {
		FListItem,
		FEmptyState,
		FTypography,
		FIcon,
		FBadge,
		FLoader
	},
	props: {
		/**
		 * Array of event objects to display.
		 * Each event should have: { id, type, title, timestamp, description?, actor?, metadata? }
		 */
		events: {
			type: Array,
			default: () => []
		},
		/**
		 * Unique key property in event objects
		 */
		eventKey: {
			type: String,
			default: 'id'
		},
		/**
		 * Event type configurations for customizing icons and badges.
		 * Object format: { [type]: { icon: string, variant: string, label: string } }
		 */
		eventTypes: {
			type: Object,
			default: () => ({
				comment: { icon: 'mail', variant: 'primary', label: 'Commentaire' },
				status: { icon: 'info', variant: 'warning', label: 'Statut' },
				create: { icon: 'plus', variant: 'success', label: 'Création' },
				update: { icon: 'edit', variant: 'neutral', label: 'Modification' },
				delete: { icon: 'trash', variant: 'error', label: 'Suppression' },
				default: { icon: 'bell', variant: 'neutral', label: 'Événement' }
			})
		},
		/**
		 * Whether the events list is currently loading
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether new events are being loaded (for pull-to-refresh or new event polling)
		 */
		loadingNew: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether there are more events to load
		 */
		hasMore: {
			type: Boolean,
			default: false
		},
		/**
		 * Enable infinite scroll to load more events
		 */
		infiniteScroll: {
			type: Boolean,
			default: false
		},
		/**
		 * Threshold in pixels from the bottom to trigger load more
		 */
		infiniteScrollThreshold: {
			type: Number,
			default: 100
		},
		/**
		 * Whether events are clickable
		 */
		clickable: {
			type: Boolean,
			default: false
		},
		/**
		 * Show timeline indicator on the left
		 */
		showTimeline: {
			type: Boolean,
			default: true
		},
		/**
		 * Truncate long content
		 */
		truncateContent: {
			type: Boolean,
			default: false
		},
		/**
		 * Icon size for event icons
		 */
		iconSize: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
		},
		/**
		 * Date/time format function for timestamps
		 */
		formatTimestamp: {
			type: Function,
			default: (timestamp) => {
				if (!timestamp) return '';
				const date = new Date(timestamp);
				if (isNaN(date.getTime())) return String(timestamp);

				const now = new Date();
				const diff = now - date;
				const seconds = Math.floor(diff / 1000);
				const minutes = Math.floor(seconds / 60);
				const hours = Math.floor(minutes / 60);
				const days = Math.floor(hours / 24);

				if (seconds < 60) return "À l'instant";
				if (minutes < 60) return `Il y a ${minutes} min`;
				if (hours < 24) return `Il y a ${hours}h`;
				if (days < 7) return `Il y a ${days}j`;

				return date.toLocaleDateString('fr-FR', {
					day: 'numeric',
					month: 'short',
					year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
				});
			}
		},
		/**
		 * Empty state icon
		 */
		emptyIcon: {
			type: String,
			default: 'bell'
		},
		/**
		 * Empty state title
		 */
		emptyTitle: {
			type: String,
			default: 'Aucune activité'
		},
		/**
		 * Empty state description
		 */
		emptyDescription: {
			type: String,
			default: "Il n'y a aucun événement à afficher pour le moment."
		},
		/**
		 * Empty state action button label
		 */
		emptyActionLabel: {
			type: String,
			default: ''
		},
		/**
		 * Load more button label
		 */
		loadMoreLabel: {
			type: String,
			default: "Charger plus d'événements"
		},
		/**
		 * Loading label for accessibility
		 */
		loadingLabel: {
			type: String,
			default: 'Chargement en cours'
		}
	},
	data() {
		return {
			observer: null
		};
	},
	computed: {
		/**
		 * Sort events in descending chronological order (most recent first)
		 */
		sortedEvents() {
			return [...this.events].sort((a, b) => {
				const dateA = new Date(a.timestamp);
				const dateB = new Date(b.timestamp);
				return dateB - dateA;
			});
		},
		containerClasses() {
			return 'flex flex-col bg-white rounded-lg';
		},
		listClasses() {
			return 'flex flex-col';
		},
		eventContainerClasses() {
			return 'flex gap-3 relative';
		},
		eventContentClasses() {
			return 'flex-1 min-w-0';
		},
		eventBodyClasses() {
			return 'flex flex-col gap-2 mt-1';
		},
		descriptionClasses() {
			return 'text-gray-600 text-sm';
		},
		metadataClasses() {
			return 'flex items-center gap-2 flex-wrap';
		},
		timestampClasses() {
			return 'flex items-center text-gray-400';
		},
		timelineClasses() {
			return 'flex flex-col items-center flex-shrink-0 w-8';
		},
		timelineIconClasses() {
			return 'text-white';
		},
		timelineLineClasses() {
			return 'flex-1 w-0.5 bg-gray-200 min-h-[24px]';
		},
		loadMoreClasses() {
			return 'flex items-center justify-center py-4';
		},
		loadMoreButtonClasses() {
			return 'px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20';
		},
		loadingNewClasses() {
			return 'flex items-center justify-center py-3 border-b border-gray-100';
		}
	},
	watch: {
		infiniteScroll: {
			handler(newVal) {
				if (newVal) {
					this.$nextTick(() => this.setupIntersectionObserver());
				} else {
					this.destroyIntersectionObserver();
				}
			},
			immediate: true
		}
	},
	mounted() {
		if (this.infiniteScroll) {
			this.setupIntersectionObserver();
		}
	},
	beforeDestroy() {
		this.destroyIntersectionObserver();
	},
	methods: {
		getEventKey(event, index) {
			return event[this.eventKey] ?? index;
		},
		getEventConfig(event) {
			return this.eventTypes[event.type] || this.eventTypes.default || {};
		},
		getEventIcon(event) {
			if (event.icon) return event.icon;
			return this.getEventConfig(event).icon || 'bell';
		},
		getEventTitle(event) {
			return event.title || '';
		},
		getEventSubtitle(event) {
			if (event.actor) {
				return `par ${event.actor}`;
			}
			return '';
		},
		getEventBadge(event) {
			const config = this.getEventConfig(event);
			if (event.badge) return event.badge;
			if (config.label) {
				return { variant: config.variant || 'neutral', label: config.label };
			}
			return null;
		},
		timelineDotClasses(event) {
			const config = this.getEventConfig(event);
			const variantClasses = {
				primary: 'bg-blue-500',
				success: 'bg-green-500',
				warning: 'bg-yellow-500',
				error: 'bg-red-500',
				neutral: 'bg-gray-400'
			};
			const bgClass = variantClasses[config.variant] || variantClasses.neutral;
			return `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`;
		},
		eventIconContainerClasses(event) {
			const config = this.getEventConfig(event);
			const variantClasses = {
				primary: 'bg-blue-100 text-blue-600',
				success: 'bg-green-100 text-green-600',
				warning: 'bg-yellow-100 text-yellow-600',
				error: 'bg-red-100 text-red-600',
				neutral: 'bg-gray-100 text-gray-600'
			};
			const colorClass =
				variantClasses[config.variant] || variantClasses.neutral;
			return `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`;
		},
		handleEventClick(event) {
			if (this.clickable) {
				this.$emit('event-click', event);
			}
		},
		handleLoadMore() {
			this.$emit('load-more');
		},
		setupIntersectionObserver() {
			if (!('IntersectionObserver' in window)) {
				return;
			}

			this.$nextTick(() => {
				const trigger = this.$refs.loadMoreTrigger;
				if (!trigger) return;

				this.observer = new IntersectionObserver(
					(entries) => {
						const entry = entries[0];
						if (entry.isIntersecting && this.hasMore && !this.loading) {
							this.$emit('load-more');
						}
					},
					{
						rootMargin: `${this.infiniteScrollThreshold}px`
					}
				);

				this.observer.observe(trigger);
			});
		},
		destroyIntersectionObserver() {
			if (this.observer) {
				this.observer.disconnect();
				this.observer = null;
			}
		}
	}
};
</script>
