import vue from '@vitejs/plugin-vue2';

/** @type { import('@storybook/vue-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	framework: {
		name: '@storybook/vue-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	viteFinal: async (config) => {
		config.plugins = config.plugins || [];
		config.plugins.push(vue());
		return config;
	}
};

export default config;
