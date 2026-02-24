import script from './FToast.vue2.js';
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
    "transition",
    {
      attrs: { name: _vm.transitionName },
      on: {
        "before-enter": _vm.onBeforeEnter,
        enter: _vm.onEnter,
        leave: _vm.onLeave,
      },
    },
    [
      _vm.isVisible
        ? _c(
            "div",
            {
              class: _vm.toastClasses,
              attrs: { role: "alert", "aria-live": "polite" },
              on: { mouseenter: _vm.pauseTimer, mouseleave: _vm.resumeTimer },
            },
            [
              _c("f-icon", { attrs: { name: _vm.iconName, size: "md" } }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex-1 min-w-0" },
                [
                  _vm.title
                    ? _c(
                        "f-typography",
                        { class: _vm.titleClasses, attrs: { variant: "h6" } },
                        [_vm._v("\n\t\t\t\t" + _vm._s(_vm.title) + "\n\t\t\t")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.message
                    ? _c(
                        "f-typography",
                        {
                          class: _vm.messageClasses,
                          attrs: { variant: "body" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t" + _vm._s(_vm.message) + "\n\t\t\t"
                          ),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("default"),
                ],
                2
              ),
              _vm._v(" "),
              _vm.closable
                ? _c(
                    "f-button",
                    {
                      class: _vm.closeButtonClasses,
                      attrs: { variant: "text", size: "small" },
                      on: { click: _vm.handleClose },
                    },
                    [
                      _c("f-icon", { attrs: { name: "close", size: "sm" } }),
                      _vm._v(" "),
                      _c("span", { staticClass: "sr-only" }, [
                        _vm._v("Fermer la notification"),
                      ]),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          )
        : _vm._e(),
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-df2f9ab0_0", { source: "\n.toast-slide-left-enter-active[data-v-df2f9ab0],\n.toast-slide-left-leave-active[data-v-df2f9ab0] {\n\ttransition: all 0.3s ease-out;\n}\n.toast-slide-left-enter[data-v-df2f9ab0] {\n\ttransform: translateX(-100%);\n\topacity: 0;\n}\n.toast-slide-left-leave-to[data-v-df2f9ab0] {\n\ttransform: translateX(-100%);\n\topacity: 0;\n}\n.toast-slide-right-enter-active[data-v-df2f9ab0],\n.toast-slide-right-leave-active[data-v-df2f9ab0] {\n\ttransition: all 0.3s ease-out;\n}\n.toast-slide-right-enter[data-v-df2f9ab0] {\n\ttransform: translateX(100%);\n\topacity: 0;\n}\n.toast-slide-right-leave-to[data-v-df2f9ab0] {\n\ttransform: translateX(100%);\n\topacity: 0;\n}\n.toast-slide-down-enter-active[data-v-df2f9ab0],\n.toast-slide-down-leave-active[data-v-df2f9ab0] {\n\ttransition: all 0.3s ease-out;\n}\n.toast-slide-down-enter[data-v-df2f9ab0] {\n\ttransform: translateY(-100%);\n\topacity: 0;\n}\n.toast-slide-down-leave-to[data-v-df2f9ab0] {\n\ttransform: translateY(-100%);\n\topacity: 0;\n}\n", map: {"version":3,"sources":["/home/runner/work/fabric/fabric/src/components/molecules/FToast/FToast.vue"],"names":[],"mappings":";AA8OA;;CAEA,6BAAA;AACA;AAEA;CACA,4BAAA;CACA,UAAA;AACA;AAEA;CACA,4BAAA;CACA,UAAA;AACA;AAEA;;CAEA,6BAAA;AACA;AAEA;CACA,2BAAA;CACA,UAAA;AACA;AAEA;CACA,2BAAA;CACA,UAAA;AACA;AAEA;;CAEA,6BAAA;AACA;AAEA;CACA,4BAAA;CACA,UAAA;AACA;AAEA;CACA,4BAAA;CACA,UAAA;AACA","file":"FToast.vue","sourcesContent":["<template>\n\t<transition\n\t\t:name=\"transitionName\"\n\t\t@before-enter=\"onBeforeEnter\"\n\t\t@enter=\"onEnter\"\n\t\t@leave=\"onLeave\"\n\t>\n\t\t<div\n\t\t\tv-if=\"isVisible\"\n\t\t\t:class=\"toastClasses\"\n\t\t\trole=\"alert\"\n\t\t\taria-live=\"polite\"\n\t\t\t@mouseenter=\"pauseTimer\"\n\t\t\t@mouseleave=\"resumeTimer\"\n\t\t>\n\t\t\t<f-icon :name=\"iconName\" size=\"md\" />\n\t\t\t<div class=\"flex-1 min-w-0\">\n\t\t\t\t<f-typography v-if=\"title\" variant=\"h6\" :class=\"titleClasses\">\n\t\t\t\t\t{{ title }}\n\t\t\t\t</f-typography>\n\t\t\t\t<f-typography v-if=\"message\" variant=\"body\" :class=\"messageClasses\">\n\t\t\t\t\t{{ message }}\n\t\t\t\t</f-typography>\n\t\t\t\t<slot />\n\t\t\t</div>\n\t\t\t<f-button\n\t\t\t\tv-if=\"closable\"\n\t\t\t\tvariant=\"text\"\n\t\t\t\tsize=\"small\"\n\t\t\t\t:class=\"closeButtonClasses\"\n\t\t\t\t@click=\"handleClose\"\n\t\t\t>\n\t\t\t\t<f-icon name=\"close\" size=\"sm\" />\n\t\t\t\t<span class=\"sr-only\">Fermer la notification</span>\n\t\t\t</f-button>\n\t\t</div>\n\t</transition>\n</template>\n\n<script>\nimport FIcon from '../../atoms/FIcon/FIcon.vue';\nimport FTypography from '../../atoms/FTypography/FTypography.vue';\nimport FButton from '../../atoms/FButton/FButton.vue';\n\nconst VARIANT_STYLES = {\n\tsuccess: {\n\t\tcontainer: 'bg-success-50 border-success-200 text-success-800',\n\t\ttitle: 'text-success-800',\n\t\tmessage: 'text-success-700',\n\t\tcloseButton: 'text-success-600 hover:text-success-800',\n\t\ticon: 'success'\n\t},\n\terror: {\n\t\tcontainer: 'bg-danger-50 border-danger-200 text-danger-800',\n\t\ttitle: 'text-danger-800',\n\t\tmessage: 'text-danger-700',\n\t\tcloseButton: 'text-danger-600 hover:text-danger-800',\n\t\ticon: 'error'\n\t},\n\tinfo: {\n\t\tcontainer: 'bg-primary-50 border-primary-200 text-primary-800',\n\t\ttitle: 'text-primary-800',\n\t\tmessage: 'text-primary-700',\n\t\tcloseButton: 'text-primary-600 hover:text-primary-800',\n\t\ticon: 'info'\n\t},\n\twarning: {\n\t\tcontainer: 'bg-warning-50 border-warning-200 text-warning-800',\n\t\ttitle: 'text-warning-800',\n\t\tmessage: 'text-warning-700',\n\t\tcloseButton: 'text-warning-600 hover:text-warning-800',\n\t\ticon: 'warning'\n\t}\n};\n\nexport default {\n\tname: 'FToast',\n\tcomponents: {\n\t\tFIcon,\n\t\tFTypography,\n\t\tFButton\n\t},\n\tprops: {\n\t\t/**\n\t\t * Type de toast (success, error, info, warning)\n\t\t */\n\t\tvariant: {\n\t\t\ttype: String,\n\t\t\tdefault: 'info',\n\t\t\tvalidator: (value) =>\n\t\t\t\t['success', 'error', 'info', 'warning'].includes(value)\n\t\t},\n\t\t/**\n\t\t * Titre du toast\n\t\t */\n\t\ttitle: {\n\t\t\ttype: String,\n\t\t\tdefault: ''\n\t\t},\n\t\t/**\n\t\t * Message du toast\n\t\t */\n\t\tmessage: {\n\t\t\ttype: String,\n\t\t\tdefault: ''\n\t\t},\n\t\t/**\n\t\t * Afficher le bouton de fermeture\n\t\t */\n\t\tclosable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t},\n\t\t/**\n\t\t * Durée d'affichage en millisecondes (0 = pas de fermeture automatique)\n\t\t */\n\t\tduration: {\n\t\t\ttype: Number,\n\t\t\tdefault: 5000\n\t\t},\n\t\t/**\n\t\t * Position du toast (utilisé pour l'animation)\n\t\t */\n\t\tposition: {\n\t\t\ttype: String,\n\t\t\tdefault: 'top-right',\n\t\t\tvalidator: (value) =>\n\t\t\t\t[\n\t\t\t\t\t'top-left',\n\t\t\t\t\t'top-center',\n\t\t\t\t\t'top-right',\n\t\t\t\t\t'bottom-left',\n\t\t\t\t\t'bottom-center',\n\t\t\t\t\t'bottom-right'\n\t\t\t\t].includes(value)\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tisVisible: true,\n\t\t\ttimer: null,\n\t\t\tremainingTime: this.duration,\n\t\t\tstartTime: null,\n\t\t\tpausedAt: null\n\t\t};\n\t},\n\tcomputed: {\n\t\tvariantStyles() {\n\t\t\treturn VARIANT_STYLES[this.variant];\n\t\t},\n\t\ttoastClasses() {\n\t\t\tconst baseClasses =\n\t\t\t\t'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[320px] max-w-md';\n\t\t\treturn `${baseClasses} ${this.variantStyles.container}`;\n\t\t},\n\t\ttitleClasses() {\n\t\t\treturn this.variantStyles.title;\n\t\t},\n\t\tmessageClasses() {\n\t\t\treturn this.variantStyles.message;\n\t\t},\n\t\tcloseButtonClasses() {\n\t\t\treturn `flex-shrink-0 ${this.variantStyles.closeButton}`;\n\t\t},\n\t\ticonName() {\n\t\t\treturn this.variantStyles.icon;\n\t\t},\n\t\ttransitionName() {\n\t\t\tif (this.position.includes('left')) {\n\t\t\t\treturn 'toast-slide-left';\n\t\t\t} else if (this.position.includes('right')) {\n\t\t\t\treturn 'toast-slide-right';\n\t\t\t}\n\t\t\treturn 'toast-slide-down';\n\t\t}\n\t},\n\tmounted() {\n\t\tif (this.duration > 0) {\n\t\t\tthis.startTimer();\n\t\t}\n\t},\n\tbeforeDestroy() {\n\t\tthis.clearTimer();\n\t},\n\tmethods: {\n\t\tstartTimer() {\n\t\t\tthis.clearTimer();\n\t\t\tthis.startTime = Date.now();\n\t\t\tthis.timer = setTimeout(() => {\n\t\t\t\tthis.handleClose();\n\t\t\t}, this.remainingTime);\n\t\t},\n\t\tclearTimer() {\n\t\t\tif (this.timer) {\n\t\t\t\tclearTimeout(this.timer);\n\t\t\t\tthis.timer = null;\n\t\t\t}\n\t\t},\n\t\tpauseTimer() {\n\t\t\tif (this.timer && this.duration > 0 && this.startTime) {\n\t\t\t\tconst elapsed = Date.now() - this.startTime;\n\t\t\t\tthis.remainingTime = Math.max(0, this.remainingTime - elapsed);\n\t\t\t\tthis.clearTimer();\n\t\t\t\tthis.pausedAt = Date.now();\n\t\t\t}\n\t\t},\n\t\tresumeTimer() {\n\t\t\tif (this.pausedAt && this.duration > 0 && this.remainingTime > 0) {\n\t\t\t\tthis.pausedAt = null;\n\t\t\t\tthis.startTimer();\n\t\t\t} else if (this.pausedAt && this.remainingTime <= 0) {\n\t\t\t\tthis.handleClose();\n\t\t\t}\n\t\t},\n\t\thandleClose() {\n\t\t\tthis.isVisible = false;\n\t\t\tthis.$emit('close');\n\t\t},\n\t\tonBeforeEnter(el) {\n\t\t\tel.style.opacity = '0';\n\t\t},\n\t\tonEnter(el, done) {\n\t\t\t// Force reflow\n\t\t\tvoid el.offsetHeight;\n\t\t\tel.style.transition = 'all 0.3s ease-out';\n\t\t\tel.style.opacity = '1';\n\t\t\tdone();\n\t\t},\n\t\tonLeave(el, done) {\n\t\t\tel.style.transition = 'all 0.3s ease-in';\n\t\t\tel.style.opacity = '0';\n\t\t\tsetTimeout(done, 300);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n.toast-slide-left-enter-active,\n.toast-slide-left-leave-active {\n\ttransition: all 0.3s ease-out;\n}\n\n.toast-slide-left-enter {\n\ttransform: translateX(-100%);\n\topacity: 0;\n}\n\n.toast-slide-left-leave-to {\n\ttransform: translateX(-100%);\n\topacity: 0;\n}\n\n.toast-slide-right-enter-active,\n.toast-slide-right-leave-active {\n\ttransition: all 0.3s ease-out;\n}\n\n.toast-slide-right-enter {\n\ttransform: translateX(100%);\n\topacity: 0;\n}\n\n.toast-slide-right-leave-to {\n\ttransform: translateX(100%);\n\topacity: 0;\n}\n\n.toast-slide-down-enter-active,\n.toast-slide-down-leave-active {\n\ttransition: all 0.3s ease-out;\n}\n\n.toast-slide-down-enter {\n\ttransform: translateY(-100%);\n\topacity: 0;\n}\n\n.toast-slide-down-leave-to {\n\ttransform: translateY(-100%);\n\topacity: 0;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-df2f9ab0";
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

  var FToast = __vue_component__;

export { FToast as default };
