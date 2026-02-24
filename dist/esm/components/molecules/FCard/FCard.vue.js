import script from './FCard.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.cardClasses, on: { click: _vm.handleClick } }, [
    _vm.$slots.header || _vm.title
      ? _c(
          "div",
          { staticClass: "px-4 pt-4" },
          [
            _vm._t("header", function () {
              return [
                _vm.title
                  ? _c("f-typography", { attrs: { variant: "h5" } }, [
                      _vm._v(_vm._s(_vm.title)),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.subtitle
                  ? _c("f-typography", { attrs: { variant: "caption" } }, [
                      _vm._v(_vm._s(_vm.subtitle)),
                    ])
                  : _vm._e(),
              ]
            }),
          ],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.media
      ? _c(
          "div",
          { staticClass: "w-full [&_img]:w-full [&_img]:h-auto [&_img]:block" },
          [_vm._t("media")],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "p-4" }, [_vm._t("default")], 2),
    _vm._v(" "),
    _vm.$slots.actions
      ? _c(
          "div",
          { staticClass: "px-4 pb-4 flex gap-2" },
          [_vm._t("actions")],
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

  var FCard = __vue_component__;

export { FCard as default };
