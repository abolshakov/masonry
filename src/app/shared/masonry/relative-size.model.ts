import { Direction } from './direction.enum';

export class RelativeSize {
    public get mainAxis(): number {
        return this[this.mainAxisName];
    }

    public set mainAxis(value: number) {
        this[this.mainAxisName] = value;
    }

    public get crossAxis(): number {
        return this[this.crossAxisName];
    }

    public set crossAxis(value: number) {
        this[this.crossAxisName] = value;
    }

    public get mainAxisName(): string {
        return this.direction === Direction.row ? 'width' : 'height';
    }

    public get crossAxisName(): string {
        return this.direction === Direction.row ? 'height' : 'width';
    }

    public get ratio(): number {
        return this.crossAxis ? this.mainAxis / this.crossAxis : 0;
    }

    constructor(
        public width: number,
        public height: number,
        public direction: Direction
    ) { }
}
