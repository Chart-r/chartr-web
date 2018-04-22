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

    getNonCurrentTrips() {
        return {
            subscribe: (scb, ecb) => {
                const mockTrip = {
                    'start_lat': 1,
                    'start_lng': 1,
                    'end_lat': 1,
                    'end_lng': 1,
                    'start_time': 1234,
                    'seats': 4,
                    'smoking': false,
                    'price': 30,
                    'users': {
                        '2222': 'riding',
                        '1111': 'driving'
                    }
                };

                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb([mockTrip]);
                }
            }  
        }; 
    }

    getAllTrips() {
        return {
            subscribe: (scb, ecb) => {
                const mockTrip = {
                    'start_lat': 1,
                    'start_lng': 1,
                    'end_lat': 1,
                    'end_lng': 1,
                    'start_time': 1234,
                    'seats': 4,
                    'smoking': false,
                    'price': 30,
                    'users': {
                        '2222': 'riding',
                        '1111': 'driving'
                    }
                };

                if (this.shouldFail) {
                    ecb('simulated failure');
                }

                else {
                    scb([mockTrip]);
                }
            }  
        };
    }
}
