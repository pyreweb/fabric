<template>
	<div
		class="relative inline-flex flex-shrink-0"
		:class="[sizeClasses.wrapper]"
		@click="$emit('click', $event)"
	>
		<div
			:class="containerClasses"
			:role="showImage ? undefined : 'img'"
			:aria-label="computedAriaLabel"
		>
			<img
				v-if="showImage"
				:src="src"
				:alt="alt"
				class="w-full h-full object-cover"
				loading="lazy"
				@error="handleImageError"
			/>

			<span
				v-else
				:class="[
					'flex items-center justify-center w-full h-full',
					fontSizeClasses
				]"
			>
				<template v-if="displayInitials">
					{{ displayInitials }}
				</template>
				<svg
					v-else
					class="w-3/5 h-3/5 text-white opacity-90"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</div>

		<span v-if="status" :class="statusClasses" />
	</div>
</template>

<script>
export default {
	name: 'FAvatar',
	props: {
		src: {
			type: String,
			default: ''
		},
		alt: {
			type: String,
			default: ''
		},
		initials: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		shape: {
			type: String,
			default: 'circle',
			validator: (value) => ['circle', 'square'].includes(value)
		},
		status: {
			type: String,
			default: null,
			validator: (value) =>
				[null, 'online', 'busy', 'away', 'offline'].includes(value)
		},
		placeholderClass: {
			type: String,
			default: 'bg-gray-400 text-white'
		}
	},
	data() {
		return {
			imageError: false
		};
	},
	computed: {
		showImage() {
			return this.src && !this.imageError;
		},
		displayInitials() {
			if (this.initials) {
				return this.initials.substring(0, 2).toUpperCase();
			}
			if (this.name) {
				return this.computeInitialsFromName(this.name);
			}
			return '';
		},
		computedAriaLabel() {
			if (this.alt) return this.alt;
			if (this.name) return this.name;
			if (this.initials) return `Avatar ${this.initials}`;
			return 'Avatar';
		},
		sizeClasses() {
			const sizes = {
				xs: { wrapper: 'w-6 h-6', status: 'w-1.5 h-1.5' },
				sm: { wrapper: 'w-8 h-8', status: 'w-2 h-2' },
				md: { wrapper: 'w-10 h-10', status: 'w-2.5 h-2.5' },
				lg: { wrapper: 'w-12 h-12', status: 'w-3 h-3' },
				xl: { wrapper: 'w-16 h-16', status: 'w-4 h-4' }
			};
			return sizes[this.size];
		},
		fontSizeClasses() {
			const fonts = {
				xs: 'text-xs',
				sm: 'text-xs',
				md: 'text-sm',
				lg: 'text-base',
				xl: 'text-lg'
			};
			return [fonts[this.size], 'font-sans font-medium select-none'].join(
				' '
			);
		},
		containerClasses() {
			const shapes = {
				circle: 'rounded-full',
				square: 'rounded-lg'
			};

			const background = !this.showImage ? this.placeholderClass : '';

			return [
				'w-full h-full overflow-hidden flex items-center justify-center',
				shapes[this.shape],
				background
			]
				.filter(Boolean)
				.join(' ');
		},
		statusClasses() {
			const colors = {
				online: 'bg-green-500',
				busy: 'bg-red-500',
				away: 'bg-yellow-500',
				offline: 'bg-gray-500'
			};

			const position =
				this.shape === 'circle'
					? '-bottom-0.5 -right-0.5'
					: '-bottom-1 -right-1';
			const border = 'border-2 border-white';

			return [
				'absolute rounded-full box-content',
				position,
				border,
				this.sizeClasses.status,
				colors[this.status]
			].join(' ');
		}
	},
	watch: {
		src() {
			this.imageError = false;
		}
	},
	methods: {
		handleImageError() {
			this.imageError = true;
		},
		computeInitialsFromName(name) {
			if (!name) return '';
			const parts = name.trim().split(/\s+/).filter(Boolean);
			if (parts.length === 0) return '';
			if (parts.length >= 2) {
				return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
			}
			return parts[0].substring(0, 2).toUpperCase();
		}
	}
};
</script>
