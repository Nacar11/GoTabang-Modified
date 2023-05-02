import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog, private af: AngularFireStorage, private http: HttpClient, private apiService:ApiService, 
    private threatdata:ThreatDataService) {}

    ngOnInit() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
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
        const country = address.country;
        const fullAddress = `${city}, ${region}, ${country}`;
        x.innerHTML = fullAddress;
      })
      .catch(error => console.log(error));
    }

  async uploadImage() {
    const filePath = 'images/tello_photo2023.png';
    const fileRef = this.af.ref(filePath);
    const firepath = this.af.ref('fire/upload/'+Math.floor(Math.random()))
    const fireHighPath = this.af.ref('fire/high/');
    const fireLowPath = this.af.ref('fire/low/');
    const fireMediumPath = this.af.ref('fire/medium/');
    const floodSeverePath = this.af.ref('flood/severe/');
    const floodModeratePath = this.af.ref('flood/moderate/');
    const floodSignificantPath = this.af.ref('flood/significant/');
  
  
    const response = await this.http.get('assets/tello_photo2023.png', { responseType: 'blob' }).toPromise();
    const task = fileRef.put(response);
 
    try {
      await task;
      this.dialog.open(UploadDialogComponent, {
        data: {
          panelClass: 'custom-dialog-container'
        },
      },);
  
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      console.log('Download URL:', downloadURL);
      const type = await this.apiService.classifyImage(downloadURL).toPromise();
      
  
      if(JSON.stringify(type) === JSON.stringify(this.imgType[0])) {
        console.log('Type: ', type)
        console.log('Type2: ', this.imgType[0])
        this.threatdata.setImage(downloadURL);
        this.threatdata.setDisasterClassification(JSON.stringify(type));

        const floodType = await this.apiService.classifyFlood(downloadURL).toPromise();
        const threat = JSON.stringify(floodType);
        this.threatdata.setThreatClassification(threat);
  
        if(JSON.stringify(type) == JSON.stringify(this.floodType[0])){
          await floodModeratePath.put(response);
        } else if(JSON.stringify(type) == JSON.stringify(this.floodType[1])){
          await floodSignificantPath.put(response);
        } else if(JSON.stringify(type) == JSON.stringify(this.floodType[2])){
          await floodSeverePath.put(response);
        }
  
      } else if(JSON.stringify(type) === JSON.stringify(this.imgType[1])) {
        console.log('Type: ', type)
        console.log('Type2: ', this.imgType[1])
        await firepath.put(response);
        this.threatdata.setImage(downloadURL);
        this.threatdata.setDisasterClassification(JSON.stringify(type));
  
        const fireType = await this.apiService.classifyFire(downloadURL).toPromise();
        const threat = JSON.stringify(fireType);
        this.threatdata.setThreatClassification(threat);
  
        if(JSON.stringify(type) == JSON.stringify(this.fireType[0])){
          await fireHighPath.put(response);
        } else if(JSON.stringify(type) == JSON.stringify(this.fireType[1])){
          await fireLowPath.put(response);
        } else if(JSON.stringify(type) == JSON.stringify(this.fireType[2])){
          await fireMediumPath.put(response);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
}  