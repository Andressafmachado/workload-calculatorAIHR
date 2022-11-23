import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { HistoryComponent } from './components/history/history.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DatePipe
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
