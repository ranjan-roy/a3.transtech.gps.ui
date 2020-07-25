import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs";
import { NotificationService } from '../../service/notification.server';
import { Notification, NotificationType } from '../../service/interface';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class NotificationComponent {

  notifications: Notification[] = [];

  private _subscription: Subscription;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });


  constructor(private _notificationSvc: NotificationService, toasterService: ToasterService) {
    this.toasterService = toasterService;

  }

  private _addNotification(notification: Notification) {
    console.log(notification);
    this.notifications.push(notification);
    this.showNotification(notification);
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  ngOnInit() {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  showNotification(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        this.toasterService.pop('success', notification.title, notification.message);
        break;

      case NotificationType.warning:
        this.toasterService.pop('warning', notification.title, notification.message);
        break;

      case NotificationType.error:
        this.toasterService.pop('error', notification.title, notification.message);
        break;

      default:
        this.toasterService.pop('info', notification.title, notification.message);
        break;
    }

    return style;
  }
}