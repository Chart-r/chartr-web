import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
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
    public priceFromFilter: number;
    public priceToFilter: number;
    public filtering = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private tripService: TripService) { }

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
