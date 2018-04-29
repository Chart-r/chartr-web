import { User } from '../model/user';

/** Fake user service used in testing */
export class UserServiceStub {
    /** Flag indicating whether the requests should fail */
    public shouldFail = false;

    /**
     * Get user by email
     * @param email The user's email
     * @returns The fake observable
     */
    getUserByEmail(email: string) {
        const mockUser = {
            email: 'test@user.com',
            name: 'Test User',
            birthdate: '1996-01-01',
            phone: '+19999999999',
            uid: '1'
        };

        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb(mockUser);
                }
            }
        };
    }

    /**
     * Get user by UID
     * @param uid The UID of the user
     * @returns The fake observable
     */
    getUserByUid(uid: string) {
        const mockUser = {
            email: 'test@user.com',
            name: 'Test User',
            birthdate: '1996-01-01',
            phone: '+19999999999',
            uid: '1'
        };

        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb(mockUser);
                }
            }
        };
    }

    /**
     * Add a pending user to a trip
     * @param uid The UID of the user to add
     * @param tid The TID of the trip
     * @returns The fake observable
     */
    addPendingUserToTrip(uid: string, tid: string) {
        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb('success');
                }
            }
        };
    }

    /**
     * Accept a user to a trip
     * @param uid The UID of the user to accept
     * @param tid The TID of the trip
     * @returns The fake observable
     */
    acceptRiderForTrip(uid: string, tid: string) {
        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb('success');
                }
            }
        };
    }

    /**
     * Reject a user from a trip
     * @param uid The UID of the user to reject
     * @param tid The TID of the trip
     * @returns The fake observable
     */
    rejectRiderForTrip(uid: string, tid: string) {
        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb('success');
                }
            }
        };
    }

    /**
     * Create a new user
     * @param user The new user
     * @returns The fake observable
     */
    createUser(user: User) {
        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb({ uid: '1' });
                }
            }
        };
    }
}
