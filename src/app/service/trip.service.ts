import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Trip } from '../model/trip';

const TRIP_URL = `${environment.apiGatewayUrl}/trip/*`;

@Injectable()
export class TripService {

    constructor(private http: HttpClient) { }

    createTrip(user: User, trip: Trip) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        const reqBody = this.buildGoReqeustBody(user, trip);
        return this.http.post(TRIP_URL, reqBody, httpOptions);
    }

    getAllTrips() {        
        return this.http.get(TRIP_URL);
    }

    buildGoReqeustBody(user: User, trip: Trip) {
        const goBody = {};

        goBody['email'] = user.email;
        goBody['start_lat'] = trip.startLat;
        goBody['start_lng'] = trip.startLong;
        goBody['end_lat'] = trip.endLat;
        goBody['end_lng'] = trip.endLong;
        goBody['start_time'] = trip.startTime.getTime();
        goBody['end_time'] = 0;
        goBody['seats'] = trip.seats;
        goBody['price'] = trip.price;
        goBody['smoking'] = trip.smoking;

        return JSON.stringify(goBody);
    }
}
