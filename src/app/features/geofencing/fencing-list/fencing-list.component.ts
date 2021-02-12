import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";
import { NotificationService } from "../../../core/service/notification.server";
import { AuthService } from "../../../core/service/auth.service";
import { select, Store } from "@ngrx/store";
import * as operatorActions from "../../../state/operator/operator.actions";
import * as deviceActions from "../../../state/device/device.actions";
import * as userActions from "../../../state/user/user.actions";

import * as deviceReducer from "../../../state/device/device.reducers";
import * as operatorReducer from "../../../state/operator/operator.reducers";
import * as userReducer from "../../../state/user/user.reducers";
import { GeofencingService } from "../../../services/geofencing.service";

@Component({
  selector: "app-fencing-list",
  templateUrl: "./fencing-list.component.html",
  styleUrls: ["./fencing-list.component.css"],
})
export class FencingListComponent implements OnInit {
  title = "Geofencing";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = null;
  actionItems = [
    // { label: "Edit", action: "edit", iconClass: "icon-pencil" },
    // { label: "View", action: "view", iconClass: "icon-eye" },
    // { label: "Delete", action: "delete", iconClass: "icon-trash" },
  ];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    public auth: AuthService,
    private router: Router,
    private storage: StorageService,
    private geofenceSvc: GeofencingService,
    protected _notificationSvc: NotificationService,
    private store: Store<any>
  ) {
    // geGeofenceByUser
    this.store
      .pipe(select(userReducer.selectGeofenceByUser))
      .subscribe((res) => {
        if (res && res.length) {
          this.rowData = res.map((item) => {
            return {
              ...item,
              address: [item.city, item.state, item.country].join(", "),
            };
          });
        }
      });
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Company Name",
        field: "user.companyName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Vendor",
        field: "vendor.name",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Geofence Type",
        field: "geofenceType.name",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Address",
        field: "address",
        sortable: true,
        filter: true,
      },
    ];
    this.setActionItem();
  }
  loadData() {
    const userId = this.storage.getItem("userId");
    if (!this.rowData) {
      this.store.dispatch(new userActions.GetGeofenceByUserInitAction(userId));
    }
  }
  onBtnClick(e) {
    if (e.action === "add") {
      this.router.navigate(["/Geofencing/add-edit"]);
    }
    if (e.action === "edit") {
      this.router.navigate(["/Geofencing/add-edit"], {
        state: this.selectedRow,
      });
    }
    if (e.action === "view") {
      this.router.navigate(["/Geofencing/view-fencing"], {
        state: this.selectedRow,
      });
    }
    if (e.action === "delete") {
      this.delete(this.selectedRow);
    }
  }

  setActionItem() {
    this.actionItems = [];
    this.defaultActionItem = [];
    const actions = this.auth.getActions("Geofencing");
    if (actions.includes("Add")) {
      this.defaultActionItem.push({
        label: "Add",
        action: "add",
        iconClass: "icon-plus",
      });
    }
    if (actions.includes("View")) {
      this.actionItems.push({
        label: "View",
        action: "view",
        iconClass: "icon-eye",
      });
    }
    if (actions.includes("Edit")) {
      this.actionItems.push({
        label: "Edit",
        action: "edit",
        iconClass: "icon-pencil",
      });
    }
    if (actions.includes("Delete")) {
      this.actionItems.push({
        label: "Delete",
        action: "delete",
        iconClass: "icon-trash",
      });
    }
  }

  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0];
    this.showAction = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }

  delete(geofence) {
    const userId = this.storage.getItem("userId");
    this.geofenceSvc.getGroupIdByUser(userId).subscribe((group) => {
      if (group && group.length) {
        this._notificationSvc.success(
          "Success",
          "Group Id Fetched successfully"
        );
        this.geofenceSvc
          .deleteGeofenceGroup(geofence.geofenceId, group[0]["groupId"])
          .subscribe((res) => {
            if (res) {
              this.geofenceSvc
                .deleteGeofence(geofence.geofenceId)
                .subscribe((res) => {
                  this._notificationSvc.success(
                    "Success",
                    "Deleted  successfully"
                  );
                  this.loadData();
                });
            }
            this.loadData();
          });
      }
    });
  }
}
