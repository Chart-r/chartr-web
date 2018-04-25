/** The fake login service used in testing */
export class LoginServiceStub {
    /** Flag indicating whether authentication should fail */
    public authenticateShouldFail = false;

    /**
     * Authenticate a user
     * @param email The user's email
     * @param password The user's password
     * @param cb The callback to call when the "request" finishes
     */
    authenticate(email: string, password: string, cb: (err: string, result: any) => void): void {
        if (this.authenticateShouldFail) {
            cb('simulated failure', null);
        }

        else {
            cb(null, true);
        }
    }
}
