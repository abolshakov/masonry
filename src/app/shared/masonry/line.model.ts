import { ElementInfo } from './element-info.interface';
import { RelativeSize } from './relative-size.model';

export class Line {
    private _elements: ElementInfo[] = [];
    private _freeSpace: number;

    public get elements(): ElementInfo[] {
        return this._elements;
    }

    public get freeSpace(): number {
        return this._freeSpace;
    }

    public constructor(private size: RelativeSize) {
        this._freeSpace = this.size.mainAxis;
    }

    public assign(element: ElementInfo): boolean {
        if (this._freeSpace <= 0) {
            return false;
        }
        const clone = element.clone();
        clone[this.size.crossAxisName] = this.size.crossAxis;
        const size = new RelativeSize(clone.width, clone.height, this.size.direction);
        const remainingSpace = this._freeSpace - size.mainAxis;
        if (remainingSpace < 0) {
            if (this._elements.length === 0) {
                clone[this.size.mainAxisName] = this.size.mainAxis;
                this._elements.push(clone);
                this._freeSpace = 0;
                return true;
            }
            return false;
        }
        this._elements.push(clone);
        this._freeSpace = remainingSpace;
        return true;
    }

    public fit() {
        console.log('BEFORE FIT', this._freeSpace);
        if (!this._freeSpace) {
            return;
        }
        const ratio = (this.size.mainAxis - this._freeSpace) / this.size.crossAxis;
        const cross = this.size.mainAxis / ratio;
        this.elements.forEach(x => x[this.size.crossAxisName] = cross);
        console.log('FIT', this.size.width - this._elements.map(x => x.width).reduce((prev, curr) => prev + curr, 0));
    }
}
