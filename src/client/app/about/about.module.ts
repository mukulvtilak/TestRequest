import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { CalendarModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutDummyService } from './about-dummy.service';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, CalendarModule, FormsModule],
  declarations: [AboutComponent],
  exports: [AboutComponent],
  providers: [AboutDummyService]
})
export class AboutModule { }
