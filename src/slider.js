(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    slider: function(options, target) {
      var settings;
      settings = {
        width: 16,
        height: 9,
        delay: 3000,
        autoplay: true,
        pause: true
      };
      switch (options) {
        case 'go':
          return this.each(function() {
            var $this, container, length;
            $this = $(this);
            length = $this.data('length');
            container = $this.find('.slider-items');
            if (target <= length) {
              if (Modernizr.csstransforms && Modernizr.csstransitions) {
                container.css('transform', "translateX(-" + (100 / length * (target - 1)) + "%)");
              } else {
                container.css('left', "-" + (100 * (target - 1)) + "%");
              }
              return $this.data('position', target);
            }
          });
        case 'next':
          return this.each(function() {
            var $this, length, position;
            $this = $(this);
            length = $this.data('length');
            position = $this.data('position');
            if (position < length) {
              return $this.slider('go', position + 1);
            } else {
              return $this.slider('go', 1);
            }
          });
        case 'prev' || 'previous':
          return this.each(function() {
            var $this, length, position;
            $this = $(this);
            length = $this.data('length');
            position = $this.data('position');
            if (position > 1) {
              return $this.slider('go', position - 1);
            } else {
              return $this.slider('go', length);
            }
          });
        case 'play':
          return this.each(function() {
            var $this, delay;
            $this = $(this);
            delay = $this.data('delay');
            return $this.data('playing', setInterval(function() {
              return $this.slider('next');
            }, delay));
          });
        case 'pause':
          return this.each(function() {
            var $this;
            $this = $(this);
            return clearInterval($this.data('playing'));
          });
        default:
          settings = $.extend(settings, options);
          return this.each(function() {
            var $this, container, length, ratio, slide;
            $this = $(this);
            container = $this.find('.slider-items');
            slide = $this.find('.slider-item');
            length = slide.length;
            ratio = settings.height / settings.width * 100;
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
            $this.data('length', length);
            $this.data('position', 1);
            $this.data('delay', settings.delay);
            if (settings.autoplay) {
              $this.slider('play');
              if (settings.pause) {
                return $this.hover(function() {
                  return $this.slider('pause');
                }, function() {
                  return $this.slider('play');
                });
              }
            }
          });
      }
    }
  });

}).call(this);
