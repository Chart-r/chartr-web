import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService } from './cognito.service';

@Injectable()
export class LoginService {

    constructor(private cognitoService: CognitoService) { }

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

    logout(): void {
        this.cognitoService.getCurrentUser().signOut();
    }
}
