import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  title = "Users";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];

  constructor(private userSvc: UserService, private router: Router) {
    this.frameworkComponents = {
      buttonRenderer: CellActionComponent,
    };
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Created By",
        field: "createdBy",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "Created Date",
        field: "createdDate",
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
        headerName: "Last Visit",
        field: "lastVisit",
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
        headerName: "Profile Id",
        field: "profileId",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "Style",
        field: "style",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "User Id",
        field: "userId",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "User Name",
        field: "userName",
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: "Vendor Id",
        field: "vendorId",
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
        },
      },
    ];
  }
}
