module.exports = (grunt) ->

	'use strict'

	require('load-grunt-tasks')(grunt)

	debug = !!grunt.option('debug')

	grunt.initConfig

		bower_concat:
			all:
				dest: 'demo/_bower.js'
				cssDest: 'demo/_bower.css'

		coffeelint:
			options:
				'no_tabs':
					'level': 'ignore'
				'prefer_english_operator':
					'level': 'warn'
				'indentation':
					'value': 1
			app: ['*.coffee']

		coffee:
			compile:
				files:
					'src/slider.js': 'slider.coffee'

		uglify:
			options:
				mangle: false
			my_target:
				files:
					"src/slider.min.js": ['src/slider.js']

		watch:
			options:
				livereload: true
			coffee:
				files: '*.coffee'
				tasks: ['coffeelint', 'coffee', 'uglify']

	grunt.registerTask 'default', ['coffeelint', 'coffee', 'uglify', 'watch']
