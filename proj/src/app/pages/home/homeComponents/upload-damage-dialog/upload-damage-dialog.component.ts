import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { imageType } from '../imageType';
import { ApiService } from '../api.service';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
import firebase from 'firebase/compat/app';
import 'firebase/storage';
@Component({
  selector: 'app-upload-damage-dialog',
  templateUrl: './upload-damage-dialog.component.html',
  styleUrls: ['./upload-damage-dialog.component.css']
})
export class UploadDamageDialogComponent {
  type : imageType[] = [];
  geolocation = '';

  constructor(public dialog: MatDialog, private af: AngularFireStorage, private http: HttpClient, private apiService:ApiService, private threatdata:ThreatDataService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } 
}

showPosition(position) {
  var x = document.getElementById("upload-location");
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const address = data.address;
      const city = address.city || address.town || address.village;
      const region = address.region;
      this.geolocation = `${city}, ${region}`;
      console.log("upload damage geolocation: ", this.geolocation);
    })
    .catch(error => console.log(error));
}

  async uploadImage() {
    const filePath = 'images/tello_photo2023.png';
    const fileRef = this.af.ref(filePath);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('images/tello_photo2023.png');
    
    if (this.apiService.getImage()==null){
      this.http.get('assets/tello_photo2023.png', { responseType: 'blob' }).subscribe((blob: Blob) => {
      const task = fileRef.put(blob);
  
      task.then(() => {
        console.log('File uploaded successfully!');
        this.dialog.open(UploadDialogComponent, {
          data: {
            panelClass: 'custom-dialog-container'
          },
        },)
        const metadata = {
          customMetadata: {
            fullAddress: this.geolocation,
          }  
        };
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('Download URL:', downloadURL);
          this.threatdata.setImageDamage(downloadURL);
          this.apiService.classifyDamage(downloadURL).subscribe(async response => {
            const type = response;
            this.threatdata.setDamageClassification(JSON.stringify(type));
          });
          imageRef.updateMetadata(metadata);
      console.log(metadata)
        }
        );
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
      });
    }
    else if (this.apiService.getImage()!=null){
      console.log('File uploaded successfully!');
        this.dialog.open(UploadDialogComponent, {
          data: {
            panelClass: 'custom-dialog-container'
          },
        },)
        const imageUrl = this.apiService.getImage();
          console.log('Download URL for Local:', imageUrl);
          this.threatdata.setImageDamage(imageUrl);
          this.apiService.classifyDamage(imageUrl).subscribe(async response => {
            const type = response;
            this.threatdata.setDamageClassification(JSON.stringify(type));
          });
    }
  }
}  