import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Trip } from '../model/trip';
import { GeoService } from './geo.service';

const TRIP_URL = `${environment.apiGatewayUrl}/trip`;

@Injectable()
export class TripService {

    constructor(private http: HttpClient, private geoService: GeoService) { }

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
            const updateStart = function(err, res) { if (! err) { this.startLocation = res; } };
            const updateEnd = function(err, res) { if (! err) { this.endLocation = res; } };
            this.geoService.reverseGeocode(jsTrip.startLat, jsTrip.startLong, updateStart.bind(jsTrip));
            this.geoService.reverseGeocode(jsTrip.endLat, jsTrip.endLong, updateEnd.bind(jsTrip));

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
