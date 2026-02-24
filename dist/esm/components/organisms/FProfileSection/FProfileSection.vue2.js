import FCard from '../../molecules/FCard/FCard.vue.js';
import FTypography from '../../atoms/FTypography/FTypography.vue.js';
import FButton from '../../atoms/FButton/FButton.vue.js';
import FLoader from '../../atoms/FLoader/FLoader.vue.js';
import FAlert from '../../molecules/FAlert/FAlert.vue.js';
import FForm from '../FForm/FForm.vue.js';
import FFormField from '../../molecules/FFormField/FFormField.vue.js';
import FTextarea from '../../atoms/FTextarea/FTextarea.vue.js';
import FAvatar from '../../atoms/FAvatar/FAvatar.vue.js';

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


var script = {
	name: 'FProfileSection',
	components: {
		FCard,
		FTypography,
		FButton,
		FLoader,
		FAlert,
		FForm,
		FFormField,
		FTextarea,
		FAvatar
	},
	props: {
		/**
		 * Section title
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Section subtitle
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Data object containing the profile/entity information
		 * Used for v-model support
		 */
		value: {
			type: Object,
			default: () => ({})
		},
		/**
		 * Field definitions for automatic form generation
		 * Each field: { name, label, type, placeholder, required, disabled, rows (for textarea) }
		 */
		fields: {
			type: Array,
			default: () => []
		},
		/**
		 * Whether the section is currently in editing mode
		 */
		editing: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the section is editable (shows edit button)
		 */
		editable: {
			type: Boolean,
			default: true
		},
		/**
		 * Whether the section is currently loading data
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the form is currently submitting
		 */
		submitting: {
			type: Boolean,
			default: false
		},
		/**
		 * Custom validation function
		 * Should return an object with field names as keys and error messages as values
		 * Return empty object if validation passes
		 */
		validate: {
			type: Function,
			default: null
		},
		/**
		 * Avatar image source URL
		 */
		avatarSrc: {
			type: String,
			default: ''
		},
		/**
		 * Avatar alt text
		 */
		avatarAlt: {
			type: String,
			default: ''
		},
		/**
		 * Avatar initials
		 */
		avatarInitials: {
			type: String,
			default: ''
		},
		/**
		 * Avatar name (for computing initials)
		 */
		avatarName: {
			type: String,
			default: ''
		},
		/**
		 * Avatar size
		 */
		avatarSize: {
			type: String,
			default: 'lg',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Avatar shape
		 */
		avatarShape: {
			type: String,
			default: 'circle',
			validator: (value) => ['circle', 'square'].includes(value)
		},
		/**
		 * Whether the avatar can be edited
		 */
		avatarEditable: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the card has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		},
		/**
		 * Loader size
		 */
		loaderSize: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Loading state label for accessibility
		 */
		loadingLabel: {
			type: String,
			default: 'Chargement en cours'
		},
		/**
		 * Edit button label
		 */
		editButtonLabel: {
			type: String,
			default: 'Modifier'
		},
		/**
		 * Save button label
		 */
		saveButtonLabel: {
			type: String,
			default: 'Enregistrer'
		},
		/**
		 * Cancel button label
		 */
		cancelButtonLabel: {
			type: String,
			default: 'Annuler'
		}
	},
	data() {
		return {
			internalEditing: false,
			localFormData: {},
			validationErrors: {},
			alertMessage: '',
			alertVariant: 'info'
		};
	},
	computed: {
		/**
		 * Computed property for editing mode with v-model support
		 */
		isEditing: {
			get() {
				return this.editing || this.internalEditing;
			},
			set(value) {
				this.internalEditing = value;
				this.$emit('update:editing', value);
			}
		},
		/**
		 * Computed property for loading state
		 */
		isLoading() {
			return this.loading;
		},
		/**
		 * Computed property for submitting state
		 */
		isSubmitting() {
			return this.submitting;
		},
		/**
		 * Check if avatar should be displayed
		 */
		showAvatar() {
			return this.avatarSrc || this.avatarInitials || this.avatarName;
		}
	},
	watch: {
		/**
		 * Watch for changes in value prop to update local form data
		 */
		value: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.localFormData = { ...newValue };
			}
		},
		/**
		 * Watch editing prop changes
		 */
		editing: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					this.localFormData = { ...this.value };
					this.validationErrors = {};
				}
			}
		}
	},
	methods: {
		/**
		 * Start editing mode
		 */
		startEditing() {
			this.localFormData = { ...this.value };
			this.validationErrors = {};
			this.clearAlert();
			this.isEditing = true;
			this.$emit('edit-start');
		},
		/**
		 * Cancel editing and return to read mode
		 */
		cancelEditing() {
			this.localFormData = { ...this.value };
			this.validationErrors = {};
			this.isEditing = false;
			this.$emit('edit-cancel');
		},
		/**
		 * Update a specific field in the form data
		 */
		updateField(fieldName, value) {
			this.localFormData = {
				...this.localFormData,
				[fieldName]: value
			};
			// Clear validation error for this field when it's updated
			if (this.validationErrors[fieldName]) {
				const { [fieldName]: removed, ...rest } = this.validationErrors;
				this.validationErrors = rest;
			}
			this.$emit('field-change', {
				field: fieldName,
				value,
				formData: this.localFormData
			});
		},
		/**
		 * Validate the form data
		 * Returns true if valid, false otherwise
		 */
		validateForm() {
			// Run custom validation if provided
			if (this.validate) {
				this.validationErrors = this.validate(this.localFormData) || {};
				return Object.keys(this.validationErrors).length === 0;
			}

			// Default required field validation
			const errors = {};
			for (const field of this.fields) {
				if (field.required && !this.localFormData[field.name]) {
					errors[field.name] = `${field.label} est requis`;
				}
			}
			this.validationErrors = errors;
			return Object.keys(errors).length === 0;
		},
		/**
		 * Handle form submission
		 */
		handleSubmit() {
			if (!this.validateForm()) {
				return;
			}

			this.$emit('submit', {
				data: { ...this.localFormData },
				done: this.handleSubmitSuccess,
				fail: this.handleSubmitError
			});
		},
		/**
		 * Handle successful submission
		 */
		handleSubmitSuccess(message = 'Modifications enregistrées avec succès') {
			this.$emit('input', { ...this.localFormData });
			this.isEditing = false;
			this.showAlert('success', message);
			this.$emit('save-success', { data: this.localFormData, message });
		},
		/**
		 * Handle submission error
		 */
		handleSubmitError(
			message = "Une erreur est survenue lors de l'enregistrement"
		) {
			this.showAlert('error', message);
			this.$emit('save-error', { data: this.localFormData, message });
		},
		/**
		 * Handle avatar edit button click
		 */
		handleAvatarEdit() {
			this.$emit('avatar-edit');
		},
		/**
		 * Show alert message
		 */
		showAlert(variant, message) {
			this.alertVariant = variant;
			this.alertMessage = message;
		},
		/**
		 * Clear alert message
		 */
		clearAlert() {
			this.alertMessage = '';
		}
	}
};

export { script as default };
