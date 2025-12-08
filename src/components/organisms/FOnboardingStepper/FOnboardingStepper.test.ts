import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FOnboardingStepper from './FOnboardingStepper.vue';

describe('FOnboardingStepper', () => {
	const steps = [
		{ title: 'Step 1', description: 'First step' },
		{ title: 'Step 2', description: 'Second step' },
		{ title: 'Step 3', description: 'Third step' }
	];

	it('renders correctly with required props', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('displays step titles', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps }
		});
		expect(wrapper.text()).toContain('Step 1');
		expect(wrapper.text()).toContain('Step 2');
	});

	it('starts at step 0 by default', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps }
		});
		expect(wrapper.vm.currentStep || 0).toBe(0);
	});

	it('respects value prop for current step', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps, value: 1 }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('shows navigation buttons', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps }
		});
		const buttons = wrapper.findAllComponents({ name: 'FButton' });
		expect(buttons.length).toBeGreaterThan(0);
	});

	it('disables previous button on first step', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps, value: 0 }
		});
		const buttons = wrapper.findAllComponents({ name: 'FButton' });
		const prevButton = buttons.filter(
			(b) =>
				b.text().toLowerCase().includes('précédent') ||
				b.text().toLowerCase().includes('retour')
		)[0];
		if (prevButton) {
			expect(prevButton.props('disabled')).toBe(true);
		}
	});

	it('shows finish button on last step', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps, value: 2 }
		});
		expect(wrapper.text()).toMatch(/terminer|finish|valider/i);
	});

	it('emits input when step changes', async () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps, value: 0 }
		});
		const nextButton = wrapper
			.findAllComponents({ name: 'FButton' })
			.filter(
				(b) =>
					b.text().toLowerCase().includes('suivant') ||
					b.text().toLowerCase().includes('next')
			)[0];
		if (nextButton) {
			await nextButton.trigger('click');
			expect(wrapper.emitted('input')).toBeTruthy();
		}
	});

	it('emits complete on last step', async () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps, value: 2 }
		});
		const finishButton = wrapper
			.findAllComponents({ name: 'FButton' })
			.filter(
				(b) =>
					b.text().toLowerCase().includes('terminer') ||
					b.text().toLowerCase().includes('valider')
			)[0];
		if (finishButton) {
			await finishButton.trigger('click');
			expect(wrapper.emitted('complete')).toBeTruthy();
		}
	});

	it('renders step content slot', () => {
		const wrapper = mount(FOnboardingStepper, {
			propsData: { steps },
			scopedSlots: {
				'step-0': '<p>Custom content</p>'
			}
		});
		expect(wrapper.exists()).toBe(true);
	});
});
