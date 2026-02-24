import script from './FToggle.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.containerClasses }, [
    _c(
      "button",
      {
        class: _vm.switchClasses,
        attrs: {
          type: "button",
          role: "switch",
          "aria-checked": String(_vm.value),
          disabled: _vm.disabled,
        },
        on: {
          click: _vm.handleToggle,
          keydown: [
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "space", 32, $event.key, [
                  " ",
                  "Spacebar",
                ])
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.handleToggle.apply(null, arguments)
            },
            function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.handleToggle.apply(null, arguments)
            },
          ],
          focus: function ($event) {
            return _vm.$emit("focus", $event)
          },
          blur: function ($event) {
            return _vm.$emit("blur", $event)
          },
        },
      },
      [
        _c("span", {
          class: _vm.thumbClasses,
          attrs: { "aria-hidden": "true" },
        }),
      ]
    ),
    _vm._v(" "),
    _vm.label
      ? _c("span", { class: _vm.labelClasses }, [
          _vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t"),
        ])
      : _vm._e(),
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

  var FToggle = __vue_component__;

export { FToggle as default };
