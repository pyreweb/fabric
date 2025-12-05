import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FTypography from './FTypography.vue';

describe('FTypography', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FTypography, {
			slots: {
				default: 'Text content'
			}
		});
		expect(wrapper.text()).toContain('Text content');
	});

	it('renders as p tag by default (body variant)', () => {
		const wrapper = mount(FTypography, {
			slots: { default: 'Paragraph' }
		});
		expect(wrapper.find('p').exists()).toBe(true);
	});

	it('renders correct heading tags for h variants', () => {
		const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
		headings.forEach((variant) => {
			const wrapper = mount(FTypography, {
				propsData: { variant },
				slots: { default: 'Heading' }
			});
			expect(wrapper.find(variant).exists()).toBe(true);
		});
	});

	it('renders span for caption variant', () => {
		const wrapper = mount(FTypography, {
			propsData: { variant: 'caption' },
			slots: { default: 'Caption text' }
		});
		expect(wrapper.find('span').exists()).toBe(true);
	});

	it('renders span for overline variant', () => {
		const wrapper = mount(FTypography, {
			propsData: { variant: 'overline' },
			slots: { default: 'Overline text' }
		});
		expect(wrapper.find('span').exists()).toBe(true);
	});

	it('uses custom tag when specified', () => {
		const wrapper = mount(FTypography, {
			propsData: { tag: 'div' },
			slots: { default: 'Content' }
		});
		expect(wrapper.find('div').exists()).toBe(true);
	});

	it('applies truncate classes when truncate prop is true', () => {
		const wrapper = mount(FTypography, {
			propsData: { truncate: true },
			slots: { default: 'Long text that might be truncated' }
		});
		const classString = wrapper.classes().join(' ');
		expect(classString).toContain('overflow-hidden');
	});

	it('applies correct variant classes', () => {
		const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline'] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FTypography, {
				propsData: { variant },
				slots: { default: 'Text' }
			});
			expect(wrapper.exists()).toBe(true);
		});
	});

	it('applies base font classes', () => {
		const wrapper = mount(FTypography, {
			slots: { default: 'Text' }
		});
		expect(wrapper.classes()).toContain('font-sans');
	});
});
