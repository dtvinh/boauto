import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/_services/auth.service';
import { TokenStorageService } from 'src/_services/token-storage.service';

const EXBASE_CLIENT_ID = 'exbase-web';
const GRANT_TYPE = 'password';

@Component({
  selector: 'app-trading-account-setting',
  templateUrl: './trading-account-setting.component.html',
})
export class TradingAccountSettingComponent implements OnInit {

  form: any = {
    captcha: '03AGdBq26SdPupUfCqUmIXG_lLpk7r_sFVF-1wEcNVtYP9KqlgTHRqQsUSWJenRoY1DwOfOYdlMQAszbg0IpLAz27-wgDVuBp3YGWZjkIBVTXuk7hQDBU1WqghLF_UcNxS6GDpYYGVF9ZkO_7nUyzTnnhVD8a90HQOT2A2L815VOxs0EoXZbnocZKbUO6y_QQUIrRbJzwEYYBpG4c_LvZmUeNWahrbRx_o83QD-V2ij73paVNPvrM48J6aHLClHdlp79igcJhkaLVkP2LV05UpkqdOLC7lrfEqCU7tGVRQFY7KFAyh59K4OmmCRg6-rk5fdlRfXyRVGVHxBAg-vr-IK8d-9Ekm81OtgD1RYUJ1sdLjcuL9y9qv9P5eGUz2xdF1WI4euX3dcygrofYDbdT4XER1mpnkHvUep92fw9hd2bK3kOui38zcy41Zmo4j0oU4cq1TehOLbWt2uuG45xmq0xVABgwFncSvUoNpQvESFoAK36bFuMZR6_infJYn1GQno8dSvALJOtpA',
    email: '',
    password: '',

  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.spinner.show();
    const { email, password, captcha } = this.form;
    console.log('form', this.form);

    this.authService.loginTrading(email, password, captcha, EXBASE_CLIENT_ID, GRANT_TYPE)
    .subscribe(data => {
        console.log('response:', data);
        if (data.d.ok) {
          this.tokenStorageService.saveToken(data.d.access_token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
        }

      },
      err => {
        this.errorMessage = err;
        // this.isLoginFailed = true;
      },
      () => {
        this.spinner.hide();
      });
  }

}
