<template>
	<div :class="containerClasses">
		<!-- Hidden file input -->
		<input
			ref="fileInput"
			type="file"
			:accept="accept"
			:multiple="multiple"
			:disabled="disabled"
			class="sr-only"
			@change="handleFileChange"
		/>

		<!-- Drop zone -->
		<div
			:class="dropZoneClasses"
			@click="triggerFileInput"
			@dragenter.prevent="handleDragEnter"
			@dragover.prevent="handleDragOver"
			@dragleave.prevent="handleDragLeave"
			@drop.prevent="handleDrop"
		>
			<f-icon name="upload" size="lg" :class="iconClasses" />
			<f-typography variant="body" :class="textClasses">
				<slot name="label">
					{{ dropZoneLabel }}
				</slot>
			</f-typography>
			<f-typography v-if="hint" variant="caption" class="text-gray-500">
				{{ hint }}
			</f-typography>
			<f-button
				v-if="showButton"
				variant="outline"
				size="small"
				:disabled="disabled"
				class="mt-2"
				@click.stop="triggerFileInput"
			>
				<template #iconLeft>
					<f-icon name="upload" size="sm" />
				</template>
				{{ buttonLabel }}
			</f-button>
		</div>

		<!-- Alert for errors/success -->
		<f-alert
			v-if="alertMessage"
			:variant="alertVariant"
			:message="alertMessage"
			:closable="true"
			class="mt-3"
			@close="clearAlert"
		/>

		<!-- File previews -->
		<div v-if="hasFiles" class="mt-3 space-y-2">
			<f-file-preview
				v-for="file in internalFiles"
				:key="file.id"
				:file-name="file.name"
				:file-type="file.extension"
				:loading="file.status === 'uploading'"
				:disabled="disabled || file.status === 'uploading'"
				:loading-label="loadingLabel"
				@remove="handleRemoveFile(file)"
			/>
		</div>

		<!-- Progress bar for overall upload -->
		<div v-if="showProgress && isUploading" class="mt-3">
			<div class="flex items-center justify-between mb-1">
				<f-typography variant="caption" class="text-gray-600">
					{{ progressLabel }}
				</f-typography>
				<f-typography variant="caption" class="text-gray-600">
					{{ uploadProgress }}%
				</f-typography>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2">
				<div
					class="bg-blue-600 h-2 rounded-full transition-all duration-300"
					:style="{ width: `${uploadProgress}%` }"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue';
import FTypography from '../../atoms/FTypography/FTypography.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FAlert from '../../molecules/FAlert/FAlert.vue';
import FFilePreview from '../../molecules/FFilePreview/FFilePreview.vue';

let idCounter = 0;

/**
 * File state constants
 */
const FILE_STATUS = {
	PENDING: 'pending',
	UPLOADING: 'uploading',
	SUCCESS: 'success',
	ERROR: 'error'
};

export default {
	name: 'FFileUpload',
	components: {
		FIcon,
		FTypography,
		FButton,
		FAlert,
		FFilePreview
	},
	props: {
		/**
		 * Array of files (for v-model support)
		 * Each file object should have: { id, name, file, status, progress }
		 */
		value: {
			type: Array,
			default: () => []
		},
		/**
		 * Accepted file types (MIME types or extensions)
		 * Example: 'image/*,.pdf,.doc,.docx'
		 */
		accept: {
			type: String,
			default: ''
		},
		/**
		 * Allow multiple file selection
		 */
		multiple: {
			type: Boolean,
			default: false
		},
		/**
		 * Maximum file size in bytes
		 */
		maxSize: {
			type: Number,
			default: 0
		},
		/**
		 * Maximum number of files allowed
		 */
		maxFiles: {
			type: Number,
			default: 0
		},
		/**
		 * Disable the upload component
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Show the upload button inside the drop zone
		 */
		showButton: {
			type: Boolean,
			default: true
		},
		/**
		 * Show progress bar during upload
		 */
		showProgress: {
			type: Boolean,
			default: true
		},
		/**
		 * Label for the drop zone
		 */
		dropZoneLabel: {
			type: String,
			default: 'Glissez-déposez vos fichiers ici'
		},
		/**
		 * Label for the upload button
		 */
		buttonLabel: {
			type: String,
			default: 'Parcourir'
		},
		/**
		 * Hint text displayed below the drop zone label
		 */
		hint: {
			type: String,
			default: ''
		},
		/**
		 * Loading label for file preview
		 */
		loadingLabel: {
			type: String,
			default: 'Téléversement en cours'
		},
		/**
		 * Progress label shown during upload
		 */
		progressLabel: {
			type: String,
			default: 'Progression'
		},
		/**
		 * Error message for file size validation
		 */
		errorSizeMessage: {
			type: String,
			default: 'Le fichier dépasse la taille maximale autorisée'
		},
		/**
		 * Error message for file type validation
		 */
		errorTypeMessage: {
			type: String,
			default: "Ce type de fichier n'est pas autorisé"
		},
		/**
		 * Error message for max files validation
		 */
		errorMaxFilesMessage: {
			type: String,
			default: 'Nombre maximum de fichiers atteint'
		},
		/**
		 * Success message after upload
		 */
		successMessage: {
			type: String,
			default: 'Fichier(s) téléversé(s) avec succès'
		}
	},
	data() {
		return {
			isDragging: false,
			alertMessage: '',
			alertVariant: 'info',
			uploadProgress: 0
		};
	},
	computed: {
		/**
		 * Internal files list synced with v-model
		 */
		internalFiles: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Check if there are files
		 */
		hasFiles() {
			return this.internalFiles.length > 0;
		},
		/**
		 * Check if any file is currently uploading
		 */
		isUploading() {
			return this.internalFiles.some((f) => f.status === FILE_STATUS.UPLOADING);
		},
		/**
		 * Container classes
		 */
		containerClasses() {
			return 'w-full';
		},
		/**
		 * Drop zone classes
		 */
		dropZoneClasses() {
			const baseClasses =
				'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200';
			const stateClasses = this.isDragging
				? 'border-blue-500 bg-blue-50'
				: 'border-gray-300 hover:border-gray-400 bg-gray-50';
			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed pointer-events-none'
				: '';

			return [baseClasses, stateClasses, disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Icon classes
		 */
		iconClasses() {
			return this.isDragging ? 'text-blue-500' : 'text-gray-400';
		},
		/**
		 * Text classes
		 */
		textClasses() {
			return this.isDragging ? 'text-blue-600' : 'text-gray-600';
		}
	},
	methods: {
		/**
		 * Trigger the hidden file input
		 */
		triggerFileInput() {
			if (!this.disabled) {
				this.$refs.fileInput.click();
			}
		},
		/**
		 * Handle file input change
		 */
		handleFileChange(event) {
			const files = Array.from(event.target.files);
			this.processFiles(files);
			// Reset input to allow selecting the same file again
			event.target.value = '';
		},
		/**
		 * Handle drag enter event
		 */
		handleDragEnter(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = true;
			}
		},
		/**
		 * Handle drag over event
		 */
		handleDragOver(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = true;
			}
		},
		/**
		 * Handle drag leave event
		 */
		handleDragLeave(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = false;
			}
		},
		/**
		 * Handle drop event
		 */
		handleDrop(event) {
			if (!this.disabled) {
				this.isDragging = false;
				const files = Array.from(event.dataTransfer.files);
				this.processFiles(files);
			}
		},
		/**
		 * Process and validate files
		 */
		processFiles(files) {
			this.clearAlert();

			// Handle empty files array
			if (!files || files.length === 0) {
				return;
			}

			// If not multiple, only take the first file
			const filesToProcess = this.multiple ? files : [files[0]];

			// Check max files limit (only for multiple mode)
			if (this.multiple && this.maxFiles > 0) {
				const totalFiles = this.internalFiles.length + filesToProcess.length;
				if (totalFiles > this.maxFiles) {
					this.showError(this.errorMaxFilesMessage);
					return;
				}
			}

			const validFiles = [];
			for (const file of filesToProcess) {
				const validation = this.validateFile(file);
				if (!validation.valid) {
					this.showError(validation.error);
					return;
				}

				const fileObject = this.createFileObject(file);
				validFiles.push(fileObject);
			}

			// If not multiple, replace existing files
			if (!this.multiple) {
				this.internalFiles = validFiles;
			} else {
				this.internalFiles = [...this.internalFiles, ...validFiles];
			}

			// Emit files-selected event
			this.$emit('files-selected', validFiles);
		},
		/**
		 * Validate a single file
		 */
		validateFile(file) {
			// Validate file type
			if (this.accept) {
				const isValid = this.isFileTypeValid(file);
				if (!isValid) {
					return { valid: false, error: this.errorTypeMessage };
				}
			}

			// Validate file size
			if (this.maxSize > 0 && file.size > this.maxSize) {
				return { valid: false, error: this.errorSizeMessage };
			}

			return { valid: true };
		},
		/**
		 * Check if file type is valid based on accept attribute
		 */
		isFileTypeValid(file) {
			const acceptedTypes = this.accept.split(',').map((t) => t.trim());

			return acceptedTypes.some((acceptedType) => {
				if (acceptedType.startsWith('.')) {
					// Extension check
					const ext = '.' + file.name.split('.').pop().toLowerCase();
					return ext === acceptedType.toLowerCase();
				} else if (acceptedType.endsWith('/*')) {
					// MIME type wildcard (e.g., image/*)
					const baseType = acceptedType.replace('/*', '');
					return file.type.startsWith(baseType);
				} else {
					// Exact MIME type match
					return file.type === acceptedType;
				}
			});
		},
		/**
		 * Create a file object for internal tracking
		 */
		createFileObject(file) {
			const extension = file.name.split('.').pop().toLowerCase();
			return {
				id: `file-${++idCounter}`,
				name: file.name,
				size: file.size,
				type: file.type,
				extension,
				file,
				status: FILE_STATUS.PENDING,
				progress: 0
			};
		},
		/**
		 * Remove a file from the list
		 */
		handleRemoveFile(fileToRemove) {
			this.internalFiles = this.internalFiles.filter(
				(f) => f.id !== fileToRemove.id
			);
			this.$emit('file-removed', fileToRemove);
		},
		/**
		 * Show error message
		 */
		showError(message) {
			this.alertMessage = message;
			this.alertVariant = 'error';
		},
		/**
		 * Show success message
		 */
		showSuccess(message) {
			this.alertMessage = message || this.successMessage;
			this.alertVariant = 'success';
		},
		/**
		 * Clear alert message
		 */
		clearAlert() {
			this.alertMessage = '';
		},
		/**
		 * Start upload for a specific file (to be called externally)
		 */
		startUpload(fileId) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.UPLOADING;
				file.progress = 0;
				this.updateFile(file);
				this.$emit('upload-start', file);
			}
		},
		/**
		 * Update upload progress for a specific file
		 */
		updateProgress(fileId, progress) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.progress = progress;
				this.updateFile(file);
				this.$emit('upload-progress', { file, progress });

				// Update overall progress
				this.calculateOverallProgress();
			}
		},
		/**
		 * Mark file as successfully uploaded
		 */
		markAsSuccess(fileId) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.SUCCESS;
				file.progress = 100;
				this.updateFile(file);
				this.$emit('upload-success', file);

				// Check if all files are done
				if (this.internalFiles.every((f) => f.status === FILE_STATUS.SUCCESS)) {
					this.showSuccess();
					this.$emit('upload-complete', this.internalFiles);
				}
			}
		},
		/**
		 * Mark file as failed
		 */
		markAsError(fileId, errorMessage) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.ERROR;
				this.updateFile(file);
				this.showError(errorMessage);
				this.$emit('upload-error', { file, error: errorMessage });
			}
		},
		/**
		 * Update a file in the internal list
		 */
		updateFile(updatedFile) {
			const index = this.internalFiles.findIndex(
				(f) => f.id === updatedFile.id
			);
			if (index !== -1) {
				const newFiles = [...this.internalFiles];
				newFiles[index] = { ...updatedFile };
				this.internalFiles = newFiles;
			}
		},
		/**
		 * Calculate overall upload progress
		 */
		calculateOverallProgress() {
			if (!this.hasFiles) {
				this.uploadProgress = 0;
				return;
			}

			const uploadingFiles = this.internalFiles.filter(
				(f) =>
					f.status === FILE_STATUS.UPLOADING || f.status === FILE_STATUS.SUCCESS
			);

			if (uploadingFiles.length === 0) {
				this.uploadProgress = 0;
				return;
			}

			const totalProgress = uploadingFiles.reduce(
				(sum, f) => sum + f.progress,
				0
			);
			this.uploadProgress = Math.round(totalProgress / uploadingFiles.length);
		},
		/**
		 * Clear all files
		 */
		clearFiles() {
			this.internalFiles = [];
			this.clearAlert();
			this.uploadProgress = 0;
			this.$emit('files-cleared');
		},
		/**
		 * Get all pending files (ready for upload)
		 */
		getPendingFiles() {
			return this.internalFiles.filter((f) => f.status === FILE_STATUS.PENDING);
		},
		/**
		 * Start upload for all pending files
		 */
		uploadAll() {
			const pendingFiles = this.getPendingFiles();
			pendingFiles.forEach((file) => {
				this.startUpload(file.id);
			});
			this.$emit('upload-all', pendingFiles);
		}
	}
};
</script>
