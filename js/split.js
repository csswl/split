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
            var width;
            // with boxing-size
            // due to boxing-size, the width may include padding, etc, TODO
            var mw = $__default['default'](this.options.leftid).outerWidth(true) - $__default['default'](this.options.leftid).width();
            var split_width = $__default['default'](this.$el).outerWidth(true);
            if (this.options.unit.toLowerCase() === 'px') {
                var width_left_ori = $__default['default'](this.options.leftid).width();
                $__default['default'](this.options.leftid).width('+=' + this.deltaX + 'px');
                /*
                parent_width = $__default['default'](this.$el[0].parentElement).width();
                width = width_left_ori + this.deltaX + mw;
                mw = $__default['default'](this.options.rightid).outerWidth() - $__default['default'](this.options.rightid).width();
                $__default['default'](this.options.rightid).width((parent_width - split_width - width - mw) + 'px');
                */
            }
            if (this.options.unit === '%') {
                // ignore the border margin padding (to complex, TODO)
                parent_width = $__default['default'](this.$el[0].parentElement).width();
                var delta = this.deltaX / parent_width * 100;
                $__default['default'](this.options.leftid).width('+=' + delta + this.options.unit);
                /*
                width = $__default['default'](this.options.leftid).outerWidth(true);
                var right_width = 100 - this.options.split_dimension - width / parent_width * 100;
                $__default['default'](this.options.rightid).width(right_width + this.options.unit);
                */
            }
        }

        function h_split_adjust() {
            // console.log('deltaY=' + this.deltaY);
            var parent_height;
            var height;
            var height_top_ori;
            var mh = $__default['default'](this.options.topid).outerHeight(true) - $__default['default'](this.options.topid).height();
            var split_height = $__default['default'](this.$el).outerHeight(true);
            if (this.options.unit.toLowerCase() === 'px') {
                height_top_ori = $__default['default'](this.options.topid).height();
                $__default['default'](this.options.topid).height('+=' + this.deltaY + 'px');
                /*
                parent_height = $__default['default'](this.$el[0].parentElement).height();
                height = height_top_ori + this.deltaY + mh;
                mh = $__default['default'](this.options.bottomid).outerHeight() - $__default['default'](this.options.bottomid).height();
                $__default['default'](this.options.bottomid).height((parent_height - split_height - height - mh) + 'px');
                */
            }
            if (this.options.unit === '%') {
                // ignore the border margin padding (to complex, TODO)
                parent_height = $__default['default'](this.$el[0].parentElement).height();
                var delta = this.deltaY / parent_height * 100;
                $__default['default'](this.options.topid).height('+=' + delta + '%');
                /*
                height = height_top_ori + delta;
                var bottom_height = 100 - this.options.split_dimension - height;
                $__default['default'](this.options.bottomid).height(bottom_height + '%');
                */
            }
        }

        function event_split_handler(event) {
            if (event.data.split_obj === undefined) {
                return;
            }
            // console.log(event);
            var split_obj = event.data.split_obj;
            if (split_obj.options.v_split) {
                v_split_adjust.call(split_obj);
            }
            if (split_obj.options.h_split) {
                h_split_adjust.call(split_obj);
            }
            split_obj.trigger('split-dragging');
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
            v_split: true,
            h_split: false,
            leftid: undefined,
            rightid: undefined,
            topid: undefined,
            bottomid: undefined,
            left_width: undefined,
            top_height: undefined,
            split_dimension: 4,
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
            onsplitDragging: function onsplitDragging() {
                return false;
            },
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
                this.$el = $__default['default'](el);
                this.$el_ = this.$el.clone();
            }

            _createClass(split, [{
                key: "init",
                value: function init() {
                    var v_config_ok = this.options.v_split && this.options.leftid && this.options.rightid;
                    var h_config_ok = this.options.h_split && this.options.topid && this.options.bottomid;
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
                        var opts = this.options;
                        this.classes = Constants.CLASSES;
                        this.constants = Constants.CONSTANTS;
                        this.constants.theme = $__default['default'].fn.split.theme;
                        this.constants.dataToggle = this.constants.html.dataToggle || 'data-toggle';

                        if (typeof opts.icons === 'string') {
                            opts.icons = Utils.calculateObjectValue(null, opts.icons);
                        }
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
                        if (this.options.v_split && this.options.left_width) {
                            var mw = $__default['default'](this.options.leftid).outerWidth(true) - $__default['default'](this.options.leftid).width();
                            $__default['default'](this.options.leftid).width((this.options.left_width - mw) + this.options.unit);
                        }
                        if (this.options.h_split && this.options.top_height) {
                            var mh = $__default['default'](this.options.topid).outerHeight(true) - $__default['default'](this.options.topid).height();
                            $__default['default'](this.options.topid).height((this.options.top_height - mh) + this.options.unit);
                        }

                        //attach mouse events
                        //the splitter itself split:drag event
                        this.$el.on('split:drag', {split_obj: this}, event_split_handler)
                            .on('mousedown', function (event) {
                                if (event.which === 1) {
                                    active_split = _this_initContainer;
                                    active_split.split_start = true;
                                    active_split.screenX = event.screenX;
                                    active_split.screenY = event.screenY;
                                    active_split.trigger('split-start');
                                    //console.log(event);
                                }
                            });

                        // catch mouse move and mouse up events in whole document,
                        // because the mouse may move out of the spliter range
                        if (!document_mouseevent_loaded) {
                            $__default['default'](document).on('mousemove mouseup', function (event) {
                                //console.log(event);
                                if (event.which === 1) {
                                    var $splits = $__default['default']('.v-split, .h-split');
                                    active_split.split('setSplitDrag', {
                                        screenX: event.screenX,
                                        screenY: event.screenY
                                    }).trigger('split:drag');


                                    if (event.type === 'mouseup') {
                                        active_split.split('setSplitDrag', {split_start: false});
                                        active_split = undefined;
                                    }
                                }
                            });
                            document_mouseevent_loaded = true;
                        }

                        var s;
                        if (this.options.v_split) {
                            s = [this.options.leftid, this.options.rightid].join(',');
                        }
                        if (this.options.h_split) {
                            s = [this.options.topid, this.options.bottomid].join(',');
                        }
                        $__default['default'](s).each(function (idx, ele) {
                            //if is iframe, set the document mousemove, mouseup events
                            // and the action object is confirmed to this split
                            if (ele.tagName === 'IFRAME') {
                                $__default['default'](ele.contentWindow.document).on('mousemove mouseup', function (event) {
                                    //console.log(event);
                                    if (event.which === 1 && active_split) {
                                        active_split.setSplitDrag({
                                            screenX: event.screenX,
                                            screenY: event.screenY
                                        });
                                        active_split.$el.trigger('split:drag');
                                        if (event.type === 'mouseup') {
                                            active_split.split_start = false;
                                            active_split = undefined;
                                        }
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
                                if (this.split_start && !position.split_start) {
                                    this.split_start = position.split_start;
                                    this.trigger('split-done');
                                }else{
                                    this.split_start = position.split_start;
                                }
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
        // =======================

        $__default['default'](function () {
            $__default['default']('[data-toggle="split"]').split();
        });
        return split;
    }
)))
;

