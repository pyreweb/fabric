import FTypography from '../../atoms/FTypography/FTypography.vue.js';
import FButton from '../../atoms/FButton/FButton.vue.js';
import FIcon from '../../atoms/FIcon/FIcon.vue.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter = 0;

var script = {
	name: 'FDrawer',
	components: {
		FTypography,
		FButton,
		FIcon
	},
	props: {
		/**
		 * Controls the visibility of the drawer.
		 * Use v-model for two-way binding.
		 */
		value: {
			type: Boolean,
			default: false
		},
		/**
		 * Drawer title displayed in the header
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Optional subtitle displayed below the title
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Show the close button in the header
		 */
		closable: {
			type: Boolean,
			default: true
		},
		/**
		 * Close the drawer when clicking the overlay
		 */
		closeOnOverlay: {
			type: Boolean,
			default: true
		},
		/**
		 * Close the drawer when pressing Escape key
		 */
		closeOnEscape: {
			type: Boolean,
			default: true
		},
		/**
		 * Position of the drawer (left, right, top, bottom)
		 */
		position: {
			type: String,
			default: 'right',
			validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
		},
		/**
		 * Size of the drawer
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		/**
		 * Whether the drawer has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			uid: idCounter++
		};
	},
	computed: {
		/**
		 * Computed property for v-model support
		 */
		isOpen: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Unique ID for the drawer title (accessibility)
		 */
		titleId() {
			return `f-drawer-title-${this.uid}`;
		},
		/**
		 * Container classes for positioning
		 */
		containerClasses() {
			const positionClasses = {
				left: 'flex items-stretch justify-start',
				right: 'flex items-stretch justify-end',
				top: 'flex flex-col items-stretch justify-start',
				bottom: 'flex flex-col items-stretch justify-end'
			};

			return [
				'fixed inset-0 pointer-events-none',
				positionClasses[this.position]
			]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Drawer panel classes
		 */
		drawerClasses() {
			const baseClasses =
				'relative bg-white shadow-xl pointer-events-auto flex flex-col';
			const transitionClasses =
				'transition-all duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-emphasized)]';
			const borderedClasses = this.bordered ? 'border border-neutral-200' : '';

			const sizeClasses = {
				left: {
					small: 'w-64',
					medium: 'w-80',
					large: 'w-96'
				},
				right: {
					small: 'w-64',
					medium: 'w-80',
					large: 'w-96'
				},
				top: {
					small: 'h-64',
					medium: 'h-80',
					large: 'h-96'
				},
				bottom: {
					small: 'h-64',
					medium: 'h-80',
					large: 'h-96'
				}
			};

			const heightWidthClass = sizeClasses[this.position][this.size];
			const fullHeightWidth =
				this.position === 'left' || this.position === 'right'
					? 'h-full'
					: 'w-full';

			return [
				baseClasses,
				transitionClasses,
				borderedClasses,
				heightWidthClass,
				fullHeightWidth
			]
				.filter(Boolean)
				.join(' ');
		}
	},
	watch: {
		/**
		 * Watch for drawer open/close to manage body scroll
		 */
		isOpen: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					this.lockBodyScroll();
					this.$nextTick(() => {
						if (this.closeOnEscape) {
							document.addEventListener('keydown', this.handleKeydown);
						}
					});
				} else {
					this.unlockBodyScroll();
					document.removeEventListener('keydown', this.handleKeydown);
				}
			}
		}
	},
	beforeDestroy() {
		this.unlockBodyScroll();
		document.removeEventListener('keydown', this.handleKeydown);
	},
	methods: {
		/**
		 * Handle overlay click
		 */
		handleOverlayClick() {
			if (this.closeOnOverlay) {
				this.handleClose();
			}
		},
		/**
		 * Handle close action
		 */
		handleClose() {
			this.isOpen = false;
			this.$emit('close');
		},
		/**
		 * Handle keyboard events
		 */
		handleKeydown(event) {
			if (event.key === 'Escape' && this.closeOnEscape) {
				this.handleClose();
			}
		},
		/**
		 * Lock body scroll when drawer is open
		 */
		lockBodyScroll() {
			document.body.style.overflow = 'hidden';
		},
		/**
		 * Unlock body scroll when drawer is closed
		 */
		unlockBodyScroll() {
			document.body.style.overflow = '';
		}
	}
};

export { script as default };
