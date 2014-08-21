define([
	'backbone',
	'underscore',
	'jquery-ui'
], function(
	Backbone,
	_
){
	
	return Backbone.View.extend({
		ration: 1,

		initialize: function(){
			this.$handle = this.$el.find('.ui-slider-handle');

			var isDown = false;
			this.$handle.on('mousedown', function(){
				isDown = true;
			});

			$('body').on('mousemove', function(e){
				if (! isDown) return;
				// prevent selecting text
				e.preventDefault(); 

				var offset = this.$handle.offset();
				var halfHandleWidth = this.$handle.width() / 2;
				var parentOffset = this.$el.offset();
				var leftMost = parentOffset.left - halfHandleWidth;
				var rightMost = parentOffset.left + this.$el.width() - halfHandleWidth;
				
				offset.left = e.clientX - halfHandleWidth;
				if(offset.left < leftMost) offset.left = leftMost;
				if(offset.left > rightMost) offset.left = rightMost;
				
				this.$handle.offset(offset);

				this.model.set('activeYear', this.getPositionValue().year);
			}.bind(this));

			$('body').on('mouseup', function(){
				isDown = false;
			});
		},

		getPositionValue: function(){
			var parentLeft = this.$el.offset().left;
			var x = this.$handle.offset().left - parentLeft;
			var w = this.$el.width();
			var items = this.model.get('years');
			this.ration = x / w;
			var index = Math.round(this.ration * items.length);
			index = index < 0 ? 0 : index > items.length ? items.length : index;
			return items[index];
		},

		render: function(){

			// this.$el.slider({
			// 	min: this.model.getMinYear(),
			// 	max: this.model.getMaxYear(),
			// 	// step: 1,
			// 	// animate: true,
			// 	start: function(){},
			// 	stop: function(){},
			// 	slide: function(event, data){
			// 		this.model.set('activeYear', data.value);
			// 	}.bind(this)
			// });
		}
	});
})