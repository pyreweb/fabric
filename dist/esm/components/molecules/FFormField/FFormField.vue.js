import script from './FFormField.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "flex flex-col gap-1.5" },
    [
      _vm.label
        ? _c(
            "label",
            {
              class: [
                "text-sm font-medium text-neutral-700",
                { "after:content-['_*'] after:text-danger-500": _vm.required },
              ],
              attrs: { for: _vm.inputId },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("f-input", {
        attrs: {
          id: _vm.inputId,
          value: _vm.value,
          type: _vm.type,
          placeholder: _vm.placeholder,
          size: _vm.size,
          disabled: _vm.disabled,
          readonly: _vm.readonly,
          error: !!_vm.errorMessage,
        },
        on: {
          input: function ($event) {
            return _vm.$emit("input", $event)
          },
          focus: function ($event) {
            return _vm.$emit("focus", $event)
          },
          blur: function ($event) {
            return _vm.$emit("blur", $event)
          },
        },
      }),
      _vm._v(" "),
      _vm.errorMessage
        ? _c("span", { staticClass: "text-xs text-danger-500" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.errorMessage) + "\n\t"),
          ])
        : _vm.hint
        ? _c("span", { staticClass: "text-xs text-neutral-500" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.hint) + "\n\t"),
          ])
        : _vm._e(),
    ],
    1
  )
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

  var FFormField = __vue_component__;

export { FFormField as default };
