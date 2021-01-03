import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IExpense, IExpenseType, IIgnoreTags } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService extends HttpService {

    expenseTypeIcons: { [key: string]: string } = {};

    getExpenseTypes(): Observable<IExpenseType[]> {
        return this.get<IExpenseType[]>('expense/get-expense-type').pipe(map(types => this.createKeyObject(types)));
    }

    createKeyObject(types: IExpenseType[]): IExpenseType[] {
        types.forEach(expType => {
            this.expenseTypeIcons[expType.name.toLowerCase()] = expType.icon_url;
        });
        return types;
    }

    getExpenses(): Observable<IExpense[]> {
        return this.get<IExpense[]>('expense/get-expenses');
    }

    getIgnoreTags(): Observable<IIgnoreTags[]> {
        return this.get<IIgnoreTags[]>('expense/get-ignore-tags');
    }

}
