const objects: Pointer[] = [];

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

type IPointerOptions = {
    speed?: number
    element?: HTMLElement
}
class Pointer {
    private _x: number
    private _y: number
    private _dx: number // difference between mouse poition and current x position
    private _dy: number
    private _speed: number // 1 is normal
    public element: HTMLElement
    public container: HTMLElement

    constructor(pointerOptions: Partial<IPointerOptions>) {
        const pointerOptionsDefaults: IPointerOptions = {
            speed: 1,
            element: pointerOptions.element
        }

        const newPointerOptions = Object.assign(pointerOptionsDefaults, pointerOptions)

        this._x = window.innerWidth / 2
        this._y = window.innerHeight / 2
        this._dx = 0
        this._dy = 0
        this._speed = newPointerOptions.speed
        this.element = newPointerOptions.element
        this.container = document.body
        this.element.style.cssText =
            `
                position: absolute; 
                left: ${this._x}px;
                top: ${this._y}px;
                pointer-events: none;
            `
    }

    draw() {
        this.element.style.left = `${this._x - this.element.getBoundingClientRect().width / 2 - (window.pageXOffset + this.container.getBoundingClientRect().left)}px`
        this.element.style.top = `${this._y - this.element.getBoundingClientRect().height / 2 - (window.pageYOffset + this.container.getBoundingClientRect().top)}px`
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

type ICursorOptions = {
    pointers: Pointer[]
    hideMouse: boolean
    container: HTMLElement
}

class Cursor {
    private _hideMouse: boolean
    private _pointers: Pointer[]
    private _container: HTMLElement

    constructor(_cursorOptions: Partial<ICursorOptions> & { pointers: Pointer[] }) {
        // Array.isArray(_cursorOptions.pointers) ? _cursorOptions.pointers.length : 0  - checks that _cursorOptions.pointers is an array
        // and if it is it returns the length of array else it returns 0, a bang operator is then used to negate it
        if (!(Array.isArray(_cursorOptions.pointers) ? _cursorOptions.pointers.length : 0)) {
            throw ("You need to provide at least 1 pointer in an array to the cursor")
        }
        const cursorOptionsDefaults: ICursorOptions = {
            pointers: null,
            hideMouse: false,
            container: document.body
        }

        const cursorOptions = Object.assign(cursorOptionsDefaults, _cursorOptions)
        this._hideMouse = cursorOptions.hideMouse
        this._pointers = cursorOptions.pointers
        this._container = cursorOptions.container
    }

    initCursor() {
        if (this.hideMouse) {
            this.container.style.cursor = "none"
        }
        this._pointers.forEach(pointer => {
            pointer.container = this._container
        })
        objects.push(...this._pointers)
        return () => {
            // cleanup
            this.pointers.forEach(pointer => {
                objects.splice(objects.indexOf(pointer), 1)
            })
        }
    }

    public get pointers() {
        return this._pointers
    }

    public get container() {
        return this._container
    }

    public get hideMouse() {
        return this._hideMouse
    }

}

//animates all pointers
function syncAnimate() {
    objects.forEach(pointer => {
        pointer.update(mouse)
    })

    requestAnimationFrame(syncAnimate)
}


function init() {
    requestAnimationFrame(syncAnimate)
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX
    mouse.y = event.pageY
})

export { Cursor, Pointer, init }