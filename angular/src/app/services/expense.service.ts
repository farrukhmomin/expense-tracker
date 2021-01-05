import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IExpense, IExpenseType, IIcon, IIgnoreTags } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService extends HttpService {

    expenseTypeIcons: IIcon = {};

    getExpenseTypes(): Observable<IExpenseType[]> {
        return this.get<IExpenseType[]>('expense/get-expense-type', environment.getOfflineData)
            .pipe(map(types => this.createKeyObject(types)));
    }

    getExpenses(): Observable<IExpense[]> {
        return this.get<IExpense[]>('expense/get-expenses', environment.getOfflineData);
    }

    getIgnoreTags(): Observable<IIgnoreTags[]> {
        return this.get<IIgnoreTags[]>('expense/get-ignore-tags', environment.getOfflineData);
    }

    private createKeyObject(types: IExpenseType[]): IExpenseType[] {
        types.forEach(expType => {
            this.expenseTypeIcons[expType.name.toLowerCase()] = expType.icon_url;
        });
        return types;
    }
}
