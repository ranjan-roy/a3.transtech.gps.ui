import { Component, OnInit, Renderer2 } from "@angular/core";
import { select, Store } from "@ngrx/store";

import { navItems } from "../../_nav";
import { StorageService } from "../../core/service/storage.service";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../core/service/auth.service";
import { environment } from "../../../environments/environment";
import * as actions from "../../state/notifications/notification.actions";
import * as notificationReducer from "../../state/notifications/notification.reducers";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  public currentUser;
  userAccessLevel: number;
  private _hubConnection: HubConnection;
  public isAsideMenuOpen = false;
  activeAsideTab = "notification";
  notificationCount = 0;
  constructor(
    private storage: StorageService,
    private userService: UserService,
    public auth: AuthService,
    private renderer: Renderer2,
    private store: Store<any>
  ) {
    this.store
      .pipe(select(notificationReducer.selectNotifications))
      .subscribe((notifications) => {
        if (notifications) {
          this.notificationCount = notifications.length;
        }
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  toggleAside(tabIndex) {
    this.activeAsideTab = tabIndex;
    if (this.isAsideMenuOpen) {
      this.renderer.removeClass(document.body, "aside-menu-show");
    } else {
      this.renderer.addClass(document.body, "aside-menu-show");
    }
    this.isAsideMenuOpen = !this.isAsideMenuOpen;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
      this._hubConnection = new HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/notifierhub`, {
          accessTokenFactory: () => this.storage.getToken(),
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Debug)
        .build();
      this._hubConnection.keepAliveIntervalInMilliseconds = 1000 * 60 * 3; // Three minutes
      this._hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 6; // Six minutes

      this._hubConnection.on("broadcastNotification", (message) => {
        this.store.dispatch(
          new actions.GetNotificationAppendAction(message[0])
        );
      });

      this._hubConnection.onclose(() => {
        this._hubConnection
          .start()
          .then(() => {
            //this._hubConnection.invoke("OnConnected", x.userId); //1 = UserId
            console.info("SignalR connection started");
          })
          .catch((err) =>
            console.log("error while establishing signalr connection: " + err)
          );
      });

      this._hubConnection
        .start()
        .then(() => {
          //this._hubConnection.invoke("OnConnected", x.userId); //1 = UserId
          console.info("SignalR connection started");
        })
        .catch((err) =>
          console.log("error while establishing signalr connection: " + err)
        );
    });
    this.userAccessLevel = parseInt(this.storage.getItem("accessLevel"));
    this.navItems = navItems.filter(
      (nav) => this.auth.isAllowed(nav.name) || nav.title
    );
  }
}
