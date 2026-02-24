import FCard from '../../molecules/FCard/FCard.vue.js';
import FButton from '../../atoms/FButton/FButton.vue.js';
import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FStepperProgress from './FStepperProgress.vue.js';

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


var script = {
	name: 'FOnboardingStepper',
	components: {
		FCard,
		FButton,
		FIcon,
		FStepperProgress
	},
	props: {
		/**
		 * Array of step objects containing title and optional validation state.
		 * Each step: { title: string, valid?: boolean }
		 */
		steps: {
			type: Array,
			required: true,
			validator: (value) => {
				return value.every((step) => typeof step.title === 'string');
			}
		},
		/**
		 * Current step index (0-based).
		 * Use v-model or .sync for two-way binding.
		 */
		value: {
			type: Number,
			default: 0
		},
		/**
		 * Whether the current step is valid and the user can proceed.
		 * When false, the "Next" or "Complete" button is disabled.
		 */
		canProceed: {
			type: Boolean,
			default: true
		},
		/**
		 * Label for the "Previous" button
		 */
		previousLabel: {
			type: String,
			default: 'Précédent'
		},
		/**
		 * Label for the "Next" button
		 */
		nextLabel: {
			type: String,
			default: 'Suivant'
		},
		/**
		 * Label for the "Complete" button (shown on last step)
		 */
		completeLabel: {
			type: String,
			default: 'Terminer'
		},
		/**
		 * Whether the card has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		/**
		 * Current step index with v-model support
		 */
		currentStepIndex: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Extract step titles from the steps array
		 */
		stepTitles() {
			return this.steps.map((step) => step.title);
		},
		/**
		 * Total number of steps
		 */
		totalSteps() {
			return this.steps.length;
		},
		/**
		 * Check if current step is the last step
		 */
		isLastStep() {
			return this.currentStepIndex === this.totalSteps - 1;
		},
		/**
		 * Check if current step is the first step
		 */
		isFirstStep() {
			return this.currentStepIndex === 0;
		}
	},
	methods: {
		/**
		 * Navigate to the previous step
		 */
		handlePrevious() {
			if (this.currentStepIndex > 0) {
				this.currentStepIndex = this.currentStepIndex - 1;
				this.$emit('previous', this.currentStepIndex);
				this.$emit('step-change', this.currentStepIndex);
			}
		},
		/**
		 * Navigate to the next step
		 */
		handleNext() {
			if (this.canProceed && !this.isLastStep) {
				this.currentStepIndex = this.currentStepIndex + 1;
				this.$emit('next', this.currentStepIndex);
				this.$emit('step-change', this.currentStepIndex);
			}
		},
		/**
		 * Complete the stepper workflow
		 */
		handleComplete() {
			if (this.canProceed && this.isLastStep) {
				this.$emit('complete');
			}
		},
		/**
		 * Programmatically go to a specific step
		 */
		goToStep(index) {
			if (index >= 0 && index < this.totalSteps) {
				this.currentStepIndex = index;
				this.$emit('step-change', index);
			}
		}
	}
};

export { script as default };
