import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { imageType } from './imageType';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:7777/';
  imageurl: string;
  location: string;

    constructor(private http: HttpClient) {
     }
  
  
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

  classifyDamage(imgUrl:any){
    return this.http.get<imageType[]>(this.url+`damage?image=${imgUrl}`)
  }

  retrainFlood(): Observable<any> {
    const url = `${this.url}/floodRetrain`;
    return this.http.get<any>(url);
  }

  retrainFire(): Observable<any> {
    const url = `${this.url}/fireRetrain`;
    return this.http.get<any>(url);
  }

  retrainDamage(): Observable<any> {
    const url = `${this.url}/damageRetrain`;
    return this.http.get<any>(url);
  }

  setImage(url: string) {
    this.imageurl = url;
    console.log("image url in service: ", this.imageurl);
  }

  getImage() {
     return this.imageurl;
  }

  setLocation(loc: string) {
    this.location = loc;
    console.log("location in service: ", this.location);
  }

  getLocation() {
     return this.location;
  }

  trainFire(trainPath: string, testPath: string){
    return this.http.get<any>(this.url+`trainFire?string_1=${trainPath}&string_2=${testPath}`)
  }
  trainFireFlood(trainPath: string, testPath: string){
    return this.http.get<any>(this.url+`trainFireFlood?string_1=${trainPath}&string_2=${testPath}`)
  }
  trainFlood(trainPath: string, testPath: string){
    return this.http.get<any>(this.url+`trainFlood?string_1=${trainPath}&string_2=${testPath}`)
  }
  trainDamage(trainPath: string, testPath: string){
    return this.http.get<any>(this.url+`trainDamage?string_1=${trainPath}&string_2=${testPath}`)
  }
}
