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
		expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Custom Label');
	});

	it('has default aria-label', () => {
		const wrapper = mount(FButtonGroup);
		expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Groupe de boutons');
	});

	it('applies container classes', () => {
		const wrapper = mount(FButtonGroup);
		expect(wrapper.find('[role="group"]').classes()).toContain('inline-flex');
	});
});
