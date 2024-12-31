import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { ModuleFacade } from '../store/module.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private moduleFacade: ModuleFacade, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.moduleFacade.user$.pipe(
      // Wait for a non-null value (customer is loaded)
      filter((user) => user !== null),
      take(1), // Ensure we only take the first emitted value
      map((user) => {
        if (user && user.id) {
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
