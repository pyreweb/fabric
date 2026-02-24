import script from './FTextarea.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.wrapperClasses }, [
    _vm.label
      ? _c("label", { class: _vm.labelClasses, attrs: { for: _vm.inputId } }, [
          _vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t"),
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("textarea", {
      class: _vm.textareaClasses,
      attrs: {
        id: _vm.inputId,
        placeholder: _vm.placeholder,
        disabled: _vm.disabled,
        readonly: _vm.readonly,
        rows: _vm.rows,
        maxlength: _vm.maxlength,
        "aria-invalid": _vm.error,
        "aria-describedby": _vm.errorMessage ? _vm.errorId : undefined,
      },
      domProps: { value: _vm.value },
      on: {
        input: _vm.handleInput,
        focus: function ($event) {
          return _vm.$emit("focus", $event)
        },
        blur: function ($event) {
          return _vm.$emit("blur", $event)
        },
      },
    }),
    _vm._v(" "),
    _vm.hasCounter || _vm.errorMessage
      ? _c("div", { class: _vm.footerClasses }, [
          _vm.errorMessage
            ? _c(
                "span",
                { class: _vm.errorMessageClasses, attrs: { id: _vm.errorId } },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.errorMessage) + "\n\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.hasCounter
            ? _c(
                "span",
                {
                  class: [_vm.counterClasses, { "ml-auto": !_vm.errorMessage }],
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.characterCount) +
                      "/" +
                      _vm._s(_vm.maxlength) +
                      "\n\t\t"
                  ),
                ]
              )
            : _vm._e(),
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

  var FTextarea = __vue_component__;

export { FTextarea as default };
