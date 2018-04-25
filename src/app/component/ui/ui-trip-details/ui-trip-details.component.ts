import { Component, Input, OnInit } from '@angular/core';

/** Class representing Chartr trip details */
@Component({
    selector: 'app-ui-trip-details',
    templateUrl: './ui-trip-details.component.html',
    styleUrls: ['./ui-trip-details.component.css']
})
export class UiTripDetailsComponent implements OnInit {
    /** The CSS class name to be applied to the Chartr trip details */
    @Input() className: string;
    /** The number of seats filled on this trip */
    @Input() seatsfilled = 0;
    /** The total number of seats available on this trip */
    @Input() totalseats = 0;
    /** The price of this trip */
    @Input() fee = 'FREE';
    /** The departure time of this trip */
    @Input() departtime = 'TBD';
    /** The departure destination of this trip */
    @Input() departdest = 'TBD';
    /** The arrival time of this trip */
    @Input() arrivetime = 'TBD';
    /** The arrival location of this trip */
    @Input() arrivedest = 'TBD';

    /** Create a Chartr trip details */
    constructor() { }

    /** ngOnInit lifecycle hook for the Chartr trip details */
    ngOnInit() {
    }

}
