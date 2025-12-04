import { defineConfig } from 'vitest/config';
import vue from 'vite-plugin-vue2';

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
