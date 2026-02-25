<template>
	<div
		role="separator"
		:aria-orientation="orientation"
		:class="containerClasses"
	>
		<template v-if="hasContent">
			<span :class="lineClasses('start')"></span>
			<span :class="textClasses">
				<slot />
			</span>
			<span :class="lineClasses('end')"></span>
		</template>
		<span v-else :class="lineClasses('full')"></span>
	</div>
</template>

<script>
export default {
	name: 'FDivider',
	props: {
		orientation: {
			type: String,
			default: 'horizontal',
			validator: (v) => ['horizontal', 'vertical'].includes(v)
		},
		align: {
			type: String,
			default: 'center',
			validator: (v) => ['left', 'center', 'right'].includes(v)
		},
		color: {
			type: String,
			default: 'gray-300'
		},
		textColor: {
			type: String,
			default: 'gray-500'
		},
		textSize: {
			type: String,
			default: 'sm'
		},
		margin: {
			type: String,
			default: 'md',
			validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v)
		},
		thickness: {
			type: String,
			default: 'thin',
			validator: (v) => ['thin', 'medium', 'thick'].includes(v)
		}
	},
	computed: {
		hasContent() {
			return !!this.$slots.default;
		},
		isVertical() {
			return this.orientation === 'vertical';
		},
		containerClasses() {
			const margins = {
				none: '',
				sm: this.isVertical ? 'mx-2' : 'my-2',
				md: this.isVertical ? 'mx-4' : 'my-4',
				lg: this.isVertical ? 'mx-6' : 'my-6'
			};

			return [
				'flex items-center',
				this.isVertical ? 'flex-col h-full' : 'flex-row w-full',
				margins[this.margin]
			];
		},
		baseLineClasses() {
			const bgColorMap = {
				'gray-100': 'bg-gray-100',
				'gray-200': 'bg-gray-200',
				'gray-300': 'bg-gray-300',
				'gray-400': 'bg-gray-400',
				'gray-500': 'bg-gray-500',
				'neutral-100': 'bg-neutral-100',
				'neutral-200': 'bg-neutral-200',
				'neutral-300': 'bg-neutral-300',
				'neutral-400': 'bg-neutral-400',
				'neutral-500': 'bg-neutral-500'
			};

			const thicknessHorizontalMap = {
				thin: 'h-px',
				medium: 'h-0.5',
				thick: 'h-1'
			};

			const thicknessVerticalMap = {
				thin: 'w-px',
				medium: 'w-0.5',
				thick: 'w-1'
			};

			return [
				bgColorMap[this.color] ?? 'bg-gray-300',
				this.isVertical
					? (thicknessVerticalMap[this.thickness] ?? 'w-px')
					: (thicknessHorizontalMap[this.thickness] ?? 'h-px')
			];
		},
		textClasses() {
			const textSizeMap = {
				xs: 'text-xs',
				sm: 'text-sm',
				base: 'text-base',
				lg: 'text-lg',
				xl: 'text-xl'
			};

			const textColorMap = {
				'gray-400': 'text-gray-400',
				'gray-500': 'text-gray-500',
				'gray-600': 'text-gray-600',
				'neutral-400': 'text-neutral-400',
				'neutral-500': 'text-neutral-500',
				'neutral-600': 'text-neutral-600'
			};

			return [
				'font-sans',
				textSizeMap[this.textSize] ?? 'text-sm',
				textColorMap[this.textColor] ?? 'text-gray-500',
				this.isVertical ? 'py-2' : 'px-3'
			];
		}
	},
	methods: {
		lineClasses(position) {
			if (position === 'full') {
				return [this.isVertical ? 'h-full' : 'w-full', ...this.baseLineClasses];
			}

			const offset = this.isVertical ? 'h-4' : 'w-4';
			const grow = 'flex-1';
			const fixed = `flex-none ${offset}`;

			let sizing = grow;

			if (this.align === 'left') {
				sizing = position === 'start' ? fixed : grow;
			} else if (this.align === 'right') {
				sizing = position === 'start' ? grow : fixed;
			}

			return [sizing, ...this.baseLineClasses];
		}
	}
};
</script>
