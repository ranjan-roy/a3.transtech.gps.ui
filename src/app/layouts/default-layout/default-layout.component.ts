import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { StorageService } from "../../core/service/storage.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  userAccessLevel: number;
  constructor(private storage: StorageService) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.userAccessLevel = parseInt(this.storage.getItem("accessLevel"));
    this.navItems = navItems.filter((nav) =>
      nav.accessLevel.includes(this.userAccessLevel)
    );
  }
}
