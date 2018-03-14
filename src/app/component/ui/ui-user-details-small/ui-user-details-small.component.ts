import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-user-details-small',
    templateUrl: './ui-user-details-small.component.html',
    styleUrls: ['./ui-user-details-small.component.css']
})
export class UiUserDetailsSmallComponent implements OnInit {

    @Input() driverName: string;
    @Input() rating = 'No rating';
    @Input() avatar = 'http://via.placeholder.com/50x50';

    constructor() { }

    ngOnInit() {
    }

}
