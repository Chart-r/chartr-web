import { User } from '../model/user';
import { Trip } from '../model/trip';

export class TripServiceStub {
    public shouldFail = false;

    createTrip(user: User, trip: Trip) {
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
