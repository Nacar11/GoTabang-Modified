import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { imageType } from '../imageType';
import { ApiService } from '../api.service';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
@Component({
  selector: 'app-upload-damage-dialog',
  templateUrl: './upload-damage-dialog.component.html',
  styleUrls: ['./upload-damage-dialog.component.css']
})
export class UploadDamageDialogComponent {
  type : imageType[] = [];

  constructor(public dialog: MatDialog, private af: AngularFireStorage, private http: HttpClient, private apiService:ApiService, private threatdata:ThreatDataService) {}

  async uploadImage() {
    const filePath = 'images/tello_photo2023.png';
    const fileRef = this.af.ref(filePath);
  
    this.http.get('assets/tello_photo2023.png', { responseType: 'blob' }).subscribe((blob: Blob) => {
      const task = fileRef.put(blob);
  
      task.then(() => {
        console.log('File uploaded successfully!');
        this.dialog.open(UploadDialogComponent, {
          data: {
            panelClass: 'custom-dialog-container'
          },
        },)
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('Download URL:', downloadURL);
          this.threatdata.setImageDamage(downloadURL);
          this.apiService.classifyDamage(downloadURL).subscribe(async response => {
            const type = response;
            this.threatdata.setDamageClassification(JSON.stringify(type));
          });
        });
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    });
  }
}  