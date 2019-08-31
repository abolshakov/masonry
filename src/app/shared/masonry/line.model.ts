import { ElementInfo } from './element-info.interface';
import { RelativeSize } from './relative-size.model';

export class Line {
    private _elements: ElementInfo[] = [];
    // private _freeSpace: number;

    public get freeSpace(): number {
        // console.log('FREE',
        //  this.size.mainAxis,
        //  this._elements,
        //  this.size.crossAxisName,
        //  this._elements.reduce((prev, next) => prev[this.size.crossAxisName] + next[this.size.crossAxisName], 0),
        //   this.size.mainAxis - this._elements.reduce((prev, next) => prev[this.size.crossAxisName] + next[this.size.crossAxisName], 0));
        const free = this.size.mainAxis - this._elements.map(x => x[this.size.crossAxisName]).reduce((prev, next) => prev + next, 0);
        //console.log('FREE', free);
        return free;
        // return this._freeSpace;
    }

    public get elements(): ElementInfo[] {
        return this._elements;
    }

    public constructor(private size: RelativeSize) {
        // this._freeSpace = this.size.mainAxis;
    }

    public assign(element: ElementInfo): boolean {
        if (this.freeSpace <= 0) {
            return false;
        }
        const clone = element.clone();
        clone[this.size.crossAxisName] = this.size.crossAxis;
        const size = new RelativeSize(clone.width, clone.height, this.size.direction);
        const remainingSpace = this.freeSpace - size.mainAxis;
        if (remainingSpace < 0) {
            if (this._elements.length === 0) {
                clone[this.size.mainAxisName] = this.size.mainAxis;
                this._elements.push(clone);
                // this.freeSpace = 0;
                return true;
            }
            return false;
        }
        this._elements.push(clone);
        // this._freeSpace = remainingSpace;
        return true;
    }

    public fit() {
        console.log('BEFORE FIT', this.freeSpace);
        if (!this.freeSpace) {
            return;
        }
        const ratio = (this.size.mainAxis - this.freeSpace) / this.size.crossAxis;
        const cross = this.size.mainAxis / ratio;
        this.elements.forEach(x => x[this.size.crossAxisName] = cross);
        console.log('FIT', this.freeSpace);
    }
}
