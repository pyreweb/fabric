import FTypography from './FTypography.vue';

export default {
	title: 'Atoms/FTypography',
	component: FTypography,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'body',
				'caption',
				'overline'
			],
			description: 'Variante typographique'
		},
		tag: {
			control: 'text',
			description: 'Balise HTML personnalisée'
		},
		truncate: {
			control: 'boolean',
			description: 'Tronquer le texte avec ellipse'
		}
	}
};

const Template = (args, { argTypes }) => ({
	components: { FTypography },
	props: Object.keys(argTypes),
	data() {
		return { content: args.content || 'Texte exemple' };
	},
	template: '<FTypography v-bind="$props">{{ content }}</FTypography>'
});

export const Default = Template.bind({});
Default.args = {
	content: 'Texte par défaut (body)'
};

export const Headings = () => ({
	components: { FTypography },
	template: `
		<div class="flex flex-col gap-4">
			<FTypography variant="h1">Titre H1</FTypography>
			<FTypography variant="h2">Titre H2</FTypography>
			<FTypography variant="h3">Titre H3</FTypography>
			<FTypography variant="h4">Titre H4</FTypography>
			<FTypography variant="h5">Titre H5</FTypography>
			<FTypography variant="h6">Titre H6</FTypography>
		</div>
	`
});

export const Body = Template.bind({});
Body.args = {
	variant: 'body',
	content:
		'Ceci est un paragraphe de texte standard. Il utilise la variante body qui est adaptée au contenu principal.'
};

export const Caption = Template.bind({});
Caption.args = {
	variant: 'caption',
	content: 'Texte de légende ou note secondaire'
};

export const Overline = Template.bind({});
Overline.args = {
	variant: 'overline',
	content: 'TEXTE EN SURTITRE'
};

export const Truncate = () => ({
	components: { FTypography },
	template: `
		<div class="w-64 border border-neutral-200 rounded p-4">
			<FTypography variant="body" truncate>
				Ce texte est très long et sera tronqué avec une ellipse car il dépasse la largeur du conteneur.
			</FTypography>
		</div>
	`
});

export const CustomTag = () => ({
	components: { FTypography },
	template: `
		<div class="flex flex-col gap-4">
			<FTypography variant="h1" tag="div">H1 rendu comme div</FTypography>
			<FTypography variant="body" tag="span">Body rendu comme span</FTypography>
		</div>
	`
});

export const AllVariants = () => ({
	components: { FTypography },
	template: `
		<div class="flex flex-col gap-6">
			<div>
				<FTypography variant="overline">SECTION</FTypography>
				<FTypography variant="h1">Titre Principal H1</FTypography>
			</div>
			<div>
				<FTypography variant="h2">Sous-titre H2</FTypography>
				<FTypography variant="body">
					Paragraphe de texte standard avec la variante body. Ce style est utilisé pour le contenu principal de la page.
				</FTypography>
			</div>
			<div>
				<FTypography variant="h3">Section H3</FTypography>
				<FTypography variant="body">
					Un autre paragraphe de texte qui explique quelque chose d'important.
				</FTypography>
				<FTypography variant="caption">
					Note: Ceci est un texte de légende ou une note secondaire.
				</FTypography>
			</div>
		</div>
	`
});
