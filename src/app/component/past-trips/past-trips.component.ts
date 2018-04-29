import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { Trip } from '../../model/trip';
import { NgForm } from '@angular/forms';

/** Class representing a PastTripsComponent */
@Component({
    selector: 'app-past-trips',
    templateUrl: './past-trips.component.html',
    styleUrls: ['./past-trips.component.css']
})
export class PastTripsComponent implements OnInit {
    /** The logged in user */
    public user: User = null;
    /** The user's past trips */
    public trips: Trip[];

    /**
     * Create a PastTripsComponent
     * @param authenticationService The authentication service
     * @param router The Angular router
     * @param tripService The trip service
     */
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private tripService: TripService) { }

    /**
     * ngOnInit lifecycle hook for PastTripsComponent. 
     * This function checks that a user is logged in and retrieves his or her past trips.
     */
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
