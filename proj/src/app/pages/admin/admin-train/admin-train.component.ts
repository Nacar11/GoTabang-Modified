import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-train',
  templateUrl: './admin-train.component.html',
  styleUrls: ['./admin-train.component.css']
})
export class AdminTrainComponent {
  @Output() pathSelected = new EventEmitter<string>();
  @Input() folderPath: string;

  onSelectFile(event) {
    const files = event.target.files;
    if (files.length > 0) {
      const path = files[0].path;
      this.pathSelected.emit(path);
      console.log(`Selected path: ${path}`);
    }
  }

  openFolder() {
    console.log(`Opening folder ${this.folderPath}`);
  }

}
