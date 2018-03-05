import { Component, OnInit } from '@angular/core';
import { TripService } from '../../service/trip.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
    public trips = [
        { source: 'Champaign, IL', dest: 'Chicago, IL', driver: 'Bob Smith', seats: 4, smoking: false },
        { source: 'Indianapolis, IN', dest: 'Dayton, OH', driver: 'Brian Kurek', seats: 2, smoking: false },
        { source: 'Orlando, FL', dest: 'Champaign, IL', driver: 'Christian Cygnus', seats: 3, smoking: false}
    ];

    constructor(private tripService: TripService) { }

    ngOnInit() {
        
    }

}
