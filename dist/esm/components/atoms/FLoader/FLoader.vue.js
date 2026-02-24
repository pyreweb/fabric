import script from './FLoader.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.wrapperClasses }, [
    _c(
      "div",
      {
        class: _vm.containerClasses,
        attrs: { role: "status", "aria-label": _vm.ariaLabel },
      },
      [
        _c(
          "svg",
          {
            class: _vm.spinnerClasses,
            style: _vm.spinnerStyle,
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
            },
          },
          [
            _c("circle", {
              staticClass: "opacity-25",
              attrs: {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                "stroke-width": "4",
              },
            }),
            _vm._v(" "),
            _c("path", {
              staticClass: "opacity-75",
              attrs: {
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
              },
            }),
          ]
        ),
      ]
    ),
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

  var FLoader = __vue_component__;

export { FLoader as default };
