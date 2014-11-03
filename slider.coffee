$ = jQuery

$.fn.extend
	slider: (method, parameters...) ->

		# Default Settings
		settings =
			width: 16
			height: 9
			delay: 3000
			autoplay: true
			pause: true
			pagination: true
			buttons: true
			looping: true
			arrowkeys: true

		# Methods
		switch method

			# Go
			when 'go'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					container = $this.find('.slider-items')
					target = parameters[0]
					callback = $this.data('callback')
					if target <= length
						if Modernizr.csstransforms and Modernizr.csstransitions
							container.css('transform', "translateX(-#{100 / length * (target-1)}%)")
						else
							container.css('left', "-#{100 * (target-1)}%")
						$this.data('position', target)
						$this.find(".slider-pagination li:nth-child(#{target})")
							.addClass('active')
							.siblings().removeClass('active')
						do callback(target)

			# Next
			when 'next'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					position = $this.data('position')

					if position < length
						$this.slider('go', position + 1)
					else if settings.looping
						$this.slider('go', 1)

			# Previous
			when 'prev' or 'previous'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					position = $this.data('position')

					if position > 1
						$this.slider('go', position - 1)
					else if settings.looping
						$this.slider('go', length)

			# Play
			when 'play'
				return @each () ->
					$this = $(@)
					delay = $this.data 'delay'
					$this.data('playing', setInterval ->
						$this.slider 'next'
					, delay)

			# Pause
			when 'pause'
				return @each () ->
					$this = $(@)
					clearInterval $this.data('playing')


			# Initialise
			else

				# Merge default settings with options.
				settings = $.extend settings, method

				return @each () ->
					$this = $(@)
					viewport = $this.find('.slider-viewport')
					container = $this.find('.slider-items')
					slide = $this.find('.slider-item')
					length = slide.length
					ratio = settings.height / settings.width * 100

					viewport.css
						'width': '100%'
						'padding-bottom': "#{ratio}%"

					container.css
						'width': "#{100*length}%"

					slide.css
						'width': "#{100/length}%"

					$this.data('length', length)
					$this.data('position', 1)
					$this.data('delay', settings.delay)
					$this.data('callback', parameters[0])

					# Pagination
					if settings.pagination
						$this.append "<ol class='slider-pagination'>"
						pagination = $this.find('.slider-pagination')
						pagination.append("<li>#{num}</li>") for num in [1..length]
						$this.find('.slider-pagination li:first-child').addClass('active')
						$this.find('.slider-pagination li').click ->
							$this.slider('go', $(@).index() + 1)

					# Buttons
					if settings.buttons
						viewport.append "<div class='slider-prev'>Prev</div>"
						viewport.append "<div class='slider-next'>Next</div>"

						$this.find('.slider-prev').click (event) ->
							do event.preventDefault
							$this.slider 'prev'

						$this.find('.slider-next').click (event) ->
							do event.preventDefault
							$this.slider 'next'

					# Autoplay
					if settings.autoplay
						$this.slider('play')

						if settings.pause
							$this.hover ->
								$this.slider('pause')
							, ->
								$this.slider('play')


					# Keyboard
					if settings.arrowkeys
						$(document).keydown (event) ->
							switch event.which
								when 39
									$this.slider('next')
								when 37
									$this.slider('prev')
