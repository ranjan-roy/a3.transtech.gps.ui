import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";
import { AuthService } from "../../../core/service/auth.service";
import * as moment from "moment";
import { select, Store } from "@ngrx/store";
import * as actions from "../../../state/user/user.actions";
import * as userReducer from "../../../state/user/user.reducers";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  title = "User";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];
  actionItems = [];
  defaultActionItems = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    private userSvc: UserService,
    private router: Router,
    private storage: StorageService,
    public auth: AuthService,
    private store: Store<any>
  ) {
    this.store.pipe(select(userReducer.selectUser)).subscribe((res) => {
      this.rowData = res;
    });
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Company",
        field: "companyName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "User Name",
        field: "userName",
        sortable: true,
        filter: true,
      },

      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Contact Primary",
        field: "contactPrimary",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Contact Secondary",
        field: "contactSecondary",
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
        headerName: "Reg Date",
        field: "createdDate",
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          return moment(data.data.createdDate).format("DD/MM/YYYY hh:mm a");
        },
      },
      {
        headerName: "Last Visit",
        field: "lastVisit",
        sortable: true,
        filter: true,
        cellRenderer: (data) => {
          return moment(data.data.lastVisit).format("DD/MM/YYYY hh:mm a");
        },
      },
    ];
    this.setActionItem();
  }

  loadData() {
    if (!this.rowData) {
      this.store.dispatch(new actions.GetUserInitAction({}));
    }
  }
  onBtnClick(e) {
    if (e.action === "add") {
      this.router.navigate(["/User/add-edit"]);
    }
    if (e.action === "edit") {
      this.router.navigate(["/User/add-edit"], { state: this.selectedRow });
    }
    if (e.action === "delete") {
      this.userSvc.deleteUser(this.selectedRow).subscribe((res) => {
        this.store.dispatch(new actions.GetUserInitAction({}));
      });
    }
  }
  setActionItem() {
    this.actionItems = [];
    this.defaultActionItems = [];
    const actions = this.auth.getActions("User");
    if (actions.includes("Add")) {
      this.defaultActionItems.push({
        label: "Add",
        action: "add",
        iconClass: "icon-plus",
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
}
