import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-train',
  templateUrl: './admin-train.component.html',
  styleUrls: ['./admin-train.component.css']
})
export class AdminTrainComponent {
    directoryPath: string;

  onDirectorySelect() {
    console.log(this.directoryPath);
  }
}
