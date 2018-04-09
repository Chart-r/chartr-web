import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';


const USER_URL = `${environment.apiGatewayUrl}/user`;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUser(email: string) {
        return this.http.get(`${USER_URL}/${email}`);
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
