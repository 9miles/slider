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

			$this = $(@)

			position = 1
			list = $this.find('ul')
			items = $this.find('ul li')
			slides = items.length

			items.css('width', "#{100/slides}%")

			list.css('width', "#{100*slides}%")

			next = ->
				if position < slides then position = position + 1 else position = 1
				list.css('left', "-#{100 * (position-1)}%")

			prev = ->
				if position = 1 then position = slides else position = position - 1
				list.css('left', "-#{100 * (position-1)}%")

			$this.click (event) ->
				do event.preventDefault
				do next
