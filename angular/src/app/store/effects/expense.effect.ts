import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ExpenseService } from 'src/app/services/expense.service';
import { GetExpenseAction, LoadExpenseAction } from '../actions/expense.action';

@Injectable({
    providedIn: 'root'
})
export class ExpenseEffect {

    constructor(private actions$: Actions, private expenseService: ExpenseService) { }

    getExpense$ = createEffect(() => this.actions$.pipe(
        ofType(GetExpenseAction),
        exhaustMap(() => this.expenseService.getExpenses()
            .pipe(
                map((expenses) => {
                    expenses.forEach((e) => {
                        if (!!e.tags) {
                            e.tagsArray = e.tags.split('|');
                        }
                    });
                    return LoadExpenseAction({ expenses });
                }),
                catchError((error) => of(error))
            ))
    ));

}
