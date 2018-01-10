/** Angular Libraries */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
// import { MaterialModule } from '@angular/material';

/** Third Party Libraries */
// import { ChartsModule } from 'ng2-charts';

/** Application Modules */
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MessageService } from './shared/index';
import { AboutDummyService } from './about/about-dummy.service';


@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule, BrowserAnimationsModule
    // , MaterialModule
    // , ChartsModule
    , SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
  AboutDummyService],
  bootstrap: [AppComponent]

})
export class AppModule { }
