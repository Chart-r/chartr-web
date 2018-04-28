import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService } from './cognito.service';

/** Class representing the login service */
@Injectable()
export class LoginService {
    /**
     * Create a login service
     * @param cognitoService The cognito service
     */
    constructor(private cognitoService: CognitoService) { }

    /**
     * Authenticate a user
     * @param email The user's email
     * @param password The user's password
     * @param cb The callback to call when the request finishes
     */
    authenticate(email: string, password: string, cb: (err: string, result: any) => void): void {
        const authenticationData = {
            Username: email,
            Password: password
        };

        const userData = {
            Username: email,
            Pool: this.cognitoService.getUserPool()
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: session => cb(null, session),
            onFailure: err => cb(err.message, null)
        });
    }

    /** Log a user out */
    logout(): void {
        this.cognitoService.getCurrentUser().signOut();
    }
}
