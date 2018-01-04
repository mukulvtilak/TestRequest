import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

import { MessageService } from './message.service';

interface IHttpService {
    baseUrl: string;
    get$(id: number, isSecure?: boolean): Observable<Response>;
    getList$(pageNum?: number, pageSize?: number, isSecure?: boolean): Observable<Response>;
    post$(payload: any, isSecure?: boolean): Observable<Response>;
    put$(id:string, payload: any, isSecure: boolean): Observable<Response>;
    delete$(id:string, isSecure?: boolean): Observable<Response>;
}

/** BaseService definition */
export class BaseService implements IHttpService {
    public baseUrl: string = 'localhost:5050/';
    public options: RequestOptions;
    private httpService: Http;
    private requestUrl: string;

    constructor( _httpService: Http, _context: string) {
        this.httpService = _httpService;
        this.requestUrl = this.baseUrl.concat(_context);
    }
    /**
     * Get a object
     * @param id : ID of object
     * @param isSecure : tell if authorization headers should be appended
     */
    get$(id: number, isSecure?: boolean): Observable<Response> {
        this.getHeaders(isSecure);
        return this.httpService
        .get(this.requestUrl + '/' + id, this.options)
        .map(data => { return data; })
        .catch(err => { return this.handleError(err); });
    }

    /**
     * Gets list of objects
     * @param pageNum : optional parameter
     * @param pageSize : optional parameter
     * @param isSecure : tell if authorization headers should be appended
     */
    getList$(pageNum?: number, pageSize?: number, isSecure?: boolean): Observable<Response> {
        this.getHeaders(isSecure);
        return this.httpService.get(this.requestUrl, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    /**
     * Get list of child objects using getChildList$
     * @input : childName : string
     * @input pageNum : Optional parameter,
     * @input pageSize : Optional Parameter,
     * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
     */
    getChildList$(childName: string, pageNum?: number, pageSize?: number, isSecured?: boolean) {
        this.getHeaders(isSecured);
        return this.httpService.get(this.requestUrl + '/' + childName, this.options)
            .map(data => {
                return data;
            })
            .catch(err => {
                return this.handleError(err);
            });

    }

    /**
     * Data to send to API
     * @param payload data to be sent
     * @param isSecure tell if authorization headers should be appended
     */
    post$(payload: any, isSecure?: boolean): Observable<Response> {
        this.getHeaders(isSecure);
        return this.httpService.post(this.requestUrl, payload, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    /**
     * Data to update on API
     * @param id : object ID to be updated
     * @param payload : new object data
     * @param isSecure : tell if authorization headers should be appended
     */
    put$(id:string, payload: any, isSecure: boolean): Observable<Response> {
        this.getHeaders(isSecure);
        return this.httpService.put(this.requestUrl, payload, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    /**
     * Data to be deleted on API
     * @param id : object id to be deleted
     * @param isSecure : tell if authorization headers hould be appended
     */
    delete$(id:string, isSecure?: boolean): Observable<Response> {
        return this.httpService.delete(this.requestUrl + '/' + id, this.options)
            .map(data => {
                return data;
            })
            .catch(err => {
                return this.handleError(err);
            });
    }

    getHeaders(isSecure: boolean): void {
        let headers = new Headers({});
        if(isSecure) {
            headers.append('Authorization', 'Bearer' + localStorage.getItem('accessToken'));
        }
        this.options = new RequestOptions({ headers : headers});
    }

    protected handleError(error: Response | any, hideErrorMessage: boolean = false): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 401) {
                this.onUnAuthorized();
            }
            const body = error.json() || '';
            const err = body.error_description || body.error || body.Message || JSON.stringify(body);
            //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            errMsg = err;
            if (error.status !== 401) {
                if (hideErrorMessage === false) {
                    MessageService.addMessage({ severity: 'error', summary: 'Failed', detail: errMsg });
                }
            }
        } else {
            if (hideErrorMessage === false) {
                MessageService.addMessage({ severity: 'error', summary: 'Failed', detail: errMsg });
            }
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private onUnAuthorized() {
        localStorage.clear();
        MessageService.setSessionTimeOutMessage(true);
    }
}
