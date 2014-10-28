(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    slider: function(options) {
      var log, settings;
      settings = {
        debug: true,
        delay: 3000,
        autoplay: true
      };
      settings = $.extend(settings, options);
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      return this.each(function() {
        var $this, items, list, next, position, slides;
        $this = $(this);
        position = 1;
        list = $this.find('ul');
        items = $this.find('ul li');
        slides = items.length;
        items.css('width', "" + (100 / slides) + "%");
        list.css('width', "" + (100 * slides) + "%");
        next = function() {
          if (position < slides) {
            position = position + 1;
          } else {
            position = 1;
          }
          if (Modernizr.csstransforms && Modernizr.csstransitions) {
            return list.css('transform', "translateX(-" + (100 / slides * (position - 1)) + "%)");
          } else {
            return list.animate('left', "-" + (100 * (position - 1)) + "%");
          }
        };
        return $this.click(function(event) {
          event.preventDefault();
          return next();
        });
      });
    }
  });

}).call(this);
