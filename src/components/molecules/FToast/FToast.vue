<template>
	<transition
		:name="transitionName"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave"
	>
		<div
			v-if="isVisible"
			:class="toastClasses"
			role="alert"
			aria-live="polite"
			@mouseenter="pauseTimer"
			@mouseleave="resumeTimer"
		>
			<f-icon :name="iconName" size="md" />
			<div class="flex-1 min-w-0">
				<f-typography v-if="title" variant="h6" :class="titleClasses">
					{{ title }}
				</f-typography>
				<f-typography v-if="message" variant="body" :class="messageClasses">
					{{ message }}
				</f-typography>
				<slot />
			</div>
			<f-button
				v-if="closable"
				variant="text"
				size="small"
				:class="closeButtonClasses"
				@click="handleClose"
			>
				<f-icon name="close" size="sm" />
				<span class="sr-only">Fermer la notification</span>
			</f-button>
		</div>
	</transition>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';

const VARIANT_STYLES = {
	success: {
		container: 'bg-success-50 border-success-200 text-success-800',
		title: 'text-success-800',
		message: 'text-success-700',
		closeButton: 'text-success-600 hover:text-success-800',
		icon: 'check_circle'
	},
	error: {
		container: 'bg-danger-50 border-danger-200 text-danger-800',
		title: 'text-danger-800',
		message: 'text-danger-700',
		closeButton: 'text-danger-600 hover:text-danger-800',
		icon: 'error'
	},
	info: {
		container: 'bg-primary-50 border-primary-200 text-primary-800',
		title: 'text-primary-800',
		message: 'text-primary-700',
		closeButton: 'text-primary-600 hover:text-primary-800',
		icon: 'info'
	},
	warning: {
		container: 'bg-warning-50 border-warning-200 text-warning-800',
		title: 'text-warning-800',
		message: 'text-warning-700',
		closeButton: 'text-warning-600 hover:text-warning-800',
		icon: 'warning'
	}
};

export default {
	name: 'FToast',
	components: {
		FIcon,
		FTypography,
		FButton
	},
	props: {
		/**
		 * Type de toast (success, error, info, warning)
		 */
		variant: {
			type: String,
			default: 'info',
			validator: (value) =>
				['success', 'error', 'info', 'warning'].includes(value)
		},
		/**
		 * Titre du toast
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Message du toast
		 */
		message: {
			type: String,
			default: ''
		},
		/**
		 * Afficher le bouton de fermeture
		 */
		closable: {
			type: Boolean,
			default: true
		},
		/**
		 * Durée d'affichage en millisecondes (0 = pas de fermeture automatique)
		 */
		duration: {
			type: Number,
			default: 5000
		},
		/**
		 * Position du toast (utilisé pour l'animation)
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
		}
	},
	data() {
		return {
			isVisible: true,
			timer: null,
			remainingTime: this.duration,
			pausedAt: null
		};
	},
	computed: {
		variantStyles() {
			return VARIANT_STYLES[this.variant];
		},
		toastClasses() {
			const baseClasses =
				'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[320px] max-w-md';
			return `${baseClasses} ${this.variantStyles.container}`;
		},
		titleClasses() {
			return this.variantStyles.title;
		},
		messageClasses() {
			return this.variantStyles.message;
		},
		closeButtonClasses() {
			return `flex-shrink-0 ${this.variantStyles.closeButton}`;
		},
		iconName() {
			return this.variantStyles.icon;
		},
		transitionName() {
			if (this.position.includes('left')) {
				return 'toast-slide-left';
			} else if (this.position.includes('right')) {
				return 'toast-slide-right';
			}
			return 'toast-slide-down';
		}
	},
	mounted() {
		if (this.duration > 0) {
			this.startTimer();
		}
	},
	beforeDestroy() {
		this.clearTimer();
	},
	methods: {
		startTimer() {
			this.clearTimer();
			this.timer = setTimeout(() => {
				this.handleClose();
			}, this.remainingTime);
		},
		clearTimer() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
		pauseTimer() {
			if (this.timer && this.duration > 0) {
				this.clearTimer();
				this.pausedAt = Date.now();
			}
		},
		resumeTimer() {
			if (this.pausedAt && this.duration > 0) {
				const elapsed = Date.now() - this.pausedAt;
				this.remainingTime = Math.max(0, this.remainingTime - elapsed);
				this.pausedAt = null;
				if (this.remainingTime > 0) {
					this.startTimer();
				} else {
					this.handleClose();
				}
			}
		},
		handleClose() {
			this.isVisible = false;
			this.$emit('close');
		},
		onBeforeEnter(el) {
			el.style.opacity = '0';
		},
		onEnter(el, done) {
			// Force reflow
			void el.offsetHeight;
			el.style.transition = 'all 0.3s ease-out';
			el.style.opacity = '1';
			done();
		},
		onLeave(el, done) {
			el.style.transition = 'all 0.3s ease-in';
			el.style.opacity = '0';
			setTimeout(done, 300);
		}
	}
};
</script>

<style scoped>
.toast-slide-left-enter-active,
.toast-slide-left-leave-active {
	transition: all 0.3s ease-out;
}

.toast-slide-left-enter {
	transform: translateX(-100%);
	opacity: 0;
}

.toast-slide-left-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}

.toast-slide-right-enter-active,
.toast-slide-right-leave-active {
	transition: all 0.3s ease-out;
}

.toast-slide-right-enter {
	transform: translateX(100%);
	opacity: 0;
}

.toast-slide-right-leave-to {
	transform: translateX(100%);
	opacity: 0;
}

.toast-slide-down-enter-active,
.toast-slide-down-leave-active {
	transition: all 0.3s ease-out;
}

.toast-slide-down-enter {
	transform: translateY(-100%);
	opacity: 0;
}

.toast-slide-down-leave-to {
	transform: translateY(-100%);
	opacity: 0;
}
</style>
