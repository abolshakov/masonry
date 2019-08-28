import { Direction } from './direction.enum';
import { ElementInfo } from './element-info.interface';
import { Injectable } from '@angular/core';
import { Line } from './line.model';
import { OptimizationStrategy } from './optimization.strategy';
import { Size } from './size.mode';
import { Wall } from './wall.model';

@Injectable({ providedIn: 'root' })
export class MasonryService {
    private readonly roundingСompensation = 1;

    constructor(private strategy: OptimizationStrategy) { }

    public construct(elements: ElementInfo[], lineWidth: number, lineHeight: number, direction: Direction) {
        const size = new Size(lineWidth, lineHeight, direction);
        size.mainAxis -= this.roundingСompensation;
        const wall = this.build(elements, size, [new Wall()]);
        wall.fitLines();
    }

    private build(elements: ElementInfo[], size: Size, cache: Wall[]): Wall {
        if (cache.length > elements.length) {
            return cache[elements.length].clone();
        }
        let optimalWall: Wall;
        let optimalValue = 0;

        for (let i = elements.length; i > 0; i--) {
            const firstLine = new Line(size);
            for (let j = 0; j < i; j++) {
                if (!firstLine.assign(elements[j])) {
                    i = j;
                    break;
                }
            }
            const remainingCount = elements.length - firstLine.elements.length;
            const wall = this.build(remainingCount ? elements.slice(-remainingCount) : [], size, cache);
            wall.prepend(firstLine);
            const value = this.strategy.evaluate(wall, size);
            if (value > optimalValue) {
                optimalWall = wall;
                optimalValue = value;
            }
        }
        cache.push(optimalWall);
        return optimalWall;
    }
}
