$ = jQuery

$.fn.extend
	slider: (options) ->
		# Default Settings
		settings =
			animation: 'slide'
			speed: 500
			delay: 3000
			pause: true
			loop: true
			easing: 'ease'
			debug: true
			autoplay: true
			nextClass: 'slider-next'
			prevClass: 'slider-prev'

		settings = $.extend settings, options

		log = (msg) ->
			console?.log msg if settings.debug

		return @each () ->
			slides = 0

			$this = $(@)

			$this.find('li').each ->
				slides = slides + 1

			$this.find('li').css(
				"width": "#{100/slides}%"
			)

			$this.find('ul').css(
				"width": "#{100*slides}%"
			)
