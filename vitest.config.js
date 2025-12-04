import { defineConfig } from 'vitest/config';
import vue from 'rollup-plugin-vue';

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
