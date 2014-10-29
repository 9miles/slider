(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    slider: function(options) {
      var log, settings;
      settings = {
        debug: true,
        delay: 3000,
        autoplay: true,
        width: 16,
        height: 9
      };
      if (typeof options === 'object') {
        settings = $.extend(settings, options);
      } else if (options === 'next') {
        next();
      } else if (options === 'prev' || options === 'previous') {
        prev();
      }
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      return this.each(function() {
        var $this, container, go, length, next, position, prev, ratio, slide;
        $this = $(this);
        container = $this.find('.slider-items');
        slide = $this.find('.slider-item');
        length = slide.length;
        ratio = settings.height / settings.width * 100;
        position = 1;
        $this.css({
          'width': '100%',
          'padding-bottom': "" + ratio + "%"
        });
        container.css({
          'width': "" + (100 * length) + "%"
        });
        slide.css({
          'width': "" + (100 / length) + "%"
        });
        go = function(target) {
          if (target <= length) {
            if (Modernizr.csstransforms && Modernizr.csstransitions) {
              container.css('transform', "translateX(-" + (100 / length * (target - 1)) + "%)");
            } else {
              container.animate('left', "-" + (100 * (target - 1)) + "%");
            }
            return position = target;
          }
        };
        next = function() {
          if (position < length) {
            return go(position + 1);
          } else {
            return go(1);
          }
        };
        prev = function() {
          if (position > 1) {
            return go(position - 1);
          } else {
            return go(length);
          }
        };
        $this.click(function(event) {
          event.preventDefault();
          return next();
        });
        if (settings.autoplay) {
          return setInterval(function() {
            return next();
          }, settings.delay);
        }
      });
    }
  });

}).call(this);
