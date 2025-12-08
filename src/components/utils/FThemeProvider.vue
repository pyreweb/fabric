<template>
	<div :data-theme="currentTheme">
		<slot
			:theme="currentTheme"
			:toggle-theme="toggleTheme"
			:set-theme="setTheme"
		/>
	</div>
</template>

<script>
/**
 * FThemeProvider - Theme management component for Fabric Design System
 *
 * This component provides theme switching functionality (light/dark mode)
 * and manages theme persistence using localStorage.
 *
 * See the Storybook stories for usage examples.
 */
export default {
	name: 'FThemeProvider',
	props: {
		/**
		 * Default theme to use when no preference is stored
		 * @type {'light' | 'dark' | 'auto'}
		 * @default 'light'
		 */
		defaultTheme: {
			type: String,
			default: 'light',
			validator: (value) => ['light', 'dark', 'auto'].includes(value)
		},
		/**
		 * Key used for localStorage persistence
		 * @type {string}
		 * @default 'fabric-theme'
		 */
		storageKey: {
			type: String,
			default: 'fabric-theme'
		},
		/**
		 * Enable or disable localStorage persistence
		 * @type {boolean}
		 * @default true
		 */
		enablePersistence: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			currentTheme: this.defaultTheme === 'light' ? 'light' : 'dark',
			storedTheme: null,
			mediaQuery: null
		};
	},
	provide() {
		return {
			theme: () => this.currentTheme,
			toggleTheme: this.toggleTheme,
			setTheme: this.setTheme
		};
	},
	created() {
		this.initializeTheme();
	},
	mounted() {
		this.setupMediaQuery();
	},
	beforeDestroy() {
		if (this.mediaQuery) {
			this.mediaQuery.removeEventListener(
				'change',
				this.handleMediaQueryChange
			);
		}
	},
	methods: {
		/**
		 * Initialize theme from localStorage or system preference
		 */
		initializeTheme() {
			let theme = this.defaultTheme;

			// Try to get theme from localStorage if persistence is enabled
			if (this.enablePersistence && typeof window !== 'undefined') {
				try {
					const stored = localStorage.getItem(this.storageKey);
					if (stored && ['light', 'dark', 'auto'].includes(stored)) {
						theme = stored;
						this.storedTheme = stored;
					}
				} catch (error) {
					console.warn('Failed to read theme from localStorage:', error);
				}
			}

			this.applyTheme(theme);
		},

		/**
		 * Setup media query listener for auto theme
		 */
		setupMediaQuery() {
			if (typeof window === 'undefined') return;

			try {
				this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				this.mediaQuery.addEventListener('change', this.handleMediaQueryChange);
			} catch (error) {
				console.warn('Failed to setup media query listener:', error);
			}
		},

		/**
		 * Handle media query changes (for auto theme)
		 */
		handleMediaQueryChange() {
			// Only re-apply if stored theme is 'auto'
			if (this.storedTheme === 'auto') {
				this.applyTheme('auto');
			}
		},

		/**
		 * Resolve 'auto' theme to actual theme based on system preference
		 */
		resolveTheme(theme) {
			if (theme === 'auto') {
				if (
					typeof window !== 'undefined' &&
					window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches
				) {
					return 'dark';
				}
				return 'light';
			}
			return theme;
		},

		/**
		 * Apply the given theme
		 * @param {'light' | 'dark' | 'auto'} theme
		 */
		applyTheme(theme) {
			const resolvedTheme = this.resolveTheme(theme);
			this.currentTheme = resolvedTheme;
			this.storedTheme = theme; // Remember the original preference

			// Emit theme change event
			this.$emit('theme-change', resolvedTheme);
		},

		/**
		 * Toggle between light and dark themes
		 */
		toggleTheme() {
			const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
			this.setTheme(newTheme);
		},

		/**
		 * Set a specific theme
		 * @param {'light' | 'dark' | 'auto'} theme
		 */
		setTheme(theme) {
			if (!['light', 'dark', 'auto'].includes(theme)) {
				console.warn(
					`Invalid theme: ${theme}. Must be 'light', 'dark', or 'auto'.`
				);
				return;
			}

			this.storedTheme = theme;
			this.applyTheme(theme);

			// Persist to localStorage if enabled
			if (this.enablePersistence && typeof window !== 'undefined') {
				try {
					localStorage.setItem(this.storageKey, theme);
				} catch (error) {
					console.warn('Failed to save theme to localStorage:', error);
				}
			}
		}
	}
};
</script>
