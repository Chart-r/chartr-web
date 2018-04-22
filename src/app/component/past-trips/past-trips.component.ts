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
        private tripService: TripService) { }

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
                this.trips = this.tripService.parseTrips(trips);
                this.trips = this.trips.filter(trip => {
                    const now = new Date();
                    return trip.startTime <= now;
                });
            },
            err => {
                console.error(err);
            }
        );
    }
}
