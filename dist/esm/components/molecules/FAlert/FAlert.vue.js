import script from './FAlert.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isVisible
    ? _c(
        "div",
        { class: _vm.alertClasses, attrs: { role: "alert" } },
        [
          _c("f-icon", { attrs: { name: _vm.variant, size: "md" } }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-1 min-w-0" },
            [
              _vm.title
                ? _c(
                    "f-typography",
                    { class: _vm.titleClasses, attrs: { variant: "h6" } },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.message
                ? _c(
                    "f-typography",
                    { class: _vm.messageClasses, attrs: { variant: "body" } },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.message) + "\n\t\t")]
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
                    _vm._v("Fermer l'alerte"),
                  ]),
                ],
                1
              )
            : _vm._e(),
        ],
        1
      )
    : _vm._e()
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

  var FAlert = __vue_component__;

export { FAlert as default };
