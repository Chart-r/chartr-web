import { User } from '../model/user';

/** Class representing the fake sign up service used in testing */
export class SignupServiceStub {
    /** Flag indicating whether the sign up should fail */
    public signUpShouldFail = false;

    /**
     * Register a new user
     * @param user The new user
     * @param password The new user's password
     * @param cb The callback to call when the "request" finishes
     */
    register(user: User, password: string, cb: (err: string, result: any) => void) {
        if (!this.signUpShouldFail) {
            cb(null, true);
        }

        else {
            cb('simulated failure', null);
        }
    }
}
