import { Component, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { eFilterType } from "src/app/common/enum";
import { IExpense, IIcon, IMember } from "src/app/common/interface";
import { ExpenseService } from "src/app/services/expense.service";
import { IStoreState } from "src/app/store/reducers";
import { getExpenseForMonthFilterByCol, getExpenseTotalForMonthFilterByCol } from "src/app/store/reducers/expense/expense.selectors";
import { getMemberById } from "src/app/store/reducers/member/member.selectors";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-expense-filter',
    templateUrl: './expense-filter.component.html',
    styleUrls: ['./expense-filter.component.scss']
})
export class ExpenseFilterComponent implements OnDestroy {

    @Input() filterType: eFilterType;
    @Input() filterValue: any | string | number;
    @Input() filterDurationFrom: Date;
    @Input() filterDurationTo: Date;
    @Input() month: number;

    eFilterType = eFilterType;
    iconUrl = environment.iconsUrl;
    memberPhotoUrl = environment.memberIconUrl;

    expenses$: Observable<IExpense[]>;
    member$: Observable<IMember[]>;
    expenseTypeIcons: IIcon;
    navigatorParams: any;
    params: Params;
    expenseTotal$?: Observable<number>;
    isSet = false;


    constructor(
        private store: Store<IStoreState>,
        public expenseType: ExpenseService,
        private router: Router,
        private route: ActivatedRoute) {

        this.expenseTypeIcons = this.expenseType.expenseTypeIcons;

        this.route.params.subscribe(params => {
            this.navigatorParams = this.router.getCurrentNavigation().extras;
            this.params = params;
            this.loadData();
        });
    }
    ngOnDestroy(): void {

    }

    loadData(): void {
        if (this.navigatorParams && this.navigatorParams.state) {
            this.filterType = this.navigatorParams.state.filterType;
            this.filterValue = this.navigatorParams.state.filterValue;
            this.month = this.navigatorParams.state.month;
        } else if (this.filterType === undefined) {
            this.month = new Date().getMonth() + 1;
            if (this.router.url.indexOf('/member') >= 0) {
                this.filterType = eFilterType.member;
                this.filterValue = this.params['id'];
            } else if (this.router.url.indexOf('/tag') >= 0) {
                this.filterType = eFilterType.tag;
                this.filterValue = this.params['tag'];
            }
        }

        switch (this.filterType) {
            case eFilterType.member:
                this.member$ = this.store.select(getMemberById, { memberId: this.filterValue });
                this.expenses$ = this.store.select(getExpenseForMonthFilterByCol,
                    { month: this.month, column: 'member_id', columnValue: this.filterValue });

                this.expenseTotal$ = this.store.select(getExpenseTotalForMonthFilterByCol,
                    { month: this.month, column: 'tags', columnValue: this.filterValue });
                break;
            case eFilterType.tag:
                this.expenses$ = this.store.select(getExpenseForMonthFilterByCol,
                    { month: this.month, column: 'tags', columnValue: this.filterValue });

                this.expenseTotal$ = this.store.select(getExpenseTotalForMonthFilterByCol,
                    { month: this.month, column: 'tags', columnValue: this.filterValue });
                break;
            default:
                of(EMPTY);
        }
    }
}
