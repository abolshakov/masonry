import { Injectable } from '@angular/core';
import { ImageInfo } from './image-info.model';
import { from, Observable, fromEvent, forkJoin } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImageInfoService {
    public process(images: HTMLImageElement[]): Observable<ImageInfo[]> {
        const loading: Observable<ImageInfo>[] = [];
        return from(images)
            .pipe(
                tap(image => loading.push(fromEvent(image, 'load')
                    .pipe(
                        take(1),
                        map(() => new ImageInfo(image))
                    ))),
                switchMap(() => forkJoin(loading))
            );
    }
}
