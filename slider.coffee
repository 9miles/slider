$ = jQuery

$.fn.extend
	slider: (options) ->
		# Default Settings
		settings =
			debug: true
			delay: 3000
			autoplay: true

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

				if Modernizr.csstransforms and Modernizr.csstransitions
					list.css('transform', "translateX(-#{100 / slides * (position-1)}%)")
				else
					list.animate('left', "-#{100 * (position-1)}%")

			$this.click (event) ->
				do event.preventDefault
				do next
