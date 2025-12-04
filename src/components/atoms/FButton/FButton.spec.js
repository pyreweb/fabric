import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FButton from './FButton.vue';

describe('FButton', () => {
	describe('variant prop', () => {
		it('renders with default variant (primary)', () => {
			const wrapper = mount(FButton);
			expect(wrapper.classes()).toContain('bg-blue-600');
		});

		it('renders with secondary variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'secondary' }
			});
			expect(wrapper.classes()).toContain('bg-blue-100');
		});

		it('renders with danger variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'danger' }
			});
			expect(wrapper.classes()).toContain('bg-red-600');
		});

		it('renders with success variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'success' }
			});
			expect(wrapper.classes()).toContain('bg-green-600');
		});

		it('renders with outline variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'outline' }
			});
			expect(wrapper.classes()).toContain('border-gray-300');
			expect(wrapper.classes()).toContain('bg-white');
		});

		it('renders with ghost variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'ghost' }
			});
			expect(wrapper.classes()).toContain('text-gray-600');
		});

		it('renders with link variant', () => {
			const wrapper = mount(FButton, {
				propsData: { variant: 'link' }
			});
			expect(wrapper.classes()).toContain('text-blue-600');
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
});
