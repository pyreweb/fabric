<template>
	<nav aria-label="Progression des étapes" class="w-full">
		<ol class="flex items-center w-full">
			<li
				v-for="(step, index) in steps"
				:key="index"
				:class="stepContainerClasses(index)"
			>
				<!-- Step indicator circle -->
				<div class="flex items-center">
					<span
						:class="stepCircleClasses(index)"
						:aria-current="index === currentStep ? 'step' : null"
					>
						<!-- Completed step: checkmark -->
						<svg
							v-if="index < currentStep"
							class="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<!-- Current or future step: number -->
						<span v-else class="text-sm font-medium">{{ index + 1 }}</span>
					</span>
				</div>

				<!-- Step title -->
				<span :class="stepTitleClasses(index)">
					{{ step }}
				</span>

				<!-- Connector line (not for last step) -->
				<div
					v-if="index < steps.length - 1"
					:class="connectorClasses(index)"
				></div>
			</li>
		</ol>
	</nav>
</template>

<script>
export default {
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
			const transitionClasses = 'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

			if (index < this.currentStep) {
				// Completed step
				return [baseClasses, transitionClasses, 'bg-success-600 text-white'].join(' ');
			} else if (index === this.currentStep) {
				// Current step
				return [baseClasses, transitionClasses, 'bg-primary-600 text-white'].join(' ');
			} else {
				// Future step
				return [baseClasses, transitionClasses, 'bg-neutral-200 text-neutral-500'].join(' ');
			}
		},
		/**
		 * Get classes for step title
		 */
		stepTitleClasses(index) {
			const baseClasses =
				'ml-2 text-sm font-medium';
			const transitionClasses = 'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

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
			const transitionClasses = 'transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]';

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
</script>
