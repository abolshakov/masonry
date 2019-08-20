import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImagesService {
    private sets: Map<string, number> = new Map([
        ['a', 15]
    ]);

    public imageSet(name: string): string[] {
        const count = this.sets.get(name);
        const result = [];
        for (let i = 1; i <= count; i++) {
            result.push(`assets/images/${name}/${i}.png`);
        }
        return result;
    }
}
