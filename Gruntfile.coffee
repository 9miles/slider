module.exports = (grunt) ->

    'use strict'

    require('load-grunt-tasks')(grunt)

    debug = !!grunt.option('debug')

    grunt.initConfig
	
