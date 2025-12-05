import type { Meta, StoryObj } from '@storybook/vue3';
import FButton from './FButton.vue';

const meta: Meta<typeof FButton> = {
	title: 'Atoms/FButton',
	component: FButton,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link']
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl']
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset']
		},
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		block: { control: 'boolean' },
		rounded: { control: 'boolean' },
		onClick: { action: 'clicked' }
	},
	args: {
		variant: 'primary',
		size: 'md',
		default: 'Button'
	}
};

export default meta;
type Story = StoryObj<typeof FButton>;

export const Default: Story = {};

export const Variants: Story = {
	render: () => ({
		components: { FButton },
		template: `
      <div class="flex gap-4 items-center flex-wrap">
        <FButton variant="primary">Primary</FButton>
        <FButton variant="secondary">Secondary</FButton>
        <FButton variant="outline">Outline</FButton>
        <FButton variant="ghost">Ghost</FButton>
        <FButton variant="danger">Danger</FButton>
        <FButton variant="link">Link</FButton>
      </div>
    `
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { FButton },
		template: `
      <div class="flex gap-4 items-center flex-wrap">
        <FButton size="xs">Extra Small</FButton>
        <FButton size="sm">Small</FButton>
        <FButton size="md">Medium</FButton>
        <FButton size="lg">Large</FButton>
        <FButton size="xl">Extra Large</FButton>
      </div>
    `
	})
};

export const States: Story = {
	render: () => ({
		components: { FButton },
		template: `
      <div class="flex gap-4 items-center flex-wrap">
        <FButton>Default</FButton>
        <FButton disabled>Disabled</FButton>
        <FButton loading>Loading</FButton>
        <FButton rounded>Rounded</FButton>
      </div>
    `
	})
};

export const WithIcons: Story = {
	render: () => ({
		components: { FButton },
		template: `
      <div class="flex gap-4 items-center flex-wrap">
        <FButton>
          <template #prefix><span>←</span></template>
          Back
        </FButton>
        <FButton>
          Next
          <template #suffix><span>→</span></template>
        </FButton>
      </div>
    `
	})
};

export const FullWidth: Story = {
	args: {
		block: true,
		default: 'Full Width Button'
	}
};
