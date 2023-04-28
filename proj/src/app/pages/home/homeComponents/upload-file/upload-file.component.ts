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


  imgType:any = [
    {
      Type: 'Flood'
    },
    {
      Type: 'Fire'
    }
  ]


  constructor(public dialog: MatDialog, private af: AngularFireStorage,
    private apiService:ApiService, private threatdata:ThreatDataService,  private db: AngularFireDatabase) {
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

  uploadImage() {

    this.apiService.classifyImage(this.downloadURL).subscribe(async response => {
      this.type = response
    if(JSON.stringify(this.type) === JSON.stringify(this.imgType[0])){
      console.log('Type: ', this.type)
      console.log('Type2: ', this.imgType[0])
      this.af.upload("flood/"+Math.random()+this.path, this.path)
      this.threatdata.setImage(this.downloadURL)
      this.threatdata.setDisasterClassification(JSON.stringify(this.type))
      this.openDialog(this.downloadURL, JSON.stringify(this.type));
    }
    if(JSON.stringify(this.type) === JSON.stringify(this.imgType[1])){
      console.log('Type: ', this.type)
      console.log('Type2: ', this.imgType[1])
      this.af.upload("fire/data"+Math.random()+this.path, this.path)
      this.threatdata.setImage(this.downloadURL)
      this.threatdata.setDisasterClassification(JSON.stringify(this.type))
      this.openDialog(this.downloadURL, JSON.stringify(this.type));
    }
    })
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

