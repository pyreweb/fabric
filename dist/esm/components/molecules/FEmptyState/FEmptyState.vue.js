import script from './FEmptyState.vue2.js';
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
      attrs: { role: "status", "aria-live": "polite" },
    },
    [
      _c("f-icon", {
        class: _vm.iconClasses,
        attrs: { name: _vm.icon, size: "xl", decorative: true },
      }),
      _vm._v(" "),
      _c(
        "f-typography",
        { class: _vm.titleClasses, attrs: { variant: "h5" } },
        [_vm._v("\n\t\t" + _vm._s(_vm.title) + "\n\t")]
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "f-typography",
            { class: _vm.descriptionClasses, attrs: { variant: "body" } },
            [_vm._v("\n\t\t" + _vm._s(_vm.description) + "\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _vm.actionLabel
        ? _c(
            "f-button",
            {
              class: _vm.actionClasses,
              attrs: { variant: _vm.actionVariant },
              on: { click: _vm.handleAction },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.actionLabel) + "\n\t")]
          )
        : _vm._e(),
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

  var FEmptyState = __vue_component__;

export { FEmptyState as default };
