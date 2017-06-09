import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { CalendarModule } from 'primeng/primeng';
import {BrowserModule} from '@angular/platform-browser';
@NgModule({
  imports: [CommonModule, AboutRoutingModule,CalendarModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
