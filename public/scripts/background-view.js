define([
	'backbone',
	'tween'
], function(
	Backbone,
	TWEEN
){
	return Backbone.View.extend({
		style: { opacity: 1 },

		tween: undefined,

		initialize: function(){
			this.model.on('change', this.render.bind(this))
		},

		render: function(){
			// var years = this.model.get('years');
			// var maxYear = years[years.length - 1].year;
			// var activeYear = this.model.get('activeYear');

			// var toStyle = { opacity: (maxYear - activeYear) / (maxYear - years[0].year) + 0.4};

			// this.$el.animate(toStyle, 100);
		}
	});
});