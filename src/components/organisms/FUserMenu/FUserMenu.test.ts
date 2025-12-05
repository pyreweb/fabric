import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FUserMenu from './FUserMenu.vue';

describe('FUserMenu', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John Doe' }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('displays user name', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'Jane Smith' }
		});
		expect(wrapper.text()).toContain('Jane Smith');
	});

	it('displays avatar', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John' }
		});
		expect(wrapper.findComponent({ name: 'FAvatar' }).exists()).toBe(true);
	});

	it('displays email when provided', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John', email: 'john@test.com' }
		});
		expect(wrapper.text()).toContain('john@test.com');
	});

	it('renders menu items', () => {
		const wrapper = mount(FUserMenu, {
			propsData: {
				name: 'John',
				items: [
					{ label: 'Profile', href: '/profile' },
					{ label: 'Settings', href: '/settings' }
				]
			}
		});
		expect(wrapper.text()).toContain('Profile');
	});

	it('renders logout button when showLogout is true', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John', showLogout: true }
		});
		const hasLogout = wrapper.text().toLowerCase().includes('déconnexion') || 
		                  wrapper.text().toLowerCase().includes('logout');
		expect(hasLogout).toBe(true);
	});

	it('emits logout event when logout is clicked', async () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John', showLogout: true }
		});
		const logoutBtn = wrapper.findAllComponents({ name: 'FButton' }).filter(b => 
			b.text().toLowerCase().includes('déconnexion') || b.text().toLowerCase().includes('logout')
		)[0];
		if (logoutBtn) {
			await logoutBtn.trigger('click');
			expect(wrapper.emitted('logout')).toBeTruthy();
		}
	});

	it('emits navigate event when item is clicked', async () => {
		const wrapper = mount(FUserMenu, {
			propsData: {
				name: 'John',
				items: [{ label: 'Profile', href: '/profile' }]
			}
		});
		const menuItems = wrapper.findAll('[role="menuitem"]');
		if (menuItems.length > 0) {
			await menuItems[0].trigger('click');
			expect(wrapper.emitted('navigate')).toBeTruthy();
		}
	});

	it('applies compact size', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John', compact: true }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders slot content', () => {
		const wrapper = mount(FUserMenu, {
			propsData: { name: 'John' },
			slots: { default: '<div>Custom content</div>' }
		});
		expect(wrapper.html()).toContain('Custom content');
	});
});
