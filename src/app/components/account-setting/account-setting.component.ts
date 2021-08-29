import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  // styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  exAccount = { email: '', password: '' };
  private exAccounts: any ;

  constructor(private accountService: AccountsService) {}

  submitted = false;

  ngOnInit(): void {
    let exAccountId = 'r3ZeEHZrxpZBlvy0Y8vu'; // <- seed data
    this.accountService.getAccountById(exAccountId).then(res => console.log('account:', res))
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.exAccount);
  }
}
