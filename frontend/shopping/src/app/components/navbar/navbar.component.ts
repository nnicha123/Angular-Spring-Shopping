import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  activeIndex: number = 0;
  navBar: NavBar[] = [
    { name: 'Home', link: '/product', active: false },
    { name: 'My Previous Orders', link: '/orders-history', active: false },
    { name: 'Basket', link: '/basket', active: false },
  ];

  ngOnInit(): void {
    this.setActive(0);
  }

  setActive(index: number) {
    // Deactive previous activeIndex
    this.navBar[this.activeIndex].active = false;

    // activate index;
    this.navBar[index].active = true;
    this.activeIndex = index;
  }
}

interface NavBar {
  name: string;
  link: string;
  active: boolean;
}
