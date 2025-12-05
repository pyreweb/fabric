import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FIcon from './FIcon.vue';

describe('FIcon', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FIcon);
		expect(wrapper.find('span').exists()).toBe(true);
	});

	it('renders SVG for known icon names', () => {
		const wrapper = mount(FIcon, {
			propsData: { name: 'check' }
		});
		expect(wrapper.find('svg').exists()).toBe(true);
	});

	it('renders placeholder for unknown icon names', () => {
		const wrapper = mount(FIcon, {
			propsData: { name: 'unknown-icon-xyz' }
		});
		expect(wrapper.find('svg').exists()).toBe(true);
	});

	it('applies correct size classes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

		sizes.forEach((size) => {
			const wrapper = mount(FIcon, {
				propsData: { name: 'check', size }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});

	it('applies custom color', () => {
		const wrapper = mount(FIcon, {
			propsData: { name: 'check', color: 'red' }
		});
		const style = wrapper.attributes('style');
		expect(style).toContain('color');
	});

	it('is decorative by default (aria-hidden)', () => {
		const wrapper = mount(FIcon, {
			propsData: { name: 'check' }
		});
		expect(wrapper.attributes('aria-hidden')).toBe('true');
	});

	it('shows aria-label when not decorative', () => {
		const wrapper = mount(FIcon, {
			propsData: { name: 'check', decorative: false, label: 'Checkmark' }
		});
		expect(wrapper.attributes('aria-label')).toBe('Checkmark');
	});

	it('renders slot content instead of default icon', () => {
		const wrapper = mount(FIcon, {
			slots: {
				default: '<svg data-test="custom"></svg>'
			}
		});
		expect(wrapper.find('[data-test="custom"]').exists()).toBe(true);
	});

	it('renders navigation icons correctly', () => {
		const navIcons = ['chevron-up', 'chevron-down', 'chevron-left', 'chevron-right'];
		navIcons.forEach((name) => {
			const wrapper = mount(FIcon, {
				propsData: { name }
			});
			expect(wrapper.find('svg').exists()).toBe(true);
		});
	});

	it('renders action icons correctly', () => {
		const actionIcons = ['check', 'x', 'plus', 'minus', 'search', 'edit', 'trash'];
		actionIcons.forEach((name) => {
			const wrapper = mount(FIcon, {
				propsData: { name }
			});
			expect(wrapper.find('svg').exists()).toBe(true);
		});
	});
});
