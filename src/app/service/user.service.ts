import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';


const USER_URL = `${environment.apiGatewayUrl}/user`;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUserByEmail(email: string) {
        return this.http.get(`${USER_URL}/${email}`);
    }

    getUserByUid(uid: string) {
        return this.http.get(`${USER_URL}/uid/${uid}`);
    }

    addPendingUserToTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/pending`, JSON.stringify({}), httpOptions);
    }

    acceptRiderForTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/riding`, JSON.stringify({}), httpOptions);
    }

    rejectRiderForTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/rejected`, JSON.stringify({}), httpOptions);
    }

    createUser(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        const reqBody = JSON.stringify(user);

        return this.http.post(`${USER_URL}`, reqBody, httpOptions);
    }
}
