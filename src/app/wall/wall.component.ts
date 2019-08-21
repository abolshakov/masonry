import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { ImagesService as ImageSourceService } from '../shared/image-source.service';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'msn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements AfterViewInit {

  @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

  public get images(): string[] {
    return this.provider.imageSet('a');
  }

  constructor(private provider: ImageSourceService, private info: ImageInfoService) { }

  public ngAfterViewInit() {
    this.info.process(this.imageRefs.map(r => r.nativeElement))
      .pipe(take(1))
      .subscribe(result => console.log('RESULT', result));
  }

}
