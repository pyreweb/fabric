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
			const thicknessMap = {
				thin: 'px',
				medium: '0.5',
				thick: '1'
			};
			const size = thicknessMap[this.thickness];

			return [`bg-${this.color}`, this.isVertical ? `w-${size}` : `h-${size}`];
		},
		textClasses() {
			return [
				'font-sans',
				`text-${this.textSize}`,
				`text-${this.textColor}`,
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
