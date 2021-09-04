import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExbaseRestService } from 'src/_services';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  betAccountType: string = 'DEMO';
  transactions = [];

  constructor(
    private exbaseRestService: ExbaseRestService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions() {
    const queryParams = new HttpParams()
      .append('page', this.page)
      .append('size', this.pageSize)
      .append('betAccountType', this.betAccountType);

    this.spinner.show();

    this.exbaseRestService
      .get('api/wallet/binaryoption/transaction/close', queryParams)
      .subscribe(
        (res) => {
          if (res.ok) {
            this.transactions = res.d.c;
          } else {
            this.transactions = [];
            this.toastr.error('Có lỗi xảy ra! Vui lòng thử lại!');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('Có lỗi xảy ra! Vui lòng thử lại!');
        },
        () => this.spinner.hide()
      );
  }
}
