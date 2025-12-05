import FStatCard from './FStatCard.vue';

export default {
	title: 'Molecules/FStatCard',
	component: FStatCard,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'text',
			description: 'Icône à afficher'
		},
		label: {
			control: 'text',
			description: 'Label/titre de la statistique'
		},
		value: {
			control: 'text',
			description: 'Valeur à afficher'
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'success', 'danger', 'info'],
			description: 'Variante de couleur'
		},
		layout: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
			description: 'Disposition'
		},
		bordered: {
			control: 'boolean',
			description: 'Afficher une bordure'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FStatCard },
	props: Object.keys(argTypes),
	template: '<FStatCard v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	icon: 'user',
	label: 'Utilisateurs',
	value: '1,234'
};

export const Primary = Template.bind({});
Primary.args = {
	icon: 'user',
	label: 'Total utilisateurs',
	value: '12,456',
	variant: 'primary'
};

export const Success = Template.bind({});
Success.args = {
	icon: 'check',
	label: 'Tâches complétées',
	value: '89%',
	variant: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
	icon: 'warning',
	label: 'Erreurs détectées',
	value: '23',
	variant: 'danger'
};

export const Vertical = Template.bind({});
Vertical.args = {
	icon: 'star',
	label: 'Note moyenne',
	value: '4.8/5',
	layout: 'vertical'
};

export const NoBorder = Template.bind({});
NoBorder.args = {
	icon: 'mail',
	label: 'Messages',
	value: '456',
	bordered: false
};

export const AllVariants = () => ({
	components: { FStatCard },
	template: `
		<div class="grid grid-cols-4 gap-4">
			<FStatCard icon="user" label="Utilisateurs" value="1,234" variant="primary" />
			<FStatCard icon="check" label="Complétés" value="89%" variant="success" />
			<FStatCard icon="warning" label="Alertes" value="12" variant="danger" />
			<FStatCard icon="info" label="Informations" value="45" variant="info" />
		</div>
	`
});

export const VerticalLayout = () => ({
	components: { FStatCard },
	template: `
		<div class="grid grid-cols-4 gap-4">
			<FStatCard icon="user" label="Utilisateurs" value="1,234" layout="vertical" />
			<FStatCard icon="document" label="Documents" value="567" layout="vertical" />
			<FStatCard icon="calendar" label="Événements" value="89" layout="vertical" />
			<FStatCard icon="mail" label="Messages" value="2,345" layout="vertical" />
		</div>
	`
});

export const Dashboard = () => ({
	components: { FStatCard },
	template: `
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<FStatCard
				icon="user"
				label="Nouveaux utilisateurs"
				value="+156"
				variant="primary"
			/>
			<FStatCard
				icon="document"
				label="Documents créés"
				value="1,234"
				variant="info"
			/>
			<FStatCard
				icon="check"
				label="Taux de complétion"
				value="94%"
				variant="success"
			/>
			<FStatCard
				icon="warning"
				label="Problèmes"
				value="7"
				variant="danger"
			/>
		</div>
	`
});
