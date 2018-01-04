import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

import { BaseService } from '../shared/index';
import { Http } from '@angular/http/src/http';

class UserCredsModel {
    UserName: string = '';
    Password: string = '';
}

const CONTEXT = '/createuser';

export class AboutDummyService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }
    registerUser(creds: UserCredsModel): Observable<any> {
        return this.post$({UserName:creds.UserName, Password:creds.Password}, true)
        .map(res => res.json());
    }
}
