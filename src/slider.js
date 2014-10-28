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
        height: 9,
        start: 1
      };
      settings = $.extend(settings, options);
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      return this.each(function() {
        var $this, container, length, next, position, ratio, slides;
        $this = $(this);
        container = $this.find('ul');
        slides = $this.find('ul li');
        length = slides.length;
        ratio = settings.height / settings.width * 100;
        if (settings.start <= length) {
          position = settings.start;
        } else {
          position = 1;
        }
        $this.css({
          'width': '100%',
          'overflow': 'hidden',
          'height': 0,
          'padding-bottom': "" + ratio + "%",
          'position': 'relative'
        });
        container.css({
          'width': "" + (100 * length) + "%",
          'height': '100%',
          'position': 'absolute',
          'transition': '.4s ease all'
        });
        slides.css({
          'width': "" + (100 / length) + "%",
          'height': '100%',
          'display': 'block',
          'float': 'left'
        });
        next = function() {
          if (position < length) {
            position = position + 1;
          } else {
            position = 1;
          }
          if (Modernizr.csstransforms && Modernizr.csstransitions) {
            return container.css('transform', "translateX(-" + (100 / length * (position - 1)) + "%)");
          } else {
            return container.animate('left', "-" + (100 * (position - 1)) + "%");
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
