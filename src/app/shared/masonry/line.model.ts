import { Direction as Direction } from './direction.enum';
import { ImageInfo } from '../image-info/image-info.model';
import { Size } from './size.mode';

export class Line {
    public direction: Direction;
    public size: Size;
    public elements: ImageInfo[];

    public fit() {

    }
}
