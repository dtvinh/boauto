import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExbaseRestService } from 'src/_services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  constructor(
    private exbaseRestService: ExbaseRestService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  formSubmit() {
    this.spinner.show();
    this.exbaseRestService.post('/api/v1/sessions', {}).subscribe(
      (res) => {
        console.log('res: ', res);
      },
      (error) => {},
      () => {
        this.spinner.hide();
      }
    );
  }
}
