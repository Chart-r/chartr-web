import { User } from '../model/user';

export class SignupServiceStub {
    public signUpShouldFail = false;

    register(user: User, password: string, cb: (err: string, result: any) => void) {
        if (!this.signUpShouldFail) {
            cb(null, true);
        }

        else {
            cb('simulated failure', null);
        }
    }
}
