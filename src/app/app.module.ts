import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertifyService } from './services/alertify.service';
import { UtilitiesService } from './services/utilities.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AlertifyService, UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
