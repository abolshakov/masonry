import { ElementInfo } from '../masonry/element-info.interface';

export class ImageInfo implements ElementInfo {
    private _width: number;
    private _height: number;

    public index: number;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this.resise(value, null);
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this.resise(null, value);
    }

    private get ratio(): number {
        return this.height ? this.width / this.height : 0;
    }

    constructor(public image: HTMLImageElement) {
        this.initSize();
    }

    public rollbackChanges() {
        this.initSize();
    }

    public commitChanges() {
        console.log('COMMIT', this.width, this.height, this.image.width, this.image.height);
        if (this.width !== this.image.width) {
            this.image.setAttribute('width', this.width.toString());
        }
        if (this.height !== this.image.height) {
            this.image.setAttribute('height', this.height.toString());
        }
    }

    private initSize() {
        this._width = this.image.width;
        this._height = this.image.height;
    }

    private resise(width: number | null, height: number | null) {
        if (!width && !height) {
            return;
        }
        const ratio = this.ratio;
        if (width) {
            this._width = width;
        }
        if (height) {
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
