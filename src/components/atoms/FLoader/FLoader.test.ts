import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FLoader from './FLoader.vue';

describe('FLoader', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FLoader);
		expect(wrapper.find('[role="status"]').exists()).toBe(true);
	});

	it('renders SVG spinner', () => {
		const wrapper = mount(FLoader);
		expect(wrapper.find('svg').exists()).toBe(true);
		expect(wrapper.find('svg').classes()).toContain('animate-spin');
	});

	it('applies correct size classes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

		sizes.forEach((size) => {
			const wrapper = mount(FLoader, {
				propsData: { size }
			});
			expect(wrapper.find('svg').exists()).toBe(true);
		});
	});

	it('applies custom color', () => {
		const wrapper = mount(FLoader, {
			propsData: { color: 'red' }
		});
		expect(wrapper.find('svg').attributes('style')).toContain('color: red');
	});

	it('renders overlay when overlay prop is true', () => {
		const wrapper = mount(FLoader, {
			propsData: { overlay: true }
		});
		expect(wrapper.classes()).toContain('fixed');
		expect(wrapper.classes()).toContain('inset-0');
	});

	it('applies centered class when centered prop is true', () => {
		const wrapper = mount(FLoader, {
			propsData: { centered: true }
		});
		const container = wrapper.find('[role="status"]');
		expect(container.classes()).toContain('absolute');
	});

	it('has correct aria-label', () => {
		const wrapper = mount(FLoader);
		expect(wrapper.find('[role="status"]').attributes('aria-label')).toBe(
			'Chargement en cours'
		);
	});

	it('accepts custom aria-label', () => {
		const wrapper = mount(FLoader, {
			propsData: { label: 'Loading data...' }
		});
		expect(wrapper.find('[role="status"]').attributes('aria-label')).toBe(
			'Loading data...'
		);
	});
});
