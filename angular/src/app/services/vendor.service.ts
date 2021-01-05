import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVendor, IVendorExpenseType } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class VendorService extends HttpService {

    getVendor(): Observable<IVendor[]> {
        return this.get<IVendor[]>('vendor/get-vendor', environment.getOfflineData);
    }

    getVendorExpenseTypes(): Observable<IVendorExpenseType[]> {
        return this.get<IVendorExpenseType[]>('vendor/get-vendor-expense-type', environment.getOfflineData);
    }
}
