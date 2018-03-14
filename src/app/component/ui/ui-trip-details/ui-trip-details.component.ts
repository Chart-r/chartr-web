import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-trip-details',
    templateUrl: './ui-trip-details.component.html',
    styleUrls: ['./ui-trip-details.component.css']
})
export class UiTripDetailsComponent implements OnInit {

    @Input() className: string;
    @Input() seatsfilled = 0;
    @Input() totalseats = 0;
    @Input() fee = 'FREE';
    @Input() departtime = 'TBD';
    @Input() departdest = 'TBD';
    @Input() arrivetime = 'TBD';
    @Input() arrivedest = 'TBD';

    constructor() { }

    ngOnInit() {
    }

}
