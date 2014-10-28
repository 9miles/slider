$ = jQuery

$.fn.extend
	slider: (options) ->
		# Default Settings
		settings =
			debug: true
			delay: 3000
			autoplay: true
			width: 16
			height: 9
			start: 1

		settings = $.extend settings, options

		log = (msg) ->
			console?.log msg if settings.debug

		return @each () ->

			$this = $(@)

			container = $this.find('ul')
			slide = $this.find('ul li')
			length = slide.length
			ratio = settings.height / settings.width * 100

			if settings.start <= length then position = settings.start else position = 1

			$this.css
				'width': '100%'
				'overflow': 'hidden'
				'height': 0
				'padding-bottom': "#{ratio}%"
				'position': 'relative'

			container.css
				'width': "#{100*length}%"
				'height': '100%'
				'position': 'absolute'
				'transition': '.4s ease all'

			slide.css
				'width': "#{100/length}%"
				'height': '100%'
				'display': 'block'
				'float': 'left'

			go = (target) ->
				if target <= length

					if Modernizr.csstransforms and Modernizr.csstransitions
						container.css('transform', "translateX(-#{100 / length * (target-1)}%)")
					else
						container.animate('left', "-#{100 * (target-1)}%")

					position = target

			next = ->
				if position < length then go position + 1 else go 1

			prev = ->
				if position > 1 then go position - 1 else go length

			# Temporary measure to run the next function on click
			$this.click (event) ->
				do event.preventDefault
				do prev

			# Autoplay
			if settings.autoplay
				setInterval ->
					do next
				, settings.delay
