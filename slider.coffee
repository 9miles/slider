$ = jQuery

$.fn.extend
	slider: (options, target) ->

		# Default Settings
		settings =
			width: 16
			height: 9

		# Methods
		switch options

			# Go
			when 'go'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					container = $this.find('.slider-items')
					if target <= length
						if Modernizr.csstransforms and Modernizr.csstransitions
							container.css('transform', "translateX(-#{100 / length * (target-1)}%)")
						else
							container.css('left', "-#{100 * (target-1)}%")
						$this.data('position', target)

			# Next
			when 'next'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					position = $this.data('position')

					if position < length
						$this.slider('go', position + 1)
					else
						$this.slider('go', 1)

			# Previous
			when 'prev' or 'previous'
				return @each () ->
					$this = $(@)
					length = $this.data('length')
					position = $this.data('position')

					if position > 1
						$this.slider('go', position - 1)
					else
						$this.slider('go', length)


			# Initialise
			else

				# Merge default settings with options.
				settings = $.extend settings, options

				return @each () ->
					$this = $(@)
					container = $this.find('.slider-items')
					slide = $this.find('.slider-item')
					length = slide.length
					ratio = settings.height / settings.width * 100

					$this.css
						'width': '100%'
						'padding-bottom': "#{ratio}%"

					container.css
						'width': "#{100*length}%"

					slide.css
						'width': "#{100/length}%"

					$this.data('length', length)
					$this.data('position', 1)
