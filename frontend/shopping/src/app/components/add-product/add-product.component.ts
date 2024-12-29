import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  @Input() addingProduct: boolean = false;
  @Output() closeAddDialogEvent = new EventEmitter<boolean>();
  destroy$: Subject<void> = new Subject();
  addForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl([0, Validators.required]),
      numInStock: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  onAddProduct() {
    const newProduct: Product = {
      id: 0, //default,
      ...this.addForm.value,
    };
    this.productsService
      .addProduct(newProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onClose();
        window.location.reload();
      });
  }

  onClose() {
    this.closeAddDialogEvent.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
