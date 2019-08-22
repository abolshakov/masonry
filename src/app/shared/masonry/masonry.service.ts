import { Injectable } from '@angular/core';
import { ImageInfo } from '../image-info/image-info.model';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    public construct(elements: ImageInfo[]) {
        console.log('CONSTRUCTING FROM', elements);
        elements.forEach(x => x.image.setAttribute('height', '150'));
    }
}
