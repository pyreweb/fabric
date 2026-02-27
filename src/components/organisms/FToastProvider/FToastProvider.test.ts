import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import FToastProvider from './FToastProvider.vue';
import FToast from '../../molecules/FToast/FToast.vue';

const localVue = createLocalVue();
localVue.component('FToast', FToast);

describe('FToastProvider', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('renders correctly with default slot', () => {
		const wrapper = mount(FToastProvider, {
			localVue,
			slots: { default: '<div>App Content</div>' }
		});
		expect(wrapper.text()).toContain('App Content');
	});

	it('shows toast when show method is called', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({
			variant: 'success',
			title: 'Test',
			message: 'Test message'
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(1);
	});

	it('shows success toast using success method', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.success('Success message');

		await wrapper.vm.$nextTick();
		const toasts = wrapper.findAllComponents({ name: 'FToast' });
		expect(toasts.length).toBe(1);
	});

	it('shows error toast using error method', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.error('Error message');

		await wrapper.vm.$nextTick();
		const toasts = wrapper.findAllComponents({ name: 'FToast' });
		expect(toasts.length).toBe(1);
	});

	it('shows info toast using info method', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.info('Info message');

		await wrapper.vm.$nextTick();
		const toasts = wrapper.findAllComponents({ name: 'FToast' });
		expect(toasts.length).toBe(1);
	});

	it('shows warning toast using warning method', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.warning('Warning message');

		await wrapper.vm.$nextTick();
		const toasts = wrapper.findAllComponents({ name: 'FToast' });
		expect(toasts.length).toBe(1);
	});

	it('removes toast when removeToast is called', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		const id = vm.show({
			variant: 'info',
			message: 'Test'
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(1);

		vm.removeToast(id);
		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(0);
	});

	it('clears all toasts when clear is called', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({ message: 'Toast 1' });
		vm.show({ message: 'Toast 2' });
		vm.show({ message: 'Toast 3' });

		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(3);

		vm.clear();
		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(0);
	});

	it('respects maxToasts limit', async () => {
		const wrapper = mount(FToastProvider, {
			localVue,
			propsData: { maxToasts: 3 }
		});
		const vm = wrapper.vm;

		vm.show({ message: 'Toast 1' });
		vm.show({ message: 'Toast 2' });
		vm.show({ message: 'Toast 3' });
		vm.show({ message: 'Toast 4' });

		await wrapper.vm.$nextTick();
		expect(wrapper.findAllComponents({ name: 'FToast' }).length).toBe(3);
	});

	it('uses default position when not specified', async () => {
		const wrapper = mount(FToastProvider, {
			localVue,
			propsData: { position: 'bottom-left' }
		});
		const vm = wrapper.vm;

		vm.show({ message: 'Test' });

		await wrapper.vm.$nextTick();
		expect(vm.toasts[0].position).toBe('bottom-left');
	});

	it('uses custom position when specified', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({
			message: 'Test',
			position: 'top-center'
		});

		await wrapper.vm.$nextTick();
		expect(vm.toasts[0].position).toBe('top-center');
	});

	it('emits show event when toast is shown', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({ message: 'Test' });

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('show')).toBeTruthy();
	});

	it('emits remove event when toast is removed', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		const id = vm.show({ message: 'Test' });
		await wrapper.vm.$nextTick();

		vm.removeToast(id);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('remove')).toBeTruthy();
	});

	it('emits clear event when all toasts are cleared', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({ message: 'Test' });
		await wrapper.vm.$nextTick();

		vm.clear();
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('clear')).toBeTruthy();
	});

	it('groups toasts by position', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({ message: 'Top Left', position: 'top-left' });
		vm.show({ message: 'Top Right', position: 'top-right' });
		vm.show({ message: 'Bottom Center', position: 'bottom-center' });

		await wrapper.vm.$nextTick();

		expect(vm.toastsByPosition['top-left'].length).toBe(1);
		expect(vm.toastsByPosition['top-right'].length).toBe(1);
		expect(vm.toastsByPosition['bottom-center'].length).toBe(1);
	});

	it('includes vertical spacing class on toast containers', () => {
		const wrapper = mount(FToastProvider, { localVue });

		expect(wrapper.vm.containerClasses('top-right')).toContain('space-y-2');
	});

	it('exposes global API on root instance', () => {
		const wrapper = mount(FToastProvider, { localVue });

		expect(wrapper.vm.$root.$toast).toBeDefined();
		expect(typeof wrapper.vm.$root.$toast.show).toBe('function');
		expect(typeof wrapper.vm.$root.$toast.success).toBe('function');
		expect(typeof wrapper.vm.$root.$toast.error).toBe('function');
		expect(typeof wrapper.vm.$root.$toast.info).toBe('function');
		expect(typeof wrapper.vm.$root.$toast.warning).toBe('function');
		expect(typeof wrapper.vm.$root.$toast.clear).toBe('function');
	});

	it('applies default zIndex of 9999 to container divs', async () => {
		const wrapper = mount(FToastProvider, { localVue });
		const vm = wrapper.vm;

		vm.show({ message: 'Test' });
		await wrapper.vm.$nextTick();

		const containers = wrapper.findAll('.fixed');
		expect(containers.length).toBeGreaterThan(0);
		containers.wrappers.forEach((container) => {
			expect(container.element.style.zIndex).toBe('9999');
		});
	});

	it('applies custom zIndex prop to container divs', async () => {
		const wrapper = mount(FToastProvider, {
			localVue,
			propsData: { zIndex: 1500 }
		});
		const vm = wrapper.vm;

		vm.show({ message: 'Test' });
		await wrapper.vm.$nextTick();

		const containers = wrapper.findAll('.fixed');
		expect(containers.length).toBeGreaterThan(0);
		containers.wrappers.forEach((container) => {
			expect(container.element.style.zIndex).toBe('1500');
		});
	});
});
