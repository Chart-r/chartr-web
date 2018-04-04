import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
    private user: CognitoUser = null;

    constructor(private cognitoService: CognitoService, private userService: UserService) { }

    clearAuthenticatedUser(): void {
        this.user = null;
    }

    getAuthenticatedUser(cb: (err: string, user: CognitoUser) => void): void {
        if (this.user) {
            cb(null, this.user);
        }

        else {
            const cognitoUser = this.cognitoService.getCurrentUser();
            if (cognitoUser) {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        cb(err.message, null);
                    }
    
                    else {
                        if (session.isValid()) {
                            this.user = cognitoUser;
                            cb(null, cognitoUser);
                        }

                        else {
                            cb(null, null);
                        }
                    }
                });
            }
    
            else {
                cb(null, null);
            }
        }  
    }

    getUserAttributes(cognitoUser: CognitoUser, cb: (err: string, user: User) => void): void {
        const user = new User();
        
        cognitoUser.getUserAttributes((err, result) => {
            if (err) {
                cb(err.message, null);
            }
            
            else {
                for (const attribute of result) {
                    switch (attribute.getName()) {
                        case 'email':
                            user.email = attribute.getValue();
                            break;
                        case 'name':
                            user.name = attribute.getValue();
                            break;
                        case 'birthdate':
                            user.birthdate = attribute.getValue();
                            break;
                        case 'phone_number':
                            user.phone = attribute.getValue();
                            break;
                    }
                }

                this.userService.getUser(user.email).subscribe(
                    (data: User) => {
                        user.uid = data.uid;
                        cb(null, user);
                    },
                    err => {
                        cb('Something went wrong. Please try again.', null);
                    }
                );
            }    
        });
    }
}
