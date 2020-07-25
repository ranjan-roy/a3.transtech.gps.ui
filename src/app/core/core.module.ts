import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './service/notification.server';
import { NotificationComponent } from './components/notification/notification.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToasterModule } from 'angular2-toaster';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ToasterModule
  ],
  exports: [NotificationComponent],
  providers: [NotificationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }]
})
export class CoreModule { }
