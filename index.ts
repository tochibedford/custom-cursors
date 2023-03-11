const objects: Pointer[] = [];

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

class Pointer {
    private _x: number
    private _y: number
    private _dx: number // difference between mouse poition and current x position
    private _dy: number
    private _speed: number // 1 is normal
    public _animate: boolean
    public _element: HTMLElement

    constructor(x: number, y: number, dx: number, dy: number, speed: number, element: HTMLElement) {
        this._x = x
        this._y = y
        this._dx = 0
        this._dy = 0
        this._speed = speed
        this._element = element
        this._animate = true
        element.style.cssText =
            `
                position: absolute; 
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `
    }

    draw() {
        this._element.style.left = `${this._x - this._element.getBoundingClientRect().width / 2}px`
        this._element.style.top = `${this._y - this._element.getBoundingClientRect().height / 2}px`
    }

    update(_mouse: { x: number, y: number }) {
        //difference in distance
        this._dx = _mouse.x - this._x
        this._dy = _mouse.y - this._y

        //modify position based on difference
        this._x += this._dx * this._speed
        this._y += this._dy * this._speed
        this.draw()
    }

}

//animates all pointers
function syncAnimate(time: DOMHighResTimeStamp) {
    objects.forEach(pointer => {
        if (pointer._animate) {
            pointer.update(mouse)
        }
    })

    requestAnimationFrame(syncAnimate)

}


// window.addEventListener('mousemove', (event) => {
//     mouse.x = event.clientX
//     mouse.y = event.clientY
// })

// const mouse = new Pointer()
