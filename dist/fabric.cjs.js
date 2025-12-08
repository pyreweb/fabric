'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */

/* template */
var __vue_render__$B = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "relative inline-flex flex-shrink-0",
      class: [_vm.sizeClasses.wrapper],
      on: { click: _vm.handleClick },
    },
    [
      _c(
        "div",
        {
          class: _vm.containerClasses,
          attrs: {
            role: _vm.showImage ? undefined : "img",
            "aria-label": _vm.computedAriaLabel,
          },
        },
        [
          _vm.showImage
            ? _c("img", {
                staticClass: "w-full h-full object-cover",
                attrs: { src: _vm.src, alt: _vm.alt, loading: "lazy" },
                on: { error: _vm.handleImageError },
              })
            : _c(
                "span",
                {
                  class: [
                    "flex items-center justify-center w-full h-full",
                    _vm.fontSizeClasses,
                  ],
                },
                [
                  _vm.displayInitials
                    ? [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(_vm.displayInitials) +
                            "\n\t\t\t"
                        ),
                      ]
                    : _c(
                        "svg",
                        {
                          staticClass: "w-3/5 h-3/5 text-white opacity-90",
                          attrs: {
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            xmlns: "http://www.w3.org/2000/svg",
                          },
                        },
                        [
                          _c("path", {
                            attrs: {
                              "fill-rule": "evenodd",
                              d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                              "clip-rule": "evenodd",
                            },
                          }),
                        ]
                      ),
                ],
                2
              ),
        ]
      ),
      _vm._v(" "),
      _vm.status ? _c("span", { class: _vm.statusClasses }) : _vm._e(),
    ]
  )
};
var __vue_staticRenderFns__$x = [];
__vue_render__$B._withStripped = true;

  /* style */
  const __vue_inject_styles__$x = undefined;
  /* scoped */
  const __vue_scope_id__$x = undefined;
  /* module identifier */
  const __vue_module_identifier__$x = undefined;
  /* functional template */
  const __vue_is_functional_template__$x = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$x = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$x,
    {},
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$A = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    {
      tag: "component",
      class: _vm.computedClasses,
      attrs: { "aria-label": _vm.computedAriaLabel },
    },
    [
      !_vm.dot
        ? [
            _vm._t("default", function () {
              return [_vm._v(_vm._s(_vm.content))]
            }),
          ]
        : _vm._e(),
    ],
    2
  )
};
var __vue_staticRenderFns__$w = [];
__vue_render__$A._withStripped = true;

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$w = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    {},
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$z = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      class: _vm.classes,
      attrs: {
        type: _vm.type,
        disabled: _vm.disabled || _vm.loading,
        "aria-disabled": _vm.disabled || _vm.loading,
      },
      on: { click: _vm.handleClick },
    },
    [
      _vm.loading
        ? _c(
            "div",
            {
              staticClass:
                "absolute inset-0 flex items-center justify-center text-current",
            },
            [
              _c("FLoader", {
                staticClass: "text-current opacity-100",
                attrs: { size: "sm" },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "flex items-center gap-2",
          class: { "opacity-0": _vm.loading },
        },
        [
          _vm._t("prefix", function () {
            return [
              _vm.iconLeft
                ? _c("span", {
                    class: _vm.iconLeft,
                    attrs: { "aria-hidden": "true" },
                  })
                : _vm._e(),
            ]
          }),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _vm._t("suffix", function () {
            return [
              _vm.iconRight
                ? _c("span", {
                    class: _vm.iconRight,
                    attrs: { "aria-hidden": "true" },
                  })
                : _vm._e(),
            ]
          }),
        ],
        2
      ),
    ]
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$z._withStripped = true;

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$v = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    {},
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$u = {
	name: 'FCheckbox',
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		wrapperClasses() {
			return [
				'inline-flex items-center select-none',
				this.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
			];
		},
		inputClasses() {
			return [
				'shrink-0 w-4 h-4 rounded border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
				this.error
					? 'border-danger-500 text-danger-500 focus:ring-danger-500/20'
					: 'border-neutral-300 text-primary-600 focus:border-primary-600 focus:ring-primary-600/20',
				this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
			];
		},
		labelClasses() {
			return [
				'ml-2 font-sans text-sm',
				this.error ? 'text-danger-500' : 'text-neutral-700'
			];
		}
	},
	methods: {
		updateInput(event) {
			if (!this.disabled) {
				this.$emit('change', event.target.checked);
			}
		}
	}
};

/* script */
const __vue_script__$u = script$u;

/* template */
var __vue_render__$y = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.wrapperClasses }, [
    _c("input", {
      class: _vm.inputClasses,
      attrs: {
        type: "checkbox",
        disabled: _vm.disabled,
        "aria-invalid": _vm.error,
      },
      domProps: { checked: _vm.checked },
      on: {
        change: _vm.updateInput,
        focus: function ($event) {
          return _vm.$emit("focus", $event)
        },
        blur: function ($event) {
          return _vm.$emit("blur", $event)
        },
      },
    }),
    _vm._v(" "),
    _vm.label || _vm.$slots.default
      ? _c(
          "span",
          { class: _vm.labelClasses },
          [
            _vm._t("default", function () {
              return [_vm._v(_vm._s(_vm.label))]
            }),
          ],
          2
        )
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__$u = [];
__vue_render__$y._withStripped = true;

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$u = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$t = {
	name: 'FDivider',
	props: {
		orientation: {
			type: String,
			default: 'horizontal',
			validator: (v) => ['horizontal', 'vertical'].includes(v)
		},
		align: {
			type: String,
			default: 'center',
			validator: (v) => ['left', 'center', 'right'].includes(v)
		},
		color: {
			type: String,
			default: 'gray-300'
		},
		textColor: {
			type: String,
			default: 'gray-500'
		},
		textSize: {
			type: String,
			default: 'sm'
		},
		margin: {
			type: String,
			default: 'md',
			validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v)
		},
		thickness: {
			type: String,
			default: 'thin',
			validator: (v) => ['thin', 'medium', 'thick'].includes(v)
		}
	},
	computed: {
		hasContent() {
			return !!this.$slots.default;
		},
		isVertical() {
			return this.orientation === 'vertical';
		},
		containerClasses() {
			const margins = {
				none: '',
				sm: this.isVertical ? 'mx-2' : 'my-2',
				md: this.isVertical ? 'mx-4' : 'my-4',
				lg: this.isVertical ? 'mx-6' : 'my-6'
			};

			return [
				'flex items-center',
				this.isVertical ? 'flex-col h-full' : 'flex-row w-full',
				margins[this.margin]
			];
		},
		baseLineClasses() {
			const thicknessMap = {
				thin: 'px',
				medium: '0.5',
				thick: '1'
			};
			const size = thicknessMap[this.thickness];

			return [`bg-${this.color}`, this.isVertical ? `w-${size}` : `h-${size}`];
		},
		textClasses() {
			return [
				'font-sans',
				`text-${this.textSize}`,
				`text-${this.textColor}`,
				this.isVertical ? 'py-2' : 'px-3'
			];
		}
	},
	methods: {
		lineClasses(position) {
			if (position === 'full') {
				return [this.isVertical ? 'h-full' : 'w-full', ...this.baseLineClasses];
			}

			const offset = this.isVertical ? 'h-4' : 'w-4';
			const grow = 'flex-1';
			const fixed = `flex-none ${offset}`;

			let sizing = grow;

			if (this.align === 'left') {
				sizing = position === 'start' ? fixed : grow;
			} else if (this.align === 'right') {
				sizing = position === 'start' ? grow : fixed;
			}

			return [sizing, ...this.baseLineClasses];
		}
	}
};

/* script */
const __vue_script__$t = script$t;

/* template */
var __vue_render__$x = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.containerClasses,
      attrs: { role: "separator", "aria-orientation": _vm.orientation },
    },
    [
      _vm.hasContent
        ? [
            _c("span", { class: _vm.lineClasses("start") }),
            _vm._v(" "),
            _c("span", { class: _vm.textClasses }, [_vm._t("default")], 2),
            _vm._v(" "),
            _c("span", { class: _vm.lineClasses("end") }),
          ]
        : _c("span", { class: _vm.lineClasses("full") }),
    ],
    2
  )
};
var __vue_staticRenderFns__$t = [];
__vue_render__$x._withStripped = true;

  /* style */
  const __vue_inject_styles__$t = undefined;
  /* scoped */
  const __vue_scope_id__$t = undefined;
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$t = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const ICON_PATHS = {
	// Navigation
	'chevron-up': 'M4.5 15.75l7.5-7.5 7.5 7.5',
	'chevron-down': 'M19.5 8.25l-7.5 7.5-7.5-7.5',
	'chevron-left': 'M15.75 19.5L8.25 12l7.5-7.5',
	'chevron-right': 'M8.25 4.5l7.5 7.5-7.5 7.5',
	'arrow-up': 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18',
	'arrow-down': 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3',
	'arrow-left': 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18',
	'arrow-right': 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',

	// Actions
	check: 'M4.5 12.75l6 6 9-13.5',
	x: 'M6 18L18 6M6 6l12 12',
	plus: 'M12 4.5v15m7.5-7.5h-15',
	minus: 'M19.5 12h-15',
	search:
		'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
	menu: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
	close: 'M6 18L18 6M6 6l12 12',
	refresh:
		'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
	edit: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
	trash:
		'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0',
	copy: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75',

	// Status
	info: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
	warning:
		'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
	error:
		'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z',
	success: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
	question:
		'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',

	// Common UI
	user: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
	home: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
	cog: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z',
	bell: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
	heart:
		'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
	star: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
	eye: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
	'eye-off':
		'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88',
	lock: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
	unlock:
		'M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
	mail: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
	calendar:
		'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
	clock: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
	download:
		'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
	upload:
		'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5',
	link: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
	'external-link':
		'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
	folder:
		'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
	document:
		'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
};

var script$s = {
	name: 'FIcon',
	props: {
		name: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) =>
				['xs', 'sm', 'md', 'lg', 'xl'].includes(value) ||
				/^\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/.test(value)
		},
		color: {
			type: String,
			default: ''
		},
		decorative: {
			type: Boolean,
			default: true
		},
		label: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconPath() {
			return ICON_PATHS[this.name] || null;
		},
		showPlaceholder() {
			return this.name && !this.iconPath;
		},
		ariaHidden() {
			return this.decorative ? 'true' : undefined;
		},
		ariaLabel() {
			return !this.decorative ? this.label || this.name : undefined;
		},
		sizeClass() {
			const sizeMap = {
				xs: 'w-3 h-3',
				sm: 'w-4 h-4',
				md: 'w-5 h-5',
				lg: 'w-6 h-6',
				xl: 'w-8 h-8'
			};
			return sizeMap[this.size] || '';
		},
		isCustomSize() {
			return !['xs', 'sm', 'md', 'lg', 'xl'].includes(this.size);
		},
		iconClasses() {
			const baseClasses =
				'inline-flex items-center justify-center flex-shrink-0';

			return [baseClasses, this.sizeClass].filter(Boolean).join(' ');
		},
		svgClasses() {
			return 'w-full h-full';
		},
		iconStyle() {
			const style = {};

			if (this.color) {
				style.color = this.color;
			}

			if (this.isCustomSize) {
				const size = /^\d+(px|rem|em)?$/.test(this.size)
					? /^\d+$/.test(this.size)
						? `${this.size}px`
						: this.size
					: this.size;
				style.width = size;
				style.height = size;
			}

			return Object.keys(style).length > 0 ? style : undefined;
		}
	}
};

/* script */
const __vue_script__$s = script$s;

/* template */
var __vue_render__$w = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      class: _vm.iconClasses,
      style: _vm.iconStyle,
      attrs: {
        "aria-hidden": _vm.ariaHidden,
        "aria-label": _vm.ariaLabel,
        role: "img",
      },
    },
    [
      _vm._t("default", function () {
        return [
          _vm.iconPath
            ? _c(
                "svg",
                {
                  class: _vm.svgClasses,
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2",
                  },
                },
                [
                  _c("path", {
                    attrs: {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: _vm.iconPath,
                    },
                  }),
                ]
              )
            : _vm.showPlaceholder
            ? _c(
                "svg",
                {
                  class: _vm.svgClasses,
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "2",
                  },
                },
                [
                  _c("path", {
                    attrs: {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",
                    },
                  }),
                ]
              )
            : _vm._e(),
        ]
      }),
    ],
    2
  )
};
var __vue_staticRenderFns__$s = [];
__vue_render__$w._withStripped = true;

  /* style */
  const __vue_inject_styles__$s = undefined;
  /* scoped */
  const __vue_scope_id__$s = undefined;
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$s = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$r = {
	name: 'FInput',
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: '';

			return [
				baseClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};

/* script */
const __vue_script__$r = script$r;

/* template */
var __vue_render__$v = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    class: _vm.inputClasses,
    attrs: {
      type: _vm.type,
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
    },
    domProps: { value: _vm.value },
    on: {
      input: _vm.handleInput,
      focus: function ($event) {
        return _vm.$emit("focus", $event)
      },
      blur: function ($event) {
        return _vm.$emit("blur", $event)
      },
    },
  })
};
var __vue_staticRenderFns__$r = [];
__vue_render__$v._withStripped = true;

  /* style */
  const __vue_inject_styles__$r = undefined;
  /* scoped */
  const __vue_scope_id__$r = undefined;
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$r = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$q = {
	name: 'FLoader',
	props: {
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		color: {
			type: String,
			default: ''
		},
		overlay: {
			type: Boolean,
			default: false
		},
		centered: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: 'Chargement en cours'
		}
	},
	computed: {
		ariaLabel() {
			return this.label;
		},
		wrapperClasses() {
			const overlayClasses = this.overlay
				? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
				: '';
			return [overlayClasses].filter(Boolean).join(' ');
		},
		containerClasses() {
			const baseClasses = 'inline-flex items-center justify-center';
			const centeredClasses =
				this.centered && !this.overlay ? 'absolute inset-0' : '';

			return [baseClasses, centeredClasses].filter(Boolean).join(' ');
		},
		spinnerClasses() {
			const baseClasses = 'animate-spin';

			const sizeClasses = {
				xs: 'w-4 h-4',
				sm: 'w-5 h-5',
				md: 'w-6 h-6',
				lg: 'w-8 h-8',
				xl: 'w-12 h-12'
			};

			const colorClasses = this.color ? '' : 'text-primary-500';

			return [baseClasses, sizeClasses[this.size], colorClasses]
				.filter(Boolean)
				.join(' ');
		},
		spinnerStyle() {
			if (this.color) {
				return { color: this.color };
			}
			return undefined;
		}
	}
};

/* script */
const __vue_script__$q = script$q;

/* template */
var __vue_render__$u = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.wrapperClasses }, [
    _c(
      "div",
      {
        class: _vm.containerClasses,
        attrs: { role: "status", "aria-label": _vm.ariaLabel },
      },
      [
        _c(
          "svg",
          {
            class: _vm.spinnerClasses,
            style: _vm.spinnerStyle,
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
            },
          },
          [
            _c("circle", {
              staticClass: "opacity-25",
              attrs: {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                "stroke-width": "4",
              },
            }),
            _vm._v(" "),
            _c("path", {
              staticClass: "opacity-75",
              attrs: {
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
              },
            }),
          ]
        ),
      ]
    ),
  ])
};
var __vue_staticRenderFns__$q = [];
__vue_render__$u._withStripped = true;

  /* style */
  const __vue_inject_styles__$q = undefined;
  /* scoped */
  const __vue_scope_id__$q = undefined;
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$q = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$p = {
	name: 'FRadio',
	model: {
		prop: 'modelValue',
		event: 'change'
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number, Boolean],
			required: true
		},
		modelValue: {
			type: [String, Number, Boolean],
			default: null
		},
		name: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},
		containerClasses() {
			const baseClasses = 'inline-flex items-center cursor-pointer font-sans';
			const disabledClasses = this.disabled
				? 'cursor-not-allowed opacity-70'
				: '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		inputClasses() {
			return 'sr-only';
		},
		radioClasses() {
			const baseClasses =
				'inline-flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 flex-shrink-0';

			let stateClasses;
			if (this.error) {
				stateClasses = this.isChecked
					? 'border-danger-500 bg-danger-500'
					: 'border-danger-500 bg-white';
			} else if (this.disabled) {
				stateClasses = this.isChecked
					? 'border-neutral-300 bg-neutral-300'
					: 'border-neutral-300 bg-neutral-100';
			} else {
				stateClasses = this.isChecked
					? 'border-primary-500 bg-primary-500'
					: 'border-neutral-300 bg-white hover:border-primary-400';
			}

			return [baseClasses, stateClasses].filter(Boolean).join(' ');
		},
		dotClasses() {
			return 'w-2 h-2 rounded-full bg-white';
		},
		labelClasses() {
			const baseClasses = 'ml-2 text-sm text-neutral-800 select-none';

			let stateClasses = '';
			if (this.disabled) {
				stateClasses = 'text-neutral-400';
			} else if (this.error) {
				stateClasses = 'text-danger-500';
			}

			return [baseClasses, stateClasses].filter(Boolean).join(' ');
		}
	},
	methods: {
		handleChange() {
			if (!this.disabled) {
				this.$emit('change', this.value);
			}
		}
	}
};

/* script */
const __vue_script__$p = script$p;

/* template */
var __vue_render__$t = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.containerClasses }, [
    _c("input", {
      class: _vm.inputClasses,
      attrs: { type: "radio", name: _vm.name, disabled: _vm.disabled },
      domProps: { value: _vm.value, checked: _vm.isChecked },
      on: { change: _vm.handleChange },
    }),
    _vm._v(" "),
    _c("span", { class: _vm.radioClasses, attrs: { "aria-hidden": "true" } }, [
      _vm.isChecked ? _c("span", { class: _vm.dotClasses }) : _vm._e(),
    ]),
    _vm._v(" "),
    _vm.label
      ? _c("span", { class: _vm.labelClasses }, [
          _vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t"),
        ])
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__$p = [];
__vue_render__$t._withStripped = true;

  /* style */
  const __vue_inject_styles__$p = undefined;
  /* scoped */
  const __vue_scope_id__$p = undefined;
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$p = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

let idCounter$4 = 0;

var script$o = {
	name: 'FTextarea',
	props: {
		value: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		rows: {
			type: [Number, String],
			default: 3
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: ''
		},
		maxlength: {
			type: [Number, String],
			default: null
		},
		showCounter: {
			type: Boolean,
			default: false
		}
	},
	data() {
		const id = ++idCounter$4;
		return {
			inputId: `ftextarea-${id}`,
			errorId: `ftextarea-error-${id}`
		};
	},
	computed: {
		wrapperClasses() {
			return 'flex flex-col';
		},
		labelClasses() {
			const baseClasses = 'font-sans text-sm text-neutral-700 mb-1';
			const errorClasses = this.error ? 'text-danger-500' : '';

			return [baseClasses, errorClasses].filter(Boolean).join(' ');
		},
		textareaClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 resize-y';

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: '';

			const paddingClasses = 'py-2.5 px-3.5 text-sm';

			return [baseClasses, paddingClasses, stateClasses, disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		footerClasses() {
			return 'flex justify-between items-center mt-1';
		},
		errorMessageClasses() {
			return 'font-sans text-xs text-danger-500';
		},
		counterClasses() {
			const baseClasses = 'font-sans text-xs';
			const stateClasses = this.isOverLimit
				? 'text-danger-500'
				: 'text-neutral-500';

			return [baseClasses, stateClasses].filter(Boolean).join(' ');
		},
		characterCount() {
			return this.value ? this.value.length : 0;
		},
		isOverLimit() {
			return this.maxlength && this.characterCount > Number(this.maxlength);
		},
		hasCounter() {
			return this.showCounter && this.maxlength;
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};

/* script */
const __vue_script__$o = script$o;

/* template */
var __vue_render__$s = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.wrapperClasses }, [
    _vm.label
      ? _c("label", { class: _vm.labelClasses, attrs: { for: _vm.inputId } }, [
          _vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t"),
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("textarea", {
      class: _vm.textareaClasses,
      attrs: {
        id: _vm.inputId,
        placeholder: _vm.placeholder,
        disabled: _vm.disabled,
        readonly: _vm.readonly,
        rows: _vm.rows,
        maxlength: _vm.maxlength,
        "aria-invalid": _vm.error,
        "aria-describedby": _vm.errorMessage ? _vm.errorId : undefined,
      },
      domProps: { value: _vm.value },
      on: {
        input: _vm.handleInput,
        focus: function ($event) {
          return _vm.$emit("focus", $event)
        },
        blur: function ($event) {
          return _vm.$emit("blur", $event)
        },
      },
    }),
    _vm._v(" "),
    _vm.hasCounter || _vm.errorMessage
      ? _c("div", { class: _vm.footerClasses }, [
          _vm.errorMessage
            ? _c(
                "span",
                { class: _vm.errorMessageClasses, attrs: { id: _vm.errorId } },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.errorMessage) + "\n\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.hasCounter
            ? _c(
                "span",
                {
                  class: [_vm.counterClasses, { "ml-auto": !_vm.errorMessage }],
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm.characterCount) +
                      "/" +
                      _vm._s(_vm.maxlength) +
                      "\n\t\t"
                  ),
                ]
              )
            : _vm._e(),
        ])
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__$o = [];
__vue_render__$s._withStripped = true;

  /* style */
  const __vue_inject_styles__$o = undefined;
  /* scoped */
  const __vue_scope_id__$o = undefined;
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$o = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$n = {
	name: 'FToggle',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: 'blue',
			validator: (value) =>
				['blue', 'green', 'red', 'orange', 'purple'].includes(value)
		}
	},
	computed: {
		containerClasses() {
			const baseClasses = 'inline-flex items-center cursor-pointer font-sans';
			const disabledClasses = this.disabled
				? 'cursor-not-allowed opacity-50'
				: '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		switchClasses() {
			const baseClasses =
				'relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0';

			const colorClasses = {
				blue: this.value
					? 'bg-primary-500 focus:ring-primary-500/20'
					: 'bg-neutral-300 focus:ring-primary-500/20',
				green: this.value
					? 'bg-success-500 focus:ring-success-500/20'
					: 'bg-neutral-300 focus:ring-success-500/20',
				red: this.value
					? 'bg-danger-500 focus:ring-danger-500/20'
					: 'bg-neutral-300 focus:ring-danger-500/20',
				orange: this.value
					? 'bg-warning-500 focus:ring-warning-500/20'
					: 'bg-neutral-300 focus:ring-warning-500/20',
				purple: this.value
					? 'bg-primary-500 focus:ring-primary-500/20'
					: 'bg-neutral-300 focus:ring-primary-500/20'
			};

			const disabledClasses = this.disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer';

			return [baseClasses, colorClasses[this.color], disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		thumbClasses() {
			const baseClasses =
				'inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out';

			const positionClasses = this.value ? 'translate-x-6' : 'translate-x-1';

			return [baseClasses, positionClasses].filter(Boolean).join(' ');
		},
		labelClasses() {
			const baseClasses = 'ml-2 text-sm text-neutral-800 select-none';

			const disabledClasses = this.disabled ? 'text-neutral-400' : '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		}
	},
	methods: {
		handleToggle() {
			if (!this.disabled) {
				this.$emit('input', !this.value);
				this.$emit('change', !this.value);
			}
		}
	}
};

/* script */
const __vue_script__$n = script$n;

/* template */
var __vue_render__$r = function () {
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
var __vue_staticRenderFns__$n = [];
__vue_render__$r._withStripped = true;

  /* style */
  const __vue_inject_styles__$n = undefined;
  /* scoped */
  const __vue_scope_id__$n = undefined;
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$n = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$m = {
	name: 'FTypography',
	props: {
		variant: {
			type: String,
			default: 'body',
			validator: (value) =>
				[
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'body',
					'caption',
					'overline'
				].includes(value)
		},
		tag: {
			type: String,
			default: null
		},
		truncate: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		computedTag() {
			if (this.tag) return this.tag;
			const tagMap = {
				h1: 'h1',
				h2: 'h2',
				h3: 'h3',
				h4: 'h4',
				h5: 'h5',
				h6: 'h6',
				body: 'p',
				caption: 'span',
				overline: 'span'
			};
			return tagMap[this.variant] || 'p';
		},
		typographyClasses() {
			const baseClasses = 'm-0 font-sans text-neutral-800';

			const variantClasses = {
				h1: 'text-4xl font-bold leading-tight',
				h2: 'text-3xl font-bold leading-snug',
				h3: 'text-2xl font-semibold leading-normal',
				h4: 'text-xl font-semibold leading-normal',
				h5: 'text-lg font-medium leading-relaxed',
				h6: 'text-base font-medium leading-normal',
				body: 'text-base font-normal leading-relaxed',
				caption: 'text-sm font-normal leading-normal text-neutral-500',
				overline:
					'text-xs font-semibold leading-normal uppercase tracking-wider text-neutral-500'
			};

			const truncateClasses = this.truncate
				? 'overflow-hidden text-ellipsis whitespace-nowrap'
				: '';

			return [baseClasses, variantClasses[this.variant], truncateClasses]
				.filter(Boolean)
				.join(' ');
		}
	}
};

/* script */
const __vue_script__$m = script$m;

/* template */
var __vue_render__$q = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.computedTag,
    { tag: "component", class: _vm.typographyClasses },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$m = [];
__vue_render__$q._withStripped = true;

  /* style */
  const __vue_inject_styles__$m = undefined;
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$m = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$p = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "border border-neutral-200 rounded-lg overflow-hidden" },
    [
      _c(
        "button",
        {
          class: _vm.headerClasses,
          attrs: {
            id: _vm.headerId,
            type: "button",
            "aria-expanded": String(_vm.isOpen),
            "aria-controls": _vm.contentId,
          },
          on: { click: _vm.toggle },
        },
        [
          _c(
            "f-typography",
            { staticClass: "flex-1 text-left", attrs: { variant: "h6" } },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")]
          ),
          _vm._v(" "),
          _c("f-icon", {
            class: _vm.iconClasses,
            attrs: { name: "chevron-down", size: "md" },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "content",
          class: _vm.contentWrapperClasses,
          style: _vm.contentStyle,
          attrs: {
            id: _vm.contentId,
            "aria-labelledby": _vm.headerId,
            role: "region",
          },
        },
        [
          _c(
            "div",
            { ref: "contentInner", staticClass: "p-4" },
            [_vm._t("default")],
            2
          ),
        ]
      ),
    ]
  )
};
__vue_render__$p._withStripped = true;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const VARIANT_COLORS = {
	success: {
		container: 'bg-success-50 border-success-200 text-success-800',
		title: 'text-success-800',
		message: 'text-success-700',
		closeButton: 'text-success-600 hover:text-success-800'
	},
	error: {
		container: 'bg-danger-50 border-danger-200 text-danger-800',
		title: 'text-danger-800',
		message: 'text-danger-700',
		closeButton: 'text-danger-600 hover:text-danger-800'
	},
	info: {
		container: 'bg-primary-50 border-primary-200 text-primary-800',
		title: 'text-primary-800',
		message: 'text-primary-700',
		closeButton: 'text-primary-600 hover:text-primary-800'
	}
};

var script$l = {
	name: 'FAlert',
	components: {
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m,
		FButton: __vue_component__$v
	},
	props: {
		variant: {
			type: String,
			default: 'info',
			validator: (value) => ['success', 'error', 'info'].includes(value)
		},
		title: {
			type: String,
			default: ''
		},
		message: {
			type: String,
			default: ''
		},
		closable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isVisible: true
		};
	},
	computed: {
		variantColors() {
			return VARIANT_COLORS[this.variant];
		},
		alertClasses() {
			const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border';
			return `${baseClasses} ${this.variantColors.container}`;
		},
		titleClasses() {
			return this.variantColors.title;
		},
		messageClasses() {
			return this.variantColors.message;
		},
		closeButtonClasses() {
			return `flex-shrink-0 ${this.variantColors.closeButton}`;
		}
	},
	methods: {
		handleClose() {
			this.isVisible = false;
			this.$emit('close');
		}
	}
};

/* script */
const __vue_script__$l = script$l;

/* template */
var __vue_render__$o = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isVisible
    ? _c(
        "div",
        { class: _vm.alertClasses, attrs: { role: "alert" } },
        [
          _c("f-icon", { attrs: { name: _vm.variant, size: "md" } }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-1 min-w-0" },
            [
              _vm.title
                ? _c(
                    "f-typography",
                    { class: _vm.titleClasses, attrs: { variant: "h6" } },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.message
                ? _c(
                    "f-typography",
                    { class: _vm.messageClasses, attrs: { variant: "body" } },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.message) + "\n\t\t")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._t("default"),
            ],
            2
          ),
          _vm._v(" "),
          _vm.closable
            ? _c(
                "f-button",
                {
                  class: _vm.closeButtonClasses,
                  attrs: { variant: "text", size: "small" },
                  on: { click: _vm.handleClose },
                },
                [
                  _c("f-icon", { attrs: { name: "close", size: "sm" } }),
                  _vm._v(" "),
                  _c("span", { staticClass: "sr-only" }, [
                    _vm._v("Fermer l'alerte"),
                  ]),
                ],
                1
              )
            : _vm._e(),
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$l = [];
__vue_render__$o._withStripped = true;

  /* style */
  const __vue_inject_styles__$l = undefined;
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$l = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$k = {
	name: 'FBreadcrumb',
	components: {
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m
	},
	props: {
		items: {
			type: Array,
			required: true,
			validator: (value) =>
				value.every(
					(item) =>
						typeof item.label === 'string' &&
						(item.href === undefined || typeof item.href === 'string') &&
						(item.icon === undefined || typeof item.icon === 'string')
				)
		},
		separatorIcon: {
			type: String,
			default: 'chevron-right'
		},
		ariaLabel: {
			type: String,
			default: "Fil d'Ariane"
		}
	},
	computed: {
		breadcrumbClasses() {
			return 'inline-flex';
		},
		separatorClasses() {
			return 'mx-2 text-neutral-400 flex-shrink-0';
		}
	},
	methods: {
		isCurrentItem(index) {
			return index === this.items.length - 1;
		},
		getItemClasses(index) {
			const baseClasses = 'inline-flex items-center';

			if (this.isCurrentItem(index)) {
				return [baseClasses, 'cursor-default'].join(' ');
			}

			return [
				baseClasses,
				'cursor-pointer',
				'hover:underline',
				'focus:outline-none',
				'focus:ring-2',
				'focus:ring-primary-500/20',
				'focus:rounded'
			].join(' ');
		},
		getTextClasses(index) {
			if (this.isCurrentItem(index)) {
				return 'font-semibold text-neutral-800';
			}
			return 'text-primary-600 hover:text-primary-800';
		},
		handleItemClick(event, item, index) {
			if (this.isCurrentItem(index)) {
				event.preventDefault();
				return;
			}

			this.$emit('navigate', { item, index, event });

			// If the item has no href, prevent default and let the parent handle navigation
			if (!item.href) {
				event.preventDefault();
			}
		}
	}
};

/* script */
const __vue_script__$k = script$k;

/* template */
var __vue_render__$n = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "nav",
    { class: _vm.breadcrumbClasses, attrs: { "aria-label": _vm.ariaLabel } },
    [
      _c(
        "ol",
        { staticClass: "flex items-center flex-wrap gap-1" },
        _vm._l(_vm.items, function (item, index) {
          return _c(
            "li",
            { key: index, staticClass: "flex items-center" },
            [
              index > 0
                ? _c("f-icon", {
                    class: _vm.separatorClasses,
                    attrs: { name: _vm.separatorIcon, size: "sm" },
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.isCurrentItem(index) || _vm.isCurrentItem(index)
                ? _c(
                    _vm.isCurrentItem(index)
                      ? "span"
                      : item.href
                      ? "a"
                      : "button",
                    _vm._b(
                      {
                        tag: "component",
                        class: _vm.getItemClasses(index),
                        attrs: {
                          "aria-current": _vm.isCurrentItem(index)
                            ? "page"
                            : undefined,
                        },
                        on: {
                          click: function ($event) {
                            return _vm.handleItemClick($event, item, index)
                          },
                        },
                      },
                      "component",
                      !_vm.isCurrentItem(index) && item.href
                        ? { href: item.href }
                        : {},
                      false
                    ),
                    [
                      item.icon
                        ? _c("f-icon", {
                            staticClass: "mr-1",
                            attrs: { name: item.icon, size: "sm" },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "f-typography",
                        {
                          class: _vm.getTextClasses(index),
                          attrs: { variant: "body", tag: "span" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t" + _vm._s(item.label) + "\n\t\t\t\t"
                          ),
                        ]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          )
        }),
        0
      ),
    ]
  )
};
var __vue_staticRenderFns__$k = [];
__vue_render__$n._withStripped = true;

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$k = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$j = {
	name: 'FButtonGroup',
	props: {
		ariaLabel: {
			type: String,
			default: 'Groupe de boutons'
		}
	},
	computed: {
		containerClasses() {
			const baseClasses = 'inline-flex';
			const childClasses = [
				'[&>*]:rounded-none',
				'[&>*:first-child]:rounded-l',
				'[&>*:last-child]:rounded-r',
				'[&>*:not(:first-child)]:-ml-px',
				'[&>*]:focus:z-10'
			].join(' ');

			return `${baseClasses} ${childClasses}`;
		}
	}
};

/* script */
const __vue_script__$j = script$j;

/* template */
var __vue_render__$m = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.containerClasses,
      attrs: { role: "group", "aria-label": _vm.ariaLabel },
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$m._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = undefined;
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$j = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter$3 = 0;

var script$i = {
	name: 'FDatePicker',
	components: {
		FIcon: __vue_component__$s
	},
	props: {
		value: {
			type: [String, Date, Array],
			default: null
		},
		mode: {
			type: String,
			default: 'single',
			validator: (value) => ['single', 'range'].includes(value)
		},
		placeholder: {
			type: String,
			default: 'Sélectionner une date'
		},
		format: {
			type: String,
			default: 'DD/MM/YYYY'
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		showTimePicker: {
			type: Boolean,
			default: false
		},
		minDate: {
			type: [String, Date],
			default: null
		},
		maxDate: {
			type: [String, Date],
			default: null
		},
		disabledDates: {
			type: Array,
			default: () => []
		},
		monthNames: {
			type: Array,
			default: () => [
				'Janvier',
				'Février',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Août',
				'Septembre',
				'Octobre',
				'Novembre',
				'Décembre'
			]
		},
		dayNames: {
			type: Array,
			default: () => ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
		},
		firstDayOfWeek: {
			type: Number,
			default: 1,
			validator: (value) => value >= 0 && value <= 6
		}
	},
	data() {
		return {
			isOpen: false,
			displayMonth: new Date().getMonth(),
			displayYear: new Date().getFullYear(),
			selectedDate: null,
			selectedRangeStart: null,
			selectedRangeEnd: null,
			hoverDate: null,
			selectedHour: 0,
			selectedMinute: 0,
			calendarDays: [],
			generatedId: `f-datepicker-${++idCounter$3}`
		};
	},
	computed: {
		containerClasses() {
			return 'relative w-full';
		},
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 pr-10';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: 'cursor-pointer';

			return [
				baseClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		iconClasses() {
			const baseClasses =
				'absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400';
			const cursorClass = this.disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer';
			return `${baseClasses} ${cursorClass}`;
		},
		calendarClasses() {
			return 'absolute z-50 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg min-w-[320px]';
		},
		navButtonClasses() {
			return 'p-1 rounded hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		selectClasses() {
			return 'px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		timeButtonClasses() {
			return 'p-1 rounded hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		timeInputClasses() {
			return 'w-12 px-2 py-1 text-center text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		cancelButtonClasses() {
			return 'px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		applyButtonClasses() {
			return 'px-3 py-1.5 text-sm font-medium text-white bg-primary-500 rounded hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed';
		},
		displayValue() {
			if (this.mode === 'single' && this.selectedDate) {
				return this.formatDate(this.selectedDate);
			} else if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				this.selectedRangeEnd
			) {
				return `${this.formatDate(this.selectedRangeStart)} - ${this.formatDate(
					this.selectedRangeEnd
				)}`;
			} else if (this.mode === 'range' && this.selectedRangeStart) {
				return this.formatDate(this.selectedRangeStart);
			}
			return '';
		},
		yearRange() {
			const currentYear = new Date().getFullYear();
			const years = [];
			for (let i = currentYear - 100; i <= currentYear + 10; i++) {
				years.push(i);
			}
			return years;
		},
		canApply() {
			if (this.mode === 'range') {
				return this.selectedRangeStart && this.selectedRangeEnd;
			}
			return this.selectedDate !== null;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				this.initializeFromValue(newValue);
			}
		},
		isOpen(newValue) {
			if (newValue) {
				this.$nextTick(() => {
					this.updateCalendar();
					document.addEventListener('click', this.handleClickOutside);
				});
			} else {
				document.removeEventListener('click', this.handleClickOutside);
			}
		}
	},
	beforeDestroy() {
		document.removeEventListener('click', this.handleClickOutside);
	},
	methods: {
		initializeFromValue(value) {
			if (!value) {
				this.selectedDate = null;
				this.selectedRangeStart = null;
				this.selectedRangeEnd = null;
				return;
			}

			if (this.mode === 'single') {
				this.selectedDate = this.parseDate(value);
				if (this.selectedDate && this.showTimePicker) {
					this.selectedHour = this.selectedDate.getHours();
					this.selectedMinute = this.selectedDate.getMinutes();
				}
			} else if (
				this.mode === 'range' &&
				Array.isArray(value) &&
				value.length === 2
			) {
				this.selectedRangeStart = this.parseDate(value[0]);
				this.selectedRangeEnd = this.parseDate(value[1]);
			}
		},
		parseDate(value) {
			if (value instanceof Date) {
				return value;
			}
			if (typeof value === 'string') {
				return new Date(value);
			}
			return null;
		},
		formatDate(date) {
			if (!date) return '';

			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');

			let formatted = this.format
				.replace('DD', day)
				.replace('MM', month)
				.replace('YYYY', year);

			if (this.showTimePicker) {
				formatted += ` ${hours}:${minutes}`;
			}

			return formatted;
		},
		toggleCalendar() {
			if (this.disabled || this.readonly) return;
			this.isOpen = !this.isOpen;
		},
		openCalendar() {
			if (this.disabled || this.readonly) return;
			this.isOpen = true;
		},
		closeCalendar() {
			this.isOpen = false;
			this.hoverDate = null;
		},
		handleFocus(event) {
			this.$emit('focus', event);
		},
		handleBlur(event) {
			this.$emit('blur', event);
		},
		handleClickOutside(event) {
			if (
				this.$el &&
				!this.$el.contains(event.target) &&
				event.target instanceof Node
			) {
				this.closeCalendar();
			}
		},
		updateCalendar() {
			const year = this.displayYear;
			const month = this.displayMonth;
			const firstDay = new Date(year, month, 1);
			const lastDay = new Date(year, month + 1, 0);
			const daysInMonth = lastDay.getDate();

			// Adjust first day based on firstDayOfWeek prop
			let firstDayOfWeek = firstDay.getDay();
			firstDayOfWeek = (firstDayOfWeek - this.firstDayOfWeek + 7) % 7;

			const days = [];

			// Add previous month days
			const prevMonthLastDay = new Date(year, month, 0).getDate();
			for (let i = firstDayOfWeek - 1; i >= 0; i--) {
				days.push({
					date: prevMonthLastDay - i,
					month: month - 1,
					year: month === 0 ? year - 1 : year,
					isCurrentMonth: false
				});
			}

			// Add current month days
			for (let i = 1; i <= daysInMonth; i++) {
				days.push({
					date: i,
					month: month,
					year: year,
					isCurrentMonth: true
				});
			}

			// Add next month days to complete the grid
			const remainingDays = 42 - days.length;
			for (let i = 1; i <= remainingDays; i++) {
				days.push({
					date: i,
					month: month + 1,
					year: month === 11 ? year + 1 : year,
					isCurrentMonth: false
				});
			}

			this.calendarDays = days;
		},
		previousMonth() {
			if (this.displayMonth === 0) {
				this.displayMonth = 11;
				this.displayYear--;
			} else {
				this.displayMonth--;
			}
			this.updateCalendar();
		},
		nextMonth() {
			if (this.displayMonth === 11) {
				this.displayMonth = 0;
				this.displayYear++;
			} else {
				this.displayMonth++;
			}
			this.updateCalendar();
		},
		getDayClasses(day) {
			const baseClasses =
				'h-8 w-8 text-sm rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500/20';

			const classes = [baseClasses];

			if (!day.isCurrentMonth) {
				classes.push('text-neutral-300');
			}

			if (this.isDateSelected(day)) {
				classes.push(
					'bg-primary-500 text-white font-semibold hover:bg-primary-600'
				);
			} else if (this.isDateInRange(day)) {
				classes.push('bg-primary-100 text-primary-700');
			} else if (this.isToday(day)) {
				classes.push(
					'border-2 border-primary-500 text-primary-600 font-medium'
				);
			} else if (day.isCurrentMonth) {
				classes.push('hover:bg-neutral-100 text-neutral-700');
			}

			if (this.isDayDisabled(day)) {
				classes.push('cursor-not-allowed opacity-40');
			} else {
				classes.push('cursor-pointer');
			}

			return classes.join(' ');
		},
		isToday(day) {
			const today = new Date();
			return (
				day.date === today.getDate() &&
				day.month === today.getMonth() &&
				day.year === today.getFullYear()
			);
		},
		isDateSelected(day) {
			if (this.mode === 'single' && this.selectedDate) {
				return (
					day.date === this.selectedDate.getDate() &&
					day.month === this.selectedDate.getMonth() &&
					day.year === this.selectedDate.getFullYear()
				);
			} else if (this.mode === 'range') {
				const isStart =
					this.selectedRangeStart &&
					day.date === this.selectedRangeStart.getDate() &&
					day.month === this.selectedRangeStart.getMonth() &&
					day.year === this.selectedRangeStart.getFullYear();

				const isEnd =
					this.selectedRangeEnd &&
					day.date === this.selectedRangeEnd.getDate() &&
					day.month === this.selectedRangeEnd.getMonth() &&
					day.year === this.selectedRangeEnd.getFullYear();

				return isStart || isEnd;
			}
			return false;
		},
		isDateInRange(day) {
			if (this.mode !== 'range') return false;

			const date = new Date(day.year, day.month, day.date);

			if (this.selectedRangeStart && this.selectedRangeEnd) {
				return date > this.selectedRangeStart && date < this.selectedRangeEnd;
			} else if (this.selectedRangeStart && this.hoverDate) {
				const start = this.selectedRangeStart;
				const end = this.hoverDate;
				return (date > start && date < end) || (date < start && date > end);
			}

			return false;
		},
		isDayDisabled(day) {
			const date = new Date(day.year, day.month, day.date);

			if (this.minDate) {
				const min = this.parseDate(this.minDate);
				if (min && date < min) return true;
			}

			if (this.maxDate) {
				const max = this.parseDate(this.maxDate);
				if (max && date > max) return true;
			}

			if (this.disabledDates.length > 0) {
				return this.disabledDates.some((disabledDate) => {
					const disabled = this.parseDate(disabledDate);
					return (
						disabled &&
						date.getDate() === disabled.getDate() &&
						date.getMonth() === disabled.getMonth() &&
						date.getFullYear() === disabled.getFullYear()
					);
				});
			}

			return false;
		},
		selectDate(day) {
			if (this.isDayDisabled(day)) return;

			const selectedDate = new Date(day.year, day.month, day.date);

			if (this.showTimePicker) {
				selectedDate.setHours(this.selectedHour);
				selectedDate.setMinutes(this.selectedMinute);
			}

			if (this.mode === 'single') {
				this.selectedDate = selectedDate;
				if (!this.showTimePicker) {
					this.emitValue();
					this.closeCalendar();
				}
			} else if (this.mode === 'range') {
				if (
					!this.selectedRangeStart ||
					(this.selectedRangeStart && this.selectedRangeEnd)
				) {
					this.selectedRangeStart = selectedDate;
					this.selectedRangeEnd = null;
				} else {
					if (selectedDate < this.selectedRangeStart) {
						this.selectedRangeEnd = this.selectedRangeStart;
						this.selectedRangeStart = selectedDate;
					} else {
						this.selectedRangeEnd = selectedDate;
					}
				}
			}
		},
		handleDayHover(day) {
			if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				!this.selectedRangeEnd
			) {
				this.hoverDate = new Date(day.year, day.month, day.date);
			}
		},
		incrementHour() {
			this.selectedHour = (this.selectedHour + 1) % 24;
		},
		decrementHour() {
			this.selectedHour = (this.selectedHour - 1 + 24) % 24;
		},
		incrementMinute() {
			this.selectedMinute = (this.selectedMinute + 1) % 60;
		},
		decrementMinute() {
			this.selectedMinute = (this.selectedMinute - 1 + 60) % 60;
		},
		updateTime() {
			if (this.selectedDate && this.mode === 'single') {
				this.selectedDate.setHours(this.selectedHour);
				this.selectedDate.setMinutes(this.selectedMinute);
			}
		},
		applySelection() {
			this.emitValue();
			this.closeCalendar();
		},
		emitValue() {
			if (this.mode === 'single') {
				this.$emit('input', this.selectedDate);
				this.$emit('change', this.selectedDate);
			} else if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				this.selectedRangeEnd
			) {
				this.$emit('input', [this.selectedRangeStart, this.selectedRangeEnd]);
				this.$emit('change', [this.selectedRangeStart, this.selectedRangeEnd]);
			}
		}
	}
};

/* script */
const __vue_script__$i = script$i;

/* template */
var __vue_render__$l = function () {
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
var __vue_staticRenderFns__$i = [];
__vue_render__$l._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$i = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$h = {
	name: 'FEmptyState',
	components: {
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m,
		FButton: __vue_component__$v
	},
	props: {
		icon: {
			type: String,
			default: 'folder'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		actionLabel: {
			type: String,
			default: ''
		},
		actionVariant: {
			type: String,
			default: 'primary',
			validator: (value) =>
				[
					'primary',
					'secondary',
					'danger',
					'success',
					'outline',
					'ghost',
					'link'
				].includes(value)
		}
	},
	computed: {
		containerClasses() {
			return 'flex flex-col items-center justify-center text-center py-12 px-4';
		},
		iconClasses() {
			return 'text-neutral-400 mb-4';
		},
		titleClasses() {
			return 'text-neutral-700 mb-2';
		},
		descriptionClasses() {
			return 'text-neutral-500 max-w-md mb-6';
		},
		actionClasses() {
			return 'mt-4';
		}
	},
	methods: {
		handleAction(event) {
			this.$emit('action', event);
		}
	}
};

/* script */
const __vue_script__$h = script$h;

/* template */
var __vue_render__$k = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.containerClasses,
      attrs: { role: "status", "aria-live": "polite" },
    },
    [
      _c("f-icon", {
        class: _vm.iconClasses,
        attrs: { name: _vm.icon, size: "xl", decorative: true },
      }),
      _vm._v(" "),
      _c(
        "f-typography",
        { class: _vm.titleClasses, attrs: { variant: "h5" } },
        [_vm._v("\n\t\t" + _vm._s(_vm.title) + "\n\t")]
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "f-typography",
            { class: _vm.descriptionClasses, attrs: { variant: "body" } },
            [_vm._v("\n\t\t" + _vm._s(_vm.description) + "\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _vm.actionLabel
        ? _c(
            "f-button",
            {
              class: _vm.actionClasses,
              attrs: { variant: _vm.actionVariant },
              on: { click: _vm.handleAction },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.actionLabel) + "\n\t")]
          )
        : _vm._e(),
    ],
    2
  )
};
var __vue_staticRenderFns__$h = [];
__vue_render__$k._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$h = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const FILE_TYPE_ICONS = {
	pdf: 'document',
	doc: 'document',
	docx: 'document',
	xls: 'document',
	xlsx: 'document',
	ppt: 'document',
	pptx: 'document',
	txt: 'document',
	csv: 'document',
	jpg: 'image',
	jpeg: 'image',
	png: 'image',
	gif: 'image',
	svg: 'image',
	webp: 'image',
	bmp: 'image',
	zip: 'document',
	rar: 'document',
	'7z': 'document',
	tar: 'document',
	gz: 'document',
	default: 'document'
};

var script$g = {
	name: 'FFilePreview',
	components: {
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m,
		FLoader: __vue_component__$q,
		FButton: __vue_component__$v
	},
	props: {
		fileName: {
			type: String,
			required: true
		},
		fileType: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loadingLabel: {
			type: String,
			default: 'Téléversement en cours'
		},
		removeLabel: {
			type: String,
			default: 'Supprimer le fichier'
		}
	},
	computed: {
		fileExtension() {
			if (this.fileType) {
				return this.fileType.toLowerCase();
			}
			const parts = this.fileName.split('.');
			return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
		},
		fileIcon() {
			return FILE_TYPE_ICONS[this.fileExtension] || FILE_TYPE_ICONS.default;
		},
		containerClasses() {
			const baseClasses =
				'flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg border border-neutral-200';
			const disabledClasses = this.disabled ? 'opacity-50' : '';

			return [baseClasses, disabledClasses].filter(Boolean).join(' ');
		},
		iconClasses() {
			return 'text-neutral-500 flex-shrink-0';
		},
		fileNameClasses() {
			return this.disabled ? 'text-neutral-400' : '';
		}
	},
	methods: {
		handleRemove() {
			if (!this.disabled && !this.loading) {
				this.$emit('remove');
			}
		}
	}
};

/* script */
const __vue_script__$g = script$g;

/* template */
var __vue_render__$j = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.containerClasses },
    [
      _c("f-icon", {
        class: _vm.iconClasses,
        attrs: { name: _vm.fileIcon, size: "md" },
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex-1 min-w-0" },
        [
          _c(
            "f-typography",
            {
              class: _vm.fileNameClasses,
              attrs: { variant: "body", truncate: true },
            },
            [_vm._v("\n\t\t\t" + _vm._s(_vm.fileName) + "\n\t\t")]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex-shrink-0" },
        [
          _vm.loading
            ? _c("f-loader", { attrs: { size: "sm", label: _vm.loadingLabel } })
            : _c(
                "f-button",
                {
                  attrs: {
                    variant: "ghost",
                    size: "small",
                    disabled: _vm.disabled,
                  },
                  on: { click: _vm.handleRemove },
                },
                [
                  _c("f-icon", { attrs: { name: "trash", size: "sm" } }),
                  _vm._v(" "),
                  _c("span", { staticClass: "sr-only" }, [
                    _vm._v(_vm._s(_vm.removeLabel)),
                  ]),
                ],
                1
              ),
        ],
        1
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter$2 = 0;

var script$f = {
	name: 'FFormField',
	components: {
		FInput: __vue_component__$r
	},
	props: {
		id: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'medium'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		hint: {
			type: String,
			default: ''
		},
		errorMessage: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			generatedId: ''
		};
	},
	computed: {
		inputId() {
			return this.id || this.generatedId;
		}
	},
	created() {
		if (!this.id) {
			this.generatedId = `f-form-field-${++idCounter$2}`;
		}
	}
};

/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$i = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "flex flex-col gap-1.5" },
    [
      _vm.label
        ? _c(
            "label",
            {
              class: [
                "text-sm font-medium text-neutral-700",
                { "after:content-['_*'] after:text-danger-500": _vm.required },
              ],
              attrs: { for: _vm.inputId },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("f-input", {
        attrs: {
          id: _vm.inputId,
          value: _vm.value,
          type: _vm.type,
          placeholder: _vm.placeholder,
          size: _vm.size,
          disabled: _vm.disabled,
          readonly: _vm.readonly,
          error: !!_vm.errorMessage,
        },
        on: {
          input: function ($event) {
            return _vm.$emit("input", $event)
          },
          focus: function ($event) {
            return _vm.$emit("focus", $event)
          },
          blur: function ($event) {
            return _vm.$emit("blur", $event)
          },
        },
      }),
      _vm._v(" "),
      _vm.errorMessage
        ? _c("span", { staticClass: "text-xs text-danger-500" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.errorMessage) + "\n\t"),
          ])
        : _vm.hint
        ? _c("span", { staticClass: "text-xs text-neutral-500" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.hint) + "\n\t"),
          ])
        : _vm._e(),
    ],
    1
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$e = {
	name: 'FCard',
	components: {
		FTypography: __vue_component__$m
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		subtitle: {
			type: String,
			default: ''
		},
		clickable: {
			type: Boolean,
			default: false
		},
		bordered: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		cardClasses() {
			const baseClasses =
				'bg-white rounded-lg overflow-hidden transition-all duration-200';
			const borderedClasses = this.bordered ? 'border border-neutral-200' : '';
			const clickableClasses = this.clickable
				? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
				: '';

			return [baseClasses, borderedClasses, clickableClasses]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleClick(event) {
			if (this.clickable) {
				this.$emit('click', event);
			}
		}
	}
};

/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$h = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.cardClasses, on: { click: _vm.handleClick } }, [
    _vm.$slots.header || _vm.title
      ? _c(
          "div",
          { staticClass: "px-4 pt-4" },
          [
            _vm._t("header", function () {
              return [
                _vm.title
                  ? _c("f-typography", { attrs: { variant: "h5" } }, [
                      _vm._v(_vm._s(_vm.title)),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.subtitle
                  ? _c("f-typography", { attrs: { variant: "caption" } }, [
                      _vm._v(_vm._s(_vm.subtitle)),
                    ])
                  : _vm._e(),
              ]
            }),
          ],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.media
      ? _c(
          "div",
          { staticClass: "w-full [&_img]:w-full [&_img]:h-auto [&_img]:block" },
          [_vm._t("media")],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "p-4" }, [_vm._t("default")], 2),
    _vm._v(" "),
    _vm.$slots.actions
      ? _c(
          "div",
          { staticClass: "px-4 pb-4 flex gap-2" },
          [_vm._t("actions")],
          2
        )
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__$e = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$d = {
	name: 'FSearchBar',
	components: {
		FIcon: __vue_component__$s,
		FButton: __vue_component__$v
	},
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		placeholder: {
			type: String,
			default: 'Rechercher...'
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		iconPosition: {
			type: String,
			default: 'inside',
			validator: (value) => ['inside', 'outside'].includes(value)
		},
		buttonMode: {
			type: Boolean,
			default: false
		},
		buttonLabel: {
			type: String,
			default: 'Rechercher'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		containerClasses() {
			return 'flex items-center gap-2';
		},
		inputWrapperClasses() {
			return 'relative flex-1';
		},
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const paddingLeftClasses = {
				small: 'pl-8',
				medium: 'pl-10',
				large: 'pl-12'
			};

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: '';

			const hasInsideIcon = this.iconPosition === 'inside' && !this.buttonMode;

			return [
				baseClasses,
				sizeClasses[this.size],
				hasInsideIcon ? paddingLeftClasses[this.size] : '',
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		iconButtonClasses() {
			const baseClasses =
				'inline-flex items-center justify-center rounded transition-all duration-200 text-neutral-500 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20';

			const sizeClasses = {
				small: 'p-1.5',
				medium: 'p-2.5',
				large: 'p-3.5'
			};

			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed'
				: 'cursor-pointer';

			return [baseClasses, sizeClasses[this.size], disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		iconSize() {
			const sizeMap = {
				small: 'sm',
				medium: 'md',
				large: 'lg'
			};
			return sizeMap[this.size];
		},
		insideIconClasses() {
			const baseClasses =
				'absolute top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none';

			const leftPositionClasses = {
				small: 'left-2.5',
				medium: 'left-3',
				large: 'left-4'
			};

			return [baseClasses, leftPositionClasses[this.size]]
				.filter(Boolean)
				.join(' ');
		}
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value);
		},
		handleSubmit() {
			if (!this.disabled) {
				this.$emit('search', this.value);
			}
		},
		focus() {
			this.$refs.input.focus();
		}
	}
};

/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$g = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.containerClasses },
    [
      _c(
        "div",
        { class: _vm.inputWrapperClasses },
        [
          _vm.iconPosition === "inside" && !_vm.buttonMode
            ? _c("f-icon", {
                class: _vm.insideIconClasses,
                attrs: { name: "search", size: _vm.iconSize },
              })
            : _vm._e(),
          _vm._v(" "),
          _c("input", {
            ref: "input",
            class: _vm.inputClasses,
            attrs: {
              type: "text",
              placeholder: _vm.placeholder,
              disabled: _vm.disabled,
            },
            domProps: { value: _vm.value },
            on: {
              input: _vm.handleInput,
              keydown: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.handleSubmit.apply(null, arguments)
              },
              focus: function ($event) {
                return _vm.$emit("focus", $event)
              },
              blur: function ($event) {
                return _vm.$emit("blur", $event)
              },
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _vm.buttonMode
        ? _c(
            "f-button",
            {
              attrs: { size: _vm.size, disabled: _vm.disabled, type: "button" },
              on: { click: _vm.handleSubmit },
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.buttonLabel) + "\n\t")]
          )
        : _vm.iconPosition === "outside"
        ? _c(
            "button",
            {
              class: _vm.iconButtonClasses,
              attrs: { disabled: _vm.disabled, type: "button" },
              on: { click: _vm.handleSubmit },
            },
            [
              _c("f-icon", { attrs: { name: "search", size: _vm.iconSize } }),
              _vm._v(" "),
              _c("span", { staticClass: "sr-only" }, [
                _vm._v(_vm._s(_vm.buttonLabel)),
              ]),
            ],
            1
          )
        : _vm._e(),
    ],
    1
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$c = {
	name: 'FListItem',
	components: {
		FTypography: __vue_component__$m
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		subtitle: {
			type: String,
			default: ''
		},
		clickable: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		truncate: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		listItemClasses() {
			const baseClasses =
				'flex items-center gap-3 px-4 py-3 transition-all duration-200';
			const clickableClasses =
				this.clickable && !this.disabled
					? 'cursor-pointer hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
					: '';
			const selectedClasses = this.selected ? 'bg-primary-50' : '';
			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed'
				: '';

			return [baseClasses, clickableClasses, selectedClasses, disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		titleClasses() {
			return this.disabled ? 'text-neutral-400' : '';
		},
		subtitleClasses() {
			return this.disabled ? 'text-neutral-300' : '';
		}
	},
	methods: {
		handleClick(event) {
			if (!this.disabled && this.clickable) {
				this.$emit('click', event);
			}
		}
	}
};

/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$f = function () {
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
var __vue_staticRenderFns__$c = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$b = {
	name: 'FPagination',
	components: {
		FButton: __vue_component__$v,
		FIcon: __vue_component__$s
	},
	props: {
		value: {
			type: Number,
			default: 1
		},
		totalPages: {
			type: Number,
			required: true,
			validator: (value) => value >= 1
		},
		maxVisiblePages: {
			type: Number,
			default: 5,
			validator: (value) => value >= 3
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		variant: {
			type: String,
			default: 'outline',
			validator: (value) => ['outline', 'ghost'].includes(value)
		},
		previousLabel: {
			type: String,
			default: 'Précédent'
		},
		nextLabel: {
			type: String,
			default: 'Suivant'
		},
		showLabels: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		currentPage() {
			return this.value;
		},
		buttonVariant() {
			return this.variant;
		},
		activeVariant() {
			return 'primary';
		},
		iconSize() {
			const sizeMap = {
				small: 'sm',
				medium: 'sm',
				large: 'md'
			};
			return sizeMap[this.size];
		},
		containerClasses() {
			return 'flex items-center gap-2';
		},
		visiblePages() {
			const total = this.totalPages;
			const current = this.currentPage;
			const max = this.maxVisiblePages;

			if (total <= max) {
				return this.range(1, total);
			}

			const half = Math.floor((max - 1) / 2);
			let start = current - half;
			let end = current + (max - 1 - half);

			if (start < 1) {
				start = 1;
				end = max;
			}

			if (end > total) {
				end = total;
				start = total - max + 1;
			}

			const pages = [];

			if (start > 1) {
				pages.push(1);
				if (start > 2) {
					pages.push('...');
				}
			}

			for (let i = start; i <= end; i++) {
				if (i >= 1 && i <= total) {
					// Skip page 1 if already added in the first block
					// (removed unreachable condition)
					pages.push(i);
				}
			}

			if (end < total) {
				if (end < total - 1) {
					pages.push('...');
				}
				pages.push(total);
			}

			return pages;
		}
	},
	methods: {
		range(start, end) {
			const result = [];
			for (let i = start; i <= end; i++) {
				result.push(i);
			}
			return result;
		},
		goToPage(page) {
			if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
				this.$emit('input', page);
				this.$emit('change', page);
			}
		},
		goToPreviousPage() {
			if (this.currentPage > 1) {
				this.goToPage(this.currentPage - 1);
			}
		},
		goToNextPage() {
			if (this.currentPage < this.totalPages) {
				this.goToPage(this.currentPage + 1);
			}
		}
	}
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$e = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "nav",
    {
      class: _vm.containerClasses,
      attrs: { role: "navigation", "aria-label": "Pagination" },
    },
    [
      _c(
        "f-button",
        {
          attrs: {
            variant: _vm.buttonVariant,
            size: _vm.size,
            disabled: _vm.currentPage <= 1,
          },
          on: { click: _vm.goToPreviousPage },
          scopedSlots: _vm._u([
            {
              key: "iconLeft",
              fn: function () {
                return [
                  _c("f-icon", {
                    attrs: { name: "chevron-left", size: _vm.iconSize },
                  }),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _vm._v(" "),
          _c("span", { class: { "sr-only": !_vm.showLabels } }, [
            _vm._v(_vm._s(_vm.previousLabel)),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex items-center gap-1" },
        [
          _vm._l(_vm.visiblePages, function (page, index) {
            return [
              page === "..."
                ? _c(
                    "span",
                    {
                      key: "ellipsis-" + index,
                      staticClass: "px-2 text-neutral-400",
                    },
                    [_vm._v("\n\t\t\t\t...\n\t\t\t")]
                  )
                : [
                    page === _vm.currentPage
                      ? _c(
                          "span",
                          { key: page, attrs: { "aria-current": "page" } },
                          [
                            _c(
                              "f-button",
                              {
                                attrs: {
                                  variant: _vm.activeVariant,
                                  size: _vm.size,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.goToPage(page)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(page) +
                                    "\n\t\t\t\t\t"
                                ),
                              ]
                            ),
                          ],
                          1
                        )
                      : _c(
                          "f-button",
                          {
                            key: page,
                            attrs: {
                              variant: _vm.buttonVariant,
                              size: _vm.size,
                            },
                            on: {
                              click: function ($event) {
                                return _vm.goToPage(page)
                              },
                            },
                          },
                          [_vm._v("\n\t\t\t\t\t" + _vm._s(page) + "\n\t\t\t\t")]
                        ),
                  ],
            ]
          }),
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "f-button",
        {
          attrs: {
            variant: _vm.buttonVariant,
            size: _vm.size,
            disabled: _vm.currentPage >= _vm.totalPages,
          },
          on: { click: _vm.goToNextPage },
          scopedSlots: _vm._u([
            {
              key: "iconRight",
              fn: function () {
                return [
                  _c("f-icon", {
                    attrs: { name: "chevron-right", size: _vm.iconSize },
                  }),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _c("span", { class: { "sr-only": !_vm.showLabels } }, [
            _vm._v(_vm._s(_vm.nextLabel)),
          ]),
        ]
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$d = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.cardClasses }, [
    _c(
      "div",
      { class: _vm.iconContainerClasses },
      [
        _c("f-icon", {
          attrs: { name: _vm.icon, size: "md", decorative: true },
        }),
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { class: _vm.contentClasses },
      [
        _c(
          "f-typography",
          { class: _vm.labelClasses, attrs: { variant: "caption" } },
          [_vm._v("\n\t\t\t" + _vm._s(_vm.label) + "\n\t\t")]
        ),
        _vm._v(" "),
        _c(
          "f-typography",
          { class: _vm.valueClasses, attrs: { variant: "h4" } },
          [_vm._v("\n\t\t\t" + _vm._s(_vm.value) + "\n\t\t")]
        ),
      ],
      1
    ),
  ])
};
__vue_render__$d._withStripped = true;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let selectCounter = 0;

var script$a = {
	name: 'FSelect',
	components: {
		FIcon: __vue_component__$s,
		FLoader: __vue_component__$q,
		FCheckbox: __vue_component__$u
	},
	props: {
		/**
		 * Valeur sélectionnée (v-model)
		 * Pour sélection simple: string | number | object
		 * Pour sélection multiple: Array
		 */
		value: {
			type: [String, Number, Object, Array],
			default: null
		},
		/**
		 * Liste des options
		 */
		options: {
			type: Array,
			default: () => []
		},
		/**
		 * Clé pour identifier une option (si options sont des objets)
		 */
		optionKey: {
			type: String,
			default: 'value'
		},
		/**
		 * Clé pour le label d'une option (si options sont des objets)
		 */
		optionLabel: {
			type: String,
			default: 'label'
		},
		/**
		 * Clé pour désactiver une option (si options sont des objets)
		 */
		optionDisabled: {
			type: String,
			default: 'disabled'
		},
		/**
		 * Texte affiché quand aucune valeur n'est sélectionnée
		 */
		placeholder: {
			type: String,
			default: 'Sélectionner...'
		},
		/**
		 * Taille du composant
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		/**
		 * Activer la sélection multiple
		 */
		multiple: {
			type: Boolean,
			default: false
		},
		/**
		 * Activer le champ de recherche
		 */
		searchable: {
			type: Boolean,
			default: false
		},
		/**
		 * Placeholder du champ de recherche
		 */
		searchPlaceholder: {
			type: String,
			default: 'Rechercher...'
		},
		/**
		 * Texte affiché quand aucune option ne correspond à la recherche
		 */
		emptyText: {
			type: String,
			default: 'Aucune option trouvée'
		},
		/**
		 * État de chargement (pour options asynchrones)
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Texte affiché pendant le chargement
		 */
		loadingText: {
			type: String,
			default: 'Chargement...'
		},
		/**
		 * État désactivé
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * État d'erreur
		 */
		error: {
			type: Boolean,
			default: false
		},
		/**
		 * ID du label associé (pour accessibilité)
		 */
		labelId: {
			type: String,
			default: null
		},
		/**
		 * Fonction de filtrage personnalisée
		 */
		filterMethod: {
			type: Function,
			default: null
		}
	},
	data() {
		return {
			uniqueId: ++selectCounter,
			isOpen: false,
			searchQuery: '',
			focusedIndex: -1
		};
	},
	computed: {
		triggerId() {
			return `fselect-trigger-${this.uniqueId}`;
		},
		containerClasses() {
			return 'relative inline-block w-full';
		},
		triggerClasses() {
			const baseClasses =
				'flex items-center justify-between w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 text-left';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: 'bg-white cursor-pointer hover:border-neutral-400';

			return [
				baseClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		valueClasses() {
			const baseClasses = 'flex-1 truncate';
			const placeholderClasses = !this.hasValue
				? 'text-neutral-400'
				: 'text-neutral-900';
			return [baseClasses, placeholderClasses].join(' ');
		},
		iconClasses() {
			const baseClasses =
				'ml-2 flex-shrink-0 transition-transform duration-200';
			const colorClasses = this.disabled
				? 'text-neutral-400'
				: 'text-neutral-500';
			return [baseClasses, colorClasses].join(' ');
		},
		dropdownClasses() {
			return 'absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded shadow-lg max-h-60 overflow-hidden';
		},
		searchInputClasses() {
			return 'w-full pl-8 pr-2.5 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';
		},
		optionsListClasses() {
			return 'max-h-48 overflow-y-auto';
		},
		optionLabelClasses() {
			return 'flex-1';
		},
		hasValue() {
			if (this.multiple) {
				return Array.isArray(this.value) && this.value.length > 0;
			}
			return (
				this.value !== null && this.value !== undefined && this.value !== ''
			);
		},
		displayValue() {
			if (!this.hasValue) {
				return this.placeholder;
			}

			if (this.multiple && Array.isArray(this.value)) {
				const labels = this.value.map((val) => {
					const option = this.options.find(
						(opt) => this.getOptionValue(opt) === this.getOptionValue(val)
					);
					return option
						? this.getOptionLabel(option)
						: this.getOptionLabel(val);
				});
				return labels.join(', ');
			}

			const selectedOption = this.options.find(
				(opt) => this.getOptionValue(opt) === this.getOptionValue(this.value)
			);
			return selectedOption
				? this.getOptionLabel(selectedOption)
				: this.getOptionLabel(this.value);
		},
		filteredOptions() {
			if (!this.searchQuery) {
				return this.options;
			}

			if (this.filterMethod) {
				return this.filterMethod(this.searchQuery, this.options);
			}

			const query = this.searchQuery.toLowerCase();
			return this.options.filter((option) => {
				const label = this.getOptionLabel(option).toLowerCase();
				return label.includes(query);
			});
		}
	},
	watch: {
		isOpen(newValue) {
			if (newValue) {
				this.$nextTick(() => {
					if (this.searchable && this.$refs.searchInput) {
						this.$refs.searchInput.focus();
					}
					this.setupClickOutside();
				});
				this.$emit('open');
			} else {
				this.searchQuery = '';
				this.focusedIndex = -1;
				this.removeClickOutside();
				this.$emit('close');
			}
		}
	},
	beforeDestroy() {
		this.removeClickOutside();
	},
	methods: {
		getOptionKey(option, index) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionKey] || index;
			}
			return option || index;
		},
		getOptionValue(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionKey];
			}
			return option;
		},
		getOptionLabel(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionLabel] || '';
			}
			return String(option);
		},
		isDisabled(option) {
			if (typeof option === 'object' && option !== null) {
				return option[this.optionDisabled] || false;
			}
			return false;
		},
		isSelected(option) {
			const optionValue = this.getOptionValue(option);

			if (this.multiple && Array.isArray(this.value)) {
				return this.value.some(
					(val) => this.getOptionValue(val) === optionValue
				);
			}

			return this.getOptionValue(this.value) === optionValue;
		},
		getOptionClasses(option, index) {
			const baseClasses =
				'flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-150';
			const hoverClasses = 'hover:bg-neutral-50';
			const focusedClasses =
				this.focusedIndex === index ? 'bg-neutral-100' : '';
			const selectedClasses = this.isSelected(option)
				? 'bg-primary-50 text-primary-700'
				: '';
			const disabledClasses = this.isDisabled(option)
				? 'opacity-50 cursor-not-allowed'
				: '';

			return [
				baseClasses,
				!this.isDisabled(option) && hoverClasses,
				focusedClasses,
				selectedClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		toggleDropdown() {
			if (this.disabled) return;
			this.isOpen = !this.isOpen;
		},
		openDropdown() {
			if (this.disabled) return;
			this.isOpen = true;
		},
		closeDropdown() {
			this.isOpen = false;
		},
		handleOptionClick(option) {
			if (this.isDisabled(option)) return;

			const optionValue = this.getOptionValue(option);

			if (this.multiple) {
				let newValue = Array.isArray(this.value) ? [...this.value] : [];
				const index = newValue.findIndex(
					(val) => this.getOptionValue(val) === optionValue
				);

				if (index > -1) {
					newValue.splice(index, 1);
				} else {
					newValue.push(option);
				}

				this.$emit('input', newValue);
				this.$emit('change', newValue);
			} else {
				this.$emit('input', option);
				this.$emit('change', option);
				this.closeDropdown();
			}
		},
		handleKeyboardNavigation(direction) {
			const maxIndex = this.filteredOptions.length - 1;

			if (direction === 'down') {
				this.focusedIndex =
					this.focusedIndex < maxIndex ? this.focusedIndex + 1 : 0;
			} else if (direction === 'up') {
				this.focusedIndex =
					this.focusedIndex > 0 ? this.focusedIndex - 1 : maxIndex;
			}

			this.scrollToFocusedOption();
		},
		handleEnterKey() {
			if (
				this.focusedIndex >= 0 &&
				this.focusedIndex < this.filteredOptions.length
			) {
				const option = this.filteredOptions[this.focusedIndex];
				this.handleOptionClick(option);
			}
		},
		scrollToFocusedOption() {
			this.$nextTick(() => {
				const optionsList = this.$refs.optionsList;
				// Dynamic refs in v-for return an array, so we access [0]
				const focusedOption = this.$refs[`option-${this.focusedIndex}`];

				if (optionsList && focusedOption && focusedOption[0]) {
					const optionElement = focusedOption[0];
					const optionTop = optionElement.offsetTop;
					const optionHeight = optionElement.offsetHeight;
					const listScrollTop = optionsList.scrollTop;
					const listHeight = optionsList.clientHeight;

					if (optionTop < listScrollTop) {
						optionsList.scrollTop = optionTop;
					} else if (optionTop + optionHeight > listScrollTop + listHeight) {
						optionsList.scrollTop = optionTop + optionHeight - listHeight;
					}
				}
			});
		},
		setupClickOutside() {
			this.clickOutsideHandler = (event) => {
				const dropdown = this.$refs.dropdown;
				const trigger = this.$refs.trigger;
				const target = event.target;

				if (
					target instanceof Node &&
					dropdown &&
					!dropdown.contains(target) &&
					trigger &&
					!trigger.contains(target)
				) {
					this.closeDropdown();
				}
			};

			document.addEventListener('click', this.clickOutsideHandler);
		},
		removeClickOutside() {
			if (this.clickOutsideHandler) {
				document.removeEventListener('click', this.clickOutsideHandler);
			}
		}
	}
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$c = function () {
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
var __vue_staticRenderFns__$a = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$9 = {
	name: 'FActivityFeed',
	components: {
		FListItem: __vue_component__$c,
		FEmptyState: __vue_component__$h,
		FTypography: __vue_component__$m,
		FIcon: __vue_component__$s,
		FBadge: __vue_component__$w,
		FLoader: __vue_component__$q
	},
	props: {
		/**
		 * Array of event objects to display.
		 * Each event should have: { id, type, title, timestamp, description?, actor?, metadata? }
		 */
		events: {
			type: Array,
			default: () => []
		},
		/**
		 * Unique key property in event objects
		 */
		eventKey: {
			type: String,
			default: 'id'
		},
		/**
		 * Event type configurations for customizing icons and badges.
		 * Object format: { [type]: { icon: string, variant: string, label: string } }
		 */
		eventTypes: {
			type: Object,
			default: () => ({
				comment: { icon: 'mail', variant: 'primary', label: 'Commentaire' },
				status: { icon: 'info', variant: 'warning', label: 'Statut' },
				create: { icon: 'plus', variant: 'success', label: 'Création' },
				update: { icon: 'edit', variant: 'neutral', label: 'Modification' },
				delete: { icon: 'trash', variant: 'error', label: 'Suppression' },
				default: { icon: 'bell', variant: 'neutral', label: 'Événement' }
			})
		},
		/**
		 * Whether the events list is currently loading
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether new events are being loaded (for pull-to-refresh or new event polling)
		 */
		loadingNew: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether there are more events to load
		 */
		hasMore: {
			type: Boolean,
			default: false
		},
		/**
		 * Enable infinite scroll to load more events
		 */
		infiniteScroll: {
			type: Boolean,
			default: false
		},
		/**
		 * Threshold in pixels from the bottom to trigger load more
		 */
		infiniteScrollThreshold: {
			type: Number,
			default: 100
		},
		/**
		 * Whether events are clickable
		 */
		clickable: {
			type: Boolean,
			default: false
		},
		/**
		 * Show timeline indicator on the left
		 */
		showTimeline: {
			type: Boolean,
			default: true
		},
		/**
		 * Truncate long content
		 */
		truncateContent: {
			type: Boolean,
			default: false
		},
		/**
		 * Icon size for event icons
		 */
		iconSize: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
		},
		/**
		 * Date/time format function for timestamps
		 */
		formatTimestamp: {
			type: Function,
			default: (timestamp) => {
				if (!timestamp) return '';
				const date = new Date(timestamp);
				if (isNaN(date.getTime())) return String(timestamp);

				const now = new Date();
				const diff = now - date;
				const seconds = Math.floor(diff / 1000);
				const minutes = Math.floor(seconds / 60);
				const hours = Math.floor(minutes / 60);
				const days = Math.floor(hours / 24);

				if (seconds < 60) return "À l'instant";
				if (minutes < 60) return `Il y a ${minutes} min`;
				if (hours < 24) return `Il y a ${hours}h`;
				if (days < 7) return `Il y a ${days}j`;

				return date.toLocaleDateString('fr-FR', {
					day: 'numeric',
					month: 'short',
					year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
				});
			}
		},
		/**
		 * Empty state icon
		 */
		emptyIcon: {
			type: String,
			default: 'bell'
		},
		/**
		 * Empty state title
		 */
		emptyTitle: {
			type: String,
			default: 'Aucune activité'
		},
		/**
		 * Empty state description
		 */
		emptyDescription: {
			type: String,
			default: "Il n'y a aucun événement à afficher pour le moment."
		},
		/**
		 * Empty state action button label
		 */
		emptyActionLabel: {
			type: String,
			default: ''
		},
		/**
		 * Load more button label
		 */
		loadMoreLabel: {
			type: String,
			default: "Charger plus d'événements"
		},
		/**
		 * Loading label for accessibility
		 */
		loadingLabel: {
			type: String,
			default: 'Chargement en cours'
		}
	},
	data() {
		return {
			observer: null
		};
	},
	computed: {
		/**
		 * Sort events in descending chronological order (most recent first)
		 */
		sortedEvents() {
			return [...this.events].sort((a, b) => {
				const dateA = new Date(a.timestamp);
				const dateB = new Date(b.timestamp);
				return dateB - dateA;
			});
		},
		containerClasses() {
			return 'flex flex-col bg-white rounded-lg';
		},
		listClasses() {
			return 'flex flex-col';
		},
		eventContainerClasses() {
			return 'flex gap-3 relative';
		},
		eventContentClasses() {
			return 'flex-1 min-w-0';
		},
		eventBodyClasses() {
			return 'flex flex-col gap-2 mt-1';
		},
		descriptionClasses() {
			return 'text-neutral-600 text-sm';
		},
		metadataClasses() {
			return 'flex items-center gap-2 flex-wrap';
		},
		timestampClasses() {
			return 'flex items-center text-neutral-400';
		},
		timelineClasses() {
			return 'flex flex-col items-center flex-shrink-0 w-8';
		},
		timelineIconClasses() {
			return 'text-white';
		},
		timelineLineClasses() {
			return 'flex-1 w-0.5 bg-neutral-200 min-h-[24px]';
		},
		loadMoreClasses() {
			return 'flex items-center justify-center py-4';
		},
		loadMoreButtonClasses() {
			return 'px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		loadingNewClasses() {
			return 'flex items-center justify-center py-3 border-b border-neutral-100';
		}
	},
	watch: {
		infiniteScroll: {
			handler(newVal) {
				if (newVal) {
					this.$nextTick(() => this.setupIntersectionObserver());
				} else {
					this.destroyIntersectionObserver();
				}
			},
			immediate: true
		}
	},
	mounted() {
		if (this.infiniteScroll) {
			this.setupIntersectionObserver();
		}
	},
	beforeDestroy() {
		this.destroyIntersectionObserver();
	},
	methods: {
		getEventKey(event, index) {
			return event[this.eventKey] ?? index;
		},
		getEventConfig(event) {
			return this.eventTypes[event.type] || this.eventTypes.default || {};
		},
		getEventIcon(event) {
			if (event.icon) return event.icon;
			return this.getEventConfig(event).icon || 'bell';
		},
		getEventTitle(event) {
			return event.title || '';
		},
		getEventSubtitle(event) {
			if (event.actor) {
				return `par ${event.actor}`;
			}
			return '';
		},
		getEventBadge(event) {
			const config = this.getEventConfig(event);
			if (event.badge) return event.badge;
			if (config.label) {
				return { variant: config.variant || 'neutral', label: config.label };
			}
			return null;
		},
		timelineDotClasses(event) {
			const config = this.getEventConfig(event);
			const variantClasses = {
				primary: 'bg-primary-500',
				success: 'bg-success-500',
				warning: 'bg-warning-500',
				error: 'bg-danger-500',
				neutral: 'bg-neutral-400'
			};
			const bgClass = variantClasses[config.variant] || variantClasses.neutral;
			return `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`;
		},
		eventIconContainerClasses(event) {
			const config = this.getEventConfig(event);
			const variantClasses = {
				primary: 'bg-primary-100 text-primary-600',
				success: 'bg-success-100 text-success-600',
				warning: 'bg-warning-100 text-warning-600',
				error: 'bg-danger-100 text-danger-600',
				neutral: 'bg-neutral-100 text-neutral-600'
			};
			const colorClass =
				variantClasses[config.variant] || variantClasses.neutral;
			return `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`;
		},
		handleEventClick(event) {
			if (this.clickable) {
				this.$emit('event-click', event);
			}
		},
		handleLoadMore() {
			this.$emit('load-more');
		},
		setupIntersectionObserver() {
			if (!('IntersectionObserver' in window)) {
				return;
			}

			this.$nextTick(() => {
				const trigger = this.$refs.loadMoreTrigger;
				if (!trigger) return;

				this.observer = new IntersectionObserver(
					(entries) => {
						const entry = entries[0];
						if (entry.isIntersecting && this.hasMore && !this.loading) {
							this.$emit('load-more');
						}
					},
					{
						rootMargin: `${this.infiniteScrollThreshold}px`
					}
				);

				this.observer.observe(trigger);
			});
		},
		destroyIntersectionObserver() {
			if (this.observer) {
				this.observer.disconnect();
				this.observer = null;
			}
		}
	}
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$b = function () {
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
      _vm.sortedEvents.length > 0
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
var __vue_staticRenderFns__$9 = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//

var script$8 = {
	name: 'FForm',
	methods: {
		handleSubmit(event) {
			this.$emit('submit', event);
		}
	}
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$a = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "flex flex-col gap-4",
      on: {
        submit: function ($event) {
          $event.preventDefault();
          return _vm.handleSubmit.apply(null, arguments)
        },
      },
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.$slots.actions
        ? _c("div", { staticClass: "flex gap-2 mt-2" }, [_vm._t("actions")], 2)
        : _vm._e(),
    ],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$7 = {
	name: 'FDataTable',
	components: {
		FSearchBar: __vue_component__$d,
		FPagination: __vue_component__$b,
		FEmptyState: __vue_component__$h,
		FCheckbox: __vue_component__$u,
		FIcon: __vue_component__$s,
		FLoader: __vue_component__$q
	},
	props: {
		/**
		 * Array of data objects to display
		 */
		data: {
			type: Array,
			default: () => []
		},
		/**
		 * Column definitions
		 * Each column: { key: string, label: string, sortable?: boolean, align?: 'left'|'center'|'right' }
		 */
		columns: {
			type: Array,
			required: true,
			validator: (columns) => columns.every((col) => col.key && col.label)
		},
		/**
		 * Unique key property in data objects
		 */
		rowKey: {
			type: String,
			default: 'id'
		},
		/**
		 * Enable row selection with checkboxes
		 */
		selectable: {
			type: Boolean,
			default: false
		},
		/**
		 * Selected row keys (v-model:selected)
		 */
		selected: {
			type: Array,
			default: () => []
		},
		/**
		 * Enable search functionality
		 */
		searchable: {
			type: Boolean,
			default: false
		},
		/**
		 * Search input placeholder
		 */
		searchPlaceholder: {
			type: String,
			default: 'Rechercher...'
		},
		/**
		 * Enable pagination
		 */
		paginated: {
			type: Boolean,
			default: true
		},
		/**
		 * Number of items per page
		 */
		perPage: {
			type: Number,
			default: 10
		},
		/**
		 * Current page (v-model:page)
		 */
		page: {
			type: Number,
			default: 1
		},
		/**
		 * Total items count for server-side pagination
		 */
		totalItems: {
			type: Number,
			default: null
		},
		/**
		 * Server mode - data fetching is handled externally
		 */
		serverMode: {
			type: Boolean,
			default: false
		},
		/**
		 * Loading state
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Default sort column key
		 */
		defaultSortKey: {
			type: String,
			default: null
		},
		/**
		 * Default sort direction
		 */
		defaultSortDirection: {
			type: String,
			default: 'asc',
			validator: (value) => ['asc', 'desc'].includes(value)
		},
		/**
		 * Component size
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		/**
		 * Empty state icon
		 */
		emptyIcon: {
			type: String,
			default: 'folder'
		},
		/**
		 * Empty state title
		 */
		emptyTitle: {
			type: String,
			default: 'Aucune donnée'
		},
		/**
		 * Empty state description
		 */
		emptyDescription: {
			type: String,
			default: "Il n'y a aucun élément à afficher."
		},
		/**
		 * Empty state action button label
		 */
		emptyActionLabel: {
			type: String,
			default: ''
		},
		/**
		 * Striped row style
		 */
		striped: {
			type: Boolean,
			default: false
		},
		/**
		 * Hoverable rows
		 */
		hoverable: {
			type: Boolean,
			default: true
		},
		/**
		 * Bordered table
		 */
		bordered: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			searchQuery: '',
			sortKey: this.defaultSortKey,
			sortDirection: this.defaultSortDirection,
			internalPage: this.page,
			selectedKeys: [...this.selected]
		};
	},
	computed: {
		containerClasses() {
			return 'flex flex-col gap-4 bg-white rounded-lg';
		},
		toolbarClasses() {
			return 'flex items-center gap-4 flex-wrap';
		},
		tableWrapperClasses() {
			const baseClasses = 'relative overflow-x-auto';
			const borderClasses = this.bordered
				? 'border border-neutral-200 rounded-lg'
				: '';
			return [baseClasses, borderClasses].filter(Boolean).join(' ');
		},
		loadingOverlayClasses() {
			return 'absolute inset-0 bg-white/80 flex items-center justify-center z-10';
		},
		tableClasses() {
			return 'w-full text-left';
		},
		headerCellClasses() {
			const sizeClasses = {
				small: 'px-3 py-2 text-xs',
				medium: 'px-4 py-3 text-sm',
				large: 'px-6 py-4 text-base'
			};
			return [
				'font-semibold text-neutral-700 bg-neutral-50 border-b border-neutral-200',
				sizeClasses[this.size]
			].join(' ');
		},
		cellClasses() {
			const sizeClasses = {
				small: 'px-3 py-2 text-xs',
				medium: 'px-4 py-3 text-sm',
				large: 'px-6 py-4 text-base'
			};
			return [
				'text-neutral-600 border-b border-neutral-100',
				sizeClasses[this.size]
			].join(' ');
		},
		footerClasses() {
			return 'flex items-center justify-between gap-4 flex-wrap';
		},
		infoClasses() {
			const sizeClasses = {
				small: 'text-xs',
				medium: 'text-sm',
				large: 'text-base'
			};
			return ['text-neutral-500', sizeClasses[this.size]].join(' ');
		},
		showToolbar() {
			return this.searchable || this.$slots.actions;
		},
		showFooter() {
			return this.paginated || this.selectable;
		},
		// Filter data based on search query (client-side only)
		filteredData() {
			if (this.serverMode || !this.searchQuery) {
				return this.data;
			}
			const query = this.searchQuery.toLowerCase();
			return this.data.filter((row) => {
				return this.columns.some((column) => {
					const value = this.getCellValue(row, column.key);
					return String(value).toLowerCase().includes(query);
				});
			});
		},
		// Sort filtered data (client-side only)
		sortedData() {
			if (this.serverMode || !this.sortKey) {
				return this.filteredData;
			}
			return [...this.filteredData].sort((a, b) => {
				const aValue = this.getCellValue(a, this.sortKey);
				const bValue = this.getCellValue(b, this.sortKey);

				let comparison = 0;
				if (aValue === null || aValue === undefined) comparison = 1;
				else if (bValue === null || bValue === undefined) comparison = -1;
				else if (typeof aValue === 'string') {
					comparison = aValue.localeCompare(bValue);
				} else {
					comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
				}

				return this.sortDirection === 'desc' ? -comparison : comparison;
			});
		},
		// Processed data after filtering and sorting
		processedData() {
			return this.sortedData;
		},
		// Calculate total items for pagination
		computedTotalItems() {
			if (this.serverMode && this.totalItems !== null) {
				return this.totalItems;
			}
			return this.processedData.length;
		},
		// Total pages
		totalPages() {
			if (!this.paginated) return 1;
			return Math.max(1, Math.ceil(this.computedTotalItems / this.perPage));
		},
		// Data for current page (client-side pagination only)
		paginatedData() {
			if (this.serverMode || !this.paginated) {
				return this.processedData;
			}
			const start = (this.internalPage - 1) * this.perPage;
			const end = start + this.perPage;
			return this.processedData.slice(start, end);
		},
		// Pagination info text
		paginationInfo() {
			if (!this.paginated) {
				return `${this.computedTotalItems} élément(s)`;
			}
			const start = Math.min(
				(this.internalPage - 1) * this.perPage + 1,
				this.computedTotalItems
			);
			const end = Math.min(
				this.internalPage * this.perPage,
				this.computedTotalItems
			);
			return `${start} - ${end} sur ${this.computedTotalItems}`;
		},
		// Set for efficient key lookups
		selectedKeysSet() {
			return new Set(this.selectedKeys);
		},
		// Selection state
		selectedItems() {
			return this.data.filter((row) =>
				this.selectedKeysSet.has(this.getRowKey(row))
			);
		},
		isAllSelected() {
			if (this.paginatedData.length === 0) return false;
			return this.paginatedData.every((row) => this.isRowSelected(row));
		}
	},
	watch: {
		page: {
			handler(newVal) {
				this.internalPage = newVal;
			},
			immediate: true
		},
		internalPage(newVal) {
			this.$emit('update:page', newVal);
		},
		selected: {
			handler(newVal) {
				this.selectedKeys = [...newVal];
			},
			deep: true,
			immediate: true
		},
		selectedKeys: {
			handler(newVal) {
				this.$emit('update:selected', newVal);
			},
			deep: true
		},
		searchQuery() {
			// Reset to first page when search changes
			if (!this.serverMode) {
				this.internalPage = 1;
			}
		}
	},
	methods: {
		getCellValue(row, key) {
			// Support nested keys like 'user.name'
			return key.split('.').reduce((obj, k) => obj?.[k], row);
		},
		getRowKey(row, index) {
			return row[this.rowKey] ?? index;
		},
		getHeaderCellClasses(column) {
			const alignClasses = {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right'
			};
			const sortableClasses =
				column.sortable !== false
					? 'cursor-pointer select-none hover:bg-neutral-100'
					: '';
			return [
				this.headerCellClasses,
				alignClasses[column.align] || 'text-left',
				sortableClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		getCellClasses(column) {
			const alignClasses = {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right'
			};
			return [this.cellClasses, alignClasses[column.align] || 'text-left'].join(
				' '
			);
		},
		getRowClasses(row) {
			const baseClasses = 'transition-colors duration-150';
			const hoverClasses = this.hoverable ? 'hover:bg-neutral-50' : '';
			const selectedClasses = this.isRowSelected(row) ? 'bg-primary-50' : '';
			const stripedClasses = this.striped ? 'even:bg-neutral-50/50' : '';
			return [baseClasses, hoverClasses, selectedClasses, stripedClasses]
				.filter(Boolean)
				.join(' ');
		},
		getSortIcon(key) {
			if (this.sortKey !== key) return 'chevron-down';
			return this.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
		},
		getSortIconClasses(key) {
			const isActive = this.sortKey === key;
			return isActive ? 'text-primary-500' : 'text-neutral-400';
		},
		handleSort(key) {
			if (this.sortKey === key) {
				this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
			} else {
				this.sortKey = key;
				this.sortDirection = 'asc';
			}
			this.$emit('sort', { key: this.sortKey, direction: this.sortDirection });
		},
		handleSearch(query) {
			this.$emit('search', query);
		},
		handlePageChange(page) {
			this.$emit('page-change', page);
		},
		handleRowClick(row) {
			this.$emit('row-click', row);
		},
		isRowSelected(row) {
			return this.selectedKeysSet.has(this.getRowKey(row));
		},
		handleRowSelect(row, checked) {
			const key = this.getRowKey(row);
			if (checked) {
				if (!this.selectedKeysSet.has(key)) {
					this.selectedKeys = [...this.selectedKeys, key];
				}
			} else {
				this.selectedKeys = this.selectedKeys.filter((k) => k !== key);
			}
			this.$emit('select', { row, selected: checked });
		},
		handleSelectAll(checked) {
			if (checked) {
				const currentKeys = this.paginatedData.map((row) =>
					this.getRowKey(row)
				);
				const newKeys = currentKeys.filter(
					(k) => !this.selectedKeys.includes(k)
				);
				this.selectedKeys = [...this.selectedKeys, ...newKeys];
			} else {
				const currentKeys = this.paginatedData.map((row) =>
					this.getRowKey(row)
				);
				this.selectedKeys = this.selectedKeys.filter(
					(k) => !currentKeys.includes(k)
				);
			}
			this.$emit('select-all', checked);
		},
		clearSelection() {
			this.selectedKeys = [];
		}
	}
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$9 = function () {
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
              _c(
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
              ),
            ])
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
            _vm.paginated && _vm.totalPages > 1
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
var __vue_staticRenderFns__$7 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-15bfab2f_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* Mobile Card View - transforms table rows into cards on small screens */\n@media (max-width: 640px) {\r\n\t/* Hide table header on mobile */\ntable thead[data-v-15bfab2f] {\r\n\t\tdisplay: none;\n}\r\n\r\n\t/* Make table body a flex container for cards */\ntable tbody[data-v-15bfab2f] {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tgap: 0.75rem;\n}\r\n\r\n\t/* Transform each row into a card */\ntable tbody tr[data-v-15bfab2f] {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tbackground-color: white;\r\n\t\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\r\n\t\tborder-radius: 0.5rem;\r\n\t\tpadding: 0.75rem;\r\n\t\tbox-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n}\r\n\r\n\t/* Style each cell as a row in the card */\ntable tbody tr td[data-v-15bfab2f] {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t\talign-items: flex-start;\r\n\t\tpadding: 0.5rem 0;\r\n\t\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\r\n\t\ttext-align: right;\n}\r\n\r\n\t/* Remove border from last cell */\ntable tbody tr td[data-v-15bfab2f]:last-child {\r\n\t\tborder-bottom: none;\n}\r\n\r\n\t/* Display column label before cell content */\ntable tbody tr td[data-v-15bfab2f]::before {\r\n\t\tcontent: attr(data-label);\r\n\t\tfont-weight: 600;\r\n\t\tcolor: var(--color-neutral-700, #374151);\r\n\t\ttext-align: left;\r\n\t\tflex-shrink: 0;\r\n\t\tmargin-right: 1rem;\n}\r\n\r\n\t/* Hide empty labels (for checkbox column) */\ntable tbody tr td[data-label=''][data-v-15bfab2f]::before {\r\n\t\tdisplay: none;\n}\r\n\r\n\t/* Checkbox cell styling */\ntable tbody tr td[data-label=''][data-v-15bfab2f] {\r\n\t\tjustify-content: flex-start;\r\n\t\tborder-bottom: 1px solid var(--color-neutral-200, #e5e7eb);\r\n\t\tmargin-bottom: 0.25rem;\r\n\t\tpadding-bottom: 0.75rem;\n}\r\n\r\n\t/* Ensure table is full width */\ntable[data-v-15bfab2f] {\r\n\t\twidth: 100%;\n}\n}\r\n", map: {"version":3,"sources":["/home/web/github/hugo/pyreweb/fabric/src/components/organisms/FDataTable/FDataTable.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8lBA,yEAAA;AACA;CACA,gCAAA;AACA;EACA,aAAA;AACA;;CAEA,+CAAA;AACA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;;CAEA,mCAAA;AACA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mDAAA;EACA,qBAAA;EACA,gBAAA;EACA,0CAAA;AACA;;CAEA,yCAAA;AACA;EACA,aAAA;EACA,8BAAA;EACA,uBAAA;EACA,iBAAA;EACA,0DAAA;EACA,iBAAA;AACA;;CAEA,iCAAA;AACA;EACA,mBAAA;AACA;;CAEA,6CAAA;AACA;EACA,yBAAA;EACA,gBAAA;EACA,wCAAA;EACA,gBAAA;EACA,cAAA;EACA,kBAAA;AACA;;CAEA,4CAAA;AACA;EACA,aAAA;AACA;;CAEA,0BAAA;AACA;EACA,2BAAA;EACA,0DAAA;EACA,sBAAA;EACA,uBAAA;AACA;;CAEA,+BAAA;AACA;EACA,WAAA;AACA;AACA","file":"FDataTable.vue","sourcesContent":["<template>\r\n\t<div :class=\"containerClasses\">\r\n\t\t<!-- Toolbar section: Search and Actions -->\r\n\t\t<div v-if=\"showToolbar\" :class=\"toolbarClasses\">\r\n\t\t\t<div class=\"flex-1\">\r\n\t\t\t\t<f-search-bar\r\n\t\t\t\t\tv-if=\"searchable\"\r\n\t\t\t\t\tv-model=\"searchQuery\"\r\n\t\t\t\t\t:placeholder=\"searchPlaceholder\"\r\n\t\t\t\t\t:size=\"size\"\r\n\t\t\t\t\t:disabled=\"loading\"\r\n\t\t\t\t\t@search=\"handleSearch\"\r\n\t\t\t\t/>\r\n\t\t\t</div>\r\n\t\t\t<div v-if=\"$slots.actions\" class=\"flex-shrink-0\">\r\n\t\t\t\t<slot name=\"actions\" :selected-items=\"selectedItems\" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<!-- Table wrapper -->\r\n\t\t<div :class=\"tableWrapperClasses\">\r\n\t\t\t<!-- Loading overlay -->\r\n\t\t\t<div v-if=\"loading\" :class=\"loadingOverlayClasses\">\r\n\t\t\t\t<f-loader size=\"large\" />\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- Table -->\r\n\t\t\t<table v-if=\"processedData.length > 0 || loading\" :class=\"tableClasses\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<!-- Selection checkbox column -->\r\n\t\t\t\t\t\t<th v-if=\"selectable\" :class=\"headerCellClasses\">\r\n\t\t\t\t\t\t\t<f-checkbox :checked=\"isAllSelected\" @change=\"handleSelectAll\" />\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t<!-- Data columns -->\r\n\t\t\t\t\t\t<th\r\n\t\t\t\t\t\t\tv-for=\"column in columns\"\r\n\t\t\t\t\t\t\t:key=\"column.key\"\r\n\t\t\t\t\t\t\t:class=\"getHeaderCellClasses(column)\"\r\n\t\t\t\t\t\t\t@click=\"column.sortable !== false && handleSort(column.key)\"\r\n\t\t\t\t\t\t>\r\n\t\t\t\t\t\t\t<div class=\"flex items-center gap-1\">\r\n\t\t\t\t\t\t\t\t<span>{{ column.label }}</span>\r\n\t\t\t\t\t\t\t\t<f-icon\r\n\t\t\t\t\t\t\t\t\tv-if=\"column.sortable !== false\"\r\n\t\t\t\t\t\t\t\t\t:name=\"getSortIcon(column.key)\"\r\n\t\t\t\t\t\t\t\t\tsize=\"sm\"\r\n\t\t\t\t\t\t\t\t\t:class=\"getSortIconClasses(column.key)\"\r\n\t\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr\r\n\t\t\t\t\t\tv-for=\"(row, rowIndex) in paginatedData\"\r\n\t\t\t\t\t\t:key=\"getRowKey(row, rowIndex)\"\r\n\t\t\t\t\t\t:class=\"getRowClasses(row)\"\r\n\t\t\t\t\t\t@click=\"handleRowClick(row)\"\r\n\t\t\t\t\t>\r\n\t\t\t\t\t\t<!-- Selection checkbox -->\r\n\t\t\t\t\t\t<td v-if=\"selectable\" :class=\"cellClasses\" data-label=\"\">\r\n\t\t\t\t\t\t\t<f-checkbox\r\n\t\t\t\t\t\t\t\t:checked=\"isRowSelected(row)\"\r\n\t\t\t\t\t\t\t\t@change=\"handleRowSelect(row, $event)\"\r\n\t\t\t\t\t\t\t\t@click.stop\r\n\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t<!-- Data cells -->\r\n\t\t\t\t\t\t<td\r\n\t\t\t\t\t\t\tv-for=\"column in columns\"\r\n\t\t\t\t\t\t\t:key=\"column.key\"\r\n\t\t\t\t\t\t\t:class=\"getCellClasses(column)\"\r\n\t\t\t\t\t\t\t:data-label=\"column.label\"\r\n\t\t\t\t\t\t>\r\n\t\t\t\t\t\t\t<slot\r\n\t\t\t\t\t\t\t\t:name=\"'cell-' + column.key\"\r\n\t\t\t\t\t\t\t\t:value=\"getCellValue(row, column.key)\"\r\n\t\t\t\t\t\t\t\t:row=\"row\"\r\n\t\t\t\t\t\t\t\t:column=\"column\"\r\n\t\t\t\t\t\t\t>\r\n\t\t\t\t\t\t\t\t{{ getCellValue(row, column.key) }}\r\n\t\t\t\t\t\t\t</slot>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\r\n\t\t\t<!-- Empty state -->\r\n\t\t\t<f-empty-state\r\n\t\t\t\tv-if=\"!loading && processedData.length === 0\"\r\n\t\t\t\t:icon=\"emptyIcon\"\r\n\t\t\t\t:title=\"emptyTitle\"\r\n\t\t\t\t:description=\"emptyDescription\"\r\n\t\t\t\t:action-label=\"emptyActionLabel\"\r\n\t\t\t\t@action=\"$emit('empty-action')\"\r\n\t\t\t/>\r\n\t\t</div>\r\n\r\n\t\t<!-- Footer section: Info and Pagination -->\r\n\t\t<div v-if=\"showFooter\" :class=\"footerClasses\">\r\n\t\t\t<div :class=\"infoClasses\">\r\n\t\t\t\t<span v-if=\"selectable && selectedItems.length > 0\">\r\n\t\t\t\t\t{{ selectedItems.length }} élément(s) sélectionné(s) sur\r\n\t\t\t\t\t{{ totalItems }}\r\n\t\t\t\t</span>\r\n\t\t\t\t<span v-else>\r\n\t\t\t\t\t{{ paginationInfo }}\r\n\t\t\t\t</span>\r\n\t\t\t</div>\r\n\t\t\t<f-pagination\r\n\t\t\t\tv-if=\"paginated && totalPages > 1\"\r\n\t\t\t\tv-model=\"internalPage\"\r\n\t\t\t\t:total-pages=\"totalPages\"\r\n\t\t\t\t:size=\"size\"\r\n\t\t\t\t:show-labels=\"false\"\r\n\t\t\t\t@change=\"handlePageChange\"\r\n\t\t\t/>\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\nimport FSearchBar from '../../molecules/FSearchBar/FSearchBar.vue';\r\nimport FPagination from '../../molecules/FPagination/FPagination.vue';\r\nimport FEmptyState from '../../molecules/FEmptyState/FEmptyState.vue';\r\nimport FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue';\r\nimport FIcon from '../../atoms/FIcon/FIcon.vue';\r\nimport FLoader from '../../atoms/FLoader/FLoader.vue';\r\n\r\nexport default {\r\n\tname: 'FDataTable',\r\n\tcomponents: {\r\n\t\tFSearchBar,\r\n\t\tFPagination,\r\n\t\tFEmptyState,\r\n\t\tFCheckbox,\r\n\t\tFIcon,\r\n\t\tFLoader\r\n\t},\r\n\tprops: {\r\n\t\t/**\r\n\t\t * Array of data objects to display\r\n\t\t */\r\n\t\tdata: {\r\n\t\t\ttype: Array,\r\n\t\t\tdefault: () => []\r\n\t\t},\r\n\t\t/**\r\n\t\t * Column definitions\r\n\t\t * Each column: { key: string, label: string, sortable?: boolean, align?: 'left'|'center'|'right' }\r\n\t\t */\r\n\t\tcolumns: {\r\n\t\t\ttype: Array,\r\n\t\t\trequired: true,\r\n\t\t\tvalidator: (columns) => columns.every((col) => col.key && col.label)\r\n\t\t},\r\n\t\t/**\r\n\t\t * Unique key property in data objects\r\n\t\t */\r\n\t\trowKey: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'id'\r\n\t\t},\r\n\t\t/**\r\n\t\t * Enable row selection with checkboxes\r\n\t\t */\r\n\t\tselectable: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t},\r\n\t\t/**\r\n\t\t * Selected row keys (v-model:selected)\r\n\t\t */\r\n\t\tselected: {\r\n\t\t\ttype: Array,\r\n\t\t\tdefault: () => []\r\n\t\t},\r\n\t\t/**\r\n\t\t * Enable search functionality\r\n\t\t */\r\n\t\tsearchable: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t},\r\n\t\t/**\r\n\t\t * Search input placeholder\r\n\t\t */\r\n\t\tsearchPlaceholder: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'Rechercher...'\r\n\t\t},\r\n\t\t/**\r\n\t\t * Enable pagination\r\n\t\t */\r\n\t\tpaginated: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: true\r\n\t\t},\r\n\t\t/**\r\n\t\t * Number of items per page\r\n\t\t */\r\n\t\tperPage: {\r\n\t\t\ttype: Number,\r\n\t\t\tdefault: 10\r\n\t\t},\r\n\t\t/**\r\n\t\t * Current page (v-model:page)\r\n\t\t */\r\n\t\tpage: {\r\n\t\t\ttype: Number,\r\n\t\t\tdefault: 1\r\n\t\t},\r\n\t\t/**\r\n\t\t * Total items count for server-side pagination\r\n\t\t */\r\n\t\ttotalItems: {\r\n\t\t\ttype: Number,\r\n\t\t\tdefault: null\r\n\t\t},\r\n\t\t/**\r\n\t\t * Server mode - data fetching is handled externally\r\n\t\t */\r\n\t\tserverMode: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t},\r\n\t\t/**\r\n\t\t * Loading state\r\n\t\t */\r\n\t\tloading: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t},\r\n\t\t/**\r\n\t\t * Default sort column key\r\n\t\t */\r\n\t\tdefaultSortKey: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: null\r\n\t\t},\r\n\t\t/**\r\n\t\t * Default sort direction\r\n\t\t */\r\n\t\tdefaultSortDirection: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'asc',\r\n\t\t\tvalidator: (value) => ['asc', 'desc'].includes(value)\r\n\t\t},\r\n\t\t/**\r\n\t\t * Component size\r\n\t\t */\r\n\t\tsize: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'medium',\r\n\t\t\tvalidator: (value) => ['small', 'medium', 'large'].includes(value)\r\n\t\t},\r\n\t\t/**\r\n\t\t * Empty state icon\r\n\t\t */\r\n\t\temptyIcon: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'folder'\r\n\t\t},\r\n\t\t/**\r\n\t\t * Empty state title\r\n\t\t */\r\n\t\temptyTitle: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: 'Aucune donnée'\r\n\t\t},\r\n\t\t/**\r\n\t\t * Empty state description\r\n\t\t */\r\n\t\temptyDescription: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: \"Il n'y a aucun élément à afficher.\"\r\n\t\t},\r\n\t\t/**\r\n\t\t * Empty state action button label\r\n\t\t */\r\n\t\temptyActionLabel: {\r\n\t\t\ttype: String,\r\n\t\t\tdefault: ''\r\n\t\t},\r\n\t\t/**\r\n\t\t * Striped row style\r\n\t\t */\r\n\t\tstriped: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t},\r\n\t\t/**\r\n\t\t * Hoverable rows\r\n\t\t */\r\n\t\thoverable: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: true\r\n\t\t},\r\n\t\t/**\r\n\t\t * Bordered table\r\n\t\t */\r\n\t\tbordered: {\r\n\t\t\ttype: Boolean,\r\n\t\t\tdefault: false\r\n\t\t}\r\n\t},\r\n\tdata() {\r\n\t\treturn {\r\n\t\t\tsearchQuery: '',\r\n\t\t\tsortKey: this.defaultSortKey,\r\n\t\t\tsortDirection: this.defaultSortDirection,\r\n\t\t\tinternalPage: this.page,\r\n\t\t\tselectedKeys: [...this.selected]\r\n\t\t};\r\n\t},\r\n\tcomputed: {\r\n\t\tcontainerClasses() {\r\n\t\t\treturn 'flex flex-col gap-4 bg-white rounded-lg';\r\n\t\t},\r\n\t\ttoolbarClasses() {\r\n\t\t\treturn 'flex items-center gap-4 flex-wrap';\r\n\t\t},\r\n\t\ttableWrapperClasses() {\r\n\t\t\tconst baseClasses = 'relative overflow-x-auto';\r\n\t\t\tconst borderClasses = this.bordered\r\n\t\t\t\t? 'border border-neutral-200 rounded-lg'\r\n\t\t\t\t: '';\r\n\t\t\treturn [baseClasses, borderClasses].filter(Boolean).join(' ');\r\n\t\t},\r\n\t\tloadingOverlayClasses() {\r\n\t\t\treturn 'absolute inset-0 bg-white/80 flex items-center justify-center z-10';\r\n\t\t},\r\n\t\ttableClasses() {\r\n\t\t\treturn 'w-full text-left';\r\n\t\t},\r\n\t\theaderCellClasses() {\r\n\t\t\tconst sizeClasses = {\r\n\t\t\t\tsmall: 'px-3 py-2 text-xs',\r\n\t\t\t\tmedium: 'px-4 py-3 text-sm',\r\n\t\t\t\tlarge: 'px-6 py-4 text-base'\r\n\t\t\t};\r\n\t\t\treturn [\r\n\t\t\t\t'font-semibold text-neutral-700 bg-neutral-50 border-b border-neutral-200',\r\n\t\t\t\tsizeClasses[this.size]\r\n\t\t\t].join(' ');\r\n\t\t},\r\n\t\tcellClasses() {\r\n\t\t\tconst sizeClasses = {\r\n\t\t\t\tsmall: 'px-3 py-2 text-xs',\r\n\t\t\t\tmedium: 'px-4 py-3 text-sm',\r\n\t\t\t\tlarge: 'px-6 py-4 text-base'\r\n\t\t\t};\r\n\t\t\treturn [\r\n\t\t\t\t'text-neutral-600 border-b border-neutral-100',\r\n\t\t\t\tsizeClasses[this.size]\r\n\t\t\t].join(' ');\r\n\t\t},\r\n\t\tfooterClasses() {\r\n\t\t\treturn 'flex items-center justify-between gap-4 flex-wrap';\r\n\t\t},\r\n\t\tinfoClasses() {\r\n\t\t\tconst sizeClasses = {\r\n\t\t\t\tsmall: 'text-xs',\r\n\t\t\t\tmedium: 'text-sm',\r\n\t\t\t\tlarge: 'text-base'\r\n\t\t\t};\r\n\t\t\treturn ['text-neutral-500', sizeClasses[this.size]].join(' ');\r\n\t\t},\r\n\t\tshowToolbar() {\r\n\t\t\treturn this.searchable || this.$slots.actions;\r\n\t\t},\r\n\t\tshowFooter() {\r\n\t\t\treturn this.paginated || this.selectable;\r\n\t\t},\r\n\t\t// Filter data based on search query (client-side only)\r\n\t\tfilteredData() {\r\n\t\t\tif (this.serverMode || !this.searchQuery) {\r\n\t\t\t\treturn this.data;\r\n\t\t\t}\r\n\t\t\tconst query = this.searchQuery.toLowerCase();\r\n\t\t\treturn this.data.filter((row) => {\r\n\t\t\t\treturn this.columns.some((column) => {\r\n\t\t\t\t\tconst value = this.getCellValue(row, column.key);\r\n\t\t\t\t\treturn String(value).toLowerCase().includes(query);\r\n\t\t\t\t});\r\n\t\t\t});\r\n\t\t},\r\n\t\t// Sort filtered data (client-side only)\r\n\t\tsortedData() {\r\n\t\t\tif (this.serverMode || !this.sortKey) {\r\n\t\t\t\treturn this.filteredData;\r\n\t\t\t}\r\n\t\t\treturn [...this.filteredData].sort((a, b) => {\r\n\t\t\t\tconst aValue = this.getCellValue(a, this.sortKey);\r\n\t\t\t\tconst bValue = this.getCellValue(b, this.sortKey);\r\n\r\n\t\t\t\tlet comparison = 0;\r\n\t\t\t\tif (aValue === null || aValue === undefined) comparison = 1;\r\n\t\t\t\telse if (bValue === null || bValue === undefined) comparison = -1;\r\n\t\t\t\telse if (typeof aValue === 'string') {\r\n\t\t\t\t\tcomparison = aValue.localeCompare(bValue);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tcomparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;\r\n\t\t\t\t}\r\n\r\n\t\t\t\treturn this.sortDirection === 'desc' ? -comparison : comparison;\r\n\t\t\t});\r\n\t\t},\r\n\t\t// Processed data after filtering and sorting\r\n\t\tprocessedData() {\r\n\t\t\treturn this.sortedData;\r\n\t\t},\r\n\t\t// Calculate total items for pagination\r\n\t\tcomputedTotalItems() {\r\n\t\t\tif (this.serverMode && this.totalItems !== null) {\r\n\t\t\t\treturn this.totalItems;\r\n\t\t\t}\r\n\t\t\treturn this.processedData.length;\r\n\t\t},\r\n\t\t// Total pages\r\n\t\ttotalPages() {\r\n\t\t\tif (!this.paginated) return 1;\r\n\t\t\treturn Math.max(1, Math.ceil(this.computedTotalItems / this.perPage));\r\n\t\t},\r\n\t\t// Data for current page (client-side pagination only)\r\n\t\tpaginatedData() {\r\n\t\t\tif (this.serverMode || !this.paginated) {\r\n\t\t\t\treturn this.processedData;\r\n\t\t\t}\r\n\t\t\tconst start = (this.internalPage - 1) * this.perPage;\r\n\t\t\tconst end = start + this.perPage;\r\n\t\t\treturn this.processedData.slice(start, end);\r\n\t\t},\r\n\t\t// Pagination info text\r\n\t\tpaginationInfo() {\r\n\t\t\tif (!this.paginated) {\r\n\t\t\t\treturn `${this.computedTotalItems} élément(s)`;\r\n\t\t\t}\r\n\t\t\tconst start = Math.min(\r\n\t\t\t\t(this.internalPage - 1) * this.perPage + 1,\r\n\t\t\t\tthis.computedTotalItems\r\n\t\t\t);\r\n\t\t\tconst end = Math.min(\r\n\t\t\t\tthis.internalPage * this.perPage,\r\n\t\t\t\tthis.computedTotalItems\r\n\t\t\t);\r\n\t\t\treturn `${start} - ${end} sur ${this.computedTotalItems}`;\r\n\t\t},\r\n\t\t// Set for efficient key lookups\r\n\t\tselectedKeysSet() {\r\n\t\t\treturn new Set(this.selectedKeys);\r\n\t\t},\r\n\t\t// Selection state\r\n\t\tselectedItems() {\r\n\t\t\treturn this.data.filter((row) =>\r\n\t\t\t\tthis.selectedKeysSet.has(this.getRowKey(row))\r\n\t\t\t);\r\n\t\t},\r\n\t\tisAllSelected() {\r\n\t\t\tif (this.paginatedData.length === 0) return false;\r\n\t\t\treturn this.paginatedData.every((row) => this.isRowSelected(row));\r\n\t\t}\r\n\t},\r\n\twatch: {\r\n\t\tpage: {\r\n\t\t\thandler(newVal) {\r\n\t\t\t\tthis.internalPage = newVal;\r\n\t\t\t},\r\n\t\t\timmediate: true\r\n\t\t},\r\n\t\tinternalPage(newVal) {\r\n\t\t\tthis.$emit('update:page', newVal);\r\n\t\t},\r\n\t\tselected: {\r\n\t\t\thandler(newVal) {\r\n\t\t\t\tthis.selectedKeys = [...newVal];\r\n\t\t\t},\r\n\t\t\tdeep: true,\r\n\t\t\timmediate: true\r\n\t\t},\r\n\t\tselectedKeys: {\r\n\t\t\thandler(newVal) {\r\n\t\t\t\tthis.$emit('update:selected', newVal);\r\n\t\t\t},\r\n\t\t\tdeep: true\r\n\t\t},\r\n\t\tsearchQuery() {\r\n\t\t\t// Reset to first page when search changes\r\n\t\t\tif (!this.serverMode) {\r\n\t\t\t\tthis.internalPage = 1;\r\n\t\t\t}\r\n\t\t}\r\n\t},\r\n\tmethods: {\r\n\t\tgetCellValue(row, key) {\r\n\t\t\t// Support nested keys like 'user.name'\r\n\t\t\treturn key.split('.').reduce((obj, k) => obj?.[k], row);\r\n\t\t},\r\n\t\tgetRowKey(row, index) {\r\n\t\t\treturn row[this.rowKey] ?? index;\r\n\t\t},\r\n\t\tgetHeaderCellClasses(column) {\r\n\t\t\tconst alignClasses = {\r\n\t\t\t\tleft: 'text-left',\r\n\t\t\t\tcenter: 'text-center',\r\n\t\t\t\tright: 'text-right'\r\n\t\t\t};\r\n\t\t\tconst sortableClasses =\r\n\t\t\t\tcolumn.sortable !== false\r\n\t\t\t\t\t? 'cursor-pointer select-none hover:bg-neutral-100'\r\n\t\t\t\t\t: '';\r\n\t\t\treturn [\r\n\t\t\t\tthis.headerCellClasses,\r\n\t\t\t\talignClasses[column.align] || 'text-left',\r\n\t\t\t\tsortableClasses\r\n\t\t\t]\r\n\t\t\t\t.filter(Boolean)\r\n\t\t\t\t.join(' ');\r\n\t\t},\r\n\t\tgetCellClasses(column) {\r\n\t\t\tconst alignClasses = {\r\n\t\t\t\tleft: 'text-left',\r\n\t\t\t\tcenter: 'text-center',\r\n\t\t\t\tright: 'text-right'\r\n\t\t\t};\r\n\t\t\treturn [this.cellClasses, alignClasses[column.align] || 'text-left'].join(\r\n\t\t\t\t' '\r\n\t\t\t);\r\n\t\t},\r\n\t\tgetRowClasses(row) {\r\n\t\t\tconst baseClasses = 'transition-colors duration-150';\r\n\t\t\tconst hoverClasses = this.hoverable ? 'hover:bg-neutral-50' : '';\r\n\t\t\tconst selectedClasses = this.isRowSelected(row) ? 'bg-primary-50' : '';\r\n\t\t\tconst stripedClasses = this.striped ? 'even:bg-neutral-50/50' : '';\r\n\t\t\treturn [baseClasses, hoverClasses, selectedClasses, stripedClasses]\r\n\t\t\t\t.filter(Boolean)\r\n\t\t\t\t.join(' ');\r\n\t\t},\r\n\t\tgetSortIcon(key) {\r\n\t\t\tif (this.sortKey !== key) return 'chevron-down';\r\n\t\t\treturn this.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';\r\n\t\t},\r\n\t\tgetSortIconClasses(key) {\r\n\t\t\tconst isActive = this.sortKey === key;\r\n\t\t\treturn isActive ? 'text-primary-500' : 'text-neutral-400';\r\n\t\t},\r\n\t\thandleSort(key) {\r\n\t\t\tif (this.sortKey === key) {\r\n\t\t\t\tthis.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';\r\n\t\t\t} else {\r\n\t\t\t\tthis.sortKey = key;\r\n\t\t\t\tthis.sortDirection = 'asc';\r\n\t\t\t}\r\n\t\t\tthis.$emit('sort', { key: this.sortKey, direction: this.sortDirection });\r\n\t\t},\r\n\t\thandleSearch(query) {\r\n\t\t\tthis.$emit('search', query);\r\n\t\t},\r\n\t\thandlePageChange(page) {\r\n\t\t\tthis.$emit('page-change', page);\r\n\t\t},\r\n\t\thandleRowClick(row) {\r\n\t\t\tthis.$emit('row-click', row);\r\n\t\t},\r\n\t\tisRowSelected(row) {\r\n\t\t\treturn this.selectedKeysSet.has(this.getRowKey(row));\r\n\t\t},\r\n\t\thandleRowSelect(row, checked) {\r\n\t\t\tconst key = this.getRowKey(row);\r\n\t\t\tif (checked) {\r\n\t\t\t\tif (!this.selectedKeysSet.has(key)) {\r\n\t\t\t\t\tthis.selectedKeys = [...this.selectedKeys, key];\r\n\t\t\t\t}\r\n\t\t\t} else {\r\n\t\t\t\tthis.selectedKeys = this.selectedKeys.filter((k) => k !== key);\r\n\t\t\t}\r\n\t\t\tthis.$emit('select', { row, selected: checked });\r\n\t\t},\r\n\t\thandleSelectAll(checked) {\r\n\t\t\tif (checked) {\r\n\t\t\t\tconst currentKeys = this.paginatedData.map((row) =>\r\n\t\t\t\t\tthis.getRowKey(row)\r\n\t\t\t\t);\r\n\t\t\t\tconst newKeys = currentKeys.filter(\r\n\t\t\t\t\t(k) => !this.selectedKeys.includes(k)\r\n\t\t\t\t);\r\n\t\t\t\tthis.selectedKeys = [...this.selectedKeys, ...newKeys];\r\n\t\t\t} else {\r\n\t\t\t\tconst currentKeys = this.paginatedData.map((row) =>\r\n\t\t\t\t\tthis.getRowKey(row)\r\n\t\t\t\t);\r\n\t\t\t\tthis.selectedKeys = this.selectedKeys.filter(\r\n\t\t\t\t\t(k) => !currentKeys.includes(k)\r\n\t\t\t\t);\r\n\t\t\t}\r\n\t\t\tthis.$emit('select-all', checked);\r\n\t\t},\r\n\t\tclearSelection() {\r\n\t\t\tthis.selectedKeys = [];\r\n\t\t}\r\n\t}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n/* Mobile Card View - transforms table rows into cards on small screens */\r\n@media (max-width: 640px) {\r\n\t/* Hide table header on mobile */\r\n\ttable thead {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t/* Make table body a flex container for cards */\r\n\ttable tbody {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tgap: 0.75rem;\r\n\t}\r\n\r\n\t/* Transform each row into a card */\r\n\ttable tbody tr {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tbackground-color: white;\r\n\t\tborder: 1px solid var(--color-neutral-200, #e5e7eb);\r\n\t\tborder-radius: 0.5rem;\r\n\t\tpadding: 0.75rem;\r\n\t\tbox-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\r\n\t}\r\n\r\n\t/* Style each cell as a row in the card */\r\n\ttable tbody tr td {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: space-between;\r\n\t\talign-items: flex-start;\r\n\t\tpadding: 0.5rem 0;\r\n\t\tborder-bottom: 1px solid var(--color-neutral-100, #f3f4f6);\r\n\t\ttext-align: right;\r\n\t}\r\n\r\n\t/* Remove border from last cell */\r\n\ttable tbody tr td:last-child {\r\n\t\tborder-bottom: none;\r\n\t}\r\n\r\n\t/* Display column label before cell content */\r\n\ttable tbody tr td::before {\r\n\t\tcontent: attr(data-label);\r\n\t\tfont-weight: 600;\r\n\t\tcolor: var(--color-neutral-700, #374151);\r\n\t\ttext-align: left;\r\n\t\tflex-shrink: 0;\r\n\t\tmargin-right: 1rem;\r\n\t}\r\n\r\n\t/* Hide empty labels (for checkbox column) */\r\n\ttable tbody tr td[data-label='']::before {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t/* Checkbox cell styling */\r\n\ttable tbody tr td[data-label=''] {\r\n\t\tjustify-content: flex-start;\r\n\t\tborder-bottom: 1px solid var(--color-neutral-200, #e5e7eb);\r\n\t\tmargin-bottom: 0.25rem;\r\n\t\tpadding-bottom: 0.75rem;\r\n\t}\r\n\r\n\t/* Ensure table is full width */\r\n\ttable {\r\n\t\twidth: 100%;\r\n\t}\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-15bfab2f";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter$1 = 0;

/**
 * File state constants
 */
const FILE_STATUS = {
	PENDING: 'pending',
	UPLOADING: 'uploading',
	SUCCESS: 'success',
	ERROR: 'error'
};

var script$6 = {
	name: 'FFileUpload',
	components: {
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m,
		FButton: __vue_component__$v,
		FAlert: __vue_component__$l,
		FFilePreview: __vue_component__$g
	},
	props: {
		/**
		 * Array of files (for v-model support)
		 * Each file object should have: { id, name, file, status, progress }
		 */
		value: {
			type: Array,
			default: () => []
		},
		/**
		 * Accepted file types (MIME types or extensions)
		 * Example: 'image/*,.pdf,.doc,.docx'
		 */
		accept: {
			type: String,
			default: ''
		},
		/**
		 * Allow multiple file selection
		 */
		multiple: {
			type: Boolean,
			default: false
		},
		/**
		 * Maximum file size in bytes
		 */
		maxSize: {
			type: Number,
			default: 0
		},
		/**
		 * Maximum number of files allowed
		 */
		maxFiles: {
			type: Number,
			default: 0
		},
		/**
		 * Disable the upload component
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Show the upload button inside the drop zone
		 */
		showButton: {
			type: Boolean,
			default: true
		},
		/**
		 * Show progress bar during upload
		 */
		showProgress: {
			type: Boolean,
			default: true
		},
		/**
		 * Label for the drop zone
		 */
		dropZoneLabel: {
			type: String,
			default: 'Glissez-déposez vos fichiers ici'
		},
		/**
		 * Label for the upload button
		 */
		buttonLabel: {
			type: String,
			default: 'Parcourir'
		},
		/**
		 * Hint text displayed below the drop zone label
		 */
		hint: {
			type: String,
			default: ''
		},
		/**
		 * Loading label for file preview
		 */
		loadingLabel: {
			type: String,
			default: 'Téléversement en cours'
		},
		/**
		 * Progress label shown during upload
		 */
		progressLabel: {
			type: String,
			default: 'Progression'
		},
		/**
		 * Error message for file size validation
		 */
		errorSizeMessage: {
			type: String,
			default: 'Le fichier dépasse la taille maximale autorisée'
		},
		/**
		 * Error message for file type validation
		 */
		errorTypeMessage: {
			type: String,
			default: "Ce type de fichier n'est pas autorisé"
		},
		/**
		 * Error message for max files validation
		 */
		errorMaxFilesMessage: {
			type: String,
			default: 'Nombre maximum de fichiers atteint'
		},
		/**
		 * Success message after upload
		 */
		successMessage: {
			type: String,
			default: 'Fichier(s) téléversé(s) avec succès'
		}
	},
	data() {
		return {
			isDragging: false,
			alertMessage: '',
			alertVariant: 'info',
			uploadProgress: 0
		};
	},
	computed: {
		/**
		 * Internal files list synced with v-model
		 */
		internalFiles: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Check if there are files
		 */
		hasFiles() {
			return this.internalFiles.length > 0;
		},
		/**
		 * Check if any file is currently uploading
		 */
		isUploading() {
			return this.internalFiles.some((f) => f.status === FILE_STATUS.UPLOADING);
		},
		/**
		 * Container classes
		 */
		containerClasses() {
			return 'w-full';
		},
		/**
		 * Drop zone classes
		 */
		dropZoneClasses() {
			const baseClasses =
				'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200';
			const stateClasses = this.isDragging
				? 'border-primary-500 bg-primary-50'
				: 'border-neutral-300 hover:border-neutral-400 bg-neutral-50';
			const disabledClasses = this.disabled
				? 'opacity-50 cursor-not-allowed pointer-events-none'
				: '';

			return [baseClasses, stateClasses, disabledClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Icon classes
		 */
		iconClasses() {
			return this.isDragging ? 'text-primary-500' : 'text-neutral-400';
		},
		/**
		 * Text classes
		 */
		textClasses() {
			return this.isDragging ? 'text-primary-600' : 'text-neutral-600';
		}
	},
	methods: {
		/**
		 * Trigger the hidden file input
		 */
		triggerFileInput() {
			if (!this.disabled) {
				this.$refs.fileInput.click();
			}
		},
		/**
		 * Handle file input change
		 */
		handleFileChange(event) {
			const files = Array.from(event.target.files);
			this.processFiles(files);
			// Reset input to allow selecting the same file again
			event.target.value = '';
		},
		/**
		 * Handle drag enter event
		 */
		handleDragEnter(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = true;
			}
		},
		/**
		 * Handle drag over event
		 */
		handleDragOver(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = true;
			}
		},
		/**
		 * Handle drag leave event
		 */
		handleDragLeave(event) {
			if (!this.disabled) {
				event.preventDefault();
				this.isDragging = false;
			}
		},
		/**
		 * Handle drop event
		 */
		handleDrop(event) {
			if (!this.disabled) {
				this.isDragging = false;
				const files = Array.from(event.dataTransfer.files);
				this.processFiles(files);
			}
		},
		/**
		 * Process and validate files
		 */
		processFiles(files) {
			this.clearAlert();

			// Handle empty files array
			if (!files || files.length === 0) {
				return;
			}

			// If not multiple, only take the first file
			const filesToProcess = this.multiple ? files : [files[0]];

			// Check max files limit (only for multiple mode)
			if (this.multiple && this.maxFiles > 0) {
				const totalFiles = this.internalFiles.length + filesToProcess.length;
				if (totalFiles > this.maxFiles) {
					this.showError(this.errorMaxFilesMessage);
					return;
				}
			}

			const validFiles = [];
			for (const file of filesToProcess) {
				const validation = this.validateFile(file);
				if (!validation.valid) {
					this.showError(validation.error);
					return;
				}

				const fileObject = this.createFileObject(file);
				validFiles.push(fileObject);
			}

			// If not multiple, replace existing files
			if (!this.multiple) {
				this.internalFiles = validFiles;
			} else {
				this.internalFiles = [...this.internalFiles, ...validFiles];
			}

			// Emit files-selected event
			this.$emit('files-selected', validFiles);
		},
		/**
		 * Validate a single file
		 */
		validateFile(file) {
			// Validate file type
			if (this.accept) {
				const isValid = this.isFileTypeValid(file);
				if (!isValid) {
					return { valid: false, error: this.errorTypeMessage };
				}
			}

			// Validate file size
			if (this.maxSize > 0 && file.size > this.maxSize) {
				return { valid: false, error: this.errorSizeMessage };
			}

			return { valid: true };
		},
		/**
		 * Check if file type is valid based on accept attribute
		 */
		isFileTypeValid(file) {
			const acceptedTypes = this.accept.split(',').map((t) => t.trim());

			return acceptedTypes.some((acceptedType) => {
				if (acceptedType.startsWith('.')) {
					// Extension check
					const ext = '.' + file.name.split('.').pop().toLowerCase();
					return ext === acceptedType.toLowerCase();
				} else if (acceptedType.endsWith('/*')) {
					// MIME type wildcard (e.g., image/*)
					const baseType = acceptedType.replace('/*', '');
					return file.type.startsWith(baseType);
				} else {
					// Exact MIME type match
					return file.type === acceptedType;
				}
			});
		},
		/**
		 * Create a file object for internal tracking
		 */
		createFileObject(file) {
			const extension = file.name.split('.').pop().toLowerCase();
			return {
				id: `file-${++idCounter$1}`,
				name: file.name,
				size: file.size,
				type: file.type,
				extension,
				file,
				status: FILE_STATUS.PENDING,
				progress: 0
			};
		},
		/**
		 * Remove a file from the list
		 */
		handleRemoveFile(fileToRemove) {
			this.internalFiles = this.internalFiles.filter(
				(f) => f.id !== fileToRemove.id
			);
			this.$emit('file-removed', fileToRemove);
		},
		/**
		 * Show error message
		 */
		showError(message) {
			this.alertMessage = message;
			this.alertVariant = 'error';
		},
		/**
		 * Show success message
		 */
		showSuccess(message) {
			this.alertMessage = message || this.successMessage;
			this.alertVariant = 'success';
		},
		/**
		 * Clear alert message
		 */
		clearAlert() {
			this.alertMessage = '';
		},
		/**
		 * Start upload for a specific file (to be called externally)
		 */
		startUpload(fileId) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.UPLOADING;
				file.progress = 0;
				this.updateFile(file);
				this.$emit('upload-start', file);
			}
		},
		/**
		 * Update upload progress for a specific file
		 */
		updateProgress(fileId, progress) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.progress = progress;
				this.updateFile(file);
				this.$emit('upload-progress', { file, progress });

				// Update overall progress
				this.calculateOverallProgress();
			}
		},
		/**
		 * Mark file as successfully uploaded
		 */
		markAsSuccess(fileId) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.SUCCESS;
				file.progress = 100;
				this.updateFile(file);
				this.$emit('upload-success', file);

				// Check if all files are done
				if (this.internalFiles.every((f) => f.status === FILE_STATUS.SUCCESS)) {
					this.showSuccess();
					this.$emit('upload-complete', this.internalFiles);
				}
			}
		},
		/**
		 * Mark file as failed
		 */
		markAsError(fileId, errorMessage) {
			const file = this.internalFiles.find((f) => f.id === fileId);
			if (file) {
				file.status = FILE_STATUS.ERROR;
				this.updateFile(file);
				this.showError(errorMessage);
				this.$emit('upload-error', { file, error: errorMessage });
			}
		},
		/**
		 * Update a file in the internal list
		 */
		updateFile(updatedFile) {
			const index = this.internalFiles.findIndex(
				(f) => f.id === updatedFile.id
			);
			if (index !== -1) {
				const newFiles = [...this.internalFiles];
				newFiles[index] = { ...updatedFile };
				this.internalFiles = newFiles;
			}
		},
		/**
		 * Calculate overall upload progress
		 */
		calculateOverallProgress() {
			if (!this.hasFiles) {
				this.uploadProgress = 0;
				return;
			}

			const uploadingFiles = this.internalFiles.filter(
				(f) =>
					f.status === FILE_STATUS.UPLOADING || f.status === FILE_STATUS.SUCCESS
			);

			if (uploadingFiles.length === 0) {
				this.uploadProgress = 0;
				return;
			}

			const totalProgress = uploadingFiles.reduce(
				(sum, f) => sum + f.progress,
				0
			);
			this.uploadProgress = Math.round(totalProgress / uploadingFiles.length);
		},
		/**
		 * Clear all files
		 */
		clearFiles() {
			this.internalFiles = [];
			this.clearAlert();
			this.uploadProgress = 0;
			this.$emit('files-cleared');
		},
		/**
		 * Get all pending files (ready for upload)
		 */
		getPendingFiles() {
			return this.internalFiles.filter((f) => f.status === FILE_STATUS.PENDING);
		},
		/**
		 * Start upload for all pending files
		 */
		uploadAll() {
			const pendingFiles = this.getPendingFiles();
			pendingFiles.forEach((file) => {
				this.startUpload(file.id);
			});
			this.$emit('upload-all', pendingFiles);
		}
	}
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$8 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.containerClasses },
    [
      _c("input", {
        ref: "fileInput",
        staticClass: "sr-only",
        attrs: {
          type: "file",
          accept: _vm.accept,
          multiple: _vm.multiple,
          disabled: _vm.disabled,
        },
        on: { change: _vm.handleFileChange },
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          class: _vm.dropZoneClasses,
          on: {
            click: _vm.triggerFileInput,
            dragenter: function ($event) {
              $event.preventDefault();
              return _vm.handleDragEnter.apply(null, arguments)
            },
            dragover: function ($event) {
              $event.preventDefault();
              return _vm.handleDragOver.apply(null, arguments)
            },
            dragleave: function ($event) {
              $event.preventDefault();
              return _vm.handleDragLeave.apply(null, arguments)
            },
            drop: function ($event) {
              $event.preventDefault();
              return _vm.handleDrop.apply(null, arguments)
            },
          },
        },
        [
          _c("f-icon", {
            class: _vm.iconClasses,
            attrs: { name: "upload", size: "lg" },
          }),
          _vm._v(" "),
          _c(
            "f-typography",
            { class: _vm.textClasses, attrs: { variant: "body" } },
            [
              _vm._t("label", function () {
                return [
                  _vm._v("\n\t\t\t\t" + _vm._s(_vm.dropZoneLabel) + "\n\t\t\t"),
                ]
              }),
            ],
            2
          ),
          _vm._v(" "),
          _vm.hint
            ? _c(
                "f-typography",
                {
                  staticClass: "text-neutral-500",
                  attrs: { variant: "caption" },
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.hint) + "\n\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.showButton
            ? _c(
                "f-button",
                {
                  staticClass: "mt-2",
                  attrs: {
                    variant: "outline",
                    size: "small",
                    disabled: _vm.disabled,
                  },
                  on: {
                    click: function ($event) {
                      $event.stopPropagation();
                      return _vm.triggerFileInput.apply(null, arguments)
                    },
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "iconLeft",
                        fn: function () {
                          return [
                            _c("f-icon", {
                              attrs: { name: "upload", size: "sm" },
                            }),
                          ]
                        },
                        proxy: true,
                      },
                    ],
                    null,
                    false,
                    1010297021
                  ),
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.buttonLabel) + "\n\t\t")]
              )
            : _vm._e(),
        ],
        1
      ),
      _vm._v(" "),
      _vm.alertMessage
        ? _c("f-alert", {
            staticClass: "mt-3",
            attrs: {
              variant: _vm.alertVariant,
              message: _vm.alertMessage,
              closable: true,
            },
            on: { close: _vm.clearAlert },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.hasFiles
        ? _c(
            "div",
            { staticClass: "mt-3 space-y-2" },
            _vm._l(_vm.internalFiles, function (file) {
              return _c("f-file-preview", {
                key: file.id,
                attrs: {
                  "file-name": file.name,
                  "file-type": file.extension,
                  loading: file.status === "uploading",
                  disabled: _vm.disabled || file.status === "uploading",
                  "loading-label": _vm.loadingLabel,
                },
                on: {
                  remove: function ($event) {
                    return _vm.handleRemoveFile(file)
                  },
                },
              })
            }),
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showProgress && _vm.isUploading
        ? _c("div", { staticClass: "mt-3" }, [
            _c(
              "div",
              { staticClass: "flex items-center justify-between mb-1" },
              [
                _c(
                  "f-typography",
                  {
                    staticClass: "text-neutral-600",
                    attrs: { variant: "caption" },
                  },
                  [
                    _vm._v(
                      "\n\t\t\t\t" + _vm._s(_vm.progressLabel) + "\n\t\t\t"
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "f-typography",
                  {
                    staticClass: "text-neutral-600",
                    attrs: { variant: "caption" },
                  },
                  [
                    _vm._v(
                      "\n\t\t\t\t" + _vm._s(_vm.uploadProgress) + "%\n\t\t\t"
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "w-full bg-neutral-200 rounded-full h-2" },
              [
                _c("div", {
                  staticClass:
                    "bg-primary-600 h-2 rounded-full transition-all duration-300",
                  style: { width: _vm.uploadProgress + "%" },
                }),
              ]
            ),
          ])
        : _vm._e(),
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$7 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "aside",
    {
      class: _vm.sidebarClasses,
      style: _vm.getSidebarStyle(),
      attrs: {
        "aria-hidden": !_vm.isOpen,
        role: "complementary",
        "aria-label": "Barre latérale de filtres",
      },
    },
    [
      _vm.isMobile && _vm.isOpen
        ? _c("div", {
            staticClass: "fixed inset-0 bg-black bg-opacity-50 z-40",
            on: { click: _vm.closeSidebar },
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.contentClasses },
        [
          _c(
            "div",
            {
              staticClass:
                "flex items-center justify-between p-4 border-b border-neutral-200",
            },
            [
              _c("f-typography", { attrs: { variant: "h5" } }, [
                _vm._v("\n\t\t\t\t" + _vm._s(_vm.title) + "\n\t\t\t"),
              ]),
              _vm._v(" "),
              _vm.closable
                ? _c(
                    "f-button",
                    {
                      attrs: { variant: "ghost", size: "small" },
                      on: { click: _vm.closeSidebar },
                    },
                    [
                      _c("f-icon", { attrs: { name: "close", size: "sm" } }),
                      _vm._v(" "),
                      _c("span", { staticClass: "sr-only" }, [
                        _vm._v("Fermer les filtres"),
                      ]),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "f-form",
            {
              staticClass: "flex-1 overflow-y-auto",
              on: { submit: _vm.handleSubmit },
              scopedSlots: _vm._u([
                {
                  key: "actions",
                  fn: function () {
                    return [
                      _c(
                        "div",
                        {
                          staticClass:
                            "p-4 border-t border-neutral-200 space-y-2",
                        },
                        [
                          _c(
                            "f-button",
                            {
                              attrs: {
                                type: "submit",
                                variant: "primary",
                                block: "",
                              },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\t" +
                                  _vm._s(_vm.applyLabel) +
                                  "\n\t\t\t\t\t"
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "f-button",
                            {
                              attrs: {
                                type: "button",
                                variant: "outline",
                                block: "",
                              },
                              on: { click: _vm.handleReset },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\t" +
                                  _vm._s(_vm.resetLabel) +
                                  "\n\t\t\t\t\t"
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]
                  },
                  proxy: true,
                },
              ]),
            },
            [
              _c(
                "div",
                { staticClass: "p-4 space-y-4" },
                [
                  _vm._t("default", function () {
                    return _vm._l(_vm.filterGroups, function (group, index) {
                      return _c(
                        "f-accordion-item",
                        {
                          key: group.id || index,
                          attrs: {
                            title: group.title,
                            "default-open": group.defaultOpen !== false,
                          },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "space-y-3" },
                            [
                              group.type === "checkbox"
                                ? _vm._l(group.options, function (option) {
                                    return _c("f-checkbox", {
                                      key: option.value,
                                      attrs: {
                                        label: option.label,
                                        checked: _vm.isChecked(
                                          group.name,
                                          option.value
                                        ),
                                        disabled: option.disabled,
                                      },
                                      on: {
                                        change: function ($event) {
                                          return _vm.handleCheckboxChange(
                                            group.name,
                                            option.value,
                                            $event
                                          )
                                        },
                                      },
                                    })
                                  })
                                : group.type === "radio"
                                ? _vm._l(group.options, function (option) {
                                    return _c("f-radio", {
                                      key: option.value,
                                      attrs: {
                                        label: option.label,
                                        value: option.value,
                                        name: group.name,
                                        "model-value": _vm.getFilterValue(
                                          group.name
                                        ),
                                        disabled: option.disabled,
                                      },
                                      on: {
                                        change: function ($event) {
                                          return _vm.handleRadioChange(
                                            group.name,
                                            $event
                                          )
                                        },
                                      },
                                    })
                                  })
                                : group.type === "toggle"
                                ? _vm._l(group.options, function (option) {
                                    return _c("f-toggle", {
                                      key: option.value,
                                      attrs: {
                                        label: option.label,
                                        value: _vm.getToggleValue(
                                          group.name,
                                          option.value
                                        ),
                                        disabled: option.disabled,
                                      },
                                      on: {
                                        input: function ($event) {
                                          return _vm.handleToggleChange(
                                            group.name,
                                            option.value,
                                            $event
                                          )
                                        },
                                      },
                                    })
                                  })
                                : group.type === "text"
                                ? _vm._l(group.options, function (option) {
                                    return _c("f-form-field", {
                                      key: option.value,
                                      attrs: {
                                        label: option.label,
                                        placeholder: option.placeholder,
                                        value: _vm.getFilterValue(
                                          group.name + "." + option.value
                                        ),
                                      },
                                      on: {
                                        input: function ($event) {
                                          return _vm.handleInputChange(
                                            group.name,
                                            option.value,
                                            $event
                                          )
                                        },
                                      },
                                    })
                                  })
                                : _vm._e(),
                            ],
                            2
                          ),
                        ]
                      )
                    })
                  }),
                ],
                2
              ),
            ]
          ),
        ],
        1
      ),
    ]
  )
};
__vue_render__$7._withStripped = true;

/* script */

/* template */
var __vue_render__$6 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "aside",
    {
      class: _vm.sidebarClasses,
      style: _vm.sidebarStyle,
      attrs: { role: "navigation", "aria-label": "Navigation principale" },
    },
    [
      _c(
        "div",
        { class: _vm.brandingClasses },
        [
          _vm._t("branding", function () {
            return [
              _c(
                "div",
                { staticClass: "flex items-center gap-3" },
                [
                  _vm._t("logo"),
                  _vm._v(" "),
                  _vm.title && !_vm.collapsed
                    ? _c(
                        "f-typography",
                        {
                          staticClass: "transition-opacity duration-200",
                          attrs: { variant: "h6" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t" + _vm._s(_vm.title) + "\n\t\t\t\t"
                          ),
                        ]
                      )
                    : _vm._e(),
                ],
                2
              ),
            ]
          }),
          _vm._v(" "),
          _vm.collapsible
            ? _c(
                "f-button",
                {
                  attrs: {
                    variant: "ghost",
                    size: "small",
                    "aria-label": _vm.collapsed
                      ? "Développer la navigation"
                      : "Réduire la navigation",
                  },
                  on: { click: _vm.toggleCollapsed },
                },
                [
                  _c("f-icon", {
                    attrs: {
                      name: _vm.collapsed ? "chevron-right" : "chevron-left",
                      size: "sm",
                    },
                  }),
                ],
                1
              )
            : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "nav",
        { staticClass: "flex-1 overflow-y-auto py-2" },
        [
          _vm._l(_vm.navigationItems, function (item, index) {
            return [
              item.type === "group"
                ? _c(
                    "div",
                    { key: "nav-group-" + index, class: _vm.groupLabelClasses },
                    [
                      !_vm.collapsed
                        ? _c(
                            "f-typography",
                            {
                              staticClass: "text-neutral-500",
                              attrs: { variant: "overline" },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(item.label) +
                                  "\n\t\t\t\t"
                              ),
                            ]
                          )
                        : _c("f-divider", { attrs: { margin: "sm" } }),
                    ],
                    1
                  )
                : item.type === "divider"
                ? _c("f-divider", {
                    key: "nav-divider-" + index,
                    attrs: { margin: "sm" },
                  })
                : item.children && item.children.length > 0
                ? _c(
                    "div",
                    { key: "nav-submenu-" + index, staticClass: "nav-submenu" },
                    [
                      _c(
                        "button",
                        {
                          class: _vm.getNavItemClasses(item, true),
                          attrs: {
                            "aria-expanded": String(_vm.isSubmenuOpen(item)),
                          },
                          on: {
                            click: function ($event) {
                              return _vm.toggleSubmenu(item)
                            },
                          },
                        },
                        [
                          _c(
                            "span",
                            {
                              staticClass:
                                "flex items-center gap-3 flex-1 min-w-0",
                            },
                            [
                              item.icon
                                ? _c("f-icon", {
                                    class: _vm.getIconClasses(item),
                                    attrs: { name: item.icon, size: "md" },
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              !_vm.collapsed
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "truncate transition-opacity duration-200",
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t" +
                                          _vm._s(item.label) +
                                          "\n\t\t\t\t\t\t"
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          !_vm.collapsed
                            ? _c("f-icon", {
                                class: _vm.getChevronClasses(item),
                                attrs: { name: "chevron-down", size: "sm" },
                              })
                            : _vm._e(),
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
                              value: _vm.isSubmenuOpen(item) && !_vm.collapsed,
                              expression: "isSubmenuOpen(item) && !collapsed",
                            },
                          ],
                          staticClass: "submenu-content",
                        },
                        _vm._l(item.children, function (child, childIndex) {
                          return _c(
                            _vm.getItemComponent(child),
                            {
                              key: "child-" + index + "-" + childIndex,
                              tag: "component",
                              class: _vm.getChildItemClasses(child),
                              attrs: { href: child.href, to: child.to },
                              on: {
                                click: function ($event) {
                                  return _vm.handleItemClick(child, $event)
                                },
                              },
                            },
                            [
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "flex items-center gap-3 flex-1 min-w-0",
                                },
                                [
                                  child.icon
                                    ? _c("f-icon", {
                                        class: _vm.getIconClasses(child),
                                        attrs: { name: child.icon, size: "sm" },
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "truncate" }, [
                                    _vm._v(_vm._s(child.label)),
                                  ]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              child.badge
                                ? _c(
                                    "f-badge",
                                    {
                                      attrs: {
                                        variant:
                                          child.badgeVariant || "primary",
                                        size: "small",
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t" +
                                          _vm._s(child.badge) +
                                          "\n\t\t\t\t\t\t"
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            1
                          )
                        }),
                        1
                      ),
                    ]
                  )
                : _c(
                    _vm.getItemComponent(item),
                    {
                      key: "nav-item-" + index,
                      tag: "component",
                      class: _vm.getNavItemClasses(item),
                      attrs: { href: item.href, to: item.to },
                      on: {
                        click: function ($event) {
                          return _vm.handleItemClick(item, $event)
                        },
                      },
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "flex items-center gap-3 flex-1 min-w-0",
                        },
                        [
                          item.icon
                            ? _c("f-icon", {
                                class: _vm.getIconClasses(item),
                                attrs: { name: item.icon, size: "md" },
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.collapsed
                            ? _c(
                                "span",
                                {
                                  staticClass:
                                    "truncate transition-opacity duration-200",
                                },
                                [
                                  _vm._v(
                                    "\n\t\t\t\t\t\t" +
                                      _vm._s(item.label) +
                                      "\n\t\t\t\t\t"
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      item.badge && !_vm.collapsed
                        ? _c(
                            "f-badge",
                            {
                              attrs: {
                                variant: item.badgeVariant || "primary",
                                size: "small",
                              },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(item.badge) +
                                  "\n\t\t\t\t"
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
            ]
          }),
          _vm._v(" "),
          _vm._t("navigation"),
        ],
        2
      ),
      _vm._v(" "),
      _vm.$slots.footer || _vm.showThemeToggle
        ? _c(
            "div",
            { class: _vm.footerClasses },
            [
              _vm._t("footer", function () {
                return [
                  _vm.showThemeToggle
                    ? _c(
                        "div",
                        {
                          staticClass: "flex items-center",
                          class: _vm.collapsed
                            ? "justify-center"
                            : "justify-between",
                        },
                        [
                          !_vm.collapsed
                            ? _c(
                                "f-typography",
                                { attrs: { variant: "caption" } },
                                [
                                  _vm._v(
                                    "\n\t\t\t\t\t" +
                                      _vm._s(_vm.themeToggleLabel) +
                                      "\n\t\t\t\t"
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("f-toggle", {
                            attrs: {
                              value: _vm.isDarkMode,
                              "aria-label": _vm.themeToggleLabel,
                            },
                            on: { input: _vm.handleThemeToggle },
                          }),
                        ],
                        1
                      )
                    : _vm._e(),
                ]
              }),
            ],
            2
          )
        : _vm._e(),
    ]
  )
};
__vue_render__$6._withStripped = true;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$5 = {
	name: 'FPageHeader',
	components: {
		FBreadcrumb: __vue_component__$k,
		FTypography: __vue_component__$m,
		FAvatar: __vue_component__$x
	},
	props: {
		/**
		 * Page title
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Page subtitle (optional description under the title)
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Title typography variant
		 */
		titleVariant: {
			type: String,
			default: 'h1',
			validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
		},
		/**
		 * Truncate title if it overflows
		 */
		truncateTitle: {
			type: Boolean,
			default: false
		},
		/**
		 * Breadcrumb items array
		 * Each item: { label: string, href?: string, icon?: string }
		 */
		breadcrumbItems: {
			type: Array,
			default: () => []
		},
		/**
		 * Breadcrumb separator icon
		 */
		breadcrumbSeparatorIcon: {
			type: String,
			default: 'chevron-right'
		},
		/**
		 * Breadcrumb ARIA label
		 */
		breadcrumbAriaLabel: {
			type: String,
			default: "Fil d'Ariane"
		},
		/**
		 * Avatar image source URL
		 */
		avatarSrc: {
			type: String,
			default: ''
		},
		/**
		 * Avatar alt text
		 */
		avatarAlt: {
			type: String,
			default: ''
		},
		/**
		 * Avatar initials (used when no image)
		 */
		avatarInitials: {
			type: String,
			default: ''
		},
		/**
		 * Avatar name (used to compute initials if no initials provided)
		 */
		avatarName: {
			type: String,
			default: ''
		},
		/**
		 * Avatar size
		 */
		avatarSize: {
			type: String,
			default: 'lg',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Avatar shape
		 */
		avatarShape: {
			type: String,
			default: 'circle',
			validator: (value) => ['circle', 'square'].includes(value)
		},
		/**
		 * Avatar status indicator
		 */
		avatarStatus: {
			type: String,
			default: null,
			validator: (value) =>
				[null, 'online', 'busy', 'away', 'offline'].includes(value)
		},
		/**
		 * Visual separator below the header
		 */
		separator: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		/**
		 * Check if breadcrumb should be displayed
		 */
		showBreadcrumb() {
			return this.breadcrumbItems && this.breadcrumbItems.length > 0;
		},
		/**
		 * Check if avatar should be displayed
		 */
		showAvatar() {
			return this.avatarSrc || this.avatarInitials || this.avatarName;
		},
		/**
		 * Main header container classes
		 */
		headerClasses() {
			const baseClasses = 'w-full';
			const paddingClasses = 'pb-4';
			const separatorClasses = this.separator
				? 'border-b border-neutral-200'
				: '';

			return [baseClasses, paddingClasses, separatorClasses]
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Content section classes (title + actions)
		 */
		contentClasses() {
			return [
				'flex',
				'flex-col',
				'sm:flex-row',
				'sm:items-center',
				'sm:justify-between',
				'gap-4'
			].join(' ');
		},
		/**
		 * Title section classes (avatar + title)
		 */
		titleSectionClasses() {
			return 'flex items-center gap-4 min-w-0 flex-1';
		},
		/**
		 * Actions section classes
		 */
		actionsClasses() {
			return 'flex-shrink-0 self-start sm:self-center';
		}
	},
	methods: {
		/**
		 * Handle breadcrumb navigation event
		 */
		handleBreadcrumbNavigate(payload) {
			this.$emit('breadcrumb-navigate', payload);
		}
	}
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("header", { class: _vm.headerClasses }, [
    _vm.showBreadcrumb
      ? _c(
          "div",
          { staticClass: "mb-4" },
          [
            _c("f-breadcrumb", {
              attrs: {
                items: _vm.breadcrumbItems,
                "separator-icon": _vm.breadcrumbSeparatorIcon,
                "aria-label": _vm.breadcrumbAriaLabel,
              },
              on: { navigate: _vm.handleBreadcrumbNavigate },
            }),
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { class: _vm.contentClasses }, [
      _c(
        "div",
        { class: _vm.titleSectionClasses },
        [
          _vm.showAvatar
            ? _c("f-avatar", {
                staticClass: "flex-shrink-0",
                attrs: {
                  src: _vm.avatarSrc,
                  alt: _vm.avatarAlt,
                  initials: _vm.avatarInitials,
                  name: _vm.avatarName,
                  size: _vm.avatarSize,
                  shape: _vm.avatarShape,
                  status: _vm.avatarStatus,
                },
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-1 min-w-0" },
            [
              _c(
                "f-typography",
                {
                  attrs: {
                    variant: _vm.titleVariant,
                    truncate: _vm.truncateTitle,
                  },
                },
                [
                  _vm._t("title", function () {
                    return [_vm._v(_vm._s(_vm.title))]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _vm.subtitle || _vm.$slots.subtitle
                ? _c(
                    "f-typography",
                    {
                      staticClass: "text-neutral-500 mt-1",
                      attrs: { variant: "body", tag: "p" },
                    },
                    [
                      _vm._t("subtitle", function () {
                        return [_vm._v(_vm._s(_vm.subtitle))]
                      }),
                    ],
                    2
                  )
                : _vm._e(),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm.$slots.actions
        ? _c("div", { class: _vm.actionsClasses }, [_vm._t("actions")], 2)
        : _vm._e(),
    ]),
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter = 0;

var script$4 = {
	name: 'FModal',
	components: {
		FTypography: __vue_component__$m,
		FButton: __vue_component__$v,
		FIcon: __vue_component__$s
	},
	props: {
		/**
		 * Controls the visibility of the modal.
		 * Use v-model for two-way binding.
		 */
		value: {
			type: Boolean,
			default: false
		},
		/**
		 * Modal title displayed in the header
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Optional subtitle displayed below the title
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Show the close button in the header
		 */
		closable: {
			type: Boolean,
			default: true
		},
		/**
		 * Close the modal when clicking the overlay
		 */
		closeOnOverlay: {
			type: Boolean,
			default: true
		},
		/**
		 * Close the modal when pressing Escape key
		 */
		closeOnEscape: {
			type: Boolean,
			default: true
		},
		/**
		 * Modal size variant
		 */
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
		},
		/**
		 * Whether the modal has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			uid: idCounter++
		};
	},
	computed: {
		/**
		 * Computed property for v-model support
		 */
		isOpen: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Unique ID for the modal title (accessibility)
		 */
		titleId() {
			return `f-modal-title-${this.uid}`;
		},
		/**
		 * Modal container classes
		 */
		modalClasses() {
			const baseClasses =
				'relative bg-white rounded-lg overflow-hidden shadow-xl transition-all';
			const borderedClasses = this.bordered ? 'border border-neutral-200' : '';

			const sizeClasses = {
				small: 'w-full max-w-sm',
				medium: 'w-full max-w-lg',
				large: 'w-full max-w-2xl',
				full: 'w-full max-w-full m-4'
			};

			return [baseClasses, borderedClasses, sizeClasses[this.size]]
				.filter(Boolean)
				.join(' ');
		}
	},
	watch: {
		/**
		 * Watch for modal open/close to manage body scroll
		 */
		isOpen: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					this.lockBodyScroll();
					this.$nextTick(() => {
						if (this.closeOnEscape) {
							document.addEventListener('keydown', this.handleKeydown);
						}
					});
				} else {
					this.unlockBodyScroll();
					document.removeEventListener('keydown', this.handleKeydown);
				}
			}
		}
	},
	beforeDestroy() {
		this.unlockBodyScroll();
		document.removeEventListener('keydown', this.handleKeydown);
	},
	methods: {
		/**
		 * Handle overlay click
		 */
		handleOverlayClick() {
			if (this.closeOnOverlay) {
				this.handleClose();
			}
		},
		/**
		 * Handle close action
		 */
		handleClose() {
			this.isOpen = false;
			this.$emit('close');
		},
		/**
		 * Handle keyboard events
		 */
		handleKeydown(event) {
			if (event.key === 'Escape' && this.closeOnEscape) {
				this.handleClose();
			}
		},
		/**
		 * Lock body scroll when modal is open
		 */
		lockBodyScroll() {
			document.body.style.overflow = 'hidden';
		},
		/**
		 * Unlock body scroll when modal is closed
		 */
		unlockBodyScroll() {
			document.body.style.overflow = '';
		}
	}
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isOpen
    ? _c("div", { staticClass: "fixed inset-0 z-50 overflow-y-auto" }, [
        _c("div", {
          staticClass:
            "fixed inset-0 bg-black bg-opacity-50 transition-opacity",
          on: { click: _vm.handleOverlayClick },
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "flex min-h-full items-center justify-center p-4" },
          [
            _c(
              "div",
              {
                class: _vm.modalClasses,
                attrs: {
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": _vm.titleId,
                },
              },
              [
                _vm.$slots.header || _vm.title
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "flex items-center justify-between px-4 pt-4",
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "flex-1 min-w-0" },
                          [
                            _vm._t("header", function () {
                              return [
                                _c(
                                  "f-typography",
                                  { attrs: { id: _vm.titleId, variant: "h5" } },
                                  [_vm._v(_vm._s(_vm.title))]
                                ),
                                _vm._v(" "),
                                _vm.subtitle
                                  ? _c(
                                      "f-typography",
                                      {
                                        staticClass: "text-neutral-500",
                                        attrs: { variant: "caption" },
                                      },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t" +
                                            _vm._s(_vm.subtitle) +
                                            "\n\t\t\t\t\t\t"
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
                        _vm.closable
                          ? _c(
                              "f-button",
                              {
                                staticClass: "flex-shrink-0 -mr-2",
                                attrs: { variant: "ghost", size: "small" },
                                on: { click: _vm.handleClose },
                              },
                              [
                                _c("f-icon", {
                                  attrs: { name: "close", size: "sm" },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "sr-only" }, [
                                  _vm._v("Fermer la modale"),
                                ]),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "p-4" },
                  [
                    _vm._t("body", function () {
                      return [_vm._t("default")]
                    }),
                  ],
                  2
                ),
                _vm._v(" "),
                _vm.$slots.actions
                  ? _c(
                      "div",
                      { staticClass: "px-4 pb-4 flex gap-2 justify-end" },
                      [_vm._t("actions")],
                      2
                    )
                  : _vm._e(),
              ]
            ),
          ]
        ),
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$3 = {
	name: 'FUserMenu',
	components: {
		FAvatar: __vue_component__$x,
		FIcon: __vue_component__$s,
		FTypography: __vue_component__$m,
		FDivider: __vue_component__$t,
		FListItem: __vue_component__$c
	},
	props: {
		/**
		 * Controls whether the menu is shown (based on login state)
		 */
		isLoggedIn: {
			type: Boolean,
			default: true
		},
		/**
		 * Controls the open state of the dropdown (v-model support)
		 */
		value: {
			type: Boolean,
			default: false
		},
		/**
		 * User's display name
		 */
		userName: {
			type: String,
			default: ''
		},
		/**
		 * User's email address
		 */
		userEmail: {
			type: String,
			default: ''
		},
		/**
		 * Avatar image source URL
		 */
		avatarSrc: {
			type: String,
			default: ''
		},
		/**
		 * Avatar alt text
		 */
		avatarAlt: {
			type: String,
			default: ''
		},
		/**
		 * Avatar initials (used when no image)
		 */
		avatarInitials: {
			type: String,
			default: ''
		},
		/**
		 * Avatar name (used to compute initials if no initials provided)
		 */
		avatarName: {
			type: String,
			default: ''
		},
		/**
		 * Avatar size
		 */
		avatarSize: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Avatar status indicator
		 */
		avatarStatus: {
			type: String,
			default: null,
			validator: (value) =>
				[null, 'online', 'busy', 'away', 'offline'].includes(value)
		},
		/**
		 * Show username next to avatar in trigger
		 */
		showUserName: {
			type: Boolean,
			default: false
		},
		/**
		 * Show chevron icon in trigger
		 */
		showChevron: {
			type: Boolean,
			default: true
		},
		/**
		 * Show user info (name/email) in dropdown header
		 */
		showUserInfo: {
			type: Boolean,
			default: true
		},
		/**
		 * Array of menu items
		 * Each item: { key?: string, label: string, icon?: string, disabled?: boolean, divider?: boolean }
		 */
		menuItems: {
			type: Array,
			default: () => []
		},
		/**
		 * Show logout button at bottom
		 */
		showLogout: {
			type: Boolean,
			default: true
		},
		/**
		 * Logout button label
		 */
		logoutLabel: {
			type: String,
			default: 'Déconnexion'
		},
		/**
		 * Dropdown alignment relative to trigger
		 */
		dropdownAlign: {
			type: String,
			default: 'right',
			validator: (value) => ['left', 'right'].includes(value)
		},
		/**
		 * Dropdown width
		 */
		dropdownWidth: {
			type: String,
			default: 'w-56'
		},
		/**
		 * ARIA label for the menu
		 */
		menuAriaLabel: {
			type: String,
			default: 'Menu utilisateur'
		}
	},
	data() {
		return {
			internalOpen: false
		};
	},
	computed: {
		/**
		 * Computed property for v-model support
		 */
		isOpen: {
			get() {
				return this.value !== undefined ? this.value : this.internalOpen;
			},
			set(val) {
				this.internalOpen = val;
				this.$emit('input', val);
			}
		},
		/**
		 * Check if there are menu items to display
		 */
		hasMenuItems() {
			return this.menuItems.length > 0 || this.$slots['menu-items'];
		},
		/**
		 * Computed avatar name (falls back to userName if not provided)
		 */
		computedAvatarName() {
			return this.avatarName || this.userName;
		},
		/**
		 * Trigger button classes
		 */
		triggerClasses() {
			return [
				'inline-flex items-center',
				'px-2 py-1 rounded-lg',
				'transition-colors duration-200',
				'hover:bg-neutral-100',
				'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
				'cursor-pointer'
			].join(' ');
		},
		/**
		 * Dropdown container classes
		 */
		dropdownClasses() {
			const alignmentClass =
				this.dropdownAlign === 'left' ? 'left-0' : 'right-0';

			return [
				'absolute z-50 mt-2',
				alignmentClass,
				this.dropdownWidth,
				'bg-white rounded-lg shadow-lg',
				'border border-neutral-200',
				'overflow-hidden'
			].join(' ');
		}
	},
	watch: {
		isOpen(newValue) {
			if (newValue) {
				this.$nextTick(() => {
					document.addEventListener('click', this.handleClickOutside);
				});
			} else {
				document.removeEventListener('click', this.handleClickOutside);
			}
		}
	},
	beforeDestroy() {
		document.removeEventListener('click', this.handleClickOutside);
	},
	methods: {
		/**
		 * Toggle menu open/close state
		 */
		toggleMenu() {
			this.isOpen = !this.isOpen;
			this.$emit('toggle', this.isOpen);
		},
		/**
		 * Close the menu
		 */
		closeMenu() {
			if (this.isOpen) {
				this.isOpen = false;
				this.$emit('close');
			}
		},
		/**
		 * Handle clicks outside the dropdown
		 */
		handleClickOutside(event) {
			const dropdown = this.$refs.dropdown;
			const trigger = this.$refs.trigger;

			if (
				dropdown &&
				trigger &&
				!dropdown.contains(event.target) &&
				!trigger.contains(event.target)
			) {
				this.closeMenu();
			}
		},
		/**
		 * Get classes for menu items based on item config
		 */
		getItemClasses(item) {
			const classes = [];
			if (item.danger) {
				classes.push('text-danger-600 hover:bg-danger-50');
			}
			return classes.join(' ');
		},
		/**
		 * Handle menu item click
		 */
		handleItemClick(item, event) {
			if (item.disabled) return;

			this.$emit('item-click', { item, event });
			this.$emit('navigate', { item, event });

			// Close menu after click unless item specifies keepOpen
			if (!item.keepOpen) {
				this.closeMenu();
			}
		},
		/**
		 * Handle logout action
		 */
		handleLogout() {
			this.$emit('logout');
			this.closeMenu();
		}
	}
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoggedIn
    ? _c(
        "div",
        {
          staticClass: "relative inline-block",
          on: {
            keydown: function ($event) {
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
              return _vm.closeMenu.apply(null, arguments)
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
                type: "button",
                "aria-expanded": _vm.isOpen,
                "aria-haspopup": "menu",
              },
              on: { click: _vm.toggleMenu },
            },
            [
              _c("f-avatar", {
                attrs: {
                  src: _vm.avatarSrc,
                  alt: _vm.avatarAlt,
                  initials: _vm.avatarInitials,
                  name: _vm.computedAvatarName,
                  size: _vm.avatarSize,
                  status: _vm.avatarStatus,
                },
              }),
              _vm._v(" "),
              _vm.showUserName
                ? _c(
                    "span",
                    { staticClass: "ml-2 font-medium text-neutral-700" },
                    [_vm._v("\n\t\t\t" + _vm._s(_vm.userName) + "\n\t\t")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showChevron
                ? _c("f-icon", {
                    staticClass: "ml-1 text-neutral-500",
                    attrs: {
                      name: _vm.isOpen ? "chevron-up" : "chevron-down",
                      size: "sm",
                    },
                  })
                : _vm._e(),
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
              attrs: { role: "menu", "aria-label": _vm.menuAriaLabel },
            },
            [
              _vm.showUserInfo
                ? _c(
                    "div",
                    { staticClass: "px-4 py-3" },
                    [
                      _c(
                        "f-typography",
                        {
                          staticClass: "font-medium text-neutral-900",
                          attrs: { variant: "body", truncate: "" },
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t" + _vm._s(_vm.userName) + "\n\t\t\t"
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _vm.userEmail
                        ? _c(
                            "f-typography",
                            {
                              staticClass: "text-neutral-500",
                              attrs: { variant: "caption", truncate: "" },
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t" +
                                  _vm._s(_vm.userEmail) +
                                  "\n\t\t\t"
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showUserInfo && _vm.hasMenuItems
                ? _c("f-divider", { attrs: { margin: "none" } })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "py-1" },
                [
                  _vm._t("menu-items", function () {
                    return [
                      _vm._l(_vm.menuItems, function (item, index) {
                        return [
                          item.divider
                            ? _c("f-divider", {
                                key: "divider-" + index,
                                attrs: { margin: "sm" },
                              })
                            : _c("f-list-item", {
                                key: item.key || "item-" + index,
                                class: _vm.getItemClasses(item),
                                attrs: {
                                  title: item.label,
                                  clickable: "",
                                  disabled: item.disabled,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.handleItemClick(item, $event)
                                  },
                                },
                                scopedSlots: _vm._u(
                                  [
                                    item.icon
                                      ? {
                                          key: "left",
                                          fn: function () {
                                            return [
                                              _c("f-icon", {
                                                staticClass: "text-neutral-500",
                                                attrs: {
                                                  name: item.icon,
                                                  size: "sm",
                                                },
                                              }),
                                            ]
                                          },
                                          proxy: true,
                                        }
                                      : null,
                                  ],
                                  null,
                                  true
                                ),
                              }),
                        ]
                      }),
                    ]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _vm.showLogout
                ? [
                    _c("f-divider", { attrs: { margin: "none" } }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "py-1" },
                      [
                        _c("f-list-item", {
                          staticClass: "text-danger-600 hover:bg-danger-50",
                          attrs: { title: _vm.logoutLabel, clickable: "" },
                          on: { click: _vm.handleLogout },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "left",
                                fn: function () {
                                  return [
                                    _c("f-icon", {
                                      staticClass: "text-danger-500",
                                      attrs: {
                                        name: "arrow-right",
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
                            983486866
                          ),
                        }),
                      ],
                      1
                    ),
                  ]
                : _vm._e(),
            ],
            2
          ),
        ]
      )
    : _vm._e()
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
	name: 'FStepperProgress',
	props: {
		/**
		 * Array of step titles
		 */
		steps: {
			type: Array,
			required: true
		},
		/**
		 * Current active step index (0-based)
		 */
		currentStep: {
			type: Number,
			default: 0
		}
	},
	methods: {
		/**
		 * Get container classes for each step
		 */
		stepContainerClasses(index) {
			const isLast = index === this.steps.length - 1;
			return ['flex', 'items-center', isLast ? '' : 'flex-1']
				.filter(Boolean)
				.join(' ');
		},
		/**
		 * Get classes for step circle indicator
		 */
		stepCircleClasses(index) {
			const baseClasses =
				'flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white transition-colors duration-200';

			if (index < this.currentStep) {
				// Completed step
				return [baseClasses, 'bg-success-600 text-white'].join(' ');
			} else if (index === this.currentStep) {
				// Current step
				return [baseClasses, 'bg-primary-600 text-white'].join(' ');
			} else {
				// Future step
				return [baseClasses, 'bg-neutral-200 text-neutral-500'].join(' ');
			}
		},
		/**
		 * Get classes for step title
		 */
		stepTitleClasses(index) {
			const baseClasses =
				'ml-2 text-sm font-medium transition-colors duration-200';

			if (index < this.currentStep) {
				// Completed step
				return [baseClasses, 'text-success-600'].join(' ');
			} else if (index === this.currentStep) {
				// Current step
				return [baseClasses, 'text-primary-600'].join(' ');
			} else {
				// Future step
				return [baseClasses, 'text-neutral-500'].join(' ');
			}
		},
		/**
		 * Get classes for connector line between steps
		 */
		connectorClasses(index) {
			const baseClasses = 'flex-1 h-0.5 mx-4 transition-colors duration-200';

			if (index < this.currentStep) {
				// Connector before current step (completed)
				return [baseClasses, 'bg-success-600'].join(' ');
			} else {
				// Connector at or after current step
				return [baseClasses, 'bg-neutral-200'].join(' ');
			}
		}
	}
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
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
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$1 = {
	name: 'FOnboardingStepper',
	components: {
		FCard: __vue_component__$e,
		FButton: __vue_component__$v,
		FIcon: __vue_component__$s,
		FStepperProgress: __vue_component__$2
	},
	props: {
		/**
		 * Array of step objects containing title and optional validation state.
		 * Each step: { title: string, valid?: boolean }
		 */
		steps: {
			type: Array,
			required: true,
			validator: (value) => {
				return value.every((step) => typeof step.title === 'string');
			}
		},
		/**
		 * Current step index (0-based).
		 * Use v-model or .sync for two-way binding.
		 */
		value: {
			type: Number,
			default: 0
		},
		/**
		 * Whether the current step is valid and the user can proceed.
		 * When false, the "Next" or "Complete" button is disabled.
		 */
		canProceed: {
			type: Boolean,
			default: true
		},
		/**
		 * Label for the "Previous" button
		 */
		previousLabel: {
			type: String,
			default: 'Précédent'
		},
		/**
		 * Label for the "Next" button
		 */
		nextLabel: {
			type: String,
			default: 'Suivant'
		},
		/**
		 * Label for the "Complete" button (shown on last step)
		 */
		completeLabel: {
			type: String,
			default: 'Terminer'
		},
		/**
		 * Whether the card has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		/**
		 * Current step index with v-model support
		 */
		currentStepIndex: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		/**
		 * Extract step titles from the steps array
		 */
		stepTitles() {
			return this.steps.map((step) => step.title);
		},
		/**
		 * Total number of steps
		 */
		totalSteps() {
			return this.steps.length;
		},
		/**
		 * Check if current step is the last step
		 */
		isLastStep() {
			return this.currentStepIndex === this.totalSteps - 1;
		},
		/**
		 * Check if current step is the first step
		 */
		isFirstStep() {
			return this.currentStepIndex === 0;
		}
	},
	methods: {
		/**
		 * Navigate to the previous step
		 */
		handlePrevious() {
			if (this.currentStepIndex > 0) {
				this.currentStepIndex = this.currentStepIndex - 1;
				this.$emit('previous', this.currentStepIndex);
				this.$emit('step-change', this.currentStepIndex);
			}
		},
		/**
		 * Navigate to the next step
		 */
		handleNext() {
			if (this.canProceed && !this.isLastStep) {
				this.currentStepIndex = this.currentStepIndex + 1;
				this.$emit('next', this.currentStepIndex);
				this.$emit('step-change', this.currentStepIndex);
			}
		},
		/**
		 * Complete the stepper workflow
		 */
		handleComplete() {
			if (this.canProceed && this.isLastStep) {
				this.$emit('complete');
			}
		},
		/**
		 * Programmatically go to a specific step
		 */
		goToStep(index) {
			if (index >= 0 && index < this.totalSteps) {
				this.currentStepIndex = index;
				this.$emit('step-change', index);
			}
		}
	}
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script = {
	name: 'FProfileSection',
	components: {
		FCard: __vue_component__$e,
		FTypography: __vue_component__$m,
		FButton: __vue_component__$v,
		FLoader: __vue_component__$q,
		FAlert: __vue_component__$l,
		FForm: __vue_component__$8,
		FFormField: __vue_component__$f,
		FTextarea: __vue_component__$o,
		FAvatar: __vue_component__$x
	},
	props: {
		/**
		 * Section title
		 */
		title: {
			type: String,
			default: ''
		},
		/**
		 * Section subtitle
		 */
		subtitle: {
			type: String,
			default: ''
		},
		/**
		 * Data object containing the profile/entity information
		 * Used for v-model support
		 */
		value: {
			type: Object,
			default: () => ({})
		},
		/**
		 * Field definitions for automatic form generation
		 * Each field: { name, label, type, placeholder, required, disabled, rows (for textarea) }
		 */
		fields: {
			type: Array,
			default: () => []
		},
		/**
		 * Whether the section is currently in editing mode
		 */
		editing: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the section is editable (shows edit button)
		 */
		editable: {
			type: Boolean,
			default: true
		},
		/**
		 * Whether the section is currently loading data
		 */
		loading: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the form is currently submitting
		 */
		submitting: {
			type: Boolean,
			default: false
		},
		/**
		 * Custom validation function
		 * Should return an object with field names as keys and error messages as values
		 * Return empty object if validation passes
		 */
		validate: {
			type: Function,
			default: null
		},
		/**
		 * Avatar image source URL
		 */
		avatarSrc: {
			type: String,
			default: ''
		},
		/**
		 * Avatar alt text
		 */
		avatarAlt: {
			type: String,
			default: ''
		},
		/**
		 * Avatar initials
		 */
		avatarInitials: {
			type: String,
			default: ''
		},
		/**
		 * Avatar name (for computing initials)
		 */
		avatarName: {
			type: String,
			default: ''
		},
		/**
		 * Avatar size
		 */
		avatarSize: {
			type: String,
			default: 'lg',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Avatar shape
		 */
		avatarShape: {
			type: String,
			default: 'circle',
			validator: (value) => ['circle', 'square'].includes(value)
		},
		/**
		 * Whether the avatar can be edited
		 */
		avatarEditable: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the card has a border
		 */
		bordered: {
			type: Boolean,
			default: true
		},
		/**
		 * Loader size
		 */
		loaderSize: {
			type: String,
			default: 'md',
			validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
		},
		/**
		 * Loading state label for accessibility
		 */
		loadingLabel: {
			type: String,
			default: 'Chargement en cours'
		},
		/**
		 * Edit button label
		 */
		editButtonLabel: {
			type: String,
			default: 'Modifier'
		},
		/**
		 * Save button label
		 */
		saveButtonLabel: {
			type: String,
			default: 'Enregistrer'
		},
		/**
		 * Cancel button label
		 */
		cancelButtonLabel: {
			type: String,
			default: 'Annuler'
		}
	},
	data() {
		return {
			internalEditing: false,
			localFormData: {},
			validationErrors: {},
			alertMessage: '',
			alertVariant: 'info'
		};
	},
	computed: {
		/**
		 * Computed property for editing mode with v-model support
		 */
		isEditing: {
			get() {
				return this.editing || this.internalEditing;
			},
			set(value) {
				this.internalEditing = value;
				this.$emit('update:editing', value);
			}
		},
		/**
		 * Computed property for loading state
		 */
		isLoading() {
			return this.loading;
		},
		/**
		 * Computed property for submitting state
		 */
		isSubmitting() {
			return this.submitting;
		},
		/**
		 * Check if avatar should be displayed
		 */
		showAvatar() {
			return this.avatarSrc || this.avatarInitials || this.avatarName;
		}
	},
	watch: {
		/**
		 * Watch for changes in value prop to update local form data
		 */
		value: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.localFormData = { ...newValue };
			}
		},
		/**
		 * Watch editing prop changes
		 */
		editing: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					this.localFormData = { ...this.value };
					this.validationErrors = {};
				}
			}
		}
	},
	methods: {
		/**
		 * Start editing mode
		 */
		startEditing() {
			this.localFormData = { ...this.value };
			this.validationErrors = {};
			this.clearAlert();
			this.isEditing = true;
			this.$emit('edit-start');
		},
		/**
		 * Cancel editing and return to read mode
		 */
		cancelEditing() {
			this.localFormData = { ...this.value };
			this.validationErrors = {};
			this.isEditing = false;
			this.$emit('edit-cancel');
		},
		/**
		 * Update a specific field in the form data
		 */
		updateField(fieldName, value) {
			this.localFormData = {
				...this.localFormData,
				[fieldName]: value
			};
			// Clear validation error for this field when it's updated
			if (this.validationErrors[fieldName]) {
				const { [fieldName]: removed, ...rest } = this.validationErrors;
				this.validationErrors = rest;
			}
			this.$emit('field-change', {
				field: fieldName,
				value,
				formData: this.localFormData
			});
		},
		/**
		 * Validate the form data
		 * Returns true if valid, false otherwise
		 */
		validateForm() {
			// Run custom validation if provided
			if (this.validate) {
				this.validationErrors = this.validate(this.localFormData) || {};
				return Object.keys(this.validationErrors).length === 0;
			}

			// Default required field validation
			const errors = {};
			for (const field of this.fields) {
				if (field.required && !this.localFormData[field.name]) {
					errors[field.name] = `${field.label} est requis`;
				}
			}
			this.validationErrors = errors;
			return Object.keys(errors).length === 0;
		},
		/**
		 * Handle form submission
		 */
		handleSubmit() {
			if (!this.validateForm()) {
				return;
			}

			this.$emit('submit', {
				data: { ...this.localFormData },
				done: this.handleSubmitSuccess,
				fail: this.handleSubmitError
			});
		},
		/**
		 * Handle successful submission
		 */
		handleSubmitSuccess(message = 'Modifications enregistrées avec succès') {
			this.$emit('input', { ...this.localFormData });
			this.isEditing = false;
			this.showAlert('success', message);
			this.$emit('save-success', { data: this.localFormData, message });
		},
		/**
		 * Handle submission error
		 */
		handleSubmitError(
			message = "Une erreur est survenue lors de l'enregistrement"
		) {
			this.showAlert('error', message);
			this.$emit('save-error', { data: this.localFormData, message });
		},
		/**
		 * Handle avatar edit button click
		 */
		handleAvatarEdit() {
			this.$emit('avatar-edit');
		},
		/**
		 * Show alert message
		 */
		showAlert(variant, message) {
			this.alertVariant = variant;
			this.alertMessage = message;
		},
		/**
		 * Clear alert message
		 */
		clearAlert() {
			this.alertMessage = '';
		}
	}
};

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
                                                "absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1.5 hover:bg-primary-700 transition-colors",
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

const components = {
    FActivityFeed: __vue_component__$9,
    FAlert: __vue_component__$l,
    FAvatar: __vue_component__$x,
    FBadge: __vue_component__$w,
    FBreadcrumb: __vue_component__$k,
    FButton: __vue_component__$v,
    FButtonGroup: __vue_component__$j,
    FCheckbox: __vue_component__$u,
    FDataTable: __vue_component__$7,
    FDatePicker: __vue_component__$i,
    FDivider: __vue_component__$t,
    FEmptyState: __vue_component__$h,
    FFilePreview: __vue_component__$g,
    FFileUpload: __vue_component__$6,
    FIcon: __vue_component__$s,
    FInput: __vue_component__$r,
    FListItem: __vue_component__$c,
    FLoader: __vue_component__$q,
    FModal: __vue_component__$4,
    FOnboardingStepper: __vue_component__$1,
    FPageHeader: __vue_component__$5,
    FProfileSection: __vue_component__,
    FRadio: __vue_component__$p,
    FSelect: __vue_component__$a,
    FTextarea: __vue_component__$o,
    FToggle: __vue_component__$n,
    FTypography: __vue_component__$m,
    FFormField: __vue_component__$f,
    FCard: __vue_component__$e,
    FForm: __vue_component__$8,
    FSearchBar: __vue_component__$d,
    FPagination: __vue_component__$b,
    FUserMenu: __vue_component__$3
};
const install = (Vue) => {
    Object.keys(components).forEach((name) => {
        // Type assertion is necessary because Vue 2's component registration
        // doesn't have perfect TypeScript support for dynamic component maps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Vue.component(name, components[name]);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
var index = {
    install
};

exports.FActivityFeed = __vue_component__$9;
exports.FAlert = __vue_component__$l;
exports.FAvatar = __vue_component__$x;
exports.FBadge = __vue_component__$w;
exports.FBreadcrumb = __vue_component__$k;
exports.FButton = __vue_component__$v;
exports.FButtonGroup = __vue_component__$j;
exports.FCard = __vue_component__$e;
exports.FCheckbox = __vue_component__$u;
exports.FDataTable = __vue_component__$7;
exports.FDatePicker = __vue_component__$i;
exports.FDivider = __vue_component__$t;
exports.FEmptyState = __vue_component__$h;
exports.FFilePreview = __vue_component__$g;
exports.FFileUpload = __vue_component__$6;
exports.FForm = __vue_component__$8;
exports.FFormField = __vue_component__$f;
exports.FIcon = __vue_component__$s;
exports.FInput = __vue_component__$r;
exports.FListItem = __vue_component__$c;
exports.FLoader = __vue_component__$q;
exports.FModal = __vue_component__$4;
exports.FOnboardingStepper = __vue_component__$1;
exports.FPageHeader = __vue_component__$5;
exports.FPagination = __vue_component__$b;
exports.FProfileSection = __vue_component__;
exports.FRadio = __vue_component__$p;
exports.FSearchBar = __vue_component__$d;
exports.FSelect = __vue_component__$a;
exports.FTextarea = __vue_component__$o;
exports.FToggle = __vue_component__$n;
exports.FTypography = __vue_component__$m;
exports.FUserMenu = __vue_component__$3;
exports.default = index;
