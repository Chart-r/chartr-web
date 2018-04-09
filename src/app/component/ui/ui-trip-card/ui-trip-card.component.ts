import { Component, Input, OnInit } from '@angular/core';

const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit' 
};

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
    @Input() departtime: Date;
    @Input() departdest: string;
    @Input() arrivetime: Date;
    @Input() arrivedest: string;
    @Input() avatar = 'http://via.placeholder.com/50x50';

    constructor() { }

    ngOnInit() {
    }

    formatDate(obj) {
        if (! (obj instanceof Date) || isNaN(obj.getTime())) {
            return 'No Estimate Provided';
        }

        return obj.toLocaleDateString('en-US', DATE_OPTIONS);
    }

}
