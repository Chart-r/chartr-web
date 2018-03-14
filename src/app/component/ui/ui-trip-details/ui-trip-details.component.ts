import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-trip-details',
    templateUrl: './ui-trip-details.component.html',
    styleUrls: ['./ui-trip-details.component.css']
})
export class UiTripDetailsComponent implements OnInit {

    @Input() className: string = '';
    @Input() seatsfilled: number = 0;
    @Input() totalseats: number = 0;
    @Input() fee: string = 'FREE';
    @Input() departtime: string = 'TBD';
    @Input() departdest: string = 'TBD';
    @Input() arrivetime: string = 'TBD';
    @Input() arrivedest: string = 'TBD';

    constructor() { }

    ngOnInit() {
    }

}
