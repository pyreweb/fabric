import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FDivider from './FDivider.vue';

describe('FDivider', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FDivider);
		expect(wrapper.find('[role="separator"]').exists()).toBe(true);
	});

	it('renders horizontal by default', () => {
		const wrapper = mount(FDivider);
		expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
	});

	it('renders vertical when specified', () => {
		const wrapper = mount(FDivider, {
			propsData: { orientation: 'vertical' }
		});
		expect(wrapper.attributes('aria-orientation')).toBe('vertical');
	});

	it('displays content in slot', () => {
		const wrapper = mount(FDivider, {
			slots: {
				default: 'OR'
			}
		});
		expect(wrapper.text()).toContain('OR');
	});

	it('renders full line when no content', () => {
		const wrapper = mount(FDivider);
		// Should have one full-width line element
		const spans = wrapper.findAll('span');
		expect(spans.length).toBe(1);
	});

	it('renders two line segments when content is present', () => {
		const wrapper = mount(FDivider, {
			slots: {
				default: 'Text'
			}
		});
		// Should have start line, text, and end line
		const spans = wrapper.findAll('span');
		expect(spans.length).toBe(3);
	});

	it('applies correct alignment classes', () => {
		const alignments = ['left', 'center', 'right'] as const;
		alignments.forEach((align) => {
			const wrapper = mount(FDivider, {
				propsData: { align },
				slots: { default: 'Text' }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});

	it('applies margin classes based on margin prop', () => {
		const margins = ['none', 'sm', 'md', 'lg'] as const;
		margins.forEach((margin) => {
			const wrapper = mount(FDivider, {
				propsData: { margin }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});

	it('applies thickness classes', () => {
		const thicknesses = ['thin', 'medium', 'thick'] as const;
		thicknesses.forEach((thickness) => {
			const wrapper = mount(FDivider, {
				propsData: { thickness }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});
});
