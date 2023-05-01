import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-upload-verification-dialog',
  templateUrl: './upload-verification-dialog.component.html',
  styleUrls: ['./upload-verification-dialog.component.css']
})
export class UploadVerificationDialogComponent {

  constructor(public dialog: MatDialog, private af: AngularFireStorage, private http: HttpClient) {}

  async uploadImage() {
    const filePath = 'images/tello_photo2023.png';
    const fileRef = this.af.ref(filePath);

    
    this.http.get('assets/tello_photo2023.png', { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const task = fileRef.put(blob);

        task.then(() => {
          this.dialog.open(UploadDialogComponent, {
            data: {
              panelClass: 'custom-dialog-container'
            },
          },
          );
          console.log('File uploaded successfully!');
        }).catch((error) => {
          console.error('Error uploading file:', error);
        });
      });
  }
}
