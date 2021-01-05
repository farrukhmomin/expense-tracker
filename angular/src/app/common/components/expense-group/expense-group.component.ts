import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStoreState } from 'src/app/store/reducers';
import { getExpenseByForDayInMonth } from 'src/app/store/reducers/expense/expense.selectors';
import { getMemberById } from 'src/app/store/reducers/member/member.selectors';
import { getVendorById } from 'src/app/store/reducers/vendor/vendor.selectors';
import { environment } from 'src/environments/environment';
import { IExpense, IExpenseGroup, IExpenseGroupVendors, IIcon, IMember, IVendor } from '../../interface';

@Component({
    selector: 'app-expense-group',
    templateUrl: './expense-group.component.html',
    styleUrls: ['./expense-group.component.scss']
})
export class ExpenseGroupComponent implements OnChanges {

    @Input() expenses: IExpense[] | null = null;
    @Input() cssClassName = '';
    @Input() expenseTypeIcons: IIcon;
    @Input() currentMonth = new Date().getMonth() + 1;

    iconUrl = environment.iconsUrl;
    memberPhotoUrl = environment.memberIconUrl;
    expenseGroups: IExpenseGroup[] = [];

    constructor(private store: Store<IStoreState>) { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('expenses' in changes) {
            this.constructExpense(this.expenses);
        }
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
            this.store.select(getExpenseByForDayInMonth, { day: new Date(group.dated).getDate(), month: this.currentMonth })
                .subscribe(data => {
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

                                const vendorExpenses = group.expenses.filter((expFromVendor: IExpense) =>
                                    +expFromVendor.vendor_id === v?.id);

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
        return this.expenseTypeIcons[desc.toLowerCase()];
    }

    getMemberById(id: number): Observable<IMember[] | undefined> {
        return this.store.select(getMemberById, { memberId: id });
    }

}