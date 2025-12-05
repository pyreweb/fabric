import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FTextarea from './FTextarea.vue';

describe('FTextarea', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FTextarea);
		expect(wrapper.find('textarea').exists()).toBe(true);
	});

	it('displays label when provided', () => {
		const wrapper = mount(FTextarea, {
			propsData: { label: 'Description' }
		});
		expect(wrapper.text()).toContain('Description');
	});

	it('displays placeholder', () => {
		const wrapper = mount(FTextarea, {
			propsData: { placeholder: 'Enter text...' }
		});
		expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text...');
	});

	it('displays value', () => {
		const wrapper = mount(FTextarea, {
			propsData: { value: 'Test content' }
		});
		expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Test content');
	});

	it('emits input event when typing', async () => {
		const wrapper = mount(FTextarea);
		await wrapper.find('textarea').setValue('New content');
		expect(wrapper.emitted('input')).toBeTruthy();
		expect(wrapper.emitted('input')![0]).toEqual(['New content']);
	});

	it('sets correct rows attribute', () => {
		const wrapper = mount(FTextarea, {
			propsData: { rows: 5 }
		});
		expect(wrapper.find('textarea').attributes('rows')).toBe('5');
	});

	it('applies disabled state', () => {
		const wrapper = mount(FTextarea, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
		expect(wrapper.find('textarea').classes()).toContain('cursor-not-allowed');
	});

	it('applies readonly state', () => {
		const wrapper = mount(FTextarea, {
			propsData: { readonly: true }
		});
		expect(wrapper.find('textarea').attributes('readonly')).toBeDefined();
	});

	it('applies error styles', () => {
		const wrapper = mount(FTextarea, {
			propsData: { error: true }
		});
		expect(wrapper.find('textarea').classes().join(' ')).toContain('border-danger');
	});

	it('displays error message', () => {
		const wrapper = mount(FTextarea, {
			propsData: { errorMessage: 'This field is required' }
		});
		expect(wrapper.text()).toContain('This field is required');
	});

	it('displays character counter when showCounter and maxlength are set', () => {
		const wrapper = mount(FTextarea, {
			propsData: { showCounter: true, maxlength: 100, value: 'Hello' }
		});
		expect(wrapper.text()).toContain('5/100');
	});

	it('sets maxlength attribute', () => {
		const wrapper = mount(FTextarea, {
			propsData: { maxlength: 200 }
		});
		expect(wrapper.find('textarea').attributes('maxlength')).toBe('200');
	});

});
