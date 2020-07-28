import { Component, OnInit } from '@angular/core';


/*
code	string
nullable: true
name	string
nullable: true
description	string
nullable: true
mail	string
nullable: true
phone	string
nullable: true
mobile	string
nullable: true
imagePath	string
nullable: true
annulled	boolean
timeZone	integer($int32)
restrictedGeofenceId	integer($int32)
}*/
@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  title = 'Vender';
  pagination = 'true';
  paginationPageSize: '10'

  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true, },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true },
    { headerName: 'Email', field: 'mail', sortable: true, filter: true, editable: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, editable: true },
    { headerName: 'Mobile', field: 'mobile', sortable: true, filter: true, editable: true },
    { headerName: 'ImagePath', field: 'imagePath', sortable: true, filter: true, editable: true },
    { headerName: 'TimeZone', field: 'timeZone', sortable: true, filter: true, editable: true }
  ];

  rowData = [
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887',
      imagePath: '', timeZone: ''
    },
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887', imagePath: '', timeZone: ''
    },
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887', imagePath: '', timeZone: ''
    },
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887', imagePath: '', timeZone: ''
    },
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887', imagePath: '', timeZone: ''
    },
    {
      name: 'Rkjha', description: 'vender details',
      mail: 'rkjha@gmail.com', phone: '8678867887', mobile: '8678867887', imagePath: '', timeZone: ''
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
