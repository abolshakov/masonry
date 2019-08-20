import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WallComponent } from './wall.component';

@NgModule({
    declarations: [WallComponent],
    imports: [CommonModule],
    exports: [WallComponent]
})
export class WallModule { }
