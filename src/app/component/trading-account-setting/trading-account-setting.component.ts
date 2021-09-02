import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirestoreService } from 'src/app/services/firestore.service';
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

  exAccountId = 'r3ZeEHZrxpZBlvy0Y8vu'; // <-- seeding

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private firestoreService: FirestoreService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken('exbase')) {

      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.spinner.show();
    const { email, password, captcha } = this.form;

    this.authService
      .loginToExbase(email, password, captcha)
      .subscribe(
        (data) => {
          if (data.ok) {
            this.tokenStorageService.saveToken(data.d.access_token, 'exbase');
            this.tokenStorageService.saveRefreshToken(data.d.refresh_token, 'exbase');

            const { access_token, refresh_token } =  data.d;
            this.firestoreService.updateById('accounts', this.exAccountId, { access_token, refresh_token });
            this.isLoginFailed = false;
            this.isLoggedIn = true;
          }
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.spinner.hide();
        }
      );
  }

}
