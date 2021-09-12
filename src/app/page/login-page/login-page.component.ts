import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, TokenStorageService } from 'src/_services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  sessionForm: any = {
    username: '',
    password: '',
  };

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  sessionFormSubmit() {
    this.spinner.show();
    const { username, password } = this.sessionForm;
    this.authService.createSession(username, password).subscribe(
      (res) => {
        if(res.status === 'ok') {
          this.tokenStorageService.saveToken(res.data.access_token, 'boauto');
          this.tokenStorageService.saveRefreshToken(
            res.data.refresh_token,
            'boauto'
          );
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard'])
        } else {
          this.isLoginFailed = true;
        }
      },
      (error) => {
        this.spinner.hide();
        this.isLoginFailed = true;
      },
      () => this.spinner.hide()
    );
  }
}
