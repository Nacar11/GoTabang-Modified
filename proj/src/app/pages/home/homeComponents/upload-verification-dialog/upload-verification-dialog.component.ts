import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { imageType } from '../imageType';
import { ApiService } from '../api.service';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
@Component({
  selector: 'app-upload-verification-dialog',
  templateUrl: './upload-verification-dialog.component.html',
  styleUrls: ['./upload-verification-dialog.component.css']
})
export class UploadVerificationDialogComponent {
  type : imageType[] = [];
  threat: any;
  imgType:any = [
    {
      Type: 'Flood'
    },
    {
      Type: 'Fire'
    }
  ]

  floodType: any = [
    {
      Type: 'Moderate'
    },
    {
      Type: 'Significant'
    },
    {
      Type: 'Severe'
    }
  ]

  fireType: any = [
    {
      Type: 'High'
    },
    {
      Type: 'Medium'
    },
    {
      Type: 'Low'
    }
  ]

  constructor(public dialog: MatDialog, private af: AngularFireStorage, private http: HttpClient, private apiService:ApiService, private threatdata:ThreatDataService) {}

  async uploadImage() {
    const filePath = 'images/tello_photo2023.png';
    const fileRef = this.af.ref(filePath);
    const fireHighPath = this.af.ref('fire/high');
    const fireLowPath = this.af.ref('fire/low');
    const fireMediumPath = this.af.ref('fire/medium');
    const floodSeverePath = this.af.ref('flood/severe');
    const floodModeratePath = this.af.ref('flood/moderate');
    const floodSignificantPath = this.af.ref('flood/significant');
  
    this.http.get('assets/tello_photo2023.png', { responseType: 'blob' }).subscribe((blob: Blob) => {
      const task = fileRef.put(blob);
  
      task.then(() => {
        console.log('File uploaded successfully!');
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('Download URL:', downloadURL);
          this.apiService.classifyImage(downloadURL).subscribe(async response => {
            const type = response;
  
            if(JSON.stringify(type) === JSON.stringify(this.imgType[0])) {
              console.log('Type: ', type)
              console.log('Type2: ', this.imgType[0])
              this.threatdata.setImage(downloadURL);
              this.threatdata.setDisasterClassification(JSON.stringify(type));
  
              if(JSON.stringify(type) == JSON.stringify(this.floodType[0])){
                floodModeratePath.put(blob);
              } else if(JSON.stringify(type) == JSON.stringify(this.floodType[1])){
                floodSignificantPath.put(blob);
              } else if(JSON.stringify(type) == JSON.stringify(this.floodType[2])){
                floodSeverePath.put(blob);
              }
  
            } 
  
            else if(JSON.stringify(type) === JSON.stringify(this.imgType[1])) {
              console.log('Type: ', type)
              console.log('Type2: ', this.imgType[1])
              this.threatdata.setImage(downloadURL);
              this.threatdata.setDisasterClassification(JSON.stringify(type));
  
              this.apiService.classifyFire(downloadURL).subscribe(async response => {
                this.type = response
                this.threat = JSON.stringify(this.type)
                this.threatdata.setThreatClassification(this.threat)
              })
  
              if(JSON.stringify(type) == JSON.stringify(this.fireType[0])){
                fireHighPath.put(blob);
              } else if(JSON.stringify(type) == JSON.stringify(this.fireType[1])){
                fireLowPath.put(blob);
              } else if(JSON.stringify(type) == JSON.stringify(this.fireType[2])){
                fireMediumPath.put(blob);
              }
  
            }
          });
        });
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    });
  }
}  