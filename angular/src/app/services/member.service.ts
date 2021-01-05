import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember } from '../common/interface';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class MemberService extends HttpService {
    getMember(): Observable<IMember[]> {
        return this.get<IMember[]>('user/get-members', environment.getOfflineData);
    }
}
