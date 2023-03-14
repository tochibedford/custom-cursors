type IPointerOptions = {
    speed?: number;
    element?: HTMLElement;
    xOffset?: number;
    yOffset?: number;
};
declare class Pointer {
    private _x;
    private _y;
    private _dx;
    private _dy;
    private _speed;
    element: HTMLElement;
    container: HTMLElement;
    xOffset: number;
    yOffset: number;
    constructor(pointerOptions: Partial<IPointerOptions>);
    __draw__(): void;
    __update__(_mouse: {
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