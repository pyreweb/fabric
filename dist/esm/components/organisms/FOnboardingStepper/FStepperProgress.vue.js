import script from './FStepperProgress.vue2.js';
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
      staticClass: "w-full",
      attrs: { "aria-label": "Progression des étapes" },
    },
    [
      _c(
        "ol",
        { staticClass: "flex items-center w-full" },
        _vm._l(_vm.steps, function (step, index) {
          return _c(
            "li",
            { key: index, class: _vm.stepContainerClasses(index) },
            [
              _c("div", { staticClass: "flex items-center" }, [
                _c(
                  "span",
                  {
                    class: _vm.stepCircleClasses(index),
                    attrs: {
                      "aria-current": index === _vm.currentStep ? "step" : null,
                    },
                  },
                  [
                    index < _vm.currentStep
                      ? _c(
                          "svg",
                          {
                            staticClass: "w-4 h-4",
                            attrs: {
                              fill: "currentColor",
                              viewBox: "0 0 20 20",
                            },
                          },
                          [
                            _c("path", {
                              attrs: {
                                "fill-rule": "evenodd",
                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                "clip-rule": "evenodd",
                              },
                            }),
                          ]
                        )
                      : _c("span", { staticClass: "text-sm font-medium" }, [
                          _vm._v(_vm._s(index + 1)),
                        ]),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c("span", { class: _vm.stepTitleClasses(index) }, [
                _vm._v("\n\t\t\t\t" + _vm._s(step) + "\n\t\t\t"),
              ]),
              _vm._v(" "),
              index < _vm.steps.length - 1
                ? _c("div", { class: _vm.connectorClasses(index) })
                : _vm._e(),
            ]
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

  var FStepperProgress = __vue_component__;

export { FStepperProgress as default };
