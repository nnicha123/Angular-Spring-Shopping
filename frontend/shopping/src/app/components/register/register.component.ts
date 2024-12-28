import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: './app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  inputFocused: {
    firstName: boolean;
    lastName: boolean;
    address: boolean;
    imageUrl: boolean;
    username: boolean;
    password: boolean;
  } = {
    firstName: false,
    lastName: false,
    address: false,
    imageUrl: false,
    username: false,
    password: false,
  };
  destroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),

      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  toggleBlur(input: string) {
    if (!this.registerForm.get(input)?.value) {
      this.inputFocused[input as keyof typeof this.inputFocused] = false;
    }
  }

  onSubmit() {
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const address = this.registerForm.get('address')?.value;
    const imageUrl = this.registerForm.get('imageUrl')?.value;
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;

    this.authService
      .register({
        firstName,
        lastName,
        address,
        imageUrl,
        username,
        password,
        role: 'CUSTOMER',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
