import { Component } from '@angular/core';
import { ApiService } from '../../home/homeComponents/api.service';

@Component({
  selector: 'app-admin-retrain',
  templateUrl: './admin-retrain.component.html',
  styleUrls: ['./admin-retrain.component.css']
})
export class AdminRetrainComponent {
result: string = '';
loading: boolean = false;

constructor(private apiService: ApiService) {}


retrainFlood() {
  this.loading = true;
  this.apiService.retrainFlood().subscribe(
    response => {
      this.result = response;
      this.loading = false;
    },
    error => console.log(error)
  );
}

retrainFire() {
  this.loading = true;
  this.apiService.retrainFire().subscribe(
    response => {
      this.result = response;
      this.loading = false;
    },
    error => console.log(error),
    
  );
}

retrainDamage() {
  this.loading = true;
  this.apiService.retrainDamage().subscribe(
    response => {
      this.result = response;
      this.loading = false;
    },
    error => console.log(error)
  );
}

}
