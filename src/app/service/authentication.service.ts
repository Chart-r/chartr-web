import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {

    constructor(private cognitoService: CognitoService) { }

    isAuthenticated(cb: (err: string, result: boolean) => void): void {
        const cognitoUser = this.cognitoService.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    cb(err.message, false);
                }

                else {
                    cb(null, session.isValid());
                }
            });
        }

        else {
            cb(null, false);
        }
    }

    getCurrentUser(cb: (err:string, user: User) => void): void {
        const cognitoUser = this.cognitoService.getCurrentUser();
        let user = new User();

        cognitoUser.getUserAttributes((err, result) => {
            if (err) {
                cb(err.message, null);
            }
            
            else {
                for (let attribute of result) {
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

                cb(null, user);
            }    
        });
    }
}
