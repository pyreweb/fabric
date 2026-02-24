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

var script = {
	name: 'FStepperProgress',
	props: {
		/**
		 * Array of step titles
		 */
		steps: {
			type: Array,
			required: true
		},
		/**
		 * Current active step index (0-based)
		 */
		currentStep: {
			type: Number,
			default: 0
		}
	},
	methods: {
		/**
		 * Get container classes for each step
		 */
		stepContainerClasses(index) {
			const isLast = index === this.steps.length - 1;
			return ['flex', 'items-center', isLast ? '' : 'flex-1']
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Get classes for step circle indicator
		 */
		stepCircleClasses(index) {
			const baseClasses =
				'flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			if (index < this.currentStep) {
				// Completed step
				return [
					baseClasses,
					transitionClasses,
					'bg-success-600 text-white'
				].join(' ');
			} else if (index === this.currentStep) {
				// Current step
				return [
					baseClasses,
					transitionClasses,
					'bg-primary-600 text-white'
				].join(' ');
			} else {
				// Future step
				return [
					baseClasses,
					transitionClasses,
					'bg-neutral-200 text-neutral-500'
				].join(' ');
			}
		},
		/**
		 * Get classes for step title
		 */
		stepTitleClasses(index) {
			const baseClasses = 'ml-2 text-sm font-medium';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			if (index < this.currentStep) {
				// Completed step
				return [baseClasses, transitionClasses, 'text-success-600'].join(' ');
			} else if (index === this.currentStep) {
				// Current step
				return [baseClasses, transitionClasses, 'text-primary-600'].join(' ');
			} else {
				// Future step
				return [baseClasses, transitionClasses, 'text-neutral-500'].join(' ');
			}
		},
		/**
		 * Get classes for connector line between steps
		 */
		connectorClasses(index) {
			const baseClasses = 'flex-1 h-0.5 mx-4';
			const transitionClasses =
				'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			if (index < this.currentStep) {
				// Connector before current step (completed)
				return [baseClasses, transitionClasses, 'bg-success-600'].join(' ');
			} else {
				// Connector at or after current step
				return [baseClasses, transitionClasses, 'bg-neutral-200'].join(' ');
			}
		}
	}
};

export { script as default };
