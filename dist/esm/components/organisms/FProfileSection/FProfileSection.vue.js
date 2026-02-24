import script from './FProfileSection.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "f-card",
    {
      attrs: { bordered: _vm.bordered },
      scopedSlots: _vm._u(
        [
          {
            key: "header",
            fn: function () {
              return [
                _c(
                  "div",
                  { staticClass: "flex items-center justify-between w-full" },
                  [
                    _c(
                      "div",
                      { staticClass: "flex-1 min-w-0" },
                      [
                        _vm.title
                          ? _c("f-typography", { attrs: { variant: "h5" } }, [
                              _vm._v(_vm._s(_vm.title)),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.subtitle
                          ? _c(
                              "f-typography",
                              { attrs: { variant: "caption" } },
                              [_vm._v(_vm._s(_vm.subtitle))]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    !_vm.isEditing && _vm.editable
                      ? _c(
                          "f-button",
                          {
                            attrs: { variant: "ghost", size: "small" },
                            on: { click: _vm.startEditing },
                          },
                          [
                            _vm._t("edit-button-content", function () {
                              return [
                                _vm._v(
                                  "\n\t\t\t\t\t" +
                                    _vm._s(_vm.editButtonLabel) +
                                    "\n\t\t\t\t"
                                ),
                              ]
                            }),
                          ],
                          2
                        )
                      : _vm._e(),
                  ],
                  1
                ),
              ]
            },
            proxy: true,
          },
        ],
        null,
        true
      ),
    },
    [
      _vm._v(" "),
      _vm.isLoading
        ? _c(
            "div",
            { staticClass: "flex items-center justify-center py-8" },
            [
              _c("f-loader", {
                attrs: { size: _vm.loaderSize, label: _vm.loadingLabel },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.alertMessage && !_vm.isLoading
        ? _c("f-alert", {
            staticClass: "mb-4",
            attrs: {
              variant: _vm.alertVariant,
              message: _vm.alertMessage,
              closable: true,
            },
            on: { close: _vm.clearAlert },
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.isLoading
        ? _c(
            "div",
            [
              _vm.isEditing
                ? _c(
                    "f-form",
                    {
                      on: { submit: _vm.handleSubmit },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "actions",
                            fn: function () {
                              return [
                                _c(
                                  "f-button",
                                  {
                                    attrs: {
                                      variant: "outline",
                                      type: "button",
                                      disabled: _vm.isSubmitting,
                                    },
                                    on: { click: _vm.cancelEditing },
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t" +
                                        _vm._s(_vm.cancelButtonLabel) +
                                        "\n\t\t\t\t"
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "f-button",
                                  {
                                    attrs: {
                                      variant: "primary",
                                      type: "submit",
                                      loading: _vm.isSubmitting,
                                      disabled: _vm.isSubmitting,
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n\t\t\t\t\t" +
                                        _vm._s(_vm.saveButtonLabel) +
                                        "\n\t\t\t\t"
                                    ),
                                  ]
                                ),
                              ]
                            },
                            proxy: true,
                          },
                        ],
                        null,
                        false,
                        2120567468
                      ),
                    },
                    [
                      _vm.showAvatar
                        ? _c(
                            "div",
                            { staticClass: "flex items-center gap-4 mb-4" },
                            [
                              _c(
                                "div",
                                { staticClass: "relative" },
                                [
                                  _c("f-avatar", {
                                    attrs: {
                                      src: _vm.avatarSrc,
                                      alt: _vm.avatarAlt,
                                      initials: _vm.avatarInitials,
                                      name: _vm.avatarName,
                                      size: _vm.avatarSize,
                                      shape: _vm.avatarShape,
                                    },
                                  }),
                                  _vm._v(" "),
                                  _vm._t("avatar-edit", function () {
                                    return [
                                      _vm.avatarEditable
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1.5 hover:bg-primary-700 transition-colors duration-[var(--transition-duration-base)] ease-[var(--transition-easing-standard)]",
                                              attrs: { type: "button" },
                                              on: {
                                                click: _vm.handleAvatarEdit,
                                              },
                                            },
                                            [
                                              _c(
                                                "svg",
                                                {
                                                  staticClass: "w-3 h-3",
                                                  attrs: {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                  },
                                                },
                                                [
                                                  _c("path", {
                                                    attrs: {
                                                      "stroke-linecap": "round",
                                                      "stroke-linejoin":
                                                        "round",
                                                      "stroke-width": "2",
                                                      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                                                    },
                                                  }),
                                                ]
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
                              _c(
                                "div",
                                { staticClass: "flex-1" },
                                [_vm._t("avatar-info")],
                                2
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t(
                        "edit-fields",
                        function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "flex flex-col gap-4" },
                              [
                                _vm._l(_vm.fields, function (field) {
                                  return [
                                    field.type === "textarea"
                                      ? _c(
                                          "div",
                                          {
                                            key: field.name,
                                            staticClass:
                                              "flex flex-col gap-1.5",
                                          },
                                          [
                                            field.label
                                              ? _c(
                                                  "label",
                                                  {
                                                    class: [
                                                      "text-sm font-medium text-neutral-700",
                                                      {
                                                        "after:content-['_*'] after:text-danger-500":
                                                          field.required,
                                                      },
                                                    ],
                                                    attrs: {
                                                      for:
                                                        "field-" + field.name,
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t" +
                                                        _vm._s(field.label) +
                                                        "\n\t\t\t\t\t\t\t"
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _c("f-textarea", {
                                              attrs: {
                                                id: "field-" + field.name,
                                                value:
                                                  _vm.localFormData[field.name],
                                                placeholder: field.placeholder,
                                                disabled: field.disabled,
                                                rows: field.rows || 3,
                                                "error-message":
                                                  _vm.validationErrors[
                                                    field.name
                                                  ],
                                              },
                                              on: {
                                                input: function ($event) {
                                                  return _vm.updateField(
                                                    field.name,
                                                    $event
                                                  )
                                                },
                                              },
                                            }),
                                          ],
                                          1
                                        )
                                      : _c("f-form-field", {
                                          key: field.name,
                                          attrs: {
                                            value:
                                              _vm.localFormData[field.name],
                                            label: field.label,
                                            type: field.type || "text",
                                            placeholder: field.placeholder,
                                            required: field.required,
                                            disabled: field.disabled,
                                            "error-message":
                                              _vm.validationErrors[field.name],
                                          },
                                          on: {
                                            input: function ($event) {
                                              return _vm.updateField(
                                                field.name,
                                                $event
                                              )
                                            },
                                          },
                                        }),
                                  ]
                                }),
                              ],
                              2
                            ),
                          ]
                        },
                        {
                          formData: _vm.localFormData,
                          errors: _vm.validationErrors,
                        }
                      ),
                    ],
                    2
                  )
                : _c(
                    "div",
                    [
                      _vm.showAvatar
                        ? _c(
                            "div",
                            { staticClass: "flex items-center gap-4 mb-4" },
                            [
                              _c("f-avatar", {
                                attrs: {
                                  src: _vm.avatarSrc,
                                  alt: _vm.avatarAlt,
                                  initials: _vm.avatarInitials,
                                  name: _vm.avatarName,
                                  size: _vm.avatarSize,
                                  shape: _vm.avatarShape,
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex-1" },
                                [_vm._t("avatar-info")],
                                2
                              ),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t(
                        "read-fields",
                        function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "flex flex-col gap-3" },
                              _vm._l(_vm.fields, function (field) {
                                return _c(
                                  "div",
                                  {
                                    key: field.name,
                                    staticClass: "flex flex-col",
                                  },
                                  [
                                    _c(
                                      "f-typography",
                                      {
                                        staticClass: "text-neutral-500",
                                        attrs: { variant: "caption" },
                                      },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t" +
                                            _vm._s(field.label) +
                                            "\n\t\t\t\t\t\t"
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "f-typography",
                                      { attrs: { variant: "body" } },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t" +
                                            _vm._s(
                                              _vm.value[field.name] || "-"
                                            ) +
                                            "\n\t\t\t\t\t\t"
                                        ),
                                      ]
                                    ),
                                  ],
                                  1
                                )
                              }),
                              0
                            ),
                          ]
                        },
                        { data: _vm.value }
                      ),
                    ],
                    2
                  ),
            ],
            1
          )
        : _vm._e(),
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

  var FProfileSection = __vue_component__;

export { FProfileSection as default };
