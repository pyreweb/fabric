import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FButton from './FButton.vue';

describe('FButton', () => {
	it('renders correctly with default slot content', () => {
		const wrapper = mount(FButton, {
			slots: { default: 'Click me' }
		});
		expect(wrapper.text()).toContain('Click me');
		expect(wrapper.element.tagName).toBe('BUTTON');
	});

	it('emits click event when clicked', async () => {
		const wrapper = mount(FButton);
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('does not emit click event when disabled', async () => {
		const wrapper = mount(FButton, {
			props: { disabled: true }
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();
	});

	it('does not emit click event when loading', async () => {
		const wrapper = mount(FButton, {
			props: { loading: true }
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();
	});

	it('applies variant classes correctly', () => {
		const wrapper = mount(FButton, {
			props: { variant: 'danger' }
		});
		expect(wrapper.classes()).toContain('bg-red-600');
		expect(wrapper.classes()).toContain('text-white');
	});

	it('applies size classes correctly', () => {
		const wrapper = mount(FButton, {
			props: { size: 'lg' }
		});
		expect(wrapper.classes()).toContain('text-base');
		expect(wrapper.classes()).toContain('px-4');
	});

	it('applies block class when block prop is true', () => {
		const wrapper = mount(FButton, {
			props: { block: true }
		});
		expect(wrapper.classes()).toContain('w-full');
	});

	it('shows loader when loading is true', () => {
		const wrapper = mount(FButton, {
			props: { loading: true }
		});
		expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
	});
});
