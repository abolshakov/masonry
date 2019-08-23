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

    public assign(element: ElementInfo): boolean {
        if (this.freeSpace <= 0) {
            return false;
        }
        element.resise({ crossAxis: this.size.crossAxis });
        const remainingSpace = this.freeSpace - element.size.mainAxis;
        if (remainingSpace < 0) {
            if (this.elements.length === 0) {
                element.resise({ mainAxis: this.size.mainAxis });
                this.elements.push(element);
                this.freeSpace = 0;
                return true;
            }
            return false;
        }
        this.elements.push(element);
        this.freeSpace = remainingSpace;
        return true;
    }

    public fit() {

    }
}
