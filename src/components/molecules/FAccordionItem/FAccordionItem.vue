<template>
	<div class="border border-gray-200 rounded-lg overflow-hidden">
		<button
			:id="headerId"
			type="button"
			:class="headerClasses"
			:aria-expanded="String(isOpen)"
			:aria-controls="contentId"
			@click="toggle"
		>
			<f-typography variant="h6" class="flex-1 text-left">
				{{ title }}
			</f-typography>
			<f-icon name="chevron-down" size="md" :class="iconClasses" />
		</button>
		<div
			:id="contentId"
			ref="content"
			:class="contentWrapperClasses"
			:style="contentStyle"
			:aria-labelledby="headerId"
			role="region"
		>
			<div ref="contentInner" class="p-4">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';

let accordionItemId = 0;

export default {
	name: 'FAccordionItem',
	components: {
		FIcon,
		FTypography
	},
	props: {
		title: {
			type: String,
			required: true
		},
		defaultOpen: {
			type: Boolean,
			default: false
		}
	},
	data() {
		const id = ++accordionItemId;
		return {
			isOpen: this.defaultOpen,
			contentHeight: 0,
			headerId: `accordion-header-${id}`,
			contentId: `accordion-content-${id}`
		};
	},
	computed: {
		headerClasses() {
			const baseClasses =
				'w-full flex items-center justify-between gap-3 p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200 cursor-pointer';
			return baseClasses;
		},
		iconClasses() {
			const baseClasses =
				'transform transition-transform duration-300 text-gray-500';
			const rotateClasses = this.isOpen ? 'rotate-180' : 'rotate-0';
			return `${baseClasses} ${rotateClasses}`;
		},
		contentWrapperClasses() {
			return 'overflow-hidden transition-all duration-300 ease-in-out';
		},
		contentStyle() {
			return {
				maxHeight: this.isOpen ? `${this.contentHeight}px` : '0px'
			};
		}
	},
	watch: {
		isOpen() {
			this.$nextTick(() => {
				this.updateContentHeight();
			});
		}
	},
	mounted() {
		this.updateContentHeight();
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
			this.$emit('toggle', this.isOpen);
			this.$emit('input', this.isOpen);
		},
		updateContentHeight() {
			if (this.$refs.contentInner) {
				this.contentHeight = this.$refs.contentInner.scrollHeight;
			}
		}
	}
};
</script>
