import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
  } from '@angular/core';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImagesService as ImageSourceService } from '../shared/image-source.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'msn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements AfterViewInit {
  public loading = true;

  @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

  public get images(): string[] {
    return this.provider.imageSet('a');
  }

  constructor(private provider: ImageSourceService, private info: ImageInfoService) { }

  public ngAfterViewInit() {
    this.info.process(this.imageRefs.map(r => r.nativeElement))
      .pipe(take(1))
      .subscribe(result => {
        console.log('RESULT', result);
        this.loading = false;
      });
  }
}
