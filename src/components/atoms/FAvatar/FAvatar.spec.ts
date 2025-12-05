import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FAvatar from './FAvatar.vue';

describe('FAvatar', () => {
	describe('rendering', () => {
		it('renders an image when src is provided', () => {
			const wrapper = mount(FAvatar, {
				props: {
					src: 'https://example.com/avatar.jpg',
					alt: 'User Avatar'
				}
			});
			const img = wrapper.find('img');
			expect(img.exists()).toBe(true);
			expect(img.attributes('src')).toBe('https://example.com/avatar.jpg');
			expect(img.attributes('alt')).toBe('User Avatar');
		});

		it('renders initials from name when no src is provided', () => {
			const wrapper = mount(FAvatar, {
				props: {
					name: 'John Doe'
				}
			});
			expect(wrapper.find('img').exists()).toBe(false);
			expect(wrapper.text()).toBe('JD');
		});

		it('renders provided initials when no src is provided', () => {
			const wrapper = mount(FAvatar, {
				props: {
					initials: 'AB'
				}
			});
			expect(wrapper.text()).toBe('AB');
		});

		it('renders fallback icon when no src, name, or initials are provided', () => {
			const wrapper = mount(FAvatar);
			expect(wrapper.find('svg').exists()).toBe(true);
		});
	});

	describe('sizes', () => {
		it('applies correct classes for xs size', () => {
			const wrapper = mount(FAvatar, { props: { size: 'xs' } });
			expect(wrapper.classes()).toContain('w-6');
			expect(wrapper.classes()).toContain('h-6');
		});

		it('applies correct classes for xl size', () => {
			const wrapper = mount(FAvatar, { props: { size: 'xl' } });
			expect(wrapper.classes()).toContain('w-16');
			expect(wrapper.classes()).toContain('h-16');
		});
	});

	describe('shapes', () => {
		it('renders circle shape by default', () => {
			const wrapper = mount(FAvatar);
			const innerDiv = wrapper.find('div > div');
			expect(innerDiv.classes()).toContain('rounded-full');
		});

		it('renders square shape when requested', () => {
			const wrapper = mount(FAvatar, { props: { shape: 'square' } });
			const innerDiv = wrapper.find('div > div');
			expect(innerDiv.classes()).toContain('rounded-lg');
		});
	});

	describe('status', () => {
		it('does not render status indicator by default', () => {
			const wrapper = mount(FAvatar);
			expect(wrapper.findAll('span').length).toBe(1);
		});

		it('renders online status correctly', () => {
			const wrapper = mount(FAvatar, { props: { status: 'online' } });
			const status = wrapper.findAll('span')[1];
			expect(status.exists()).toBe(true);
			expect(status.classes()).toContain('bg-success-500');
		});

		it('renders busy status correctly', () => {
			const wrapper = mount(FAvatar, { props: { status: 'busy' } });
			const status = wrapper.findAll('span')[1];
			expect(status.classes()).toContain('bg-danger-500');
		});
	});

	describe('events', () => {
		it('emits click event', async () => {
			const wrapper = mount(FAvatar);
			await wrapper.trigger('click');
			expect(wrapper.emitted('click')).toHaveLength(1);
		});
	});

	describe('error handling', () => {
		it('falls back to content when image load fails', async () => {
			const wrapper = mount(FAvatar, {
				props: {
					src: 'invalid-url.jpg',
					name: 'Jane Doe'
				}
			});

			await wrapper.find('img').trigger('error');

			expect(wrapper.find('img').exists()).toBe(false);
			expect(wrapper.text()).toBe('JD');
		});
	});
});
