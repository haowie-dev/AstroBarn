class Assignment_Two_Skeleton extends Scene_Component {
    // The scene begins by requesting the camera, shapes, and materials it will need.
    constructor(context, control_box) {
        super(context, control_box);

        // First, include a secondary Scene that provides movement controls:
        if(!context.globals.has_controls)
            context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));
        // Locate the camera here (inverted matrix).
        const r = context.width / context.height;
        context.globals.graphics_state.camera_transform = Mat4.translation([0, 0, -35]);
        context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);

        // At the beginning of our program, load one of each of these shape
        // definitions onto the GPU.  NOTE:  Only do this ONCE per shape
        // design.  Once you've told the GPU what the design of a cube is,
        // it would be redundant to tell it again.  You should just re-use
        // the one called "box" more than once in display() to draw
        // multiple cubes.  Don't define more than one blueprint for the
        // same thing here.
        const shapes = {
            'square': new Square(),
            'circle': new Circle(15),
            'pyramid': new Tetrahedron(false),
            'simplebox': new SimpleCube(),
            'box': new Cube(),
            'cylinder': new Cylinder(15),
            'cone': new Cone(20),
            'ball': new Subdivision_Sphere(4)
        }
        this.submit_shapes(context, shapes);
        this.shape_count = Object.keys(shapes).length;

        // Make some Material objects available to you:
        this.clay = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
            ambient: .4,
            diffusivity: .4
        });
        this.plastic = this.clay.override({
            specularity: .6
        });
        this.texture_base = context.get_instance(Phong_Shader).material(Color.of(0, 0, 0, 1), {
            ambient: 1,
            diffusivity: 0.4,
            specularity: 0.3
        });

        // Load some textures for the demo shapes
        this.shape_materials = {};
        const shape_textures = {
            square: "assets/butterfly.png",
            box: "assets/even-dice-cubemap.png",
            ball: "assets/soccer_sph_s_resize.png",
            cylinder: "assets/treebark.png",
            pyramid: "assets/tetrahedron-texture2.png",
            simplebox: "assets/tetrahedron-texture2.png",
            cone: "assets/hypnosis.jpg",
            circle: "assets/hypnosis.jpg"
        };
        for (let t in shape_textures)
            this.shape_materials[t] = this.texture_base.override({
                texture: context.get_instance(shape_textures[t])
            });
        
        this.lights = [new Light(Vec.of(10, 10, 20, 1), Color.of(1, .4, 1, 1), 100000)];

        this.t = 0;
    }


    // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
    make_control_panel() {
        this.key_triggered_button("Pause Time", ["n"], () => {
            this.paused = !this.paused;
        });
    }
    draw_cloud(m, graphics_state, scale, left_align) {
                this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(scale * -4 + left_align, 0, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale/1.1))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-1 * scale + left_align, 0, 4*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-2 * scale + left_align, scale, 3.91*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)}));  
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(scale * -2 + left_align, 0.625*scale, 4.53*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.5))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-2.5 * scale + left_align, 0.625*scale, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-3.25*scale + left_align, 0.625*scale, 4.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale/1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 

        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-3.125*scale + left_align, 0.625*scale, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
//         this.shapes.ball.draw(
//             graphics_state,
//             m.times(Mat4.translation(Vec.of(-50 + left_align, 5, 10)))
//             .times(Mat4.scale(Vec.of(scale, scale, scale))),
//             this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
    }
    
    display(graphics_state) {
        // Use the lights stored in this.lights.
        graphics_state.lights = this.lights;
                
        // Find how much time has passed in seconds, and use that to place shapes.
        if (!this.paused)
            this.t += graphics_state.animation_delta_time / 1000;
        const t = this.t;
        let m = Mat4.identity(); 
       this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.scale(Vec.of(40,40,.1))),
            this.clay.override({color: Color.of(.5, .5, .5, 10)}));
       this.draw_cloud(m, graphics_state, 8, 0);
       this.draw_cloud(m, graphics_state, 3, 30); 
              this.draw_cloud(m, graphics_state, 7, -50); 

              this.draw_cloud(m, graphics_state, 5, 50); 
              this.draw_cloud(m, graphics_state, 6.5, 25); 
//        this.shapes.ball.draw(
//             graphics_state,
//             m.times(Mat4.translation(Vec.of(10, 5, 20)))
//             .times(Mat4.scale(Vec.of(8, 8, 5))), 
//             this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
//        this.shapes.ball.draw(
//             graphics_state,
//             m.times(Mat4.translation(Vec.of(10, 5, 20)))
//             .times())
//               this.draw_cloud(m, graphics_state, 8, 45);

//        this.shapes.box.draw(
//             graphics_state,
//             m.times(Mat4.translation(Vec.of(-1*10, 0, -1*10)))
//             .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
//             .times(Mat4.scale(Vec.of(10,10,.1))),
//             this.clay.override({ color: Color.of(1, 1, 1, 10)})); 
        window.color = Color.of(1, 0, 0, 10); 
        // Draw some demo textured shapes
//         let spacing = 6;
//         m = Mat4.translation(Vec.of(-1 * (spacing / 2) * (this.shape_count - 1), 0, 0));
//         for (let k in this.shapes) {
//             this.shapes[k].draw(
//                 graphics_state,
//                 m.times(Mat4.rotation(t, Vec.of(0, 1, 0))),
//                 this.shape_materials[k] || this.plastic);
//             m = m.times(Mat4.translation(Vec.of(spacing, 0, 0)));
//         }
    }
}

window.Assignment_Two_Skeleton = window.classes.Assignment_Two_Skeleton = Assignment_Two_Skeleton;