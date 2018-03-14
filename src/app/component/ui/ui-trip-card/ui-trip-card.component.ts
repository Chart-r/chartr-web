import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-trip-card',
    templateUrl: './ui-trip-card.component.html',
    styleUrls: ['./ui-trip-card.component.css']
})
export class UiTripCardComponent implements OnInit {

    @Input() className: string;
    @Input() driverName: string;
    @Input() rating = 'No rating';
    @Input() seatsfilled = 0;
    @Input() totalseats = 0;
    @Input() departtime = 'TBD';
    @Input() departdest = 'TBD';
    @Input() arrivetime = 'TBD';
    @Input() arrivedest = 'TBD';
    @Input() avatar = 'http://via.placeholder.com/50x50';

    constructor() { }

    ngOnInit() {
    }

}
