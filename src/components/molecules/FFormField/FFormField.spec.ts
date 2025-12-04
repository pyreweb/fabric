import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FFormField from './FFormField.vue';

describe('FFormField', () => {
	describe('id generation', () => {
		it('generates unique IDs for multiple instances', () => {
			const wrapper1 = mount(FFormField);
			const wrapper2 = mount(FFormField);

			const input1 = wrapper1.find('input');
			const input2 = wrapper2.find('input');

			const id1 = input1.attributes('id');
			const id2 = input2.attributes('id');

			expect(id1).toBeTruthy();
			expect(id2).toBeTruthy();
			expect(id1).not.toBe(id2);
			expect(id1).toMatch(/^f-form-field-\d+$/);
			expect(id2).toMatch(/^f-form-field-\d+$/);
		});

		it('uses custom id when provided via prop', () => {
			const customId = 'my-custom-field';
			const wrapper = mount(FFormField, {
				propsData: { id: customId }
			});

			const input = wrapper.find('input');
			expect(input.attributes('id')).toBe(customId);
		});

		it('links label to input via for attribute', () => {
			const wrapper = mount(FFormField, {
				propsData: { label: 'Test Label' }
			});

			const label = wrapper.find('label');
			const input = wrapper.find('input');

			expect(label.attributes('for')).toBe(input.attributes('id'));
		});

		it('links label to custom id when provided', () => {
			const customId = 'custom-linked-field';
			const wrapper = mount(FFormField, {
				propsData: { id: customId, label: 'Test Label' }
			});

			const label = wrapper.find('label');
			expect(label.attributes('for')).toBe(customId);
		});
	});

	describe('label prop', () => {
		it('renders label when provided', () => {
			const wrapper = mount(FFormField, {
				propsData: { label: 'Email Address' }
			});

			expect(wrapper.find('label').exists()).toBe(true);
			expect(wrapper.find('label').text()).toBe('Email Address');
		});

		it('does not render label when empty', () => {
			const wrapper = mount(FFormField);

			expect(wrapper.find('label').exists()).toBe(false);
		});

		it('shows asterisk when required', () => {
			const wrapper = mount(FFormField, {
				propsData: { label: 'Required Field', required: true }
			});

			const label = wrapper.find('label');
			expect(label.classes()).toContain("after:content-['_*']");
		});
	});

	describe('input events', () => {
		it('emits input event when value changes', async () => {
			const wrapper = mount(FFormField);
			const input = wrapper.find('input');

			await input.setValue('test value');

			expect(wrapper.emitted('input')).toBeTruthy();
			expect(wrapper.emitted('input')?.[0]).toEqual(['test value']);
		});
	});

	describe('error and hint messages', () => {
		it('renders error message when provided', () => {
			const wrapper = mount(FFormField, {
				propsData: { errorMessage: 'This field is required' }
			});

			const errorSpan = wrapper.find('.text-danger-500');
			expect(errorSpan.exists()).toBe(true);
			expect(errorSpan.text()).toBe('This field is required');
		});

		it('renders hint when provided and no error', () => {
			const wrapper = mount(FFormField, {
				propsData: { hint: 'Enter your email' }
			});

			const hintSpan = wrapper.find('.text-neutral-500');
			expect(hintSpan.exists()).toBe(true);
			expect(hintSpan.text()).toBe('Enter your email');
		});

		it('error message takes precedence over hint', () => {
			const wrapper = mount(FFormField, {
				propsData: {
					hint: 'Enter your email',
					errorMessage: 'Invalid email'
				}
			});

			expect(wrapper.find('.text-danger-500').text()).toBe('Invalid email');
			expect(wrapper.findAll('.text-neutral-500').length).toBe(0);
		});
	});
});
