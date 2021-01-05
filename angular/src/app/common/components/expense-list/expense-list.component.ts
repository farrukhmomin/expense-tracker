import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStoreState } from 'src/app/store/reducers';
import { getMemberById } from 'src/app/store/reducers/member/member.selectors';
import { environment } from 'src/environments/environment';
import { IExpense, IExpenseGroup, IExpenseGroupVendors, IIcon, IMember, IVendor } from '../../interface';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

    iconUrl = environment.iconsUrl;
    memberPhotoUrl = environment.memberIconUrl;

    @Input() expenses: IExpense[] | null = null;
    @Input() expenseTypeIcons: IIcon;

    constructor(private store: Store<IStoreState>) {
    }

    getIcon(desc: string): string {
        return this.expenseTypeIcons[desc.toLowerCase()];
    }

    getMemberById(id: number): Observable<IMember[] | undefined> {
        return this.store.select(getMemberById, { memberId: id });
    }

}