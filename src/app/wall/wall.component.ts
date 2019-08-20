import { Component } from '@angular/core';
import { ImagesService as ImageService } from '../shared/images.service';

@Component({
  selector: 'msn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent {

  public get images(): string[] {
    return this.provider.imageSet('a');
  }

  constructor(private provider: ImageService) { }

}
