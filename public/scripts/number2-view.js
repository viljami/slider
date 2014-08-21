define([
	'backbone',
	'underscore'
], function(
	Backbone,
	_
){
	var toInt = function(n){
		return parseInt(n, 10);
	};

	return Backbone.View.extend({
		timePassed: 0,
		current: 0,
		start: 0,
		end: 0,
		difference: 0,
		duration: 300,
		step: 1000 / 60,
		timeoutID: undefined,

		initialize: function(){			
			this.model.on('change', this.render.bind(this));
		},

		render: function(){
			var activeYear = this.model.get('activeYear');
			this.start = this.current;
			this.end = this.model.getValueByYear(activeYear);
			this.difference = this.end - this.start;
			this.timePassed = 0;
			this.clearTimeout();
			this.timeoutID = setTimeout(this.stepper.bind(this), this.step);
		},

		clearTimeout: function(){
			if (this.timeoutID) clearTimeout(this.timeoutID);
		},

		stepper: function(){
			this.timePassed += this.step;

			this.current = Math.round(this.easeInCubic(
				this.timePassed,
				this.start,
				this.difference,
				this.duration
			));

			this.clearTimeout();
			if (this.current !== this.end) setTimeout(this.stepper.bind(this), this.step);

			var formatted = ('' + this.current).split('');
			for (var i = formatted.length - 3; i > 0; i -= 3){
				formatted.splice(i, 0, ',');
			}

			this.$el.text(formatted.join(''));
		},

		/*
			t - current time
			b - start value
			c - change in value
			d - duration

			Source: http://gizma.com/easing/#quad3
		*/
		easeInCubic: function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		}
	});
});