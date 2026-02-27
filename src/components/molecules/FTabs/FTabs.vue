<template>
	<div class="f-tabs">
		<!-- Tab buttons -->
		<div
			ref="tabList"
			:class="tabListClasses"
			role="tablist"
			:aria-label="ariaLabel"
		>
			<button
				v-for="tab in tabItems"
				:id="getTabId(tab.name)"
				:key="tab.name"
				:ref="`tab-${tab.name}`"
				role="tab"
				:aria-selected="activeTabName === tab.name ? 'true' : 'false'"
				:aria-controls="getPanelId(tab.name)"
				:disabled="tab.disabled"
				:class="getTabButtonClasses(tab)"
				:tabindex="activeTabName === tab.name ? 0 : -1"
				@click="handleTabClick(tab.name)"
				@keydown="handleKeydown($event, tab.name)"
			>
				{{ tab.label }}
			</button>
			<!-- Animated active indicator (default and underline variants only) -->
			<span
				v-if="variant !== 'pills'"
				aria-hidden="true"
				class="absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-200"
				:style="indicatorStyle"
			/>
		</div>

		<!-- Tab panels (content) -->
		<div class="mt-4">
			<slot />
		</div>
	</div>
</template>

<script>
let idCounter = 0;

export default {
	name: 'FTabs',
	provide() {
		return {
			tabsProvider: {
				registerTab: this.registerTab,
				unregisterTab: this.unregisterTab,
				isActive: this.isTabActive,
				getTabId: this.getTabId,
				getPanelId: this.getPanelId
			}
		};
	},
	props: {
		/**
		 * Currently active tab name (v-model support)
		 */
		value: {
			type: String,
			default: ''
		},
		/**
		 * Visual variant of the tabs
		 */
		variant: {
			type: String,
			default: 'default',
			validator: (value) => ['default', 'pills', 'underline'].includes(value)
		},
		/**
		 * Position of the tab buttons
		 */
		position: {
			type: String,
			default: 'top',
			validator: (value) => ['top', 'bottom'].includes(value)
		},
		/**
		 * Accessible label for the tab list
		 */
		ariaLabel: {
			type: String,
			default: 'Onglets'
		}
	},
	data() {
		return {
			tabItems: [],
			uid: idCounter++,
			initialTabSet: false,
			internalActiveTab: '',
			indicatorStyle: { left: '0px', width: '0px' },
			resizeObserver: null
		};
	},
	computed: {
		activeTabName: {
			get() {
				// Use value prop if provided, otherwise use internal state
				return this.value !== '' ? this.value : this.internalActiveTab;
			},
			set(val) {
				this.internalActiveTab = val;
				this.$emit('input', val);
			}
		},
		tabListClasses() {
			const baseClasses = 'relative flex gap-1';
			const variantClasses = {
				default: 'border-b border-neutral-200',
				pills: '',
				underline: 'border-b border-neutral-200'
			};
			const positionClasses = {
				top: '',
				bottom: 'order-2 mt-4'
			};

			return [
				baseClasses,
				variantClasses[this.variant],
				positionClasses[this.position]
			]
				.filter(Boolean)
				.join(' ');
		}
	},
	watch: {
		tabItems: {
			handler() {
				// Set first tab as active if no value provided and not yet set
				if (
					!this.initialTabSet &&
					!this.activeTabName &&
					this.tabItems.length > 0
				) {
					const firstEnabledTab = this.tabItems.find((tab) => !tab.disabled);
					if (firstEnabledTab) {
						this.activeTabName = firstEnabledTab.name;
						this.initialTabSet = true;
					}
				}
			},
			immediate: true
		},
		activeTabName() {
			this.$nextTick(() => {
				this.updateIndicator();
			});
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.updateIndicator();
		});
		if (typeof ResizeObserver !== 'undefined' && this.$refs.tabList) {
			this.resizeObserver = new ResizeObserver(() => {
				this.updateIndicator();
			});
			this.resizeObserver.observe(this.$refs.tabList);
		}
	},
	beforeDestroy() {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
			this.resizeObserver = null;
		}
	},
	methods: {
		/**
		 * Update the position and width of the active indicator bar
		 */
		updateIndicator() {
			if (this.variant === 'pills' || !this.activeTabName) return;
			const tabRef = this.$refs[`tab-${this.activeTabName}`];
			const tabEl = tabRef && tabRef[0] ? tabRef[0] : tabRef;
			const container = this.$refs.tabList;
			if (!tabEl || !container) return;
			const containerRect = container.getBoundingClientRect();
			const tabRect = tabEl.getBoundingClientRect();
			this.indicatorStyle = {
				left: `${tabRect.left - containerRect.left}px`,
				width: `${tabRect.width}px`
			};
		},
		/**
		 * Register a tab from FTab component
		 */
		registerTab(tab) {
			const exists = this.tabItems.find((t) => t.name === tab.name);
			if (!exists) {
				this.tabItems.push(tab);
			}
			// Set first non-disabled tab as active if no value provided
			if (!this.activeTabName) {
				const firstEnabledTab = this.tabItems.find((t) => !t.disabled);
				if (firstEnabledTab) {
					this.activeTabName = firstEnabledTab.name;
				}
			}
		},
		/**
		 * Unregister a tab from FTab component
		 */
		unregisterTab(name) {
			const index = this.tabItems.findIndex((t) => t.name === name);
			if (index > -1) {
				this.tabItems.splice(index, 1);
			}
		},
		/**
		 * Check if a tab is active
		 */
		isTabActive(name) {
			return this.activeTabName === name;
		},
		/**
		 * Generate unique tab button ID
		 */
		getTabId(name) {
			return `f-tab-${this.uid}-${name}`;
		},
		/**
		 * Generate unique tab panel ID
		 */
		getPanelId(name) {
			return `f-tabpanel-${this.uid}-${name}`;
		},
		/**
		 * Get classes for tab button based on state
		 */
		getTabButtonClasses(tab) {
			const isActive = this.activeTabName === tab.name;
			const baseClasses =
				'px-4 py-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

			const roundingClasses = this.variant === 'pills' ? '' : 'rounded-t-md';

			const variantClasses = {
				default: isActive
					? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
					: 'text-neutral-600 hover:text-neutral-800 hover:border-neutral-300 border-b-2 border-transparent -mb-px',
				pills: isActive
					? 'bg-primary-100 text-primary-700 rounded-lg'
					: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 rounded-lg',
				underline: isActive
					? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
					: 'text-neutral-600 hover:text-neutral-800 border-b-2 border-transparent -mb-px'
			};

			const disabledClasses = tab.disabled
				? 'opacity-50 cursor-not-allowed'
				: 'cursor-pointer';

			return [
				baseClasses,
				roundingClasses,
				variantClasses[this.variant],
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Handle tab click
		 */
		handleTabClick(name) {
			const tab = this.tabItems.find((t) => t.name === name);
			if (tab && !tab.disabled) {
				this.activeTabName = name;
				this.$emit('change', name);
			}
		},
		/**
		 * Handle keyboard navigation
		 */
		handleKeydown(event, currentName) {
			const enabledTabs = this.tabItems.filter((tab) => !tab.disabled);
			const currentIndex = enabledTabs.findIndex(
				(tab) => tab.name === currentName
			);

			let nextIndex = currentIndex;

			switch (event.key) {
				case 'ArrowRight':
					event.preventDefault();
					nextIndex = (currentIndex + 1) % enabledTabs.length;
					break;
				case 'ArrowLeft':
					event.preventDefault();
					nextIndex =
						currentIndex === 0 ? enabledTabs.length - 1 : currentIndex - 1;
					break;
				case 'Home':
					event.preventDefault();
					nextIndex = 0;
					break;
				case 'End':
					event.preventDefault();
					nextIndex = enabledTabs.length - 1;
					break;
				default:
					return;
			}

			const nextTab = enabledTabs[nextIndex];
			if (nextTab) {
				this.activeTabName = nextTab.name;
				this.$emit('change', nextTab.name);
				this.$nextTick(() => {
					const tabButton = this.$refs[`tab-${nextTab.name}`];
					if (tabButton && tabButton[0]) {
						tabButton[0].focus();
					}
				});
			}
		}
	}
};
</script>
