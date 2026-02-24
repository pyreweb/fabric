<template>
	<span
		:class="iconClasses"
		:style="iconStyle"
		:aria-hidden="ariaHidden"
		:aria-label="ariaLabel"
		role="img"
	>
		<slot>
			<svg
				v-if="iconPath"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				:class="svgClasses"
			>
				<path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
			</svg>
			<svg
				v-else-if="showPlaceholder"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				:class="svgClasses"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
				/>
			</svg>
		</slot>
	</span>
</template>

<script>
import { getIconPath } from './iconRegistry';

export default {
	name: 'FIcon',
	props: {
		name: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) =>
				['xs', 'sm', 'md', 'lg', 'xl'].includes(value) ||
				/^\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/.test(value)
		},
		color: {
			type: String,
			default: ''
		},
		decorative: {
			type: Boolean,
			default: true
		},
		label: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconPath() {
			return getIconPath(this.name);
		},
		showPlaceholder() {
			return this.name && !this.iconPath;
		},
		ariaHidden() {
			return this.decorative ? 'true' : undefined;
		},
		ariaLabel() {
			return !this.decorative ? this.label || this.name : undefined;
		},
		sizeClass() {
			const sizeMap = {
				xs: 'w-3 h-3',
				sm: 'w-4 h-4',
				md: 'w-5 h-5',
				lg: 'w-6 h-6',
				xl: 'w-8 h-8'
			};
			return sizeMap[this.size] || '';
		},
		isCustomSize() {
			return !['xs', 'sm', 'md', 'lg', 'xl'].includes(this.size);
		},
		iconClasses() {
			const baseClasses =
				'inline-flex items-center justify-center flex-shrink-0';

			return [baseClasses, this.sizeClass].filter(Boolean).join(' ');
		},
		svgClasses() {
			return 'w-full h-full';
		},
		iconStyle() {
			const style = {};

			if (this.color) {
				style.color = this.color;
			}

			if (this.isCustomSize) {
				const size = /^\d+(px|rem|em)?$/.test(this.size)
					? /^\d+$/.test(this.size)
						? `${this.size}px`
						: this.size
					: this.size;
				style.width = size;
				style.height = size;
			}

			return Object.keys(style).length > 0 ? style : undefined;
		}
	}
};
</script>
