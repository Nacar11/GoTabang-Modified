import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';

@Component({
  selector: 'app-post-disaster',
  templateUrl: './post-disaster.component.html',
  styleUrls: ['./post-disaster.component.css']
})
export class PostDisasterComponent implements OnInit {
  displayImage?: String;
  folders: Section[] = [
    {
      icon: 'warning',
      name: 'Damage Assessment:',
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

  constructor(private threatData:ThreatDataService) { }

  ngOnInit(): void {
    this.threatData.damageClassification.subscribe(damageClassification => {

      const classificationObj = JSON.parse(damageClassification);

      const damageType = classificationObj.Type;

      // Do something with the disaster type
      console.log('Disaster type:', damageType);

      this.folders[0].info = damageType;
    });

    this.threatData.dImg.subscribe(dImg => {
      console.log("image: ", dImg);
      this.displayImage = dImg;
      
    })

    this.threatData.loc.subscribe(loc => {
      console.log("Address: ", loc);
      this.folders[3].info = loc;
    })
  }

}
