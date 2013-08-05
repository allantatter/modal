/* ========================================================================
 * The plugin is based on Twitter Bootstrap Modal and has been modified a lot
 *
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 *
 * Modal
 * The Best customizable Modal you've ever seen.
 * ========================================================================
 * Copyright 2013 Allan Tatter <allan.tatter@gmail.com>
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function ($) {

    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
        var that = this;
        this.options   = options;
        this.$element  = $(element).on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$backdrop = $('#modal-backdrop').on('click.dismiss.modal', $.proxy(this.hide, this));
        if (this.options.centerVertically) {
            this.centerVertically();
        }
        this.isShown   = null;
        this.$element.parent().on('click.dismiss.modal', $.proxy(this.hide, this));
        this.$element.on('click.dismiss.modal', function(e){
            e.stopPropagation();
        });
        $(element).on('click.switch.modal', '[data-switch="modal"]', function(e){
            that.switchHide(this, e);
        });
    };

    Modal.DEFAULTS = {
        keyboard: true,
        show: true,
        delayBackdrop: 150,
        delayModal: 300,
        centerVertically: false
    };

    Modal.prototype.toggle = function () {
        return this[!this.isShown ? 'show' : 'hide']();
    };

    Modal.prototype.show = function () {
        var that = this;
        var e    = $.Event('show.modal');

        this.$element.trigger(e);

        $('html').css('margin-right', that.scrollbarWidth() + 'px');

        if (this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = true;

        this.escape();

        this.$element.wrap('<div class="modal-wrapper" />');

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(document.body); // don't move modals dom position
            }


            that.delay(that.options.delayModal, function(){
                that.$element.show();

                if (transition) {
                    (function () {
                        return that.$element[0].offsetWidth; // force reflow
                    })();
                }

                that.delay(that.options.delayModal, function(){
                    that.$element
                        .addClass('in');
                }, 1);

                that.enforceFocus();

                if (transition) {
                    that.$element
                        .one($.support.transition.end, function () {
                            that.$element.focus().trigger('shown.modal');
                        })
                        .emulateTransitionEnd(that.options.delayModal);
                } else {
                    that.$element.focus().trigger('shown.modal');
                }
            });
        });
    };

    Modal.prototype.hide = function (e) {
        if (e) {
            e.preventDefault();
        }

        e = $.Event('hide.modal');

        this.$element.trigger(e);

        $('html').css('margin-right', '0');

        if (!this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = false;

        this.escape();

        $(document).off('focusin.modal');

        this.$element
            .removeClass('in');

        this.$element.unwrap();

        if ($.support.transition && this.$element.hasClass('fade')) {
            this.$element
                .one($.support.transition.end, $.proxy(this.hideModal, this))
                .emulateTransitionEnd(this.options.delayModal);
        } else {
            this.hideModal();
        }
    };

    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.modal') // guard against infinite focus loop
            .on('focusin.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.focus();
                }
            }, this));
    };

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup.dismiss.modal', $.proxy(function (e) {
                if (e.which === 27) {
                    this.hide();
                }
            }, this));
        } else if (!this.isShown) {
            this.$element.off('keyup.dismiss.modal');
        }
    };

    Modal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
            that.hideBackdrop();
            that.$element.trigger('hidden.modal');
        });
    };

    Modal.prototype.hideBackdrop = function () {
        if (this.$backdrop) {
            this.$backdrop.removeClass('in');
        }
    };

    Modal.prototype.backdrop = function (callback) {
        var that    = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.$backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$element.on('click', $.proxy(function (e) {
                if (e.target !== e.currentTarget) {
                    return;
                }
                this.hide.call(this);
            }, this));

            if (doAnimate) {
                (function () {
                    return that.$element[0].offsetWidth; // force reflow
                }());
            }

            this.$backdrop.show();
            this.delay(this.options.delayBackdrop, function(){
                that.$backdrop.addClass('in');
            }, 1);

            if (!callback) {
                return;
            }

            if (doAnimate) {
                this.$backdrop
                    .one($.support.transition.end, callback)
                    .emulateTransitionEnd(this.options.delayBackdrop);
            } else {
                callback();
            }

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            this.delay(this.options.delayBackdrop, function(){
                that.$backdrop.hide();
            });

            if ($.support.transition && this.$element.hasClass('fade')) {
                this.$backdrop
                    .one($.support.transition.end, callback)
                    .emulateTransitionEnd(this.options.delayBackdrop);
            } else {
                callback();
            }

        } else if (callback) {
            callback();
        }
    };

    Modal.prototype.scrollbarWidth = function() {
        // Create the measurement node
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'scrollbar-measure';
        document.body.appendChild(scrollDiv);

        // Get the scrollbar width
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        // Delete the DIV
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    };

    Modal.prototype.switchHide = function(btn, e) {
        var that = this;

        if (e) {
            e.preventDefault();
        }

        e = $.Event('switch.hide.modal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) {
            return;
        }

        this.isShown = false;

        this.$element.removeClass('in');

        this.delay(that.options.delayBackdrop, function(){
            that.$element.unwrap();
            that.$element.hide();

            modalClick(btn, e);
        });
    };

    Modal.prototype.delay = function(delay, callback, max) {
        if (typeof max === 'undefined') {
            max = null;
        }

        if (max > 0 && delay > max) {
            delay = 1;
        }

        if (delay > 0) {
            setTimeout(callback, delay);
        } else {
            callback();
        }
    };

    Modal.prototype.centerVertically = function() {
        var that = this;

        var cache = {
            defaultMarginTop: that.$element.css('margin-top'),
            defaultMarginBottom: that.$element.css('margin-bottom'),
            lastWindowHeight: $(window).height(),
            initModal: true
        }

        this.onModalInitAndResize(function(){
            var modalHeight = that.$element.height();
            var windowHeight = $(window).height();

            if (windowHeight === cache.lastWindowHeight && !cache.initModal) {
                return;
            }

            cache.initModal = false;

            if ((modalHeight + 2 * parseInt(cache.defaultMarginTop, 10)) < windowHeight) {
                var modalMarginTop = ((windowHeight - modalHeight) / 2) + 'px';
                var modalMarginBottom = '0px';

                that.$element.css({
                    marginTop: modalMarginTop,
                    marginBottom: modalMarginBottom
                });
            } else {
                that.$element.css({
                    marginTop: cache.defaultMarginTop,
                    marginBottom: cache.defaultMarginBottom
                });
            }
        });
    }

    Modal.prototype.onModalInitAndResize = function(callback) {
        callback();

        $(window).resize(function(){
            callback();
        });
    }

    var modalClick = function(that, e) {
        var $this   = $(that);
        var href    = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
        var option  = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data());

        e.preventDefault();

        $target
            .modal(option)
            .one('hide', function () {
                if ($this.is(':visible')) {
                    $this.focus();
                }
            });
    };


    // MODAL PLUGIN DEFINITION
    // =======================

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data('modal', (data = new Modal(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            } else if (options.show) {
                data.show();
            }
        });
    };

    $.fn.modal.Constructor = Modal;

    // MODAL DATA-API
    // ==============

    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        modalClick(this, e);
    });

    var $html = $('html')
        .on('shown.modal',  '.modal', function () { $html.addClass('modal-open'); })
        .on('hide.modal', '.modal', function () { $html.removeClass('modal-open'); })
        .on('show.modal',  '.modal', function () { $html.addClass('modal-open-plus-animation'); })
        .on('hidden.modal', '.modal', function () { $html.removeClass('modal-open-plus-animation'); });

}(window.jQuery));
