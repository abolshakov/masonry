import { ElementInfo } from './element-info.interface';
import { Size } from './size.mode';

export class Line {
    private _elements: ElementInfo[] = [];
    private _freeSpace: number;

    public get freeSpace(): number {
        return this._freeSpace;
    }

    public get elements(): ElementInfo[] {
        return this._elements;
    }

    public constructor(private size: Size) {
        this._freeSpace = this.size.mainAxis;
    }

    public assign(element: ElementInfo): boolean {
        if (this._freeSpace <= 0) {
            return false;
        }
        element.resise(null, this.size.height);
        const elementSize = new Size(element.width, element.height, this.size.direction);
        const remainingSpace = this._freeSpace - elementSize.mainAxis;
        if (remainingSpace < 0) {
            if (this._elements.length === 0) {
                element.resise(this.size.mainAxis, null);
                this._elements.push(element);
                this._freeSpace = 0;
                return true;
            }
            return false;
        }
        this._elements.push(element);
        this._freeSpace = remainingSpace;
        return true;
    }

    public fit() {

    }
}
