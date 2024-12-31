import { Component, OnInit } from '@angular/core';
import { ModuleFacade } from './store/module.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private moduleFacade: ModuleFacade) {}

  title = 'shopping';
  ngOnInit(): void {
    this.moduleFacade.loadProducts();
    this.checkAuth();
  }

  checkAuth() {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      this.moduleFacade.loadUser(+customerId);
    }
  }
}
