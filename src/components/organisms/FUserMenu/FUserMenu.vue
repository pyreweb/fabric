<template>
  <div
    v-if="isLoggedIn"
    class="relative inline-block"
    @keydown.escape="closeMenu"
  >
    <!-- Trigger Button (Avatar + optional username) -->
    <button
      ref="trigger"
      type="button"
      :class="triggerClasses"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="toggleMenu"
    >
      <f-avatar
        :src="avatarSrc"
        :alt="avatarAlt"
        :initials="avatarInitials"
        :name="userName"
        :size="avatarSize"
        :status="avatarStatus"
      />
      <span v-if="showUserName" class="ml-2 font-medium text-gray-700">
        {{ userName }}
      </span>
      <f-icon
        v-if="showChevron"
        :name="isOpen ? 'chevron-up' : 'chevron-down'"
        size="sm"
        class="ml-1 text-gray-500"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      ref="dropdown"
      :class="dropdownClasses"
      role="menu"
      :aria-label="menuAriaLabel"
    >
      <!-- User Info Header -->
      <div v-if="showUserInfo" class="px-4 py-3">
        <f-typography variant="body" class="font-medium text-gray-900" truncate>
          {{ userName }}
        </f-typography>
        <f-typography v-if="userEmail" variant="caption" class="text-gray-500" truncate>
          {{ userEmail }}
        </f-typography>
      </div>

      <f-divider v-if="showUserInfo && hasMenuItems" margin="none" />

      <!-- Menu Items Slot -->
      <div class="py-1">
        <slot name="menu-items">
          <!-- Default menu items if no slot provided -->
          <template v-for="(item, index) in menuItems">
            <f-divider
              v-if="item.divider"
              :key="`divider-${index}`"
              margin="sm"
            />
            <f-list-item
              v-else
              :key="item.key || `item-${index}`"
              :title="item.label"
              clickable
              :disabled="item.disabled"
              :class="getItemClasses(item)"
              @click="handleItemClick(item, $event)"
            >
              <template v-if="item.icon" #left>
                <f-icon :name="item.icon" size="sm" class="text-gray-500" />
              </template>
            </f-list-item>
          </template>
        </slot>
      </div>

      <!-- Logout Section -->
      <template v-if="showLogout">
        <f-divider margin="none" />
        <div class="py-1">
          <f-list-item
            :title="logoutLabel"
            clickable
            class="text-red-600 hover:bg-red-50"
            @click="handleLogout"
          >
            <template #left>
              <f-icon name="arrow-right" size="sm" class="text-red-500" />
            </template>
          </f-list-item>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FAvatar from '../../atoms/FAvatar/FAvatar.vue'
import FIcon from '../../atoms/FIcon/FIcon.vue'
import FTypography from '../../atoms/FTypography/FTypography.vue'
import FDivider from '../../atoms/FDivider/FDivider.vue'
import FListItem from '../../molecules/FListItem/FListItem.vue'

export default {
  name: 'FUserMenu',
  components: {
    FAvatar,
    FIcon,
    FTypography,
    FDivider,
    FListItem
  },
  props: {
    /**
     * Controls whether the menu is shown (based on login state)
     */
    isLoggedIn: {
      type: Boolean,
      default: true
    },
    /**
     * Controls the open state of the dropdown (v-model support)
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * User's display name
     */
    userName: {
      type: String,
      default: ''
    },
    /**
     * User's email address
     */
    userEmail: {
      type: String,
      default: ''
    },
    /**
     * Avatar image source URL
     */
    avatarSrc: {
      type: String,
      default: ''
    },
    /**
     * Avatar alt text
     */
    avatarAlt: {
      type: String,
      default: ''
    },
    /**
     * Avatar initials (used when no image)
     */
    avatarInitials: {
      type: String,
      default: ''
    },
    /**
     * Avatar size
     */
    avatarSize: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    /**
     * Avatar status indicator
     */
    avatarStatus: {
      type: String,
      default: null,
      validator: (value) => [null, 'online', 'busy', 'away', 'offline'].includes(value)
    },
    /**
     * Show username next to avatar in trigger
     */
    showUserName: {
      type: Boolean,
      default: false
    },
    /**
     * Show chevron icon in trigger
     */
    showChevron: {
      type: Boolean,
      default: true
    },
    /**
     * Show user info (name/email) in dropdown header
     */
    showUserInfo: {
      type: Boolean,
      default: true
    },
    /**
     * Array of menu items
     * Each item: { key?: string, label: string, icon?: string, disabled?: boolean, divider?: boolean }
     */
    menuItems: {
      type: Array,
      default: () => []
    },
    /**
     * Show logout button at bottom
     */
    showLogout: {
      type: Boolean,
      default: true
    },
    /**
     * Logout button label
     */
    logoutLabel: {
      type: String,
      default: 'Déconnexion'
    },
    /**
     * Dropdown alignment relative to trigger
     */
    dropdownAlign: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'right'].includes(value)
    },
    /**
     * Dropdown width
     */
    dropdownWidth: {
      type: String,
      default: 'w-56'
    },
    /**
     * ARIA label for the menu
     */
    menuAriaLabel: {
      type: String,
      default: 'Menu utilisateur'
    }
  },
  data() {
    return {
      internalOpen: false
    }
  },
  computed: {
    /**
     * Computed property for v-model support
     */
    isOpen: {
      get() {
        return this.value !== undefined ? this.value : this.internalOpen
      },
      set(val) {
        this.internalOpen = val
        this.$emit('input', val)
      }
    },
    /**
     * Check if there are menu items to display
     */
    hasMenuItems() {
      return this.menuItems.length > 0 || this.$slots['menu-items']
    },
    /**
     * Trigger button classes
     */
    triggerClasses() {
      return [
        'inline-flex items-center',
        'px-2 py-1 rounded-lg',
        'transition-colors duration-200',
        'hover:bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        'cursor-pointer'
      ].join(' ')
    },
    /**
     * Dropdown container classes
     */
    dropdownClasses() {
      const alignmentClass = this.dropdownAlign === 'left' ? 'left-0' : 'right-0'
      
      return [
        'absolute z-50 mt-2',
        alignmentClass,
        this.dropdownWidth,
        'bg-white rounded-lg shadow-lg',
        'border border-gray-200',
        'overflow-hidden'
      ].join(' ')
    }
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          document.addEventListener('click', this.handleClickOutside)
        })
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    /**
     * Toggle menu open/close state
     */
    toggleMenu() {
      this.isOpen = !this.isOpen
      this.$emit('toggle', this.isOpen)
    },
    /**
     * Close the menu
     */
    closeMenu() {
      if (this.isOpen) {
        this.isOpen = false
        this.$emit('close')
      }
    },
    /**
     * Handle clicks outside the dropdown
     */
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown
      const trigger = this.$refs.trigger
      
      if (
        dropdown &&
        trigger &&
        !dropdown.contains(event.target) &&
        !trigger.contains(event.target)
      ) {
        this.closeMenu()
      }
    },
    /**
     * Get classes for menu items based on item config
     */
    getItemClasses(item) {
      const classes = []
      if (item.danger) {
        classes.push('text-red-600 hover:bg-red-50')
      }
      return classes.join(' ')
    },
    /**
     * Handle menu item click
     */
    handleItemClick(item, event) {
      if (item.disabled) return
      
      this.$emit('item-click', { item, event })
      this.$emit('navigate', { item, event })
      
      // Close menu after click unless item specifies keepOpen
      if (!item.keepOpen) {
        this.closeMenu()
      }
    },
    /**
     * Handle logout action
     */
    handleLogout() {
      this.$emit('logout')
      this.closeMenu()
    }
  }
}
</script>
