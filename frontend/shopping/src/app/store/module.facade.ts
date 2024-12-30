import { Store } from '@ngrx/store';
import { ModuleEntityState } from './definitions/store.definitions';
import { Login } from '../models/login';
import * as fromAuthActions from './auth/auth.action';
import { Injectable } from '@angular/core';

@Injectable()
export class ModuleFacade {
  constructor(private store: Store<{ module: ModuleEntityState }>) {}

  loginUser(login: Login): void {
    this.store.dispatch(fromAuthActions.loginUser({ login }));
  }
}
