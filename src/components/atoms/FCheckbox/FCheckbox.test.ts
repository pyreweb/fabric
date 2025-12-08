import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FCheckbox from './FCheckbox.vue';

describe('FCheckbox', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FCheckbox);
		expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
	});

	it('displays label when provided', () => {
		const wrapper = mount(FCheckbox, {
			propsData: { label: 'Accept terms' }
		});
		expect(wrapper.text()).toContain('Accept terms');
	});

	it('displays slot content as label', () => {
		const wrapper = mount(FCheckbox, {
			slots: {
				default: 'Custom label'
			}
		});
		expect(wrapper.text()).toContain('Custom label');
	});

	it('is unchecked by default', () => {
		const wrapper = mount(FCheckbox);
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(
			false
		);
	});

	it('respects checked prop', () => {
		const wrapper = mount(FCheckbox, {
			propsData: { checked: true }
		});
		expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(
			true
		);
	});

	it('emits change event when toggled', async () => {
		const wrapper = mount(FCheckbox);
		const input = wrapper.find('input');
		await input.setChecked(true);
		expect(wrapper.emitted('change')).toBeTruthy();
	});

	it('applies disabled styles', () => {
		const wrapper = mount(FCheckbox, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('label').classes()).toContain('cursor-not-allowed');
	});

	it('applies error styles', () => {
		const wrapper = mount(FCheckbox, {
			propsData: { error: true }
		});
		const input = wrapper.find('input');
		expect(input.classes().join(' ')).toContain('border-danger');
	});
});
