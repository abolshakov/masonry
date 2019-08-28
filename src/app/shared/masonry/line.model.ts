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
        const originalValue = element[this.size.crossAxisName];
        element[this.size.crossAxisName] = this.size.crossAxis;
        const elementSize = new Size(element.width, element.height, this.size.direction);
        const remainingSpace = this._freeSpace - elementSize.mainAxis;
        if (remainingSpace < 0) {
            element[this.size.crossAxisName] = originalValue;
            if (this._elements.length === 0) {
                element[this.size.mainAxisName] = this.size.mainAxis;
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
        const ratio = (this.size.mainAxis - this.freeSpace) / this.size.crossAxis;
        const cross = this.size.mainAxis / ratio;
        this.elements.forEach(x => {
            x[this.size.crossAxisName] = cross;
            x.commitChanges();
        });
    }
}
