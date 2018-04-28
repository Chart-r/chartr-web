import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

/** Class representing the Chartr footer */
@Component({
    selector: 'app-ui-app-footer',
    templateUrl: './ui-app-footer.component.html',
    styleUrls: ['./ui-app-footer.component.css']
})
export class UiAppFooterComponent implements OnInit {
    /** The logged in user (if any) */
    @Input() user: User;

    /** Create a Chartr footer */
    constructor() { }

    /** ngOnInit lifecylce hook for the Chartr footer */
    ngOnInit() { }

}
