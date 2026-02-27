import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FButtonGroup from './FButtonGroup.vue';

describe('FButtonGroup', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FButtonGroup, {
			slots: {
				default: '<button>Button 1</button><button>Button 2</button>'
			}
		});
		expect(wrapper.find('[role="group"]').exists()).toBe(true);
	});

	it('displays slot content', () => {
		const wrapper = mount(FButtonGroup, {
			slots: {
				default: '<button>Test Button</button>'
			}
		});
		expect(wrapper.text()).toContain('Test Button');
	});

	it('has correct aria-label', () => {
		const wrapper = mount(FButtonGroup, {
			propsData: { ariaLabel: 'Custom Label' }
		});
		expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe(
			'Custom Label'
		);
	});

	it('has default aria-label', () => {
		const wrapper = mount(FButtonGroup);
		expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe(
			'Groupe de boutons'
		);
	});

	it('applies container classes', () => {
		const wrapper = mount(FButtonGroup);
		expect(wrapper.find('[role="group"]').classes()).toContain('inline-flex');
	});

	it('moves focus to next button on ArrowRight', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button>Button 2</button><button>Button 3</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(0).element.focus();

		await wrapper.trigger('keydown', { key: 'ArrowRight' });

		expect(document.activeElement).toBe(buttons.at(1).element);
		wrapper.destroy();
	});

	it('moves focus to previous button on ArrowLeft', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button>Button 2</button><button>Button 3</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(1).element.focus();

		await wrapper.trigger('keydown', { key: 'ArrowLeft' });

		expect(document.activeElement).toBe(buttons.at(0).element);
		wrapper.destroy();
	});

	it('wraps focus to last button on ArrowLeft from first', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button>Button 2</button><button>Button 3</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(0).element.focus();

		await wrapper.trigger('keydown', { key: 'ArrowLeft' });

		expect(document.activeElement).toBe(buttons.at(2).element);
		wrapper.destroy();
	});

	it('wraps focus to first button on ArrowRight from last', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button>Button 2</button><button>Button 3</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(2).element.focus();

		await wrapper.trigger('keydown', { key: 'ArrowRight' });

		expect(document.activeElement).toBe(buttons.at(0).element);
		wrapper.destroy();
	});

	it('skips disabled buttons on ArrowRight', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button disabled>Button 2</button><button>Button 3</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(0).element.focus();

		await wrapper.trigger('keydown', { key: 'ArrowRight' });

		expect(document.activeElement).toBe(buttons.at(2).element);
		wrapper.destroy();
	});

	it('does not move focus on unrelated keys', async () => {
		const wrapper = mount(FButtonGroup, {
			attachTo: document.body,
			slots: {
				default: '<button>Button 1</button><button>Button 2</button>'
			}
		});

		const buttons = wrapper.findAll('button');
		buttons.at(0).element.focus();

		await wrapper.trigger('keydown', { key: 'Tab' });

		expect(document.activeElement).toBe(buttons.at(0).element);
		wrapper.destroy();
	});
});
