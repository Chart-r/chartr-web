import { User } from '../model/user';

export class UserServiceStub {
    public shouldFail = false;

    getUser(email: string) {
        const mockUser = {
            email: 'test@user.com',
            name: 'Test User',
            birthdate: '01-01-1996',
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

    createUser(user: User) {
        return {
            subscribe: (scb, ecb) => {
                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb('simulated success');
                }
            }
        };
    }
}
