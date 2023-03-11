const objects = [];
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
class Pointer {
    _x;
    _y;
    _dx; // difference between mouse poition and current x position
    _dy;
    _speed; // 1 is normal
    _element;
    constructor(pointerOptions) {
        const pointerOptionsDefaults = {
            speed: 1,
            element: pointerOptions.element
        };
        const newPointerOptions = Object.assign(pointerOptionsDefaults, pointerOptions);
        this._x = 0;
        this._y = 0;
        this._dx = 0;
        this._dy = 0;
        this._speed = newPointerOptions.speed;
        this._element = newPointerOptions.element;
        this._element.style.cssText =
            `
                position: absolute; 
                left: ${this._x}px;
                top: ${this._y}px;
                pointer-events: none;
            `;
    }
    draw() {
        this._element.style.left = `${this._x - this._element.getBoundingClientRect().width / 2}px`;
        this._element.style.top = `${this._y - this._element.getBoundingClientRect().height / 2}px`;
    }
    update(_mouse) {
        //difference in distance
        this._dx = _mouse.x - this._x;
        this._dy = _mouse.y - this._y;
        //modify position based on difference
        this._x += this._dx * this._speed;
        this._y += this._dy * this._speed;
        this.draw();
    }
}
class Cursor {
    _hideMouse;
    _pointers;
    _container;
    constructor(_cursorOptions) {
        // Array.isArray(_cursorOptions.pointers) ? _cursorOptions.pointers.length : 0  - checks that _cursorOptions.pointers is an array
        // and if it is it returns the length of array else it returns 0, a bang operator is then used to negate it
        if (!(Array.isArray(_cursorOptions.pointers) ? _cursorOptions.pointers.length : 0)) {
            throw ("You need to provide at least 1 pointer in an array to the cursor");
        }
        const cursorOptionsDefaults = {
            pointers: null,
            hideMouse: false,
            container: document.body
        };
        const cursorOptions = Object.assign(cursorOptionsDefaults, _cursorOptions);
        this._hideMouse = cursorOptions.hideMouse;
        this._pointers = cursorOptions.pointers;
        this._container = cursorOptions.container;
    }
    initCursor() {
        if (this.hideMouse) {
            this.container.style.cursor = "none";
        }
        objects.push(...this.pointers);
        return () => {
            // cleanup
            this.pointers.forEach(pointer => {
                objects.splice(objects.indexOf(pointer), 1);
            });
        };
    }
    get pointers() {
        return this._pointers;
    }
    get container() {
        return this._container;
    }
    get hideMouse() {
        return this._hideMouse;
    }
}
//animates all pointers
let animId;
function syncAnimate(time) {
    objects.forEach(pointer => {
        pointer.update(mouse);
    });
    animId = requestAnimationFrame(syncAnimate);
}
function init() {
    animId = requestAnimationFrame(syncAnimate);
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});
export { Cursor, Pointer, init };
//# sourceMappingURL=index.js.map