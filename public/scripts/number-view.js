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

	var isBucketEqual = function(a1, a2){
		if (a1.length != a2.length) return false;

		for (var i = 0; i < a1.length; i++) {
			if (a1[i] != a2[i]) return false;
		};

		return true;
	};

	return Backbone.View.extend({
		number: '',
		numbers: [],
		currentNumbers: [],
		timeoutID: undefined,

		initialize: function(){			
			this.model.on('change', this.render.bind(this));
		},

		render: function(){
			var activeYear = this.model.get('activeYear');
			this.number = '' + this.model.getValueByYear(activeYear);
			this.numbers = this.number.split('').map(toInt);

			this.clearTimeout();
			this.timeoutID = setTimeout(this.stepper.bind(this), this.getStep());
		},

		getStep: function(){
			return 70;
		},

		clearTimeout: function(){
			if (this.timeoutID) clearTimeout(this.timeoutID);
		},

		stepper: function(){
			// add extra number
			if (this.currentNumbers.length < this.numbers.length){
				this.currentNumbers.unshift(0);
			} else if (this.currentNumbers.length > this.numbers.length){
				this.currentNumbers.shift();
			}

			// increment number
			for (var i = this.currentNumbers.length - 1; i >= 0; i--){
				if (this.numbers[i] > this.currentNumbers[i]){
					this.currentNumbers[i]++;
				} else if (this.numbers[i] < this.currentNumbers[i]){
					this.currentNumbers[i]--;
				}
			};

			this.clearTimeout();
			if (! isBucketEqual(this.numbers, this.currentNumbers)){
				setTimeout(this.stepper.bind(this), this.getStep());
			}

			var formatted = _.clone(this.currentNumbers);
			for (var i = formatted.length - 3; i > 0; i -= 3){
				formatted.splice(i, 0, ',');
			}

			this.$el.text(formatted.join(''));
		}
	});
});