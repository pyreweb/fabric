import { Ref } from 'vue';
/**
 * Configuration options for useFormValidation
 */
export interface FormValidationOptions {
    /**
     * Initial form data
     */
    initialData?: Record<string, any>;
}
/**
 * Return type for useFormValidation
 */
export interface FormValidationState {
    formData: Ref<Record<string, any>>;
    errors: Ref<Record<string, string>>;
    isValid: Ref<boolean>;
    isSubmitting: Ref<boolean>;
    handleSubmit: (event: Event, callback?: (data: Record<string, any>) => void | Promise<void>) => Promise<void>;
    setFieldValue: (field: string, value: any) => void;
    setFieldError: (field: string, error: string) => void;
    clearFieldError: (field: string) => void;
    clearErrors: () => void;
    reset: () => void;
    validate: () => boolean;
}
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
export declare function useFormValidation(options: FormValidationOptions | undefined, emit: (event: string, ...args: any[]) => void): FormValidationState;
