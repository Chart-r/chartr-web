import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const CREATE_USER_URL = `${environment.apiGatewayUrl}/user/*`;

@Injectable()
export class SignupService {

    constructor(private cognitoService: CognitoService, private http: HttpClient) { }

    register(user: User, password: string, cb: (err: string, result: any) => void) {
        const attributes = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };
        const dataName = {
            Name: 'name',
            Value: user.name
        };
        const dataPhone = {
            Name: 'phone_number',
            Value: user.phone
        };
        const dataBirthdate = {
            Name: 'birthdate',
            Value: user.birthdate
        };
        
        attributes.push(new CognitoUserAttribute(dataEmail));
        attributes.push(new CognitoUserAttribute(dataName));
        attributes.push(new CognitoUserAttribute(dataPhone));
        attributes.push(new CognitoUserAttribute(dataBirthdate));

        this.cognitoService.getUserPool().signUp(user.email, password, attributes, null, (err, result) => {
            if (err) {
                cb(err.message, null);
            }

            else {
                this.addToDB(user, null);
                cb(null, result);
            }
        });

    }

    addToDB(user: User, cb: (err: string, result: any) => void) {
        return this.http.post(CREATE_USER_URL, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).toPromise().then((res) => {
            cb(null, res);
        }).catch((err) => {
            cb(err, null);
        });
    }
}
