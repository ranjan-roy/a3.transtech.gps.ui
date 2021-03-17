import { Component, OnInit } from "@angular/core";
import { INotification } from "../../interface/api.interface";
import { NotificationService } from "../../services/notification.service";
import { sortBy } from "lodash";
import { select, Store } from "@ngrx/store";
import * as notificationReducer from "../../state/notifications/notification.reducers";
import * as actions from "../../state/notifications/notification.actions";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  notifications: INotification[];
  constructor(private store: Store<any>) {
    this.store
      .pipe(select(notificationReducer.selectNotifications))
      .subscribe((notifications) => {
        if (notifications) {
          this.notifications = notifications;
        }
      });
  }

  ngOnInit(): void {
    if (!this.notifications) {
      console.log("ngOnInit");

      this.store.dispatch(new actions.GetNotificationInitAction({}));
    }
  }
}
