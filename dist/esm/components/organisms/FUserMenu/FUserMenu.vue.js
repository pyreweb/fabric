import script from './FUserMenu.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoggedIn
    ? _c(
        "div",
        {
          staticClass: "relative inline-block",
          on: {
            keydown: function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "escape",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              return _vm.closeMenu.apply(null, arguments)
            },
          },
        },
        [
          _c(
            "button",
            {
              ref: "trigger",
              class: _vm.triggerClasses,
              attrs: {
                type: "button",
                "aria-expanded": _vm.isOpen,
                "aria-haspopup": "menu",
              },
              on: { click: _vm.toggleMenu },
            },
            [
              _c("f-avatar", {
                attrs: {
                  src: _vm.avatarSrc,
                  alt: _vm.avatarAlt,
                  initials: _vm.avatarInitials,
                  name: _vm.computedAvatarName,
                  size: _vm.avatarSize,
                  status: _vm.avatarStatus,
                },
              }),
              _vm._v(" "),
              _vm.showUserName
                ? _c(
                    "span",
                    { staticClass: "ml-2 font-medium text-neutral-700" },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.userName) + "\n\t\t")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showChevron
                ? _c("f-icon", {
                    staticClass: "ml-1 text-neutral-500",
                    attrs: {
                      name: _vm.isOpen ? "chevron-up" : "chevron-down",
                      size: "sm",
                    },
                  })
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.isOpen,
                  expression: "isOpen",
                },
              ],
              ref: "dropdown",
              class: _vm.dropdownClasses,
              attrs: { role: "menu", "aria-label": _vm.menuAriaLabel },
            },
            [
              _vm.showUserInfo
                ? _c(
                    "div",
                    { staticClass: "px-4 py-3" },
                    [
                      _c(
                        "f-typography",
                        {
                          staticClass: "font-medium text-neutral-900",
                          attrs: { variant: "body", truncate: "" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t" + _vm._s(_vm.userName) + "\n\t\t\t"
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _vm.userEmail
                        ? _c(
                            "f-typography",
                            {
                              staticClass: "text-neutral-500",
                              attrs: { variant: "caption", truncate: "" },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t" +
                                  _vm._s(_vm.userEmail) +
                                  "\n\t\t\t"
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showUserInfo && _vm.hasMenuItems
                ? _c("f-divider", { attrs: { margin: "none" } })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "py-1" },
                [
                  _vm._t("menu-items", function () {
                    return [
                      _vm._l(_vm.menuItems, function (item, index) {
                        return [
                          item.divider
                            ? _c("f-divider", {
                                key: "divider-" + index,
                                attrs: { margin: "sm" },
                              })
                            : _c("f-list-item", {
                                key: item.key || "item-" + index,
                                class: _vm.getItemClasses(item),
                                attrs: {
                                  title: item.label,
                                  clickable: "",
                                  disabled: item.disabled,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.handleItemClick(item, $event)
                                  },
                                },
                                scopedSlots: _vm._u(
                                  [
                                    item.icon
                                      ? {
                                          key: "left",
                                          fn: function () {
                                            return [
                                              _c("f-icon", {
                                                staticClass: "text-neutral-500",
                                                attrs: {
                                                  name: item.icon,
                                                  size: "sm",
                                                },
                                              }),
                                            ]
                                          },
                                          proxy: true,
                                        }
                                      : null,
                                  ],
                                  null,
                                  true
                                ),
                              }),
                        ]
                      }),
                    ]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _vm.showLogout
                ? [
                    _c("f-divider", { attrs: { margin: "none" } }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "py-1" },
                      [
                        _c("f-list-item", {
                          staticClass: "text-danger-600 hover:bg-danger-50",
                          attrs: { title: _vm.logoutLabel, clickable: "" },
                          on: { click: _vm.handleLogout },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "left",
                                fn: function () {
                                  return [
                                    _c("f-icon", {
                                      staticClass: "text-danger-500",
                                      attrs: {
                                        name: "arrow-right",
                                        size: "sm",
                                      },
                                    }),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            false,
                            983486866
                          ),
                        }),
                      ],
                      1
                    ),
                  ]
                : _vm._e(),
            ],
            2
          ),
        ]
      )
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

  var FUserMenu = __vue_component__;

export { FUserMenu as default };
