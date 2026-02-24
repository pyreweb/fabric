import script from './FCheckbox.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.wrapperClasses }, [
    _c("input", {
      class: _vm.inputClasses,
      attrs: {
        type: "checkbox",
        disabled: _vm.disabled,
        "aria-invalid": _vm.error,
      },
      domProps: { checked: _vm.checked },
      on: {
        change: _vm.updateInput,
        focus: function ($event) {
          return _vm.$emit("focus", $event)
        },
        blur: function ($event) {
          return _vm.$emit("blur", $event)
        },
      },
    }),
    _vm._v(" "),
    _vm.label || _vm.$slots.default
      ? _c(
          "span",
          { class: _vm.labelClasses },
          [
            _vm._t("default", function () {
              return [_vm._v(_vm._s(_vm.label))]
            }),
          ],
          2
        )
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

  var FCheckbox = __vue_component__;

export { FCheckbox as default };
