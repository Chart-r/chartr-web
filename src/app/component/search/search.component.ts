import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { Trip } from '../../model/trip';
import { NgForm } from '@angular/forms';

/** Class representing a SearchComponent */
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    /** The logged in user */
    public user: User = null;
    /** Filtered search results */
    public results: Trip[];
    /** All current trips */
    public trips: Trip[];
    /** Filter for the start location */
    public startLocationFilter: string;
    /** Filter for the end location */
    public endLocationFilter: string;
    /** Filter for the driver's email */
    public emailFilter: string;
    /** Filter for the price from */
    public priceFromFilter: number;
    /** Filter for the price to */
    public priceToFilter: number;
    /** Flag indicating whether filtering is occurring */
    public filtering = false;

    /**
     * Create a SearchComponent
     * @param authenticationService The authentication service
     * @param router The Angualr router
     * @param tripService The trip service
     */
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private tripService: TripService) { }
    
    /**
     * ngOnInit lifecycle hook for SearchComponent.
     * This function checks if a user is logged in and gets all current trips.
     */
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
                this.trips = this.tripService.parseTrips(trips);
            },
            err => {
                console.error(err);
            }
        );
    }

    /**
     * Filter trips based on user input
     */
    filterTrips() {
        this.filtering = true;
        this.results = this.trips.filter((e) => {
            let pass = true;

            // filter by start location
            if (this.startLocationFilter) {
                pass = pass && e['startLocation'].indexOf(this.startLocationFilter) > -1;
            }

            // filter by end location
            if (this.endLocationFilter) {
                pass = pass && e['endLocation'].indexOf(this.endLocationFilter) > -1;
            }

            // filter email
            if (this.emailFilter) {
                pass = pass && e.driver === this.emailFilter;
            }

            // filter by price(s)
            if (this.priceFromFilter !== undefined && this.priceFromFilter !== null) {
                pass = pass && e.price >= this.priceFromFilter;
            }

            if (this.priceToFilter !== undefined && this.priceToFilter !== null) {
                console.log(e.price <= this.priceToFilter);
                pass = pass && e.price <= this.priceToFilter;
            }

            return pass;
        });
        this.filtering = false;
    }
}
