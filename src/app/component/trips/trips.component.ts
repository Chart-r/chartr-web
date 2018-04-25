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
    /** Current user's confirmed trips */
    public confirmedTrips: Trip[];
    /** Current user's pending trips */
    public pendingTrips: Trip[];
    /** Current user's posted trips */
    public postedTrips: Trip[];
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
        this.confirmedTrips = [];
        this.pendingTrips = [];
        this.postedTrips = [];
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

                else if (trip.users[this.user.uid] !== 'rejected' && trip.seatsfilled() < trip.seats) {
                    this.otherTrips.push(trip);
                }
            }
        }
    }
}
