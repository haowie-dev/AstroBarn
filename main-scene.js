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
      triangular_prism: new TriangularPrism(),
      petal: new Petal(),
      flatpyramid: new Pyramid()
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
    this.brick = Color.of(178 / 255, 34 / 255, 34 / 255, 1);
    this.ground_color = Color.of(148 / 255, 114 / 255, 79 / 255, 1);
    this.smoke_color = Color.of(169 / 255, 169 / 255, 169 / 255, 0.9);
    this.green = Color.of(0, 1, 0, 1);
    this.pink = Color.of(220 / 255, 200 / 255, 200 / 255, 1);
    this.dark_blue = Color.of(0, 120 / 255, 1, 1);
    this.brown = Color.of(208 / 255, 167 / 255, 142 / 255, 1);
    this.silver = Color.of(211 / 255, 211 / 255, 211 / 255, 1);
    this.black = Color.of(0, 0, 0, 1);

    // Load some textures for the demo shapes
    this.shape_materials = {};
    const shape_textures = {
      square: "assets/dirt.png",
      cylinder: "assets/cow3.png",
      petal: "assets/flower-texture.jpg",
      petal2: "assets/flower-texture-2.jpg",
      astro: "assets/astro.png"
    };
    for (let t in shape_textures)
      this.shape_materials[t] = this.texture_base.override({
        texture: context.get_instance(shape_textures[t])
      });

    this.lights = [
      new Light(Vec.of(10, 10, 20, 1), Color.of(1, 0.4, 1, 1), 100000)
    ];

    this.t = 0;

    // SMOKE SET UP
    this.smoke_array = [];
    for (let i = 0; i < 150; i++) {
      const acceleration = getRandom(4, 20);
      const x_spread = getRandom(3, 10);
      const z_spread = getRandom(3, 10);
      this.smoke_array.push(
        new smoke_particle(acceleration, x_spread, z_spread)
      );
    }

    // CHICKEN SET UP
    var x_func = function(t) {
      return Math.sin(10 * t) + 15;
    };
    var x_2_func = function(t) {
      return Math.sin(t) * 10 - 40;
    };
    var x_3_func = function(t) {
      return 5 * (Math.cos(5 * t) + 15);
    };
    var x_4_func = function(t) {
      return 10 * Math.cos(2 * t) + 10;
    };
    var y_func = function(t) {
      return 5 * Math.sin(2 * t);
    };
    var z_func = function(t) {
      return -35.7;
    };
    var y_2_func = function(t) {
      return 5 * Math.sin(2 * t);
    };
    var z_2_func = function(t) {
      return -35.7;
    };

    var first_chicken = new shape_chicken_pos(
      x_func,
      y_func,
      z_func,
      10,
      350,
      0,
      0
    );
    var second_chicken = new shape_chicken_pos(
      x_2_func,
      y_2_func,
      z_2_func,
      10,
      550,
      100,
      0
    );
    var third_chicken = new shape_chicken_pos(
      x_func,
      y_2_func,
      z_2_func,
      10,
      450,
      0,
      0
    );
    var fourth_chicken = new shape_chicken_pos(
      x_func,
      y_2_func,
      z_2_func,
      10,
      350,
      150,
      0
    );
    var fifth_chicken = new shape_chicken_pos(
      x_3_func,
      y_2_func,
      z_2_func,
      10,
      350,
      200,
      0
    );
    var sixth_chicken = new shape_chicken_pos(
      x_func,
      y_2_func,
      z_2_func,
      10,
      500,
      300,
      0
    );
    var seventh_chicken = new shape_chicken_pos(
      x_4_func,
      y_2_func,
      z_2_func,
      10,
      400,
      400,
      0
    );
    var eighth_chicken = new shape_chicken_pos(
      x_3_func,
      y_2_func,
      z_2_func,
      10,
      500,
      400,
      0
    );
    var ninth_chicken = new shape_chicken_pos(
      x_func,
      y_2_func,
      z_2_func,
      10,
      300,
      300,
      0
    );
    var tenth_chicken = new shape_chicken_pos(
      x_3_func,
      y_2_func,
      z_2_func,
      10,
      300,
      500,
      0
    );
    var eleventh_chicken = new shape_chicken_pos(
      x_2_func,
      y_func,
      z_func,
      10,
      315,
      250,
      0
    );
    var twelfth_chicken = new shape_chicken_pos(
      x_func,
      y_2_func,
      z_2_func,
      10,
      500,
      350,
      0
    );
    var thirteenth_chicken = new shape_chicken_pos(
      x_3_func,
      y_func,
      z_func,
      10,
      300,
      250,
      0
    );
    var fourteenth_chicken = new shape_chicken_pos(
      x_4_func,
      y_func,
      z_func,
      10,
      450,
      300,
      0
    );
    this.chicken_array = [
      first_chicken,
      second_chicken,
      third_chicken,
      fourth_chicken,
      fifth_chicken,
      sixth_chicken,
      seventh_chicken,
      eighth_chicken,
      ninth_chicken,
      tenth_chicken,
      eleventh_chicken,
      twelfth_chicken,
      thirteenth_chicken,
      fourteenth_chicken
    ];

    // CLOUD SET UP
    this.clouds = [];
    for (var i = -800; i < 800; i += 200) {
      for (var j = -800; j < 800; j += 300) {
        var scale = Math.random();
        var height = 150 * (Math.random() + 1);
        var cloud = new cloud_coords(scale, j, i, height);
        this.clouds.push(cloud);
      }
    }
    // CAMERA WORK
    this.path_t = 0;
    this.increment = 0.01;
    this.camera_transform = false;
    context.globals.graphics_state.camera_transform = Mat4.translation([
      0,
      0,
      -300
    ]);
    context.globals.graphics_state.projection_transform = Mat4.perspective(
      Math.PI / 4,
      r,
      0.1,
      1000
    );
    this.camera_positions = {
      aerial: Vec.of(Math.sin(this.t), 50, Math.sin(this.t) + 350),
      butterfly: Vec.of(0, 0, 0),
      chicken: Vec.of(0, 0, 0),
      cow: Vec.of(0, 0, 0),
      smoke: Vec.of(Math.sin(this.t), Math.sin(this.t), 0),
      grass: Vec.of(0, 0, 0)
    };
    this.target_camera_name = "aerial";
    this.target_position = this.camera_positions.aerial;
  }

  make_control_panel() {
    this.key_triggered_button("Pause Time", ["n"], () => {
      this.paused = !this.paused;
    });
    this.key_triggered_button("Toggle Camera Transform", ["k"], () => {
      this.camera_transform = !this.camera_transform;
    });
    this.key_triggered_button("Toggle aerial camera", ["1"], () => {
      this.target_camera_name = "aerial";
    });
    this.key_triggered_button("Toggle butteryfly camera", ["2"], () => {
      this.target_camera_name = "butterfly";
    });
    this.key_triggered_button("Toggle chicken camera", ["3"], () => {
      this.target_camera_name = "chicken";
    });
    this.key_triggered_button("Toggle cow camera", ["4"], () => {
      this.target_camera_name = "cow";
    });
    this.key_triggered_button("Toggle smoke camera", ["5"], () => {
      this.target_camera_name = "smoke";
    });
    this.key_triggered_button("Toggle grass camera", ["6"], () => {
      this.target_camera_name = "grass";
    });
  }

  make_bezier_curve(p0, p1, p2, t) {
    var x = 0;
    var y = 0;

    x = Math.pow(1 - t, 2) * p0[0] + (1 - t) * 2 * t * p1[0] + t * t * p2[0];
    y = Math.pow(1 - t, 2) * p0[1] + (1 - t) * 2 * t * p1[1] + t * t * p2[1];
    return Vec.of(x, y, p1[2]);
  }

  display(graphics_state) {
    // Use the lights stored in this.lights.
    graphics_state.lights = this.lights;
    window.color = Color.of(1, 0, 0, 10);

    // Find how much time has passed in seconds, and use that to place shapes.
    if (!this.paused) this.t += graphics_state.animation_delta_time / 1000;
    const t = this.t;

    switch (this.target_camera_name) {
      case "aerial":
        this.target_position = Vec.of(
          300 * Math.sin(this.t / 2),
          50,
          400 * Math.cos(this.t / 2) + 550
        );
        break;
      case "butterfly":
        this.target_position = this.camera_positions.butterfly;
        this.target_position[1] -= 250;
        this.target_position[2] -= 50;
        break;
      case "chicken":
        this.target_position = this.camera_positions.chicken;
        break;
      case "cow":
        this.target_position = this.camera_positions.cow;
        break;
      case "smoke":
        this.target_position = this.camera_positions.smoke;
        break;
      case "grass":
        this.target_position = this.camera_positions.smoke;
        break;
    }

    if (this.camera_transform == true) {
      console.log(this.target_position[0], this.target_position[1]);
      graphics_state.camera_transform = Mat4.look_at(
        Vec.of(
          this.target_position[0],
          this.target_position[1],
          this.target_position[2] + 250
        ), // camera position + rotation
        this.target_position, // reference position to be centered in view
        Vec.of(0, 1, 0) // up direction
      ).times(Mat4.rotation(Math.PI / 8, Vec.of(1, 0, 0)));
    }

    let m = Mat4.identity();
    /////////////////////////// ENVIRONMENT ///////////////////////////
    this.draw_clouds(m, graphics_state, this.clouds);
    this.draw_floor(graphics_state, m);
    this.draw_fence_enclosure(graphics_state, m);
    // this.cover_farm_with_grass_patches(graphics_state, m);
    // this.cover_farm_firewood(graphics_state, m, 200, 150);

    m = m.times(Mat4.translation(Vec.of(100, 0, -300)));
    this.draw_silo(m, graphics_state);

    m = Mat4.identity();
    m = m.times(Mat4.translation(Vec.of(0, 0, 200)));
    this.draw_stable_roof(m, graphics_state);

    m = Mat4.identity();
    m = m.times(Mat4.translation(Vec.of(20, 0, -20)));
    this.draw_barn(graphics_state, m, 3);
    // //////////////////////////////////////////////////////////////

    /////////////////////////// COWS ///////////////////////////
    m = Mat4.identity();
    this.draw_cow(graphics_state, m, 4, 600, 18, 400);
    // this.draw_cow(graphics_state, m, 4, 500, 18, 350);
    // this.draw_cow(graphics_state, m, 4, 300, 18, 250);

    // //////////////////////////////////////////////////////////////

    /////////////////////////// SMOKE ///////////////////////////
    m = Mat4.identity();
    // m = m.times(Mat4.translation(Vec.of(-20, 40, 0)));
    // this.draw_smoke_chimney(m, graphics_state, this.smoke_array, 40);
    // //////////////////////////////////////////////////////////////

    // /////////////////////////// CHICKENS ///////////////////////////
    // for (var i = 0; i < this.chicken_array.length; i++) {
    //   for (var j = i + 1; j < this.chicken_array.length; j++) {
    //     if (this.chicken_array[i].detect_collision(t, this.chicken_array[j])) {
    //       this.chicken_array[i].z_pos = function(t) {
    //         return 3 * t;
    //       };
    //       this.chicken_array[i].alpha = 0.1;
    //     }
    //   }
    // }

    // for (var i = 0; i < this.chicken_array.length; i++) {
    //   m = Mat4.identity();
    //   this.chicken_array[i].draw(this, m, graphics_state, t);
    // }
    // //////////////////////////////////////////////////////////////

    // /////////////////////////// FLOWERS ///////////////////////////
    let flower_scale = 3;
    m = Mat4.identity();
    m = m.times(Mat4.translation(Vec.of(-40, 0, 600)));
    this.draw_flower(m, graphics_state, flower_scale);

    m = Mat4.identity();
    m = m.times(Mat4.translation(Vec.of(40, 0, 600)));
    this.draw_flower(m, graphics_state, flower_scale);

    let flower1 = Vec.of(-40, 0, 600).plus(Vec.of(0, flower_scale * 10, 0)),
      pmax = Vec.of(0, 90, 600),
      flower2 = Vec.of(40, 0, 600).plus(Vec.of(0, flower_scale * 10, 0));
    // //////////////////////////////////////////////////////////////

    /////////////////////////// OTHER FLOWERS ///////////////////////
    m = Mat4.identity();
    m = m.times(Mat4.translation(Vec.of(-200, 0, 500)));
    this.draw_flower(m, graphics_state, 1.8);
    for (let i = 0; i < 8; i++) {
      let n = m;
      let size = 2;
      if (i % 2 === 0) {
        n = m
          .times(Mat4.rotation((i * Math.PI) / 4, Vec.of(0, 1, 0)))
          .times(Mat4.translation(Vec.of(40 + i * 3, 0, 0)));
        size = 2.3;
      } else {
        n = m
          .times(
            Mat4.rotation((i * Math.PI) / 4 - Math.PI / 2, Vec.of(0, 1, 0))
          )
          .times(Mat4.translation(Vec.of(40 + i * 3, 0, 0)));
        size = 1.8;
      }
      this.draw_flower(n, graphics_state, size);
    }
    let f_pos = m.times(Mat4.translation(Vec.of(-20, 0, 20)));
    this.draw_flower(f_pos, graphics_state, 1.3);
    f_pos = m.times(Mat4.translation(Vec.of(-23, 0, -18)));
    this.draw_flower(f_pos, graphics_state, 1.6);

    //////////////////////////////////////////////////////////////

    /////////////////////////// BUTTERFLY ///////////////////////////
    m = Mat4.identity();
    this.path_t += this.increment;
    if (this.path_t >= 1) {
      this.increment = -0.01;
    } else if (this.path_t <= 0) {
      this.increment = 0.01;
    }
    let translate_vec = this.make_bezier_curve(
      flower1,
      pmax,
      flower2,
      this.path_t
    );

    m = m.times(Mat4.translation(translate_vec));
    this.camera_positions.butterfly = translate_vec;
    this.draw_butterfly(m, graphics_state);
    // //////////////////////////////////////////////////////////////
  }
}

getRandom = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

Object.assign(Assignment_Two.prototype, CowMixin);
Object.assign(Assignment_Two.prototype, BarnMixin);
Object.assign(Assignment_Two.prototype, ButterflyMixin);
Object.assign(Assignment_Two.prototype, CloudMixin);
Object.assign(Assignment_Two.prototype, ChickenMixin);
Object.assign(Assignment_Two.prototype, groundMixin);
Object.assign(Assignment_Two.prototype, FenceMixin);
Object.assign(Assignment_Two.prototype, SmokeMixin);
Object.assign(Assignment_Two.prototype, FlowerMixin);
Object.assign(Assignment_Two.prototype, StableMixin);
Object.assign(Assignment_Two.prototype, SiloMixin);

window.Assignment_Two = window.classes.Assignment_Two = Assignment_Two;
