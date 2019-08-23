import { ElementInfo } from './element-info.interface';
import { Injectable } from '@angular/core';
import { Line } from './line.model';
import { Size } from './size.mode';
import { Direction } from './direction.enum';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    public construct(elements: ElementInfo[]) {
        console.log('CONSTRUCTING FROM', elements);

        const direction = Direction.row;
        const lineWidth = 960;
        const lineHeight = 200;

        const lineSize = new Size();
        lineSize.mainAxis = direction === Direction.row ? lineWidth : lineHeight;
        lineSize.crossAxis = direction === Direction.row ? lineHeight : lineWidth;

        elements.forEach(e => e.direction = direction);
        let wall = new Line(lineSize);

        while (elements.length) {
            let result = false;
            do {
                result = wall.assign(elements[0]);
                if (result) {
                    elements.shift();
                } else {
                    wall.next = new Line(lineSize);
                    wall.next.previous = wall;
                    wall = wall.next;
                }
            } while (result);
        }


        elements.forEach(x => x.resise({ crossAxis: 150 }));
    }
}
