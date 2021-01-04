import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IExpense, IIgnoreTags, IMember } from 'src/app/common/interface';
import { ExpenseTypeActionTypes } from 'src/app/store/actions/expense-type.action';
import { IncomeActionType } from 'src/app/store/actions/income.action';
import { MemberActionTypes } from 'src/app/store/actions/member.action';
import { VendorExpenseTypeActionTypes } from 'src/app/store/actions/vendor-expense-type.action';
import { VendorActionTypes } from 'src/app/store/actions/vendor.action';
import { IStoreState } from 'src/app/store/reducers';
import { getAllMember } from 'src/app/store/reducers/member/member.selectors';
import { eFilterType } from '../common/enum';
import { ExpenseActionTypes } from '../store/actions/expense.action';
import { IgnoreTagsActionTypes } from '../store/actions/ignore-tags.action';
import { getAllExpenseByMonth } from '../store/reducers/expense/expense.selectors';
import { getAllIgnoreTags } from '../store/reducers/tags/ignore-tags.selector';


@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  member$?: Observable<IMember[]>;
  expenses$?: Observable<IExpense[]> | null;
  ignoreTags$?: Observable<IIgnoreTags[]>;

  constructor(private store: Store<IStoreState>, private router: Router) {
    this.store.dispatch({ type: VendorActionTypes.VENDOR_LIST_GET });
    this.store.dispatch({ type: ExpenseTypeActionTypes.EXPENSE_TYPE_LIST_GET });
    this.store.dispatch({ type: VendorExpenseTypeActionTypes.VENDOR_EXPENSE_TYPE_LIST_GET });
    this.store.dispatch({ type: IncomeActionType.GetIncomeAction });
    this.store.dispatch({ type: ExpenseActionTypes.EXPENSE_LIST_GET });
    this.store.dispatch({ type: MemberActionTypes.MEMBER_LIST_GET });
    this.store.dispatch({ type: IgnoreTagsActionTypes.IGNORE_TAG_LIST_GET });
  }
  ngOnInit(): void {
    this.member$ = this.store.select(getAllMember);
    this.expenses$ = this.store.select(getAllExpenseByMonth, { month: new Date().getMonth() + 1 });
    this.ignoreTags$ = this.store.select(getAllIgnoreTags);
  }


  redirectToFilterPage(value: any, page: string) {
    if (page === 'member') {
      this.router.navigateByUrl('show/member/' + value, { state: { filterType: eFilterType.member, filterValue: value, month: new Date().getMonth() + 1 } });
    }
    else if (page === 'tag') {
      this.router.navigateByUrl('show/tag/' + value, { state: { filterType: eFilterType.tag, filterValue: value, month: new Date().getMonth() + 1 } });
    }
  }

}
