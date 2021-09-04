import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorized-aside',
  templateUrl: './authorized-aside.component.html'
})
export class AuthorizedAsideComponent implements OnInit, AfterViewInit {

  private iconNavbarSidenav: any;
  private iconSidenav: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
    this.iconSidenav = document.getElementById('iconSidenav');
    if (this.iconNavbarSidenav) {
      this.iconNavbarSidenav.addEventListener('click', this.toggleSidenav);
    }

    if (this.iconSidenav) {
      this.iconSidenav.addEventListener('click', this.toggleSidenav);
    }
  }

  private toggleSidenav() {
    let className = 'g-sidenav-pinned';
    let body = document.getElementsByTagName('body')[0];
    const sidenav = document.getElementById('sidenav-main');

    if (body.classList.contains(className)) {
      body.classList.remove(className);
      setTimeout(function() {
        sidenav?.classList.remove('bg-white');
      }, 100);
      sidenav?.classList.remove('bg-transparent');

    } else {
      body.classList.add(className);
      sidenav?.classList.add('bg-white');
      sidenav?.classList.remove('bg-transparent');
      this.iconSidenav?.classList.remove('d-none');
    }
  }

}
