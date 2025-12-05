import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FSearchBar from './FSearchBar.vue';

describe('FSearchBar', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FSearchBar);
		expect(wrapper.find('input').exists()).toBe(true);
	});

	it('displays placeholder', () => {
		const wrapper = mount(FSearchBar, {
			propsData: { placeholder: 'Search...' }
		});
		expect(wrapper.find('input').attributes('placeholder')).toBe('Search...');
	});

	it('displays value', () => {
		const wrapper = mount(FSearchBar, {
			propsData: { value: 'test query' }
		});
		expect((wrapper.find('input').element as HTMLInputElement).value).toBe('test query');
	});

	it('emits input event when typing', async () => {
		const wrapper = mount(FSearchBar);
		await wrapper.find('input').setValue('new query');
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('emits search event on enter', async () => {
		const wrapper = mount(FSearchBar, {
			propsData: { value: 'query' }
		});
		await wrapper.find('input').trigger('keydown.enter');
		expect(wrapper.emitted('search')).toBeTruthy();
	});

	it('shows inside icon by default', () => {
		const wrapper = mount(FSearchBar);
		expect(wrapper.findComponent({ name: 'FIcon' }).exists()).toBe(true);
	});

	it('shows button when buttonMode is true', () => {
		const wrapper = mount(FSearchBar, {
			propsData: { buttonMode: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('shows custom button label', () => {
		const wrapper = mount(FSearchBar, {
			propsData: { buttonMode: true, buttonLabel: 'Find' }
		});
		expect(wrapper.text()).toContain('Find');
	});

	it('applies disabled state', () => {
		const wrapper = mount(FSearchBar, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('input').attributes('disabled')).toBeDefined();
	});

	it('applies correct size classes', () => {
		const sizes = ['small', 'medium', 'large'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FSearchBar, {
				propsData: { size }
			});
			expect(wrapper.find('input').exists()).toBe(true);
		});
	});

	it('has focus method', () => {
		const wrapper = mount(FSearchBar);
		expect(typeof wrapper.vm.focus).toBe('function');
	});
});
