import type { Meta, StoryFn } from '@storybook/vue';
import FAccordionItem from './FAccordionItem.vue';

export default {
	title: 'Molecules/FAccordionItem',
	component: FAccordionItem,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: "Titre de l'accordéon"
		},
		defaultOpen: {
			control: 'boolean',
			description: 'Ouvert par défaut'
		}
	}
} as Meta<typeof FAccordionItem>;

const Template: StoryFn<typeof FAccordionItem> = (args, { argTypes }) => ({
	components: { FAccordionItem },
	props: Object.keys(argTypes),
	template: `
<FAccordionItem v-bind="$props">
<p>Contenu de l'accordéon. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</FAccordionItem>
`
});

export const Default = Template.bind({});
Default.args = {
	title: 'Section 1'
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
	title: 'Section ouverte',
	defaultOpen: true
};

export const Multiple = () => ({
	components: { FAccordionItem },
	template: `
<div class="flex flex-col gap-2">
<FAccordionItem title="Première section">
<p>Contenu de la première section.</p>
</FAccordionItem>
<FAccordionItem title="Deuxième section">
<p>Contenu de la deuxième section.</p>
</FAccordionItem>
<FAccordionItem title="Troisième section">
<p>Contenu de la troisième section.</p>
</FAccordionItem>
</div>
`
});

export const WithRichContent = () => ({
	components: { FAccordionItem },
	template: `
<FAccordionItem title="FAQ - Question importante">
<div class="space-y-2">
<p>Voici une réponse détaillée avec du contenu riche.</p>
<ul class="list-disc pl-4">
<li>Premier point</li>
<li>Deuxième point</li>
<li>Troisième point</li>
</ul>
</div>
</FAccordionItem>
`
});
