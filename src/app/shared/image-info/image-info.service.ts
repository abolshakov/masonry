import { ElementInfo } from '../masonry/element-info.interface';
import { ImageInfo } from './image-info.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageInfoService {
    public retrive(images: HTMLImageElement[]): ElementInfo[] {
        return images.map(image => {
            const margins = this.margins(image);
            return new ImageInfo(image.naturalWidth, image.naturalHeight, margins.width, margins.height);
        });
    }

    public update(images: HTMLImageElement[], info: ElementInfo[]) {
        images.forEach((image, i) => {
            const margins = this.margins(image);
            const width = info[i].width - margins.width;
            const height = info[i].height - margins.height;
            if (width > height) {
                image.setAttribute('width', width.toString());
            } else {
                image.setAttribute('height', height.toString());
            }

            console.log(`${info[i].width} x ${info[i].height} | ${image.clientWidth + margins.width} x ${image.clientHeight + margins.height}`);
        });
    }

    private margins(image: HTMLImageElement): { width: number, height: number } {
        const style = window.getComputedStyle(image);
        const width = Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
        const height = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom);
        return { width, height };
    }
}
