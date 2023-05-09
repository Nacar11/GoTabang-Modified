import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'level-file',
  templateUrl: './level-file.component.html',
  styleUrls: ['./level-file.component.css']
})
export class LevelFileComponent implements OnInit {
  displayImage!: String;
  currentDate: Date = new Date();
  currentlocation: string;
  folders: Section[] = [
    {
      icon: 'warning',
      name: 'Disaster Classification:',
      info: 'N/A',
    },
    {
      icon: 'warning',
      name: 'Disaster Level:',
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

  constructor(private threatData:ThreatDataService, private storage: AngularFireStorage) {
   }

  ngOnInit(): void {
    const storageRef = this.storage.ref('images/tello_photo2023.png');

    this.threatData.disasterClassification.subscribe(disasterClassification => {
      // Parse the JSON string to an object
      const classificationObj = JSON.parse(disasterClassification);

      // Get the value of the 'Type' property
      const disasterType = classificationObj.Type;

      // Do something with the disaster type
      // console.log('Disaster type:', disasterType);

      this.folders[0].info = disasterType;
    });

    this.threatData.threatClassification.subscribe(threatClassification => {
      // Parse the JSON string to an object
      const classificationObj = JSON.parse(threatClassification);

      // Get the value of the 'Type' property
      const threatType = classificationObj.Type;

      // Do something with the disaster type
      // console.log('Disaster Level:', threatType);
      this.folders[1].info = threatType;

      if(threatType != null){
        storageRef.getMetadata().subscribe((metadata) => {
          if (metadata.customMetadata){
          this.folders[3].info = metadata.customMetadata.fullAddress;
          this.folders[2].info = metadata.timeCreated;
          } else if (metadata.customMetadata! || metadata.customMetadata == null || metadata.customMetadata == undefined){
            this.folders[3].info = "Geolocation Not Applied";
            this.folders[2].info = metadata.timeCreated;
          }
        });
      }
    });

    this.threatData.image.subscribe(image => {
      console.log("image: ", image);
      this.displayImage = image;
    })
    // this.displayImage = this.retrieveImage.downloadURL;
    
  }

}
