import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FBadge from './FBadge.vue';

describe('FBadge', () => {
	it('renders content correctly', () => {
		const wrapper = mount(FBadge, {
			slots: { default: 'Badge Content' }
		});
		expect(wrapper.text()).toBe('Badge Content');
	});

	it('renders with default variant (primary)', () => {
		const wrapper = mount(FBadge);
		expect(wrapper.classes()).toContain('bg-primary-500');
	});

	it('renders with success variant', () => {
		const wrapper = mount(FBadge, {
			props: { variant: 'success' }
		});
		expect(wrapper.classes()).toContain('bg-success-500');
	});

	it('renders outlined variant', () => {
		const wrapper = mount(FBadge, {
			props: {
				variant: 'primary',
				outlined: true
			}
		});
		expect(wrapper.classes()).toContain('border-primary-500');
		expect(wrapper.classes()).toContain('bg-transparent');
	});

	it('applies correct size classes', () => {
		const wrapper = mount(FBadge, {
			props: { size: 'lg' }
		});
		expect(wrapper.classes()).toContain('text-sm');
	});

	it('applies correct shape classes', () => {
		const wrapper = mount(FBadge, {
			props: { shape: 'rounded' }
		});
		expect(wrapper.classes()).toContain('rounded-md');
	});

	it('renders as a dot', () => {
		const wrapper = mount(FBadge, {
			props: { dot: true }
		});
		expect(wrapper.classes()).toContain('rounded-full');
		expect(wrapper.classes()).toContain('w-2');
		expect(wrapper.text()).toBe('');
	});
});
