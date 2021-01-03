import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { VendorService } from 'src/app/services/vendor.service';
import { GetVendorExpenseTypeAction, SuccessVendorExpenseTypeAction, VendorExpenseTypeActionTypes } from '../actions/vendor-expense-type.action';


@Injectable({
    providedIn: 'root'
})
export class VendorExpenseTypeEffect {

    constructor(private actions$: Actions, private vendorService: VendorService) { }

    getVendorExpenseTypes$ = createEffect(() => this.actions$.pipe(
        ofType(GetVendorExpenseTypeAction),
        exhaustMap(() => this.vendorService.getVendorExpenseTypes()
            .pipe(
                map((vendorExpenseTypes) => SuccessVendorExpenseTypeAction({ vendorExpenseType: vendorExpenseTypes })),
                catchError((error) => of(error))
            ))
    ));

}
