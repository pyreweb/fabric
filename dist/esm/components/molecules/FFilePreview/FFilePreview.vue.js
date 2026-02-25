import script from './FFilePreview.vue2.js';
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
      _c("f-icon", {
        class: _vm.iconClasses,
        attrs: { name: _vm.fileIcon, size: "md" },
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex-1 min-w-0" },
        [
          _c(
            "f-typography",
            {
              class: _vm.fileNameClasses,
              attrs: { variant: "body", truncate: true },
            },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.fileName) + "\n\t\t")]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex-shrink-0" },
        [
          _vm.loading
            ? _c("f-loader", { attrs: { size: "sm", label: _vm.loadingLabel } })
            : _c(
                "f-button",
                {
                  attrs: {
                    variant: "ghost",
                    size: "small",
                    disabled: _vm.disabled,
                  },
                  on: { click: _vm.handleRemove },
                },
                [
                  _c("f-icon", { attrs: { name: "trash", size: "sm" } }),
                  _vm._v(" "),
                  _c("span", { staticClass: "sr-only" }, [
                    _vm._v(_vm._s(_vm.removeLabel)),
                  ]),
                ],
                1
              ),
        ],
        1
      ),
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

  var FFilePreview = __vue_component__;

export { FFilePreview as default };
