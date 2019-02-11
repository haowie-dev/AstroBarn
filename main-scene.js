class Assignment_One_Scene extends Scene_Component {
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
            'box': new Cube(),
            'ball': new Subdivision_Sphere(4),
            'prism': new TriangularPrism()
        }
        this.submit_shapes(context, shapes);

        // Make some Material objects available to you:
        this.clay = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
            ambient: .4,
            diffusivity: .4
        });
        this.plastic = this.clay.override({
            specularity: .6
        });
        
        this.lights = [new Light(Vec.of(10, 10, 20, 1), Color.of(1, .4, 1, 1), 100000)];

        this.blue = Color.of(0, 0, 1, 1);
        this.yellow = Color.of(1, 1, 0, 1);

        this.t = 0;
    }


    // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
    make_control_panel() {
        this.key_triggered_button("Hover in Place", ["m"], () => {
            this.hover = !this.hover;
        });
        this.key_triggered_button("Pause Time", ["n"], () => {
            this.paused = !this.paused;
        });
    }


    display(graphics_state) {
        // Use the lights stored in this.lights.
        graphics_state.lights = this.lights;

        // Variable m will be a temporary matrix that helps us draw most shapes.
        // It starts over as the identity every single frame - coordinate axes at the origin.
        let m = Mat4.identity();
                
        // Find how much time has passed in seconds, and use that to place shapes.
        if (!this.paused)
            this.t += graphics_state.animation_delta_time / 1000;
        const t = this.t;

        // TODO: Replace the below example code with your own code to draw the butterfly.
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(10 * Math.sin(t), 5 * Math.sin(2 * t), 0))),
            this.plastic.override({color: this.blue}));
        this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-5, 0, 0))).times(Mat4.rotation(t, Vec.of(0, 1, 0))),
            this.clay.override({color: this.yellow}));
        this.shapes.prism.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(5, -1, 0))).times(Mat4.rotation(t, Vec.of(0, 1, 0))).times(Mat4.scale(Vec.of(2, 2, 1))),
            this.plastic.override({color: this.yellow}));
    }
}

window.Assignment_One_Scene = window.classes.Assignment_One_Scene = Assignment_One_Scene;