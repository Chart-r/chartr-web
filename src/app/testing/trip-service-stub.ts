import { User } from '../model/user';
import { Trip } from '../model/trip';

/** The fake trip service used in testing */
export class TripServiceStub {
    /** Flag indicating whether requests should fail */
    public shouldFail = false;

    /**
     * Create a new trip
     * @param user The user creating the trip
     * @param trip The new trip
     * @returns The fake observable
     */
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

    /**
     * Get all non current trips
     * @returns The fake observable
     */
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

    /**
     * Get all current trips
     * @returns The fake observable
     */
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

    /**
     * Parse server trips to local trips
     * @param trips The trips to parse
     * @returns The parsed trips
     */
    parseTrips(trips: any): Trip[] {
        let jsTrip;
        let users;
        const parsed: Trip[] = [];
        
        for (const trip of trips) {
            jsTrip = new Trip();

            users = trip['users'];

            jsTrip.users = users;
            jsTrip.tripId = trip['tid'];
            jsTrip.startLat = trip['start_lat'];
            jsTrip.startLong = trip['start_lng'];
            jsTrip.endLat = trip['end_lat'];
            jsTrip.endLong = trip['end_lng'];
            jsTrip.startTime = new Date(trip['start_time']);
            jsTrip.endTime = new Date(trip['end_time']);
            jsTrip.seats = trip['seats'];
            jsTrip.smoking = trip['smoking'];
            jsTrip.price = trip['price'];

            // location strings
            jsTrip.startLocation = `${trip.startLat || '-'},${trip.startLong || '-'}`;
            jsTrip.endLocation = `${trip.endLat || '-'},${trip.endLong || '-'}`;

            for (const uid in users) {
                if (users[uid] === 'driving') {
                    jsTrip.driver = uid.toString();
                    break;
                }
            }

            parsed.push(jsTrip);
        }

        return parsed;
    }
}
