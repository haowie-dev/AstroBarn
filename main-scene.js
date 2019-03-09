class shape_chicken_pos {
  constructor(x, y, z) {
    this.x_pos = x;
    this.y_pos = y;
    this.z_pos = z;
  }
  detect_collision(t, other_shape) {
      var ball_1_x = this.x_pos(t);
      var ball_1_y = this.y_pos(t);
      var ball_1_z = this.z_pos(t);
      var ball_2_x = other_shape.x_pos(t);
      var ball_2_y = other_shape.y_pos(t);
      var ball_2_z = other_shape.z_pos(t);
      var dist = (ball_1_x - ball_2_x) * (ball_1_x - ball_2_x) + (ball_1_y - ball_2_y) * (ball_1_x - ball_2_x) + (ball_1_z - ball_2_z) * (ball_1_z - ball_2_z);
      console.log(dist);
      if (dist < 2000) {
          return true;
      }
      return false; 
  }
  draw(scene, m, graphics_state, t) {
      m = m.times(Mat4.translation(Vec.of(this.x_pos(t), this.y_pos(t), this.z_pos(t))));
      scene.draw_chicken(m, graphics_state, 15, 0, -20, 40);
  }
}


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
    this.brick = Color.of(178 / 255, 34 / 255, 34 / 255, 1);
    this.ground_color = Color.of(148 / 255, 114 / 255, 79 / 255, 1);
    this.green = Color.of(0, 1, 0, 1);

    // Load some textures for the demo shapes
    this.shape_materials = {};
    const shape_textures = {
      square: "assets/treebark.png"
    };
    for (let t in shape_textures)
      this.shape_materials[t] = this.texture_base.override({
        texture: context.get_instance(shape_textures[t])
      });

    this.lights = [
      new Light(Vec.of(10, 10, 20, 1), Color.of(1, 0.4, 1, 1), 100000)
    ];

    this.t = 0;
    var x_func = function(t) {
        return Math.sin(10*t) +15;
    }
    var y_func = function(t) {
      return 5 * Math.sin(2*t);
    }
    var z_func = function(t) {
      return -35.7;
    }
    var x_2_func = function(t) {
      return Math.sin(t) * 10 -40;
    }
    var y_2_func = function(t) {
      return 5 * Math.sin(2*t);
    }
    var z_2_func = function(t) {
      return -35.7;
    }
    var first_chicken = new shape_chicken_pos(x_func, y_func, z_func);
    var second_chicken = new shape_chicken_pos(x_2_func, y_2_func, z_2_func);
    this.array = [first_chicken, second_chicken]; 

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

    this.draw_floor(graphics_state, m)
    this.cover_farm_with_grass_patches(graphics_state, m)

    this.cover_farm_firewood(graphics_state, m, 200, 150)

    this.draw_cloud(m, graphics_state, 8, 0, 50);
    this.draw_cloud(m, graphics_state, 3, 30, 40);
    this.draw_cloud(m, graphics_state, 7, -50, 45);
    this.draw_cloud(m, graphics_state, 5, 50, 55);
    this.draw_cloud(m, graphics_state, 6.5, 25, 54);
    this.draw_cow(graphics_state, m);
    m = m.times(Mat4.translation(Vec.of(30, 0, 0)));
    this.draw_barn(graphics_state, m);
    this.draw_fence_enclosure(graphics_state, m);



     for (var i = 0; i < this.array.length; i++) {
       for (var j = i+1; j < this.array.length; j++) {
         if (this.array[i].detect_collision(t, this.array[j])) {
           this.array.splice(i, 1);
         }
       }
     }
     for (var i = 0; i < this.array.length; i++) {
       m = Mat4.identity();
       m = m.times(Mat4.rotation(-1*Math.PI/2, Vec.of(1, 0, 0))); 
       this.array[i].draw(this, m, graphics_state, t);
     }

    m = m.times(Mat4.translation(Vec.of(-3 * t, 0, 0)));
  }
}
Object.assign(Assignment_Two.prototype, CowMixin);
Object.assign(Assignment_Two.prototype, BarnMixin);
Object.assign(Assignment_Two.prototype, CloudMixin);
Object.assign(Assignment_Two.prototype, ChickenMixin); 
Object.assign(Assignment_Two.prototype, groundMixin);
Object.assign(Assignment_Two.prototype, FenceMixin);

window.Assignment_Two = window.classes.Assignment_Two = Assignment_Two;
