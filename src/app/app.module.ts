import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WallModule } from './wall/wall.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WallModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
