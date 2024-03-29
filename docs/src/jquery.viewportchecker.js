(function($) {
    $.fn.viewportChecker = function(useroptions) {
        var options = {
            classToAdd: 'visible',
            classToRemove: 'invisible',
            classToAddForFullView: 'full-visible',
            removeClassAfterAnimation: false,
            offset: 100,
            repeat: false,
            invertBottomOffset: true,
            callbackFunction: function(elem, action) {},
            scrollHorizontal: false,
            scrollBox: window
        };
        $.extend(options, useroptions);
        var $elem = this,
            boxSize = {
                height: $(options.scrollBox).height(),
                width: $(options.scrollBox).width()
            };
        this.checkElements = function() {
            var viewportStart, viewportEnd;
            if (!options.scrollHorizontal) {
                viewportStart = Math.max($('html').scrollTop(), $('body').scrollTop(), $(window).scrollTop());
                viewportEnd = (viewportStart + boxSize.height);
            } else {
                viewportStart = Math.max($('html').scrollLeft(), $('body').scrollLeft(), $(window).scrollLeft());
                viewportEnd = (viewportStart + boxSize.width);
            }
            $elem.each(function() {
                var $obj = $(this),
                    objOptions = {},
                    attrOptions = {};
                if ($obj.data('vp-add-class'))
                    attrOptions.classToAdd = $obj.data('vp-add-class');
                if ($obj.data('vp-remove-class'))
                    attrOptions.classToRemove = $obj.data('vp-remove-class');
                if ($obj.data('vp-add-class-full-view'))
                    attrOptions.classToAddForFullView = $obj.data('vp-add-class-full-view');
                if ($obj.data('vp-keep-add-class'))
                    attrOptions.removeClassAfterAnimation = $obj.data('vp-remove-after-animation');
                if ($obj.data('vp-offset'))
                    attrOptions.offset = $obj.data('vp-offset');
                if ($obj.data('vp-repeat'))
                    attrOptions.repeat = $obj.data('vp-repeat');
                if ($obj.data('vp-scrollHorizontal'))
                    attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
                if ($obj.data('vp-invertBottomOffset'))
                    attrOptions.scrollHorizontal = $obj.data('vp-invertBottomOffset');
                $.extend(objOptions, options);
                $.extend(objOptions, attrOptions);
                if ($obj.data('vp-animated') && !objOptions.repeat) {
                    return;
                }
                if (String(objOptions.offset).indexOf("%") > 0)
                    objOptions.offset = (parseInt(objOptions.offset) / 100) * boxSize.height;
                var rawStart = (!objOptions.scrollHorizontal) ? $obj.offset().top : $obj.offset().left,
                    rawEnd = (!objOptions.scrollHorizontal) ? rawStart + $obj.height() : rawStart + $obj.width();
                var elemStart = Math.round(rawStart) + objOptions.offset,
                    elemEnd = (!objOptions.scrollHorizontal) ? elemStart + $obj.height() : elemStart + $obj.width();
                if (objOptions.invertBottomOffset)
                    elemEnd -= (objOptions.offset * 2);
                if ((elemStart < viewportEnd) && (elemEnd > viewportStart)) {
                    $obj.removeClass(objOptions.classToRemove);
                    $obj.addClass(objOptions.classToAdd);
                    objOptions.callbackFunction($obj, "add");
                    if (rawEnd <= viewportEnd && rawStart >= viewportStart)
                        $obj.addClass(objOptions.classToAddForFullView);
                    else
                        $obj.removeClass(objOptions.classToAddForFullView);
                    $obj.data('vp-animated', true);
                    if (objOptions.removeClassAfterAnimation) {
                        $obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $obj.removeClass(objOptions.classToAdd);
                        });
                    }
                } else if ($obj.hasClass(objOptions.classToAdd) && (objOptions.repeat)) {
                    $obj.removeClass(objOptions.classToAdd + " " + objOptions.classToAddForFullView);
                    objOptions.callbackFunction($obj, "remove");
                    $obj.data('vp-animated', false);
                }
            });
        };
        if ('ontouchstart' in window || 'onmsgesturechange' in window) {
            $(document).bind("touchmove MSPointerMove pointermove", this.checkElements);
        }
        $(options.scrollBox).bind("load scroll", this.checkElements);
        $(window).resize(function(e) {
            boxSize = {
                height: $(options.scrollBox).height(),
                width: $(options.scrollBox).width()
            };
            $elem.checkElements();
        });
        this.checkElements();
        return this;
    };
})(jQuery);