let CowMixin = {
  
  draw_cow(graphics_state, m, s) {
    this.draw_body(graphics_state, m, s);
    this.draw_legs(graphics_state, m, 1, 1, s);
    this.draw_legs(graphics_state, m, -1, 1, s);
    this.draw_legs(graphics_state, m, 1, -1, s);
    this.draw_legs(graphics_state, m, -1, -1, s);
    this.draw_tail(graphics_state, m, s);
    this.draw_head(graphics_state, m, s);
  },
  draw_body(graphics_state, m, s) {
    this.shapes.cylinder.draw(
      // main body
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(s * 4)),
      this.shape_materials["cylinder"] || this.plastic
    );
    this.shapes.ball.draw(
      // front sphere
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(s * -4, 0, 0)))
        .times(Mat4.scale(Vec.of(s * 3, s * 4, s * 4))),
      this.shape_materials["cylinder"] || this.plastic
    );
    this.shapes.ball.draw(
      // back sphere
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(s * 4, 0, 0)))
        .times(Mat4.scale(Vec.of(s * 3, s * 4, s * 4))),
      this.shape_materials["cylinder"] || this.plastic
    );
  },
  draw_legs(graphics_state, m, side, fb, s) {
    const deg =
      -0.3 + Math.sin(side * 3.2 * this.t + (-Math.PI / 4) * fb * side);
    m = m
      .times(
        Mat4.translation(Vec.of(s * fb * -4.3, s * -Math.sqrt(8), s * side * Math.sqrt(8)))
      ) // move system to first joint connection
      .times(Mat4.rotation(0.3 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(
      // first joint
      graphics_state,
      m.times(Mat4.scale(s * 1.3)),
      this.shape_materials["cylinder"] || this.plastic
    );
    this.shapes.cylinder.draw(
      // draw first leg section
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.translation(Vec.of(0, 0, s * 1.3)))
        .times(Mat4.scale(s * 1.3)),
      this.shape_materials["cylinder"] || this.plastic
    );
    m = m
      .times(Mat4.translation(Vec.of(0, s * -2.6, 0))) // move system to second leg joint
      .times(Mat4.rotation(-0.4 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(graphics_state, m.times(Mat4.scale(s * 1.3)), 
      this.shape_materials["cylinder"] || this.plastic);
    this.shapes.cylinder.draw(
      // draw second leg section
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.translation(Vec.of(0, 0, s * 1.3)))
        .times(Mat4.scale(s * 1.3)),
      this.shape_materials["cylinder"] || this.plastic
    );
    m = m
      .times(Mat4.translation(Vec.of(0, s * -2.6, 0))) // move to third joint
      .times(Mat4.rotation(0.1 * deg, Vec.of(0, 0, 1)));
    this.shapes.ball.draw(graphics_state, m.times(Mat4.scale(s * 1.3)), 
      this.shape_materials["cylinder"] || this.plastic
      );
    this.shapes.box.draw(
      // draw foot
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(0, s * -0.75, 0)))
        .times(Mat4.scale(Vec.of(s * 1.3, s * 0.8, s * 1.3))),
        this.plastic.override({ color: this.black })
    );
  },
  draw_tail(graphics_state, m, s) {
    const deg = Math.sin(this.t);
    let sign = Math.sign(deg);
    m = m
      .times(Mat4.translation(Vec.of(s * 4, 0, 0))) // translate to middle of ellipsoid
      .times(Mat4.rotation(-Math.PI / 4, Vec.of(0, 0, 1))) // rotate
      .times(Mat4.translation(Vec.of(s * -1, s * (0.15 + Math.sqrt(25 / 2)), 0))); // translate to edge of ellipsoid
    this.shapes.box.draw(
      // first box
      graphics_state,
      m.times(Mat4.scale(s * 0.15)),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    for (let i = 0; i < 30; i++) {
      if (i < 9) {
        m = m
          .times(Mat4.translation(Vec.of(s * 0.15, s * 0.15, s * sign * 0.15))) // translate axis of rotation
          .times(Mat4.rotation((-3 * (Math.PI / 4)) / 9, Vec.of(0, 0, 1))) // apply tail curve rotation
          .times(Mat4.rotation(0.01 * deg, Vec.of(1, 0, 0))) // apply swinging rotation
          .times(Mat4.translation(Vec.of(s * -0.15, s * 0.15, s * sign * -0.15))); // translate back
      } else {
        m = m
          .times(Mat4.translation(Vec.of(0, s * 0.15, s * sign * 0.15)))
          .times(Mat4.rotation(0.1 * deg, Vec.of(1, 0, 0)))
          .times(Mat4.translation(Vec.of(0, s * 0.15, s * sign * -0.15)));
      }
      this.shapes.box.draw(
        graphics_state,
        m.times(Mat4.scale(s * 0.15)),
        this.clay.override({ color: Color.of(255, 255, 255, 1) })
      );
    }
  },
  draw_head(graphics_state, m, s) {
    m = m
      .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, 1, 0)))
      .times(Mat4.translation(Vec.of(0, 0, s * 4)))
      .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0)))
      .times(Mat4.translation(Vec.of(0, 0, s * Math.sqrt(25 / 2))));
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(Mat4.scale(Vec.of(s * 1.5, s * 1.5, s * 1))),
      this.shape_materials["cylinder"] || this.plastic
    );
    m = m.times(Mat4.translation(Vec.of(0, s * -0.8, s * 2.2)));
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(s * 3, s * 4, s * 2.5)))
        .times(Mat4.rotation(-Math.PI / 4, Vec.of(1, 0, 0))),
      this.shape_materials["cylinder"] || this.plastic
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(s * 1.7, s * 0.8, s * 0.3)))
        .times(Mat4.translation(Vec.of(-2.4, 1.4, 0))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(s * 1.7, s * 0.8, s * 0.3)))
        .times(Mat4.translation(Vec.of(2.4,  1.4, 0))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
  }
};
