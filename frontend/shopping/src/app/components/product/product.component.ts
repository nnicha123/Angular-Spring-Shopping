import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Observable, of } from 'rxjs';
import { Customer } from '../../models/customer';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> = of([]);
  customer$: Observable<Customer | null> = of(null);
  addingProduct: boolean = false;

  constructor(private moduleFacade: ModuleFacade) {}

  ngOnInit(): void {
    this.products$ = this.moduleFacade.products$;
    this.customer$ = this.moduleFacade.user$;
  }

  onClose() {
    this.addingProduct = false;
  }
}
