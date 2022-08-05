import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken();
          if (userId) {
            return this.userService.getUser(userId).pipe(
              map((user) => UsersActions.buildUserSessionSuccess({ user })),
              catchError((e) => of(UsersActions.buildUserSessionFailed()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        } else {
          return of(UsersActions.buildUserSessionFailed());
        }
      })
    )
  );
}
