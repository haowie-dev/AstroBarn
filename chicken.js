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
    var dist =
      (ball_1_x - ball_2_x) * (ball_1_x - ball_2_x) +
      (ball_1_y - ball_2_y) * (ball_1_x - ball_2_x) +
      (ball_1_z - ball_2_z) * (ball_1_z - ball_2_z);
    console.log(dist);
    if (dist < 2000) {
      return true;
    }
    return false;
  }

  draw(scene, m, graphics_state, t) {
    m = m.times(
      Mat4.translation(Vec.of(this.x_pos(t), this.y_pos(t), this.z_pos(t)))
    );
    scene.draw_chicken(m, graphics_state, 15, 0, -20, 40);
  }
}

let ChickenMixin = {
  draw_chicken(m, graphics_state, scale, xcoord, ycoord, zcoord) {
    //Initial Body
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(Mat4.translation(Vec.of(xcoord, ycoord, zcoord)))
        .times(Mat4.scale(Vec.of(scale, scale, scale))),
      this.clay.override({ color: Color.of(255, 255, 255, 10) })
    );
    //Head of chicken
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 20 / (15 / scale),
              ycoord,
              zcoord + 10 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 1.875, scale / 1.875, scale / 1.875))),
      this.clay.override({ color: Color.of(255, 255, 255, 10) })
    );
    //Eye lid left
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 9.375, scale / 9.375, scale / 9.375))),
      this.clay.override({ color: Color.of(0, 0, 0, 10) })
    );
    //Eye lid right
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28 / (15 / scale),
              ycoord + 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 9.375, scale / 9.375, scale / 9.375))),
      this.clay.override({ color: Color.of(0, 0, 0, 10) })
    );
    //left eye
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28.1 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(
          Mat4.scale(
            Vec.of(scale / 10.71428, scale / 10.71428, scale / 10.71428)
          )
        ),
      this.clay.override({ color: Color.of(255, 255, 255, 10) })
    );
    //right eye
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28.1 / (15 / scale),
              ycoord + 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(
          Mat4.scale(
            Vec.of(scale / 10.71428, scale / 10.71428, scale / 10.71428)
          )
        ),
      this.clay.override({ color: Color.of(255, 255, 255, 10) })
    );
    //left pupil
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28.2 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 30, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(0, 0, 0, 10) })
    );
    //right Pupil
    this.shapes.circle.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28.2 / (15 / scale),
              ycoord + 2 / (15 / scale),
              zcoord + 13 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 30, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(0, 0, 0, 10) })
    );

    //beak
    this.shapes.cone.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 28 / (15 / scale),
              ycoord,
              zcoord + 10 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(scale / 11.538, scale / 11.538, scale / 11.538)),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );

    //Mouth area under beak
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 27.5 / (15 / scale),
              ycoord - 0.5 / (15 / scale),
              zcoord + 5.7 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.rotation(-Math.PI / 12, Vec.of(0, 0, 1)))
        .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 27.5 / (15 / scale),
              ycoord,
              zcoord + 5.7 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 27.5 / (15 / scale),
              ycoord + 0.5 / (15 / scale),
              zcoord + 5.7 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.rotation(Math.PI / 12, Vec.of(0, 0, 1)))
        .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 27.5 / (15 / scale),
              ycoord + 1 / (15 / scale),
              zcoord + 6 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 2, Vec.of(0, 1, 0)))
        .times(Mat4.rotation(Math.PI / 8, Vec.of(0, 0, 1)))
        .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );

    //Spikes on head
    this.shapes.cone.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 25 / (15 / scale),
              ycoord,
              zcoord + 16 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 4, Vec.of(0, 1, 0)))
        .times(
          Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))
        ),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );

    this.shapes.cone.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 23 / (15 / scale),
              ycoord,
              zcoord + 17.2 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(Math.PI / 8, Vec.of(0, 1, 0)))
        .times(
          Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))
        ),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.cone.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 20.5 / (15 / scale),
              ycoord,
              zcoord + 17.5 / (15 / scale)
            )
          )
        )
        .times(
          Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))
        ),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );

    //Legs
    //Left large leg
    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord - 5 / (15 / scale),
              zcoord - 17 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(-0.3 * Math.sin(this.t) + 0.1, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 15, scale / 15, scale / 2.5))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );
    let save = m;
    m = m
      .times(Mat4.translation(Vec.of(-1, -50, 35)))
      .times(Mat4.rotation(-0.1 * Math.sin(this.t) + Math.PI, Vec.of(0, 1, 0)))
      .times(Mat4.rotation(Math.PI, Vec.of(0, 0, 1)));
    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord - 7.5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord - 2.5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 2.5 / (15 / scale),
              ycoord - 5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 10, scale / 15, scale / 15))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );

    m = save;

    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord + 5 / (15 / scale),
              zcoord - 17 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation(0.3 * Math.sin(this.t) + 0.1, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 15, scale / 15, scale / 2.5))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );
    save = m;
    m = m
      .times(Mat4.translation(Vec.of(-1, -30, 35)))
      .times(Mat4.rotation(0.1 * Math.sin(this.t) + Math.PI, Vec.of(0, 1, 0)))
      .times(Mat4.rotation(Math.PI, Vec.of(0, 0, 1)));

    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord + 7.5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );

    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord,
              ycoord + 2.5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15)))
        .times(Mat4.rotation(Math.PI / 2, Vec.of(1, 0, 0))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );
    this.shapes.box.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord + 2.5 / (15 / scale),
              ycoord + 5 / (15 / scale),
              zcoord - 22 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 10, scale / 15, scale / 15))),
      this.clay.override({ color: Color.of(255, 255, 0, 1) })
    );
    m = save;
    //Tail Feathers
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord - 13.5 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 15 / (15 / scale)
            )
          )
        )
        .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord - 16 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 14.9 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation((-1 * Math.PI) / 12, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
    this.shapes.ball.draw(
      graphics_state,
      m
        .times(
          Mat4.translation(
            Vec.of(
              xcoord - 18.5 / (15 / scale),
              ycoord - 2 / (15 / scale),
              zcoord + 14.2 / (15 / scale)
            )
          )
        )
        .times(Mat4.rotation((-1 * Math.PI) / 6, Vec.of(0, 1, 0)))
        .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
      this.clay.override({ color: Color.of(1, 0, 0, 1) })
    );
  }
};
