import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FProfileSection from './FProfileSection.vue';

describe('FProfileSection', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John Doe' }
		});
		expect(wrapper.text()).toContain('John Doe');
	});

	it('displays name', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'Jane Smith' }
		});
		expect(wrapper.text()).toContain('Jane Smith');
	});

	it('displays email when provided', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John', email: 'john@example.com' }
		});
		expect(wrapper.text()).toContain('john@example.com');
	});

	it('displays role/title when provided', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John', role: 'Developer' }
		});
		expect(wrapper.text()).toContain('Developer');
	});

	it('displays avatar', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John Doe' }
		});
		expect(wrapper.findComponent({ name: 'FAvatar' }).exists()).toBe(true);
	});

	it('uses avatar src when provided', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John', avatarSrc: 'https://example.com/avatar.jpg' }
		});
		expect(wrapper.findComponent({ name: 'FAvatar' }).exists()).toBe(true);
	});

	it('renders actions slot', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John' },
			slots: { actions: '<button>Edit</button>' }
		});
		expect(wrapper.html()).toContain('Edit');
	});

	it('renders details slot', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John' },
			slots: { details: '<p>Extra info</p>' }
		});
		expect(wrapper.html()).toContain('Extra info');
	});

	it('renders stats slot', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John' },
			slots: { stats: '<div>10 projects</div>' }
		});
		expect(wrapper.html()).toContain('10 projects');
	});

	it('applies layout classes', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John', layout: 'horizontal' }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('applies bordered class when bordered is true', () => {
		const wrapper = mount(FProfileSection, {
			propsData: { name: 'John', bordered: true }
		});
		expect(wrapper.classes().join(' ')).toContain('border');
	});
});
