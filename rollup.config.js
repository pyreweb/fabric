import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const isProduction = process.env.NODE_ENV === 'production';

// Plugin to copy type declaration files and enhance index.d.ts
function copyTypesPlugin() {
	return {
		name: 'copy-types',
		writeBundle() {
			// Copy components.d.ts to dist/types/
			const targetDir = 'dist/types';
			mkdirSync(targetDir, { recursive: true });
			copyFileSync('src/components.d.ts', `${targetDir}/components.d.ts`);

			// Enhance index.d.ts with component type exports
			const indexPath = `${targetDir}/index.d.ts`;
			let indexContent = readFileSync(indexPath, 'utf-8');

			// Add export for components if not already present
			// Use regex to be more flexible with whitespace and quote styles
			const hasComponentsExport =
				/export\s+\*\s+from\s+['"]\.\/components['"];?/.test(indexContent);

			if (!hasComponentsExport) {
				// Find the line with export from types and add after it
				indexContent = indexContent.replace(
					/(export\s+\*\s+from\s+['"]\.\/types['"];?)/,
					"$1\nexport * from './components';"
				);
				writeFileSync(indexPath, indexContent);
			}
		}
	};
}

const sharedPlugins = [
	resolve({
		extensions: ['.js', '.ts', '.vue']
	}),
	commonjs(),
	vue({
		css: true,
		compileTemplate: true
	})
];

export default [
	// CJS + IIFE builds (with TypeScript declarations and CSS extraction)
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/fabric.cjs.js',
				format: 'cjs',
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
			...sharedPlugins,
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationDir: 'dist/types',
				exclude: ['**/*.spec.ts', '**/*.stories.ts']
			}),
			postcss({
				extract: 'fabric.css',
				plugins: [tailwindcss(), autoprefixer()]
			}),
			copyTypesPlugin(),
			isProduction && terser()
		].filter(Boolean)
	},
	// ESM build with preserveModules for tree shaking
	{
		input: 'src/index.ts',
		output: {
			dir: 'dist/esm',
			format: 'es',
			exports: 'named',
			preserveModules: true,
			preserveModulesRoot: 'src'
		},
		external: ['vue'],
		plugins: [
			...sharedPlugins,
			typescript({
				tsconfig: './tsconfig.json',
				declaration: false,
				declarationDir: undefined,
				exclude: ['**/*.spec.ts', '**/*.stories.ts']
			}),
			postcss({
				extract: false,
				plugins: [tailwindcss(), autoprefixer()]
			})
		]
	}
];
