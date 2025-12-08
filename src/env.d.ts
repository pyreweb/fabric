/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// Déclaration du module principal avec types enrichis
declare module '@pyreweb/fabric' {
	export * from './components';
	export * from './types';
}
