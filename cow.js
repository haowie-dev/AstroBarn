let CowMixin = {
  draw_cow(graphics_state, m) {
    this.draw_body(graphics_state, m);
    this.draw_legs(graphics_state, m, 1, 1);
    this.draw_legs(graphics_state, m, -1, 1);
    this.draw_legs(graphics_state, m, 1, -1);
    this.draw_legs(graphics_state, m, -1, -1);
    this.draw_tail(graphics_state, m);
    this.draw_head(graphics_state, m);
  },
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
  },
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
  },
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
  },
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
};
