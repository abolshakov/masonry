import { ElementInfo } from './element-info.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    public construct(elements: ElementInfo[]) {
        console.log('CONSTRUCTING FROM', elements);
        elements.forEach(x => x.resise({ height: 150 }));
    }
}
