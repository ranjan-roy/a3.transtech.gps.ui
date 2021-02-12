import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { VendorService } from "../../services/vendor.service";

import { BaseEffects } from "../base.effects";

import {
  ActionTypes,
  GetVendorInitAction,
  GetVendorFailAction,
  GetVendorSuccessAction,
} from "./vendor.actions";

@Injectable()
export class VendorEffects extends BaseEffects {
  constructor(
    private actions$: Actions,
    private vendorService: VendorService,
    router: Router
  ) {
    super(router);
  }

  @Effect()
  getVendor$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_VENDOR_INIT),
    switchMap((action: GetVendorInitAction) => {
      console.log(action);
      return this.vendorService.getVendor().pipe(
        map((payload) => {
          if (payload) {
            return new GetVendorSuccessAction(payload);
          } else {
            return new GetVendorFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );
}
