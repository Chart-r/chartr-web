import { Component, Input, OnInit } from '@angular/core';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { Trip } from '../../model/trip';
import { User } from '../../model/user';

/** Class representing a TripsComponent */
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
    /** All current trips */
    public allTrips: Trip[];
    /** Current user's other trips */
    public otherTrips: Trip[];

    /** The logged in user */
    @Input() user: User;

    /**
     * Create a TripsComponent
     * @param tripService The trip service
     */
    constructor(private tripService: TripService) { }

    /**
     * ngOnInit lifecycle hook for TripsComponent.
     * This function gets all the current trips and categorizes them
     */
    ngOnInit() {
        this.allTrips = [];
        this.otherTrips = [];

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
     * Categorize current trips into trips that the user is not a part of
     */
    categorizeTrips() {
        // ignore if user does not have an email
        if (this.user && this.user.hasOwnProperty('uid')) {
            // pending trips not implemented in the backend yet
            for (const trip of this.allTrips) {
                if (trip.users[this.user.uid] !== 'rejected'
                    && trip.users[this.user.uid] !== 'riding'
                    && trip.users[this.user.uid] !== 'pending'
                    && trip.users[this.user.uid] !== 'driving'
                    && trip.seatsfilled() < trip.seats) {
                    this.otherTrips.push(trip);
                }
            }
        }
    }
}
