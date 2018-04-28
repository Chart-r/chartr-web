import { Component, Input, OnInit } from '@angular/core';

/** Class representing a Chartr user's details */
@Component({
    selector: 'app-ui-user-details-small',
    templateUrl: './ui-user-details-small.component.html',
    styleUrls: ['./ui-user-details-small.component.css']
})
export class UiUserDetailsSmallComponent implements OnInit {
    /** The name of the user */
    @Input() driverName: string;
    /** The rating of the user */
    @Input() rating = 'No rating';
    /** The avatar of the user */
    @Input() avatar = 'http://via.placeholder.com/50x50';

    /** Create a Chartr user detail object */
    constructor() { }

    /** ngOnInit lifecycle hook for the Chartr user details */
    ngOnInit() {
    }

}
