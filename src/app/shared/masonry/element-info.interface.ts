import { Size } from './size.mode';
import { Direction } from './direction.enum';

export interface ElementInfo {
    readonly size: Size;
    readonly ratio: number;
    direction: Direction;
    resise(size: Size): void;
}
