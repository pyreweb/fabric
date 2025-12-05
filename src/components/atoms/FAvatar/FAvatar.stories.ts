import type { Meta, StoryFn } from '@storybook/vue';
import FAvatar from './FAvatar.vue';

export default {
	title: 'Atoms/FAvatar',
	component: FAvatar,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl']
		},
		shape: {
			control: { type: 'select' },
			options: ['circle', 'square']
		},
		status: {
			control: { type: 'select' },
			options: [null, 'online', 'busy', 'away', 'offline']
		},
		src: {
			control: 'text'
		},
		name: {
			control: 'text'
		},
		initials: {
			control: 'text'
		}
	}
} as Meta<typeof FAvatar>;

const Template: StoryFn<typeof FAvatar> = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { FAvatar },
	template: '<f-avatar v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	src: 'https://i.pravatar.cc/150?img=32',
	alt: 'Avatar'
};

export const WithName = Template.bind({});
WithName.args = {
	name: 'John Doe',
	status: 'online'
};

export const WithInitials = Template.bind({});
WithInitials.args = {
	initials: 'MK',
	placeholderClass: 'bg-primary-600 text-white'
};

export const Fallback = Template.bind({});
Fallback.args = {};

export const Square = Template.bind({});
Square.args = {
	shape: 'square',
	src: 'https://i.pravatar.cc/150?img=12'
};

export const AllSizes = (): object => ({
	components: { FAvatar },
	template: `
		<div class="flex items-end gap-4">
			<f-avatar size="xs" src="https://i.pravatar.cc/150?img=1" />
			<f-avatar size="sm" src="https://i.pravatar.cc/150?img=2" />
			<f-avatar size="md" src="https://i.pravatar.cc/150?img=3" />
			<f-avatar size="lg" src="https://i.pravatar.cc/150?img=4" />
			<f-avatar size="xl" src="https://i.pravatar.cc/150?img=5" />
		</div>
	`
});

export const AllStatuses = (): object => ({
	components: { FAvatar },
	template: `
		<div class="flex gap-4">
			<f-avatar name="Online" status="online" />
			<f-avatar name="Busy" status="busy" />
			<f-avatar name="Away" status="away" />
			<f-avatar name="Offline" status="offline" />
		</div>
	`
});
