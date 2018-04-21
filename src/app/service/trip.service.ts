import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Trip } from '../model/trip';

const TRIP_URL = `${environment.apiGatewayUrl}/trip`;

@Injectable()
export class TripService {

    constructor(private http: HttpClient) { }

    createTrip(user: User, trip: Trip) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        const reqBody = this.buildReqeustBody(user, trip);
        const createTripUrl = `${environment.apiGatewayUrl}/user/${user.uid}/trip`;
        return this.http.post(createTripUrl, reqBody, httpOptions);
    }

    getNonCurrentTrips() {        
        return this.http.get(`${TRIP_URL}`);
    }

    getAllTrips() {        
        return this.http.get(`${TRIP_URL}/current`);
    }

    buildReqeustBody(user: User, trip: Trip) {
        const reqBody = {};

        reqBody['email'] = user.email;
        reqBody['start_lat'] = trip.startLat;
        reqBody['start_lng'] = trip.startLong;
        reqBody['end_lat'] = trip.endLat;
        reqBody['end_lng'] = trip.endLong;
        reqBody['start_time'] = trip.startTime.getTime();
        reqBody['end_time'] = 0;
        reqBody['seats'] = trip.seats;
        reqBody['price'] = trip.price;
        reqBody['smoking'] = trip.smoking;

        return JSON.stringify(reqBody);
    }
}
