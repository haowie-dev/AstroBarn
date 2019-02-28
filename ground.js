//mixin for the ground. basic shape is there, need to add: 
//	> TODO: add texture to dirt
//	> TODO: random spots of grass that are growing in patches in dirt

let groundMixin = {


	draw_floor(graphics_state, m){
		//top horizontal bar
	    this.shapes.square.draw(
	      graphics_state,
	      m.times(Mat4.translation(Vec.of(0,-20,0))
	        .times(Mat4.rotation(3.14,Vec.of(0, 1, 1)))
	        .times(Mat4.scale(Vec.of(600, 600, 600)))),

	      this.plastic.override({color: this.ground_color}));
	}

};