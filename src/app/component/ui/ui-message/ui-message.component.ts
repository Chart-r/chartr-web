import { Component, Input, OnInit } from '@angular/core';

/** Class representing a Chartr message */
@Component({
    selector: 'app-ui-message',
    templateUrl: './ui-message.component.html',
    styleUrls: ['./ui-message.component.css']
})
export class UiMessageComponent implements OnInit {
    /** The CSS class name to be applied to the message */
    @Input() className: string;

    /** Create a Chartr message */
    constructor() { }

    /** ngOnInit lifecycle hook for the Chartr message */
    ngOnInit() {
    }

}
