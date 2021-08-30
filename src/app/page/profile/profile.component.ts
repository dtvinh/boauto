import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  exAccount = { email: '', password: '' };
  private exAccounts: any;

  constructor(
    private accountService: AccountsService,
    private spinner: NgxSpinnerService
  ) {}

  submitted = false;

  ngOnInit(): void {
    this.spinner.show();

    let exAccountId = 'r3ZeEHZrxpZBlvy0Y8vu'; // <- seed data
    this.accountService
      .getAccountById(exAccountId)
      .then((res) => console.log('account:', res))
      .finally(() => this.spinner.hide());
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.exAccount);
  }
}
