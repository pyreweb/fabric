import FToggle from './FToggle.vue';

export default {
	title: 'Atoms/FToggle',
	component: FToggle,
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'boolean',
			description: 'État du toggle (activé/désactivé)'
		},
		label: {
			control: 'text',
			description: 'Libellé du toggle'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		color: {
			control: { type: 'select' },
			options: ['blue', 'green', 'red', 'orange', 'purple'],
			description: 'Couleur du toggle'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FToggle },
	props: Object.keys(argTypes),
	data() {
		return { isEnabled: args.value || false };
	},
	template: '<FToggle v-bind="$props" v-model="isEnabled" />'
});

export const Default = Template.bind({});
Default.args = {
	label: 'Activer les notifications'
};

export const Enabled = Template.bind({});
Enabled.args = {
	label: 'Notifications activées',
	value: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Option désactivée',
	disabled: true
};

export const DisabledOn = Template.bind({});
DisabledOn.args = {
	label: 'Option activée (désactivée)',
	value: true,
	disabled: true
};

export const Colors = () => ({
	components: { FToggle },
	data() {
		return {
			blue: true,
			green: true,
			red: true,
			orange: true,
			purple: true
		};
	},
	template: `
		<div class="flex flex-col gap-4">
			<FToggle v-model="blue" color="blue" label="Bleu (défaut)" />
			<FToggle v-model="green" color="green" label="Vert" />
			<FToggle v-model="red" color="red" label="Rouge" />
			<FToggle v-model="orange" color="orange" label="Orange" />
			<FToggle v-model="purple" color="purple" label="Violet" />
		</div>
	`
});

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {};

export const Interactive = () => ({
	components: { FToggle },
	data() {
		return {
			darkMode: false,
			notifications: true,
			autoSave: true
		};
	},
	template: `
		<div class="flex flex-col gap-4 p-4 border rounded-lg">
			<h3 class="font-semibold text-neutral-800">Paramètres</h3>
			<FToggle v-model="darkMode" label="Mode sombre" />
			<FToggle v-model="notifications" label="Notifications push" />
			<FToggle v-model="autoSave" label="Sauvegarde automatique" />
			<div class="mt-4 text-sm text-neutral-500">
				<p>Mode sombre: {{ darkMode ? 'Activé' : 'Désactivé' }}</p>
				<p>Notifications: {{ notifications ? 'Activées' : 'Désactivées' }}</p>
				<p>Auto-save: {{ autoSave ? 'Activé' : 'Désactivé' }}</p>
			</div>
		</div>
	`
});
