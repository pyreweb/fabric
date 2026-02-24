import script from './FModal.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isOpen
    ? _c("div", { staticClass: "fixed inset-0 z-50 overflow-y-auto" }, [
        _c("div", {
          staticClass:
            "fixed inset-0 bg-black opacity-50 transition-opacity duration-[var(--transition-duration-slow)] ease-[var(--transition-easing-standard)]",
          on: { click: _vm.handleOverlayClick },
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "flex min-h-full items-center justify-center p-4" },
          [
            _c(
              "div",
              {
                class: _vm.modalClasses,
                attrs: {
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": _vm.titleId,
                },
              },
              [
                _vm.$slots.header || _vm.title
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "flex items-center justify-between px-4 pt-4",
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "flex-1 min-w-0" },
                          [
                            _vm._t("header", function () {
                              return [
                                _c(
                                  "f-typography",
                                  { attrs: { id: _vm.titleId, variant: "h5" } },
                                  [_vm._v(_vm._s(_vm.title))]
                                ),
                                _vm._v(" "),
                                _vm.subtitle
                                  ? _c(
                                      "f-typography",
                                      {
                                        staticClass: "text-neutral-500",
                                        attrs: { variant: "caption" },
                                      },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t" +
                                            _vm._s(_vm.subtitle) +
                                            "\n\t\t\t\t\t\t"
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            }),
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.closable
                          ? _c(
                              "f-button",
                              {
                                staticClass: "flex-shrink-0 -mr-2",
                                attrs: { variant: "ghost", size: "small" },
                                on: { click: _vm.handleClose },
                              },
                              [
                                _c("f-icon", {
                                  attrs: { name: "close", size: "sm" },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "sr-only" }, [
                                  _vm._v("Fermer la modale"),
                                ]),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "p-4" },
                  [
                    _vm._t("body", function () {
                      return [_vm._t("default")]
                    }),
                  ],
                  2
                ),
                _vm._v(" "),
                _vm.$slots.actions
                  ? _c(
                      "div",
                      { staticClass: "px-4 pb-4 flex gap-2 justify-end" },
                      [_vm._t("actions")],
                      2
                    )
                  : _vm._e(),
              ]
            ),
          ]
        ),
      ])
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

  var FModal = __vue_component__;

export { FModal as default };
