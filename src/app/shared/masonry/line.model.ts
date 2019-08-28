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
        const clone = element.clone();
        clone[this.size.crossAxisName] = this.size.crossAxis;
        const elementSize = new Size(clone.width, clone.height, this.size.direction);
        const remainingSpace = this._freeSpace - elementSize.mainAxis;
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
        let cross: number;
        if (this.freeSpace) {
            const ratio = (this.size.mainAxis - this.freeSpace) / this.size.crossAxis;
            cross = this.size.mainAxis / ratio;
        }
        this.elements.forEach(x => {
            if (cross) {
                x[this.size.crossAxisName] = cross;
            }
            x.commitChanges();
        });
    }
}
