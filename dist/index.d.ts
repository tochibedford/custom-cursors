type IPointerOptions = {
    speed?: number;
    element?: HTMLElement;
};
declare class Pointer {
    private _x;
    private _y;
    private _dx;
    private _dy;
    private _speed;
    element: HTMLElement;
    container: HTMLElement;
    constructor(pointerOptions: Partial<IPointerOptions>);
    draw(): void;
    update(_mouse: {
        x: number;
        y: number;
    }): void;
}
type ICursorOptions = {
    pointers: Pointer[];
    hideMouse: boolean;
    container: HTMLElement;
};
declare class Cursor {
    private _hideMouse;
    private _pointers;
    private _container;
    constructor(_cursorOptions: Partial<ICursorOptions> & {
        pointers: Pointer[];
    });
    initCursor(): () => void;
    get pointers(): Pointer[];
    get container(): HTMLElement;
    get hideMouse(): boolean;
}
declare function init(): void;
export { Cursor, Pointer, init };
//# sourceMappingURL=index.d.ts.map