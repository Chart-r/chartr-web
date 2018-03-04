export class LoginServiceStub {
    public authenticateShouldFail = false;

    authenticate(email: string, password: string, cb: (err: string, result: any) => void): void {
        if (this.authenticateShouldFail) {
            cb('simulated failure', null);
        }

        else {
            cb(null, true);
        }
    }
}