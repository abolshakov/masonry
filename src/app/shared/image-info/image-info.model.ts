import { ElementInfo } from '../masonry/element-info.interface';

export class ImageInfo implements ElementInfo {
    private _width: number;
    private _height: number;
    private _marginsWidth: number;
    private _marginsHeight: number;

    public get width(): number {
        return this._width + this._marginsWidth;
    }

    public set width(value: number) {
        this.resise(value - this._marginsWidth, null);
    }

    public get height(): number {
        return this._height + this._marginsHeight;
    }

    public set height(value: number) {
        this.resise(null, value - this._marginsHeight);
    }

    private get ratio(): number {
        return this._height ? this._width / this._height : 0;
    }

    constructor(width: number, height: number, marginsWidth: number, marginsHeight: number) {
        this._width = width;
        this._height = height;
        this._marginsWidth = marginsWidth;
        this._marginsHeight = marginsHeight;
    }

    public clone(): ElementInfo {
        return new ImageInfo(this._width, this._height, this._marginsWidth, this._marginsHeight);
    }

    private resise(width: number | null, height: number | null) {
        if (!width && !height) {
            return;
        }
        if (width && height) {
            this._width = width;
            this._height = height;
            return;
        }
        const ratio = this.ratio;
        if (width) {
            this._width = width;
            this._height = ratio ? (width / ratio) : 0;
            return;
        }
        this._width = ratio * height;
        this._height = height;
    }
}
