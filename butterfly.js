let ButterflyMixin = {
    draw_butterfly(m, graphics_state) {
        this.draw_butterfly_body(graphics_state, m); // draw the thorax, head, and abdomen

        // draw wing on each side 
        this.draw_butterfly_wing(graphics_state, m, -1);
        this.draw_butterfly_wing(graphics_state, m, 1);

        // draw legs on each side
        this.draw_butterfly_leg(graphics_state, m, 1);
        this.draw_butterfly_leg(graphics_state, m, -1);

        // draw antennae on each side
        this.draw_butterfly_antennae(graphics_state, m, 1);
        this.draw_butterfly_antennae(graphics_state, m, -1);
    },

    draw_butterfly_body(graphics_state, m) {
        this.shapes.box.draw( // thorax
            graphics_state,
            m.times(Mat4.scale(Vec.of(8,2,2))),
            this.plastic.override({color: this.blue }));
        this.shapes.ball.draw( // head
            graphics_state,
            m.times(Mat4.translation(Vec.of(-12, 0, 0))) // translate to end of thorax
             .times(Mat4.scale(4)), // scale to correct size
            this.plastic.override({color: this.dark_blue }));
        this.shapes.ball.draw( // abdomen
            graphics_state,
            m.times(Mat4.translation(Vec.of(12.5, 0, 0))) // translate to end of thorax
             .times(Mat4.scale(Vec.of(4.5, 2, 2))), // scale to correct size
            this.plastic.override({color: this.dark_blue }));
    },

    draw_butterfly_wing (graphics_state, m, side) {
        const deg = side * 0.7 * Math.sin(4 * this.t)
        this.shapes.triangular_prism.draw( // triangle part
            graphics_state,
            m.times(Mat4.translation(Vec.of(0,2 ,side * 2))) // align wing with thorax
             .times(Mat4.rotation(deg, Vec.of(1,0,0))) // apply flapping transformation through x axis
             .times(Mat4.rotation(side*-Math.PI/2, Vec.of(1,0,0))) // rotation to align hypotenuse with x axis
             .times(Mat4.rotation(Math.PI/4, Vec.of(0, 0, 1))) // rotation to align rotation axis in xz plane
             .times(Mat4.translation(Vec.of(-(1/2)*8*Math.sqrt(2), -(1/2)*8*Math.sqrt(2), side*.1))) // translate so rotation axis (hypotenuse of triangle) passes through origin
             .times(Mat4.scale(Vec.of(8*Math.sqrt(2), 8*Math.sqrt(2), .1))), // scale the prism to be wing shaped
            this.plastic.override({color:this.green}));
        this.shapes.box.draw( // larger square on the thorax, closer to the head
            graphics_state,
            m
             .times(Mat4.translation(Vec.of(-8,2,side * 2)))
             .times(Mat4.rotation(deg, Vec.of(1,0,0))) // apply flapping transformation through x axis
             .times(Mat4.rotation(Math.PI/4, Vec.of(0,side * 1,0))) // rotate around y axis
             .times(Mat4.translation(Vec.of(-8, .1, side*8))) // translate point of rotation to the origin
             .times(Mat4.scale(Vec.of(8,0.1,8))) // scale the box to correct size
            ,
            this.plastic.override({color: this.dark_blue}));
        this.shapes.box.draw( // smaller square on the thorax, closer to the abdomen
            graphics_state,
            m
             .times(Mat4.translation(Vec.of(8,2,side * 2)))
             .times(Mat4.rotation(deg, Vec.of(1,0,0))) // apply flapping transformation through x axis
             .times(Mat4.rotation(Math.PI/4, Vec.of(0,side * 1,0))) // rotate around y axis
             .times(Mat4.translation(Vec.of(-4*Math.sqrt(2), .1, side*4*Math.sqrt(2)))) // translate point of rotation to the origin
             .times(Mat4.scale(Vec.of(4*Math.sqrt(2),0.1,4*Math.sqrt(2)))) // scale the box to correct size
            ,
            this.plastic.override({color: this.blue}));
    },

     draw_butterfly_leg (graphics_state, m, side) {
         const deg = 1 + Math.sin(this.t);
         let m_backup = m; // save current m 
         for (var i = -1; i < 2; ++i){ // loop iterates through the three legs on one side
            m = m_backup; // reset m to initial m 
            m = m.times(Mat4.translation(Vec.of(i * 4, -2, side * 2))) // translate to thorax edge... x translation depends on which leg (-1,0,1)
                 .times(Mat4.rotation( -0.18 * side * deg, Vec.of(1,0,0))) // apply rotation through x axis
                 .times(Mat4.translation(Vec.of(0, -2, side * 0.4))) // translate axis of rotation to the origin
            this.shapes.box.draw( // main leg section
                graphics_state,
                m.times(Mat4.scale(Vec.of(.4, 2, .4))), // scale to correct leg size
                this.plastic.override({color:this.green}));
            m = m.times(Mat4.translation(Vec.of(0, -2, side * -.4))) // translate to other leg part's edge
                 .times(Mat4.rotation(.36 * side * deg, Vec.of(1,0,0))) // apply rotation through x axis
                 .times(Mat4.translation(Vec.of(0, -2, side*0.4))) // translate axis of rotation 
             this.shapes.box.draw(
                graphics_state,
                m.times(Mat4.scale(Vec.of(.4, 2, .4))), // scale to correct leg size
                this.plastic.override({color:this.dark_blue})
             )
             if (this.feet){
                 this.shapes.box.draw(
                    graphics_state,
                    m.times(Mat4.translation(Vec.of(0, -2.3, side*.2)))
                     .times(Mat4.scale(Vec.of(.5, .3, .7))),
                    this.plastic.override({color:this.green})
                 )
             }
         }
     },

    draw_butterfly_antennae(graphics_state, m, side) {
        m = m.times(Mat4.translation(Vec.of(-12,0,0))) // translate to middle of head
             .times(Mat4.rotation(Math.PI/11, Vec.of(0,side * 1,0))) // rotate around y axis to point left/right ish
             .times(Mat4.rotation(Math.PI/3, Vec.of(0,0,1))) // rotate around z axis to point forward ish
             .times(Mat4.translation(Vec.of(0,4.4,0))) // translate to corner of head
        this.shapes.box.draw( // draw starting box
                graphics_state,
                m.times(Mat4.scale(0.4)), // scale box to correct size
                this.plastic.override({color:this.green}));
        const deg = -.065 * (1 + Math.sin(this.t));
        for (var i = 0; i < 8; ++i) {
            m = m.times(Mat4.translation(Vec.of(-.4, .4,0))) // translate to hinge on previous box
                 .times(Mat4.rotation(deg,Vec.of(0,0, -1))) // apply rotation animation
                 .times(Mat4.translation(Vec.of(.4, .4,0))); // move axis of rotation to origin
            this.shapes.box.draw(
                graphics_state,
                m.times(Mat4.scale(0.4)), // scale box to correct size
                this.plastic.override({color:this.green}));
        }
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(0,1.4,0))),
            this.plastic.override({color: this.dark_blue}));               
    }
}