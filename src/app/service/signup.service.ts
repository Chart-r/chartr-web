import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Injectable()
export class SignupService {

    constructor(private cognitoService: CognitoService) { }

    register(user: User, password: string, cb: (err: string, result: any) => void) {
        let attributes = [];

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
                cb(null, result);
            }
        });

    }

}
