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
            first_dimension: 200,
            split_dimension: 8,
            unit: 'px',
            oninitSuccess: function oninitSuccess() {
                return false;
            },
            oninitError: function oninitError() {
                return false;
            },
            onsplitStart: function onsplitStart() {

            },
            onsplitDragging: function onsplitDragging() {
                return false;
            },
            onsplitDone: function onsplitDone() {
                return false;
            },
        };

        var EN = {};

        var METHODS = ['destroy', 'getOptions', 'init',];
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
        };

        var active_split;
        var container_sequence = 0;
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
                    if ((this.options.vertical && this.options.horizontal) || (!this.options.vertical && !this.options.horizontal)) {
                        this.trigger('init-error');
                        return;
                    }

                    this.initConstants();
                    this.initContainer();
                    this.trigger('init-success');
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
                    key: "initContainer",
                    value: function initContainer() {
                        var _this_initContainer = this;
                        this.$container = this.$el;
                        this.$container.addClass('bootstrap-split');

                        var container_id;

                        if (this.$el[0].hasAttribute('id')) {
                            container_id = this.$el[0].id;
                        } else {
                            container_sequence += 1;
                            container_id = 'split_container_' + (container_sequence);
                            this.$el[0].setAttribute('id', container_id);
                        }

                        if (this.options.vertical) {
                            this.$container.addClass('split-container-vertical');
                            this.v_split = true;
                            var children = this.$el[0].children;
                            if (children.length >= 2) {
                                // create left
                                if (children[0].hasAttribute('id')) {
                                    this.options.leftid = '#' + children[0].id;
                                } else {
                                    children[0].setAttribute('id', container_id + '_left');
                                    this.options.leftid = '#' + children[0].id;
                                }
                                $__default['default'](children[0]).addClass('split-left');

                                // create split
                                var $split_ = $__default['default']('<div class=\"v-split\" id=\"' + container_id + '_split' + '\"></div>');
                                $split_.insertAfter($__default['default'](children[0]));
                                this.$split = $split_;

                                //create right
                                // we has add one split, the length increased by 1
                                if (children.length === 3) {
                                    if (children[2].hasAttribute('id')) {
                                        this.options.rightid = '#' + children[2].id;
                                    } else {
                                        children[2].setAttribute('id', container_id + '_right');
                                        this.options.rightid = '#' + container_id + '_right';
                                    }
                                    $__default['default'](children[2]).addClass('split-right');
                                } else {
                                    var $div = $__default['default']('<div class=\"split-right\" id=\"' + container_id + '_right' + '\"></div>');
                                    $div.insertAfter($split_);
                                    while (children.length > 3) {
                                        $div.append(children[3]);
                                    }
                                    this.options.rightid = '#' + container_id + '_right';
                                }

                                this.$split.on('mousedown', function (event) {
                                    if (event.which === 1) {
                                        $__default['default'](_this_initContainer.options.leftid).css({
                                            'overflow': 'auto',
                                            'resize': 'horizontal'
                                        });
                                        active_split = _this_initContainer;
                                        var nevent = $__default['default'].Event('resize');
                                        nevent.screenX = event.screenX - 2;
                                        nevent.screenY = event.screenY + 10;

                                        $__default['default'](_this_initContainer.options.leftid).trigger(nevent);
                                        _this_initContainer.trigger('split-start');
                                    }
                                });

                                $__default['default'](this.options.leftid).css('width', this.options.first_dimension + this.options.unit);
                                $__default['default'](this.$split).css('width', this.split_dimension);

                                $__default['default'](_this_initContainer.options.leftid).on('resize', function (event){
                                    console.log('mouse down, event=' + event);
                                })
                            }
                        }

                        if (this.options.horizontal) {
                            this.$container.addClass('split-container-horizontal');
                            this.h_split = true;
                            var children = this.$el[0].children;
                            if (children.length >= 2) {
                                // create top
                                if (children[0].hasAttribute('id')) {
                                    this.options.topid = '#' + children[0].id;
                                } else {
                                    children[0].setAttribute('id', container_id + '_top');
                                    this.options.topid = '#' + children[0].id;
                                }
                                $__default['default'](children[0]).addClass('split-top');

                                // create split
                                var $split_ = $__default['default']('<div class=\"h-split\" id=\"' + container_id + '_split' + '\"></div>');
                                $split_.insertAfter($__default['default'](children[0]));
                                this.$split = $split_;

                                //create bottom
                                // we has add one split, the length increased by 1
                                if (children.length === 3) {
                                    if (children[2].hasAttribute('id')) {
                                        this.options.bottomid = '#' + children[2].id;
                                    } else {
                                        children[2].setAttribute('id', container_id + '_bottom');
                                        this.options.bottomid = '#' + container_id + '_bottom';
                                    }
                                    $__default['default'](children[2]).addClass('split-bottom');
                                } else {
                                    var $div = $__default['default']('<div class=\"split-bottom\" id=\"' + container_id + '_bottom' + '\"></div>');
                                    $div.insertAfter($split_);
                                    while (children.length > 3) {
                                        $div.append(children[3]);
                                    }
                                    this.options.bottomid = '#' + container_id + '_bottom';
                                }

                                this.$split.on('mousedown', function (event) {
                                    if (event.which === 1) {
                                        $__default['default'](_this_initContainer.options.topid).css({
                                            'overflow': 'auto',
                                            'resize': 'vertical'
                                        });
                                        active_split = _this_initContainer;
                                        _this_initContainer.trigger('split-start');
                                    }
                                });

                                $__default['default'](this.options.topid).css('height', this.options.first_dimension + this.options.unit);
                                $__default['default'](this.$split).css('height', this.split_dimension);
                            }
                        }
                    },
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
        }();

        split.VERSION = Constants.VERSION;
        split.DEFAULTS = Constants.DEFAULTS;
        split.LOCALES = Constants.LOCALES;
        split.METHODS = Constants.METHODS;
        split.EVENTS = Constants.EVENTS;

        // SPLIT PLUGIN DEFINITION
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

            window.onmouseup = function (event) {
                if (event.which === 1 && active_split) {
                    if (active_split.v_split) {
                        $__default['default'](active_split.options.leftid).css({
                            'overflow': 'auto',
                            'resize': ''
                        });
                    }
                    if (active_split.h_split) {
                        $__default['default'](active_split.options.topid).css({
                            'overflow': 'auto',
                            'resize': ''
                        });
                    }
                    active_split.trigger('split-done');
                    active_split = undefined;
                }
            };

        });
        return split;
    }

)))
;

