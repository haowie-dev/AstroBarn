class smoke_particle {
  constructor(acceleration, x_spread, z_spread) {
    this.acceleration = acceleration;
    this.x_spread = x_spread;
    this.z_spread = z_spread;
    this.count = 0;
    this.count_step = 0.1;
    this.particle_size = 0.5;
    this.alpha_start = 1.2;
    this.x_initial = 0;
    this.y_initial = 0;
    this.z_initial = 0;
  }

  smoke_x = () => {
    return Math.sin(this.count) * this.x_spread;
  };

  smoke_y = () => {
    return Math.pow((this.count * this.acceleration) / 5, 1.4);
  };

  smoke_z = () => {
    return Math.sin(this.count) * this.z_spread;
  };

  draw(scene, m, graphics_state, height) {
    this.count += this.count_step;

    if (this.x_initial === 0) {
      this.x_initial = m[0][3];
      this.y_initial = m[1][3];
      this.z_initial = m[2][3];
    }

    let xcoord = this.smoke_x();
    let ycoord = this.smoke_y();
    let zcoord = this.smoke_z();
    const alpha = this.alpha_start - (ycoord * 100) / (height * 100);

    if (ycoord >= this.y_initial + height) {
      this.count = 0;
    }

    m = m.times(
      Mat4.translation(
        Vec.of(
          this.x_initial + xcoord,
          this.y_initial + ycoord,
          this.z_initial + zcoord
        )
      )
    );

    scene.draw_smoke_particle(
      m,
      graphics_state,
      this.acceleration,
      this.particle_size,
      alpha
    );
  }
}

let SmokeMixin = {
  draw_smoke_chimney(m, graphics_state, smoke_array, height) {
    for (var i = 0; i < smoke_array.length; i++) {
      smoke_array[i].draw(this, m, graphics_state, height);
    }
  },
  draw_smoke_particle(m, graphics_state, acceleration, scale, alpha) {
    this.shapes.pyramid.draw(
      graphics_state,
      m
        .times(Mat4.scale(Vec.of(scale, scale, scale)))
        .times(Mat4.rotation(Math.sin(acceleration) * 10, Vec.of(1, 1, 1))),
      this.plastic.override({
        color: Color.of(105 / 255, 105 / 255, 105 / 255, alpha)
      })
    );
  }
};
