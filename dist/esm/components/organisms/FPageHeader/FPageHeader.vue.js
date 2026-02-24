import script from './FPageHeader.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("header", { class: _vm.headerClasses }, [
    _vm.showBreadcrumb
      ? _c(
          "div",
          { staticClass: "mb-4" },
          [
            _c("f-breadcrumb", {
              attrs: {
                items: _vm.breadcrumbItems,
                "separator-icon": _vm.breadcrumbSeparatorIcon,
                "aria-label": _vm.breadcrumbAriaLabel,
              },
              on: { navigate: _vm.handleBreadcrumbNavigate },
            }),
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { class: _vm.contentClasses }, [
      _c(
        "div",
        { class: _vm.titleSectionClasses },
        [
          _vm.showAvatar
            ? _c("f-avatar", {
                staticClass: "flex-shrink-0",
                attrs: {
                  src: _vm.avatarSrc,
                  alt: _vm.avatarAlt,
                  initials: _vm.avatarInitials,
                  name: _vm.avatarName,
                  size: _vm.avatarSize,
                  shape: _vm.avatarShape,
                  status: _vm.avatarStatus,
                },
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-1 min-w-0" },
            [
              _c(
                "f-typography",
                {
                  attrs: {
                    variant: _vm.titleVariant,
                    truncate: _vm.truncateTitle,
                  },
                },
                [
                  _vm._t("title", function () {
                    return [_vm._v(_vm._s(_vm.title))]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _vm.subtitle || _vm.$slots.subtitle
                ? _c(
                    "f-typography",
                    {
                      staticClass: "text-neutral-500 mt-1",
                      attrs: { variant: "body", tag: "p" },
                    },
                    [
                      _vm._t("subtitle", function () {
                        return [_vm._v(_vm._s(_vm.subtitle))]
                      }),
                    ],
                    2
                  )
                : _vm._e(),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm.$slots.actions
        ? _c("div", { class: _vm.actionsClasses }, [_vm._t("actions")], 2)
        : _vm._e(),
    ]),
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

  var FPageHeader = __vue_component__;

export { FPageHeader as default };
