import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FDrawer from './FDrawer.vue';

describe('FDrawer', () => {
	it('renders correctly when open', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, title: 'Test Drawer' }
		});
		expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
	});

	it('does not render when closed', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: false }
		});
		expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
	});

	it('displays title', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, title: 'Drawer Title' }
		});
		expect(wrapper.text()).toContain('Drawer Title');
	});

	it('displays subtitle', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, title: 'Title', subtitle: 'Subtitle' }
		});
		expect(wrapper.text()).toContain('Subtitle');
	});

	it('renders body slot', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true },
			slots: { body: '<p>Body content</p>' }
		});
		expect(wrapper.html()).toContain('Body content');
	});

	it('renders actions slot', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true },
			slots: { actions: '<button>Action</button>' }
		});
		expect(wrapper.html()).toContain('Action');
	});

	it('shows close button by default', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('hides close button when closable is false', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, closable: false }
		});
		expect(wrapper.findAllComponents({ name: 'FButton' }).length).toBe(0);
	});

	it('emits close when close button is clicked', async () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('emits input false when close button is clicked', async () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('closes on overlay click when closeOnOverlay is true', async () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, closeOnOverlay: true }
		});
		await wrapper.find('.bg-black').trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('does not close on overlay click when closeOnOverlay is false', async () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, closeOnOverlay: false }
		});
		await wrapper.find('.bg-black').trigger('click');
		expect(wrapper.emitted('close')).toBeFalsy();
	});

	it('applies correct size classes', () => {
		const sizes = ['small', 'medium', 'large'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FDrawer, {
				propsData: { value: true, size }
			});
			expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
		});
	});

	it('applies correct position classes for left', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, position: 'left' }
		});
		expect(wrapper.find('[role="dialog"]').classes()).toContain('w-80');
	});

	it('applies correct position classes for right', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, position: 'right' }
		});
		expect(wrapper.find('[role="dialog"]').classes()).toContain('w-80');
	});

	it('applies correct position classes for top', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, position: 'top' }
		});
		expect(wrapper.find('[role="dialog"]').classes()).toContain('h-80');
	});

	it('applies correct position classes for bottom', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, position: 'bottom' }
		});
		expect(wrapper.find('[role="dialog"]').classes()).toContain('h-80');
	});

	it('applies border when bordered is true', () => {
		const wrapper = mount(FDrawer, {
			propsData: { value: true, bordered: true }
		});
		expect(wrapper.find('[role="dialog"]').classes().join(' ')).toContain(
			'border'
		);
	});
});
