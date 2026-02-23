import type { Meta, StoryFn } from '@storybook/vue';
import FFilePreview from './FFilePreview.vue';

export default {
	title: 'Molecules/FFilePreview',
	component: FFilePreview,
	tags: ['autodocs'],
	argTypes: {
		fileName: {
			control: 'text',
			description: 'Nom du fichier'
		},
		fileType: {
			control: 'text',
			description: 'Type de fichier (extension)'
		},
		loading: {
			control: 'boolean',
			description: 'État de chargement'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		loadingLabel: {
			control: 'text',
			description: 'Label de chargement'
		},
		removeLabel: {
			control: 'text',
			description: 'Label du bouton supprimer'
		}
	}
} as Meta<typeof FFilePreview>;

const Template: StoryFn<typeof FFilePreview> = (args, { argTypes }) => ({
	components: { FFilePreview },
	props: Object.keys(argTypes),
	template: '<FFilePreview v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
	fileName: 'document.pdf'
};

export const Loading = Template.bind({});
Loading.args = {
	fileName: 'rapport-2024.pdf',
	loading: true
};

export const Disabled = Template.bind({});
Disabled.args = {
	fileName: 'fichier-verrouillé.docx',
	disabled: true
};

export const DifferentFileTypes = () => ({
	components: { FFilePreview },
	template: `
<div class="flex flex-col gap-2">
<FFilePreview fileName="document.pdf" />
<FFilePreview fileName="image.png" />
<FFilePreview fileName="presentation.pptx" />
<FFilePreview fileName="spreadsheet.xlsx" />
<FFilePreview fileName="archive.zip" />
<FFilePreview fileName="texte.txt" />
</div>
`
});

export const LongFileName = Template.bind({});
LongFileName.args = {
	fileName:
		'un-nom-de-fichier-tres-long-qui-devrait-etre-tronque-dans-linterface.pdf'
};

export const Interactive = () => ({
	components: { FFilePreview },
	data() {
		return {
			files: [
				{ id: 1, name: 'rapport-q1.pdf' },
				{ id: 2, name: 'presentation.pptx' },
				{ id: 3, name: 'donnees.xlsx' }
			]
		};
	},
	methods: {
		removeFile(id: number) {
			this.files = this.files.filter((f) => f.id !== id);
		}
	},
	template: `
<div class="flex flex-col gap-2">
<FFilePreview
v-for="file in files"
:key="file.id"
:fileName="file.name"
@remove="removeFile(file.id)"
/>
<p v-if="files.length === 0" class="text-neutral-500 text-sm">
Aucun fichier restant
</p>
</div>
`
});

export const WithUploadProgress = () => ({
	components: { FFilePreview },
	data() {
		return {
			files: [
				{ id: 1, name: 'image.jpg', loading: false },
				{ id: 2, name: 'video.mp4', loading: true },
				{ id: 3, name: 'document.pdf', loading: false }
			]
		};
	},
	template: `
<div class="flex flex-col gap-2">
<FFilePreview
v-for="file in files"
:key="file.id"
:fileName="file.name"
:loading="file.loading"
/>
</div>
`
});
