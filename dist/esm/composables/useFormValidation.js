import { ref } from 'vue';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable for managing form validation and submission
 *
 * Provides a simple interface for form handling with built-in validation state.
 * Can be extended with custom validation logic.
 *
 * @param options - Configuration options for the form validation
 * @param emit - Emit function from the component setup
 * @returns Object containing reactive state and methods for form operations
 *
 * @example
 * ```ts
 * const formState = useFormValidation({
 *   initialData: { name: '', email: '' }
 * }, emit);
 *
 * // In submit handler
 * await formState.handleSubmit(event, async (data) => {
 *   await api.submitForm(data);
 * });
 * ```
 */
function useFormValidation(options = {}, emit) {
    const { initialData = {} } = options;
    // Reactive state
    const formData = ref({ ...initialData });
    const errors = ref({});
    const isValid = ref(true);
    const isSubmitting = ref(false);
    /**
     * Set a field value
     */
    const setFieldValue = (field, value) => {
        formData.value[field] = value;
        // Clear error when field is updated
        clearFieldError(field);
    };
    /**
     * Set a field error
     */
    const setFieldError = (field, error) => {
        errors.value[field] = error;
        isValid.value = false;
    };
    /**
     * Clear a specific field error
     */
    const clearFieldError = (field) => {
        if (errors.value[field]) {
            delete errors.value[field];
            // Recalculate overall validity
            isValid.value = Object.keys(errors.value).length === 0;
        }
    };
    /**
     * Clear all errors
     */
    const clearErrors = () => {
        errors.value = {};
        isValid.value = true;
    };
    /**
     * Validate form (can be overridden with custom validation logic)
     * Returns true if valid, false otherwise
     */
    const validate = () => {
        clearErrors();
        // Basic validation - can be extended with custom logic
        // For now, just check if there are no errors
        return isValid.value;
    };
    /**
     * Handle form submission
     */
    const handleSubmit = async (event, callback) => {
        event.preventDefault();
        // Emit submit event with the event object
        emit('submit', event);
        // If callback is provided, validate and execute it
        if (callback) {
            if (!validate()) {
                return;
            }
            isSubmitting.value = true;
            try {
                await callback(formData.value);
            }
            catch (error) {
                // Emit error event if submission fails
                emit('submit-error', error);
                throw error;
            }
            finally {
                isSubmitting.value = false;
            }
        }
    };
    /**
     * Reset form to initial state
     */
    const reset = () => {
        formData.value = { ...initialData };
        clearErrors();
        isSubmitting.value = false;
    };
    return {
        // Form data
        formData,
        // Validation state
        errors,
        isValid,
        isSubmitting,
        // Methods
        handleSubmit,
        setFieldValue,
        setFieldError,
        clearFieldError,
        clearErrors,
        reset,
        validate
    };
}

export { useFormValidation };
