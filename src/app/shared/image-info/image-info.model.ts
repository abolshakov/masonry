import { ElementInfo } from '../masonry/element-info.interface';
import { Size } from '../masonry/size.mode';

export class ImageInfo implements ElementInfo {
    private _size: Size;

    public get size(): Size {
        return this._size;
    }

    public get ratio(): number {
        return this.size.height ? this.size.width / this.size.height : 0;
    }

    constructor(public image: HTMLImageElement) {
        this._size = {
            width: this.image.width,
            height: this.image.height
        };
    }

    public resise(size: Size) {
        if (!size.width && !size.height) {
            return;
        }
        const ratio = this.ratio;
        if (size.width) {
            this.image.setAttribute('width', size.width.toString());
            this._size.width = size.width;
        }
        if (size.height) {
            this.image.setAttribute('height', size.height.toString());
            this._size.height = size.height;
        }
        if (size.width && size.height) {
            return;
        }
        if (!size.width) {
            this._size.width = Math.round(ratio * size.height);
        } else {
            this._size.height = ratio ? Math.round(size.width / ratio) : 0;
        }
    }
}
