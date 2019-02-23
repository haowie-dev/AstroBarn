class Assignment_Two extends Scene_Component {
  // The scene begins by requesting the camera, shapes, and materials it will need.
  constructor(context, control_box) {
    super(context, control_box);
    // First, include a secondary Scene that provides movement controls:
    if (!context.globals.has_controls)
      context.register_scene_component(
        new Movement_Controls(context, control_box.parentElement.insertCell())
      );

    // Locate the camera here (inverted matrix).
    const r = context.width / context.height;
    context.globals.graphics_state.camera_transform = Mat4.translation([
      0,
      0,
      -35
    ]);
    context.globals.graphics_state.projection_transform = Mat4.perspective(
      Math.PI / 4,
      r,
      0.1,
      1000
    );

    // At the beginning of our program, load one of each of these shape
    // definitions onto the GPU.  NOTE:  Only do this ONCE per shape
    // design.  Once you've told the GPU what the design of a cube is,
    // it would be redundant to tell it again.  You should just re-use
    // the one called "box" more than once in display() to draw
    // multiple cubes.  Don't define more than one blueprint for the
    // same thing here.
    const shapes = {
      square: new Square(),
      circle: new Circle(15),
      pyramid: new Tetrahedron(false),
      simplebox: new SimpleCube(),
      box: new Cube(),
      cylinder: new Cylinder(15),
      cone: new Cone(20),
      ball: new Subdivision_Sphere(4),
      triangular_prism: new TriangularPrism()
    };
    this.submit_shapes(context, shapes);
    this.shape_count = Object.keys(shapes).length;

    // Make some Material objects available to you:
    this.clay = context
      .get_instance(Phong_Shader)
      .material(Color.of(0.9, 0.5, 0.9, 1), {
        ambient: 0.4,
        diffusivity: 0.4
      });
    this.plastic = this.clay.override({
      specularity: 0.6
    });
    this.texture_base = context
      .get_instance(Phong_Shader)
      .material(Color.of(0, 0, 0, 1), {
        ambient: 1,
        diffusivity: 0.4,
        specularity: 0.3
      });

    // colors
    this.blue = Color.of(0, 0, 1, 1);
    this.yellow = Color.of(1, 1, 0, 1);
    this.brown = Color.of(165 / 255, 42 / 255, 42 / 255, 1);
    this.brick = Color.of(178 / 255, 34 / 255, 34 / 255, 1);

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

    this.lights = [
      new Light(Vec.of(10, 10, 20, 1), Color.of(1, 0.4, 1, 1), 100000)
    ];

    this.t = 0;
  }

  // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
  make_control_panel() {
    this.key_triggered_button("Pause Time", ["n"], () => {
      this.paused = !this.paused;
    });
  }

  display(graphics_state) {
    // Use the lights stored in this.lights.
    graphics_state.lights = this.lights;

    // Find how much time has passed in seconds, and use that to place shapes.
    if (!this.paused) this.t += graphics_state.animation_delta_time / 1000;
    const t = this.t;
    window.color = Color.of(1, 0, 0, 10);

    let m = Mat4.identity();
    this.draw_cloud(m, graphics_state, 8, 0, 50);
    this.draw_cloud(m, graphics_state, 3, 30, 40);
    this.draw_cloud(m, graphics_state, 7, -50, 45);
    this.draw_cloud(m, graphics_state, 5, 50, 55);
    this.draw_cloud(m, graphics_state, 6.5, 25, 54);
    m = Mat4.identity();

    this.draw_cow(graphics_state, m);
    m = m.times(Mat4.translation(Vec.of(30, 0, 0)));
    this.draw_barn(graphics_state, m);
  }
}

Object.assign(Assignment_Two.prototype, CowMixin);
Object.assign(Assignment_Two.prototype, BarnMixin);
Object.assign(Assignment_Two.prototype, CloudMixin);

window.Assignment_Two = window.classes.Assignment_Two = Assignment_Two;
