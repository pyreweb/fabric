import script from './FDataTable.vue2.js';
import normalizeComponent from '../../../node_modules/vue-runtime-helpers/dist/normalize-component.js';
import createInjector from '../../../node_modules/vue-runtime-helpers/dist/inject-style/browser.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.containerClasses }, [
    _vm.showToolbar
      ? _c("div", { class: _vm.toolbarClasses }, [
          _c(
            "div",
            { staticClass: "flex-1" },
            [
              _vm.searchable
                ? _c("f-search-bar", {
                    attrs: {
                      placeholder: _vm.searchPlaceholder,
                      size: _vm.size,
                      disabled: _vm.loading,
                    },
                    on: { search: _vm.handleSearch },
                    model: {
                      value: _vm.searchQuery,
                      callback: function ($$v) {
                        _vm.searchQuery = $$v;
                      },
                      expression: "searchQuery",
                    },
                  })
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _vm.$slots.actions
            ? _c(
                "div",
                { staticClass: "flex-shrink-0" },
                [_vm._t("actions", null, { selectedItems: _vm.selectedItems })],
                2
              )
            : _vm._e(),
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { class: _vm.tableWrapperClasses },
      [
        _vm.loading
          ? _c(
              "div",
              { class: _vm.loadingOverlayClasses },
              [_c("f-loader", { attrs: { size: "large" } })],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.processedData.length > 0 || _vm.loading
          ? _c("table", { class: _vm.tableClasses }, [
              _c("thead", [
                _c(
                  "tr",
                  [
                    _vm.selectable
                      ? _c(
                          "th",
                          { class: _vm.headerCellClasses },
                          [
                            _c("f-checkbox", {
                              attrs: { checked: _vm.isAllSelected },
                              on: { change: _vm.handleSelectAll },
                            }),
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.columns, function (column) {
                      return _c(
                        "th",
                        {
                          key: column.key,
                          class: _vm.getHeaderCellClasses(column),
                          attrs: {
                            "aria-sort": _vm.getAriaSort(
                              column.key,
                              column.sortable
                            ),
                          },
                          on: {
                            click: function ($event) {
                              column.sortable !== false &&
                                _vm.handleSort(column.key);
                            },
                          },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "flex items-center gap-1" },
                            [
                              _c("span", [_vm._v(_vm._s(column.label))]),
                              _vm._v(" "),
                              column.sortable !== false
                                ? _c("f-icon", {
                                    class: _vm.getSortIconClasses(column.key),
                                    attrs: {
                                      name: _vm.getSortIcon(column.key),
                                      size: "sm",
                                    },
                                  })
                                : _vm._e(),
                            ],
                            1
                          ),
                        ]
                      )
                    }),
                  ],
                  2
                ),
              ]),
              _vm._v(" "),
              !_vm.virtual
                ? _c(
                    "tbody",
                    _vm._l(_vm.paginatedData, function (row, rowIndex) {
                      return _c(
                        "tr",
                        {
                          key: _vm.getRowKey(row, rowIndex),
                          class: _vm.getRowClasses(row),
                          on: {
                            click: function ($event) {
                              return _vm.handleRowClick(row)
                            },
                          },
                        },
                        [
                          _vm.selectable
                            ? _c(
                                "td",
                                {
                                  class: _vm.cellClasses,
                                  attrs: { "data-label": "" },
                                },
                                [
                                  _c("f-checkbox", {
                                    attrs: { checked: _vm.isRowSelected(row) },
                                    on: {
                                      change: function ($event) {
                                        return _vm.handleRowSelect(row, $event)
                                      },
                                      click: function ($event) {
                                        $event.stopPropagation();
                                      },
                                    },
                                  }),
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.columns, function (column) {
                            return _c(
                              "td",
                              {
                                key: column.key,
                                class: _vm.getCellClasses(column),
                                attrs: { "data-label": column.label },
                              },
                              [
                                _vm._t(
                                  "cell-" + column.key,
                                  function () {
                                    return [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t" +
                                          _vm._s(
                                            _vm.getCellValue(row, column.key)
                                          ) +
                                          "\n\t\t\t\t\t\t"
                                      ),
                                    ]
                                  },
                                  {
                                    value: _vm.getCellValue(row, column.key),
                                    row: row,
                                    column: column,
                                  }
                                ),
                              ],
                              2
                            )
                          }),
                        ],
                        2
                      )
                    }),
                    0
                  )
                : _vm._e(),
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.virtual && (_vm.processedData.length > 0 || _vm.loading)
          ? _c(
              "div",
              { staticClass: "virtual-table-body" },
              [
                _c("RecycleScroller", {
                  staticClass: "scroller",
                  style: { height: _vm.virtualHeight + "px" },
                  attrs: {
                    items: _vm.paginatedData,
                    "item-size": _vm.computedVirtualItemHeight,
                    "key-field": _vm.rowKey,
                    buffer: 200,
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function (ref) {
                          var row = ref.item;
                          return [
                            _c(
                              "div",
                              {
                                class: ["virtual-row", _vm.getRowClasses(row)],
                                on: {
                                  click: function ($event) {
                                    return _vm.handleRowClick(row)
                                  },
                                },
                              },
                              [
                                _vm.selectable
                                  ? _c(
                                      "div",
                                      {
                                        class: [
                                          "virtual-cell",
                                          _vm.cellClasses,
                                        ],
                                      },
                                      [
                                        _c("f-checkbox", {
                                          attrs: {
                                            checked: _vm.isRowSelected(row),
                                          },
                                          on: {
                                            change: function ($event) {
                                              return _vm.handleRowSelect(
                                                row,
                                                $event
                                              )
                                            },
                                            click: function ($event) {
                                              $event.stopPropagation();
                                            },
                                          },
                                        }),
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm._l(_vm.columns, function (column) {
                                  return _c(
                                    "div",
                                    {
                                      key: column.key,
                                      class: [
                                        "virtual-cell",
                                        _vm.getCellClasses(column),
                                      ],
                                    },
                                    [
                                      _vm._t(
                                        "cell-" + column.key,
                                        function () {
                                          return [
                                            _vm._v(
                                              "\n\t\t\t\t\t\t\t\t" +
                                                _vm._s(
                                                  _vm.getCellValue(
                                                    row,
                                                    column.key
                                                  )
                                                ) +
                                                "\n\t\t\t\t\t\t\t"
                                            ),
                                          ]
                                        },
                                        {
                                          value: _vm.getCellValue(
                                            row,
                                            column.key
                                          ),
                                          row: row,
                                          column: column,
                                        }
                                      ),
                                    ],
                                    2
                                  )
                                }),
                              ],
                              2
                            ),
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
          : _vm._e(),
        _vm._v(" "),
        !_vm.loading && _vm.processedData.length === 0
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
      ],
      1
    ),
    _vm._v(" "),
    _vm.showFooter
      ? _c(
          "div",
          { class: _vm.footerClasses },
          [
            _c("div", { class: _vm.infoClasses }, [
              _vm.selectable && _vm.selectedItems.length > 0
                ? _c("span", [
                    _vm._v(
                      "\n\t\t\t\t" +
                        _vm._s(_vm.selectedItems.length) +
                        " élément(s) sélectionné(s) sur\n\t\t\t\t" +
                        _vm._s(_vm.totalItems) +
                        "\n\t\t\t"
                    ),
                  ])
                : _c("span", [
                    _vm._v(
                      "\n\t\t\t\t" + _vm._s(_vm.paginationInfo) + "\n\t\t\t"
                    ),
                  ]),
            ]),
            _vm._v(" "),
            _vm.effectivePaginated && _vm.totalPages > 1
              ? _c("f-pagination", {
                  attrs: {
                    "total-pages": _vm.totalPages,
                    size: _vm.size,
                    "show-labels": false,
                  },
                  on: { change: _vm.handlePageChange },
                  model: {
                    value: _vm.internalPage,
                    callback: function ($$v) {
                      _vm.internalPage = $$v;
                    },
                    expression: "internalPage",
                  },
                })
              : _vm._e(),
          ],
          1
        )
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-471f1289_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Virtual table styling */\n.virtual-table-body[data-v-471f1289] {\n\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\n\tborder-radius: 0.5rem;\n\toverflow: hidden;\n}\n.virtual-table-body .scroller[data-v-471f1289] {\n\twidth: 100%;\n}\n.virtual-row[data-v-471f1289] {\n\tdisplay: flex;\n\talign-items: center;\n\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\n\ttransition: background-color 0.15s;\n}\n.virtual-row[data-v-471f1289]:last-child {\n\tborder-bottom: none;\n}\n.virtual-cell[data-v-471f1289] {\n\tflex: 1;\n\tmin-width: 0;\n\tdisplay: flex;\n\talign-items: center;\n}\n\n/* Mobile Card View - transforms table rows into cards on small screens */\n@media (max-width: 640px) {\n\t/* Hide table header on mobile */\ntable thead[data-v-471f1289] {\n\t\tdisplay: none;\n}\n\n\t/* Make table body a flex container for cards */\ntable tbody[data-v-471f1289] {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 0.75rem;\n}\n\n\t/* Transform each row into a card */\ntable tbody tr[data-v-471f1289] {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tbackground-color: white;\n\t\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\n\t\tborder-radius: 0.5rem;\n\t\tpadding: 0.75rem;\n\t\tbox-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n}\n\n\t/* Style each cell as a row in the card */\ntable tbody tr td[data-v-471f1289] {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: flex-start;\n\t\tpadding: 0.5rem 0;\n\t\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\n\t\ttext-align: right;\n}\n\n\t/* Remove border from last cell */\ntable tbody tr td[data-v-471f1289]:last-child {\n\t\tborder-bottom: none;\n}\n\n\t/* Display column label before cell content */\ntable tbody tr td[data-v-471f1289]::before {\n\t\tcontent: attr(data-label);\n\t\tfont-weight: 600;\n\t\tcolor: var(--color-neutral-700, #374151);\n\t\ttext-align: left;\n\t\tflex-shrink: 0;\n\t\tmargin-right: 1rem;\n}\n\n\t/* Hide empty labels (for checkbox column) */\ntable tbody tr td[data-label=''][data-v-471f1289]::before {\n\t\tdisplay: none;\n}\n\n\t/* Checkbox cell styling */\ntable tbody tr td[data-label=''][data-v-471f1289] {\n\t\tjustify-content: flex-start;\n\t\tborder-bottom: 1px solid var(--color-neutral-200, #e5e7eb);\n\t\tmargin-bottom: 0.25rem;\n\t\tpadding-bottom: 0.75rem;\n}\n\n\t/* Ensure table is full width */\ntable[data-v-471f1289] {\n\t\twidth: 100%;\n}\n}\n", map: {"version":3,"sources":["/home/runner/work/fabric/fabric/src/components/organisms/FDataTable/FDataTable.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAssBA,0BAAA;AACA;CACA,mDAAA;CACA,qBAAA;CACA,gBAAA;AACA;AAEA;CACA,WAAA;AACA;AAEA;CACA,aAAA;CACA,mBAAA;CACA,0DAAA;CACA,kCAAA;AACA;AAEA;CACA,mBAAA;AACA;AAEA;CACA,OAAA;CACA,YAAA;CACA,aAAA;CACA,mBAAA;AACA;;AAEA,yEAAA;AACA;CACA,gCAAA;AACA;EACA,aAAA;AACA;;CAEA,+CAAA;AACA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;;CAEA,mCAAA;AACA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mDAAA;EACA,qBAAA;EACA,gBAAA;EACA,0CAAA;AACA;;CAEA,yCAAA;AACA;EACA,aAAA;EACA,8BAAA;EACA,uBAAA;EACA,iBAAA;EACA,0DAAA;EACA,iBAAA;AACA;;CAEA,iCAAA;AACA;EACA,mBAAA;AACA;;CAEA,6CAAA;AACA;EACA,yBAAA;EACA,gBAAA;EACA,wCAAA;EACA,gBAAA;EACA,cAAA;EACA,kBAAA;AACA;;CAEA,4CAAA;AACA;EACA,aAAA;AACA;;CAEA,0BAAA;AACA;EACA,2BAAA;EACA,0DAAA;EACA,sBAAA;EACA,uBAAA;AACA;;CAEA,+BAAA;AACA;EACA,WAAA;AACA;AACA","file":"FDataTable.vue","sourcesContent":["<template>\n\t<div :class=\"containerClasses\">\n\t\t<!-- Toolbar section: Search and Actions -->\n\t\t<div v-if=\"showToolbar\" :class=\"toolbarClasses\">\n\t\t\t<div class=\"flex-1\">\n\t\t\t\t<f-search-bar\n\t\t\t\t\tv-if=\"searchable\"\n\t\t\t\t\tv-model=\"searchQuery\"\n\t\t\t\t\t:placeholder=\"searchPlaceholder\"\n\t\t\t\t\t:size=\"size\"\n\t\t\t\t\t:disabled=\"loading\"\n\t\t\t\t\t@search=\"handleSearch\"\n\t\t\t\t/>\n\t\t\t</div>\n\t\t\t<div v-if=\"$slots.actions\" class=\"flex-shrink-0\">\n\t\t\t\t<slot name=\"actions\" :selected-items=\"selectedItems\" />\n\t\t\t</div>\n\t\t</div>\n\n\t\t<!-- Table wrapper -->\n\t\t<div :class=\"tableWrapperClasses\">\n\t\t\t<!-- Loading overlay -->\n\t\t\t<div v-if=\"loading\" :class=\"loadingOverlayClasses\">\n\t\t\t\t<f-loader size=\"large\" />\n\t\t\t</div>\n\n\t\t\t<!-- Table -->\n\t\t\t<table v-if=\"processedData.length > 0 || loading\" :class=\"tableClasses\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<!-- Selection checkbox column -->\n\t\t\t\t\t\t<th v-if=\"selectable\" :class=\"headerCellClasses\">\n\t\t\t\t\t\t\t<f-checkbox :checked=\"isAllSelected\" @change=\"handleSelectAll\" />\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<!-- Data columns -->\n\t\t\t\t\t\t<th\n\t\t\t\t\t\t\tv-for=\"column in columns\"\n\t\t\t\t\t\t\t:key=\"column.key\"\n\t\t\t\t\t\t\t:class=\"getHeaderCellClasses(column)\"\n\t\t\t\t\t\t\t:aria-sort=\"getAriaSort(column.key, column.sortable)\"\n\t\t\t\t\t\t\t@click=\"column.sortable !== false && handleSort(column.key)\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<div class=\"flex items-center gap-1\">\n\t\t\t\t\t\t\t\t<span>{{ column.label }}</span>\n\t\t\t\t\t\t\t\t<f-icon\n\t\t\t\t\t\t\t\t\tv-if=\"column.sortable !== false\"\n\t\t\t\t\t\t\t\t\t:name=\"getSortIcon(column.key)\"\n\t\t\t\t\t\t\t\t\tsize=\"sm\"\n\t\t\t\t\t\t\t\t\t:class=\"getSortIconClasses(column.key)\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody v-if=\"!virtual\">\n\t\t\t\t\t<tr\n\t\t\t\t\t\tv-for=\"(row, rowIndex) in paginatedData\"\n\t\t\t\t\t\t:key=\"getRowKey(row, rowIndex)\"\n\t\t\t\t\t\t:class=\"getRowClasses(row)\"\n\t\t\t\t\t\t@click=\"handleRowClick(row)\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<!-- Selection checkbox -->\n\t\t\t\t\t\t<td v-if=\"selectable\" :class=\"cellClasses\" data-label=\"\">\n\t\t\t\t\t\t\t<f-checkbox\n\t\t\t\t\t\t\t\t:checked=\"isRowSelected(row)\"\n\t\t\t\t\t\t\t\t@change=\"handleRowSelect(row, $event)\"\n\t\t\t\t\t\t\t\t@click.stop\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<!-- Data cells -->\n\t\t\t\t\t\t<td\n\t\t\t\t\t\t\tv-for=\"column in columns\"\n\t\t\t\t\t\t\t:key=\"column.key\"\n\t\t\t\t\t\t\t:class=\"getCellClasses(column)\"\n\t\t\t\t\t\t\t:data-label=\"column.label\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<slot\n\t\t\t\t\t\t\t\t:name=\"'cell-' + column.key\"\n\t\t\t\t\t\t\t\t:value=\"getCellValue(row, column.key)\"\n\t\t\t\t\t\t\t\t:row=\"row\"\n\t\t\t\t\t\t\t\t:column=\"column\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t{{ getCellValue(row, column.key) }}\n\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\n\t\t\t<!-- Virtual scrolling table body -->\n\t\t\t<div\n\t\t\t\tv-if=\"virtual && (processedData.length > 0 || loading)\"\n\t\t\t\tclass=\"virtual-table-body\"\n\t\t\t>\n\t\t\t\t<RecycleScroller\n\t\t\t\t\t:items=\"paginatedData\"\n\t\t\t\t\t:item-size=\"computedVirtualItemHeight\"\n\t\t\t\t\t:key-field=\"rowKey\"\n\t\t\t\t\t:buffer=\"200\"\n\t\t\t\t\tclass=\"scroller\"\n\t\t\t\t\t:style=\"{ height: virtualHeight + 'px' }\"\n\t\t\t\t>\n\t\t\t\t\t<template #default=\"{ item: row }\">\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t:class=\"['virtual-row', getRowClasses(row)]\"\n\t\t\t\t\t\t\t@click=\"handleRowClick(row)\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<!-- Selection checkbox -->\n\t\t\t\t\t\t\t<div v-if=\"selectable\" :class=\"['virtual-cell', cellClasses]\">\n\t\t\t\t\t\t\t\t<f-checkbox\n\t\t\t\t\t\t\t\t\t:checked=\"isRowSelected(row)\"\n\t\t\t\t\t\t\t\t\t@change=\"handleRowSelect(row, $event)\"\n\t\t\t\t\t\t\t\t\t@click.stop\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- Data cells -->\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tv-for=\"column in columns\"\n\t\t\t\t\t\t\t\t:key=\"column.key\"\n\t\t\t\t\t\t\t\t:class=\"['virtual-cell', getCellClasses(column)]\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<slot\n\t\t\t\t\t\t\t\t\t:name=\"'cell-' + column.key\"\n\t\t\t\t\t\t\t\t\t:value=\"getCellValue(row, column.key)\"\n\t\t\t\t\t\t\t\t\t:row=\"row\"\n\t\t\t\t\t\t\t\t\t:column=\"column\"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t{{ getCellValue(row, column.key) }}\n\t\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</template>\n\t\t\t\t</RecycleScroller>\n\t\t\t</div>\n\n\t\t\t<!-- Empty state -->\n\t\t\t<f-empty-state\n\t\t\t\tv-if=\"!loading && processedData.length === 0\"\n\t\t\t\t:icon=\"emptyIcon\"\n\t\t\t\t:title=\"emptyTitle\"\n\t\t\t\t:description=\"emptyDescription\"\n\t\t\t\t:action-label=\"emptyActionLabel\"\n\t\t\t\t@action=\"$emit('empty-action')\"\n\t\t\t/>\n\t\t</div>\n\n\t\t<!-- Footer section: Info and Pagination -->\n\t\t<div v-if=\"showFooter\" :class=\"footerClasses\">\n\t\t\t<div :class=\"infoClasses\">\n\t\t\t\t<span v-if=\"selectable && selectedItems.length > 0\">\n\t\t\t\t\t{{ selectedItems.length }} élément(s) sélectionné(s) sur\n\t\t\t\t\t{{ totalItems }}\n\t\t\t\t</span>\n\t\t\t\t<span v-else>\n\t\t\t\t\t{{ paginationInfo }}\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<f-pagination\n\t\t\t\tv-if=\"effectivePaginated && totalPages > 1\"\n\t\t\t\tv-model=\"internalPage\"\n\t\t\t\t:total-pages=\"totalPages\"\n\t\t\t\t:size=\"size\"\n\t\t\t\t:show-labels=\"false\"\n\t\t\t\t@change=\"handlePageChange\"\n\t\t\t/>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport FSearchBar from '../../molecules/FSearchBar/FSearchBar.vue';\nimport FPagination from '../../molecules/FPagination/FPagination.vue';\nimport FEmptyState from '../../molecules/FEmptyState/FEmptyState.vue';\nimport FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue';\nimport FIcon from '../../atoms/FIcon/FIcon.vue';\nimport FLoader from '../../atoms/FLoader/FLoader.vue';\nimport { RecycleScroller } from 'vue-virtual-scroller';\nimport 'vue-virtual-scroller/dist/vue-virtual-scroller.css';\n\nexport default {\n\tname: 'FDataTable',\n\tcomponents: {\n\t\tFSearchBar,\n\t\tFPagination,\n\t\tFEmptyState,\n\t\tFCheckbox,\n\t\tFIcon,\n\t\tFLoader,\n\t\tRecycleScroller\n\t},\n\tprops: {\n\t\t/**\n\t\t * Array of data objects to display\n\t\t */\n\t\tdata: {\n\t\t\ttype: Array,\n\t\t\tdefault: () => []\n\t\t},\n\t\t/**\n\t\t * Column definitions\n\t\t * Each column: { key: string, label: string, sortable?: boolean, align?: 'left'|'center'|'right' }\n\t\t */\n\t\tcolumns: {\n\t\t\ttype: Array,\n\t\t\trequired: true,\n\t\t\tvalidator: (columns) => columns.every((col) => col.key && col.label)\n\t\t},\n\t\t/**\n\t\t * Unique key property in data objects\n\t\t */\n\t\trowKey: {\n\t\t\ttype: String,\n\t\t\tdefault: 'id'\n\t\t},\n\t\t/**\n\t\t * Enable row selection with checkboxes\n\t\t */\n\t\tselectable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Selected row keys (v-model:selected)\n\t\t */\n\t\tselected: {\n\t\t\ttype: Array,\n\t\t\tdefault: () => []\n\t\t},\n\t\t/**\n\t\t * Enable search functionality\n\t\t */\n\t\tsearchable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Search input placeholder\n\t\t */\n\t\tsearchPlaceholder: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Rechercher...'\n\t\t},\n\t\t/**\n\t\t * Enable pagination\n\t\t */\n\t\tpaginated: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t},\n\t\t/**\n\t\t * Number of items per page\n\t\t */\n\t\tperPage: {\n\t\t\ttype: Number,\n\t\t\tdefault: 10\n\t\t},\n\t\t/**\n\t\t * Current page (v-model:page)\n\t\t */\n\t\tpage: {\n\t\t\ttype: Number,\n\t\t\tdefault: 1\n\t\t},\n\t\t/**\n\t\t * Total items count for server-side pagination\n\t\t */\n\t\ttotalItems: {\n\t\t\ttype: Number,\n\t\t\tdefault: null\n\t\t},\n\t\t/**\n\t\t * Server mode - data fetching is handled externally\n\t\t */\n\t\tserverMode: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Loading state\n\t\t */\n\t\tloading: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Default sort column key\n\t\t */\n\t\tdefaultSortKey: {\n\t\t\ttype: String,\n\t\t\tdefault: null\n\t\t},\n\t\t/**\n\t\t * Default sort direction\n\t\t */\n\t\tdefaultSortDirection: {\n\t\t\ttype: String,\n\t\t\tdefault: 'asc',\n\t\t\tvalidator: (value) => ['asc', 'desc'].includes(value)\n\t\t},\n\t\t/**\n\t\t * Component size\n\t\t */\n\t\tsize: {\n\t\t\ttype: String,\n\t\t\tdefault: 'medium',\n\t\t\tvalidator: (value) => ['small', 'medium', 'large'].includes(value)\n\t\t},\n\t\t/**\n\t\t * Empty state icon\n\t\t */\n\t\temptyIcon: {\n\t\t\ttype: String,\n\t\t\tdefault: 'folder'\n\t\t},\n\t\t/**\n\t\t * Empty state title\n\t\t */\n\t\temptyTitle: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Aucune donnée'\n\t\t},\n\t\t/**\n\t\t * Empty state description\n\t\t */\n\t\temptyDescription: {\n\t\t\ttype: String,\n\t\t\tdefault: \"Il n'y a aucun élément à afficher.\"\n\t\t},\n\t\t/**\n\t\t * Empty state action button label\n\t\t */\n\t\temptyActionLabel: {\n\t\t\ttype: String,\n\t\t\tdefault: ''\n\t\t},\n\t\t/**\n\t\t * Striped row style\n\t\t */\n\t\tstriped: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Hoverable rows\n\t\t */\n\t\thoverable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t},\n\t\t/**\n\t\t * Bordered table\n\t\t */\n\t\tbordered: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Enable virtualization for large datasets (improves performance with 1000+ rows)\n\t\t * When enabled, only visible rows are rendered. Pagination is automatically disabled.\n\t\t */\n\t\tvirtual: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t/**\n\t\t * Height of each virtualized row in pixels\n\t\t * Used only when virtual is enabled\n\t\t */\n\t\tvirtualItemHeight: {\n\t\t\ttype: Number,\n\t\t\tdefault: null\n\t\t},\n\t\t/**\n\t\t * Height of the virtual scroller container in pixels\n\t\t * Used only when virtual is enabled\n\t\t */\n\t\tvirtualHeight: {\n\t\t\ttype: Number,\n\t\t\tdefault: 500\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tsearchQuery: '',\n\t\t\tsortKey: this.defaultSortKey,\n\t\t\tsortDirection: this.defaultSortDirection,\n\t\t\tinternalPage: this.page,\n\t\t\tselectedKeys: [...this.selected]\n\t\t};\n\t},\n\tcomputed: {\n\t\tcontainerClasses() {\n\t\t\treturn 'flex flex-col gap-4 bg-white rounded-lg';\n\t\t},\n\t\ttoolbarClasses() {\n\t\t\treturn 'flex items-center gap-4 flex-wrap';\n\t\t},\n\t\ttableWrapperClasses() {\n\t\t\tconst baseClasses = 'relative overflow-x-auto';\n\t\t\tconst borderClasses = this.bordered\n\t\t\t\t? 'border border-neutral-200 rounded-lg'\n\t\t\t\t: '';\n\t\t\treturn [baseClasses, borderClasses].filter(Boolean).join(' ');\n\t\t},\n\t\tloadingOverlayClasses() {\n\t\t\treturn 'absolute inset-0 bg-white/80 flex items-center justify-center z-10';\n\t\t},\n\t\ttableClasses() {\n\t\t\treturn 'w-full text-left';\n\t\t},\n\t\theaderCellClasses() {\n\t\t\tconst sizeClasses = {\n\t\t\t\tsmall: 'px-3 py-2 text-xs',\n\t\t\t\tmedium: 'px-4 py-3 text-sm',\n\t\t\t\tlarge: 'px-6 py-4 text-base'\n\t\t\t};\n\t\t\treturn [\n\t\t\t\t'font-semibold text-neutral-700 bg-neutral-50 border-b border-neutral-200',\n\t\t\t\tsizeClasses[this.size]\n\t\t\t].join(' ');\n\t\t},\n\t\tcellClasses() {\n\t\t\tconst sizeClasses = {\n\t\t\t\tsmall: 'px-3 py-2 text-xs',\n\t\t\t\tmedium: 'px-4 py-3 text-sm',\n\t\t\t\tlarge: 'px-6 py-4 text-base'\n\t\t\t};\n\t\t\treturn [\n\t\t\t\t'text-neutral-600 border-b border-neutral-100',\n\t\t\t\tsizeClasses[this.size]\n\t\t\t].join(' ');\n\t\t},\n\t\tfooterClasses() {\n\t\t\treturn 'flex items-center justify-between gap-4 flex-wrap';\n\t\t},\n\t\tinfoClasses() {\n\t\t\tconst sizeClasses = {\n\t\t\t\tsmall: 'text-xs',\n\t\t\t\tmedium: 'text-sm',\n\t\t\t\tlarge: 'text-base'\n\t\t\t};\n\t\t\treturn ['text-neutral-500', sizeClasses[this.size]].join(' ');\n\t\t},\n\t\tshowToolbar() {\n\t\t\treturn this.searchable || this.$slots.actions;\n\t\t},\n\t\tshowFooter() {\n\t\t\treturn this.effectivePaginated || this.selectable;\n\t\t},\n\t\t// Filter data based on search query (client-side only)\n\t\tfilteredData() {\n\t\t\tif (this.serverMode || !this.searchQuery) {\n\t\t\t\treturn this.data;\n\t\t\t}\n\t\t\tconst query = this.searchQuery.toLowerCase();\n\t\t\treturn this.data.filter((row) => {\n\t\t\t\treturn this.columns.some((column) => {\n\t\t\t\t\tconst value = this.getCellValue(row, column.key);\n\t\t\t\t\treturn String(value).toLowerCase().includes(query);\n\t\t\t\t});\n\t\t\t});\n\t\t},\n\t\t// Sort filtered data (client-side only)\n\t\tsortedData() {\n\t\t\tif (this.serverMode || !this.sortKey) {\n\t\t\t\treturn this.filteredData;\n\t\t\t}\n\t\t\treturn [...this.filteredData].sort((a, b) => {\n\t\t\t\tconst aValue = this.getCellValue(a, this.sortKey);\n\t\t\t\tconst bValue = this.getCellValue(b, this.sortKey);\n\n\t\t\t\tlet comparison = 0;\n\t\t\t\tif (aValue === null || aValue === undefined) comparison = 1;\n\t\t\t\telse if (bValue === null || bValue === undefined) comparison = -1;\n\t\t\t\telse if (typeof aValue === 'string') {\n\t\t\t\t\tcomparison = aValue.localeCompare(bValue);\n\t\t\t\t} else {\n\t\t\t\t\tcomparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;\n\t\t\t\t}\n\n\t\t\t\treturn this.sortDirection === 'desc' ? -comparison : comparison;\n\t\t\t});\n\t\t},\n\t\t// Processed data after filtering and sorting\n\t\tprocessedData() {\n\t\t\treturn this.sortedData;\n\t\t},\n\t\t// Calculate total items for pagination\n\t\tcomputedTotalItems() {\n\t\t\tif (this.serverMode && this.totalItems !== null) {\n\t\t\t\treturn this.totalItems;\n\t\t\t}\n\t\t\treturn this.processedData.length;\n\t\t},\n\t\t// Total pages\n\t\ttotalPages() {\n\t\t\tif (!this.effectivePaginated) return 1;\n\t\t\treturn Math.max(1, Math.ceil(this.computedTotalItems / this.perPage));\n\t\t},\n\t\t// Data for current page (client-side pagination only)\n\t\tpaginatedData() {\n\t\t\tif (this.serverMode || !this.effectivePaginated) {\n\t\t\t\treturn this.processedData;\n\t\t\t}\n\t\t\tconst start = (this.internalPage - 1) * this.perPage;\n\t\t\tconst end = start + this.perPage;\n\t\t\treturn this.processedData.slice(start, end);\n\t\t},\n\t\t// Pagination info text\n\t\tpaginationInfo() {\n\t\t\tif (!this.effectivePaginated) {\n\t\t\t\treturn `${this.computedTotalItems} élément(s)`;\n\t\t\t}\n\t\t\tconst start = Math.min(\n\t\t\t\t(this.internalPage - 1) * this.perPage + 1,\n\t\t\t\tthis.computedTotalItems\n\t\t\t);\n\t\t\tconst end = Math.min(\n\t\t\t\tthis.internalPage * this.perPage,\n\t\t\t\tthis.computedTotalItems\n\t\t\t);\n\t\t\treturn `${start} - ${end} sur ${this.computedTotalItems}`;\n\t\t},\n\t\t// Set for efficient key lookups\n\t\tselectedKeysSet() {\n\t\t\treturn new Set(this.selectedKeys);\n\t\t},\n\t\t// Selection state\n\t\tselectedItems() {\n\t\t\treturn this.data.filter((row) =>\n\t\t\t\tthis.selectedKeysSet.has(this.getRowKey(row))\n\t\t\t);\n\t\t},\n\t\tisAllSelected() {\n\t\t\tif (this.paginatedData.length === 0) return false;\n\t\t\treturn this.paginatedData.every((row) => this.isRowSelected(row));\n\t\t},\n\t\t// Calculate virtual item height based on size\n\t\tcomputedVirtualItemHeight() {\n\t\t\tif (this.virtualItemHeight !== null) {\n\t\t\t\treturn this.virtualItemHeight;\n\t\t\t}\n\t\t\t// Auto-calculate based on size prop\n\t\t\tconst sizeHeights = {\n\t\t\t\tsmall: 40,\n\t\t\t\tmedium: 52,\n\t\t\t\tlarge: 64\n\t\t\t};\n\t\t\treturn sizeHeights[this.size] || sizeHeights.medium;\n\t\t},\n\t\t// When virtual mode is enabled, don't paginate\n\t\teffectivePaginated() {\n\t\t\treturn this.virtual ? false : this.paginated;\n\t\t}\n\t},\n\twatch: {\n\t\tpage: {\n\t\t\thandler(newVal) {\n\t\t\t\tthis.internalPage = newVal;\n\t\t\t},\n\t\t\timmediate: true\n\t\t},\n\t\tinternalPage(newVal) {\n\t\t\tthis.$emit('update:page', newVal);\n\t\t},\n\t\tselected: {\n\t\t\thandler(newVal) {\n\t\t\t\tthis.selectedKeys = [...newVal];\n\t\t\t},\n\t\t\tdeep: true,\n\t\t\timmediate: true\n\t\t},\n\t\tselectedKeys: {\n\t\t\thandler(newVal) {\n\t\t\t\tthis.$emit('update:selected', newVal);\n\t\t\t},\n\t\t\tdeep: true\n\t\t},\n\t\tsearchQuery() {\n\t\t\t// Reset to first page when search changes\n\t\t\tif (!this.serverMode) {\n\t\t\t\tthis.internalPage = 1;\n\t\t\t}\n\t\t}\n\t},\n\tmethods: {\n\t\tgetCellValue(row, key) {\n\t\t\t// Support nested keys like 'user.name'\n\t\t\treturn key.split('.').reduce((obj, k) => obj?.[k], row);\n\t\t},\n\t\tgetRowKey(row, index) {\n\t\t\treturn row[this.rowKey] ?? index;\n\t\t},\n\t\tgetHeaderCellClasses(column) {\n\t\t\tconst alignClasses = {\n\t\t\t\tleft: 'text-left',\n\t\t\t\tcenter: 'text-center',\n\t\t\t\tright: 'text-right'\n\t\t\t};\n\t\t\tconst sortableClasses =\n\t\t\t\tcolumn.sortable !== false\n\t\t\t\t\t? 'cursor-pointer select-none hover:bg-neutral-100'\n\t\t\t\t\t: '';\n\t\t\treturn [\n\t\t\t\tthis.headerCellClasses,\n\t\t\t\talignClasses[column.align] || 'text-left',\n\t\t\t\tsortableClasses\n\t\t\t]\n\t\t\t\t.filter(Boolean)\n\t\t\t\t.join(' ');\n\t\t},\n\t\tgetCellClasses(column) {\n\t\t\tconst alignClasses = {\n\t\t\t\tleft: 'text-left',\n\t\t\t\tcenter: 'text-center',\n\t\t\t\tright: 'text-right'\n\t\t\t};\n\t\t\treturn [this.cellClasses, alignClasses[column.align] || 'text-left'].join(\n\t\t\t\t' '\n\t\t\t);\n\t\t},\n\t\tgetRowClasses(row) {\n\t\t\tconst baseClasses =\n\t\t\t\t'transition-colors duration-[var(--transition-duration-fast)] ease-[var(--transition-easing-standard)]';\n\t\t\tconst hoverClasses = this.hoverable ? 'hover:bg-neutral-50' : '';\n\t\t\tconst selectedClasses = this.isRowSelected(row) ? 'bg-primary-50' : '';\n\t\t\tconst stripedClasses = this.striped ? 'even:bg-neutral-50/50' : '';\n\t\t\treturn [baseClasses, hoverClasses, selectedClasses, stripedClasses]\n\t\t\t\t.filter(Boolean)\n\t\t\t\t.join(' ');\n\t\t},\n\t\tgetSortIcon(key) {\n\t\t\tif (this.sortKey !== key) return 'chevron-down';\n\t\t\treturn this.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';\n\t\t},\n\t\tgetSortIconClasses(key) {\n\t\t\tconst isActive = this.sortKey === key;\n\t\t\treturn isActive ? 'text-primary-500' : 'text-neutral-400';\n\t\t},\n\t\tgetAriaSort(key, sortable) {\n\t\t\t// Don't add aria-sort if column is not sortable\n\t\t\tif (sortable === false) {\n\t\t\t\treturn undefined;\n\t\t\t}\n\t\t\t// If this column is currently sorted, indicate direction\n\t\t\tif (this.sortKey === key) {\n\t\t\t\treturn this.sortDirection === 'asc' ? 'ascending' : 'descending';\n\t\t\t}\n\t\t\t// Column is sortable but not currently sorted\n\t\t\treturn 'none';\n\t\t},\n\t\thandleSort(key) {\n\t\t\tif (this.sortKey === key) {\n\t\t\t\tthis.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';\n\t\t\t} else {\n\t\t\t\tthis.sortKey = key;\n\t\t\t\tthis.sortDirection = 'asc';\n\t\t\t}\n\t\t\tthis.$emit('sort', { key: this.sortKey, direction: this.sortDirection });\n\t\t},\n\t\thandleSearch(query) {\n\t\t\tthis.$emit('search', query);\n\t\t},\n\t\thandlePageChange(page) {\n\t\t\tthis.$emit('page-change', page);\n\t\t},\n\t\thandleRowClick(row) {\n\t\t\tthis.$emit('row-click', row);\n\t\t},\n\t\tisRowSelected(row) {\n\t\t\treturn this.selectedKeysSet.has(this.getRowKey(row));\n\t\t},\n\t\thandleRowSelect(row, checked) {\n\t\t\tconst key = this.getRowKey(row);\n\t\t\tif (checked) {\n\t\t\t\tif (!this.selectedKeysSet.has(key)) {\n\t\t\t\t\tthis.selectedKeys = [...this.selectedKeys, key];\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tthis.selectedKeys = this.selectedKeys.filter((k) => k !== key);\n\t\t\t}\n\t\t\tthis.$emit('select', { row, selected: checked });\n\t\t},\n\t\thandleSelectAll(checked) {\n\t\t\tif (checked) {\n\t\t\t\tconst currentKeys = this.paginatedData.map((row) =>\n\t\t\t\t\tthis.getRowKey(row)\n\t\t\t\t);\n\t\t\t\tconst newKeys = currentKeys.filter(\n\t\t\t\t\t(k) => !this.selectedKeys.includes(k)\n\t\t\t\t);\n\t\t\t\tthis.selectedKeys = [...this.selectedKeys, ...newKeys];\n\t\t\t} else {\n\t\t\t\tconst currentKeys = this.paginatedData.map((row) =>\n\t\t\t\t\tthis.getRowKey(row)\n\t\t\t\t);\n\t\t\t\tthis.selectedKeys = this.selectedKeys.filter(\n\t\t\t\t\t(k) => !currentKeys.includes(k)\n\t\t\t\t);\n\t\t\t}\n\t\t\tthis.$emit('select-all', checked);\n\t\t},\n\t\tclearSelection() {\n\t\t\tthis.selectedKeys = [];\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n/* Virtual table styling */\n.virtual-table-body {\n\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\n\tborder-radius: 0.5rem;\n\toverflow: hidden;\n}\n\n.virtual-table-body .scroller {\n\twidth: 100%;\n}\n\n.virtual-row {\n\tdisplay: flex;\n\talign-items: center;\n\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\n\ttransition: background-color 0.15s;\n}\n\n.virtual-row:last-child {\n\tborder-bottom: none;\n}\n\n.virtual-cell {\n\tflex: 1;\n\tmin-width: 0;\n\tdisplay: flex;\n\talign-items: center;\n}\n\n/* Mobile Card View - transforms table rows into cards on small screens */\n@media (max-width: 640px) {\n\t/* Hide table header on mobile */\n\ttable thead {\n\t\tdisplay: none;\n\t}\n\n\t/* Make table body a flex container for cards */\n\ttable tbody {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 0.75rem;\n\t}\n\n\t/* Transform each row into a card */\n\ttable tbody tr {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tbackground-color: white;\n\t\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\n\t\tborder-radius: 0.5rem;\n\t\tpadding: 0.75rem;\n\t\tbox-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n\t}\n\n\t/* Style each cell as a row in the card */\n\ttable tbody tr td {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: flex-start;\n\t\tpadding: 0.5rem 0;\n\t\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\n\t\ttext-align: right;\n\t}\n\n\t/* Remove border from last cell */\n\ttable tbody tr td:last-child {\n\t\tborder-bottom: none;\n\t}\n\n\t/* Display column label before cell content */\n\ttable tbody tr td::before {\n\t\tcontent: attr(data-label);\n\t\tfont-weight: 600;\n\t\tcolor: var(--color-neutral-700, #374151);\n\t\ttext-align: left;\n\t\tflex-shrink: 0;\n\t\tmargin-right: 1rem;\n\t}\n\n\t/* Hide empty labels (for checkbox column) */\n\ttable tbody tr td[data-label='']::before {\n\t\tdisplay: none;\n\t}\n\n\t/* Checkbox cell styling */\n\ttable tbody tr td[data-label=''] {\n\t\tjustify-content: flex-start;\n\t\tborder-bottom: 1px solid var(--color-neutral-200, #e5e7eb);\n\t\tmargin-bottom: 0.25rem;\n\t\tpadding-bottom: 0.75rem;\n\t}\n\n\t/* Ensure table is full width */\n\ttable {\n\t\twidth: 100%;\n\t}\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-471f1289";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
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
    createInjector,
    undefined,
    undefined
  );

  var FDataTable = __vue_component__;

export { FDataTable as default };
