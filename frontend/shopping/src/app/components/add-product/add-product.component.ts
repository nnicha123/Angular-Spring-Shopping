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
import { Subject } from 'rxjs';
import { ModuleFacade } from '../../store/module.facade';
import { Product } from '../../models/product';

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

  constructor(private fb: FormBuilder, private moduleFacade: ModuleFacade) {}

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
    this.moduleFacade.addProduct(newProduct);
    this.onClose();
  }

  onClose() {
    this.closeAddDialogEvent.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
