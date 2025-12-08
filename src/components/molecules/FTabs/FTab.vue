<template>
	<div
		v-show="isActive"
		:id="panelId"
		role="tabpanel"
		:aria-labelledby="tabId"
		class="focus:outline-none"
		tabindex="0"
	>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'FTab',
	inject: ['tabsProvider'],
	props: {
		/**
		 * Label displayed in the tab button
		 */
		label: {
			type: String,
			required: true
		},
		/**
		 * Unique identifier for the tab
		 */
		name: {
			type: String,
			required: true
		},
		/**
		 * Whether the tab is disabled
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isActive() {
			return this.tabsProvider.isActive(this.name);
		},
		tabId() {
			return this.tabsProvider.getTabId(this.name);
		},
		panelId() {
			return this.tabsProvider.getPanelId(this.name);
		}
	},
	created() {
		this.tabsProvider.registerTab({
			name: this.name,
			label: this.label,
			disabled: this.disabled
		});
	},
	beforeDestroy() {
		this.tabsProvider.unregisterTab(this.name);
	}
};
</script>
