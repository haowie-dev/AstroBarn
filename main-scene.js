class Assignment_Two_Skeleton extends Scene_Component {
  // The scene begins by requesting the camera, shapes, and materials it will need.
  constructor(context, control_box) {
    super(context, control_box);
	//this is a git test == krish test
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

    let m = Mat4.identity();

    // this.draw_cow(graphics_state, m);
    this.draw_barn(graphics_state, m);


    this.draw_fence(graphics_state, m, 600, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 500, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 400, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 300, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 200, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 100, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 0, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -100, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -200, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -300, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -400, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -500, 0, 300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -600, 0, 300, 1.571, 0, 1, 0);



    this.draw_fence(graphics_state, m, 600, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 500, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 400, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 300, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 200, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 100, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, 0, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -100, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -200, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -300, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -400, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -500, 0, -300, 1.571, 0, 1, 0);
    this.draw_fence(graphics_state, m, -600, 0, -300, 1.571, 0, 1, 0);



    //         m = m.times(Mat4.translation(Vec.of(-3 * t, 0, 0)));

    // Draw some demo textured shapes
    //         let spacing = 6;
    //         let m = Mat4.translation(Vec.of(-1 * (spacing / 2) * (this.shape_count - 1), 0, 0));
    //         for (let k in this.shapes) {
    //             this.shapes[k].draw(
    //                 graphics_state,
    //                 m.times(Mat4.rotation(t, Vec.of(0, 1, 0))),
    //                 this.shape_materials[k] || this.plastic);
    //             m = m.times(Mat4.translation(Vec.of(spacing, 0, 0)));
    //         }
  }

  //    |   |   |   |   |
  //    -----------------
  //    |   |   |   |   |
  //    -----------------
  //    |   |   |   |   |

  draw_fence(graphics_state, m, xcoord, ycoord, zcoord, degree, xdegree, ydegree, zdegree) {

    //top horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(xcoord,ycoord+12,zcoord))
        .times(Mat4.rotation(degree,Vec.of(xdegree, ydegree, zdegree)))
        .times(Mat4.scale(Vec.of(1, 1, 50)))),
      this.plastic.override({color: this.brick}));


    //middle horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(xcoord,ycoord,zcoord))
        .times(Mat4.rotation(degree,Vec.of(xdegree, ydegree, zdegree)))
        .times(Mat4.scale(Vec.of(1, 1, 50)))),
      this.plastic.override({color: this.brick}));

    //bottom horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(xcoord,ycoord-12,zcoord))
        .times(Mat4.rotation(1.571,Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 50)))),
      this.plastic.override({color: this.brick}));


    //1st vertical bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(xcoord-50,ycoord,zcoord))
        .times(Mat4.rotation(1.571,Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 20)))),
      this.plastic.override({color: this.brick}));


    //last vertical bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.translation(Vec.of(xcoord+50,ycoord,zcoord))
        .times(Mat4.rotation(1.571,Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 20)))),
      this.plastic.override({color: this.brick}));

  }


  draw_cow(graphics_state, m) {
    this.draw_body(graphics_state, m);

    this.draw_legs(graphics_state, m, 1, 1);
    this.draw_legs(graphics_state, m, -1, 1);

    this.draw_legs(graphics_state, m, 1, -1);
    this.draw_legs(graphics_state, m, -1, -1);

    this.draw_tail(graphics_state, m);

    this.draw_head(graphics_state, m);
  }

  draw_body(graphics_state, m) {
    this.shapes.cylinder.draw(
      // main body
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(4, 4, 4))),
      this.clay
    );
    this.shapes.ball.draw(
      // front sphere
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-4, 0, 0)))
        .times(Mat4.scale(Vec.of(3, 4, 4))),
      this.clay
    );
    this.shapes.ball.draw(
      // back sphere
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(4, 0, 0)))
        .times(Mat4.scale(Vec.of(3, 4, 4))),
      this.clay
    );
  }

  draw_legs(graphics_state, m, side, fb) {
    const deg =
      -0.3 + Math.sin(side * 3.2 * this.t + (-Math.PI / 4) * fb * side);
    m = m
      .times(
        Mat4.translation(Vec.of(fb * -4.3, -Math.sqrt(8), side * Math.sqrt(8)))
      ) // move system to first joint connection
      .times(Mat4.rotation(0.3 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(
      // first joint
      graphics_state,
      m.times(Mat4.scale(1.3)),
      this.clay
    );
    this.shapes.cylinder.draw(
      // draw first leg section
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.translation(Vec.of(0, 0, 1.3)))
        .times(Mat4.scale(1.3)),
      this.clay
    );
    m = m
      .times(Mat4.translation(Vec.of(0, -2.6, 0))) // move system to second leg joint
      .times(Mat4.rotation(-0.4 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(graphics_state, m.times(Mat4.scale(1.3)), this.clay);
    this.shapes.cylinder.draw(
      // draw second leg section
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.translation(Vec.of(0, 0, 1.3)))
        .times(Mat4.scale(Vec.of(1.3, 1.3, 1.3))),
      this.clay
    );
    m = m
      .times(Mat4.translation(Vec.of(0, -2.6, 0))) // move to third joint
      .times(Mat4.rotation(0.1 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(graphics_state, m.times(Mat4.scale(1.3)), this.clay);
    this.shapes.box.draw(
      // draw foot
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(0, -0.75, 0)))
        .times(Mat4.scale(Vec.of(1.3, 0.8, 1.3))),
      this.clay
    );
  }

  draw_tail(graphics_state, m) {
    const deg = Math.sin(this.t);
    let sign = Math.sign(deg);
    m = m
      .times(Mat4.translation(Vec.of(4, 0, 0))) // translate to middle of ellipsoid
      .times(Mat4.rotation(-Math.PI / 4, Vec.of(0, 0, 1))) // rotate
      .times(Mat4.translation(Vec.of(-1, 0.15 + Math.sqrt(25 / 2), 0))); // translate to edge of ellipsoid
    this.shapes.box.draw(
      // first box
      graphics_state,
      m.times(Mat4.scale(0.15)),
      this.clay
    );
    for (let i = 0; i < 30; i++) {
      if (i < 9) {
        m = m
          .times(Mat4.translation(Vec.of(0.15, 0.15, sign * 0.15))) // translate axis of rotation
          .times(Mat4.rotation((-3 * (Math.PI / 4)) / 9, Vec.of(0, 0, 1))) // apply tail curve rotation
          .times(Mat4.rotation(0.01 * deg, Vec.of(1, 0, 0))) // apply swinging rotation
          .times(Mat4.translation(Vec.of(-0.15, 0.15, sign * -0.15))); // translate back
      } else {
        m = m
          .times(Mat4.translation(Vec.of(0, 0.15, sign * 0.15)))
          .times(Mat4.rotation(0.1 * deg, Vec.of(1, 0, 0)))
          .times(Mat4.translation(Vec.of(0, 0.15, sign * -0.15)));
      }
      this.shapes.box.draw(
        graphics_state,
        m.times(Mat4.scale(0.15)),
        this.clay
      );
    }
  }

  draw_head(graphics_state, m) {
    m = m
      .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, 1, 0)))
      .times(Mat4.translation(Vec.of(0, 0, 4)))
      .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0)))
      .times(Mat4.translation(Vec.of(0, 0, Math.sqrt(25 / 2))));
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(1.5, 1.5, 1))),
      this.clay
    );
    m = m.times(Mat4.translation(Vec.of(0, -0.8, 2.2)));
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(3, 4, 2.5)))
        .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0))),
      this.clay
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(1.7, 0.8, 0.3)))
        .times(Mat4.translation(Vec.of(-2.4, 1.4, 0))),
      this.clay
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(1.7, 0.8, 0.3)))
        .times(Mat4.translation(Vec.of(2.4, 1.4, 0))),
      this.clay
    );
  }

  draw_barn(graphics_state, m) {
    this.draw_barn_walls(graphics_state, m);
    this.draw_barn_roof(graphics_state, m);
  }

  draw_barn_walls(graphics_state, m) {
    const barn_length = 20;
    const barn_width = 1;
    m = m.times(Mat4.rotation(Math.PI / 2, Vec.of(0, -1, 0)));
    this.shapes.box.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(barn_length, barn_length, barn_width))),
      this.plastic.override({
        color: this.brick
      })
    );
    m = m
      .times(Mat4.translation(Vec.of(-barn_length, 0, 0)))
      .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
      .times(Mat4.translation(Vec.of(barn_length - barn_width, 0, 0)));
    this.shapes.box.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(barn_length, barn_length, barn_width))),
      this.plastic.override({
        color: this.brick
      })
    );
    m = m
      .times(Mat4.translation(Vec.of(barn_length, 0, 0)))
      .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
      .times(Mat4.translation(Vec.of(-(barn_length - barn_width), 0, 0)));
    this.shapes.box.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(barn_length, barn_length, barn_width))),
      this.plastic.override({
        color: this.brick
      })
    );
    m = m
      .times(Mat4.translation(Vec.of(-barn_length, 0, 0)))
      .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
      .times(
        Mat4.translation(
          Vec.of((barn_length - barn_width) / 4 - (3 * barn_width) / 4, 0, 0)
        )
      );
    this.shapes.box.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(barn_length / 4, barn_length, barn_width))),
      this.plastic.override({
        color: this.brick
      })
    );
    m = m.times(Mat4.translation(Vec.of((3 * barn_length) / 2, 0, 0)));
    this.shapes.box.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(barn_length / 4, barn_length, barn_width))),
      this.plastic.override({
        color: this.brick
      })
    );
  }

  draw_barn_roof(graphics_state, m) {
    const barn_length = 20;
    const barn_width = 1;
    const barn_roof_length = barn_length / Math.sqrt(2) + barn_width;
    // m = m.times(Mat4.rotation(Math.PI / 2, Vec.of(0, -1, 0)));

    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, -1, 0)))
        .times(Mat4.translation(Vec.of(0, 30, -10)))
        .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0)))
        .times(
          Mat4.scale(Vec.of(barn_length + 4, barn_roof_length, barn_width))
        ),
      this.plastic.override({
        color: this.brick
      })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, -1, 0)))
        .times(Mat4.translation(Vec.of(0, 30, 2 * barn_length - 10)))
        .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0)))
        .times(
          Mat4.scale(Vec.of(barn_length + 4, barn_roof_length, barn_width))
        ),
      this.plastic.override({
        color: this.brick
      })
    );

    this.shapes.triangular_prism.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              barn_length,
              barn_length + barn_length / Math.sqrt(2) + 5,
              barn_length - barn_width
            )
          )
        )
        .times(Mat4.rotation((-3 * Math.PI) / 4, Vec.of(0, 0, 1)))
        .times(
          Mat4.scale(Vec.of(barn_length + 8, barn_length + 8, barn_width))
        ),
      this.plastic.override({
        color: this.brick
      })
    );

    this.shapes.triangular_prism.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              barn_length,
              barn_length + barn_length / Math.sqrt(2) + 5,
              -barn_length - barn_width / Math.sqrt(2)
            )
          )
        )
        .times(Mat4.rotation((-3 * Math.PI) / 4, Vec.of(0, 0, 1)))
        .times(
          Mat4.scale(Vec.of(barn_length + 8, barn_length + 8, barn_width))
        ),
      this.plastic.override({
        color: this.brick
      })
    );
  }
}

window.Assignment_Two_Skeleton = window.classes.Assignment_Two_Skeleton = Assignment_Two_Skeleton;
