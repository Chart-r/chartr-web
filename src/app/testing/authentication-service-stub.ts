import { CognitoUser } from 'amazon-cognito-identity-js';
import { User } from '../model/user';

/** Class representing the fake authentication service used in testing */
export class AuthenticationServiceStub {
    /** Flag indicating whether getting a user should fail */
    public getUserShouldFail = false;
    /** Flag indicating whether get attributes should fail */
    public getAttributesShouldFail = false;
    /** Flag indicating whether a user is logged in */
    public isLoggedIn = true;

    /**
     * Get the authenticated user
     * @param cb The callback to call when the "request" finishes
     */
    getAuthenticatedUser(cb: (err: string, user: CognitoUser) => void): void {
        if (!this.getUserShouldFail && this.isLoggedIn) {
            const mockUser = {
                getUserAttributes: cb => {
                    const result = [];
                    result.push({ getName: () => 'email', getValue: () => 'test@user.com' });
                    result.push({ getName: () => 'name', getValue: () => 'Test User' });
                    result.push({ getName: () => 'birthdate', getValue: () => '1996-01-01' });
                    result.push({ getName: () => 'phone_number', getValue: () => '+19999999999' });
    
                    cb(null, result);
                }
            } as CognitoUser;
    
            cb(null, mockUser);
        }
        
        else if (!this.isLoggedIn) {
            cb(null, null);
        }

        else {
            cb('simulated failure', null);
        }
    }

    /**
     * Get a cognito user's attributes
     * @param cognitoUser The cognito user to get attributes for
     * @param cb The callback to call when the "request" finishes
     */
    getUserAttributes(cognitoUser: CognitoUser, cb: (err: string, user: User) => void): void {
        if (!this.getAttributesShouldFail) {
            const user = new User();
        
            cognitoUser.getUserAttributes((err, result) => {
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

                user.uid = '1111';
                cb(null, user);  
            });
        }

        else {
            cb('simulated failure', null);
        }
    }
}
