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

  constructor(private threatData:ThreatDataService) { }

  ngOnInit(): void {
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
        this.folders[2].info = "Cebu City, Central Visayas";
        this.folders[1].info = date.toString();
      }

    });

    this.threatData.dImg.subscribe(dImg => {
      console.log("image: ", dImg);
      this.displayImage = dImg;
      
    })

    this.threatData.loc.subscribe(loc => {
      console.log("Address: ", loc);
      this.folders[2].info = loc;
    })
  }

}
