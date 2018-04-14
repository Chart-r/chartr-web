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
    public trips: Trip[];
    public confirmedTrips: Trip[];
    public pendingTrips: Trip[];
    public postedTrips: Trip[];

    @Input() user: User;

    constructor(private tripService: TripService, private geoService: GeoService) { }

    ngOnInit() {
        this.trips = [];
        this.confirmedTrips = [];
        this.pendingTrips = [];
        this.postedTrips = [];

        this.tripService.getAllTrips().subscribe(
            trips => {
                this.parseTrips(trips);
                this.categorizeTrips();
            },
            err => {
                console.error(err);
            }
        );
    }

    categorizeTrips() {
        // clear trips
        this.confirmedTrips = [];
        this.pendingTrips = [];
        this.postedTrips = [];

        // ignore if user does not have an email
        if (this.user && this.user.hasOwnProperty('uid')) {
            // pending trips not implemented in the backend yet
            for (const trip of this.trips) {
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

            // location strings
            jsTrip.startLocation = `${trip.startLat || '-'},${trip.startLong || '-'}`;
            jsTrip.endLocation = `${trip.endLat || '-'},${trip.endLong || '-'}`;
            const updateStart = function(err, res) { if (! err) { this.startLocation = res; } };
            const updateEnd = function(err, res) { if (! err) { this.endLocation = res; } };
            this.geoService.reverseGeocode(jsTrip.startLat, jsTrip.startLong, updateStart.bind(jsTrip));
            this.geoService.reverseGeocode(jsTrip.endLat, jsTrip.endLong, updateEnd.bind(jsTrip));

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
