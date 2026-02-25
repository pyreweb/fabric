import script from './FDivider.vue2.js';
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
    {
      class: _vm.containerClasses,
      attrs: { role: "separator", "aria-orientation": _vm.orientation },
    },
    [
      _vm.hasContent
        ? [
            _c("span", { class: _vm.lineClasses("start") }),
            _vm._v(" "),
            _c("span", { class: _vm.textClasses }, [_vm._t("default")], 2),
            _vm._v(" "),
            _c("span", { class: _vm.lineClasses("end") }),
          ]
        : _c("span", { class: _vm.lineClasses("full") }),
    ],
    2
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

  var FDivider = __vue_component__;

export { FDivider as default };
