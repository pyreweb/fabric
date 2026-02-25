import script from './FFileUpload.vue2.js';
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

  var FFileUpload = __vue_component__;

export { FFileUpload as default };
