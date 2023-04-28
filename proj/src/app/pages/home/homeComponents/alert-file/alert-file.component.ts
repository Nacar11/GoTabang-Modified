import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from 'src/app/shared/models/hotlines';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'alert-file',
  templateUrl: './alert-file.component.html',
  styleUrls: ['./alert-file.component.css']
})
export class AlertFileComponent implements OnInit {

ELEMENT_DATA: PeriodicElement[] = [
    {name: 'Bureau of Fire Protection Region 7', hotline: '032-254-8385', email:'bfppis72018@gmail.com', city: 'Cebu City', province: 'Cebu'},
    {name: 'CCDRRMMO', hotline: '255-0046', email:'cebucitydrrmo@gmail.com', city: 'Cebu City', province: 'Cebu'},
    {name: 'Lapu-Lapu City Fire District', hotline: '09238157667', email:'lapulapu_fd2014@yahoo.com', city: 'Lapu-Lapu City', province: 'Cebu'},
    {name: 'Lapu-Lapu City Police Office', hotline: '0952108426', email:'lcpo.c3@gmail.com', city: 'Lapu-Lapu City', province: 'Cebu'},
    {name: 'Mandaue City, Cebu Fire Department', hotline: '344-4747', email:'mcfs_bfp07@yahoo.com', city: 'Mandaue City', province: 'Cebu'},
    {name: 'PIO Mandaue City', hotline: '255-3476', email:'pio@mandauecity.gov.ph', city: 'Mandaue City', province: 'Cebu'},
    {name: 'Talisay City Fire Station', hotline: '032-2728277', email:'cityoftalisayfirestationbfpseven@yahoo.com', city: 'Talisay City', province: 'Cebu'},
    {name: 'CTDRRMO', hotline: '09178114078', email:'cityoftalisayDRRM@gmail.com', city: 'Talisay City', province: 'Cebu'},
    {name: 'CDRRMO Toledo', hotline: '09778347619', email:'cdrrmo_toledo@yahoo.com.ph', city: 'Toledo City', province: 'Cebu'},
    {name: 'BFP R7 Toledo City Cebu', hotline: '09662165466', email:'toledobfp@yahoo.com', city: 'Toledo City', province: 'Cebu'},
  ];

  displayedColumns: string[] = ['name', 'hotline', 'email', 'city', 'province'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAlert(){
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container'
      },
    },
    );
  }

}
