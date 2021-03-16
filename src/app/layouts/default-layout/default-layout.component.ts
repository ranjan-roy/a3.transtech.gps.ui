import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { StorageService } from "../../core/service/storage.service";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../core/service/auth.service";
import { environment } from "../../../environments/environment";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  private currentUser;
  userAccessLevel: number;
  private _hubConnection: HubConnection;
  constructor(
    private storage: StorageService,
    private userService: UserService,
    public auth: AuthService
  ) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
      this._hubConnection = new HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/notifierhub`)
        .build();

      this._hubConnection.on("broadcastNotification", (message) => {
        console.log("broadcastNotification", message);
      });

      this._hubConnection
        .start()
        .then(() => {
          this._hubConnection.invoke("OnConnected", x.userId); //1 = UserId
          console.log("SignalR connection started");
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
