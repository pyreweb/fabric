import script from './FDatePicker.vue2.js';
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
          return _vm.closeCalendar.apply(null, arguments)
        },
      },
    },
    [
      _c(
        "div",
        { staticClass: "relative" },
        [
          _c("input", {
            ref: "input",
            class: _vm.inputClasses,
            attrs: {
              type: "text",
              placeholder: _vm.placeholder,
              disabled: _vm.disabled,
              readonly: _vm.readonly,
              "aria-expanded": String(_vm.isOpen),
              "aria-haspopup": "dialog",
            },
            domProps: { value: _vm.displayValue },
            on: {
              click: _vm.toggleCalendar,
              focus: _vm.handleFocus,
              blur: _vm.handleBlur,
              keydown: function ($event) {
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
                return _vm.openCalendar.apply(null, arguments)
              },
            },
          }),
          _vm._v(" "),
          _c("f-icon", {
            class: _vm.iconClasses,
            attrs: { name: "calendar", size: "sm" },
            nativeOn: {
              click: function ($event) {
                !_vm.disabled && _vm.toggleCalendar();
              },
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
          ref: "calendar",
          class: _vm.calendarClasses,
          attrs: { role: "dialog", "aria-label": "Sélecteur de date" },
        },
        [
          _c("div", { staticClass: "p-3 border-b border-neutral-200" }, [
            _c(
              "div",
              { staticClass: "flex items-center justify-between mb-2" },
              [
                _c(
                  "button",
                  {
                    class: _vm.navButtonClasses,
                    attrs: { type: "button", "aria-label": "Mois précédent" },
                    on: { click: _vm.previousMonth },
                  },
                  [
                    _c("f-icon", {
                      attrs: { name: "chevron-left", size: "sm" },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "flex items-center gap-2" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.displayMonth,
                          expression: "displayMonth",
                        },
                      ],
                      class: _vm.selectClasses,
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value;
                                return val
                              });
                            _vm.displayMonth = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0];
                          },
                          _vm.updateCalendar,
                        ],
                      },
                    },
                    _vm._l(_vm.monthNames, function (month, index) {
                      return _c(
                        "option",
                        { key: index, domProps: { value: index } },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t" +
                              _vm._s(month) +
                              "\n\t\t\t\t\t\t"
                          ),
                        ]
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.displayYear,
                          expression: "displayYear",
                        },
                      ],
                      class: _vm.selectClasses,
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value;
                                return val
                              });
                            _vm.displayYear = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0];
                          },
                          _vm.updateCalendar,
                        ],
                      },
                    },
                    _vm._l(_vm.yearRange, function (year) {
                      return _c(
                        "option",
                        { key: year, domProps: { value: year } },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t" + _vm._s(year) + "\n\t\t\t\t\t\t"
                          ),
                        ]
                      )
                    }),
                    0
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    class: _vm.navButtonClasses,
                    attrs: { type: "button", "aria-label": "Mois suivant" },
                    on: { click: _vm.nextMonth },
                  },
                  [
                    _c("f-icon", {
                      attrs: { name: "chevron-right", size: "sm" },
                    }),
                  ],
                  1
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "p-3" }, [
            _c(
              "div",
              { staticClass: "grid grid-cols-7 gap-1 mb-2" },
              _vm._l(_vm.dayNames, function (day) {
                return _c(
                  "div",
                  {
                    key: day,
                    staticClass:
                      "text-xs font-medium text-neutral-600 text-center py-1",
                  },
                  [_vm._v("\n\t\t\t\t\t" + _vm._s(day) + "\n\t\t\t\t")]
                )
              }),
              0
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "grid grid-cols-7 gap-1" },
              _vm._l(_vm.calendarDays, function (day, index) {
                return _c(
                  "button",
                  {
                    key: index,
                    class: _vm.getDayClasses(day),
                    attrs: { type: "button", disabled: _vm.isDayDisabled(day) },
                    on: {
                      click: function ($event) {
                        return _vm.selectDate(day)
                      },
                      mouseenter: function ($event) {
                        return _vm.handleDayHover(day)
                      },
                    },
                  },
                  [_vm._v("\n\t\t\t\t\t" + _vm._s(day.date) + "\n\t\t\t\t")]
                )
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _vm.showTimePicker
            ? _c("div", { staticClass: "p-3 border-t border-neutral-200" }, [
                _c(
                  "div",
                  { staticClass: "flex items-center justify-center gap-2" },
                  [
                    _c("div", { staticClass: "flex flex-col items-center" }, [
                      _c(
                        "label",
                        {
                          staticClass:
                            "text-xs font-medium text-neutral-600 mb-1",
                        },
                        [_vm._v("Heures")]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex items-center gap-1" }, [
                        _c(
                          "button",
                          {
                            class: _vm.timeButtonClasses,
                            attrs: {
                              type: "button",
                              "aria-label": "Augmenter les heures",
                            },
                            on: { click: _vm.incrementHour },
                          },
                          [
                            _c("f-icon", {
                              attrs: { name: "chevron-up", size: "sm" },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model.number",
                              value: _vm.selectedHour,
                              expression: "selectedHour",
                              modifiers: { number: true },
                            },
                          ],
                          class: _vm.timeInputClasses,
                          attrs: { type: "number", min: "0", max: "23" },
                          domProps: { value: _vm.selectedHour },
                          on: {
                            change: _vm.updateTime,
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.selectedHour = _vm._n($event.target.value);
                            },
                            blur: function ($event) {
                              return _vm.$forceUpdate()
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            class: _vm.timeButtonClasses,
                            attrs: {
                              type: "button",
                              "aria-label": "Diminuer les heures",
                            },
                            on: { click: _vm.decrementHour },
                          },
                          [
                            _c("f-icon", {
                              attrs: { name: "chevron-down", size: "sm" },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "text-lg font-bold text-neutral-400 mt-6",
                      },
                      [_vm._v(":")]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "flex flex-col items-center" }, [
                      _c(
                        "label",
                        {
                          staticClass:
                            "text-xs font-medium text-neutral-600 mb-1",
                        },
                        [_vm._v("Minutes")]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex items-center gap-1" }, [
                        _c(
                          "button",
                          {
                            class: _vm.timeButtonClasses,
                            attrs: {
                              type: "button",
                              "aria-label": "Augmenter les minutes",
                            },
                            on: { click: _vm.incrementMinute },
                          },
                          [
                            _c("f-icon", {
                              attrs: { name: "chevron-up", size: "sm" },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model.number",
                              value: _vm.selectedMinute,
                              expression: "selectedMinute",
                              modifiers: { number: true },
                            },
                          ],
                          class: _vm.timeInputClasses,
                          attrs: { type: "number", min: "0", max: "59" },
                          domProps: { value: _vm.selectedMinute },
                          on: {
                            change: _vm.updateTime,
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.selectedMinute = _vm._n($event.target.value);
                            },
                            blur: function ($event) {
                              return _vm.$forceUpdate()
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            class: _vm.timeButtonClasses,
                            attrs: {
                              type: "button",
                              "aria-label": "Diminuer les minutes",
                            },
                            on: { click: _vm.decrementMinute },
                          },
                          [
                            _c("f-icon", {
                              attrs: { name: "chevron-down", size: "sm" },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                  ]
                ),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.mode === "range" || _vm.showTimePicker
            ? _c(
                "div",
                {
                  staticClass:
                    "p-3 border-t border-neutral-200 flex justify-end gap-2",
                },
                [
                  _c(
                    "button",
                    {
                      class: _vm.cancelButtonClasses,
                      attrs: { type: "button" },
                      on: { click: _vm.closeCalendar },
                    },
                    [_vm._v("\n\t\t\t\tAnnuler\n\t\t\t")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      class: _vm.applyButtonClasses,
                      attrs: { type: "button", disabled: !_vm.canApply },
                      on: { click: _vm.applySelection },
                    },
                    [_vm._v("\n\t\t\t\tAppliquer\n\t\t\t")]
                  ),
                ]
              )
            : _vm._e(),
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

  var FDatePicker = __vue_component__;

export { FDatePicker as default };
