class Assignment_Two_Skeleton extends Scene_Component {
    // The scene begins by requesting the camera, shapes, and materials it will need.
    constructor(context, control_box) {
        super(context, control_box);

        // First, include a secondary Scene that provides movement controls:
        if(!context.globals.has_controls)
            context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));
        // Locate the camera here (inverted matrix).
        const r = context.width / context.height;
        context.globals.graphics_state.camera_transform = Mat4.translation([0, 0, -35]);
        context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);

        // At the beginning of our program, load one of each of these shape
        // definitions onto the GPU.  NOTE:  Only do this ONCE per shape
        // design.  Once you've told the GPU what the design of a cube is,
        // it would be redundant to tell it again.  You should just re-use
        // the one called "box" more than once in display() to draw
        // multiple cubes.  Don't define more than one blueprint for the
        // same thing here.
        const shapes = {
            'square': new Square(),
            'circle': new Circle(15),
            'pyramid': new Tetrahedron(false),
            'simplebox': new SimpleCube(),
            'box': new Cube(),
            'cylinder': new Cylinder(15),
            'cone': new Cone(20),
            'ball': new Subdivision_Sphere(4)
        }
        this.submit_shapes(context, shapes);
        this.shape_count = Object.keys(shapes).length;

        // Make some Material objects available to you:
        this.clay = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
            ambient: .4,
            diffusivity: .4
        });
        this.plastic = this.clay.override({
            specularity: .6
        });
        this.texture_base = context.get_instance(Phong_Shader).material(Color.of(0, 0, 0, 1), {
            ambient: 1,
            diffusivity: 0.4,
            specularity: 0.3
        });

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
        
        this.lights = [new Light(Vec.of(10, 10, 20, 1), Color.of(1, .4, 1, 1), 100000)];
        this.yellow = Color.of(1, 1, 0, 1); 
        this.t = 0;
    }


    // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
    make_control_panel() {
        this.key_triggered_button("Pause Time", ["n"], () => {
            this.paused = !this.paused;
        });
    }
    draw_chicken(m, graphics_state, scale, xcoord, ycoord, zcoord) {

        //Initial Body 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord, zcoord)))
            .times(Mat4.scale(Vec.of(scale, scale, scale))), 
            this.clay.override({ color: Color.of(255, 255, 255, 10) })); 
        //Head of chicken 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + (20 / (15 / scale)), ycoord, zcoord+(10 / (15 / scale)))))
            .times(Mat4.scale(Vec.of(scale / 1.875, scale / 1.875, scale / 1.875))),
            this.clay.override({ color: Color.of(255, 255, 255, 10) })); 
        //Eye lid left 
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28 / (15 / scale), ycoord - 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 9.375 , scale / 9.375, scale /9.375))),
            this.clay.override({ color: Color.of(0, 0, 0, 10) }));   
        //Eye lid right
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28 / (15 / scale), ycoord + 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 9.375, scale / 9.375, scale / 9.375))),
            this.clay.override({ color: Color.of(0, 0, 0, 10) })); 
         //left eye   
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28.1 /(15 / scale), ycoord - 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 10.71428, scale / 10.71428, scale / 10.71428))),
            this.clay.override({ color: Color.of(255, 255, 255, 10) }));
        //right eye    
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28.1 / (15 / scale), ycoord + 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 10.71428, scale / 10.71428, scale / 10.71428))),
            this.clay.override({ color: Color.of(255, 255, 255, 10) })); 
        //left pupil
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28.2 / (15 / scale), ycoord - 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 30, scale / 30, scale / 30))),
            this.clay.override({ color: Color.of(0, 0, 0, 10) }));
        //right Pupil
        this.shapes.circle.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28.2 / (15 / scale), ycoord + 2 / (15 / scale), zcoord + 13 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(1, 0, 0)))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 30, scale / 30,  scale / 30))),
            this.clay.override({ color: Color.of(0, 0, 0, 10) })); 
            
        //beak
        this.shapes.cone.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 28 / (15 / scale), ycoord, zcoord + 10 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(scale / 11.538, scale /11.538, scale / 11.538)), 
            this.clay.override({ color: Color.of(255, 255, 0, 1)}));

        //Mouth area under beak
        this.shapes.ball.draw(
            graphics_state, 
            m.times(Mat4.translation(Vec.of(xcoord + 27.5 / (15 / scale), ycoord - .5 /(15 / scale), zcoord + 5.7 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.rotation(-Math.PI / 12, Vec.of(0, 0, 1)))
            .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 
        this.shapes.ball.draw(
            graphics_state, 
            m.times(Mat4.translation(Vec.of(xcoord + 27.5 / (15 / scale), ycoord, zcoord + 5.7/ (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 
        this.shapes.ball.draw(
            graphics_state, 
            m.times(Mat4.translation(Vec.of(xcoord + 27.5 / (15 / scale), ycoord + .5 / (15 / scale), zcoord + 5.7/ (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.rotation(Math.PI / 12, Vec.of(0, 0, 1)))
            .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 
        this.shapes.ball.draw(
            graphics_state, 
            m.times(Mat4.translation(Vec.of(xcoord + 27.5 / (15 / scale), ycoord + 1 / (15 / scale), zcoord + 6 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/2, Vec.of(0, 1, 0)))
            .times(Mat4.rotation(Math.PI / 8, Vec.of(0, 0, 1)))
            .times(Mat4.scale(Vec.of(scale / 7.5, scale / 30, scale / 30))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 


        //Spikes on head
        this.shapes.cone.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 25 / (15 / scale) , ycoord, zcoord + 16 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/4, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 
        
        this.shapes.cone.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 23 / (15 / scale), ycoord, zcoord + 17.2 / (15 / scale))))
            .times(Mat4.rotation(Math.PI/8, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 
        this.shapes.cone.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 20.5 / (15 / scale), ycoord, zcoord + 17.5 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 11.5384, scale / 11.5384, scale / 7.5))),
            this.clay.override({ color: Color.of(1, 0, 0, 1) })); 



        //Legs
        //Left large leg
        this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord - 5 / (15 / scale), zcoord - 17 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 15, scale / 2.5))),
            this.clay.override({ color: Color.of(255, 255, 0, 1) }));

        this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord , ycoord-7.5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1 )})); 
          
          this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord-2.5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1)})); 
          this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 2.5 / (15/scale), ycoord-5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 10, scale / 15, scale  / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1)}));
       this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord + 5 / (15 / scale), zcoord - 17 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 15, scale / 2.5))),
            this.clay.override({ color: Color.of(255, 255, 0, 1) }));

        this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord+7.5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1 )})); 
          
          this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord, ycoord+2.5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 10, scale / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1)})); 
          this.shapes.box.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord + 2.5 / (15 / scale), ycoord+5 / (15 / scale), zcoord - 22 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 10, scale / 15, scale / 15))),
            this.clay.override({ color: Color.of(255, 255, 0, 1)}));
    
        //Tail Feathers
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord -13.5 / (15 / scale), ycoord-2 / (15 / scale), zcoord +15 / (15 / scale))))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
            this.clay.override({ color: Color.of(1, 0, 0, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord - 16 / (15 / scale), ycoord-2 / (15 / scale), zcoord + 14.9 / (15 / scale))))
            .times(Mat4.rotation(-1*Math.PI/12, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
            this.clay.override({ color: Color.of(1, 0, 0, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(xcoord-18.5 / (15 / scale), ycoord-2 / (15 / scale), zcoord + 14.2 / (15 / scale))))
            .times(Mat4.rotation(-1*Math.PI/6, Vec.of(0, 1, 0)))
            .times(Mat4.scale(Vec.of(scale / 15, scale / 5, scale / 1.666667))),
            this.clay.override({ color: Color.of(1, 0, 0, 1)}));
    }
    draw_cloud(m, graphics_state, scale, left_align) {
                this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(scale * -4 + left_align, 0, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale/1.1))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-1 * scale + left_align, 0, 4*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-2 * scale + left_align, scale, 3.91*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)}));  
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(scale * -2 + left_align, 0.625*scale, 4.53*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.5))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-2.5 * scale + left_align, 0.625*scale, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-3.25*scale + left_align, 0.625*scale, 4.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale/1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 

        this.shapes.ball.draw(
            graphics_state,
            m.times(Mat4.translation(Vec.of(-3.125*scale + left_align, 0.625*scale, 3.75*scale)))
            .times(Mat4.scale(Vec.of(scale, scale, scale / 1.2))),
            this.clay.override({ color: Color.of(255, 255, 255, 1)})); 
    }
    
    display(graphics_state) {
        // Use the lights stored in this.lights.
        graphics_state.lights = this.lights;
                
        // Find how much time has passed in seconds, and use that to place shapes.
        if (!this.paused)
            this.t += graphics_state.animation_delta_time / 1000;
        const t = this.t;
        let m = Mat4.identity(); 


       this.draw_chicken(m, graphics_state, 15, 0, -20, 40); 

    }
}

window.Assignment_Two_Skeleton = window.classes.Assignment_Two_Skeleton = Assignment_Two_Skeleton;