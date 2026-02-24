import script from './FToastProvider.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';
import createInjector from '../../../node_modules/vue-runtime-helpers/dist/inject-style/browser.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm._l(_vm.positions, function (pos) {
        return _c(
          "div",
          { key: pos, class: _vm.containerClasses(pos) },
          _vm._l(_vm.toastsByPosition[pos], function (toast) {
            return _c("f-toast", {
              key: toast.id,
              attrs: {
                variant: toast.variant,
                title: toast.title,
                message: toast.message,
                closable: toast.closable,
                duration: toast.duration,
                position: pos,
              },
              on: {
                close: function ($event) {
                  return _vm.removeToast(toast.id)
                },
              },
            })
          }),
          1
        )
      }),
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-142a9fb2_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Ensure toasts are clickable */\n.fixed > *[data-v-142a9fb2] {\n\tpointer-events: auto;\n}\n", map: {"version":3,"sources":["/home/runner/work/fabric/fabric/src/components/organisms/FToastProvider/FToastProvider.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAiNA,gCAAA;AACA;CACA,oBAAA;AACA","file":"FToastProvider.vue","sourcesContent":["<template>\n\t<div>\n\t\t<slot />\n\t\t<div v-for=\"pos in positions\" :key=\"pos\" :class=\"containerClasses(pos)\">\n\t\t\t<f-toast\n\t\t\t\tv-for=\"toast in toastsByPosition[pos]\"\n\t\t\t\t:key=\"toast.id\"\n\t\t\t\t:variant=\"toast.variant\"\n\t\t\t\t:title=\"toast.title\"\n\t\t\t\t:message=\"toast.message\"\n\t\t\t\t:closable=\"toast.closable\"\n\t\t\t\t:duration=\"toast.duration\"\n\t\t\t\t:position=\"pos\"\n\t\t\t\t@close=\"removeToast(toast.id)\"\n\t\t\t/>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport FToast from '../../molecules/FToast/FToast.vue';\n\nlet toastId = 0;\n\nexport default {\n\tname: 'FToastProvider',\n\tcomponents: {\n\t\tFToast\n\t},\n\tprops: {\n\t\t/**\n\t\t * Position par défaut des toasts\n\t\t */\n\t\tposition: {\n\t\t\ttype: String,\n\t\t\tdefault: 'top-right',\n\t\t\tvalidator: (value) =>\n\t\t\t\t[\n\t\t\t\t\t'top-left',\n\t\t\t\t\t'top-center',\n\t\t\t\t\t'top-right',\n\t\t\t\t\t'bottom-left',\n\t\t\t\t\t'bottom-center',\n\t\t\t\t\t'bottom-right'\n\t\t\t\t].includes(value)\n\t\t},\n\t\t/**\n\t\t * Nombre maximum de toasts affichés simultanément\n\t\t */\n\t\tmaxToasts: {\n\t\t\ttype: Number,\n\t\t\tdefault: 5\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\ttoasts: [],\n\t\t\tpositions: [\n\t\t\t\t'top-left',\n\t\t\t\t'top-center',\n\t\t\t\t'top-right',\n\t\t\t\t'bottom-left',\n\t\t\t\t'bottom-center',\n\t\t\t\t'bottom-right'\n\t\t\t]\n\t\t};\n\t},\n\tcomputed: {\n\t\ttoastsByPosition() {\n\t\t\treturn this.positions.reduce((acc, position) => {\n\t\t\t\tacc[position] = this.toasts.filter(\n\t\t\t\t\t(toast) => toast.position === position\n\t\t\t\t);\n\t\t\t\treturn acc;\n\t\t\t}, {});\n\t\t}\n\t},\n\tcreated() {\n\t\t// Expose API globally via $root for Vue 2 compatibility\n\t\t// Note: In Vue 3, this should be replaced with provide/inject or a plugin\n\t\t// This approach is acceptable for Vue 2 applications for convenience\n\t\tif (this.$root && !this.$root.$toast) {\n\t\t\tthis.$root.$toast = {\n\t\t\t\tshow: this.show,\n\t\t\t\tsuccess: this.success,\n\t\t\t\terror: this.error,\n\t\t\t\tinfo: this.info,\n\t\t\t\twarning: this.warning,\n\t\t\t\tclear: this.clear\n\t\t\t};\n\t\t} else if (this.$root && this.$root.$toast) {\n\t\t\t// Warn if another FToastProvider is already mounted\n\t\t\tconsole.warn(\n\t\t\t\t'FToastProvider: Multiple instances detected. Only one FToastProvider should be mounted at a time. The global API will use the first mounted instance.'\n\t\t\t);\n\t\t}\n\t},\n\tbeforeDestroy() {\n\t\t// Clean up global API\n\t\tif (this.$root && this.$root.$toast) {\n\t\t\tdelete this.$root.$toast;\n\t\t}\n\t},\n\tmethods: {\n\t\tcontainerClasses(position) {\n\t\t\tconst baseClasses =\n\t\t\t\t'fixed z-50 flex flex-col gap-3 p-4 pointer-events-none';\n\t\t\tconst positionClasses = {\n\t\t\t\t'top-left': 'top-0 left-0',\n\t\t\t\t'top-center': 'top-0 left-1/2 -translate-x-1/2',\n\t\t\t\t'top-right': 'top-0 right-0',\n\t\t\t\t'bottom-left': 'bottom-0 left-0',\n\t\t\t\t'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',\n\t\t\t\t'bottom-right': 'bottom-0 right-0'\n\t\t\t};\n\n\t\t\treturn `${baseClasses} ${positionClasses[position]}`;\n\t\t},\n\t\t/**\n\t\t * Affiche un toast avec des options personnalisées\n\t\t */\n\t\tshow(options) {\n\t\t\tconst toast = {\n\t\t\t\tid: ++toastId,\n\t\t\t\tvariant: options.variant || 'info',\n\t\t\t\ttitle: options.title || '',\n\t\t\t\tmessage: options.message || '',\n\t\t\t\tclosable: options.closable !== undefined ? options.closable : true,\n\t\t\t\tduration: options.duration !== undefined ? options.duration : 5000,\n\t\t\t\tposition: options.position || this.position\n\t\t\t};\n\n\t\t\t// Limit the number of toasts\n\t\t\tif (this.toasts.length >= this.maxToasts) {\n\t\t\t\tthis.toasts.shift();\n\t\t\t}\n\n\t\t\tthis.toasts.push(toast);\n\t\t\tthis.$emit('show', toast);\n\n\t\t\treturn toast.id;\n\t\t},\n\t\t/**\n\t\t * Affiche un toast de succès\n\t\t */\n\t\tsuccess(message, title = 'Succès', options = {}) {\n\t\t\treturn this.show({\n\t\t\t\tvariant: 'success',\n\t\t\t\ttitle,\n\t\t\t\tmessage,\n\t\t\t\t...options\n\t\t\t});\n\t\t},\n\t\t/**\n\t\t * Affiche un toast d'erreur\n\t\t */\n\t\terror(message, title = 'Erreur', options = {}) {\n\t\t\treturn this.show({\n\t\t\t\tvariant: 'error',\n\t\t\t\ttitle,\n\t\t\t\tmessage,\n\t\t\t\t...options\n\t\t\t});\n\t\t},\n\t\t/**\n\t\t * Affiche un toast d'information\n\t\t */\n\t\tinfo(message, title = 'Information', options = {}) {\n\t\t\treturn this.show({\n\t\t\t\tvariant: 'info',\n\t\t\t\ttitle,\n\t\t\t\tmessage,\n\t\t\t\t...options\n\t\t\t});\n\t\t},\n\t\t/**\n\t\t * Affiche un toast d'avertissement\n\t\t */\n\t\twarning(message, title = 'Avertissement', options = {}) {\n\t\t\treturn this.show({\n\t\t\t\tvariant: 'warning',\n\t\t\t\ttitle,\n\t\t\t\tmessage,\n\t\t\t\t...options\n\t\t\t});\n\t\t},\n\t\t/**\n\t\t * Supprime un toast spécifique\n\t\t */\n\t\tremoveToast(id) {\n\t\t\tconst index = this.toasts.findIndex((t) => t.id === id);\n\t\t\tif (index !== -1) {\n\t\t\t\tconst toast = this.toasts[index];\n\t\t\t\tthis.toasts.splice(index, 1);\n\t\t\t\tthis.$emit('remove', toast);\n\t\t\t}\n\t\t},\n\t\t/**\n\t\t * Supprime tous les toasts\n\t\t */\n\t\tclear() {\n\t\t\tthis.toasts = [];\n\t\t\tthis.$emit('clear');\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n/* Ensure toasts are clickable */\n.fixed > * {\n\tpointer-events: auto;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-142a9fb2";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

  var FToastProvider = __vue_component__;

export { FToastProvider as default };
