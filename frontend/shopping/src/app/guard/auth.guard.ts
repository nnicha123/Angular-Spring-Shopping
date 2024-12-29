import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.customer$.pipe(
      // Wait for a non-null value (customer is loaded)
      filter((customer) => customer !== null),
      take(1), // Ensure we only take the first emitted value
      map((customer) => {
        if (customer) {
          return true; // Allow navigation
        } else {
          // Redirect to login if no customer is found
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
