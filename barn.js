let BarnMixin = {
  draw_barn(graphics_state, m) {
    this.draw_barn_walls(graphics_state, m);
    this.draw_barn_roof(graphics_state, m);
  },
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
  },
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
};
