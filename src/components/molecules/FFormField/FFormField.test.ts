import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FFormField from './FFormField.vue';

describe('FFormField', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FFormField);
		expect(wrapper.findComponent({ name: 'FInput' }).exists()).toBe(true);
	});

	it('displays label when provided', () => {
		const wrapper = mount(FFormField, {
			propsData: { label: 'Email Address' }
		});
		expect(wrapper.text()).toContain('Email Address');
	});

	it('displays hint when provided', () => {
		const wrapper = mount(FFormField, {
			propsData: { hint: 'Enter a valid email' }
		});
		expect(wrapper.text()).toContain('Enter a valid email');
	});

	it('displays error message when provided', () => {
		const wrapper = mount(FFormField, {
			propsData: { errorMessage: 'This field is required' }
		});
		expect(wrapper.text()).toContain('This field is required');
	});

	it('shows required indicator when required', () => {
		const wrapper = mount(FFormField, {
			propsData: { label: 'Name', required: true }
		});
		expect(wrapper.html()).toContain('*');
	});

	it('passes value to input', () => {
		const wrapper = mount(FFormField, {
			propsData: { value: 'test@example.com' }
		});
		const input = wrapper.findComponent({ name: 'FInput' });
		expect(input.props('value')).toBe('test@example.com');
	});

	it('emits input event', async () => {
		const wrapper = mount(FFormField);
		const input = wrapper.findComponent({ name: 'FInput' });
		await input.vm.$emit('input', 'new value');
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('passes placeholder to input', () => {
		const wrapper = mount(FFormField, {
			propsData: { placeholder: 'Enter your email' }
		});
		const input = wrapper.findComponent({ name: 'FInput' });
		expect(input.props('placeholder')).toBe('Enter your email');
	});

	it('passes size to input', () => {
		const wrapper = mount(FFormField, {
			propsData: { size: 'large' }
		});
		const input = wrapper.findComponent({ name: 'FInput' });
		expect(input.props('size')).toBe('large');
	});

	it('passes disabled state to input', () => {
		const wrapper = mount(FFormField, {
			propsData: { disabled: true }
		});
		const input = wrapper.findComponent({ name: 'FInput' });
		expect(input.props('disabled')).toBe(true);
	});

	it('passes error state based on errorMessage', () => {
		const wrapper = mount(FFormField, {
			propsData: { errorMessage: 'Error!' }
		});
		const input = wrapper.findComponent({ name: 'FInput' });
		expect(input.props('error')).toBe(true);
	});
});
