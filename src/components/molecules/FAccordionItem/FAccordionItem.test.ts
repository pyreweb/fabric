import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FAccordionItem from './FAccordionItem.vue';

describe('FAccordionItem', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Section Title' },
			slots: { default: 'Content' }
		});
		expect(wrapper.text()).toContain('Section Title');
	});

	it('is closed by default', () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title' }
		});
		expect(wrapper.find('[aria-expanded="false"]').exists()).toBe(true);
	});

	it('can be open by default', () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title', defaultOpen: true }
		});
		expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
	});

	it('toggles when header is clicked', async () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title' }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
	});

	it('emits toggle event when clicked', async () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title' }
		});
		await wrapper.find('button').trigger('click');
		expect(wrapper.emitted('toggle')).toBeTruthy();
	});

	it('displays slot content', () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title' },
			slots: { default: '<p>Accordion content</p>' }
		});
		expect(wrapper.html()).toContain('Accordion content');
	});

	it('has accessible structure', () => {
		const wrapper = mount(FAccordionItem, {
			propsData: { title: 'Title' }
		});
		const button = wrapper.find('button');
		const contentId = button.attributes('aria-controls');
		expect(contentId).toBeDefined();
		expect(wrapper.find(`#${contentId}`).exists()).toBe(true);
	});
});
