import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "relative inline-flex flex-shrink-0",
      class: [_vm.sizeClasses.wrapper],
      on: { click: _vm.handleClick },
    },
    [
      _c(
        "div",
        {
          class: _vm.containerClasses,
          attrs: {
            role: _vm.showImage ? undefined : "img",
            "aria-label": _vm.computedAriaLabel,
          },
        },
        [
          _vm.showImage
            ? _c("img", {
                staticClass: "w-full h-full object-cover",
                attrs: { src: _vm.src, alt: _vm.alt, loading: "lazy" },
                on: { error: _vm.handleImageError },
              })
            : _c(
                "span",
                {
                  class: [
                    "flex items-center justify-center w-full h-full",
                    _vm.fontSizeClasses,
                  ],
                },
                [
                  _vm.displayInitials
                    ? [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.displayInitials) +
                            "\n\t\t\t"
                        ),
                      ]
                    : _c(
                        "svg",
                        {
                          staticClass: "w-3/5 h-3/5 text-white opacity-90",
                          attrs: {
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            xmlns: "http://www.w3.org/2000/svg",
                          },
                        },
                        [
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                              "clip-rule": "evenodd",
                            },
                          }),
                        ]
                      ),
                ],
                2
              ),
        ]
      ),
      _vm._v(" "),
      _vm.status ? _c("span", { class: _vm.statusClasses }) : _vm._e(),
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
    {},
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

  var FAvatar = __vue_component__;

export { FAvatar as default };
