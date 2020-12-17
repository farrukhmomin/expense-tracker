import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { IIncome, ILogin, IMember, IUser } from '../common/interface';

@Injectable({
    providedIn: 'root'
})
export class UserService extends HttpService {

    LoginUser(data: ILogin): Observable<IUser> {
        return this.post<ILogin, IUser>('user/login', data);
    }

    GetMembers(): Observable<IMember> {
        return this.get<IMember>('user/get-members');
    }

    GetIncome(): Observable<IIncome> {
        return this.get<IIncome>('user/get-income');
    }

}
