import { Component, OnInit } from "@angular/core";
import { VendorService } from "../vendor.service";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/service/auth.service";

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.css"],
})
export class VendorListComponent implements OnInit {
  title = "Vender";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];
  showAction: boolean = false;
  actionItems = [];
  defaultActionItem = [];
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    public auth: AuthService
  ) {
    this.frameworkComponents = {
      buttonRenderer: CellActionComponent,
    };
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Code",
        field: "code",
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
        headerName: "Email",
        field: "mail",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Phone",
        field: "phone",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Mobile",
        field: "mobile",
        sortable: true,
        filter: true,
      },
      // {
      //   headerName: "Actions",
      //   field: "action",
      //   cellRenderer: "buttonRenderer",
      //   cellRendererParams: {
      //     label: "Edit",
      //     onClick: this.onBtnClick.bind(this),
      //   },
      //   actionItems: [
      //     { label: "Edit", action: "edit" },
      //     { label: "Delete", action: "delete" },
      //   ],
      // },
    ];
    this.setActionItem();
  }

  loadData() {
    this.vendorSvc.getVendor().subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
  }
  onBtnClick(e) {
    console.log(e);
    if (e.action === "add") {
      this.router.navigate(["/Vendor/add-edit"]);
    }
    if (e.action === "delete") {
      this.deleteVender(this.selectedRow.vendorId);
    }
    if (e.action === "edit") {
      this.router.navigate(["/Vendor/add-edit"], { state: this.selectedRow });
    }
  }

  setActionItem() {
    this.actionItems = [];
    this.defaultActionItem = [];
    const actions = this.auth.getActions("Vendor");
    if (actions.includes("Add")) {
      this.defaultActionItem.push({
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

  deleteVender(id) {
    console.log(id);

    this.vendorSvc.deleteVendor(id).subscribe((res) => {
      console.log(res);
      this.loadData();
    });
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
