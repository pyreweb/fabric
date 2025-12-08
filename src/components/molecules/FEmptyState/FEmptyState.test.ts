import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FEmptyState from './FEmptyState.vue';

describe('FEmptyState', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'No data' }
		});
		expect(wrapper.text()).toContain('No data');
	});

	it('displays title', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Empty State Title' }
		});
		expect(wrapper.text()).toContain('Empty State Title');
	});

	it('displays description when provided', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title', description: 'Description text' }
		});
		expect(wrapper.text()).toContain('Description text');
	});

	it('displays custom icon', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title', icon: 'search' }
		});
		expect(wrapper.findComponent({ name: 'FIcon' }).exists()).toBe(true);
	});

	it('shows action button when actionLabel is provided', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title', actionLabel: 'Create New' }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
		expect(wrapper.text()).toContain('Create New');
	});

	it('hides action button when actionLabel is empty', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title' }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(false);
	});

	it('emits action event when button is clicked', async () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title', actionLabel: 'Click me' }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('action')).toBeTruthy();
	});

	it('applies correct action variant', () => {
		const wrapper = mount(FEmptyState, {
			propsData: {
				title: 'Title',
				actionLabel: 'Action',
				actionVariant: 'secondary'
			}
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('renders slot content', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title' },
			slots: { default: '<p>Custom content</p>' }
		});
		expect(wrapper.html()).toContain('Custom content');
	});

	it('has correct role for accessibility', () => {
		const wrapper = mount(FEmptyState, {
			propsData: { title: 'Title' }
		});
		expect(wrapper.find('[role="status"]').exists()).toBe(true);
	});
});
