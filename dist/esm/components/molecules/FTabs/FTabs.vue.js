import script from './FTabs.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "f-tabs" }, [
    _c(
      "div",
      {
        class: _vm.tabListClasses,
        attrs: { role: "tablist", "aria-label": _vm.ariaLabel },
      },
      _vm._l(_vm.tabItems, function (tab) {
        return _c(
          "button",
          {
            key: tab.name,
            ref: "tab-" + tab.name,
            refInFor: true,
            class: _vm.getTabButtonClasses(tab),
            attrs: {
              id: _vm.getTabId(tab.name),
              role: "tab",
              "aria-selected":
                _vm.activeTabName === tab.name ? "true" : "false",
              "aria-controls": _vm.getPanelId(tab.name),
              disabled: tab.disabled,
              tabindex: _vm.activeTabName === tab.name ? 0 : -1,
            },
            on: {
              click: function ($event) {
                return _vm.handleTabClick(tab.name)
              },
              keydown: function ($event) {
                return _vm.handleKeydown($event, tab.name)
              },
            },
          },
          [_vm._v("\n\t\t\t" + _vm._s(tab.label) + "\n\t\t")]
        )
      }),
      0
    ),
    _vm._v(" "),
    _c("div", { staticClass: "mt-4" }, [_vm._t("default")], 2),
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

  var FTabs = __vue_component__;

export { FTabs as default };
