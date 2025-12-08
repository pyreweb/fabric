import { mount, createLocalVue } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import FThemeProvider from './FThemeProvider.vue';

const localVue = createLocalVue();

describe('FThemeProvider', () => {
	let wrapper;

	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
	});

	afterEach(() => {
		if (wrapper) {
			wrapper.destroy();
		}
	});

	it('renders with default light theme', () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			slots: {
				default: '<div>Content</div>'
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('light');
	});

	it('renders with dark theme when specified', () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			propsData: {
				defaultTheme: 'dark'
			},
			slots: {
				default: '<div>Content</div>'
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('dark');
	});

	it('exposes theme, toggleTheme, and setTheme via scoped slot', () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			scopedSlots: {
				default: function (props) {
					return this.$createElement('div', [
						this.$createElement('span', { attrs: { id: 'theme' } }, props.theme),
						this.$createElement('button', {
							attrs: { id: 'toggle' },
							on: { click: props.toggleTheme }
						}),
						this.$createElement('button', {
							attrs: { id: 'set-dark' },
							on: {
								click: () => {
									props.setTheme('dark');
								}
							}
						})
					]);
				}
			}
		});

		expect(wrapper.find('#theme').text()).toBe('light');
	});

	it('toggles theme when toggleTheme is called', async () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			scopedSlots: {
				default: function (props) {
					return this.$createElement('div', [
						this.$createElement('button', {
							attrs: { id: 'toggle' },
							on: { click: props.toggleTheme }
						})
					]);
				}
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('light');

		await wrapper.find('#toggle').trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.attributes('data-theme')).toBe('dark');

		await wrapper.find('#toggle').trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.attributes('data-theme')).toBe('light');
	});

	it('sets specific theme when setTheme is called', async () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			scopedSlots: {
				default: function (props) {
					return this.$createElement('div', [
						this.$createElement('button', {
							attrs: { id: 'set-dark' },
							on: {
								click: () => {
									props.setTheme('dark');
								}
							}
						})
					]);
				}
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('light');

		await wrapper.find('#set-dark').trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.attributes('data-theme')).toBe('dark');
	});

	it('persists theme to localStorage when enablePersistence is true', async () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			propsData: {
				enablePersistence: true,
				storageKey: 'test-theme'
			},
			scopedSlots: {
				default: function (props) {
					return this.$createElement('button', {
						attrs: { id: 'toggle' },
						on: { click: props.toggleTheme }
					});
				}
			}
		});

		await wrapper.find('#toggle').trigger('click');
		await wrapper.vm.$nextTick();

		expect(localStorage.getItem('test-theme')).toBe('dark');
	});

	it('does not persist theme when enablePersistence is false', async () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			propsData: {
				enablePersistence: false,
				storageKey: 'test-theme'
			},
			scopedSlots: {
				default: function (props) {
					return this.$createElement('button', {
						attrs: { id: 'toggle' },
						on: { click: props.toggleTheme }
					});
				}
			}
		});

		await wrapper.find('#toggle').trigger('click');
		await wrapper.vm.$nextTick();

		expect(localStorage.getItem('test-theme')).toBeNull();
	});

	it('loads theme from localStorage on mount', () => {
		localStorage.setItem('fabric-theme', 'dark');

		wrapper = mount(FThemeProvider, {
			localVue,
			propsData: {
				enablePersistence: true
			},
			slots: {
				default: '<div>Content</div>'
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('dark');
	});

	it('emits theme-change event when theme changes', async () => {
		wrapper = mount(FThemeProvider, {
			localVue,
			scopedSlots: {
				default: function (props) {
					return this.$createElement('button', {
						attrs: { id: 'toggle' },
						on: { click: props.toggleTheme }
					});
				}
			}
		});

		await wrapper.find('#toggle').trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('theme-change')).toBeTruthy();
		const emitted = wrapper.emitted('theme-change');
		if (emitted) {
			expect(emitted[0][0]).toBe('dark');
		}
	});

	it('handles auto theme based on system preference', () => {
		// Mock matchMedia to return dark preference
		window.matchMedia = (query: string) => ({
			matches: query === '(prefers-color-scheme: dark)',
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => true
		});

		wrapper = mount(FThemeProvider, {
			localVue,
			propsData: {
				defaultTheme: 'auto'
			},
			slots: {
				default: '<div>Content</div>'
			}
		});

		expect(wrapper.attributes('data-theme')).toBe('dark');
	});
});
