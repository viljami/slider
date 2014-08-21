requirejs.config({
	paths: {
		'jquery': '../vendor/jquery.min',
		'jquery-ui': '../vendor/jquery-ui/jquery-ui.min',
		'underscore': '../vendor/lodash.min' ,
		'backbone': '../vendor/backbone.min',
		'tween': '../vendor/tween.min',
		'easel': '../vendor/easeljs.min'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
        	exports: '$'
        },
        'tween': {
        	deps: ['easel'],
        	exports: 'TWEEN'
        }
	}
});

requirejs([
	'backbone',
	'jquery',
	'data-model',
	'scroller-view',
	// 'number-view',
	'number2-view',
	'background-view'
], function(
	Backbone,
	$,
	DataModel,
	ScrollerView,
	// NumberView,
	NumberView2,
	BackgroundView
){
	$.ajax('data/years.json')
	.then(function(data){
		var dataModel = new DataModel({
			years: data
		});

		var scrollerView = new ScrollerView({
			el: '.scroller',
			model: dataModel
		});

		// var numberView = new NumberView({
		// 	el: '.numbers',
		// 	model: dataModel
		// });

		var numberView2 = new NumberView2({
			el: '.numbers',
			model: dataModel
		});

		var backgroundView = new BackgroundView({ 
			el: '.scenery',
			model: dataModel
		});

		scrollerView.render();

		// numberView.render();
		numberView2.render();
		backgroundView.render();
	})
	.fail(function(){ console.log(arguments); });
	
});