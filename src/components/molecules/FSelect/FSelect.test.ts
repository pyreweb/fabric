import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FSelect from './FSelect.vue';

describe('FSelect', () => {
	let wrapper;

	const simpleOptions = ['Option 1', 'Option 2', 'Option 3'];
	const objectOptions = [
		{ value: 1, label: 'Paris' },
		{ value: 2, label: 'Lyon' },
		{ value: 3, label: 'Marseille' }
	];

	afterEach(() => {
		if (wrapper) {
			wrapper.destroy();
		}
	});

	describe('Rendering', () => {
		it('renders correctly with default props', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions
				}
			});
			expect(wrapper.find('button[type="button"]').exists()).toBe(true);
		});

		it('displays placeholder when no value is selected', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					placeholder: 'Choose an option'
				}
			});
			expect(wrapper.find('button').text()).toContain('Choose an option');
		});

		it('displays selected value', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					value: 'Option 2'
				}
			});
			expect(wrapper.find('button').text()).toContain('Option 2');
		});
	});

	describe('Simple Selection', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions
				}
			});
		});

		it('opens dropdown on trigger click', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.vm.isOpen).toBe(true);
			expect(wrapper.emitted('open')).toBeTruthy();
		});

		it('closes dropdown on second click', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.vm.isOpen).toBe(true);
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.vm.isOpen).toBe(false);
		});

		it('emits input event when option is clicked', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(1).trigger('click');

			expect(wrapper.emitted('input')).toBeTruthy();
			expect(wrapper.emitted('input')[0][0]).toBe('Option 2');
		});

		it('closes dropdown after selecting an option', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(0).trigger('click');

			expect(wrapper.vm.isOpen).toBe(false);
		});
	});

	describe('Multiple Selection', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					multiple: true,
					value: []
				}
			});
		});

		it('allows multiple selections', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(0).trigger('click');
			await options.at(1).trigger('click');

			expect(wrapper.emitted('input')).toBeTruthy();
			expect(wrapper.emitted('input').length).toBe(2);
		});

		it('does not close dropdown after selecting an option', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(0).trigger('click');

			expect(wrapper.vm.isOpen).toBe(true);
		});

		it('deselects option when clicked again', async () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					multiple: true,
					value: ['Option 1']
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(0).trigger('click');

			const emittedValue = wrapper.emitted('input')[0][0];
			expect(emittedValue).toHaveLength(0);
		});
	});

	describe('Searchable', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: objectOptions,
					searchable: true
				}
			});
		});

		it('shows search input when searchable is true', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			expect(wrapper.find('input[type="text"]').exists()).toBe(true);
		});

		it('filters options based on search query', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const searchInput = wrapper.find('input[type="text"]');
			await searchInput.setValue('Lyon');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			expect(options.length).toBe(1);
			expect(options.at(0).text()).toContain('Lyon');
		});

		it('shows empty state when no options match', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const searchInput = wrapper.find('input[type="text"]');
			await searchInput.setValue('XYZ');
			await wrapper.vm.$nextTick();

			expect(wrapper.text()).toContain('Aucune option trouvée');
		});

		it('filters are case insensitive', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const searchInput = wrapper.find('input[type="text"]');
			await searchInput.setValue('PARIS');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			expect(options.length).toBe(1);
		});
	});

	describe('Object Options', () => {
		it('displays label from object options', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: objectOptions,
					value: objectOptions[0]
				}
			});
			expect(wrapper.find('button').text()).toContain('Paris');
		});

		it('uses custom option keys', () => {
			const customOptions = [
				{ id: 1, name: 'First' },
				{ id: 2, name: 'Second' }
			];

			wrapper = mount(FSelect, {
				propsData: {
					options: customOptions,
					optionKey: 'id',
					optionLabel: 'name',
					value: customOptions[0]
				}
			});

			expect(wrapper.find('button').text()).toContain('First');
		});
	});

	describe('States', () => {
		it('applies disabled state', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					disabled: true
				}
			});
			expect(wrapper.find('button').attributes('disabled')).toBeDefined();
			expect(wrapper.find('button').classes()).toContain('cursor-not-allowed');
		});

		it('applies error styles', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					error: true
				}
			});
			expect(wrapper.find('button').classes().join(' ')).toContain(
				'border-danger'
			);
		});

		it('shows loading state', async () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: [],
					loading: true,
					loadingText: 'Loading...'
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			expect(wrapper.text()).toContain('Loading...');
		});
	});

	describe('Sizes', () => {
		it('applies small size classes', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					size: 'small'
				}
			});
			expect(wrapper.find('button').classes()).toContain('text-xs');
		});

		it('applies medium size classes', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					size: 'medium'
				}
			});
			expect(wrapper.find('button').classes()).toContain('text-sm');
		});

		it('applies large size classes', () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					size: 'large'
				}
			});
			expect(wrapper.find('button').classes()).toContain('text-base');
		});
	});

	describe('Accessibility', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					labelId: 'test-label'
				}
			});
		});

		it('has correct ARIA attributes on trigger', () => {
			const trigger = wrapper.find('button[type="button"]');
			expect(trigger.attributes('aria-haspopup')).toBe('listbox');
			expect(trigger.attributes('aria-expanded')).toBe('false');
		});

		it('updates aria-expanded when opened', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			const trigger = wrapper.find('button[type="button"]');
			expect(trigger.attributes('aria-expanded')).toBe('true');
		});

		it('has listbox role on dropdown', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();
			expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
		});

		it('has option role on each option', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();
			const options = wrapper.findAll('[role="option"]');
			expect(options.length).toBe(simpleOptions.length);
		});

		it('sets aria-selected on selected option', async () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					value: 'Option 1'
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const selectedOption = wrapper.find('[aria-selected="true"]');
			expect(selectedOption.exists()).toBe(true);
		});
	});

	describe('Keyboard Navigation', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions,
					searchable: true
				}
			});
		});

		it('opens dropdown on arrow down', async () => {
			await wrapper.find('button[type="button"]').trigger('keydown.down');
			expect(wrapper.vm.isOpen).toBe(true);
		});

		it('opens dropdown on arrow up', async () => {
			await wrapper.find('button[type="button"]').trigger('keydown.up');
			expect(wrapper.vm.isOpen).toBe(true);
		});

		it('closes dropdown on escape', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.vm.isOpen).toBe(true);
			await wrapper.trigger('keydown.escape');
			expect(wrapper.vm.isOpen).toBe(false);
		});
	});

	describe('Disabled Options', () => {
		const optionsWithDisabled = [
			{ value: 1, label: 'Enabled', disabled: false },
			{ value: 2, label: 'Disabled', disabled: true }
		];

		it('does not select disabled option', async () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: optionsWithDisabled
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(1).trigger('click');

			expect(wrapper.emitted('input')).toBeFalsy();
		});

		it('applies disabled styling to disabled options', async () => {
			wrapper = mount(FSelect, {
				propsData: {
					options: optionsWithDisabled
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			expect(options.at(1).classes()).toContain('cursor-not-allowed');
		});
	});

	describe('Custom Filter Method', () => {
		it('uses custom filter method when provided', async () => {
			const customFilter = vi.fn((query, options) => {
				return options.filter((opt) => opt.value === 1);
			});

			wrapper = mount(FSelect, {
				propsData: {
					options: objectOptions,
					searchable: true,
					filterMethod: customFilter
				}
			});

			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const searchInput = wrapper.find('input[type="text"]');
			await searchInput.setValue('test');
			await wrapper.vm.$nextTick();

			expect(customFilter).toHaveBeenCalledWith('test', objectOptions);
			const options = wrapper.findAll('[role="option"]');
			expect(options.length).toBe(1);
		});
	});

	describe('Events', () => {
		beforeEach(() => {
			wrapper = mount(FSelect, {
				propsData: {
					options: simpleOptions
				}
			});
		});

		it('emits open event when dropdown opens', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.emitted('open')).toBeTruthy();
		});

		it('emits close event when dropdown closes', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.find('button[type="button"]').trigger('click');
			expect(wrapper.emitted('close')).toBeTruthy();
		});

		it('emits change event when value changes', async () => {
			await wrapper.find('button[type="button"]').trigger('click');
			await wrapper.vm.$nextTick();

			const options = wrapper.findAll('[role="option"]');
			await options.at(0).trigger('click');

			expect(wrapper.emitted('change')).toBeTruthy();
		});
	});
});
