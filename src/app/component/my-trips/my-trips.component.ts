import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { AuthenticationService } from '../../service/authentication.service';

import { Trip } from '../../model/trip';
import { User } from '../../model/user';

/** Class representing a MyTripsComponent */
@Component({
    selector: 'app-my-trips',
    templateUrl: './my-trips.component.html',
    styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
    /** All current trips */
    public allTrips: Trip[];
    /** Current user's confirmed trips */
    public confirmedTrips: Trip[];
    /** Current user's pending trips */
    public pendingTrips: Trip[];
    /** Current user's posted trips */
    public postedTrips: Trip[];

    /** The logged in user */
    public user: User = null;

    /**
     * Create a HomeComponent
     * @param authenticationService The authentication service
     * @param router The Angular router
     * @param tripService The trip service
     */
    constructor(private authenticationService: AuthenticationService, private router: Router, private tripService: TripService) { }


    /**
     * ngOnInit lifecycle hook for MyTripsComponent.
     * Checks that the user is logged in.
     * This function gets all the current trips and categorizes them
     */
    ngOnInit() {
        this.allTrips = [];
        this.confirmedTrips = [];
        this.pendingTrips = [];
        this.postedTrips = [];

        // checks if user is logged in
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

        // gets all the trips for this user
        this.tripService.getAllTrips().subscribe(
            trips => {
                this.allTrips = this.tripService.parseTrips(trips);
                this.categorizeTrips();
            },
            err => {
                console.error(err);
            }
        );
    }

    /**
     * Categorize current trips into confirmed, pending, posted, and other
     */
    categorizeTrips() {
        // ignore if user does not have an email
        if (this.user && this.user.hasOwnProperty('uid')) {
            // pending trips not implemented in the backend yet
            for (const trip of this.allTrips) {
                if (trip.users[this.user.uid] === 'riding') {
                    // confirmed trips: trips that I am in the users[] list for
                    this.confirmedTrips.push(trip);
                } 

                else if (trip.users[this.user.uid] === 'pending') {
                    this.pendingTrips.push(trip);
                }
                
                else if (trip.users[this.user.uid] === 'driving') {
                    // posted trips: trips that I am the driver for
                    this.postedTrips.push(trip);
                }
            }
        }
    }
}
