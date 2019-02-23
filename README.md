ASTROBARN
CS 174A

To add new objects, use file separation with mixins

Ex.

1. Create new file Thingy.js
2. In thingy.js, define a mixin class such as

```javascript
  let ThingyMixin = {
    draw_thingy(m, graphics_state) {
    this.draw_thingy_arm(m, graphics_state)
    },
    draw_thingy_arm(m, graphics_state) {
    ...
    },
  }
```

- (Notice its a Javascript object not class, so you need a comma after every function def)

3. Include the JS file in index.html

-     <script src="thingy.js"></script>

4. Use the following syntax at the bottom of main-scene.js to assign the mixin (dumb JS hack)

```javascript
Object.assign(Assignment_Two.prototype, ThingyMixin);
```
