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

	it('applies default w-5 h-5 size classes (size="sm") when size prop is not passed', () => {
		const wrapper = mount(FLoader);
		expect(wrapper.find('svg').classes()).toContain('w-5');
		expect(wrapper.find('svg').classes()).toContain('h-5');
	});

	it('applies correct size classes', () => {
		const sizeMap = {
			xs: ['w-4', 'h-4'],
			sm: ['w-5', 'h-5'],
			md: ['w-6', 'h-6'],
			lg: ['w-8', 'h-8'],
			xl: ['w-12', 'h-12']
		} as const;

		(Object.entries(sizeMap) as [keyof typeof sizeMap, string[]][]).forEach(
			([size, classes]) => {
				const wrapper = mount(FLoader, {
					propsData: { size }
				});
				classes.forEach((cls) => {
					expect(wrapper.find('svg').classes()).toContain(cls);
				});
			}
		);
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
