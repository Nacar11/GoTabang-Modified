import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import 'firebase/compat/auth';
import { Observable } from 'rxjs';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
import { ApiService } from '../api.service';
import { imageType } from '../imageType';
import { TelloDroneService } from 'src/app/shared/tello-drone/tello-drone.service';
import { UploadVerificationDialogComponent } from '../upload-verification-dialog/upload-verification-dialog.component';
import { UploadDamageDialogComponent } from '../upload-damage-dialog/upload-damage-dialog.component';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})

export class UploadFileComponent implements OnInit {
  @Output() menuState!: String;
  @Output() newItemEvent = new EventEmitter<string>();
  cardStyle: any = {};
  currentDate: Date = new Date();
  downloadUrl: string;
  downloadURL!: string;
  path!: String;
  latestImage!: String;
  lockUploadLocal= true;
  task!: AngularFireUploadTask;
  taskRef!: AngularFireStorageReference;
  snapshot!: Observable<any>;
  previewUrl: any = null;
  result: any;
  selectedImage: File = null;
  threat: any;
  telloConnected = false; 
  type : imageType[] = []; 
  uploadProgress: Observable<number>;

  imgType:any = [
    {
      Type: 'Flood'
    },
    {
      Type: 'Fire'
    }
  ]


  constructor(public dialog: MatDialog, private af: AngularFireStorage, private apiService:ApiService, 
    private threatdata:ThreatDataService, private telloService: TelloDroneService) {
  }

    // this section handles the drone controls
connect() {
    if (this.telloService.connect().subscribe(res => console.log(res))){
      this.telloConnected = true;
    }
  }
takeoff() {
    this.telloService.takeoff().subscribe(res => console.log(res));
  }
photo() {
    this.telloService.photo().subscribe(res => console.log(res));
  }
land() {
    this.telloService.land().subscribe(res => console.log(res));
  }
right() {
    this.telloService.right().subscribe(res => console.log(res));
  }
left() {
    this.telloService.left().subscribe(res => console.log(res));
  }
up() {
    this.telloService.up().subscribe(res => console.log(res));
  }
down() {
    this.telloService.down().subscribe(res => console.log(res));
  }
forward() {
    this.telloService.forward().subscribe(res => console.log(res));
  }
backward() {
    this.telloService.backward().subscribe(res => console.log(res));
  }
stop() {
    this.telloService.stop().subscribe(res => console.log(res));
  }
clockwise() {
    this.telloService.clockwise().subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

// TELLO DRONE UPLOAD SECTION
// this handles upload for classification and assesment
async uploadImage() {
    this.dialog.open(UploadVerificationDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
  }  
async uploadImageAssessment() {
    this.dialog.open(UploadDamageDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
}

// LOCAL UPLOAD SECTION
// this handles the file selection
onFileSelected(event): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cardStyle = {
        'background-image': `url(${this.previewUrl})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
      };
    };
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
uploadLocalImage(upload: string){
    const filePath = `images/${this.selectedImage.name}`;
    const fileRef = this.af.ref(filePath);
    const task = this.af.upload(filePath, this.selectedImage);

    this.uploadProgress = task.percentageChanges();

    task.snapshotChanges().subscribe((snapshot) => {
      if (snapshot.state === 'success') {
        fileRef.getDownloadURL().toPromise().then((url) => {
          this.downloadUrl = url;
          console.log('File uploaded successfully. Download URL:', this.downloadUrl);
          this.apiService.setImage(this.downloadUrl);
        });
      }
    });

    if (upload=='classfication'){
    this.dialog.open(UploadVerificationDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
  } else if (upload=='damage') {
    this.dialog.open(UploadDamageDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
  }
}

// MOBILE UPLOAD SECTION
// this handles retrievement of photo from the database
retrieveImage(){
  const storageRef = this.af.refFromURL('gs://gotabang.appspot.com/tello_images');
  storageRef.listAll().subscribe((res) => {
    const latestImageRef = res.items[res.items.length - 1];
    latestImageRef.getDownloadURL().then((url: any) => {
      if(url){
      this.downloadURL = url;
      this.newItemEvent.emit(this.downloadURL);
      this.apiService.setImage(url);
      }
      console.log(url);
    });
  });
}
uploadMobileImage(upload: string){
  if (upload=='classfication'){
    this.dialog.open(UploadVerificationDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
  } else if (upload=='damage') {
    this.dialog.open(UploadDamageDialogComponent, {
      data: {
        panelClass: 'custom-dialog-container',
      },
    },
    );
  }
}
    }
