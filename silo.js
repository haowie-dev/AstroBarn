let SiloMixin = {
  draw_silo(m, graphics_state) {
    m = m.times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)));
    m = m.times(Mat4.translation(Vec.of(0, -300, 0)));
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-250, -40, -50)))
        .times(Mat4.rotation(-Math.PI, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(50, 50, 75))),
      this.plastic.override({ color: this.silver })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-240, 10, -50)))
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, 0, 1)))
        .times(Mat4.scale(Vec.of(30, 30, 1))),
      this.shape_materials["astro"]
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-250, -40, -125)))
        .times(Mat4.scale(49.5, 49.5, 49.5)),
      this.plastic.override({ color: this.silver })
    );

    m = m.times(Mat4.translation(Vec.of(0, -800, 0)));
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-250, -40, -50)))
        .times(Mat4.rotation(-Math.PI, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(50, 50, 75))),
      this.plastic.override({ color: this.silver })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-240, 10, -50)))
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, 0, 1)))
        .times(Mat4.scale(Vec.of(30, 30, 1))),
      this.shape_materials["astro"]
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-250, -40, -125)))
        .times(Mat4.scale(49.1, 49.1, 49.1)),
      this.plastic.override({ color: this.silver })
    );
  }
};
