import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { VendorService } from 'src/app/services/vendor.service';
import { LoadVendorAction, VendorActionTypes } from '../actions/vendor.action';

@Injectable({
    providedIn: 'root'
})
export class VendorEffects {
    constructor(private actions$: Actions, private vendorService: VendorService) { }

    getVendors$ = createEffect(() => this.actions$.pipe(
        ofType(VendorActionTypes.VENDOR_LIST_GET),
        exhaustMap(() => this.vendorService.getVendor()
            .pipe(
                map(vendors => LoadVendorAction({ vendors })),
                catchError((error) => of(error))
            )
        )
    ));
}
