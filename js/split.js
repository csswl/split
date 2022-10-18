(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
        typeof define === 'function' && define.amd ? define(['jquery'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.split = factory(global.jQuery));
}
(this, (function ($) {
        'use strict';

        function _interopDefaultLegacy(e) {
            return e && typeof e === 'object' && 'default' in e ? e : {
                'default': e
            };
        }

        var $__default = /*#__PURE__*/ _interopDefaultLegacy($);

        function _typeof(obj) {
            "@babel/helpers - typeof";

            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function (obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }

            return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) {
                    descriptor.writable = true;
                }
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) {
                _defineProperties(Constructor.prototype, protoProps);
            }
            if (staticProps) {
                _defineProperties(Constructor, staticProps);
            }
            return Constructor;
        }

        var VERSION = '0.0.1';
        var bootstrapVersion = 4;

        try {
            var rawVersion = $__default['default'].fn.dropdown.Constructor.VERSION; // Only try to parse VERSION if it is defined.
            // It is undefined in older versions of Bootstrap (tested with 3.1.1).

            if (rawVersion !== undefined) {
                bootstrapVersion = parseInt(rawVersion, 10);
            }
        } catch (e) { // ignore
        }

        try {
            // eslint-disable-next-line no-undef
            var _rawVersion = bootstrap.Tooltip.VERSION;

            if (_rawVersion !== undefined) {
                bootstrapVersion = parseInt(_rawVersion, 10);
            }
        } catch (e) { // ignore
        }

        function v_split_adjust() {
            // console.log('deltaX=' + this.deltaX);
            var parent_width;
            // with boxing-size
            // due to boxing-size, the width may include padding, etc, TODO
            if (this.options.unit.toLowerCase() === 'px') {
                $__default['default'](this.options.leftid).width('+=' + this.deltaX / window.devicePixelRatio + 'px');
            }
            if (this.options.unit === '%') {
                // ignore the border margin padding (to complex, TODO)
                parent_width = $__default['default'](this.$el[0].parentElement).width();
                var delta = this.deltaX / window.devicePixelRatio / parent_width * 100;
                $__default['default'](this.options.leftid).width('+=' + delta + this.options.unit);
            }
        }

        function h_split_adjust() {
            // console.log('deltaY=' + this.deltaY);
            var parent_height;
            if (this.options.unit.toLowerCase() === 'px') {
                $__default['default'](this.options.topid).height('+=' + this.deltaY / window.devicePixelRatio + 'px');
            }
            if (this.options.unit === '%') {
                // ignore the border margin padding (to complex, TODO)
                parent_height = $__default['default'](this.$el[0].parentElement).height();
                var delta = this.deltaY / window.devicePixelRatio / parent_height * 100;
                $__default['default'](this.options.topid).height('+=' + delta + '%');
            }
        }

        function move_split(event) {
            if (active_split === undefined) {
                return;
            }
            var deltaX;
            var deltaY;
            var left;
            var top;
            if (event.type === 'mousemove') {
                deltaX = (event.screenX - active_split.screenX) / window.devicePixelRatio;
                deltaY = (event.screenY - active_split.screenY) / window.devicePixelRatio;
                left = active_split.$el.offset().left;
                top = active_split.$el.offset().top;
                if (active_split.v_split) {
                    active_split.$el_.css('left', deltaX + left);
                }
                if (active_split.h_split) {
                    active_split.$el.css('top', deltaY + top);
                }
            }
            if (event.type === 'mouseup') {
                active_split.setSplitDrag({'screenX': event.screenX, 'screenY': event.screenY});
                if (active_split.v_split) {
                    v_split_adjust.call(active_split);
                }
                if (active_split.h_split) {
                    h_split_adjust.call(active_split);
                }
                active_split.$el_.detach();
            }
        }

        var document_mouseevent_loaded = false;

        var CONSTANTS = {
            4: {
                classes: {},
                html: {
                    dataToggle: 'data-toggle',
                }
            },
            5: {
                classes: {},
                html: {
                    dataToggle: 'data-bs-toggle',
                }
            }
        }[bootstrapVersion];

        /* The DEFAULTS is the default options for split */
        var DEFAULTS = {
            classes: '',
            escape: false,
            leftid: undefined,
            rightid: undefined,
            topid: undefined,
            bottomid: undefined,
            left_width: undefined,
            top_height: undefined,
            split_dimension: 8,
            unit: 'px',
            oninitSuccess: function oninitSuccess() {
                return false;
            },
            oninitError: function oninitError() {
                return false;
            },
            onsplitStart: function onsplitStart() {
                return false;
            },
            onsplitDragging: move_split(),
            onsplitDone: function onsplitDone() {
                return false;
            },
        };

        var EN = {};

        var METHODS = ['destroy', 'getOptions', 'getSplitDragStatus', 'setSplitDrag', 'init',];
        var EVENTS = {
            'init-success.bs.split': 'oninitSuccess',
            'init-error.bs.split': 'oninitError',
            'split-start.bs.split': 'onsplitStart',
            'split-dragging.bs.split': 'onsplitDragging',
            'split-done.bs.split': 'onsplitDone',
        };

        Object.assign(DEFAULTS, EN);
        var Constants = {
            VERSION: VERSION,
            THEME: "bootstrap".concat(bootstrapVersion),
            CONSTANTS: CONSTANTS,
            DEFAULTS: DEFAULTS,
            METHODS: METHODS,
            EVENTS: EVENTS,
            LOCALES: {
                en: EN,
                'en-US': EN
            }
        };

        var active_split;
        var split = /*#__PURE__*/ function () {
            function split(el, options) {
                _classCallCheck(this, split);
                this.options = options;
                this.v_split = false;
                this.h_split = false;
                this.$el = $__default['default'](el);
                this.$el_ = this.$el.clone();
            }

            _createClass(split, [{
                key: "init",
                value: function init() {
                    if (this.$el.hasClass('v-split')) {
                        this.v_split = true;
                    }
                    if (this.$el.hasClass('h-split')) {
                        this.h_split = true;
                    }
                    if ((this.v_split && this.h_split) || (!this.v_split && !this.h_split)) {
                        this.trigger('init-error');
                        return;
                    }
                    var v_config_ok = this.v_split && this.options.leftid && this.options.rightid;
                    var h_config_ok = this.h_split && this.options.topid && this.options.bottomid;
                    if (v_config_ok || h_config_ok) {
                        this.initConstants();
                        this.initLocale();
                        this.initContainer();
                        this.trigger('init-success');
                    } else {
                        this.trigger('init-error');
                        return;
                    }
                }
            },
                {
                    key: "initConstants",
                    value: function initConstants() {
                        this.classes = Constants.CLASSES;
                        this.constants = Constants.CONSTANTS;
                        this.constants.theme = $__default['default'].fn.split.theme;
                        this.constants.dataToggle = this.constants.html.dataToggle || 'data-toggle';
                    }
                },
                {
                    key: "initLocale",
                    value: function initLocale() {
                        if (this.options.locale) {
                            var locales = $__default['default'].fn.split.locales;
                            var parts = this.options.locale.split(/[-_]/);
                            parts[0] = parts[0].toLowerCase();

                            if (parts[1]) {
                                parts[1] = parts[1].toUpperCase();
                            }

                            if (locales[this.options.locale]) {
                                $__default['default'].extend(this.options, locales[this.options.locale]);
                            } else if (locales[parts.join('-')]) {
                                $__default['default'].extend(this.options, locales[parts.join('-')]);
                            } else if (locales[parts[0]]) {
                                $__default['default'].extend(this.options, locales[parts[0]]);
                            }
                        }
                    }
                },
                {
                    key: "initContainer",
                    value: function initContainer() {
                        var _this_initContainer = this;
                        this.split_start = false;
                        this.deltaX = 0;
                        this.deltaY = 0;
                        this.screenX = 0;
                        this.screenY = 0;
                        this.$container = this.$el;
                        this.$container.addClass('bootstrap-split');

                        if (this.v_split && this.options.left_width) {
                            var mw = $__default['default'](this.options.leftid).outerWidth(true) - $__default['default'](this.options.leftid).width();
                            $__default['default'](this.options.leftid).width((this.options.left_width - mw) + this.options.unit);
                        }
                        if (this.h_split && this.options.top_height) {
                            var mh = $__default['default'](this.options.topid).outerHeight(true) - $__default['default'](this.options.topid).height();
                            $__default['default'](this.options.topid).height((this.options.top_height - mh) + this.options.unit);
                        }

                        //attach mouse events
                        this.$el.on('mousedown', function (event) {
                            if (event.which === 1) {
                                active_split = _this_initContainer;
                                active_split.split_start = true;
                                active_split.screenX = event.screenX;
                                active_split.screenY = event.screenY;
                                active_split.$el_.css('position', 'absolute');
                                active_split.$el_.css('left', active_split.$el.css('left'));
                                active_split.$el_.css('top', active_split.$el.css('top'));
                                $__default['default'](active_split.$el[0].parentElement).append(active_split.$el_);
                                active_split.trigger('split-start');
                            }
                        });

                        var s;
                        if (this.v_split) {
                            s = [this.options.leftid, this.options.rightid].join(',');
                        }
                        if (this.h_split) {
                            s = [this.options.topid, this.options.bottomid].join(',');
                        }
                        $__default['default'](s).each(function (idx, ele) {
                            //if is iframe, set the document mousemove, mouseup events
                            // and the action object is confirmed to this split
                            if (ele.tagName === 'IFRAME') {
                                $__default['default'](ele.contentWindow.document).on('mousemove', function (event) {
                                    if (event.which === 1 && active_split) {
                                        move_split(event);
                                    }
                                }).on('mouseup', function (event) {
                                    if (event.which === 1 && active_split) {
                                        move_split(event);
                                        active_split.split_start = false;
                                        active_split.trigger('split-done');
                                        active_split = undefined;
                                    }
                                });
                            }
                        });
                    },
                },
                {
                    key: 'getSplitDragStatus',
                    value: function getSplitDragStatus() {
                        return this.split_start;
                    }
                },
                {
                    key: "setSplitDrag",
                    value:
                        function setSplitDrag(position) {
                            if (position.hasOwnProperty('screenX')) {
                                this.deltaX = position.screenX - this.screenX;
                                this.screenX = position.screenX;
                            }
                            if (position.hasOwnProperty('screenY')) {
                                this.deltaY = position.screenY - this.screenY;
                                this.screenY = position.screenY;
                            }
                            if (position.hasOwnProperty('split_start')) {
                                this.split_start = position.split_start;
                            }
                        }
                },
                {
                    key: 'getOptions',
                    value: function getOptions() {
                        return this.options;
                    }
                },
                {
                    key: "destroy",
                    value:
                        function destroy() {
                            this.$el.insertBefore(this.$container);
                            this.$container.next().remove();
                            this.$container.remove();
                            this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || ''); // reset the class
                        }
                },
                {
                    key: "trigger",
                    value:
                        function trigger(_name) {
                            var _this$options, _this$options2;
                            var name = "".concat(_name, ".bs.split");

                            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key4 = 1; _key4 < _len; _key4++) {
                                args[_key4 - 1] = arguments[_key4];
                            }

                            (_this$options = this.options)[split.EVENTS[name]].apply(_this$options, [].concat(args, [this]));

                            this.$el.trigger($__default['default'].Event(name, {
                                sender: this
                            }), args);
                        }
                },

            ]);

            return split;
        }
        ();

        split.VERSION = Constants.VERSION;
        split.DEFAULTS = Constants.DEFAULTS;
        split.LOCALES = Constants.LOCALES;
        split.METHODS = Constants.METHODS;
        split.EVENTS = Constants.EVENTS;

// SPLIT PLUGIN DEFINITION
// =======================

        $__default['default'].split = split;

        $__default['default'].fn.split = function (option) {

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key5 = 1; _key5 < _len2; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            var value;
            this.each(function (i, el) {
                var data = $__default['default'](el).data('bootstrap.split');
                var options = $__default['default'].extend({}, split.DEFAULTS, $__default['default'](el).data(), _typeof(option) === 'object' && option);

                if (typeof option === 'string') {
                    var _data2;

                    if (!Constants.METHODS.includes(option)) {
                        throw new Error("Unknown method: ".concat(option));
                    }

                    if (!data) {
                        return;
                    }

                    if (data) {
                        value = (_data2 = data)[option].apply(_data2, args);
                    }

                    if (option === 'destroy') {
                        $__default['default'](el).removeData('bootstrap.split');
                    }
                }

                if (!data) {
                    data = new $__default['default'].split(el, options);
                    $__default['default'](el).data('bootstrap.split', data);
                    data.init();
                }
            });
            return typeof value === 'undefined' ? this : value;
        };

        $__default['default'].fn.split.Constructor = split;
        $__default['default'].fn.split.theme = Constants.THEME;
        $__default['default'].fn.split.VERSION = Constants.VERSION;
        $__default['default'].fn.split.defaults = split.DEFAULTS;
        $__default['default'].fn.split.events = split.EVENTS;
        $__default['default'].fn.split.locales = split.LOCALES;
        $__default['default'].fn.split.methods = split.METHODS;

        // BOOTSTRAP split INIT
        $__default['default'](function () {
            $__default['default']('[data-toggle="split"]').split();
            $__default['default'](document).on('mousemove', function (event) {
                if (event.which === 1 && active_split) {
                    move_split(event);
                }
            }).on('mouseup', function (event) {
                if (event.which === 1 && active_split) {
                    move_split(event);
                    active_split.split_start = false;
                    active_split.trigger('split-done');
                    active_split = undefined;
                }
            });
        });
        return split;
    }
)))
;

