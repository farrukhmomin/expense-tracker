import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExpense, IExpenseType } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService extends HttpService {

    getExpenseTypes(): Observable<IExpenseType> {
        return this.get<IExpenseType>('expense/get-expense-type');
    }

    getExpenses(): Observable<IExpense> {
        return this.get<IExpense>('expense/get-expenses');
    }

}
