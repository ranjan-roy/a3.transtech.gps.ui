import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { CellActionComponent } from '../../../shared/table/cell-action/cell-action.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  title = 'Vender';
  pagination = 'true';
  paginationPageSize: '10'
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];

  constructor(private vendorSvc: VendorService, private router: Router) {
    this.frameworkComponents = {
      buttonRenderer: CellActionComponent,
    }
  }


  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Code', field: 'code', sortable: true, filter: true, editable: true, },
      { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true, },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true },
      { headerName: 'Email', field: 'mail', sortable: true, filter: true, editable: true },
      { headerName: 'Phone', field: 'phone', sortable: true, filter: true, editable: true },
      { headerName: 'Mobile', field: 'mobile', sortable: true, filter: true, editable: true },
      {
        headerName: 'Actions', field: 'action', cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          label: 'Edit',
          onClick: this.onBtnClick.bind(this),
        }
      }
    ];

    this.vendorSvc.getVendor().subscribe(res => {
      console.log(res);
      this.rowData = res;
    })
  }
  onBtnClick(e) {
    console.log(e);
    if (e.event === "delete") {
      const rowData = e.rowData;
      this.deleteVender(rowData.vendorId);
    }
    if (e.event === "edit") {
      const rowData = e.rowData;
      this.router.navigate(['/vendor/add-edit'], { state: rowData })
    }
  }
  deleteVender(id) {
    this.vendorSvc.deleteVendor(id).subscribe(res => {
      console.log(res);
    })
  }
}
