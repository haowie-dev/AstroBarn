let StableMixin = {
  draw_stable_roof(m, graphics_state) {
    const barn_length = 20;
    const barn_width = 1;
    const barn_roof_length = barn_length / Math.sqrt(2) + barn_width;
    // m = m.times(Mat4.rotation(Math.PI / 2, Vec.of(0, -1, 0)));
    //     m = m.times(Mat4.translation(Vec.of(0, 0)))
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, -1, 0)))
        .times(Mat4.translation(Vec.of(0, 50, 2 * -barn_length + 300)))
        .times(Mat4.rotation(-Math.PI / 3, Vec.of(1, 0, 0)))
        .times(
          Mat4.scale(
            Vec.of(2 * (barn_length + 4), barn_roof_length, barn_width)
          )
        ),
      this.plastic.override({
        color: Color.of(208 / 255, 167 / 255, 142 / 255, 1)
      })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.rotation(-Math.PI / 2, Vec.of(0, -1, 0)))
        .times(Mat4.translation(Vec.of(0, 50, 2 * barn_length - 275)))
        .times(Mat4.rotation(-Math.PI / 3, Vec.of(1, 0, 0)))
        .times(
          Mat4.scale(
            Vec.of(2 * (barn_length + 4), barn_roof_length, barn_width)
          )
        ),
      this.plastic.override({
        color: this.brown
      })
    );

    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 10, 40)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 10, -20)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 10, -20)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 10, 40)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 10, 10)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 10, 10)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 10, -45)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );

    this.shapes.cylinder.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 10, -45)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.scale(Vec.of(1, 1, 35))),
      this.plastic.override({ color: this.brown })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 0, 25)))
        .times(Mat4.scale(Vec.of(1, 20, 15))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 0, 25)))
        .times(Mat4.scale(Vec.of(1, 20, 15))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 0, -5)))
        .times(Mat4.scale(Vec.of(1, 20, 15))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-210, 0, -20)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 20, 15))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-225, 0, -32)))
        .times(Mat4.scale(Vec.of(1, 20, 13))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-270, 0, -30)))
        .times(Mat4.scale(Vec.of(1, 20, 15))),
      this.plastic.override({ color: this.brown })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-247, 0, 40)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 20, 23))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-247, 0, 10)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 20, 23))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-247, 0, -20)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 20, 23))),
      this.plastic.override({ color: this.brown })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(-247, 0, -45)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(1, 20, 23))),
      this.plastic.override({ color: this.brown })
    );
  }
};
