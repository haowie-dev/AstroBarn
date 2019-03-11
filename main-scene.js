class shape_chicken_pos {
  constructor(x, y, z, alpha, start_x, start_y, start_z) {
    this.x_pos = x;
    this.y_pos = y;
    this.z_pos = z;
    this.alpha = alpha;
    this.start_x = start_x;
    this.start_y = start_y;
    this.start_z = start_z;
  }
  detect_collision(t, other_shape) {
      var ball_1_x = this.x_pos(t) + this.start_x;
      var ball_1_y = this.y_pos(t) + this.start_y;
      var ball_1_z = this.z_pos(t) + this.start_z;
      var ball_2_x = other_shape.x_pos(t) + other_shape.start_x;
      var ball_2_y = other_shape.y_pos(t) + other_shape.start_y;
      var ball_2_z = other_shape.z_pos(t) + other_shape.start_z;
      var dist = Math.sqrt((ball_1_x - ball_2_x) * (ball_1_x - ball_2_x) + (ball_1_y - ball_2_y) * (ball_1_y - ball_2_y) + (ball_1_z - ball_2_z) * (ball_1_z - ball_2_z));
      if (dist < 50 ) {
          return true;
      }
      return false; 
  }
  draw(scene, m, graphics_state, t) {
      m = m.times(Mat4.rotation(-1*Math.PI/2, Vec.of(1, 0, 0)));
      m = m.times(Mat4.translation(Vec.of(this.x_pos(t), this.y_pos(t), this.z_pos(t))));
      m = m.times(Mat4.translation(Vec.of(this.start_x, this.start_y, this.start_z)));
      scene.draw_chicken(m, graphics_state, 15, 0, -20, 40, this.alpha);
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
      triangular_prism: new TriangularPrism(),
      petal: new Petal(),
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
    this.pink = Color.of(220 / 255, 200 / 255, 200 / 255, 1); 
    this.dark_blue = Color.of(0, 120/255,1,1);
    
    // Load some textures for the demo shapes
    this.shape_materials = {};
    const shape_textures = {
      square: "assets/dirt.png",
      petal: "assets/flower-texture.jpg",
      petal2: "assets/flower-texture-2.jpg"
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
    var x_2_func = function(t) {
      return Math.sin(t) * 10 -40;
    }
    var x_3_func = function(t) {
      return 5*(Math.cos(5*t) + 15);
    }
    var y_func = function(t) {
      return 5 * Math.sin(2*t);
    }
    var z_func = function(t) {
      return -35.7;
    }

    var y_2_func = function(t) {
      return 5 * Math.sin(2*t);
    }
    var z_2_func = function(t) {
      return -35.7;
    }
    var first_chicken = new shape_chicken_pos(x_func, y_func, z_func, 10, 350, 0, 0);
    var second_chicken = new shape_chicken_pos(x_2_func, y_2_func, z_2_func, 10, 550, 100, 0);
    var third_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 450, 0, 0);
    var fourth_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 450, 200, 0);
    var fifth_chicken = new shape_chicken_pos(x_3_func, y_2_func, z_2_func, 10, 350, 200, 0);
    var sixth_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 500, 300, 0);
    var seventh_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 400, 400, 0);
    var eighth_chicken = new shape_chicken_pos(x_3_func, y_2_func, z_2_func, 10, 500, 400, 0);
    var ninth_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 300, 300, 0);
    var tenth_chicken = new shape_chicken_pos(x_3_func, y_2_func, z_2_func, 10, 300, 500, 0);
    var eleventh_chicken = new shape_chicken_pos(x_2_func, y_func, z_func, 10, 275, 350, 0);
    var twelfth_chicken = new shape_chicken_pos(x_func, y_2_func, z_2_func, 10, 500, 350, 0);
    var thirteenth_chicken = new shape_chicken_pos(x_3_func, y_func, z_func, 10, 300, 250, 0);
    var fourteenth_chicken = new shape_chicken_pos(x_3_func, y_func, z_func, 10, 450, 300, 0);
    this.array = [first_chicken, second_chicken, third_chicken, fourth_chicken, fifth_chicken, sixth_chicken, seventh_chicken, eighth_chicken,
    ninth_chicken, tenth_chicken, eleventh_chicken, twelfth_chicken, thirteenth_chicken, fourteenth_chicken]; 

    this.path_t = 0;
    this.increment = 0.01; 
    this.camera_transform = false;
    context.globals.graphics_state.camera_transform = Mat4.translation([0, 0, -300]);
        context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);
        this.target_position = Vec.of(0, 5, 0);
        this.og_target_position = Vec.of(-100, -100, -100);
  }

  // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
  make_control_panel() {
    this.key_triggered_button("Pause Time", ["n"], () => {
      this.paused = !this.paused;
    });
    this.key_triggered_button("Toggle Camera Transform", ["k"], () => {
            this.camera_transform = !this.camera_transform;
    });

  }

  make_bezier_curve(p0, p1, p2, t) {
      var x = 0;
      var y = 0;

      x = Math.pow(1-t, 2) * p0[0]+
              (1-t) * 2 * t * p1[0] + 
              t * t * p2[0];
      y = Math.pow(1-t, 2) * p0[1] + 
              (1-t) * 2 * t * p1[1] + 
              t * t * p2[1];
      return Vec.of(x, y, p1[2]);
  }
      
  display(graphics_state) {
    // Use the lights stored in this.lights.
    graphics_state.lights = this.lights;
    if (this.camera_transform == true) {
        graphics_state.camera_transform = Mat4.look_at(
            Vec.of(this.target_position[0],this.target_position[1], 35),         // camera position
            this.target_position,   // reference position to be centered in view
            Vec.of(0,1,0));         // up direction
    }
    // Find how much time has passed in seconds, and use that to place shapes.
    if (!this.paused) this.t += graphics_state.animation_delta_time / 1000;
    const t = this.t;
    window.color = Color.of(1, 0, 0, 10);

    let m = Mat4.identity();

    this.draw_floor(graphics_state, m)
    this.cover_farm_with_grass_patches(graphics_state, m)

    this.cover_farm_firewood(graphics_state, m, 200, 150)

      m = m.times(Mat4.rotation(-1*Math.PI/2, Vec.of(1, 0, 0)));
      m = m.times(Mat4.rotation(Math.PI/4, Vec.of(0, 1, 0)));
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(15, 10, 67.8)))
      .times(Mat4.scale(3, 3, 3)),
      this.clay.override({ color: this.yellow })
    );
    m = Mat4.identity();
    this.draw_cloud(m, graphics_state, 8, 0, 50);
    this.draw_cloud(m, graphics_state, 3, 30, 40);
    this.draw_cloud(m, graphics_state, 7, -50, 45);
    this.draw_cloud(m, graphics_state, 5, 50, 55);
    this.draw_cloud(m, graphics_state, 6.5, 25, 54);
    this.draw_cow(graphics_state, m, 2);
//     this.draw_cloud(m, graphics_state, -100, 0, 48);
//     this.draw_cloud(m, graphics_state, -200, 0, 60);

   
    this.draw_cow(graphics_state, m);
    m = m.times(Mat4.translation(Vec.of(30, 0, 0)));
    this.draw_barn(graphics_state, m, 2);
    this.draw_fence_enclosure(graphics_state, m);



     for (var i = 0; i < this.array.length; i++) {
       for (var j = i+1; j < this.array.length; j++) {
         if (this.array[i].detect_collision(t, this.array[j])) {
           this.array[i].z_pos = function(t) {
             return 3*t;
           }
           this.array[i].alpha = 0.1;
         }
       }
     }

     this.path_t += this.increment;
     if (this.path_t >= 1) {
      this.increment = -.01;
     } else if (this.path_t <= 0) {
       this.increment = .01;
     }

     let flower_scale = 3;
     m = Mat4.identity();
     m = m.times(Mat4.translation(Vec.of(-40, 0, 600)));
     this.draw_flower(m, graphics_state, flower_scale);

     m = Mat4.identity();
     m = m.times(Mat4.translation(Vec.of(40, 0, 600)));
     this.draw_flower(m, graphics_state, flower_scale);

     let flower1 = Vec.of(-40,0, 600).plus(Vec.of(0, flower_scale * 10, 0)),
        pmax = Vec.of(0, 90, 600),
        flower2 = Vec.of(40,0, 600).plus(Vec.of(0, flower_scale * 10, 0));
     
     m = Mat4.identity();
     let translate_vec = this.make_bezier_curve(flower1, pmax, flower2, this.path_t);

     m = m.times(Mat4.translation(translate_vec));
     this.target_position = translate_vec;
     this.draw_butterfly(m, graphics_state);

    m = Mat4.identity();
     for (var i = 0; i < this.array.length; i++) {
       m = Mat4.identity();
       this.array[i].draw(this, m, graphics_state, t);
     }
    m = Mat4.identity();
            //Initial Body 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-20, -20, -20)))
            .times(Mat4.scale(Vec.of(15, 15, 15))), 
            this.clay.override({ color: this.pink })); 
        //Head of chicken 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-20 + (20 / (15 / 1)), -20, -20+(10 / (15 / 1)))))
            .times(Mat4.scale(Vec.of(15 / 1.875, 15 / 1.875, 15 / 1.875))),
            this.clay.override({ color: this.pink })); 
    m = m.times(Mat4.translation(Vec.of(-3 * t, 0, 0)));
  }
}
Object.assign(Assignment_Two.prototype, CowMixin);
Object.assign(Assignment_Two.prototype, BarnMixin);
Object.assign(Assignment_Two.prototype, ButterflyMixin);
Object.assign(Assignment_Two.prototype, CloudMixin);
Object.assign(Assignment_Two.prototype, ChickenMixin);
Object.assign(Assignment_Two.prototype, groundMixin);
Object.assign(Assignment_Two.prototype, FenceMixin);
Object.assign(Assignment_Two.prototype, FlowerMixin);

window.Assignment_Two = window.classes.Assignment_Two = Assignment_Two;
