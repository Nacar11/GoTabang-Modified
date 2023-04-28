import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section';
import { ThreatDataService } from 'src/app/shared/threat-data/threat-data.service';

@Component({
  selector: 'type-file',
  templateUrl: './type-file.component.html',
  styleUrls: ['./type-file.component.css']
})
export class TypeFileComponent implements OnInit {
  @Input() displayImage = '';
  folders: Section[] = [
    {
      icon: 'folder',
      name: 'Type',
      info: 'Flood',
    },
    {
      icon: 'insert_photo',
      name: 'Image',
      info: 'this.upl.downloadURL',
    },
    {
      icon: 'calendar_today',
      name: 'Created',
      info: 'Created: 2022-08-18T04:57:39.056Z',
    },
    {
      icon: ' my_location',
      name: 'Location',
      info: 'Mandaue City, Cebu City, Philippines',
    },
  ];

  constructor() {
  }
  ngOnInit(): void {
  }


}

