import script from './FPagination.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "nav",
    {
      class: _vm.containerClasses,
      attrs: { role: "navigation", "aria-label": "Pagination" },
    },
    [
      _c(
        "f-button",
        {
          attrs: {
            variant: _vm.buttonVariant,
            size: _vm.size,
            disabled: _vm.currentPage <= 1,
          },
          on: { click: _vm.goToPreviousPage },
          scopedSlots: _vm._u([
            {
              key: "iconLeft",
              fn: function () {
                return [
                  _c("f-icon", {
                    attrs: { name: "chevron-left", size: _vm.iconSize },
                  }),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _vm._v(" "),
          _c("span", { class: { "sr-only": !_vm.showLabels } }, [
            _vm._v(_vm._s(_vm.previousLabel)),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex items-center gap-1" },
        [
          _vm._l(_vm.visiblePages, function (page, index) {
            return [
              page === "..."
                ? _c(
                    "span",
                    {
                      key: "ellipsis-" + index,
                      staticClass: "px-2 text-neutral-400",
                    },
                    [_vm._v("\n\t\t\t\t...\n\t\t\t")]
                  )
                : [
                    page === _vm.currentPage
                      ? _c(
                          "span",
                          { key: page, attrs: { "aria-current": "page" } },
                          [
                            _c(
                              "f-button",
                              {
                                attrs: {
                                  variant: _vm.activeVariant,
                                  size: _vm.size,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.goToPage(page)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(page) +
                                    "\n\t\t\t\t\t"
                                ),
                              ]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "f-button",
                          {
                            key: page,
                            attrs: {
                              variant: _vm.buttonVariant,
                              size: _vm.size,
                            },
                            on: {
                              click: function ($event) {
                                return _vm.goToPage(page)
                              },
                            },
                          },
                          [_vm._v("\n\t\t\t\t\t" + _vm._s(page) + "\n\t\t\t\t")]
                        ),
                  ],
            ]
          }),
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "f-button",
        {
          attrs: {
            variant: _vm.buttonVariant,
            size: _vm.size,
            disabled: _vm.currentPage >= _vm.totalPages,
          },
          on: { click: _vm.goToNextPage },
          scopedSlots: _vm._u([
            {
              key: "iconRight",
              fn: function () {
                return [
                  _c("f-icon", {
                    attrs: { name: "chevron-right", size: _vm.iconSize },
                  }),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _c("span", { class: { "sr-only": !_vm.showLabels } }, [
            _vm._v(_vm._s(_vm.nextLabel)),
          ]),
        ]
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

  var FPagination = __vue_component__;

export { FPagination as default };
