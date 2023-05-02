import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreatDataService {
  private disasterClassificationSource = new BehaviorSubject<string>('');
  disasterClassification = this.disasterClassificationSource.asObservable();

  private damageClassificationSource = new BehaviorSubject<string>('');
  damageClassification = this.damageClassificationSource.asObservable();

  private threatClassificationSource = new BehaviorSubject<string>('');
  threatClassification = this.threatClassificationSource.asObservable();

  private imageSource = new BehaviorSubject<string>('');
  image = this.imageSource.asObservable();

  private damageSource = new BehaviorSubject<string>('');
  dImg = this.damageSource.asObservable();

  private userLocationSource = new BehaviorSubject<string>('');
  loc = this.userLocationSource.asObservable();

  constructor() { }

  setDisasterClassification(disasterClassification: string) {
    this.disasterClassificationSource.next(disasterClassification);
  }

  setDamageClassification(damageClassification: string) {
    this.damageClassificationSource.next(damageClassification);
  }

  setThreatClassification(threatClassification: string) {
    this.threatClassificationSource.next(threatClassification);
  }

  setUserLocation(loc: string) {
    this.userLocationSource.next(loc);
  }

  setImage(image: string) {
    this.imageSource.next(image);
  }

  setImageDamage(dImg: string) {
    this.damageSource.next(dImg);
  }


}
