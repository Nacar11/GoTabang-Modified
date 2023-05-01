import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelloDroneService {

  constructor(private http: HttpClient) { }

  takeoff() {
    return this.http.get('http://localhost:5000/takeoff');
  }

  land() {
    return this.http.get('http://localhost:5000/land');
  }

  photo() {
      return this.http.get('http://localhost:5000/photo');
    }

  move(direction: string, distance: number) {
    const body = { direction: direction, distance: distance };
    return this.http.post('http://localhost:5000/move', body);
  }

  rotate(rotate: number) {
    const body = { direction: rotate};
    return this.http.post('http://localhost:5000/rotate', body);
  }
}
