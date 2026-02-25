import { afterEach, describe, it, expect, vi } from 'vitest';
import { useFormValidation } from './useFormValidation';

describe('useFormValidation', () => {
	it('initializes with default state', () => {
		const emit = vi.fn();
		const state = useFormValidation({}, emit);

		expect(state.formData.value).toEqual({});
		expect(state.errors.value).toEqual({});
		expect(state.isValid.value).toBe(true);
		expect(state.isSubmitting.value).toBe(false);
	});

	it('initializes with initial data', () => {
		const emit = vi.fn();
		const initialData = { name: 'John', email: 'john@test.com' };
		const state = useFormValidation({ initialData }, emit);

		expect(state.formData.value).toEqual(initialData);
	});

	describe('setFieldValue', () => {
		it('sets a field value', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldValue('name', 'Alice');
			expect(state.formData.value.name).toBe('Alice');
		});

		it('clears field error when value is updated', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('name', 'Required');
			expect(state.errors.value.name).toBe('Required');

			state.setFieldValue('name', 'Alice');
			expect(state.errors.value.name).toBeUndefined();
		});
	});

	describe('error handling', () => {
		it('sets a field error', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('email', 'Invalid email');
			expect(state.errors.value.email).toBe('Invalid email');
			expect(state.isValid.value).toBe(false);
		});

		it('clears a specific field error', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('email', 'Invalid email');
			state.setFieldError('name', 'Required');

			state.clearFieldError('email');
			expect(state.errors.value.email).toBeUndefined();
			expect(state.errors.value.name).toBe('Required');
			expect(state.isValid.value).toBe(false);
		});

		it('updates isValid when all errors are cleared individually', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('email', 'Invalid email');
			state.setFieldError('name', 'Required');
			expect(state.isValid.value).toBe(false);

			state.clearFieldError('email');
			state.clearFieldError('name');
			expect(state.isValid.value).toBe(true);
		});

		it('clears all errors', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('email', 'Invalid email');
			state.setFieldError('name', 'Required');

			state.clearErrors();
			expect(state.errors.value).toEqual({});
			expect(state.isValid.value).toBe(true);
		});
	});

	describe('validate', () => {
		it('returns true when there are no errors', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			expect(state.validate()).toBe(true);
		});

		it('clears errors before validation', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldError('name', 'Error');
			state.validate();
			expect(state.errors.value).toEqual({});
		});
	});

	describe('handleSubmit', () => {
		it('prevents default form submission', async () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const event = new Event('submit');
			const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

			await state.handleSubmit(event);
			expect(preventDefaultSpy).toHaveBeenCalled();
		});

		it('emits submit event', async () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const event = new Event('submit');

			await state.handleSubmit(event);
			expect(emit).toHaveBeenCalledWith('submit', event);
		});

		it('executes callback with form data', async () => {
			const emit = vi.fn();
			const initialData = { name: 'John', email: 'john@test.com' };
			const state = useFormValidation({ initialData }, emit);
			const callback = vi.fn();
			const event = new Event('submit');

			await state.handleSubmit(event, callback);
			expect(callback).toHaveBeenCalledWith(initialData);
		});

		it('sets isSubmitting during submission', async () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const callback = vi.fn(async () => {
				expect(state.isSubmitting.value).toBe(true);
				await new Promise((resolve) => setTimeout(resolve, 10));
			});
			const event = new Event('submit');

			await state.handleSubmit(event, callback);
			expect(state.isSubmitting.value).toBe(false);
		});

		it('handles async callback errors', async () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const error = new Error('Submission failed');
			const callback = vi.fn(async () => {
				throw error;
			});
			const event = new Event('submit');

			await expect(state.handleSubmit(event, callback)).rejects.toThrow(
				'Submission failed'
			);
			expect(emit).toHaveBeenCalledWith('submit-error', error);
			expect(state.isSubmitting.value).toBe(false);
		});
	});

	describe('async validation edge cases', () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		it('isSubmitting stays true throughout a 200ms async callback', async () => {
			vi.useFakeTimers();
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const event = new Event('submit');

			const callback = vi.fn(
				() => new Promise<void>((resolve) => setTimeout(resolve, 200))
			);

			const submitPromise = state.handleSubmit(event, callback);

			// At t=0ms, submission has started – isSubmitting should be true
			expect(state.isSubmitting.value).toBe(true);

			// At t=100ms (halfway) – still waiting
			await vi.advanceTimersByTimeAsync(100);
			expect(state.isSubmitting.value).toBe(true);

			// At t=200ms – callback resolves
			await vi.advanceTimersByTimeAsync(100);
			await submitPromise;
			expect(state.isSubmitting.value).toBe(false);
		});

		it('isValid remains false when a late async validator sets an error while the form is submitting', async () => {
			vi.useFakeTimers();
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const event = new Event('submit');

			// Simulate a background async validator that fires at 50ms and sets an error
			setTimeout(() => {
				state.setFieldError('email', 'Email already taken');
			}, 50);

			// The submit callback takes 100ms
			const callback = vi.fn(
				() => new Promise<void>((resolve) => setTimeout(resolve, 100))
			);

			const submitPromise = state.handleSubmit(event, callback);

			// At t=0ms: no error yet, form is submitting
			expect(state.isValid.value).toBe(true);
			expect(state.isSubmitting.value).toBe(true);

			// At t=50ms: async validator fires and sets error
			await vi.advanceTimersByTimeAsync(50);
			expect(state.isValid.value).toBe(false);
			expect(state.isSubmitting.value).toBe(true);

			// At t=100ms: callback resolves
			await vi.advanceTimersByTimeAsync(50);
			await submitPromise;
			expect(state.isSubmitting.value).toBe(false);

			// isValid must still be false – the late validator error is preserved
			expect(state.isValid.value).toBe(false);
		});

		it('isSubmitting resets to false after a delayed async callback rejects', async () => {
			vi.useFakeTimers();
			const emit = vi.fn();
			const state = useFormValidation({}, emit);
			const event = new Event('submit');
			const error = new Error('Network timeout');

			const callback = vi.fn(
				() =>
					new Promise<void>((_, reject) =>
						setTimeout(() => reject(error), 100)
					)
			);

			const submitPromise = state.handleSubmit(event, callback);

			// Attach the rejection handler immediately to prevent an unhandled-rejection
			// warning when fake timers fire the rejection below.
			const assertion = expect(submitPromise).rejects.toThrow(
				'Network timeout'
			);

			// isSubmitting should be true while awaiting the callback
			expect(state.isSubmitting.value).toBe(true);

			// Advance timers to trigger the rejection
			await vi.advanceTimersByTimeAsync(100);
			await assertion;

			expect(state.isSubmitting.value).toBe(false);
			expect(emit).toHaveBeenCalledWith('submit-error', error);
		});

		it('isValid does not temporarily become true while an async validator promise is still pending', async () => {
			vi.useFakeTimers();
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			// Mark the field as pending validation by setting an error immediately
			state.setFieldError('username', 'Checking availability…');
			expect(state.isValid.value).toBe(false);

			// Advance time – validator is still pending
			await vi.advanceTimersByTimeAsync(50);
			expect(state.isValid.value).toBe(false);

			// Validator resolves with a conflict – update the error message
			state.setFieldError('username', 'Username already taken');
			expect(state.isValid.value).toBe(false);
		});

		it('isValid becomes true after an async validator resolves successfully', async () => {
			vi.useFakeTimers();
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			// Mark the field as pending validation by setting an error immediately
			state.setFieldError('username', 'Checking availability…');
			expect(state.isValid.value).toBe(false);

			// Advance time – validator is still pending
			await vi.advanceTimersByTimeAsync(50);
			expect(state.isValid.value).toBe(false);

			// Validator resolves successfully – clear the error
			state.clearFieldError('username');
			expect(state.isValid.value).toBe(true);
		});
	});

	describe('reset', () => {
		it('resets form to initial state', () => {
			const emit = vi.fn();
			const initialData = { name: 'John', email: 'john@test.com' };
			const state = useFormValidation({ initialData }, emit);

			state.setFieldValue('name', 'Alice');
			state.setFieldError('email', 'Invalid');
			state.isSubmitting.value = true;

			state.reset();
			expect(state.formData.value).toEqual(initialData);
			expect(state.errors.value).toEqual({});
			expect(state.isValid.value).toBe(true);
			expect(state.isSubmitting.value).toBe(false);
		});

		it('resets to empty object when no initial data', () => {
			const emit = vi.fn();
			const state = useFormValidation({}, emit);

			state.setFieldValue('name', 'Alice');
			state.reset();
			expect(state.formData.value).toEqual({});
		});
	});
});
