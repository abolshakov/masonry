import { Injectable } from '@angular/core';
import { ImageInfo } from './image-info.model';
import { from, Observable, fromEvent, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImageInfoService {
    public process(images: HTMLImageElement[]): Observable<ImageInfo[]> {
        const result = [];
        return from(images)
            .pipe(
                switchMap(i => fromEvent(i, 'load')
                ),
                tap(e => {
                    console.log('LOADED', e);
                    const t = e.target as HTMLImageElement;
                    result.push(new ImageInfo(t.naturalWidth, t.naturalHeight, t.naturalWidth / t.naturalHeight));
                }),
                switchMap(() => of(result))
            );
    }
}
