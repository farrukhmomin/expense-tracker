import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIncome } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class IncomeService extends HttpService {
    getIncome(): Observable<IIncome[]> {
        return this.get<IIncome[]>('user/get-income', environment.getOfflineData);
    }
}
