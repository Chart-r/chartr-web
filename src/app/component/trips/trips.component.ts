import { Component, Input, OnInit } from '@angular/core';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { Trip } from '../../model/trip';
import { User } from '../../model/user';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
    public allTrips: Trip[];
    public confirmedTrips: Trip[];
    public pendingTrips: Trip[];
    public postedTrips: Trip[];
    public otherTrips: Trip[];

    @Input() user: User;

    constructor(private tripService: TripService) { }

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
