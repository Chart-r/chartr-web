import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

/** Class representing the Chartr header */
@Component({
    selector: 'app-ui-app-header',
    templateUrl: './ui-app-header.component.html',
    styleUrls: ['./ui-app-header.component.css']
})
export class UiAppHeaderComponent implements OnInit {
    /** The logged in user (if any) */
    @Input() user: User;

    /** Create a Chartr header */
    constructor() { }

    /** ngOnInit lifecycle hook for the Chartr header */
    ngOnInit() { }

}
