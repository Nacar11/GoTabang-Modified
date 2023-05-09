import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  confirmAlert = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onConfirm(){
    const url = 'http://127.0.0.1:7777/alert';
    this.http.get(url).subscribe(response => {
      console.log(response);
    });

    this.confirmAlert= true;
  }
  

}
