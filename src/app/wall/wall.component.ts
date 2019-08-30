import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
  } from '@angular/core';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Direction } from '../shared/masonry/direction.enum';
import { ElementInfo } from '../shared/masonry/element-info.interface';
import { fromEvent, ReplaySubject } from 'rxjs';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImageLoadService } from '../shared/image-info/image-load.service';
import { ImagesService as ImageSourceService } from '../shared/image-source.service';
import { MasonryService } from '../shared/masonry/masonry.service';

@Component({
  selector: 'msn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements AfterViewInit, OnDestroy {
  private unsubscribe = new EventEmitter();
  private elementsInfo = new ReplaySubject<ElementInfo[]>(1);

  @ViewChild('container', { static: true }) containerRef: ElementRef<HTMLElement>;
  @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

  public loading = true;

  public get sources(): string[] {
    return this.provider.imageSet('a');
  }

  constructor(
    private provider: ImageSourceService,
    private loader: ImageLoadService,
    private imageInfo: ImageInfoService,
    private masonry: MasonryService
  ) { }

  public ngAfterViewInit() {
    this.loader.whenAll(this.imageRefs.map(r => r.nativeElement))
      .pipe(take(1))
      .subscribe(images => {
        const info = this.imageInfo.retrive(images);
        this.elementsInfo.next(info);
        this.construct(info);
        this.loading = false;
      });

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(500)
      )
      .subscribe(() => {
        this.elementsInfo
          .pipe(take(1))
          .subscribe(info => {
            this.loading = true;
            this.construct(info);
            this.loading = false;
          });
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
  }

  private construct(info: ElementInfo[]) {
    const lineWidth = this.containerRef.nativeElement.clientWidth;
    const lineHeight = Math.min(window.innerHeight, window.innerWidth) / 3;
    const updatedInfo = this.masonry.construct(info, lineWidth, lineHeight, Direction.row);
    this.imageInfo.update(this.imageRefs.map(r => r.nativeElement), updatedInfo);
  }
}
