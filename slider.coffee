$ = jQuery

$.fn.extend
	Slider: (options) ->
		# Default Settings
		settings =
			speed: 500
			delay: 3000
			pause: true
			loop: true
			easing: 'ease'
			debug: false
			autoplay: true

		settings = $.extend settings, options

		log = (msg) ->
			console?.log msg if settings.debug

		return @each () ->
			
