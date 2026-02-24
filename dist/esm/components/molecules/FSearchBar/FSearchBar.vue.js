import script from './FSearchBar.vue2.js';
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
    { class: _vm.containerClasses },
    [
      _c(
        "div",
        { class: _vm.inputWrapperClasses },
        [
          _vm.iconPosition === "inside" && !_vm.buttonMode
            ? _c("f-icon", {
                class: _vm.insideIconClasses,
                attrs: { name: "search", size: _vm.iconSize },
              })
            : _vm._e(),
          _vm._v(" "),
          _c("input", {
            ref: "input",
            class: _vm.inputClasses,
            attrs: {
              type: "text",
              placeholder: _vm.placeholder,
              disabled: _vm.disabled,
            },
            domProps: { value: _vm.value },
            on: {
              input: _vm.handleInput,
              keydown: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.handleSubmit.apply(null, arguments)
              },
              focus: function ($event) {
                return _vm.$emit("focus", $event)
              },
              blur: function ($event) {
                return _vm.$emit("blur", $event)
              },
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _vm.buttonMode
        ? _c(
            "f-button",
            {
              attrs: { size: _vm.size, disabled: _vm.disabled, type: "button" },
              on: { click: _vm.handleSubmit },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.buttonLabel) + "\n\t")]
          )
        : _vm.iconPosition === "outside"
        ? _c(
            "button",
            {
              class: _vm.iconButtonClasses,
              attrs: { disabled: _vm.disabled, type: "button" },
              on: { click: _vm.handleSubmit },
            },
            [
              _c("f-icon", { attrs: { name: "search", size: _vm.iconSize } }),
              _vm._v(" "),
              _c("span", { staticClass: "sr-only" }, [
                _vm._v(_vm._s(_vm.buttonLabel)),
              ]),
            ],
            1
          )
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

  var FSearchBar = __vue_component__;

export { FSearchBar as default };
