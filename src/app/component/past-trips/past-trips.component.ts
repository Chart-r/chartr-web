import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { Trip } from '../../model/trip';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-past-trips',
    templateUrl: './past-trips.component.html',
    styleUrls: ['./past-trips.component.css']
})
export class PastTripsComponent implements OnInit {
    public user: User = null;
    public trips: Trip[];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private tripService: TripService,
        private geoService: GeoService) { }

    ngOnInit() {
        this.authenticationService.getAuthenticatedUser((err, cognitoUser) => {
            if (err) {
                console.error(err);
                this.router.navigateByUrl('/');
            }

            else if (cognitoUser) {
                this.authenticationService.getUserAttributes(cognitoUser, (err, user) => {
                    if (err) {
                        console.error(err);
                        this.router.navigateByUrl('/');
                    }

                    else {
                        this.user = user;
                    }
                });
            }

            else {
                this.router.navigateByUrl('/');
            }
        });

        this.trips = [];
        this.tripService.getNonCurrentTrips().subscribe(
            trips => {
                this.parseTrips(trips);
            },
            err => {
                console.error(err);
            }
        );
    }

    parseTrips(trips) {
        let jsTrip;
        let users;

        const today = new Date(Date.now());

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

            
            if (jsTrip.startTime <= today) {
                console.log(jsTrip.startTime);
                console.log(today);
                this.trips.push(jsTrip);
            }
        }
    }

}
