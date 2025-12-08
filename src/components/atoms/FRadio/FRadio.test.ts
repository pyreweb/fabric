import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FRadio from './FRadio.vue';

describe('FRadio', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test-group', value: 'option1' }
		});
		expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
	});

	it('displays label when provided', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt', label: 'Option 1' }
		});
		expect(wrapper.text()).toContain('Option 1');
	});

	it('sets correct name attribute', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'gender', value: 'male' }
		});
		expect(wrapper.find('input').attributes('name')).toBe('gender');
	});

	it('is unchecked by default', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt' }
		});
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(
			false
		);
	});

	it('is checked when modelValue matches value', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt1', modelValue: 'opt1' }
		});
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(
			true
		);
	});

	it('is unchecked when modelValue does not match value', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt1', modelValue: 'opt2' }
		});
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(
			false
		);
	});

	it('emits change event when selected', async () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'selected-value' }
		});
		await wrapper.find('input').trigger('change');
		expect(wrapper.emitted('change')).toBeTruthy();
	});

	it('applies disabled input attribute', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt', disabled: true }
		});
		expect(wrapper.find('input').attributes('disabled')).toBeDefined();
	});

	it('applies error styles to radio', () => {
		const wrapper = mount(FRadio, {
			propsData: { name: 'test', value: 'opt', error: true }
		});
		expect(wrapper.html()).toContain('border-danger');
	});
});
