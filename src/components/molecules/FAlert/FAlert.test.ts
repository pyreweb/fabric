import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FAlert from './FAlert.vue';

describe('FAlert', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FAlert);
		expect(wrapper.find('[role="alert"]').exists()).toBe(true);
	});

	it('displays title when provided', () => {
		const wrapper = mount(FAlert, {
			propsData: { title: 'Alert Title' }
		});
		expect(wrapper.text()).toContain('Alert Title');
	});

	it('displays message when provided', () => {
		const wrapper = mount(FAlert, {
			propsData: { message: 'Alert message content' }
		});
		expect(wrapper.text()).toContain('Alert message content');
	});

	it('applies correct variant classes', () => {
		const variants = ['success', 'error', 'info'] as const;
		variants.forEach((variant) => {
			const wrapper = mount(FAlert, {
				propsData: { variant }
			});
			expect(wrapper.find('[role="alert"]').exists()).toBe(true);
		});
	});

	it('shows close button by default', () => {
		const wrapper = mount(FAlert);
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('hides close button when closable is false', () => {
		const wrapper = mount(FAlert, {
			propsData: { closable: false }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(false);
	});

	it('emits close event and hides when close button is clicked', async () => {
		const wrapper = mount(FAlert);
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('displays slot content', () => {
		const wrapper = mount(FAlert, {
			slots: { default: '<p>Custom content</p>' }
		});
		expect(wrapper.html()).toContain('Custom content');
	});
});
