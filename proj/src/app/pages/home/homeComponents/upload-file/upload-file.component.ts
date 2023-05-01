import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Observable } from 'rxjs';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
import { ApiService } from '../api.service';
import { imageType } from '../imageType';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { HttpClient } from '@angular/common/http';
import { TelloDroneService } from 'src/app/shared/tello-drone/tello-drone.service';
import { UploadVerificationDialogComponent } from '../upload-verification-dialog/upload-verification-dialog.component';

export interface DialogData {
  data: ' ';
}

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})

export class UploadFileComponent implements OnInit {
  @Output() menuState!: String;
  @Output() newItemEvent = new EventEmitter<string>();
  type : imageType[] = [];
  path!: String;
  latestImage!: String;
  lockUploadClassification= true;
  lockUploadAssessment= true;
  task!: AngularFireUploadTask;
  taskRef!: AngularFireStorageReference;
  percentage!: Observable<number>;
  snapshot!: Observable<any>;
  downloadURL!: string;
  result: any;
  threat: any;
  currentDate: Date = new Date();
  telloConnected = false;

  imgType:any = [
    {
      Type: 'Flood'
    },
    {
      Type: 'Fire'
    }
  ]


  constructor(public dialog: MatDialog, private af: AngularFireStorage, private apiService:ApiService, 
    private threatdata:ThreatDataService,  private db: AngularFireDatabase, private telloService: TelloDroneService, 
    private http: HttpClient) {
  }

  connect() {
    // Take off the drone
    if (this.telloService.connect().subscribe(res => console.log(res))){
      this.telloConnected = true;
    }
  }

  video_feed() {
    // Take off the drone
    this.telloService.video_feed().subscribe(res => console.log(res));
    console.log("stream started!");
  }

  takeoff() {
    // Take off the drone
    this.telloService.takeoff().subscribe(res => console.log(res));
    console.log("takeoff clicked!");
  }

  photo() {
    // Take off the drone
    this.telloService.photo().subscribe(res => console.log(res));
  }

  land() {
    // Land the drone
    this.telloService.land().subscribe(res => console.log(res));
  }

  move(direction: string, distance: number) {
    // Move the drone in the specified direction and distance
    this.telloService.move(direction, distance).subscribe(res => console.log(res));
  }

  rotate(rotate: number) {
    // Move the drone in the specified direction and distance
    this.telloService.rotate(rotate).subscribe(res => console.log(res));
  }

  ngOnInit(): void {
  }

  openDialog(imgUrl: any, type: string) {
    this.dialog.open(UploadDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container'
      },
    },
    );
    if(type === JSON.stringify(this.imgType[1])){
      this.apiService.classifyFire(imgUrl).subscribe(async response => {
        this.type = response
        this.threat = JSON.stringify(this.type)
        this.threatdata.setThreatClassification(this.threat)
      })
    }
    else{
      this.apiService.classifyFlood(imgUrl).subscribe(async response => {
        this.type = response
        this.threat = JSON.stringify(this.type)
        this.threatdata.setThreatClassification(this.threat)
      })
    }
    }


//   async scanImage($event:any){
//     var file = $event.target.files[0];
//     this.path = file;
//     if (file!.type.split('/')[0] !== 'image') {
//       console.error('unsupported file type');
//       alert('Invalid Upload Format!')
//       this.lockUploadLocal=true;
//       return;}
//     else {
//     var storage = getStorage();
//     var metadata = {
//       customMetadata: {
//         'application': 'Gotabang',
//         'activity': 'Image Processing'
//       }
//     };

//   //Empty folder before uploading new image
//   const folderRef = this.af.refFromURL('gs://gotabang.appspot.com/images');
//   folderRef.listAll().subscribe(result => {
//     // For each file, delete it
//     result.items.forEach(item => {
//       item.delete().then(() => {
//         console.log('File deleted successfully');
//       }).catch(error => {
//         console.log('Error deleting file:', error);
//       });
//     });
//   });


//   //Select File from Local Storage
//   var imageRef = ref(storage, 'images/' + file.name);
//   this.lockUploadLocal=false;
//   uploadBytesResumable(imageRef, file, metadata)
//   .then((snapshot) => {
//     console.log('Uploaded', snapshot.totalBytes, 'bytes.');
//     console.log('File metadata:', snapshot.metadata);
//   getDownloadURL(snapshot.ref).then((url) => {
//       this.downloadURL = url;
//       this.newItemEvent.emit(this.downloadURL);
//     });
//   }).catch((error) => {
//     console.error('Upload failed', error);
//   });
// }
//   }

  async uploadImage() {
    this.dialog.open(UploadVerificationDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container'
      },
    },
    );

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
      console.log(fullAddress);
    })
    .catch(error => console.log(error));
  }

    retrieveImageClassification(){
      const storageRef = this.af.refFromURL('gs://gotabang.appspot.com/images');

      storageRef.listAll().subscribe((res) => {
        const latestImageRef = res.items[res.items.length - 1];
        latestImageRef.getDownloadURL().then((url: any) => {
          if(url){
          this.downloadURL = url;
          this.lockUploadClassification=false;
          this.newItemEvent.emit(this.downloadURL);
          }
          console.log(url);
        });
      });
    }

    retrieveImageAssessment(){
      const storageRef = this.af.refFromURL('gs://gotabang.appspot.com/images');

      storageRef.listAll().subscribe((res) => {
        const latestImageRef = res.items[res.items.length - 1];
        latestImageRef.getDownloadURL().then((url: any) => {
          if(url){
          this.downloadURL = url;
          this.lockUploadAssessment=false;
          this.newItemEvent.emit(this.downloadURL);
          }
          console.log(url);
        });
      });


    }

}

