import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';


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
    { headerName: 'Code', field: 'code', sortable: true, filter: true, editable: true, },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true, },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true },
    { headerName: 'Email', field: 'mail', sortable: true, filter: true, editable: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, editable: true },
    { headerName: 'Mobile', field: 'mobile', sortable: true, filter: true, editable: true },
  ];

  rowData = [];

  constructor(private vendorSvc: VendorService) { }

  ngOnInit(): void {
    this.vendorSvc.getVendor().subscribe(res => {
      console.log(res);
      this.rowData = res;
    })

  }

  submitVendor() {
    const vendor = {
      "code": "VENDOR_001",
      "name": "Rupesh Kumar Jha",
      "description": "Pune Vendor",
      "mail": "rupesh.jha.in@gmail.com",
      "phone": "4000008977",
      "mobile": "7022387877",
    }
    this.vendorSvc.addVendor(vendor).subscribe(v => {
      if (v) {
        console.log(v);
        this.vendorSvc.addProfile({
          "name": v['name'],
          "description": v['description'],
          "vendorId": v['vendorId'],
          "createdBy": 1,
        }).subscribe(profile => {
          if (profile) {
            this.vendorSvc.addUser({
              "name": v['name'],
              "vendorId": v['vendorId'],
              "accessLevel": 2,
              "profileId": profile['profileId'],
              "userName": "string",
              "password": "string",
              "email": v['mail'],
              "phone": v['phone'],
            }).subscribe(profile => {
              console.log(profile);
            });
          }
        });
      }
    });
  }

}
