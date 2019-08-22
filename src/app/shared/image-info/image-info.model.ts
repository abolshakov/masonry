export class ImageInfo {
    public readonly width: number;
    public readonly height: number;
    public readonly ratio: number;

    constructor(public image: HTMLImageElement) {
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.ratio = this.height ? this.width / this.height : 0;
    }
}
