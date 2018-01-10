import { Injectable } from '@angular/core/';
import { Http } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

import { BaseService } from '../shared/services/base.service';


class UserCredsModel {
    UserName: string = '';
    Password: string = '';
}

const CONTEXT = 'createuser';

@Injectable()
export class AboutDummyService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }

    registerUser(creds: UserCredsModel): Observable<any> {debugger;
        return this.post$(creds, false)
        .map(res => {console.log(res);res.json();});
    }
}
