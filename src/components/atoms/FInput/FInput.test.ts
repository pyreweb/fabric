import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FInput from './FInput.vue';

describe('FInput', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FInput);
		expect(wrapper.find('input').exists()).toBe(true);
	});

	it('renders with correct type', () => {
		const types = ['text', 'email', 'password', 'number'];
		types.forEach((type) => {
			const wrapper = mount(FInput, {
				propsData: { type }
			});
			expect(wrapper.find('input').attributes('type')).toBe(type);
		});
	});

	it('displays placeholder', () => {
		const wrapper = mount(FInput, {
			propsData: { placeholder: 'Enter text...' }
		});
		expect(wrapper.find('input').attributes('placeholder')).toBe(
			'Enter text...'
		);
	});

	it('displays value', () => {
		const wrapper = mount(FInput, {
			propsData: { value: 'Test value' }
		});
		expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
			'Test value'
		);
	});

	it('emits input event when typing', async () => {
		const wrapper = mount(FInput);
		await wrapper.find('input').setValue('New value');
		expect(wrapper.emitted('input')).toBeTruthy();
		expect(wrapper.emitted('input')![0]).toEqual(['New value']);
	});

	it('applies correct size classes', () => {
		const sizes = ['small', 'medium', 'large'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FInput, {
				propsData: { size }
			});
			expect(wrapper.find('input').exists()).toBe(true);
		});
	});

	it('applies disabled state', () => {
		const wrapper = mount(FInput, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('input').attributes('disabled')).toBeDefined();
		expect(wrapper.find('input').classes()).toContain('cursor-not-allowed');
	});

	it('applies readonly state', () => {
		const wrapper = mount(FInput, {
			propsData: { readonly: true }
		});
		expect(wrapper.find('input').attributes('readonly')).toBeDefined();
	});

	it('applies error styles', () => {
		const wrapper = mount(FInput, {
			propsData: { error: true }
		});
		expect(wrapper.find('input').classes().join(' ')).toContain(
			'border-danger'
		);
	});
});
