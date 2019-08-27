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
import {
  debounceTime,
  distinct,
  map,
  take,
  takeUntil
  } from 'rxjs/operators';
import { Direction } from '../shared/masonry/direction.enum';
import { ElementInfo } from '../shared/masonry/element-info.interface';
import { fromEvent, ReplaySubject } from 'rxjs';
import { ImageInfoService } from '../shared/image-info/image-info.service';
import { ImagesService as ImageSourceService } from '../shared/image-source.service';
import { MasonryService } from '../shared/masonry/masonry.service';

@Component({
  selector: 'msn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements AfterViewInit, OnDestroy {
  private readonly minLineHeight = 200;

  private unsubscribe = new EventEmitter();
  private elemnts = new ReplaySubject<ElementInfo[]>(1);

  @ViewChild('container', { static: true }) containerRef: ElementRef<HTMLElement>;
  @ViewChildren('img') imageRefs: QueryList<ElementRef<HTMLImageElement>>;

  public loading = true;

  public get images(): string[] {
    return this.provider.imageSet('a');
  }

  private get clientWidth(): number {
    return this.containerRef.nativeElement.clientWidth;
  }

  constructor(
    private provider: ImageSourceService,
    private estimator: ImageInfoService,
    private masonry: MasonryService
  ) { }

  public ngAfterViewInit() {
    this.estimator.process(this.imageRefs.map(r => r.nativeElement))
      .pipe(take(1))
      .subscribe(elements => {
        this.elemnts.next(elements);
        this.construct(elements);
        this.loading = false;
      });

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(500),
        map(() => this.clientWidth),
        distinct()
      )
      .subscribe(() => {
        this.elemnts
          .pipe(take(1))
          .subscribe(elements => this.construct(elements));
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
  }

  private construct(elements: ElementInfo[]) {
    this.masonry.construct(elements, this.clientWidth, this.minLineHeight, Direction.row);
  }
}
