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

		if typeof options == 'object'
			settings = $.extend settings, options
		else if options == 'next'
			do next
		else if options == 'prev' or options == 'previous'
			do prev

		log = (msg) ->
			console?.log msg if settings.debug

		return @each () ->

			$this = $(@)
			container = $this.find('.slider-items')
			slide = $this.find('.slider-item')
			length = slide.length
			ratio = settings.height / settings.width * 100
			position = 1

			$this.css
				'width': '100%'
				'padding-bottom': "#{ratio}%"

			container.css
				'width': "#{100*length}%"

			slide.css
				'width': "#{100/length}%"

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
				do next

			# Autoplay
			if settings.autoplay
				setInterval ->
					do next
				, settings.delay
