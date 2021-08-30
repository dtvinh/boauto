import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-content',
  template: `
    <router-outlet></router-outlet>
  `
})
export class PageContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
