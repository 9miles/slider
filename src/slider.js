(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    slider: function(options, target) {
      var settings;
      settings = {
        delay: 3000,
        autoplay: true,
        width: 16,
        height: 9
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
                container.animate('left', "-" + (100 * (target - 1)) + "%");
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
        default:
          settings = $.extend(settings, options);
          return this.each(function() {
            var $this, container, length, position, ratio, slide;
            $this = $(this);
            container = $this.find('.slider-items');
            slide = $this.find('.slider-item');
            length = slide.length;
            $this.data('length', length);
            ratio = settings.height / settings.width * 100;
            position = 1;
            $this.data('position', position);
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
            $this.click(function(event) {
              event.preventDefault();
              return $this.slider('next');
            });
            if (settings.autoplay) {
              return setInterval(function() {
                return $this.slider('next');
              }, settings.delay);
            }
          });
      }
    }
  });

}).call(this);
