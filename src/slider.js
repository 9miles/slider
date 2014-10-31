(function() {
  var $,
    __slice = [].slice;

  $ = jQuery;

  $.fn.extend({
    slider: function() {
      var method, parameters, settings;
      method = arguments[0], parameters = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      settings = {
        width: 16,
        height: 9,
        delay: 3000,
        autoplay: true,
        pause: true,
        pagination: true,
        buttons: true,
        looping: true,
        arrowkeys: true
      };
      switch (method) {
        case 'go':
          return this.each(function() {
            var $this, container, length, target;
            $this = $(this);
            length = $this.data('length');
            container = $this.find('.slider-items');
            target = parameters[0];
            if (target <= length) {
              if (Modernizr.csstransforms && Modernizr.csstransitions) {
                container.css('transform', "translateX(-" + (100 / length * (target - 1)) + "%)");
              } else {
                container.css('left', "-" + (100 * (target - 1)) + "%");
              }
              $this.data('position', target);
              return $this.find(".slider-pagination li:nth-child(" + target + ")").addClass('active').siblings().removeClass('active');
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
            } else if (settings.looping) {
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
            } else if (settings.looping) {
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
          settings = $.extend(settings, method);
          return this.each(function() {
            var $this, container, length, num, pagination, ratio, slide, viewport, _i;
            $this = $(this);
            viewport = $this.find('.slider-viewport');
            container = $this.find('.slider-items');
            slide = $this.find('.slider-item');
            length = slide.length;
            ratio = settings.height / settings.width * 100;
            viewport.css({
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
            if (settings.pagination) {
              $this.append("<ol class='slider-pagination'>");
              pagination = $this.find('.slider-pagination');
              for (num = _i = 1; 1 <= length ? _i <= length : _i >= length; num = 1 <= length ? ++_i : --_i) {
                pagination.append("<li>" + num + "</li>");
              }
              $this.find('.slider-pagination li:first-child').addClass('active');
              $this.find('.slider-pagination li').click(function() {
                return $this.slider('go', $(this).index() + 1);
              });
            }
            if (settings.buttons) {
              viewport.append("<div class='slider-prev'>Prev</div>");
              viewport.append("<div class='slider-next'>Next</div>");
              $this.find('.slider-prev').click(function(event) {
                event.preventDefault();
                return $this.slider('prev');
              });
              $this.find('.slider-next').click(function(event) {
                event.preventDefault();
                return $this.slider('next');
              });
            }
            if (settings.autoplay) {
              $this.slider('play');
              if (settings.pause) {
                $this.hover(function() {
                  return $this.slider('pause');
                }, function() {
                  return $this.slider('play');
                });
              }
            }
            if (arrowkeys) {
              return $(document).keydown(function(event) {
                switch (event.which) {
                  case 39:
                    return $this.slider('next');
                  case 37:
                    return $this.slider('prev');
                }
              });
            }
          });
      }
    }
  });

}).call(this);
