import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ExpenseService } from 'src/app/services/expense.service';
import { GetExpenseTypeAction, LoadExpenseTypeAction } from '../actions/expense-type.action';

@Injectable({
    providedIn: 'root'
})
export class ExpenseTypeEffect {

    constructor(private actions$: Actions, private expenseService: ExpenseService) { }

    getExpenseType$ = createEffect(() => this.actions$.pipe(
        ofType(GetExpenseTypeAction),
        exhaustMap(() => this.expenseService.getExpenseTypes()
            .pipe(
                map((expenseType) => LoadExpenseTypeAction({ expenseType })),
                catchError((error) => of(error))
            ))
    ));

}
