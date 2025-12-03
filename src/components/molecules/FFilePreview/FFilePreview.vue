<template>
  <div :class="containerClasses">
    <f-icon
      :name="fileIcon"
      size="md"
      :class="iconClasses"
    />

    <div class="flex-1 min-w-0">
      <f-typography
        variant="body"
        :truncate="true"
        :class="fileNameClasses"
      >
        {{ fileName }}
      </f-typography>
    </div>

    <div class="flex-shrink-0">
      <f-loader
        v-if="loading"
        size="sm"
        :label="loadingLabel"
      />
      <f-button
        v-else
        variant="ghost"
        size="small"
        :disabled="disabled"
        @click="handleRemove"
      >
        <f-icon name="trash" size="sm" />
        <span class="sr-only">{{ removeLabel }}</span>
      </f-button>
    </div>
  </div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue'
import FTypography from '../../atoms/FTypography/FTypography.vue'
import FLoader from '../../atoms/FLoader/FLoader.vue'
import FButton from '../../atoms/FButton/FButton.vue'

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
  zip: 'folder',
  rar: 'folder',
  '7z': 'folder',
  tar: 'folder',
  gz: 'folder',
  default: 'document'
}

export default {
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
        return this.fileType.toLowerCase()
      }
      const parts = this.fileName.split('.')
      return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
    },
    fileIcon() {
      return FILE_TYPE_ICONS[this.fileExtension] || FILE_TYPE_ICONS.default
    },
    containerClasses() {
      const baseClasses = 'flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200'
      const disabledClasses = this.disabled ? 'opacity-50' : ''

      return [
        baseClasses,
        disabledClasses
      ].filter(Boolean).join(' ')
    },
    iconClasses() {
      return 'text-gray-500 flex-shrink-0'
    },
    fileNameClasses() {
      return this.disabled ? 'text-gray-400' : ''
    }
  },
  methods: {
    handleRemove() {
      if (!this.disabled && !this.loading) {
        this.$emit('remove')
      }
    }
  }
}
</script>
