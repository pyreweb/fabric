import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FCard from './FCard.vue';

describe('FCard', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FCard, {
			slots: { default: 'Card content' }
		});
		expect(wrapper.text()).toContain('Card content');
	});

	it('displays title when provided', () => {
		const wrapper = mount(FCard, {
			propsData: { title: 'Card Title' }
		});
		expect(wrapper.text()).toContain('Card Title');
	});

	it('displays subtitle when provided', () => {
		const wrapper = mount(FCard, {
			propsData: { title: 'Title', subtitle: 'Subtitle text' }
		});
		expect(wrapper.text()).toContain('Subtitle text');
	});

	it('renders slot content', () => {
		const wrapper = mount(FCard, {
			slots: { default: '<p>Content paragraph</p>' }
		});
		expect(wrapper.html()).toContain('Content paragraph');
	});

	it('renders header slot', () => {
		const wrapper = mount(FCard, {
			slots: { header: '<h2>Custom Header</h2>' }
		});
		expect(wrapper.html()).toContain('Custom Header');
	});

	it('renders actions slot', () => {
		const wrapper = mount(FCard, {
			slots: { actions: '<button>Action</button>' }
		});
		expect(wrapper.html()).toContain('Action');
	});

	it('renders media slot', () => {
		const wrapper = mount(FCard, {
			slots: { media: '<img src="test.jpg" />' }
		});
		expect(wrapper.html()).toContain('test.jpg');
	});

	it('applies bordered class by default', () => {
		const wrapper = mount(FCard);
		expect(wrapper.classes()).toContain('border');
	});

	it('removes border when bordered is false', () => {
		const wrapper = mount(FCard, {
			propsData: { bordered: false }
		});
		expect(wrapper.classes()).not.toContain('border');
	});

	it('applies clickable styles when clickable', () => {
		const wrapper = mount(FCard, {
			propsData: { clickable: true }
		});
		expect(wrapper.classes()).toContain('cursor-pointer');
	});

	it('emits click event when clickable and clicked', async () => {
		const wrapper = mount(FCard, {
			propsData: { clickable: true }
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeTruthy();
	});

	it('does not emit click when not clickable', async () => {
		const wrapper = mount(FCard);
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeFalsy();
	});
});
