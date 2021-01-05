import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExpense, IExpenseGroup, IIncome, IMember, IVendor } from 'src/app/common/interface';
import { ExpenseService } from 'src/app/services/expense.service';
import { IStoreState } from 'src/app/store/reducers';
import { getAllExpenseByMonth, getAllExpenseTotalByMonth } from 'src/app/store/reducers/expense/expense.selectors';
import { getIncomeByMonth, getIncomeTotalForCurrentMonth } from 'src/app/store/reducers/income/income.selector';
import { getMemberById } from 'src/app/store/reducers/member/member.selectors';
import { getVendorById } from 'src/app/store/reducers/vendor/vendor.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  iconUrl = environment.iconsUrl;
  memberPhotoUrl = environment.memberIconUrl;

  income$?: Observable<IIncome[]>;
  totalIncome$: Observable<number>;
  totalIncome = 0;
  totalExpense$: Observable<number>;

  expensesByMonth: Observable<IExpense[]>;
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();

  expenseGroups: IExpenseGroup[] = [];

  constructor(private store: Store<IStoreState>, public expenseType: ExpenseService) {

    this.totalIncome$ = this.store.select(getIncomeTotalForCurrentMonth,
      { month: this.currentMonth }).pipe(map(income => this.totalIncome = income));

    this.income$ = this.store.select(getIncomeByMonth, { month: this.currentMonth });

    this.expensesByMonth = this.store.select(getAllExpenseByMonth, { month: this.currentMonth });
    this.totalExpense$ = this.store.select(getAllExpenseTotalByMonth, { month: this.currentMonth });

  }

  getVendorById(id: number): Observable<IVendor | undefined> {
    return this.store.select(getVendorById, { vendorId: id });
  }

  getMemberById(id: number): Observable<IMember[] | undefined> {
    return this.store.select(getMemberById, { memberId: id });
  }

  getDay(date: string): Observable<number> {
    return new BehaviorSubject(new Date(date).getDate());
  }

}
