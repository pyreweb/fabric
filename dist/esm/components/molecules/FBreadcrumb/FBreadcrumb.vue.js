import script from './FBreadcrumb.vue2.js';
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
    { class: _vm.breadcrumbClasses, attrs: { "aria-label": _vm.ariaLabel } },
    [
      _c(
        "ol",
        { staticClass: "flex items-center flex-wrap gap-1" },
        _vm._l(_vm.items, function (item, index) {
          return _c(
            "li",
            { key: index, staticClass: "flex items-center" },
            [
              index > 0
                ? _c("f-icon", {
                    class: _vm.separatorClasses,
                    attrs: { name: _vm.separatorIcon, size: "sm" },
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.isCurrentItem(index) || _vm.isCurrentItem(index)
                ? _c(
                    _vm.isCurrentItem(index)
                      ? "span"
                      : item.href
                      ? "a"
                      : "button",
                    _vm._b(
                      {
                        tag: "component",
                        class: _vm.getItemClasses(index),
                        attrs: {
                          "aria-current": _vm.isCurrentItem(index)
                            ? "page"
                            : undefined,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.handleItemClick($event, item, index)
                          },
                        },
                      },
                      "component",
                      !_vm.isCurrentItem(index) && item.href
                        ? { href: item.href }
                        : {},
                      false
                    ),
                    [
                      item.icon
                        ? _c("f-icon", {
                            staticClass: "mr-1",
                            attrs: { name: item.icon, size: "sm" },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "f-typography",
                        {
                          class: _vm.getTextClasses(index),
                          attrs: { variant: "body", tag: "span" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t" + _vm._s(item.label) + "\n\t\t\t\t"
                          ),
                        ]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          )
        }),
        0
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

  var FBreadcrumb = __vue_component__;

export { FBreadcrumb as default };
