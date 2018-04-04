import { Component, OnInit } from '@angular/core';
import { TripService } from '../../service/trip.service';
import { Trip } from '../../model/trip';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
    public trips: Trip[];

    constructor(private tripService: TripService) { }

    ngOnInit() {
        this.trips = [];
        this.tripService.getAllTrips().subscribe(
            trips => {
                this.parseTrips(trips);
            },
            err => {
                console.error(err);
            }
        );
    }

    parseTrips(trips) {
        let jsTrip;
        let users;
        
        for (const trip of trips) {
            jsTrip = new Trip();
            users = trip['users'];
            jsTrip.startLat = trip['start_lat'];
            jsTrip.startLong = trip['start_lng'];
            jsTrip.endLat = trip['end_lat'];
            jsTrip.endLong = trip['end_lng'];
            jsTrip.startTime = new Date(trip['start_time']);
            jsTrip.seats = trip['seats'];
            jsTrip.smoking = trip['smoking'];
            jsTrip.price = trip['price'];

            for (const uid in users) {
                if (users[uid] === 'Driver') {
                    jsTrip.driver = uid.toString();
                    break;
                }
            }

            this.trips.push(jsTrip);
        }
    }

}
