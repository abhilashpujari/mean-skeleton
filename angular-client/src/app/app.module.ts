import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FlashMessageService } from './services/flash-message/flash-message.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    FlashMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
