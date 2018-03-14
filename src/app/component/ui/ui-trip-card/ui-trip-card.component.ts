import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-trip-card',
    templateUrl: './ui-trip-card.component.html',
    styleUrls: ['./ui-trip-card.component.css']
})
export class UiTripCardComponent implements OnInit {

    @Input() className: string = '';
    @Input() driverName: string = '';
    @Input() rating: string = 'No rating';
    @Input() seatsfilled: number = 0;
    @Input() totalseats: number = 0;
    @Input() departtime: string = 'TBD';
    @Input() departdest: string = 'TBD';
    @Input() arrivetime: string = 'TBD';
    @Input() arrivedest: string = 'TBD';
    @Input() avatar: string = 'http://via.placeholder.com/50x50';

    constructor() { }

    ngOnInit() {
    }

}