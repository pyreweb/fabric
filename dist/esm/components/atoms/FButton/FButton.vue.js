import script from './FButton.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      class: _vm.classes,
      attrs: {
        type: _vm.type,
        disabled: _vm.disabled || _vm.loading,
        "aria-disabled": _vm.disabled || _vm.loading,
      },
      on: { click: _vm.handleClick },
    },
    [
      _vm.loading
        ? _c(
            "div",
            {
              staticClass:
                "absolute inset-0 flex items-center justify-center text-current",
            },
            [
              _c("FLoader", {
                staticClass: "text-current opacity-100",
                attrs: { size: "sm" },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "flex items-center gap-2",
          class: { "opacity-0": _vm.loading },
        },
        [
          _vm._t("prefix", function () {
            return [
              _vm.iconLeft
                ? _c("span", {
                    class: _vm.iconLeft,
                    attrs: { "aria-hidden": "true" },
                  })
                : _vm._e(),
            ]
          }),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _vm._t("suffix", function () {
            return [
              _vm.iconRight
                ? _c("span", {
                    class: _vm.iconRight,
                    attrs: { "aria-hidden": "true" },
                  })
                : _vm._e(),
            ]
          }),
        ],
        2
      ),
    ]
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

  var FButton = __vue_component__;

export { FButton as default };
