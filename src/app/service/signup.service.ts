import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

const CREATE_USER_URL = `${environment.apiGatewayUrl}/user/*`;

/** Class representing the sign up service */
@Injectable()
export class SignupService {

    /**
     * Create a sign up service
     * @param cognitoService The cognito service
     * @param userService The user service
     */
    constructor(
        private cognitoService: CognitoService,
        private userService: UserService
    ) { }

    /**
     * Register a new user
     * @param user The new user
     * @param password The new user's password
     * @param cb The callback to call when the request finishes
     */
    register(user: User, password: string, cb: (err: string, result: any) => void) {
        const attributes = this.buildCognitoAttributes(user);        

        this.cognitoService.getUserPool().signUp(user.email, password, attributes, null, (err, result) => {
            if (err) {
                cb(err.message, null);
            }

            else {
                this.userService.createUser(user).subscribe(
                    res => {
                        cb(null, res);
                    },
                    err => {
                        cb('Something went wrong. Please try again.', null);
                    }
                );
            }
        });
    }

    /**
     * Build the cognito attributes for a user
     * @param user The user to build the attributes for
     * @returns The cognito attributes
     */
    private buildCognitoAttributes(user: User) {
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

        return attributes;
    }
}
