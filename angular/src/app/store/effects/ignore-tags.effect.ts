import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ExpenseService } from 'src/app/services/expense.service';
import { GetIgnoreTagsAction, LoadIgnoreTagsAction } from '../actions/ignore-tags.action';

@Injectable({
    providedIn: 'root'
})
export class IgnoreTagsEffect {

    constructor(private actions$: Actions, private expenseService: ExpenseService) { }

    getIgnoreTags$ = createEffect(() => this.actions$.pipe(
        ofType(GetIgnoreTagsAction),
        exhaustMap(() => this.expenseService.getIgnoreTags()
            .pipe(
                map((tags) => LoadIgnoreTagsAction({ tags })),
                catchError((error) => of(error))
            ))
    ));

}
