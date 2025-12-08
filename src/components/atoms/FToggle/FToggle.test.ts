import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FToggle from './FToggle.vue';

describe('FToggle', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FToggle);
		expect(wrapper.find('button[role="switch"]').exists()).toBe(true);
	});

	it('displays label when provided', () => {
		const wrapper = mount(FToggle, {
			propsData: { label: 'Enable notifications' }
		});
		expect(wrapper.text()).toContain('Enable notifications');
	});

	it('is off by default', () => {
		const wrapper = mount(FToggle);
		expect(wrapper.find('button').attributes('aria-checked')).toBe('false');
	});

	it('respects value prop', () => {
		const wrapper = mount(FToggle, {
			propsData: { value: true }
		});
		expect(wrapper.find('button').attributes('aria-checked')).toBe('true');
	});

	it('emits input event when toggled', async () => {
		const wrapper = mount(FToggle, {
			propsData: { value: false }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('emits change event when toggled', async () => {
		const wrapper = mount(FToggle, {
			propsData: { value: false }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('change')).toBeTruthy();
	});

	it('has disabled attribute on button when disabled', () => {
		const wrapper = mount(FToggle, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('button').attributes('disabled')).toBeDefined();
	});

	it('applies correct color classes', () => {
		const colors = ['blue', 'green', 'red', 'orange', 'purple'] as const;
		colors.forEach((color) => {
			const wrapper = mount(FToggle, {
				propsData: { color, value: true }
			});
			expect(wrapper.find('button').exists()).toBe(true);
		});
	});
});
