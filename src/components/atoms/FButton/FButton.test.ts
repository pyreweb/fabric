import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FButton from './FButton.vue';

describe('FButton', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FButton, {
			slots: {
				default: 'Click me'
			}
		});
		expect(wrapper.text()).toContain('Click me');
		expect(wrapper.find('button').exists()).toBe(true);
	});

	it('applies primary variant by default', () => {
		const wrapper = mount(FButton);
		const button = wrapper.find('button');
		expect(button.classes().join(' ')).toContain('bg-primary-600');
	});

	it('applies correct variant classes', () => {
		const variants = [
			'primary',
			'secondary',
			'outline',
			'ghost',
			'danger',
			'link'
		] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FButton, {
				propsData: { variant }
			});
			expect(wrapper.find('button').exists()).toBe(true);
		});
	});

	it('applies correct size classes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FButton, {
				propsData: { size }
			});
			expect(wrapper.find('button').exists()).toBe(true);
		});
	});

	it('emits click event when clicked', async () => {
		const wrapper = mount(FButton);
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('does not emit click when disabled', async () => {
		const wrapper = mount(FButton, {
			propsData: { disabled: true }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();
	});

	it('does not emit click when loading', async () => {
		const wrapper = mount(FButton, {
			propsData: { loading: true }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('click')).toBeUndefined();
	});

	it('shows loader when loading', () => {
		const wrapper = mount(FButton, {
			propsData: { loading: true }
		});
		expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
	});

	it('loader wrapper has correct alignment classes when loading', () => {
		const wrapper = mount(FButton, {
			propsData: { loading: true }
		});
		const loaderWrapper = wrapper.find('.absolute.inset-0');
		expect(loaderWrapper.classes()).toContain('flex');
		expect(loaderWrapper.classes()).toContain('items-center');
		expect(loaderWrapper.classes()).toContain('justify-center');
		expect(loaderWrapper.classes()).toContain('leading-none');
	});

	it('applies block class when block prop is true', () => {
		const wrapper = mount(FButton, {
			propsData: { block: true }
		});
		expect(wrapper.find('button').classes()).toContain('w-full');
	});

	it('applies rounded-full when rounded prop is true', () => {
		const wrapper = mount(FButton, {
			propsData: { rounded: true }
		});
		expect(wrapper.find('button').classes()).toContain('rounded-full');
	});

	it('applies square padding when iconOnly is true', () => {
		const wrapper = mount(FButton, {
			propsData: { iconOnly: true }
		});
		const buttonClasses = wrapper.find('button').classes();
		expect(buttonClasses).toContain('px-2');
		expect(buttonClasses).toContain('py-2');
		expect(buttonClasses).not.toContain('px-4');
	});

	it('sets correct button type', () => {
		const wrapper = mount(FButton, {
			propsData: { type: 'submit' }
		});
		expect(wrapper.find('button').attributes('type')).toBe('submit');
	});
});
