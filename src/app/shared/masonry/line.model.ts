import { Direction } from './direction.enum';
import { ElementInfo } from './element-info.interface';
import { Size } from './size.mode';

export class Line {
    private elements: ElementInfo[];
    private freeSpace: number;

    public previous?: Line;
    public next?: Line;

    public constructor(private size: Size) {
        this.freeSpace = this.size.mainAxis;
    }

    public fill(source: ElementInfo[]): ElementInfo[] {
        let remainingSpace = this.freeSpace;
        while (source.length && remainingSpace > 0) {
            const element = source[0];
            element.resise({ crossAxis: this.size.crossAxis });
            remainingSpace = this.freeSpace - element.size.mainAxis;
            if (remainingSpace >= 0) {
                this.elements.push(source.shift());
                this.freeSpace = remainingSpace;
            }
        }
        return source;
    }

    public assign(element: ElementInfo): boolean {
        if (this.freeSpace <= 0) {
            return false;
        }
        element.resise({ crossAxis: this.size.crossAxis });
        const remainingSpace = this.freeSpace - element.size.mainAxis;
        if (remainingSpace < 0) {
            return false;
        }
        this.elements.push(element);
        this.freeSpace = remainingSpace;
        return true;
    }

    public fit() {

    }
}
