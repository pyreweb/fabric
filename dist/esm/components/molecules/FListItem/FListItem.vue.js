import script from './FListItem.vue2.js';
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
      class: _vm.listItemClasses,
      attrs: {
        tabindex: _vm.clickable ? 0 : undefined,
        role: _vm.clickable ? "button" : undefined,
      },
      on: {
        click: _vm.handleClick,
        keydown: [
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.handleClick.apply(null, arguments)
          },
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])
            ) {
              return null
            }
            $event.preventDefault();
            return _vm.handleClick.apply(null, arguments)
          },
        ],
      },
    },
    [
      _vm.$slots.left
        ? _c("div", { staticClass: "flex-shrink-0" }, [_vm._t("left")], 2)
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex-1 min-w-0" },
        [
          _vm.title
            ? _c(
                "f-typography",
                {
                  class: _vm.titleClasses,
                  attrs: { variant: "body", truncate: _vm.truncate },
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.subtitle
            ? _c(
                "f-typography",
                {
                  class: _vm.subtitleClasses,
                  attrs: { variant: "caption", truncate: _vm.truncate },
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.subtitle) + "\n\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._t("content"),
        ],
        2
      ),
      _vm._v(" "),
      _vm.$slots.right
        ? _c("div", { staticClass: "flex-shrink-0" }, [_vm._t("right")], 2)
        : _vm._e(),
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

  var FListItem = __vue_component__;

export { FListItem as default };
