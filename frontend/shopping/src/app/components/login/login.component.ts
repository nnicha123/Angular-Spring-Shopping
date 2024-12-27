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
  selector: './app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  destroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService
      .login({ username, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe((customer) => {
        // Log customer -> At this stage, can store customer in store
        localStorage.setItem('customerId', '' + customer.id);
        this.authService.setLoggedIn(true);
        this.authService.setCustomer(customer);
        this.orderService.markApiCalledFalse();
        // Then navigate
        this.router.navigateByUrl('/product');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
