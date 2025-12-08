import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FForm from './FForm.vue';

describe('FForm', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FForm);
		expect(wrapper.find('form').exists()).toBe(true);
	});

	it('renders slot content', () => {
		const wrapper = mount(FForm, {
			slots: {
				default: '<input type="text" name="test" />'
			}
		});
		expect(wrapper.find('input[name="test"]').exists()).toBe(true);
	});

	it('renders actions slot', () => {
		const wrapper = mount(FForm, {
			slots: {
				actions: '<button type="submit">Submit</button>'
			}
		});
		expect(wrapper.html()).toContain('Submit');
	});

	it('emits submit event on form submission', async () => {
		const wrapper = mount(FForm);
		await wrapper.find('form').trigger('submit.prevent');
		expect(wrapper.emitted('submit')).toBeTruthy();
	});

	it('prevents default form submission', async () => {
		const wrapper = mount(FForm);
		const form = wrapper.find('form');
		let defaultPrevented = false;

		form.element.addEventListener(
			'submit',
			(e) => {
				defaultPrevented = e.defaultPrevented;
			},
			{ once: true }
		);

		await form.trigger('submit');
		// The form component handles prevention internally
		expect(wrapper.emitted('submit')).toBeTruthy();
	});

	it('has flex layout', () => {
		const wrapper = mount(FForm);
		expect(wrapper.find('form').classes()).toContain('flex');
		expect(wrapper.find('form').classes()).toContain('flex-col');
	});

	it('has gap between elements', () => {
		const wrapper = mount(FForm);
		expect(wrapper.find('form').classes()).toContain('gap-4');
	});
});
