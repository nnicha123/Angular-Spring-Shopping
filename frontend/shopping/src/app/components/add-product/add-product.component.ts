import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() addingProduct: boolean = true;
  @Output() closeAddDialogEvent = new EventEmitter<boolean>();

  addForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    console.log('adding product');
    console.log(this.addForm.value);
  }

  onClose() {
    this.closeAddDialogEvent.emit(true);
  }
}
