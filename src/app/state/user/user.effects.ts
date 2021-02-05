import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../features/user/user.service';
import { User } from '../../interface/common.interface';

import { BaseEffects } from '../base.effects';

import * as userActions from './user.actions';
import { GetUserCompleteAction } from './user.actions';

@Injectable()
export class UserEffects extends BaseEffects {
  @Effect()
  getUser$ = this.actions.pipe(
    ofType(userActions.ActionTypes.GET_USER),
    switchMap(() =>
      this.userService.getUsersByVendorId(1).pipe(
        map((user: User) => new GetUserCompleteAction(user)),
        catchError(err => this.handleError(err))
      )
    )
  );

  constructor(
    private actions: Actions,
    private userService: UserService,
    router: Router
  ) {
    super(router);
  }
}
