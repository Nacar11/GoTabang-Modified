import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelloDroneService {

  constructor(private http: HttpClient) { }

  connect() {
    return this.http.get('http://localhost:5000/connect');
  }

  takeoff() {
    return this.http.get('http://localhost:5000/takeoff');
  }

  land() {
    return this.http.get('http://localhost:5000/land');
  }

  left() {
    return this.http.get('http://localhost:5000/left');
  }

  right() {
    return this.http.get('http://localhost:5000/right');
  }

  forward() {
    return this.http.get('http://localhost:5000/forward');
  }

  backward() {
    return this.http.get('http://localhost:5000/backward');
  }

  up() {
    return this.http.get('http://localhost:5000/up');
  }

  down() {
    return this.http.get('http://localhost:5000/down');
  }

  stop() {
    return this.http.get('http://localhost:5000/stop');
  }

  clockwise() {
    return this.http.get('http://localhost:5000/clockwise');
  }
  photo() {
      return this.http.get('http://localhost:5000/photo').pipe(
        map((response: any) => {
          return response.filename;
        })
      );
    }

  move(direction: string, distance: number) {
    const body = { direction: direction, distance: distance };
    return this.http.post('http://localhost:5000/move', body);
  }

}
