<template>
	<header :class="headerClasses">
		<!-- Breadcrumb section -->
		<div v-if="showBreadcrumb" class="mb-4">
			<f-breadcrumb
				:items="breadcrumbItems"
				:separator-icon="breadcrumbSeparatorIcon"
				:aria-label="breadcrumbAriaLabel"
				@navigate="handleBreadcrumbNavigate"
			/>
		</div>

		<!-- Main header content -->
		<div :class="contentClasses">
			<!-- Left section: Avatar + Title -->
			<div :class="titleSectionClasses">
				<!-- Avatar (optional) -->
				<f-avatar
					v-if="showAvatar"
					:src="avatarSrc"
					:alt="avatarAlt"
					:initials="avatarInitials"
					:name="avatarName"
					:size="avatarSize"
					:shape="avatarShape"
					:status="avatarStatus"
					class="flex-shrink-0"
				/>

				<!-- Title and subtitle -->
				<div class="flex-1 min-w-0">
					<f-typography :variant="titleVariant" :truncate="truncateTitle">
						<slot name="title">{{ title }}</slot>
					</f-typography>
					<f-typography
						v-if="subtitle || $slots.subtitle"
						variant="body"
						tag="p"
						class="text-neutral-500 mt-1"
					>
						<slot name="subtitle">{{ subtitle }}</slot>
					</f-typography>
				</div>
			</div>

			<!-- Right section: Actions -->
			<div v-if="$slots.actions" :class="actionsClasses">
				<slot name="actions" />
			</div>
		</div>
	</header>
</template>

<script>
import FBreadcrumb from '../../molecules/FBreadcrumb/FBreadcrumb.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FAvatar from '../../atoms/FAvatar/FAvatar.vue';

export default {
	name: 'FPageHeader',
	components: {
		FBreadcrumb,
		FTypography,
		FAvatar
	},
	props: {
		/**
		 * Page title
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Page subtitle (optional description under the title)
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Title typography variant
		 */
		titleVariant: {
			type: String,
			default: 'h1',
			validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
		},
		/**
		 * Truncate title if it overflows
		 */
		truncateTitle: {
			type: Boolean,
			default: false
		},
		/**
		 * Breadcrumb items array
		 * Each item: { label: string, href?: string, icon?: string }
		 */
		breadcrumbItems: {
			type: Array,
			default: () => []
		},
		/**
		 * Breadcrumb separator icon
		 */
		breadcrumbSeparatorIcon: {
			type: String,
			default: 'chevron-right'
		},
		/**
		 * Breadcrumb ARIA label
		 */
		breadcrumbAriaLabel: {
			type: String,
			default: "Fil d'Ariane"
		},
		/**
		 * Avatar image source URL
		 */
		avatarSrc: {
			type: String,
			default: ''
		},
		/**
		 * Avatar alt text
		 */
		avatarAlt: {
			type: String,
			default: ''
		},
		/**
		 * Avatar initials (used when no image)
		 */
		avatarInitials: {
			type: String,
			default: ''
		},
		/**
		 * Avatar name (used to compute initials if no initials provided)
		 */
		avatarName: {
			type: String,
			default: ''
		},
		/**
		 * Avatar size
		 */
		avatarSize: {
			type: String,
			default: 'lg',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Avatar shape
		 */
		avatarShape: {
			type: String,
			default: 'circle',
			validator: (value) => ['circle', 'square'].includes(value)
		},
		/**
		 * Avatar status indicator
		 */
		avatarStatus: {
			type: String,
			default: null,
			validator: (value) =>
				[null, 'online', 'busy', 'away', 'offline'].includes(value)
		},
		/**
		 * Visual separator below the header
		 */
		separator: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		/**
		 * Check if breadcrumb should be displayed
		 */
		showBreadcrumb() {
			return this.breadcrumbItems && this.breadcrumbItems.length > 0;
		},
		/**
		 * Check if avatar should be displayed
		 */
		showAvatar() {
			return this.avatarSrc || this.avatarInitials || this.avatarName;
		},
		/**
		 * Main header container classes
		 */
		headerClasses() {
			const baseClasses = 'w-full';
			const paddingClasses = 'pb-4';
			const separatorClasses = this.separator ? 'border-b border-neutral-200' : '';

			return [baseClasses, paddingClasses, separatorClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Content section classes (title + actions)
		 */
		contentClasses() {
			return [
				'flex',
				'flex-col',
				'sm:flex-row',
				'sm:items-center',
				'sm:justify-between',
				'gap-4'
			].join(' ');
		},
		/**
		 * Title section classes (avatar + title)
		 */
		titleSectionClasses() {
			return 'flex items-center gap-4 min-w-0 flex-1';
		},
		/**
		 * Actions section classes
		 */
		actionsClasses() {
			return 'flex-shrink-0 self-start sm:self-center';
		}
	},
	methods: {
		/**
		 * Handle breadcrumb navigation event
		 */
		handleBreadcrumbNavigate(payload) {
			this.$emit('breadcrumb-navigate', payload);
		}
	}
};
</script>
