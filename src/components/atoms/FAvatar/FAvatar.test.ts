import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FAvatar from './FAvatar.vue';

describe('FAvatar', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FAvatar);
		expect(wrapper.find('div').exists()).toBe(true);
	});

	it('displays image when src is provided', () => {
		const wrapper = mount(FAvatar, {
			propsData: { src: 'https://example.com/avatar.jpg', alt: 'Test Avatar' }
		});
		const img = wrapper.find('img');
		expect(img.exists()).toBe(true);
		expect(img.attributes('src')).toBe('https://example.com/avatar.jpg');
		expect(img.attributes('alt')).toBe('Test Avatar');
	});

	it('displays initials when provided', () => {
		const wrapper = mount(FAvatar, {
			propsData: { initials: 'JD' }
		});
		expect(wrapper.text()).toContain('JD');
	});

	it('computes initials from name', () => {
		const wrapper = mount(FAvatar, {
			propsData: { name: 'John Doe' }
		});
		expect(wrapper.text()).toContain('JD');
	});

	it('computes initials from single name', () => {
		const wrapper = mount(FAvatar, {
			propsData: { name: 'John' }
		});
		expect(wrapper.text()).toContain('JO');
	});

	it('applies correct size classes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
		const sizeClasses = {
			xs: 'w-6',
			sm: 'w-8',
			md: 'w-10',
			lg: 'w-12',
			xl: 'w-16'
		};

		sizes.forEach((size) => {
			const wrapper = mount(FAvatar, {
				propsData: { size }
			});
			expect(wrapper.classes().join(' ')).toContain(sizeClasses[size]);
		});
	});

	it('applies circle shape by default', () => {
		const wrapper = mount(FAvatar);
		const container = wrapper.find('[class*="rounded"]');
		expect(container.classes()).toContain('rounded-full');
	});

	it('applies square shape when specified', () => {
		const wrapper = mount(FAvatar, {
			propsData: { shape: 'square' }
		});
		const container = wrapper.find('[class*="rounded"]');
		expect(container.classes()).toContain('rounded-lg');
	});

	it('displays status indicator when status is provided', () => {
		const wrapper = mount(FAvatar, {
			propsData: { status: 'online' }
		});
		expect(wrapper.find('[class*="bg-success"]').exists()).toBe(true);
	});

	it('emits click event when clicked', async () => {
		const wrapper = mount(FAvatar);
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('falls back to placeholder when image fails to load', async () => {
		const wrapper = mount(FAvatar, {
			propsData: { src: 'invalid-url.jpg' }
		});
		const img = wrapper.find('img');
		await img.trigger('error');
		expect(wrapper.find('img').exists()).toBe(false);
	});
});
