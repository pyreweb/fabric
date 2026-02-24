import script from './FRadio.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.containerClasses }, [
    _c("input", {
      class: _vm.inputClasses,
      attrs: { type: "radio", name: _vm.name, disabled: _vm.disabled },
      domProps: { value: _vm.value, checked: _vm.isChecked },
      on: { change: _vm.handleChange },
    }),
    _vm._v(" "),
    _c("span", { class: _vm.radioClasses, attrs: { "aria-hidden": "true" } }, [
      _vm.isChecked ? _c("span", { class: _vm.dotClasses }) : _vm._e(),
    ]),
    _vm._v(" "),
    _vm.label
      ? _c("span", { class: _vm.labelClasses }, [
          _vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t"),
        ])
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

  var FRadio = __vue_component__;

export { FRadio as default };
