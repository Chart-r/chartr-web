import { User } from '../model/user';

export class UserServiceStub {
    public shouldFail = false;

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
