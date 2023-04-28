import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreatDataService {
  private disasterClassificationSource = new BehaviorSubject<string>('');
  disasterClassification = this.disasterClassificationSource.asObservable();

  private threatClassificationSource = new BehaviorSubject<string>('');
  threatClassification = this.threatClassificationSource.asObservable();

  private imageSource = new BehaviorSubject<string>('');
  image = this.imageSource.asObservable();

  constructor() { }

  setDisasterClassification(disasterClassification: string) {
    this.disasterClassificationSource.next(disasterClassification);
  }

  setThreatClassification(threatClassification: string) {
    this.threatClassificationSource.next(threatClassification);
  }

  setImage(image: string) {
    this.imageSource.next(image);
  }
}
