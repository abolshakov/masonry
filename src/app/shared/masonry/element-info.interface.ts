import { Size } from './size.mode';

export interface ElementInfo {
    readonly size: Size;
    readonly ratio: number;
    resise(size: Size): void;
}
