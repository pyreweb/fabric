import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const isProduction = process.env.NODE_ENV === 'production';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/fabric.cjs.js',
			format: 'cjs',
			exports: 'named'
		},
		{
			file: 'dist/fabric.esm.js',
			format: 'es',
			exports: 'named'
		},
		{
			file: 'dist/fabric.min.js',
			format: 'iife',
			name: 'Fabric',
			exports: 'named',
			globals: {
				vue: 'Vue'
			}
		}
	],
	external: ['vue'],
	plugins: [
		resolve({
			extensions: ['.js', '.ts', '.vue']
		}),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationDir: 'dist/types',
			exclude: ['**/*.spec.ts', '**/*.stories.ts']
		}),
		vue({
			css: true,
			compileTemplate: true
		}),
		postcss({
			extract: 'fabric.css',
			plugins: [tailwindcss(), autoprefixer()]
		}),
		isProduction && terser()
	].filter(Boolean)
};
