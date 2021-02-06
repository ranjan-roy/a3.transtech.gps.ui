import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { StorageService } from "../../core/service/storage.service";
import { AuthService } from "../../core/service/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  userAccessLevel: number;
  constructor(private storage: StorageService, public auth: AuthService) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.userAccessLevel = parseInt(this.storage.getItem("accessLevel"));
    this.navItems = navItems.filter((nav) => this.auth.isAllowed(nav.name) || nav.title);
  }
}
