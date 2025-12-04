<template>
	<f-card :bordered="bordered">
		<!-- Header with title and edit button -->
		<template #header>
			<div class="flex items-center justify-between w-full">
				<div class="flex-1 min-w-0">
					<f-typography v-if="title" variant="h5">{{ title }}</f-typography>
					<f-typography v-if="subtitle" variant="caption">{{
						subtitle
					}}</f-typography>
				</div>
				<f-button
					v-if="!isEditing && editable"
					variant="ghost"
					size="small"
					@click="startEditing"
				>
					<slot name="edit-button-content">
						{{ editButtonLabel }}
					</slot>
				</f-button>
			</div>
		</template>

		<!-- Loading state overlay -->
		<div v-if="isLoading" class="flex items-center justify-center py-8">
			<f-loader :size="loaderSize" :label="loadingLabel" />
		</div>

		<!-- Alert for success/error messages -->
		<f-alert
			v-if="alertMessage && !isLoading"
			:variant="alertVariant"
			:message="alertMessage"
			:closable="true"
			class="mb-4"
			@close="clearAlert"
		/>

		<!-- Content area -->
		<div v-if="!isLoading">
			<!-- Edit Mode -->
			<f-form v-if="isEditing" @submit="handleSubmit">
				<!-- Avatar section with edit capability -->
				<div v-if="showAvatar" class="flex items-center gap-4 mb-4">
					<div class="relative">
						<f-avatar
							:src="avatarSrc"
							:alt="avatarAlt"
							:initials="avatarInitials"
							:name="avatarName"
							:size="avatarSize"
							:shape="avatarShape"
						/>
						<slot name="avatar-edit">
							<button
								v-if="avatarEditable"
								type="button"
								class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition-colors"
								@click="handleAvatarEdit"
							>
								<svg
									class="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
							</button>
						</slot>
					</div>
					<div class="flex-1">
						<slot name="avatar-info" />
					</div>
				</div>

				<!-- Form fields slot -->
				<slot
					name="edit-fields"
					:form-data="localFormData"
					:errors="validationErrors"
				>
					<!-- Default field rendering if fields prop is provided -->
					<div class="flex flex-col gap-4">
						<template v-for="field in fields">
							<div
								v-if="field.type === 'textarea'"
								:key="field.name"
								class="flex flex-col gap-1.5"
							>
								<label
									v-if="field.label"
									:for="`field-${field.name}`"
									:class="[
										'text-sm font-medium text-gray-700',
										{
											'after:content-[\'_*\'] after:text-red-500':
												field.required
										}
									]"
								>
									{{ field.label }}
								</label>
								<f-textarea
									:id="`field-${field.name}`"
									:value="localFormData[field.name]"
									:placeholder="field.placeholder"
									:disabled="field.disabled"
									:rows="field.rows || 3"
									:error-message="validationErrors[field.name]"
									@input="updateField(field.name, $event)"
								/>
							</div>
							<f-form-field
								v-else
								:key="field.name"
								:value="localFormData[field.name]"
								:label="field.label"
								:type="field.type || 'text'"
								:placeholder="field.placeholder"
								:required="field.required"
								:disabled="field.disabled"
								:error-message="validationErrors[field.name]"
								@input="updateField(field.name, $event)"
							/>
						</template>
					</div>
				</slot>

				<!-- Form actions -->
				<template #actions>
					<f-button
						variant="outline"
						type="button"
						:disabled="isSubmitting"
						@click="cancelEditing"
					>
						{{ cancelButtonLabel }}
					</f-button>
					<f-button
						variant="primary"
						type="submit"
						:loading="isSubmitting"
						:disabled="isSubmitting"
					>
						{{ saveButtonLabel }}
					</f-button>
				</template>
			</f-form>

			<!-- Read Mode -->
			<div v-else>
				<!-- Avatar section in read mode -->
				<div v-if="showAvatar" class="flex items-center gap-4 mb-4">
					<f-avatar
						:src="avatarSrc"
						:alt="avatarAlt"
						:initials="avatarInitials"
						:name="avatarName"
						:size="avatarSize"
						:shape="avatarShape"
					/>
					<div class="flex-1">
						<slot name="avatar-info" />
					</div>
				</div>

				<!-- Read mode content slot -->
				<slot name="read-fields" :data="value">
					<!-- Default read mode rendering if fields prop is provided -->
					<div class="flex flex-col gap-3">
						<div
							v-for="field in fields"
							:key="field.name"
							class="flex flex-col"
						>
							<f-typography variant="caption" class="text-gray-500">
								{{ field.label }}
							</f-typography>
							<f-typography variant="body">
								{{ value[field.name] || '-' }}
							</f-typography>
						</div>
					</div>
				</slot>
			</div>
		</div>
	</f-card>
</template>

<script>
import FCard from '../../molecules/FCard/FCard.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FLoader from '../../atoms/FLoader/FLoader.vue';
import FAlert from '../../molecules/FAlert/FAlert.vue';
import FForm from '../FForm/FForm.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';
import FTextarea from '../../atoms/FTextarea/FTextarea.vue';
import FAvatar from '../../atoms/FAvatar/FAvatar.vue';

export default {
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
</script>
