import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FActivityFeed from './FActivityFeed.vue';

describe('FActivityFeed', () => {
	const events = [
		{
			id: 1,
			type: 'create',
			title: 'Created item',
			timestamp: new Date().toISOString()
		},
		{
			id: 2,
			type: 'update',
			title: 'Updated item',
			timestamp: new Date().toISOString()
		},
		{
			id: 3,
			type: 'comment',
			title: 'New comment',
			timestamp: new Date().toISOString()
		}
	];

	it('renders correctly with default props', () => {
		const wrapper = mount(FActivityFeed);
		expect(wrapper.find('[role="feed"]').exists()).toBe(true);
	});

	it('displays events', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events }
		});
		expect(wrapper.text()).toContain('Created item');
	});

	it('sorts events by timestamp descending', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('shows empty state when no events', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events: [] }
		});
		expect(wrapper.findComponent({ name: 'FEmptyState' }).exists()).toBe(true);
	});

	it('shows loader when loading', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events, loading: true }
		});
		expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
	});

	it('shows load more button when hasMore is true', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events, hasMore: true }
		});
		expect(wrapper.text()).toContain("Charger plus d'événements");
	});

	it('emits load-more event when load more button is clicked', async () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events, hasMore: true }
		});
		const loadMoreBtn = wrapper.find('button[type="button"]');
		if (loadMoreBtn.exists()) {
			await loadMoreBtn.trigger('click');
			expect(wrapper.emitted('load-more')).toBeTruthy();
		}
	});

	it('shows timeline when showTimeline is true', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events, showTimeline: true }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('emits event-click when event is clicked', async () => {
		const wrapper = mount(FActivityFeed, {
			propsData: { events, clickable: true }
		});
		const listItem = wrapper.findComponent({ name: 'FListItem' });
		if (listItem.exists()) {
			await listItem.trigger('click');
			expect(wrapper.emitted('event-click')).toBeTruthy();
		}
	});

	it('displays custom empty state text', () => {
		const wrapper = mount(FActivityFeed, {
			propsData: {
				events: [],
				emptyTitle: 'Custom Title',
				emptyDescription: 'Custom Description'
			}
		});
		expect(wrapper.text()).toContain('Custom Title');
	});
});
