import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  loggedIn: boolean = false;
  activeIndex: number = 0;

  navBarLoggedIn: NavBar[] = [
    { name: 'Home', link: '/product', active: false },
    {
      name: 'My Previous Orders',
      link: '/orders-history',
      active: false,
    },
    { name: 'Basket', link: '/basket', active: false },
  ];

  navBarAdmin: NavBar[] = [
    { name: 'Home', link: '/product', active: false },
    {
      name: 'Previous Orders',
      link: '/orders-history',
      active: false,
    },
    { name: 'Processing Orders', link: '/orders-processing', active: false },
  ];

  navBarLoggedOut: NavBar[] = [
    { name: 'Home', link: '/product', active: false },
  ];

  navBar: NavBar[] = this.navBarLoggedOut;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.watchAuth();
    this.watchRoute();
  }

  watchRoute() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setRoute(this.router.url);
    });
  }

  setRoute(url: string) {
    this.navBar.map((nav) => {
      if (nav.link === url) {
        nav.active = true;
      } else {
        nav.active = false;
      }
      return;
    });
  }

  watchAuth() {
    this.authService.customer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((customer) => {
        if (customer) {
          this.loggedIn = true;
          if (customer?.role === 'CUSTOMER') {
            this.navBar = this.navBarLoggedIn;
          } else {
            this.navBar = this.navBarAdmin;
          }
        } else {
          this.loggedIn = false;
          this.navBar = this.navBarLoggedOut;
        }
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

interface NavBar {
  name: string;
  link: string;
  active: boolean;
}
