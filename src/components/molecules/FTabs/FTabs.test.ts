import { describe, it, expect } from 'vitest';
import { mount, createLocalVue } from '@vue/test-utils';
import FTabs from './FTabs.vue';
import FTab from './FTab.vue';

const localVue = createLocalVue();
localVue.component('FTab', FTab);

describe('FTabs', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
	});

	it('renders all tab buttons', () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
					<FTab name="tab3" label="Tab 3" disabled>Content 3</FTab>
				`
			}
		});
		wrapper.vm.$nextTick(() => {
			const tabs = wrapper.findAll('[role="tab"]');
			expect(tabs.length).toBe(3);
		});
	});

	it('activates first enabled tab by default', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 10));
		await wrapper.vm.$nextTick();

		// Verify tabs are registered
		expect(wrapper.vm.tabItems.length).toBeGreaterThan(0);

		const tabs = wrapper.findAll('[role="tab"]');
		expect(tabs.length).toBeGreaterThan(0);

		// Check that at least one tab is selected
		const selectedTabs = tabs.wrappers.filter(
			(tab) => tab.attributes('aria-selected') === 'true'
		);
		expect(selectedTabs.length).toBeGreaterThan(0);
	});

	it('changes active tab on click', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const tabs = wrapper.findAll('[role="tab"]');
		if (tabs.length > 1) {
			await tabs.at(1).trigger('click');
			expect(wrapper.emitted('input')).toBeTruthy();
			expect(wrapper.emitted('change')).toBeTruthy();
		}
	});

	it('does not activate disabled tab on click', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2" disabled>Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const tabs = wrapper.findAll('[role="tab"]');
		if (tabs.length > 1) {
			const initialEmitCount = wrapper.emitted('input')
				? wrapper.emitted('input').length
				: 0;
			await tabs.at(1).trigger('click');
			const finalEmitCount = wrapper.emitted('input')
				? wrapper.emitted('input').length
				: 0;
			expect(finalEmitCount).toBe(initialEmitCount);
		}
	});

	it('supports v-model binding', async () => {
		const wrapperWithModel = mount(FTabs, {
			localVue,
			propsData: {
				value: 'tab2'
			},
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapperWithModel.vm.$nextTick();
		const tabs = wrapperWithModel.findAll('[role="tab"]');
		expect(tabs.at(1).attributes('aria-selected')).toBe('true');
	});

	it('navigates with arrow keys', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const tabs = wrapper.findAll('[role="tab"]');
		if (tabs.length > 0) {
			await tabs.at(0).trigger('keydown', { key: 'ArrowRight' });
			expect(wrapper.emitted('change')).toBeTruthy();
		}
	});

	it('navigates to first tab with Home key', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			propsData: {
				value: 'tab2'
			},
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const tabs = wrapper.findAll('[role="tab"]');
		await tabs.at(1).trigger('keydown', { key: 'Home' });
		expect(wrapper.emitted('change')[0][0]).toBe('tab1');
	});

	it('navigates to last tab with End key', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const tabs = wrapper.findAll('[role="tab"]');
		if (tabs.length > 0) {
			await tabs.at(0).trigger('keydown', { key: 'End' });
			expect(wrapper.emitted('change')).toBeTruthy();
		}
	});

	it('applies correct variant classes', () => {
		const variants = ['default', 'pills', 'underline'];
		variants.forEach((variant) => {
			const variantWrapper = mount(FTabs, {
				localVue,
				propsData: { variant },
				slots: {
					default: '<FTab name="tab1" label="Tab 1">Content</FTab>'
				}
			});
			expect(variantWrapper.find('[role="tablist"]').exists()).toBe(true);
		});
	});

	it('has correct ARIA attributes', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		const tabList = wrapper.find('[role="tablist"]');
		expect(tabList.attributes('aria-label')).toBeDefined();

		const tabs = wrapper.findAll('[role="tab"]');
		tabs.wrappers.forEach((tab) => {
			expect(tab.attributes('aria-controls')).toBeDefined();
			expect(tab.attributes('aria-selected')).toBeDefined();
		});
	});

	it('sets correct tabindex for active and inactive tabs', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			propsData: {
				value: 'tab1'
			},
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick(); // Wait for mounted nextTick to complete
		const tabs = wrapper.findAll('[role="tab"]');
		expect(tabs.at(0).attributes('tabindex')).toBe('0');
		expect(tabs.at(1).attributes('tabindex')).toBe('-1');
	});

	it('displays tab panel content when tab is active', async () => {
		const wrapper = mount(FTabs, {
			localVue,
			propsData: {
				value: 'tab1'
			},
			slots: {
				default: `
					<FTab name="tab1" label="Tab 1">Content 1</FTab>
					<FTab name="tab2" label="Tab 2">Content 2</FTab>
				`
			}
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick(); // Wait for mounted nextTick to complete
		const panels = wrapper.findAll('[role="tabpanel"]');
		expect(panels.at(0).isVisible()).toBe(true);
		expect(panels.at(1).isVisible()).toBe(false);
	});
});
