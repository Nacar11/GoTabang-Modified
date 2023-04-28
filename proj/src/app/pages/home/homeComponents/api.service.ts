import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { imageType } from './imageType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:7777/';
  
    constructor(private http: HttpClient) { }
  
  
  // classifyImage(imgUrl:any){
  //   let params = new HttpParams()
  //   .set('image', imgUrl)
  //   return this.http.get(this.url, { params});
  // }

  classifyImage(imgUrl:any){
    return this.http.get<imageType[]>(this.url+`?image=${imgUrl}`)
  }

  classifyFire(imgUrl:any){
    return this.http.get<imageType[]>(this.url+`fire?image=${imgUrl}`)
  }

  classifyFlood(imgUrl:any){
    return this.http.get<imageType[]>(this.url+`flood?image=${imgUrl}`)
  }

  
}
