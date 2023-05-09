import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../home/homeComponents/api.service';

@Component({
  selector: 'app-admin-train',
  templateUrl: './admin-train.component.html',
  styleUrls: ['./admin-train.component.css']
})
export class AdminTrainComponent {
    trainPath: string;
    testPath: string;
    result: string = '';
    loading: boolean = false;
    constructor(private apiService: ApiService) {}
  // onDirectorySelect() {
  //   console.log(this.directoryPath);
  // }

  trainFire(){
    this.loading = true;
    console.log(this.trainPath);
    console.log(this.testPath);
    this.apiService.trainFire(this.trainPath,this.testPath).subscribe(
      response => {
        this.result = response;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  trainFireFlood(){
    this.loading = true;
    console.log(this.trainPath);
    console.log(this.testPath);
    this.apiService.trainFireFlood(this.trainPath,this.testPath).subscribe(
      response => {
        this.result = response;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  trainFlood(){
    this.loading = true;
    console.log(this.trainPath);
    console.log(this.testPath);
    this.apiService.trainFlood(this.trainPath,this.testPath).subscribe(
      response => {
        this.result = response;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  trainDamage(){
    this.loading = true;
    console.log(this.trainPath);
    console.log(this.testPath);
    this.apiService.trainDamage(this.trainPath,this.testPath).subscribe(
      response => {
        this.result = response;
        this.loading = false;
      },
      error => console.log(error)
    );
  }


}
