import { ElementInfo } from '../masonry/element-info.interface';

export class ImageInfo implements ElementInfo {
    private _width: number;
    private _height: number;

    public index: number;

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    private get ratio(): number {
        return this.height ? this.width / this.height : 0;
    }

    constructor(public image: HTMLImageElement) {
        this._width = this.image.width;
        this._height = this.image.height;
    }

    public resise(width: number | null, height: number | null) {
        if (!width && !height) {
            return;
        }
        const ratio = this.ratio;
        if (width) {
            this.image.setAttribute('width', width.toString());
            this._width = width;
        }
        if (height) {
            this.image.setAttribute('height', height.toString());
            this._height = height;
        }
        if (width && height) {
            return;
        }
        if (!width) {
            this._width = Math.round(ratio * height);
        } else {
            this._height = ratio ? Math.round(width / ratio) : 0;
        }
    }
}
