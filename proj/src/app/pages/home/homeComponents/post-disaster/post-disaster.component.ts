import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Section } from 'src/app/shared/models/section';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';

@Component({
  selector: 'app-post-disaster',
  templateUrl: './post-disaster.component.html',
  styleUrls: ['./post-disaster.component.css']
})
export class PostDisasterComponent implements OnInit {
  displayImage?: String;
  currentDate: Date = new Date();
  
  folders: Section[] = [
    {
      icon: 'warning',
      name: 'Damage Assessment:',
      info: 'N/A',
    },
    {
      icon: 'calendar_today',
      name: 'Date of Detection:',
      info: 'N/A',
    },
    {
      icon: 'my_location',
      name: 'Affected Area:',
      info: 'N/A',
    },
  ];

  constructor(private threatData:ThreatDataService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    const storageRef = this.storage.ref('images/tello_photo2023.png');

    const date = this.currentDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    this.threatData.damageClassification.subscribe(damageClassification => {

      const classificationObj = JSON.parse(damageClassification);

      const damageType = classificationObj.Type;

      // Do something with the disaster type
      console.log('Disaster type:', damageType);

      this.folders[0].info = damageType;
      if(damageType != null){
        storageRef.getMetadata().subscribe((metadata) => {
          if (metadata.customMetadata){
          this.folders[2].info = metadata.customMetadata.fullAddress;
          this.folders[1].info = metadata.timeCreated;
          } else if (metadata.customMetadata! || metadata.customMetadata == null || metadata.customMetadata == undefined){
            this.folders[2].info = 'Geolocation Not Applied';
            this.folders[1].info = metadata.timeCreated;
          }
        });
      }

    });

    this.threatData.dImg.subscribe(dImg => {
      console.log("image: ", dImg);
      this.displayImage = dImg;      
    })

    // this.threatData.loc.subscribe(loc => {
    //   console.log("Address: ", loc);
    //   this.folders[2].info = loc;
    // })
  }

}
