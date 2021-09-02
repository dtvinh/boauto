import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExbaseRestService } from 'src/_services/exbase-rest.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styles: [`
    .bet-operators { display: flex; justify-content: space-between; }
    .bet-operators button { display: flex; justify-content: center; align-items: center; }
  `]
})
export class ZoomComponent implements OnInit, AfterViewInit {
  currentSecond: number = new Date().getSeconds()
  counting: number = 0;
  betDisable: boolean = false;
  actionMsg: string = '';
  amount: number = 5;
  isBet: boolean = false;

  constructor(
    private exbaseRestService: ExbaseRestService,
    private spinner: NgxSpinnerService) {
    }

  ngOnInit(): void {
    setInterval(() => {
      this.currentSecond = new Date().getSeconds();
      this.counting = this.currentSecond > 30 ? 60 - this.currentSecond :  30 - this.currentSecond;
      if (this.currentSecond == 1 && this.isBet) {
        this.spotBalance();
      }
    }, 1000);
  }

  ngAfterViewInit(): void {}

  bet(type: string) {
    this.spinner.show();
    let betType = type;
    let betAmount = this.amount;
    let betAccountType = 'DEMO'
    const notifyAction = 'Đóng';
    let notifyMsg: string = '';

    this.exbaseRestService
      .post('/api/wallet/binaryoption/bet', { betType, betAmount, betAccountType })
      .subscribe(
        (response) => {
          notifyMsg = response.ok ? 'Đặt cược thành công!' : 'Đặt cược thất bại!';
          this.isBet = true;
        },
        (error) => {
          notifyMsg = 'Đặt cược thất bại!';
          console.log(error);
        },
        () => {
          this.spinner.hide();
          console.log('notifyMsg: ', notifyMsg);
        }
      );
  }

  spotBalance() {
    this.exbaseRestService
      .get('/api/wallet/binaryoption/spot-balance', {})
      .subscribe(response => {
        console.log('spotBalance', response);
      });
    this.isBet = false;
  }

  increaseAmount(num: number) {
    this.amount += num;
  }

  poundAmount(pound: number) {
    this.amount = this.amount * pound;
  }

  resetAmount() {
    this.amount = 5;
  }
}
