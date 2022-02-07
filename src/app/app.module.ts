import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './core/http-interceptors/loader-interceptor.service';
import { DelayInterceptor } from './core/http-interceptors/delay-interceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoaderComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
  ],
})
export class AppModule {}
