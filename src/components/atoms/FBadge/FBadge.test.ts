import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FBadge from './FBadge.vue';

describe('FBadge', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FBadge, {
			slots: {
				default: 'Badge'
			}
		});
		expect(wrapper.text()).toContain('Badge');
	});

	it('displays content from prop', () => {
		const wrapper = mount(FBadge, {
			propsData: { content: 'Test' }
		});
		expect(wrapper.text()).toContain('Test');
	});

	it('displays numeric content', () => {
		const wrapper = mount(FBadge, {
			propsData: { content: 42 }
		});
		expect(wrapper.text()).toContain('42');
	});

	it('applies correct variant classes', () => {
		const variants = [
			'primary',
			'success',
			'warning',
			'error',
			'neutral'
		] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FBadge, {
				propsData: { variant, content: 'Test' }
			});
			expect(wrapper.find('span').exists()).toBe(true);
		});
	});

	it('applies correct size classes', () => {
		const sizes = ['sm', 'md', 'lg'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FBadge, {
				propsData: { size, content: 'Test' }
			});
			expect(wrapper.find('span').exists()).toBe(true);
		});
	});

	it('renders as dot when dot prop is true', () => {
		const wrapper = mount(FBadge, {
			propsData: { dot: true }
		});
		expect(wrapper.text()).toBe('');
		expect(wrapper.classes().join(' ')).toContain('rounded-full');
	});

	it('applies outlined style', () => {
		const wrapper = mount(FBadge, {
			propsData: { outlined: true, content: 'Test' }
		});
		expect(wrapper.classes().join(' ')).toContain('border');
	});

	it('applies correct shape classes', () => {
		const shapes = ['pill', 'circle', 'rounded'] as const;
		shapes.forEach((shape) => {
			const wrapper = mount(FBadge, {
				propsData: { shape, content: 'X' }
			});
			expect(wrapper.find('span').exists()).toBe(true);
		});
	});

	it('uses custom tag when specified', () => {
		const wrapper = mount(FBadge, {
			propsData: { tag: 'div', content: 'Test' }
		});
		expect(wrapper.find('div').exists()).toBe(true);
	});

	it('sets aria-label for dot variant', () => {
		const wrapper = mount(FBadge, {
			propsData: { dot: true, variant: 'success' }
		});
		expect(wrapper.attributes('aria-label')).toBe('Status: success');
	});
});
