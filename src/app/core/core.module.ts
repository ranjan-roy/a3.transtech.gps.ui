import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './service/notification.server';
import { NotificationComponent } from './components/notification/notification.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToasterModule } from 'angular2-toaster';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [NotificationComponent, LoginComponent,
    RegisterComponent,
    LogoutComponent,],
  imports: [
    CommonModule,
    ToasterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NotificationComponent],
  providers: [NotificationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
})
export class CoreModule { }
