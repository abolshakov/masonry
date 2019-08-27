import { Direction } from './direction.enum';
import { ElementInfo } from './element-info.interface';
import { Injectable } from '@angular/core';
import { Line } from './line.model';
import { OptimizationStrategy } from './optimization.strategy';
import { Size } from './size.mode';
import { Wall } from './wall.model';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    private cache: Wall[];

    constructor(private strategy: OptimizationStrategy) { }

    public construct(elements: ElementInfo[], lineWidth: number, lineHeight: number, direction: Direction) {
        this.cache = [];
        const size = new Size(lineWidth, lineHeight, direction);
        const wall = this.build(elements, size);
        console.log('THE WALL', wall);
    }

    private build(elements: ElementInfo[], size: Size): Wall {
        if (this.cache.length > elements.length - 1) {
            return this.cache[elements.length - 1].clone();
        }
        let optimalWall: Wall;
        let optimalValue = 0;

        for (let i = elements.length; i > 0; i--) {
            let firstLine = new Line(size);
            for (let j = 0; j < i; j++) {
                if (!firstLine.assign(elements[j])) {
                    i = j + 1;
                    firstLine = null;
                    break;
                }
            }
            if (!firstLine) {
                continue;
            }
            const remainingCount = elements.length - i;
            const wall = remainingCount === 0
                ? new Wall()
                : this.build(elements.slice(-remainingCount), size);
            wall.prepend(firstLine);
            const value = this.strategy.evaluate(wall, size);
            if (value > optimalValue) {
                optimalWall = wall;
                optimalValue = value;
            }
        }
        this.cache.push(optimalWall);
        return optimalWall;
    }
}
