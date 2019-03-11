class cloud_coords {
  constructor(scale, y, z, height) {
    this.scale = scale;
    this.y_pos = y;
    this.z_pos = z;
    this.h = height;
  }
}
let CloudMixin = {
  draw_cloud(m, graphics_state, scale, left_align, height) {
    m = m.times(Mat4.translation(Vec.of(0, height, 0)));
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(Vec.of(scale * -4 + left_align, 0, 3.75 * scale))
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale / 1.1))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-1 * scale + left_align, 0, 4 * scale)))
        .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(Vec.of(-2 * scale + left_align, scale, 3.91 * scale))
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(scale * -2 + left_align, 0.625 * scale, 4.53 * scale)
          )
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale / 1.5))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(-2.5 * scale + left_align, 0.625 * scale, 3.75 * scale)
          )
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(-3.25 * scale + left_align, 0.625 * scale, 4.75 * scale)
          )
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );

    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(-3.125 * scale + left_align, 0.625 * scale, 3.75 * scale)
          )
        )
        .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
      this.clay.override({ color: Color.of(255, 255, 255, 1) })
    );
  }
};
