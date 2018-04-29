import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';


const USER_URL = `${environment.apiGatewayUrl}/user`;

/** Class representing the user service */
@Injectable()
export class UserService {
    /**
     * Create a user service
     * @param http The Angular http client
     */
    constructor(private http: HttpClient) { }

    /**
     * Get a user by email
     * @param email The user's email
     * @returns The request observable
     */
    getUserByEmail(email: string) {
        return this.http.get(`${USER_URL}/${email}`);
    }

    /**
     * Get a user by UID
     * @param uid The UID of the user
     * @returns The request observable
     */
    getUserByUid(uid: string) {
        return this.http.get(`${USER_URL}/uid/${uid}`);
    }

    /**
     * Add a pending user to a trip
     * @param uid The UID of the user to add
     * @param tid The TID of the trip
     * @returns The request observable
     */
    addPendingUserToTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/pending`, JSON.stringify({}), httpOptions);
    }

    /**
     * Accept a user to a trip
     * @param uid The UID of the user to accept
     * @param tid The TID of the trip
     * @returns The request observable
     */
    acceptRiderForTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/riding`, JSON.stringify({}), httpOptions);
    }

    /**
     * Reject a user from a trip
     * @param uid The UID of the user to reject
     * @param tid The TID of the trip
     * @returns The request observable
     */
    rejectRiderForTrip(uid: string, tid: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.http.put(`${USER_URL}/${uid}/trip/${tid}/rejected`, JSON.stringify({}), httpOptions);
    }

    /**
     * Create a new user
     * @param user The user to create
     * @returns The request observable
     */
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
