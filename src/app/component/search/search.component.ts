import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { Trip } from '../../model/trip';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public user: User = null;
    public results: Trip[];
    public trips: Trip[];
    public startLocationFilter: string;
    public endLocationFilter: string;
    public emailFilter: string;
    public priceFromFilter: string;
    public priceToFilter: string;
    public filtering = false;

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
        this.filtering = true;
        this.results = this.trips.filter((e) => {
            let pass = true;

            // filter by start location
            if (this.startLocationFilter) {
                pass = pass && this.reverseGeocode(e.endLat, e.endLong).indexOf(this.startLocationFilter) > -1;
            }

            // filter by end location
            if (this.endLocationFilter) {
                pass = pass && this.reverseGeocode(e.startLat, e.startLong).indexOf(this.endLocationFilter) > -1;
            }

            // filter email
            if (this.emailFilter) {
                pass = pass && e.driver === this.emailFilter;
            }

            // filter by price(s)
            if (this.priceFromFilter) {
                pass = pass && e.price >= parseFloat(this.priceFromFilter);
            }

            if (this.priceToFilter) {
                pass = pass && e.price <= parseFloat(this.priceToFilter);
            }

            return pass;
        });
        this.filtering = false;
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
