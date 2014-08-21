define([
	'backbone'
], function(
	Backbone
){
	return Backbone.Model.extend({

		defaults: {
			years: [],
			activeYear: 0
		},

		initialize: function(data){
			this.set('activeYear', data.years[0].year);
		},

		getMinYear: function(){ return this.get('years')[0].year; },

		getMaxYear: function(){ 
			var years = this.get('years');
			return years[years.length - 1].year;
		},

		getValueByYear: function(year){
			var years = this.get('years');
			var diff = year - years[0].year;
			return years[diff].value;
		}
	});
})