import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FButton from './FButton.vue';

describe('FButton', () => {
	describe('variant prop', () => {
		it('renders with default variant (primary)', () => {
			const wrapper = mount(FButton);
			expect(wrapper.classes()).toContain('bg-primary-600');
		});

		it('renders with secondary variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'secondary' }
			});
			expect(wrapper.classes()).toContain('bg-primary-100');
		});

		it('renders with danger variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'danger' }
			});
			expect(wrapper.classes()).toContain('bg-danger-600');
		});

		it('renders with success variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'success' }
			});
			expect(wrapper.classes()).toContain('bg-success-600');
		});

		it('renders with outline variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'outline' }
			});
			expect(wrapper.classes()).toContain('border-neutral-300');
			expect(wrapper.classes()).toContain('bg-white');
		});

		it('renders with ghost variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'ghost' }
			});
			expect(wrapper.classes()).toContain('text-neutral-600');
		});

		it('renders with link variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'link' }
			});
			expect(wrapper.classes()).toContain('text-primary-600');
			expect(wrapper.classes()).toContain('underline');
		});
	});

	describe('click event', () => {
		it('emits click event when clicked', async () => {
			const wrapper = mount(FButton);
			await wrapper.trigger('click');
			expect(wrapper.emitted('click')).toBeTruthy();
			expect(wrapper.emitted('click')).toHaveLength(1);
		});

		it('does not emit click event when disabled', async () => {
			const wrapper = mount(FButton, {
				propsData: { disabled: true }
			});
			await wrapper.trigger('click');
			expect(wrapper.emitted('click')).toBeFalsy();
		});
	});

	describe('loading prop', () => {
		it('renders FLoader component when loading is true', () => {
			const wrapper = mount(FButton, {
				propsData: { loading: true }
			});
			expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
		});

		it('does not render FLoader component when loading is false', () => {
			const wrapper = mount(FButton, {
				propsData: { loading: false }
			});
			expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(false);
		});

		it('does not emit click event when loading', async () => {
			const wrapper = mount(FButton, {
				propsData: { loading: true }
			});
			await wrapper.trigger('click');
			expect(wrapper.emitted('click')).toBeFalsy();
		});
	});
});
