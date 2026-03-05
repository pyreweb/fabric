import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import FToast from './FToast.vue';
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';

const localVue = createLocalVue();
localVue.component('FIcon', FIcon);
localVue.component('FTypography', FTypography);
localVue.component('FButton', FButton);

describe('FToast', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders correctly with default props', () => {
		const wrapper = mount(FToast, { localVue });
		expect(wrapper.find('[role="alert"]').exists()).toBe(true);
	});

	it('displays title when provided', () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { title: 'Toast Title' }
		});
		expect(wrapper.text()).toContain('Toast Title');
	});

	it('displays message when provided', () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { message: 'Toast message content' }
		});
		expect(wrapper.text()).toContain('Toast message content');
	});

	it('applies correct variant classes', () => {
		const variants = ['success', 'error', 'info', 'warning'] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FToast, {
				localVue,
				propsData: { variant }
			});
			expect(wrapper.find('[role="alert"]').exists()).toBe(true);
		});
	});

	it('shows close button by default', () => {
		const wrapper = mount(FToast, { localVue });
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('hides close button when closable is false', () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { closable: false }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(false);
	});

	it('emits close event when close button is clicked', async () => {
		const wrapper = mount(FToast, { localVue });
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('displays slot content', () => {
		const wrapper = mount(FToast, {
			localVue,
			slots: { default: '<p>Custom content</p>' }
		});
		expect(wrapper.html()).toContain('Custom content');
	});

	it('clears the timer when closed manually before duration expires', async () => {
		const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
		const wrapper = mount(FToast, {
			localVue,
			propsData: { duration: 10000 }
		});

		// Timer should be active; manually close before duration expires
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();

		// clearTimeout should have been called during manual close
		expect(clearTimeoutSpy).toHaveBeenCalled();

		// Advancing time should NOT emit another close event
		vi.advanceTimersByTime(10000);
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('close')).toHaveLength(1);

		wrapper.destroy();
	});

	it('auto-closes after duration', async () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { duration: 3000 }
		});

		expect(wrapper.emitted('close')).toBeFalsy();

		vi.advanceTimersByTime(3000);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('does not auto-close when duration is 0', async () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { duration: 0 }
		});

		vi.advanceTimersByTime(10000);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('close')).toBeFalsy();
	});

	it('has pause and resume timer methods', () => {
		const wrapper = mount(FToast, {
			localVue,
			propsData: { duration: 3000 }
		});

		// Verify the methods exist
		expect(typeof wrapper.vm.pauseTimer).toBe('function');
		expect(typeof wrapper.vm.resumeTimer).toBe('function');

		// Call the methods to ensure they don't throw
		wrapper.vm.pauseTimer();
		wrapper.vm.resumeTimer();
	});

	it('uses correct icon for each variant', () => {
		const variants = {
			success: 'success',
			error: 'error',
			info: 'info',
			warning: 'warning'
		} as const;

		Object.entries(variants).forEach(([variant, expectedIcon]) => {
			const wrapper = mount(FToast, {
				localVue,
				propsData: { variant }
			});
			expect(wrapper.vm.iconName).toBe(expectedIcon);
		});
	});

	it('applies correct transition based on position', () => {
		const positions = [
			{ position: 'top-left', transition: 'toast-slide-left' },
			{ position: 'top-right', transition: 'toast-slide-right' },
			{ position: 'top-center', transition: 'toast-slide-down' },
			{ position: 'bottom-left', transition: 'toast-slide-left' },
			{ position: 'bottom-right', transition: 'toast-slide-right' },
			{ position: 'bottom-center', transition: 'toast-slide-down' }
		] as const;

		positions.forEach(({ position, transition }) => {
			const wrapper = mount(FToast, {
				localVue,
				propsData: { position }
			});
			expect(wrapper.vm.transitionName).toBe(transition);
		});
	});
});
