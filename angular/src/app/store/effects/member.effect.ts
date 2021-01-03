import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MemberService } from 'src/app/services/member.service';
import { GetMemberAction, LoadMemberAction } from '../actions/member.action';

@Injectable({
    providedIn: 'root'
})
export class MemberEffect {

    constructor(private actions$: Actions, private memberService: MemberService) { }

    getExpenseType$ = createEffect(() => this.actions$.pipe(
        ofType(GetMemberAction),
        exhaustMap(() => this.memberService.getMember()
            .pipe(
                map((members) => LoadMemberAction({ members })),
                catchError((error) => of(error))
            ))
    ));

}
