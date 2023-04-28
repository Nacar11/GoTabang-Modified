import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';

@Component({
  selector: 'level-file',
  templateUrl: './level-file.component.html',
  styleUrls: ['./level-file.component.css']
})
export class LevelFileComponent implements OnInit {
  @Input() displayImage = '';
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
      info: '2022-08-18T04:57:39.056Z',
    },
    {
      icon: 'my_location',
      name: 'Affected Area:',
      info: 'Mandaue City, Cebu City, Philippines',
    },
  ];

  damages: Section[] = [
    {
      icon: 'insert_photo',
      name: 'Disaster Level',
      info: 'Critical',
    },
    {
      icon: 'folder',
      name: 'Damage Ratio',
      info: '80%',
    },
    {
      icon: 'calendar_today',
      name: 'Detected On',
      info: 'Created: 2022-08-18T04:57:39.056Z',
    },
  ];
  constructor(private threatData:ThreatDataService) { }

  ngOnInit(): void {

    this.threatData.disasterClassification.subscribe(disasterClassification => {
      // Parse the JSON string to an object
      const classificationObj = JSON.parse(disasterClassification);

      // Get the value of the 'Type' property
      const disasterType = classificationObj.Type;

      // Do something with the disaster type
      console.log('Disaster type:', disasterType);

      this.folders[0].info = disasterType;
    });

    this.threatData.threatClassification.subscribe(threatClassification => {
      // Parse the JSON string to an object
      const classificationObj = JSON.parse(threatClassification);

      // Get the value of the 'Type' property
      const threatType = classificationObj.Type;

      // Do something with the disaster type
      console.log('Disaster type:', threatType);
      this.folders[1].info = threatType.toUpperCase();
    });

    this.threatData.image.subscribe(image => {
      console.log("image: ", image);
      this.displayImage = image;

     
    })
    // this.displayImage = this.retrieveImage.downloadURL;
  }



}
