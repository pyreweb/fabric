import script from './FAccordionItem.vue2.js';
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
    { staticClass: "border border-neutral-200 rounded-lg overflow-hidden" },
    [
      _c(
        "button",
        {
          class: _vm.headerClasses,
          attrs: {
            id: _vm.headerId,
            type: "button",
            "aria-expanded": String(_vm.isOpen),
            "aria-controls": _vm.contentId,
          },
          on: { click: _vm.toggle },
        },
        [
          _c(
            "f-typography",
            { staticClass: "flex-1 text-left", attrs: { variant: "h6" } },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")]
          ),
          _vm._v(" "),
          _c("f-icon", {
            class: _vm.iconClasses,
            attrs: { name: "chevron-down", size: "md" },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "content",
          class: _vm.contentWrapperClasses,
          style: _vm.contentStyle,
          attrs: {
            id: _vm.contentId,
            "aria-labelledby": _vm.headerId,
            role: "region",
          },
        },
        [
          _c(
            "div",
            { ref: "contentInner", staticClass: "p-4" },
            [_vm._t("default")],
            2
          ),
        ]
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

  var FAccordionItem = __vue_component__;

export { FAccordionItem as default };
