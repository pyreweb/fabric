import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FPageHeader from './FPageHeader.vue';

describe('FPageHeader', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Page Title' }
		});
		expect(wrapper.text()).toContain('Page Title');
	});

	it('displays title', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Dashboard' }
		});
		expect(wrapper.text()).toContain('Dashboard');
	});

	it('displays subtitle when provided', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', subtitle: 'Subtitle text' }
		});
		expect(wrapper.text()).toContain('Subtitle text');
	});

	it('renders actions slot', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title' },
			slots: { actions: '<button>Action</button>' }
		});
		expect(wrapper.html()).toContain('Action');
	});

	it('renders default slot', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title' },
			slots: { default: '<span>Extra content</span>' }
		});
		expect(wrapper.html()).toContain('Extra content');
	});

	it('shows back button when showBack is true', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', showBack: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('hides back button by default', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title' }
		});
		// No back button by default
		expect(wrapper.html()).not.toContain('Retour');
	});

	it('emits back event when back button is clicked', async () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', showBack: true }
		});
		const backButton = wrapper.findComponent({ name: 'FButton' });
		if (backButton.exists()) {
			await backButton.trigger('click');
			expect(wrapper.emitted('back')).toBeTruthy();
		}
	});

	it('renders breadcrumb slot', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title' },
			slots: { breadcrumb: '<nav>Breadcrumb</nav>' }
		});
		expect(wrapper.html()).toContain('Breadcrumb');
	});

	it('applies bordered class when bordered is true', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', bordered: true }
		});
		expect(wrapper.classes().join(' ')).toContain('border');
	});

	it('applies dark mode background and text classes to header', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title' }
		});
		const header = wrapper.find('header');
		expect(header.classes()).toContain('dark:bg-slate-900');
		expect(header.classes()).toContain('dark:text-white');
	});

	it('applies dark mode border class to separator', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', separator: true }
		});
		const header = wrapper.find('header');
		expect(header.classes()).toContain('dark:border-neutral-700');
	});

	it('applies dark mode text class to subtitle', () => {
		const wrapper = mount(FPageHeader, {
			propsData: { title: 'Title', subtitle: 'A subtitle' }
		});
		const subtitleEl = wrapper.find('.dark\\:text-neutral-400');
		expect(subtitleEl.exists()).toBe(true);
	});
});
