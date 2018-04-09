import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { Trip } from '../../model/trip';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public user: User = null;
    public results: Trip[];
    public trips: Trip[];

    constructor(private authenticationService: AuthenticationService, private router: Router, private tripService: TripService) { }

    ngOnInit() {
        // authentication
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

        // get trips
        this.trips = [];
        this.results = [];
        this.tripService.getAllTrips().subscribe(
            trips => {
                this.parseTrips(trips);
            },
            err => {
                console.error(err);
            }
        );
    }

    reverseGeocode(lat, long) {
        return 'Chicago, IL';
    }

    filterTrips() {
        this.results = this.trips.filter((e) => true);
    }

    parseTrips(trips) {
        let jsTrip;
        let users;
        
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

            for (const uid in users) {
                if (users[uid] === 'driving') {
                    jsTrip.driver = uid.toString();
                    break;
                }
            }

            this.trips.push(jsTrip);
        }
    }

}
