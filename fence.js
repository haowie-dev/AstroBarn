//    |   |   |   |   |
//    -----------------
//    |   |   |   |   |
//    -----------------
//    |   |   |   |   |

let FenceMixin = {
  draw_fence_enclosure(graphics_state, m) {
    for (var i = -300; i <= 600; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, 650, 1.571, 0, 1, 0);
    }

    for (var i = -300; i <= 600; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, -650, 1.571, 0, 1, 0);
    }


    for (var i = 200; i <= 500; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, 100, 1.571, 0, 1, 0);
    }
    this.draw_fence(graphics_state, m, i, 0, 100, 1.571, 0, 1, 0);

    m = m.times(Mat4.rotation(1.57, Vec.of(0, 1, 0))); 

    for (var i = -600; i <= 600; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, 650, 1.571, 0, 1, 0);
    }

    for (var i = -600; i <= 600; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, -350, 1.571, 0, 1, 0);
    }


    for (var i = -600; i <= 600; i += 100) {
      this.draw_fence(graphics_state, m, i, 0, 200, 1.571, 0, 1, 0);
    }



  },

  draw_fence(
    graphics_state,
    m,
    xcoord,
    ycoord,
    zcoord,
    degree,
    xdegree,
    ydegree,
    zdegree
  ) {
    //top horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(
        Mat4.translation(Vec.of(xcoord, ycoord + 12, zcoord))
          .times(Mat4.rotation(degree, Vec.of(xdegree, ydegree, zdegree)))
          .times(Mat4.scale(Vec.of(1, 1, 50)))
      ),
      this.plastic.override({ color: this.brick })
    );

    //middle horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(
        Mat4.translation(Vec.of(xcoord, ycoord, zcoord))
          .times(Mat4.rotation(degree, Vec.of(xdegree, ydegree, zdegree)))
          .times(Mat4.scale(Vec.of(1, 1, 50)))
      ),
      this.plastic.override({ color: this.brick })
    );

    //bottom horizontal bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(
        Mat4.translation(Vec.of(xcoord, ycoord - 12, zcoord))
          .times(Mat4.rotation(degree, Vec.of(0, 1, 0)))
          .times(Mat4.scale(Vec.of(1, 1, 50)))
      ),
      this.plastic.override({ color: this.brick })
    );

    //1st vertical bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(
        Mat4.translation(Vec.of(xcoord - 50, ycoord, zcoord))
          .times(Mat4.rotation(degree, Vec.of(1, 0, 0)))
          .times(Mat4.scale(Vec.of(1, 1, 20)))
      ),
      this.plastic.override({ color: this.brick })
    );

    //last vertical bar
    this.shapes.cylinder.draw(
      graphics_state,
      m.times(
        Mat4.translation(Vec.of(xcoord + 50, ycoord, zcoord))
          .times(Mat4.rotation(degree, Vec.of(1, 0, 0)))
          .times(Mat4.scale(Vec.of(1, 1, 20)))
      ),
      this.plastic.override({ color: this.brick })
    );
  },
};
