import { Component, OnInit } from '@angular/core';
import { SlackApiService } from '../../../services/slack-api.service';
import { NomieesData } from '../../../models/NomieesData';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private title = 'Aspire Stars Dashboard';
  private isLoading = true;
  private nomineesData;
  constructor(private _restApiService: SlackApiService) {

  }

  ngOnInit() {
    this._restApiService.getNomieesData()
      .subscribe((data) => {
        console.log('Success>>');
        if (data) {
          this.nomineesData = data.nominees;
        }
        this.isLoading = false;
      },
        (err) => {
          this.title = err.toString();
          this.isLoading = false;
        }
      );
  }
}
