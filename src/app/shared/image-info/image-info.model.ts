import { ElementInfo } from '../masonry/element-info.interface';
import { Size } from '../masonry/size.mode';
import { Direction } from '../masonry/direction.enum';

export class ImageInfo implements ElementInfo {
    private _size: Size;

    public direction: Direction;

    public get size(): Size {
        if (!this._size) {
            this._size = {
                mainAxis: this.image[this.mainAxis],
                crossAxis: this.image[this.crossAxis]
            };
        }
        return this._size;
    }

    public get ratio(): number {
        return this.size.crossAxis ? this.size.mainAxis / this.size.crossAxis : 0;
    }

    private get mainAxis(): string {
        return this.direction === Direction.row ? 'width' : 'height';
    }

    private get crossAxis(): string {
        return this.direction === Direction.row ? 'height' : 'width';
    }

    constructor(public image: HTMLImageElement) {
    }

    public resise(size: Size) {
        if (!size.mainAxis && !size.crossAxis) {
            return;
        }
        const ratio = this.ratio;
        if (size.mainAxis) {
            this.image.setAttribute(this.mainAxis, size.mainAxis.toString());
            this._size.mainAxis = size.mainAxis;
        }
        if (size.crossAxis) {
            this.image.setAttribute(this.crossAxis, size.crossAxis.toString());
            this._size.crossAxis = size.crossAxis;
        }
        if (size.mainAxis && size.crossAxis) {
            return;
        }
        if (!size.mainAxis) {
            this._size.mainAxis = Math.round(ratio * size.crossAxis);
        } else {
            this._size.crossAxis = ratio ? Math.round(size.mainAxis / ratio) : 0;
        }
    }
}
