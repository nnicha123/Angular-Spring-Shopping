import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { OrderItemFront } from '../../models/orderItem';
import { ModuleFacade } from '../../store/module.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  destroy$: Subject<void> = new Subject<void>();
  quantity: number = 1;
  maxQuantity: number = 10;
  minQuantity: number = 1;
  product$!: Observable<Product | undefined>;
  isAdmin: boolean = false;

  adminForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private moduleFacade: ModuleFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = +(params.get('id') || 0);

      this.product$ = this.moduleFacade.selectProductWithId(this.id).pipe(
        tap((product) => {
          this.adminForm.setValue({
            name: product?.name,
            description: product?.description,
          });
        })
      );
    });

    this.moduleFacade.userRole$
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.isAdmin = role === 'ADMIN';
      });
  }

  updateQuantity(instruction: string) {
    if (instruction === 'increment') {
      this.quantity += 1;
    } else {
      this.quantity -= 1;
    }
  }

  addToBasket(product: Product) {
    const { name, imageUrl, price } = product;
    const orderItem: OrderItemFront = {
      productId: this.id,
      quantity: this.quantity,
      name,
      imageUrl,
      price,
    };
    this.moduleFacade.addOrderItem(orderItem);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
