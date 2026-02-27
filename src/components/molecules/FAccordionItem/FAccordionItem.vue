<template>
	<div class="border border-neutral-200 rounded-lg overflow-hidden">
		<button
			:id="headerId"
			type="button"
			:class="headerClasses"
			:aria-expanded="String(isOpen)"
			:aria-controls="contentId"
			@click="toggle"
			@keydown.enter="toggle"
			@keydown.space.prevent="toggle"
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
			@transitionend="handleTransitionEnd"
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
			isTransitioning: false,
			contentHeight: 0,
			headerId: `accordion-header-${id}`,
			contentId: `accordion-content-${id}`
		};
	},
	computed: {
		headerClasses() {
			return 'w-full flex items-center justify-between gap-3 p-4 bg-neutral-50 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset cursor-pointer transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';
		},
		iconClasses() {
			const baseClasses = 'transform text-neutral-500';
			const transitionClasses =
				'transition-transform duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-emphasized)]';
			const rotateClasses = this.isOpen ? 'rotate-180' : 'rotate-0';
			return `${baseClasses} ${transitionClasses} ${rotateClasses}`;
		},
		contentWrapperClasses() {
			return 'overflow-hidden transition-all duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-emphasized)]';
		},
		contentStyle() {
			return {
				maxHeight: this.isOpen ? `${this.contentHeight}px` : '0px',
				willChange: this.isTransitioning ? 'max-height' : 'auto'
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
			this.isTransitioning = true;
			this.isOpen = !this.isOpen;
			this.$emit('toggle', this.isOpen);
			this.$emit('input', this.isOpen);
		},
		handleTransitionEnd(event) {
			if (
				event.target === this.$refs.content &&
				event.propertyName === 'max-height'
			) {
				this.isTransitioning = false;
			}
		},
		updateContentHeight() {
			if (this.$refs.contentInner) {
				this.contentHeight = this.$refs.contentInner.scrollHeight;
			}
		}
	}
};
</script>
