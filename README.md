# Slider

A very simple jQuery slider.

## Using Slider

Include `slider.js` and `slider.css`. Or install with bower `$ bower install https://github.com/9miles/Slider`

HTML

``` html
<div class="slider">
	<div class="slider-items">
		<div class="slider-item">Slide 1</div>
		<div class="slider-item">Slide 2</div>
		<div class="slider-item">Slide 3</div>
	</div>
</div>
```

Javascript

``` javascript
$('.slider').slider();
```

## Dependencies

- [jQuery](http://jquery.com/)
- [Modernizr](http://modernizr.com/)

## Development

Slider is written in [Coffeescript](http://coffeescript.org/) which is compiled into Javascript via [Grunt](http://gruntjs.com/).

You must first install [Nodejs](http://nodejs.org/) in order to use [NPM](https://www.npmjs.org/) to get setup to develope this project.

1. Install Node
2. Clone the Slider repository
3. Install node dependencies with `$ npm install`
4. Install bower dependencies with `$ bower install`
5. Run grunt `$ grunt` to lint, compile, concat, build and watch
