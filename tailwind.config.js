/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{vue,js}'],
	safelist: [
		// FBadge variant classes
		'bg-primary-500',
		'bg-success-500',
		'bg-warning-600',
		'bg-danger-500',
		'bg-neutral-500',
		'border-primary-500',
		'border-success-500',
		'border-warning-600',
		'border-danger-500',
		'border-neutral-500',
		'text-primary-500',
		'text-success-500',
		'text-warning-600',
		'text-danger-500',
		'text-neutral-500',
		// FDivider background color classes
		'bg-gray-100',
		'bg-gray-200',
		'bg-gray-300',
		'bg-gray-400',
		'bg-gray-500',
		'bg-neutral-100',
		'bg-neutral-200',
		'bg-neutral-300',
		'bg-neutral-400',
		// FDivider thickness classes (horizontal)
		'h-px',
		'h-0.5',
		'h-1',
		// FDivider thickness classes (vertical)
		'w-px',
		'w-0.5',
		'w-1',
		// FDivider text size classes
		'text-xs',
		'text-sm',
		'text-base',
		'text-lg',
		'text-xl',
		// FDivider text color classes
		'text-gray-400',
		'text-gray-500',
		'text-gray-600',
		'text-neutral-400',
		'text-neutral-500',
		'text-neutral-600'
	],
	theme: {
		extend: {}
	},
	plugins: []
};
