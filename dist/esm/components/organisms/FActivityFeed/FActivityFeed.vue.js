import script from './FActivityFeed.vue2.js';
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
      attrs: { role: "feed", "aria-label": "Fil d'activité" },
    },
    [
      _vm.loadingNew
        ? _c(
            "div",
            { class: _vm.loadingNewClasses },
            [
              _c("f-loader", {
                attrs: {
                  size: "sm",
                  label: "Chargement des nouveaux événements",
                },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.sortedEvents.length > 0 && !_vm.virtual
        ? _c(
            "div",
            { class: _vm.listClasses },
            _vm._l(_vm.sortedEvents, function (event, index) {
              return _c(
                "div",
                {
                  key: _vm.getEventKey(event, index),
                  class: _vm.eventContainerClasses,
                },
                [
                  _vm.showTimeline
                    ? _c("div", { class: _vm.timelineClasses }, [
                        _c(
                          "div",
                          { class: _vm.timelineDotClasses(event) },
                          [
                            _vm.getEventIcon(event)
                              ? _c("f-icon", {
                                  class: _vm.timelineIconClasses,
                                  attrs: {
                                    name: _vm.getEventIcon(event),
                                    size: "xs",
                                  },
                                })
                              : _vm._e(),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        index < _vm.sortedEvents.length - 1
                          ? _c("div", { class: _vm.timelineLineClasses })
                          : _vm._e(),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { class: _vm.eventContentClasses },
                    [
                      _vm._t(
                        "event-" + event.type,
                        function () {
                          return [
                            _c("f-list-item", {
                              attrs: {
                                title: _vm.getEventTitle(event),
                                subtitle: _vm.getEventSubtitle(event),
                                clickable: _vm.clickable,
                                truncate: _vm.truncateContent,
                              },
                              on: {
                                click: function ($event) {
                                  return _vm.handleEventClick(event)
                                },
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "left",
                                    fn: function () {
                                      return [
                                        _c(
                                          "div",
                                          {
                                            class:
                                              _vm.eventIconContainerClasses(
                                                event
                                              ),
                                          },
                                          [
                                            _c("f-icon", {
                                              attrs: {
                                                name: _vm.getEventIcon(event),
                                                size: _vm.iconSize,
                                              },
                                            }),
                                          ],
                                          1
                                        ),
                                      ]
                                    },
                                    proxy: true,
                                  },
                                  {
                                    key: "content",
                                    fn: function () {
                                      return [
                                        _vm._t(
                                          "event-content",
                                          function () {
                                            return [
                                              _c(
                                                "div",
                                                { class: _vm.eventBodyClasses },
                                                [
                                                  event.description
                                                    ? _c(
                                                        "f-typography",
                                                        {
                                                          class:
                                                            _vm.descriptionClasses,
                                                          attrs: {
                                                            variant: "body",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n\t\t\t\t\t\t\t\t\t\t" +
                                                              _vm._s(
                                                                event.description
                                                              ) +
                                                              "\n\t\t\t\t\t\t\t\t\t"
                                                          ),
                                                        ]
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      class:
                                                        _vm.metadataClasses,
                                                    },
                                                    [
                                                      _vm.getEventBadge(event)
                                                        ? _c("f-badge", {
                                                            attrs: {
                                                              variant:
                                                                _vm.getEventBadge(
                                                                  event
                                                                ).variant ||
                                                                "neutral",
                                                              content:
                                                                _vm.getEventBadge(
                                                                  event
                                                                ).label,
                                                              size: "sm",
                                                            },
                                                          })
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _c(
                                                        "f-typography",
                                                        {
                                                          class:
                                                            _vm.timestampClasses,
                                                          attrs: {
                                                            variant: "caption",
                                                          },
                                                        },
                                                        [
                                                          _c("f-icon", {
                                                            staticClass: "mr-1",
                                                            attrs: {
                                                              name: "clock",
                                                              size: "xs",
                                                            },
                                                          }),
                                                          _vm._v(
                                                            "\n\t\t\t\t\t\t\t\t\t\t\t" +
                                                              _vm._s(
                                                                _vm.formatTimestamp(
                                                                  event.timestamp
                                                                )
                                                              ) +
                                                              "\n\t\t\t\t\t\t\t\t\t\t"
                                                          ),
                                                        ],
                                                        1
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                ],
                                                1
                                              ),
                                            ]
                                          },
                                          { event: event }
                                        ),
                                      ]
                                    },
                                    proxy: true,
                                  },
                                  {
                                    key: "right",
                                    fn: function () {
                                      return [
                                        _vm._t("event-actions", null, {
                                          event: event,
                                        }),
                                      ]
                                    },
                                    proxy: true,
                                  },
                                ],
                                null,
                                true
                              ),
                            }),
                          ]
                        },
                        { event: event, index: index }
                      ),
                    ],
                    2
                  ),
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.sortedEvents.length > 0 && _vm.virtual
        ? _c(
            "div",
            { class: _vm.listClasses },
            [
              _c("RecycleScroller", {
                staticClass: "scroller",
                style: { height: _vm.virtualHeight + "px" },
                attrs: {
                  items: _vm.sortedEvents,
                  "item-size": _vm.virtualItemHeight,
                  "key-field": _vm.eventKey,
                  buffer: 200,
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function (ref) {
                        var event = ref.item;
                        var index = ref.index;
                        return [
                          _c("div", { class: _vm.eventContainerClasses }, [
                            _vm.showTimeline
                              ? _c("div", { class: _vm.timelineClasses }, [
                                  _c(
                                    "div",
                                    { class: _vm.timelineDotClasses(event) },
                                    [
                                      _vm.getEventIcon(event)
                                        ? _c("f-icon", {
                                            class: _vm.timelineIconClasses,
                                            attrs: {
                                              name: _vm.getEventIcon(event),
                                              size: "xs",
                                            },
                                          })
                                        : _vm._e(),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  index < _vm.sortedEvents.length - 1
                                    ? _c("div", {
                                        class: _vm.timelineLineClasses,
                                      })
                                    : _vm._e(),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              { class: _vm.eventContentClasses },
                              [
                                _vm._t(
                                  "event-" + event.type,
                                  function () {
                                    return [
                                      _c("f-list-item", {
                                        attrs: {
                                          title: _vm.getEventTitle(event),
                                          subtitle: _vm.getEventSubtitle(event),
                                          clickable: _vm.clickable,
                                          truncate: _vm.truncateContent,
                                        },
                                        on: {
                                          click: function ($event) {
                                            return _vm.handleEventClick(event)
                                          },
                                        },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "left",
                                              fn: function () {
                                                return [
                                                  _c(
                                                    "div",
                                                    {
                                                      class:
                                                        _vm.eventIconContainerClasses(
                                                          event
                                                        ),
                                                    },
                                                    [
                                                      _c("f-icon", {
                                                        attrs: {
                                                          name: _vm.getEventIcon(
                                                            event
                                                          ),
                                                          size: _vm.iconSize,
                                                        },
                                                      }),
                                                    ],
                                                    1
                                                  ),
                                                ]
                                              },
                                              proxy: true,
                                            },
                                            {
                                              key: "content",
                                              fn: function () {
                                                return [
                                                  _vm._t(
                                                    "event-content",
                                                    function () {
                                                      return [
                                                        _c(
                                                          "div",
                                                          {
                                                            class:
                                                              _vm.eventBodyClasses,
                                                          },
                                                          [
                                                            event.description
                                                              ? _c(
                                                                  "f-typography",
                                                                  {
                                                                    class:
                                                                      _vm.descriptionClasses,
                                                                    attrs: {
                                                                      variant:
                                                                        "body",
                                                                    },
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          event.description
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t"
                                                                    ),
                                                                  ]
                                                                )
                                                              : _vm._e(),
                                                            _vm._v(" "),
                                                            _c(
                                                              "div",
                                                              {
                                                                class:
                                                                  _vm.metadataClasses,
                                                              },
                                                              [
                                                                _vm.getEventBadge(
                                                                  event
                                                                )
                                                                  ? _c(
                                                                      "f-badge",
                                                                      {
                                                                        attrs: {
                                                                          variant:
                                                                            _vm.getEventBadge(
                                                                              event
                                                                            )
                                                                              .variant ||
                                                                            "neutral",
                                                                          content:
                                                                            _vm.getEventBadge(
                                                                              event
                                                                            )
                                                                              .label,
                                                                          size: "sm",
                                                                        },
                                                                      }
                                                                    )
                                                                  : _vm._e(),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "f-typography",
                                                                  {
                                                                    class:
                                                                      _vm.timestampClasses,
                                                                    attrs: {
                                                                      variant:
                                                                        "caption",
                                                                    },
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "f-icon",
                                                                      {
                                                                        staticClass:
                                                                          "mr-1",
                                                                        attrs: {
                                                                          name: "clock",
                                                                          size: "xs",
                                                                        },
                                                                      }
                                                                    ),
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          _vm.formatTimestamp(
                                                                            event.timestamp
                                                                          )
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    ),
                                                                  ],
                                                                  1
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                          ],
                                                          1
                                                        ),
                                                      ]
                                                    },
                                                    { event: event }
                                                  ),
                                                ]
                                              },
                                              proxy: true,
                                            },
                                            {
                                              key: "right",
                                              fn: function () {
                                                return [
                                                  _vm._t(
                                                    "event-actions",
                                                    null,
                                                    { event: event }
                                                  ),
                                                ]
                                              },
                                              proxy: true,
                                            },
                                          ],
                                          null,
                                          true
                                        ),
                                      }),
                                    ]
                                  },
                                  { event: event, index: index }
                                ),
                              ],
                              2
                            ),
                          ]),
                        ]
                      },
                    },
                  ],
                  null,
                  true
                ),
              }),
            ],
            1
          )
        : !_vm.loading
        ? _c("f-empty-state", {
            attrs: {
              icon: _vm.emptyIcon,
              title: _vm.emptyTitle,
              description: _vm.emptyDescription,
              "action-label": _vm.emptyActionLabel,
            },
            on: {
              action: function ($event) {
                return _vm.$emit("empty-action")
              },
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.sortedEvents.length > 0 && _vm.hasMore
        ? _c(
            "div",
            { ref: "loadMoreTrigger", class: _vm.loadMoreClasses },
            [
              _vm.loading
                ? _c("f-loader", {
                    attrs: { size: "md", label: _vm.loadingLabel },
                  })
                : !_vm.infiniteScroll
                ? _c(
                    "button",
                    {
                      class: _vm.loadMoreButtonClasses,
                      attrs: { type: "button" },
                      on: { click: _vm.handleLoadMore },
                    },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.loadMoreLabel) + "\n\t\t")]
                  )
                : _vm._e(),
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

  var FActivityFeed = __vue_component__;

export { FActivityFeed as default };
