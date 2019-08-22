import { Direction as Direction } from './direction.enum';
import { ElementInfo } from './element-info.interface';
import { Size } from './size.mode';

export class Line {
    public direction: Direction;
    public size: Size;
    public elements: ElementInfo[];

    public fit() {

    }
}
