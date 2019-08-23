import { ElementInfo } from '../masonry/element-info.interface';
import { Size } from '../masonry/size.mode';

export class ImageInfo implements ElementInfo {
    private _size: Size;

    public get size(): Size {
        return this._size;
    }

    public get ratio(): number {
        return this.size.crossAxis ? this.size.mainAxis / this.size.crossAxis : 0;
    }

    constructor(public image: HTMLImageElement) {
        this._size = {
            mainAxis: this.image.width,
            crossAxis: this.image.height
        };
    }

    public resise(size: Size) {
        if (!size.mainAxis && !size.crossAxis) {
            return;
        }
        const ratio = this.ratio;
        if (size.mainAxis) {
            this.image.setAttribute('width', size.mainAxis.toString());
            this._size.mainAxis = size.mainAxis;
        }
        if (size.crossAxis) {
            this.image.setAttribute('height', size.crossAxis.toString());
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
