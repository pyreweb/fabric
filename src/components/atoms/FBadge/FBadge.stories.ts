import type { Meta, StoryFn } from '@storybook/vue';
import FBadge from './FBadge.vue';

export default {
	title: 'Atoms/FBadge',
	component: FBadge,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'error', 'neutral']
		},
		shape: {
			control: { type: 'select' },
			options: ['pill', 'circle', 'rounded']
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg']
		},
		dot: {
			control: 'boolean'
		},
		outlined: {
			control: 'boolean'
		},
		content: {
			control: 'text'
		}
	}
} as Meta<typeof FBadge>;

const Template: StoryFn<typeof FBadge> = (args) => ({
	components: { FBadge },
	setup() {
		return { args };
	},
	template: '<f-badge v-bind="args">{{ args.default }}</f-badge>'
});

export const Default = Template.bind({});
Default.args = {
	content: 'Badge',
	variant: 'primary'
};

export const Variants = () => ({
	components: { FBadge },
	template: `
		<div class="flex gap-2">
			<f-badge variant="primary">Primary</f-badge>
			<f-badge variant="success">Success</f-badge>
			<f-badge variant="warning">Warning</f-badge>
			<f-badge variant="error">Error</f-badge>
			<f-badge variant="neutral">Neutral</f-badge>
		</div>
	`
});

export const Outlined = () => ({
	components: { FBadge },
	template: `
		<div class="flex gap-2">
			<f-badge outlined variant="primary">Primary</f-badge>
			<f-badge outlined variant="success">Success</f-badge>
			<f-badge outlined variant="warning">Warning</f-badge>
			<f-badge outlined variant="error">Error</f-badge>
			<f-badge outlined variant="neutral">Neutral</f-badge>
		</div>
	`
});

export const Shapes = () => ({
	components: { FBadge },
	template: `
		<div class="flex items-center gap-2">
			<f-badge shape="pill">Pill</f-badge>
			<f-badge shape="rounded">Rounded</f-badge>
			<f-badge shape="circle" content="1" />
		</div>
	`
});

export const Dots = () => ({
	components: { FBadge },
	template: `
		<div class="flex items-center gap-2">
			<f-badge dot variant="primary" />
			<f-badge dot variant="success" />
			<f-badge dot variant="warning" />
			<f-badge dot variant="error" />
		</div>
	`
});
