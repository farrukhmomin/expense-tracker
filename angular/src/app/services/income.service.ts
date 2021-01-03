import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIncome } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class IncomeService extends HttpService {
    getIncome(): Observable<IIncome[]> {
        return this.get<IIncome[]>('user/get-income');
    }
}
