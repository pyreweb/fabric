import type { Meta, StoryFn } from '@storybook/vue';
import FFileUpload from './FFileUpload.vue';

export default {
	title: 'Organisms/FFileUpload',
	component: FFileUpload,
	tags: ['autodocs'],
	argTypes: {
		accept: {
			control: 'text',
			description: 'Types de fichiers acceptés'
		},
		multiple: {
			control: 'boolean',
			description: 'Autoriser plusieurs fichiers'
		},
		maxSize: {
			control: 'number',
			description: 'Taille maximale en octets'
		},
		maxFiles: {
			control: 'number',
			description: 'Nombre maximum de fichiers'
		},
		showButton: {
			control: 'boolean',
			description: "Afficher le bouton d'upload"
		},
		showProgress: {
			control: 'boolean',
			description: 'Afficher la barre de progression'
		},
		disabled: {
			control: 'boolean',
			description: 'État désactivé'
		},
		hint: {
			control: 'text',
			description: "Texte d'aide"
		}
	}
} as Meta<typeof FFileUpload>;

const Template: StoryFn<typeof FFileUpload> = (args, { argTypes }) => ({
	components: { FFileUpload },
	props: Object.keys(argTypes),
	data() {
		return { files: [] };
	},
	template: '<FFileUpload v-bind="$props" v-model="files" />'
});

export const Default = Template.bind({});
Default.args = {};

export const WithButton = Template.bind({});
WithButton.args = {
	showButton: true,
	buttonLabel: 'Parcourir'
};

export const WithHint = Template.bind({});
WithHint.args = {
	hint: 'Formats acceptés: PDF, DOC, DOCX. Taille max: 10 Mo'
};

export const ImagesOnly = Template.bind({});
ImagesOnly.args = {
	accept: 'image/*',
	hint: 'Images uniquement (JPG, PNG, GIF)'
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
	multiple: true,
	hint: 'Vous pouvez sélectionner plusieurs fichiers'
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true
};

export const WithMaxSize = Template.bind({});
WithMaxSize.args = {
	maxSize: 5 * 1024 * 1024, // 5 MB
	hint: 'Taille maximale: 5 Mo'
};

export const WithMaxFiles = Template.bind({});
WithMaxFiles.args = {
	multiple: true,
	maxFiles: 3,
	hint: 'Maximum 3 fichiers'
};

export const WithPreloadedFiles = () => ({
	components: { FFileUpload },
	data() {
		return {
			files: [
				{ id: 1, name: 'document.pdf', status: 'success' },
				{ id: 2, name: 'image.png', status: 'success' }
			]
		};
	},
	template: '<FFileUpload v-model="files" multiple />'
});

export const WithUploadingFile = () => ({
	components: { FFileUpload },
	data() {
		return {
			files: [
				{ id: 1, name: 'rapport.pdf', status: 'success' },
				{ id: 2, name: 'video.mp4', status: 'uploading', progress: 45 },
				{ id: 3, name: 'archive.zip', status: 'pending' }
			]
		};
	},
	template: '<FFileUpload v-model="files" multiple showProgress />'
});

export const Interactive = () => ({
	components: { FFileUpload },
	data() {
		return {
			files: [] as unknown[]
		};
	},
	methods: {
		handleChange(files: unknown[]) {
			console.log('Files changed:', files);
		},
		handleError(error: unknown) {
			console.error('Upload error:', error);
		}
	},
	template: `
<div class="max-w-lg">
<FFileUpload
v-model="files"
multiple
showButton
showProgress
accept=".pdf,.doc,.docx,.jpg,.png"
:maxSize="10 * 1024 * 1024"
hint="PDF, DOC, images. Max 10 Mo par fichier."
@change="handleChange"
@error="handleError"
/>
<div v-if="files.length" class="mt-4 text-sm text-neutral-600">
<p>{{ files.length }} fichier(s) sélectionné(s)</p>
</div>
</div>
`
});

export const PDFOnly = Template.bind({});
PDFOnly.args = {
	accept: '.pdf',
	hint: 'Fichiers PDF uniquement'
};
