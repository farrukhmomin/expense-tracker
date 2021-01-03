import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExpense, IExpenseGroup, IExpenseGroupVendors, IIncome, IMember, IVendor } from 'src/app/common/interface';
import { ExpenseService } from 'src/app/services/expense.service';
import { IStoreState } from 'src/app/store/reducers';
import { getAllExpenseByMonth, getExpenseByForDay } from 'src/app/store/reducers/expense/expense.selectors';
import { getIncomeByMonth, getIncomeTotalForCurrentMonth } from 'src/app/store/reducers/income/income.selector';
import { getMemberById } from 'src/app/store/reducers/member/member.selectors';
import { getVendorById } from 'src/app/store/reducers/vendor/vendor.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  iconUrl = environment.iconsUrl;
  memberPhotoUrl = environment.memberIconUrl;

  income$?: Observable<IIncome[]>;
  totalIncome: Observable<number>;
  totalExpense = 0;

  expensesByMonth: Observable<IExpense[]>;
  currentMonth: number;

  expenseGroups: IExpenseGroup[] = [];
  tagCloud = [{}];

  constructor(private store: Store<IStoreState>, private expenseType: ExpenseService) {
    this.tagCloud.pop();

    this.currentMonth = new Date().getMonth() + 1;
    this.totalIncome = this.store.select(getIncomeTotalForCurrentMonth, { month: this.currentMonth });
    this.income$ = this.store.select(getIncomeByMonth, { month: this.currentMonth });
    this.expensesByMonth = this.store.select(getAllExpenseByMonth, { month: this.currentMonth })
      .pipe(
        map((expenses) => {
          expenses.forEach((e) => {
            this.totalExpense += e.expense_total;
          });
          this.constructExpense(expenses);
          return expenses;
        })
      );

  }

  ngOnInit(): void {

  }

  constructExpense(expenses: IExpense[]): void {

    // constructing an array
    // adding day object in array [{dated: 30}]
    expenses.forEach((e: IExpense) => {
      if (!this.expenseGroups?.find((exp: IExpenseGroup) => new Date(e.dated).getDate() === new Date(exp.dated).getDate())) {
        const a: IExpenseGroup = { dated: new Date(e.dated), expenses: [], vendors: [] };
        this.expenseGroups.push(a);
      }
    });

    this.expenseGroups.forEach((group: IExpenseGroup) => {
      // adding expenses by day into dated object [{dated: 30, expenses: [] }]
      this.store.select(getExpenseByForDay, { day: new Date(group.dated).getDate(), month: this.currentMonth }).subscribe(data => {
        group.expenses = data;

        // populating unique vendors on that day
        // i.e if you went walmart twice on same day, it will group in one array of expenses
        const uniqueVendors: number[] = [...new Set(group.expenses.map((d: IExpense) => d.vendor_id))];

        uniqueVendors.forEach((Id) => {

          // getting vendor details from from store
          this.store.select(getVendorById, { vendorId: +Id }).subscribe((v: IVendor | undefined) => {

            // checking if vendor already added in array
            const gv = group.vendors.find((vg: any) => vg.id === v?.id);

            if (!gv) {
              // push vendor details along with purchasing done for the vendor

              const vendorExpenses = group.expenses.filter((expFromVendor: IExpense) => +expFromVendor.vendor_id === v?.id);

              if (vendorExpenses.length > 0) {
                const vendorData: IExpenseGroupVendors = {
                  id: v?.id,
                  name: v?.name,
                  icon: v?.icon,
                  total: vendorExpenses.reduce((total, item) => total + item.expense_total, 0),
                  purchasing: vendorExpenses
                };
                group.vendors.push(vendorData);
              }
            }
          });

        });
      });

    });
  }

  getIcon(desc: string): string {
    return this.expenseType.expenseTypeIcons[desc.toLowerCase()];
  }

  getVendorById(id: number): Observable<IVendor | undefined> {
    return this.store.select(getVendorById, { vendorId: id });
  }

  getMemberById(id: number): Observable<IMember | undefined> {
    return this.store.select(getMemberById, { memberId: id });
  }


}
