import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FStepperProgress from './FStepperProgress.vue';

describe('FStepperProgress', () => {
	const steps = ['Étape 1', 'Étape 2', 'Étape 3'];

	it('renders correctly with required props', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		expect(wrapper.find('nav').exists()).toBe(true);
		expect(wrapper.find('ol').exists()).toBe(true);
	});

	it('displays all step titles', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		expect(wrapper.text()).toContain('Étape 1');
		expect(wrapper.text()).toContain('Étape 2');
		expect(wrapper.text()).toContain('Étape 3');
	});

	it('renders correct number of steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		const stepItems = wrapper.findAll('li');
		expect(stepItems).toHaveLength(3);
	});

	it('starts at step 0 by default', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		expect(wrapper.vm.currentStep).toBe(0);
	});

	it('respects currentStep prop', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 1 }
		});
		expect(wrapper.vm.currentStep).toBe(1);
	});

	it('displays step numbers for future steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 0 }
		});
		// Step 2 and 3 should show numbers
		expect(wrapper.text()).toContain('2');
		expect(wrapper.text()).toContain('3');
	});

	it('displays checkmark for completed steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 2 }
		});
		// Completed steps should have SVG checkmarks
		const svgs = wrapper.findAll('svg');
		expect(svgs.length).toBeGreaterThanOrEqual(2);
	});

	it('applies correct classes for current step', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 1 }
		});
		const html = wrapper.html();
		expect(html).toContain('bg-primary-600');
	});

	it('applies correct classes for completed steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 2 }
		});
		const html = wrapper.html();
		expect(html).toContain('bg-success-600');
	});

	it('applies correct classes for future steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 0 }
		});
		const html = wrapper.html();
		expect(html).toContain('bg-neutral-200');
	});

	it('renders connector lines between steps', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		// Should have 2 connector lines for 3 steps
		const connectors = wrapper.findAll('.h-0\\.5');
		expect(connectors.length).toBe(2);
	});

	it('has proper accessibility attributes', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps }
		});
		const nav = wrapper.find('nav');
		expect(nav.attributes('aria-label')).toBe('Progression des étapes');
	});

	it('sets aria-current on current step', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps, currentStep: 1 }
		});
		const currentStepIndicator = wrapper.find('[aria-current="step"]');
		expect(currentStepIndicator.exists()).toBe(true);
	});

	it('handles single step', () => {
		const wrapper = mount(FStepperProgress, {
			propsData: { steps: ['Seule étape'], currentStep: 0 }
		});
		expect(wrapper.findAll('li')).toHaveLength(1);
		// No connectors for single step
		expect(wrapper.findAll('.h-0\\.5').length).toBe(0);
	});

	it('handles many steps', () => {
		const manySteps = ['A', 'B', 'C', 'D', 'E'];
		const wrapper = mount(FStepperProgress, {
			propsData: { steps: manySteps, currentStep: 2 }
		});
		expect(wrapper.findAll('li')).toHaveLength(5);
	});
});
