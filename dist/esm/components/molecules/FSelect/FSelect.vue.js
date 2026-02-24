import script from './FSelect.vue2.js';
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
      on: {
        keydown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "escape", undefined, $event.key, undefined)
          ) {
            return null
          }
          return _vm.closeDropdown.apply(null, arguments)
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
            id: _vm.triggerId,
            type: "button",
            disabled: _vm.disabled,
            "aria-expanded": String(_vm.isOpen),
            "aria-haspopup": "listbox",
            "aria-labelledby": _vm.labelId,
          },
          on: {
            click: _vm.toggleDropdown,
            keydown: [
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown",
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                return _vm.openDropdown.apply(null, arguments)
              },
              function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp",
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                return _vm.openDropdown.apply(null, arguments)
              },
            ],
          },
        },
        [
          _c("span", { class: _vm.valueClasses }, [
            _vm._v(_vm._s(_vm.displayValue)),
          ]),
          _vm._v(" "),
          _c("f-icon", {
            class: _vm.iconClasses,
            attrs: {
              name: _vm.isOpen ? "chevron-up" : "chevron-down",
              size: "sm",
            },
          }),
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
          attrs: {
            role: "listbox",
            "aria-labelledby": _vm.labelId,
            "aria-multiselectable": String(_vm.multiple),
          },
        },
        [
          _vm.searchable
            ? _c("div", { staticClass: "p-2 border-b border-neutral-200" }, [
                _c(
                  "div",
                  { staticClass: "relative" },
                  [
                    _c("f-icon", {
                      staticClass:
                        "absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none",
                      attrs: { name: "search", size: "sm" },
                    }),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.searchQuery,
                          expression: "searchQuery",
                        },
                      ],
                      ref: "searchInput",
                      class: _vm.searchInputClasses,
                      attrs: {
                        type: "text",
                        placeholder: _vm.searchPlaceholder,
                      },
                      domProps: { value: _vm.searchQuery },
                      on: {
                        keydown: [
                          function ($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k($event.keyCode, "down", 40, $event.key, [
                                "Down",
                                "ArrowDown",
                              ])
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            return _vm.handleKeyboardNavigation("down")
                          },
                          function ($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k($event.keyCode, "up", 38, $event.key, [
                                "Up",
                                "ArrowUp",
                              ])
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            return _vm.handleKeyboardNavigation("up")
                          },
                          function ($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            $event.preventDefault();
                            return _vm.handleEnterKey.apply(null, arguments)
                          },
                          function ($event) {
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
                            $event.preventDefault();
                            return _vm.closeDropdown.apply(null, arguments)
                          },
                        ],
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.searchQuery = $event.target.value;
                        },
                      },
                    }),
                  ],
                  1
                ),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.loading
            ? _c(
                "div",
                { staticClass: "p-4 text-center" },
                [
                  _c("f-loader", { attrs: { size: "sm" } }),
                  _vm._v(" "),
                  _c("p", { staticClass: "mt-2 text-sm text-neutral-500" }, [
                    _vm._v(_vm._s(_vm.loadingText)),
                  ]),
                ],
                1
              )
            : _vm.filteredOptions.length > 0
            ? _c(
                "div",
                { ref: "optionsList", class: _vm.optionsListClasses },
                _vm._l(_vm.filteredOptions, function (option, index) {
                  return _c(
                    "div",
                    {
                      key: _vm.getOptionKey(option, index),
                      ref: "option-" + index,
                      refInFor: true,
                      class: _vm.getOptionClasses(option, index),
                      attrs: {
                        role: "option",
                        "aria-selected": String(_vm.isSelected(option)),
                      },
                      on: {
                        click: function ($event) {
                          return _vm.handleOptionClick(option)
                        },
                        mouseenter: function ($event) {
                          _vm.focusedIndex = index;
                        },
                      },
                    },
                    [
                      _vm.multiple
                        ? _c("f-checkbox", {
                            staticClass: "pointer-events-none",
                            attrs: {
                              value: _vm.isSelected(option),
                              disabled: _vm.isDisabled(option),
                              tabindex: "-1",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", { class: _vm.optionLabelClasses }, [
                        _vm._v(_vm._s(_vm.getOptionLabel(option))),
                      ]),
                      _vm._v(" "),
                      !_vm.multiple && _vm.isSelected(option)
                        ? _c("f-icon", {
                            staticClass: "ml-auto text-primary-500",
                            attrs: { name: "check", size: "sm" },
                          })
                        : _vm._e(),
                    ],
                    1
                  )
                }),
                0
              )
            : _c(
                "div",
                { staticClass: "p-4 text-center" },
                [
                  _c("f-icon", {
                    staticClass: "text-neutral-300 mb-2",
                    attrs: { name: "file", size: "lg" },
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "text-sm text-neutral-500" }, [
                    _vm._v(_vm._s(_vm.emptyText)),
                  ]),
                ],
                1
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

  var FSelect = __vue_component__;

export { FSelect as default };
