import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-layout',
  template: `
    <div>
      <app-page-content></app-page-content>
      <app-guest-footer></app-guest-footer>
    </div>`
})
export class GuestLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
