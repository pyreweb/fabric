import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FStatCard from './FStatCard.vue';

describe('FStatCard', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Total Users', value: 1234 }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('displays label', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Revenue', value: 5000 }
		});
		expect(wrapper.text()).toContain('Revenue');
	});

	it('displays value', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Count', value: 42 }
		});
		expect(wrapper.text()).toContain('42');
	});

	it('displays string value', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Status', value: 'Active' }
		});
		expect(wrapper.text()).toContain('Active');
	});

	it('displays icon', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Test', value: 100, icon: 'user' }
		});
		expect(wrapper.findComponent({ name: 'FIcon' }).exists()).toBe(true);
	});

	it('applies correct variant classes', () => {
		const variants = ['primary', 'success', 'danger', 'info'] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FStatCard, {
				propsData: { label: 'Test', value: 100, variant }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});

	it('applies horizontal layout by default', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Test', value: 100 }
		});
		expect(wrapper.classes()).toContain('flex');
	});

	it('applies vertical layout when specified', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Test', value: 100, layout: 'vertical' }
		});
		expect(wrapper.classes()).toContain('flex-col');
	});

	it('applies border by default', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Test', value: 100 }
		});
		expect(wrapper.classes()).toContain('border');
	});

	it('removes border when bordered is false', () => {
		const wrapper = mount(FStatCard, {
			propsData: { label: 'Test', value: 100, bordered: false }
		});
		expect(wrapper.classes()).not.toContain('border');
	});
});
