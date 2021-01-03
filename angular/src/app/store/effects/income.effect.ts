import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IIncome } from 'src/app/common/interface';
import { IncomeService } from 'src/app/services/income.service';
import { GetIncomeAction, LoadIncomeAction } from '../actions/income.action';

@Injectable({
    providedIn: 'root'
})
export class IncomeEffects {
    constructor(private actions$: Actions, private incomeService: IncomeService) { }

    getIncome$ = createEffect(() => this.actions$.pipe(
        ofType(GetIncomeAction),
        exhaustMap(() => this.incomeService.getIncome()
            .pipe(
                map((income: IIncome[]) => {
                    income.forEach((e) => {
                        if (!!e.tags) {
                            e.tagsArray = e.tags.split('|');
                        }
                    });

                    return LoadIncomeAction({ income });
                }),
                catchError((error) => of(error))
            ))
    ));

}
