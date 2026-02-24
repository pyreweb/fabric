import FToast from '../../molecules/FToast/FToast.vue.js';

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


let toastId = 0;

var script = {
	name: 'FToastProvider',
	components: {
		FToast
	},
	props: {
		/**
		 * Position par défaut des toasts
		 */
		position: {
			type: String,
			default: 'top-right',
			validator: (value) =>
				[
					'top-left',
					'top-center',
					'top-right',
					'bottom-left',
					'bottom-center',
					'bottom-right'
				].includes(value)
		},
		/**
		 * Nombre maximum de toasts affichés simultanément
		 */
		maxToasts: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {
			toasts: [],
			positions: [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right'
			]
		};
	},
	computed: {
		toastsByPosition() {
			return this.positions.reduce((acc, position) => {
				acc[position] = this.toasts.filter(
					(toast) => toast.position === position
				);
				return acc;
			}, {});
		}
	},
	created() {
		// Expose API globally via $root for Vue 2 compatibility
		// Note: In Vue 3, this should be replaced with provide/inject or a plugin
		// This approach is acceptable for Vue 2 applications for convenience
		if (this.$root && !this.$root.$toast) {
			this.$root.$toast = {
				show: this.show,
				success: this.success,
				error: this.error,
				info: this.info,
				warning: this.warning,
				clear: this.clear
			};
		} else if (this.$root && this.$root.$toast) {
			// Warn if another FToastProvider is already mounted
			console.warn(
				'FToastProvider: Multiple instances detected. Only one FToastProvider should be mounted at a time. The global API will use the first mounted instance.'
			);
		}
	},
	beforeDestroy() {
		// Clean up global API
		if (this.$root && this.$root.$toast) {
			delete this.$root.$toast;
		}
	},
	methods: {
		containerClasses(position) {
			const baseClasses =
				'fixed z-50 flex flex-col gap-3 p-4 pointer-events-none';
			const positionClasses = {
				'top-left': 'top-0 left-0',
				'top-center': 'top-0 left-1/2 -translate-x-1/2',
				'top-right': 'top-0 right-0',
				'bottom-left': 'bottom-0 left-0',
				'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
				'bottom-right': 'bottom-0 right-0'
			};

			return `${baseClasses} ${positionClasses[position]}`;
		},
		/**
		 * Affiche un toast avec des options personnalisées
		 */
		show(options) {
			const toast = {
				id: ++toastId,
				variant: options.variant || 'info',
				title: options.title || '',
				message: options.message || '',
				closable: options.closable !== undefined ? options.closable : true,
				duration: options.duration !== undefined ? options.duration : 5000,
				position: options.position || this.position
			};

			// Limit the number of toasts
			if (this.toasts.length >= this.maxToasts) {
				this.toasts.shift();
			}

			this.toasts.push(toast);
			this.$emit('show', toast);

			return toast.id;
		},
		/**
		 * Affiche un toast de succès
		 */
		success(message, title = 'Succès', options = {}) {
			return this.show({
				variant: 'success',
				title,
				message,
				...options
			});
		},
		/**
		 * Affiche un toast d'erreur
		 */
		error(message, title = 'Erreur', options = {}) {
			return this.show({
				variant: 'error',
				title,
				message,
				...options
			});
		},
		/**
		 * Affiche un toast d'information
		 */
		info(message, title = 'Information', options = {}) {
			return this.show({
				variant: 'info',
				title,
				message,
				...options
			});
		},
		/**
		 * Affiche un toast d'avertissement
		 */
		warning(message, title = 'Avertissement', options = {}) {
			return this.show({
				variant: 'warning',
				title,
				message,
				...options
			});
		},
		/**
		 * Supprime un toast spécifique
		 */
		removeToast(id) {
			const index = this.toasts.findIndex((t) => t.id === id);
			if (index !== -1) {
				const toast = this.toasts[index];
				this.toasts.splice(index, 1);
				this.$emit('remove', toast);
			}
		},
		/**
		 * Supprime tous les toasts
		 */
		clear() {
			this.toasts = [];
			this.$emit('clear');
		}
	}
};

export { script as default };
