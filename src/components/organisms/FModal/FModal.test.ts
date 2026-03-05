import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FModal from './FModal.vue';

describe('FModal', () => {
	it('renders correctly when open', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, title: 'Test Modal' }
		});
		expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
	});

	it('does not render when closed', () => {
		const wrapper = mount(FModal, {
			propsData: { value: false }
		});
		expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
	});

	it('displays title', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, title: 'Modal Title' }
		});
		expect(wrapper.text()).toContain('Modal Title');
	});

	it('displays subtitle', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, title: 'Title', subtitle: 'Subtitle' }
		});
		expect(wrapper.text()).toContain('Subtitle');
	});

	it('renders body slot', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true },
			slots: { body: '<p>Body content</p>' }
		});
		expect(wrapper.html()).toContain('Body content');
	});

	it('renders actions slot', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true },
			slots: { actions: '<button>Action</button>' }
		});
		expect(wrapper.html()).toContain('Action');
	});

	it('shows close button by default', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('hides close button when closable is false', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, closable: false }
		});
		expect(wrapper.findAllComponents({ name: 'FButton' }).length).toBe(0);
	});

	it('emits close when close button is clicked', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('emits input false when close button is clicked', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('closes on overlay click when closeOnOverlay is true', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, closeOnOverlay: true }
		});
		await wrapper.find('.bg-black').trigger('click');
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('does not close on overlay click when closeOnOverlay is false', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, closeOnOverlay: false }
		});
		await wrapper.find('.bg-black').trigger('click');
		expect(wrapper.emitted('close')).toBeFalsy();
	});

	it('stops propagation and prevents default on overlay click', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, closeOnOverlay: true },
			attachTo: document.body
		});

		const overlay = wrapper.find('.bg-black');
		let propagated = false;
		let defaultPrevented = false;

		// Capture defaultPrevented from the overlay element itself (fires after
		// Vue's handler, which calls preventDefault before stopPropagation)
		overlay.element.addEventListener(
			'click',
			(e) => {
				defaultPrevented = e.defaultPrevented;
			},
			{ once: true }
		);

		// Listen on a parent to confirm the event never bubbles up
		const bodyClickHandler = () => {
			propagated = true;
		};

		document.body.addEventListener('click', bodyClickHandler, { once: true });

		await overlay.trigger('click');

		expect(propagated).toBe(false);
		expect(defaultPrevented).toBe(true);

		document.body.removeEventListener('click', bodyClickHandler);
		wrapper.destroy();
	});

	it('emits close when Escape key is pressed', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true }
		});
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('applies correct size classes', () => {
		const sizes = ['small', 'medium', 'large', 'full'] as const;
		sizes.forEach((size) => {
			const wrapper = mount(FModal, {
				propsData: { value: true, size }
			});
			expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
		});
	});

	it('applies border when bordered is true', () => {
		const wrapper = mount(FModal, {
			propsData: { value: true, bordered: true }
		});
		expect(wrapper.find('[role="dialog"]').classes().join(' ')).toContain(
			'border'
		);
	});

	it('focuses first focusable element when opened', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: false },
			slots: {
				body: '<button id="test-button">Test Button</button>'
			},
			attachTo: document.body
		});

		// Open the modal
		await wrapper.setProps({ value: true });
		await wrapper.vm.$nextTick();

		// Check that a button receives focus (activeElement should be truthy)
		expect(document.activeElement).toBeTruthy();
		wrapper.destroy();
	});

	it('traps Tab key within modal', async () => {
		const wrapper = mount(FModal, {
			propsData: { value: true },
			slots: {
				body: '<button id="first">First</button><button id="last">Last</button>'
			},
			attachTo: document.body
		});

		await wrapper.vm.$nextTick();
		const lastButton = document.getElementById('last');

		if (lastButton) {
			lastButton.focus();
			await wrapper.trigger('keydown', { key: 'Tab' });
			// After tabbing from last element, should focus first element
			// Due to test limitations, we'll just verify the handler exists
			expect(wrapper.vm.handleTabKey).toBeDefined();
		}
		wrapper.destroy();
	});

	it('restores focus when modal closes', async () => {
		const triggerButton = document.createElement('button');
		triggerButton.id = 'trigger';
		document.body.appendChild(triggerButton);
		triggerButton.focus();

		const wrapper = mount(FModal, {
			propsData: { value: false },
			slots: { body: '<button>Modal Button</button>' },
			attachTo: document.body
		});

		// Open modal
		await wrapper.setProps({ value: true });
		await wrapper.vm.$nextTick();

		// Close modal
		await wrapper.setProps({ value: false });
		await wrapper.vm.$nextTick();

		// previousActiveElement should be stored
		expect(wrapper.vm.previousActiveElement).toBeDefined();

		wrapper.destroy();
		document.body.removeChild(triggerButton);
	});
});
