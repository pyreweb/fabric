import { defineConfig } from 'vitest/config';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
	plugins: [createVuePlugin()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
