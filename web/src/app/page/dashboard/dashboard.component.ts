import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ExbaseRestService,
  TokenStorageService
} from 'src/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  errors = {};

  constructor(
    private spinner: NgxSpinnerService,
    private exbaseRestService: ExbaseRestService,
    private tokenStorageService: TokenStorageService
    ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);

    if (this.tokenStorageService.getToken('exbase')) {
      this.getTraderProfile();
    }
  }

  getTraderProfile() {
    this.spinner.show();

    this.exbaseRestService.get('api/auth/me/profile')
      .subscribe((response => {
        console.log(response);
      }),
      error => {
        this.errors = error;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });
  }

  getTradingBalance() {
    this.spinner.show();
  }
}
