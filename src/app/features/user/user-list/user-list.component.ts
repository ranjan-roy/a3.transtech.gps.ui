import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";

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

  constructor(
    private userSvc: UserService,
    private router: Router,
    private storage: StorageService
  ) {
    this.frameworkComponents = {
      buttonRenderer: CellActionComponent,
    };
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "User Name",
        field: "userName",
        sortable: true,
        filter: true,
        editable: true,
      },

      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "Phone",
        field: "phone",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "Actions",
        field: "action",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          label: "Edit",
          onClick: this.onBtnClick.bind(this),
        },
        actionItems: [{ label: "Edit", action: "edit" }],
      },
    ];
    this.loadData();
  }

  loadData() {
    const vendorId = this.storage.getItem("vendorId");
    this.userSvc.getUsersByVendorId(vendorId).subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
  }
  onBtnClick(e) {
    console.log(e);
    if (e.event === "delete") {
      const rowData = e.rowData;
    }
    if (e.event === "edit") {
      const rowData = e.rowData;
      this.router.navigate(["/user/add-edit"], { state: rowData });
    }
  }
}
