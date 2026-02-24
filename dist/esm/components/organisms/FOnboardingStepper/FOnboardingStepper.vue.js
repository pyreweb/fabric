import script from './FOnboardingStepper.vue2.js';
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
    { staticClass: "f-onboarding-stepper" },
    [
      _c(
        "div",
        { staticClass: "mb-6" },
        [
          _c("f-stepper-progress", {
            attrs: {
              steps: _vm.stepTitles,
              "current-step": _vm.currentStepIndex,
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "f-card",
        {
          attrs: { bordered: _vm.bordered },
          scopedSlots: _vm._u([
            {
              key: "actions",
              fn: function () {
                return [
                  _c("div", { staticClass: "flex w-full justify-between" }, [
                    _c(
                      "div",
                      [
                        _vm.currentStepIndex > 0
                          ? _c(
                              "f-button",
                              {
                                attrs: { variant: "outline" },
                                on: { click: _vm.handlePrevious },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "iconLeft",
                                      fn: function () {
                                        return [
                                          _c("f-icon", {
                                            attrs: {
                                              name: "chevron-left",
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
                                  993206243
                                ),
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(_vm.previousLabel) +
                                    "\n\t\t\t\t\t"
                                ),
                              ]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      [
                        !_vm.isLastStep
                          ? _c(
                              "f-button",
                              {
                                attrs: {
                                  variant: "primary",
                                  disabled: !_vm.canProceed,
                                },
                                on: { click: _vm.handleNext },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "iconRight",
                                      fn: function () {
                                        return [
                                          _c("f-icon", {
                                            attrs: {
                                              name: "chevron-right",
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
                                  2709436387
                                ),
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(_vm.nextLabel) +
                                    "\n\t\t\t\t\t\t"
                                ),
                              ]
                            )
                          : _c(
                              "f-button",
                              {
                                attrs: {
                                  variant: "success",
                                  disabled: !_vm.canProceed,
                                },
                                on: { click: _vm.handleComplete },
                                scopedSlots: _vm._u([
                                  {
                                    key: "iconRight",
                                    fn: function () {
                                      return [
                                        _c("f-icon", {
                                          attrs: { name: "check", size: "sm" },
                                        }),
                                      ]
                                    },
                                    proxy: true,
                                  },
                                ]),
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(_vm.completeLabel) +
                                    "\n\t\t\t\t\t\t"
                                ),
                              ]
                            ),
                      ],
                      1
                    ),
                  ]),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _c(
            "div",
            { staticClass: "min-h-[200px]" },
            [
              _vm._t("step-" + _vm.currentStepIndex, function () {
                return [_vm._t("default")]
              }),
            ],
            2
          ),
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

  var FOnboardingStepper = __vue_component__;

export { FOnboardingStepper as default };
