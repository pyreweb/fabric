/**
 * Internal registry mapping icon names to their SVG path data.
 * Populated via `addIcons()`.
 */
const registry: Record<string, string> = {};

/**
 * Register one or more icons in the global FIcon registry.
 *
 * @example
 * // Register the full built-in icon set (e.g. in main.ts when using Vue.use)
 * import { addIcons, allIcons } from '@pyreweb/fabric';
 * addIcons(allIcons);
 *
 * @example
 * // Register only the icons you need for tree-shaking
 * import { addIcons } from '@pyreweb/fabric';
 * import { check, plus } from '@pyreweb/fabric/components/atoms/FIcon/icons';
 * addIcons({ check, plus });
 */
export function addIcons(icons: Record<string, string>): void {
	Object.assign(registry, icons);
}

/**
 * Retrieve the SVG path data for a registered icon by name.
 * Returns `null` when the icon is not found in the registry.
 */
export function getIconPath(name: string): string | null {
	return registry[name] ?? null;
}
