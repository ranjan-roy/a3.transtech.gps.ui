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
  actionItems = [{ label: "Edit", action: "edit",iconClass:"icon-pencil" }];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    private userSvc: UserService,
    private router: Router,
    private storage: StorageService
  ) {
    
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
      // {
      //   headerName: "Actions",
      //   field: "action",
      //   cellRenderer: "buttonRenderer",
      //   cellRendererParams: {
      //     label: "Edit",
      //     onClick: this.onBtnClick.bind(this),
      //   },
      //   actionItems: [{ label: "Edit", action: "edit" }],
      // },
    ];
    
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
    if (e.action === "edit") {
      this.router.navigate(["/user/add-edit"], { state: this.selectedRow });
    }
  }
  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log("selectedRows", selectedRows);
    this.selectedRow = selectedRows[0];
    this.showAction = true;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }
}
