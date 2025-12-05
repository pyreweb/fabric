import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FListItem from './FListItem.vue';

describe('FListItem', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FListItem);
		expect(wrapper.exists()).toBe(true);
	});

	it('displays title when provided', () => {
		const wrapper = mount(FListItem, {
			propsData: { title: 'Item Title' }
		});
		expect(wrapper.text()).toContain('Item Title');
	});

	it('displays subtitle when provided', () => {
		const wrapper = mount(FListItem, {
			propsData: { title: 'Title', subtitle: 'Subtitle text' }
		});
		expect(wrapper.text()).toContain('Subtitle text');
	});

	it('is not clickable by default', () => {
		const wrapper = mount(FListItem);
		expect(wrapper.attributes('role')).toBeUndefined();
	});

	it('is clickable when clickable prop is true', () => {
		const wrapper = mount(FListItem, {
			propsData: { clickable: true }
		});
		expect(wrapper.attributes('role')).toBe('button');
	});

	it('emits click event when clickable and clicked', async () => {
		const wrapper = mount(FListItem, {
			propsData: { clickable: true }
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeTruthy();
	});

	it('does not emit click when not clickable', async () => {
		const wrapper = mount(FListItem);
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeFalsy();
	});

	it('does not emit click when disabled', async () => {
		const wrapper = mount(FListItem, {
			propsData: { clickable: true, disabled: true }
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeFalsy();
	});

	it('applies selected styles when selected', () => {
		const wrapper = mount(FListItem, {
			propsData: { selected: true }
		});
		expect(wrapper.classes().join(' ')).toContain('bg-primary-50');
	});

	it('renders left slot', () => {
		const wrapper = mount(FListItem, {
			slots: { left: '<span>Left content</span>' }
		});
		expect(wrapper.html()).toContain('Left content');
	});

	it('renders right slot', () => {
		const wrapper = mount(FListItem, {
			slots: { right: '<span>Right content</span>' }
		});
		expect(wrapper.html()).toContain('Right content');
	});

	it('renders content slot', () => {
		const wrapper = mount(FListItem, {
			slots: { content: '<div>Custom content</div>' }
		});
		expect(wrapper.html()).toContain('Custom content');
	});

	it('applies truncate to text when truncate is true', () => {
		const wrapper = mount(FListItem, {
			propsData: { title: 'Long title', truncate: true }
		});
		expect(wrapper.exists()).toBe(true);
	});
});
