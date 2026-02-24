import FIcon from '../../atoms/FIcon/FIcon.vue.js';
import FTypography from '../../atoms/FTypography/FTypography.vue.js';
import FLoader from '../../atoms/FLoader/FLoader.vue.js';
import FButton from '../../atoms/FButton/FButton.vue.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const FILE_TYPE_ICONS = {
	pdf: 'document',
	doc: 'document',
	docx: 'document',
	xls: 'document',
	xlsx: 'document',
	ppt: 'document',
	pptx: 'document',
	txt: 'document',
	csv: 'document',
	jpg: 'image',
	jpeg: 'image',
	png: 'image',
	gif: 'image',
	svg: 'image',
	webp: 'image',
	bmp: 'image',
	zip: 'document',
	rar: 'document',
	'7z': 'document',
	tar: 'document',
	gz: 'document',
	default: 'document'
};

var script = {
	name: 'FFilePreview',
	components: {
		FIcon,
		FTypography,
		FLoader,
		FButton
	},
	props: {
		fileName: {
			type: String,
			required: true
		},
		fileType: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loadingLabel: {
			type: String,
			default: 'Téléversement en cours'
		},
		removeLabel: {
			type: String,
			default: 'Supprimer le fichier'
		}
	},
	computed: {
		fileExtension() {
			if (this.fileType) {
				return this.fileType.toLowerCase();
			}
			const parts = this.fileName.split('.');
			return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
		},
		fileIcon() {
			return FILE_TYPE_ICONS[this.fileExtension] || FILE_TYPE_ICONS.default;
		},
		containerClasses() {
			const baseClasses =
				'flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200';
			const disabledClasses = this.disabled ? 'opacity-50' : '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		iconClasses() {
			return 'text-neutral-500 flex-shrink-0';
		},
		fileNameClasses() {
			return this.disabled ? 'text-neutral-400' : '';
		}
	},
	methods: {
		handleRemove() {
			if (!this.disabled && !this.loading) {
				this.$emit('remove');
			}
		}
	}
};

export { script as default };
