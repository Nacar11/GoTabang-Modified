import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/shared/models/section';

@Component({
  selector: 'app-post-disaster',
  templateUrl: './post-disaster.component.html',
  styleUrls: ['./post-disaster.component.css']
})
export class PostDisasterComponent implements OnInit {
  @Input() displayImage = 'https://firebasestorage.googleapis.com/v0/b/gotabang.appspot.com/o/images%2FFloodBasicsandSafety-500x333.jpg?alt=media&token=81f94b95-36dc-43a2-8f25-38278155af65';
  folders: Section[] = [
    {
      icon: 'warning',
      name: 'Damage Type:',
      info: 'N/A',
    },
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

  constructor() { }

  ngOnInit(): void {
  }

}
